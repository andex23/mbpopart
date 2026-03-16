import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'node:crypto';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import type { SanityClient } from 'next-sanity';
import { createClient } from 'next-sanity';
import { getAllArtworks, siteContent, type Artwork } from '@/data/artworks';
import {
  availableItems,
  bioItems,
  commissionItems,
  commissionProcessSteps,
  commonContact,
  legacyPageCopy,
  newsItems,
  photoItems,
  printItems,
} from '@/data/legacy-content';
import type { PaintingStatus } from '@/lib/sanity.types';

export const runtime = 'nodejs';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2026-02-23';
const revalidateSecret = process.env.SANITY_REVALIDATE_SECRET ?? '';
const writeToken = process.env.SANITY_API_WRITE_TOKEN ?? '';

const DEFAULT_NAV_ITEMS = [
  { _key: 'nav-bio', key: 'bio', label: 'Intro Bio', enabled: true, order: 1 },
  { _key: 'nav-paintings', key: 'paintings', label: 'Paintings', enabled: true, order: 2 },
  { _key: 'nav-available', key: 'available', label: 'Available', enabled: true, order: 3 },
  { _key: 'nav-commissions', key: 'commissions', label: 'Commissions', enabled: true, order: 4 },
  { _key: 'nav-happy-clients', key: 'happyClients', label: 'Happy Clients', enabled: true, order: 5 },
];

const LEGACY_DEFAULT_STRING_UPDATES = new Map<string, Set<string>>([
  ['Intro Bio', new Set(['Bio'])],
  ['Available', new Set(['Available Paintings'])],
  ['Happy Clients', new Set(['Happy Client Photos', 'Happy Clients with Their Michel Paintings'])],
  ['Many commissions follow a structured creative process — from your reference photo to a finished original Michel painting.', new Set([
    'Every commission follows a structured creative process — from your reference photo to a finished original Michel painting.',
  ])],
  ['© 2026 Michel Balasis', new Set(['© 2020 Michel Balasis'])],
]);

const REVALIDATE_TAGS = [
  'sanity',
  'siteSettings',
  'navigation',
  'landingPage',
  'bioPage',
  'paintingsPage',
  'painting',
  'availablePage',
  'commissionsPage',
  'happyClientsPage',
  'printsPage',
  'venuesPage',
  'newsPage',
] as const;

type Scope = 'singletons' | 'all';

const LOCAL_IMAGE_FALLBACK = 'public/home/home_01.jpg';

function makeKey(seed: string): string {
  return createHash('sha1').update(seed).digest('hex').slice(0, 12);
}

function sanitizeFilename(value: string): string {
  return value.replace(/[^a-z0-9.\-_]/gi, '_');
}

function normalizeText(value: string | null | undefined): string {
  return (value ?? '').trim();
}

function toPortableText(paragraphs: string[]) {
  return paragraphs
    .map((paragraph) => normalizeText(paragraph))
    .filter(Boolean)
    .map((paragraph) => ({
      _type: 'block',
      _key: makeKey(`pt:${paragraph}`),
      style: 'normal',
      markDefs: [],
      children: [
        {
          _type: 'span',
          _key: makeKey(`span:${paragraph}`),
          text: paragraph,
          marks: [],
        },
      ],
    }));
}

function splitParagraphs(value: string): string[] {
  return value
    .split(/\n{2,}/)
    .map((part) => normalizeText(part))
    .filter(Boolean);
}

function keepExistingValue(existing: unknown, seeded: unknown): unknown {
  if (seeded === undefined || seeded === null) {
    return existing ?? seeded;
  }

  if (existing === undefined || existing === null) {
    return seeded;
  }

  if (typeof seeded === 'string') {
    const existingText = normalizeText(String(existing));
    const seededText = normalizeText(String(seeded));
    const legacyMatches = LEGACY_DEFAULT_STRING_UPDATES.get(seededText);

    if (existingText && legacyMatches?.has(existingText)) {
      return seeded;
    }

    return existingText ? existing : seeded;
  }

  if (typeof seeded === 'number' || typeof seeded === 'boolean') {
    return existing;
  }

  if (Array.isArray(seeded)) {
    return Array.isArray(existing) && existing.length > 0 ? existing : seeded;
  }

  if (typeof seeded === 'object') {
    if (typeof existing !== 'object' || Array.isArray(existing)) {
      return seeded;
    }

    const merged: Record<string, unknown> = {};
    const existingRecord = existing as Record<string, unknown>;
    const seededRecord = seeded as Record<string, unknown>;

    for (const key of Object.keys(seededRecord)) {
      merged[key] = keepExistingValue(existingRecord[key], seededRecord[key]);
    }

    return merged;
  }

  return existing;
}

function withDocumentMeta<T extends { _id: string; _type: string }>(
  seedDoc: T,
  existingDoc: Record<string, unknown> | null,
): T {
  const merged = keepExistingValue(existingDoc, seedDoc) as Record<string, unknown>;
  return {
    ...(merged as T),
    _id: seedDoc._id,
    _type: seedDoc._type,
  } as T;
}

async function uploadLocalImage(client: SanityClient, relativePath: string, sourceKey: string) {
  const absolutePath = path.join(process.cwd(), relativePath);
  const file = await fs.readFile(absolutePath);
  const filename = sanitizeFilename(path.basename(relativePath));
  const asset = await client.assets.upload('image', file, {
    filename,
    source: {
      id: sourceKey,
      name: 'mbpopart-seed',
    },
  });

  return {
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: asset._id,
    },
  };
}

async function uploadRemoteImage(client: SanityClient, url: string, sourceKey: string) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);
  let response: Response;
  try {
    response = await fetch(url, { signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
  if (!response.ok) {
    throw new Error(`Failed image download (${response.status}) ${url}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const fallbackName = url.split('/').pop() || `${sourceKey}.jpg`;
  const filename = sanitizeFilename(decodeURIComponent(fallbackName));
  const contentType = response.headers.get('content-type') || 'image/jpeg';

  const asset = await client.assets.upload('image', buffer, {
    filename,
    contentType,
    source: {
      id: sourceKey,
      name: 'mbpopart-seed',
    },
  });

  return {
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: asset._id,
    },
  };
}

async function resolveImageWithFallback(
  client: SanityClient,
  candidates: Array<string | undefined | null>,
  sourceKey: string,
) {
  for (const candidate of candidates) {
    const normalized = normalizeText(candidate);
    if (!normalized) {
      continue;
    }

    try {
      if (normalized.startsWith('/')) {
        return await uploadLocalImage(client, `public${normalized}`, sourceKey);
      }

      return await uploadRemoteImage(client, normalized, sourceKey);
    } catch {
      // Continue to the next candidate.
    }
  }

  return uploadLocalImage(client, LOCAL_IMAGE_FALLBACK, `${sourceKey}-fallback`);
}

function parseArtworkYear(work: Artwork): number | null {
  const direct = work.year.match(/^\d{4}$/);
  if (direct) {
    return Number(direct[0]);
  }

  const range = work.year.match(/(\d{4})\s*[-–]\s*(\d{4})/);
  if (range) {
    return Number(range[2]);
  }

  const before = work.year.match(/before\s+(\d{4})/i);
  if (before) {
    return Number(before[1]) - 1;
  }

  const fromText = `${work.caption} ${work.title} ${work.paintingName}`.match(/(19|20)\d{2}/);
  if (fromText) {
    return Number(fromText[0]);
  }

  return null;
}

function inferYearFromSourceFile(sourceFile: string | null | undefined): number | null {
  const normalized = normalizeText(sourceFile).toLowerCase();
  if (!normalized) {
    return null;
  }

  if (normalized.includes('before')) {
    return 1997;
  }

  const direct = normalized.match(/(19|20)\d{2}/);
  if (direct) {
    return Number(direct[0]);
  }

  return null;
}

function getArtworkTitle(work: Artwork): string {
  const base = normalizeText(work.paintingName) || normalizeText(work.title) || normalizeText(work.caption);
  if (base) {
    return base;
  }

  const urlName = normalizeText(work.imageUrl.split('/').pop() ?? '').replace(/\.[a-z0-9]+$/i, '');
  if (urlName) {
    return decodeURIComponent(urlName).replace(/[_-]+/g, ' ');
  }

  return `Untitled ${work.year}`;
}

function parsePrice(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const normalized = normalizeText(value).replace(/\s+/g, ' ');
  const match = normalized.match(/(?:cash\s*)?price[:\s]*([^\n]+)$/i);
  return match?.[1]?.trim();
}

function parseDimensions(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const match = value.match(/(\d+(?:\s+\d+\/\d+)?\s*"?\s*x\s*\d+(?:\s+\d+\/\d+)?\s*"?(?:\s*x\s*\d+(?:\s+\d+\/\d+)?\s*")?)/i);
  return match?.[1]?.trim();
}

function buildAvailableMetaMap(): Map<string, { status: PaintingStatus; price?: string; dimensions?: string }> {
  const map = new Map<string, { status: PaintingStatus; price?: string; dimensions?: string }>();
  for (const item of availableItems) {
    const key = normalizeText(item.imageUrl).toLowerCase();
    if (!key) continue;

    const price = parsePrice(item.meta);
    const dimensions = parseDimensions(item.meta);

    if (item.status === 'AVAILABLE') {
      map.set(key, {
        status: 'available',
        price,
        dimensions,
      });
      continue;
    }

    if (item.status === 'SOLD') {
      map.set(key, {
        status: 'sold',
        price,
        dimensions,
      });
    }
  }
  return map;
}

async function buildSingletonSeedDocuments(client: SanityClient) {
  const hero1 = await uploadLocalImage(client, 'public/home/home_01.jpg', 'hero-1');
  const hero2 = await uploadLocalImage(client, 'public/home/home_02.jpg', 'hero-2');
  const hero3 = await uploadLocalImage(client, 'public/home/home_03.jpg', 'hero-3');
  const footerPortrait = await resolveImageWithFallback(
    client,
    ['/assets/mbface.png'],
    'footer-portrait',
  );
  const bioPortrait = await resolveImageWithFallback(
    client,
    ['/assets/mbface.png'],
    'bio-portrait',
  );

  const bioGallery = [];
  for (let index = 0; index < bioItems.length; index += 1) {
    const item = bioItems[index];
    const image = await resolveImageWithFallback(
      client,
      [item.imageUrl, item.thumbUrl],
      `bio-gallery-${index + 1}`,
    );
    bioGallery.push({
      _key: makeKey(`bio-gallery:${item.imageUrl}`),
      image,
      alt: item.caption,
      caption: item.caption,
      order: index + 1,
    });
  }

  const commissionSteps = [];
  for (let index = 0; index < commissionProcessSteps.length; index += 1) {
    const step = commissionProcessSteps[index];
    const imagePath = step.images[0];
    const image = await resolveImageWithFallback(
      client,
      [imagePath],
      `commission-step-${index + 1}`,
    );

    commissionSteps.push({
      _key: makeKey(`commission-step:${step.id}`),
      title: step.label,
      description: step.caption,
      image,
      order: index + 1,
    });
  }

  const commissionExamples = [];
  for (let index = 0; index < commissionItems.length; index += 1) {
    const item = commissionItems[index];
    const image = await resolveImageWithFallback(
      client,
      [item.imageUrl, item.thumbUrl],
      `commission-example-${index + 1}`,
    );
    commissionExamples.push({
      _key: makeKey(`commission-example:${item.imageUrl}`),
      title: item.caption || `Commission #${index + 1}`,
      description: item.meta || '',
      privacyHidden: false,
      order: index + 1,
      images: [
        {
          _key: makeKey(`commission-example-image:${item.imageUrl}`),
          image,
          caption: item.caption,
          role: 'final',
          order: 1,
        },
      ],
    });
  }

  const happyPhotos = [];
  for (let index = 0; index < photoItems.length; index += 1) {
    const item = photoItems[index];
    const image = await resolveImageWithFallback(
      client,
      [item.imageUrl, item.thumbUrl],
      `happy-photo-${index + 1}`,
    );
    happyPhotos.push({
      _key: makeKey(`happy-photo:${item.imageUrl}`),
      image,
      caption: item.caption,
      location: undefined,
      note: undefined,
      featured: index < 3,
      order: index + 1,
    });
  }

  const printsGallery = [];
  for (let index = 0; index < printItems.length; index += 1) {
    const item = printItems[index];
    const image = await resolveImageWithFallback(
      client,
      [item.imageUrl, item.thumbUrl],
      `prints-gallery-${index + 1}`,
    );
    printsGallery.push({
      _key: makeKey(`prints-gallery:${item.imageUrl}`),
      image,
      alt: item.caption,
      caption: item.caption,
      order: index + 1,
      featured: false,
    });
  }

  const printShipBox = await resolveImageWithFallback(
    client,
    [legacyPageCopy.prints.shipBoxImageUrl],
    'prints-ship-box',
  );

  const venues = [];
  for (let index = 0; index < siteContent.venues.length; index += 1) {
    const venue = siteContent.venues[index];
    const image = await resolveImageWithFallback(
      client,
      [venue.imageUrl],
      `venue-${index + 1}`,
    );
    venues.push({
      _key: makeKey(`venue:${venue.name}`),
      name: venue.name,
      address: venue.address ?? undefined,
      phone: venue.phone ?? undefined,
      email: venue.email ?? undefined,
      website: venue.website ?? undefined,
      image,
      order: index + 1,
    });
  }

  const newsList = newsItems.map((item, index) => ({
    _key: makeKey(`news-item:${item.title}`),
    title: item.title,
    date: item.date,
    summary: item.summary,
    pdfUrl: item.pdfUrl,
    order: index + 1,
  }));

  return [
    {
      _id: 'siteSettings',
      _type: 'siteSettings',
      siteTitle: 'MBPOPART.COM',
      contactEmail: commonContact.email,
      contactPhone: commonContact.phone,
      locationLabel: 'Venice Florida USA',
      sandsDisplayMessage: siteContent.homepage.exhibiting[0] ?? '',
      footerPortrait,
      footerText: '© 2026 Michel Balasis',
      socialLinks: [],
      footerLinks: [],
      defaultSEO: {
        metaTitle: 'Michel Balasis | Pop Art — Chicago',
        metaDescription: 'Original pop art paintings by Michel Balasis.',
      },
    },
    {
      _id: 'navigation',
      _type: 'navigation',
      items: DEFAULT_NAV_ITEMS,
    },
    {
      _id: 'landingPage',
      _type: 'landingPage',
      heroImages: [
        { _key: 'hero-1', image: hero1, alt: 'Featured Michel painting', caption: '', order: 1 },
        { _key: 'hero-2', image: hero2, alt: 'Featured Michel painting', caption: '', order: 2 },
        { _key: 'hero-3', image: hero3, alt: 'Featured Michel painting', caption: '', order: 3 },
      ],
      introHeading: '',
      introBody: toPortableText(splitParagraphs(siteContent.homepage.welcomeText)),
      smallLabels: [],
    },
    {
      _id: 'bioPage',
      _type: 'bioPage',
      title: 'INTRO BIO',
      portraitImage: bioPortrait,
      body: toPortableText(splitParagraphs(siteContent.bio.bioText)),
      galleryImages: bioGallery,
    },
    {
      _id: 'paintingsPage',
      _type: 'paintingsPage',
      title: 'PAINTINGS',
      introText: toPortableText([
        'Browse Michel Balasis paintings by year. Click any thumbnail to view a larger image.',
        'Use the year buttons to jump directly to a specific collection.',
      ]),
      emptySectionPlaceholderText: 'New Painting Coming Soon',
      yearGroupingMode: 'computed',
    },
    {
      _id: 'availablePage',
      _type: 'availablePage',
      title: legacyPageCopy.available.title,
      introText: toPortableText(legacyPageCopy.available.paragraphs),
    },
    {
      _id: 'commissionsPage',
      _type: 'commissionsPage',
      title: legacyPageCopy.commissions.title.toUpperCase(),
      introText: toPortableText(legacyPageCopy.commissions.paragraphs),
      howItWorksTitle: 'The Commission Process',
      howItWorksSubtitle:
        'Many commissions follow a structured creative process — from your reference photo to a finished original Michel painting.',
      downPaymentRule: 'Clients can make their 50% Down Payment via Zelle, Venmo, or Cash',
      examplesTitle: 'Recent Commission Examples',
      steps: commissionSteps,
      examples: commissionExamples,
    },
    {
      _id: 'happyClientsPage',
      _type: 'happyClientsPage',
      title: 'Happy Clients',
      introText: toPortableText(legacyPageCopy.photos.paragraphs),
      photos: happyPhotos,
    },
    {
      _id: 'printsPage',
      _type: 'printsPage',
      title: legacyPageCopy.prints.title,
      introText: toPortableText(legacyPageCopy.prints.paragraphs),
      shipBoxImage: printShipBox,
      shipBoxImageAlt: 'Print shipping box',
      availableTitles: legacyPageCopy.prints.availableTitles,
      galleryImages: printsGallery,
    },
    {
      _id: 'venuesPage',
      _type: 'venuesPage',
      title: legacyPageCopy.venues.title,
      introText: toPortableText(legacyPageCopy.venues.paragraphs),
      venues,
    },
    {
      _id: 'newsPage',
      _type: 'newsPage',
      title: legacyPageCopy.news.title,
      introText: toPortableText(legacyPageCopy.news.paragraphs),
      items: newsList,
    },
  ];
}

async function seedSingletons(client: SanityClient) {
  const seedDocs = await buildSingletonSeedDocuments(client);
  const results: Array<{ id: string; status: 'created' | 'updated' }> = [];

  for (const seedDoc of seedDocs) {
    const existing = (await client.getDocument(seedDoc._id)) as Record<string, unknown> | null;
    const mergedDoc = withDocumentMeta(seedDoc, existing);
    await client.createOrReplace(mergedDoc as never);
    results.push({
      id: seedDoc._id,
      status: existing ? 'updated' : 'created',
    });
  }

  return results;
}

async function seedPaintings(client: SanityClient, limit?: number) {
  const artworks = getAllArtworks();
  const availableMetaMap = buildAvailableMetaMap();
  const results: Array<{ id: string; status: 'created' | 'updated' }> = [];
  const seen = new Set<string>();

  for (let index = 0; index < artworks.length; index += 1) {
    if (limit && results.length >= limit) {
      break;
    }

    const artwork = artworks[index];
    const imageKey = normalizeText(artwork.imageUrl || artwork.thumbnailUrl).toLowerCase();
    if (!imageKey || seen.has(imageKey)) {
      continue;
    }
    seen.add(imageKey);

    const year = parseArtworkYear(artwork) ?? inferYearFromSourceFile(artwork.sourceFile) ?? 2000;

    const title = getArtworkTitle(artwork);
    const docId = `painting-${makeKey(imageKey)}`;
    const existing = await client.getDocument(docId);
    if (existing) {
      results.push({
        id: docId,
        status: 'updated',
      });
      continue;
    }

    const image = await resolveImageWithFallback(client, [artwork.imageUrl, artwork.thumbnailUrl], `painting-${docId}`);
    const availableMeta = availableMetaMap.get(imageKey);

    const doc = {
      _id: docId,
      _type: 'painting',
      title,
      caption: normalizeText(artwork.caption) || title,
      year,
      copyrightYear: year,
      comingSoon: false,
      mainImage: image,
      mainImageAlt: title,
      status: availableMeta?.status ?? 'notForSale',
      featured: false,
      sortOrder: index + 1,
      dimensions: artwork.dimensions ?? availableMeta?.dimensions ?? undefined,
      price: availableMeta?.price ?? undefined,
      medium: artwork.medium ?? undefined,
    };

    await client.createIfNotExists(doc as never);
    results.push({
      id: docId,
      status: 'created',
    });
  }

  return results;
}

function getIncomingSecret(request: NextRequest): string {
  const querySecret = request.nextUrl.searchParams.get('secret');
  if (querySecret) {
    return querySecret;
  }

  const headerSecret = request.headers.get('x-seed-secret');
  if (headerSecret) {
    return headerSecret;
  }

  const authHeader = request.headers.get('authorization');
  if (authHeader?.toLowerCase().startsWith('bearer ')) {
    return authHeader.slice(7).trim();
  }

  return '';
}

export async function POST(request: NextRequest) {
  if (!projectId || !dataset) {
    return NextResponse.json(
      { ok: false, error: 'Sanity project env vars are missing.' },
      { status: 500 },
    );
  }

  if (!writeToken) {
    return NextResponse.json(
      { ok: false, error: 'Missing SANITY_API_WRITE_TOKEN in .env.local' },
      { status: 500 },
    );
  }

  const incomingSecret = getIncomingSecret(request);
  if (!revalidateSecret || incomingSecret !== revalidateSecret) {
    return NextResponse.json(
      { ok: false, error: 'Unauthorized' },
      { status: 401 },
    );
  }

  const scopeParam = request.nextUrl.searchParams.get('scope') || 'singletons';
  const scope: Scope = scopeParam === 'all' ? 'all' : 'singletons';
  const includeSingletons = request.nextUrl.searchParams.get('singletons') !== '0';
  const resetPaintings = request.nextUrl.searchParams.get('resetPaintings') === '1';
  const limitParam = request.nextUrl.searchParams.get('limit');
  const limit = limitParam ? Number(limitParam) : undefined;

  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    token: writeToken,
    useCdn: false,
    perspective: 'published',
  });

  try {
    if (scope === 'all' && resetPaintings) {
      await client.delete({ query: '*[_type == "painting"]' });
    }

    const singletonResults = includeSingletons ? await seedSingletons(client) : [];
    const paintingResults = scope === 'all'
      ? await seedPaintings(client, Number.isFinite(limit) ? limit : undefined)
      : [];

    for (const tag of REVALIDATE_TAGS) {
      revalidateTag(tag);
    }

    return NextResponse.json({
      ok: true,
      scope,
      includeSingletons,
      resetPaintings,
      singletonResults,
      paintings: {
        created: paintingResults.filter((item) => item.status === 'created').length,
        updated: paintingResults.filter((item) => item.status === 'updated').length,
        skipped: 0,
        failed: 0,
        totalUpserted: paintingResults.length,
        details: paintingResults.slice(0, 30),
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : 'Failed to seed CMS',
      },
      { status: 500 },
    );
  }
}
