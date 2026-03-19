import type { Artwork, YearGroup, YearRangeFilter } from '@/data/artworks';
import { YEAR_RANGE_FILTERS, getAllArtworks } from '@/data/artworks';
import {
  availableItems,
  bioItems,
  commissionItems,
  commissionProcessSteps,
  commonContact,
  legacyPageCopy,
  newsItems,
  printItems,
} from '@/data/legacy-content';
import { HAPPY_CLIENTS } from '@/data/happy-clients';
import { siteContent } from '@/data/artworks';
import type {
  AvailablePageView,
  BioPageView,
  CommissionsPageView,
  GlobalContentView,
  HappyClientsPageView,
  LandingPageView,
  LegacyThumbItem,
  NavigationViewItem,
  NewsPageView,
  PaintingsPageView,
  PrintsPageView,
  SiteSettingsView,
  VenuesPageView,
  VenueItemView,
} from './content.types';
import type {
  CmsAvailablePage,
  CmsBioPage,
  CmsCommissionsPage,
  CmsHappyClientsPage,
  CmsLandingPage,
  CmsNavigation,
  CmsNavigationItem,
  CmsNewsPage,
  CmsPainting,
  CmsPaintingsPage,
  CmsPrintsPage,
  CmsSiteSettings,
  CmsVenueItem,
  CmsVenuesPage,
  NavKey,
  PaintingStatus,
  PortableTextValue,
} from './sanity.types';
import { sanityFetch } from './sanity.fetch';
import {
  AVAILABLE_PAGE_QUERY,
  AVAILABLE_PAINTINGS_QUERY,
  BIO_PAGE_QUERY,
  COMMISSIONS_PAGE_QUERY,
  HAPPY_CLIENTS_PAGE_QUERY,
  LANDING_PAGE_QUERY,
  NAVIGATION_QUERY,
  NEWS_PAGE_QUERY,
  PAINTINGS_PAGE_QUERY,
  PAINTINGS_QUERY,
  PRINTS_PAGE_QUERY,
  SITE_SETTINGS_QUERY,
  VENUES_PAGE_QUERY,
} from './sanity.queries';
import { getSanityImageUrl } from './sanity.image';

const NAV_ROUTE_MAP: Record<NavKey, string> = {
  bio: '/bio',
  paintings: '/gallery',
  available: '/available',
  commissions: '/commissions',
  happyClients: '/photos',
};

const DEFAULT_NAVIGATION: NavigationViewItem[] = [
  { key: 'bio', label: 'Intro Bio', enabled: true, order: 1, href: '/bio' },
  { key: 'paintings', label: 'Paintings', enabled: true, order: 2, href: '/gallery' },
  { key: 'available', label: 'Available', enabled: true, order: 3, href: '/available' },
  { key: 'commissions', label: 'Commissions', enabled: true, order: 4, href: '/commissions' },
  { key: 'happyClients', label: 'Happy Clients', enabled: true, order: 5, href: '/photos' },
];

const ACCENT_CYCLE = ['accent-yellow', 'accent-pink', 'accent-blue', 'accent-orange', 'accent-green'];

const FALLBACK_HERO_IMAGES = [
  { imageUrl: '/home/home_01.jpg', alt: 'Featured Michel painting', caption: '', order: 1 },
  { imageUrl: '/home/home_02.jpg', alt: 'Featured Michel painting', caption: '', order: 2 },
  { imageUrl: '/home/home_03.jpg', alt: 'Featured Michel painting', caption: '', order: 3 },
];

const AVAILABLE_COMING_SOON_IMAGE = '/placeholders/new-painting-coming-soon.svg';
const DEFAULT_AVAILABLE_TITLE = 'Available';
const DEFAULT_COMMISSION_DOWN_PAYMENT_LABEL = '50% Down Payment';
const DEFAULT_COMMISSION_DOWN_PAYMENT_RULE =
  'Clients can make their 50% Down Payment via Zelle, Venmo, or Cash';
const DEFAULT_COMMISSION_PROCESS_SUBTITLE =
  'Many commissions follow a structured creative process — from your reference photo to a finished original Michel painting.';
const DEFAULT_FOOTER_COPY = '© 2026 Michel Balasis';
const DEFAULT_HAPPY_CLIENTS_TITLE = 'Happy Clients';
const DEFAULT_PLACEHOLDER_TITLE = 'New Painting Coming Soon';

function normalizeString(value: string | undefined | null): string {
  return (value ?? '').trim().toLowerCase();
}

function normalizeCommissionSpelling(value: string): string {
  return value
    .replace(/\bcommision\b/gi, 'commission')
    .replace(/\bcommisions\b/gi, 'commissions');
}

function isComingSoonPlaceholder(item: Pick<LegacyThumbItem, 'imageUrl' | 'thumbUrl' | 'caption'>): boolean {
  const imageKey = normalizeString(item.imageUrl);
  const thumbKey = normalizeString(item.thumbUrl);
  const captionKey = normalizeString(item.caption);

  return imageKey === normalizeString(AVAILABLE_COMING_SOON_IMAGE) ||
    thumbKey === normalizeString(AVAILABLE_COMING_SOON_IMAGE) ||
    captionKey === normalizeString('New Painting Available - Coming Soon') ||
    captionKey === normalizeString(DEFAULT_PLACEHOLDER_TITLE);
}

function sanitizeAvailableCaption(value: string): string {
  return value.replace(/\s*\((available|sold)\)\s*$/i, '').trim();
}

function parseDimensionsFromText(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const match = value.match(/(\d+(?:\s+\d+\/\d+)?\s*"?\s*x\s*\d+(?:\s+\d+\/\d+)?\s*"?(?:\s*x\s*\d+(?:\s+\d+\/\d+)?\s*")?)/i);
  return match?.[1]?.trim();
}

function parsePriceFromText(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const normalized = value.replace(/\s+/g, ' ').trim();
  const match = normalized.match(/(?:cash\s*)?price[:\s]*([^\n]+)$/i);
  if (!match?.[1]) return undefined;
  return match[1].trim();
}

function buildAvailableMeta(options: {
  dimensions?: string | null;
  price?: string | null;
  fallbackMeta?: string;
}): string | undefined {
  const dimensions = options.dimensions?.trim() || parseDimensionsFromText(options.fallbackMeta);
  const rawPrice = options.price?.trim() || parsePriceFromText(options.fallbackMeta);
  const price = rawPrice ? (rawPrice.toLowerCase().startsWith('price') ? rawPrice : `Price: ${rawPrice}`) : undefined;
  const parts = [dimensions, price].filter(Boolean) as string[];
  return parts.length > 0 ? parts.join(' · ') : undefined;
}

function toLegacyStatus(status: PaintingStatus | undefined): 'AVAILABLE' | 'SOLD' | 'COMMISSION' | undefined {
  if (status === 'available') {
    return 'AVAILABLE';
  }
  if (status === 'sold') {
    return 'SOLD';
  }
  if (status === 'commission') {
    return 'COMMISSION';
  }
  return undefined;
}

function mergeUniqueByKey<T>(primary: T[], fallback: T[], getKey: (item: T) => string): T[] {
  const merged: T[] = [];
  const seen = new Set<string>();

  for (const item of [...primary, ...fallback]) {
    const key = getKey(item);
    if (!key || seen.has(key)) {
      continue;
    }
    seen.add(key);
    merged.push(item);
  }

  return merged;
}

function mergeLegacyThumbItems(primary: LegacyThumbItem[], fallback: LegacyThumbItem[]): LegacyThumbItem[] {
  return mergeUniqueByKey(primary, fallback, (item) => {
    const imageKey = normalizeString(item.imageUrl);
    if (imageKey) {
      return `img:${imageKey}`;
    }
    return `caption:${normalizeString(item.caption)}|meta:${normalizeString(item.meta)}`;
  });
}

function mergeArtworks(primary: Artwork[], fallback: Artwork[]): Artwork[] {
  return mergeUniqueByKey(primary, fallback, (work) => {
    const imageKey = normalizeString(work.imageUrl);
    if (imageKey) {
      return `img:${imageKey}`;
    }
    return `name:${normalizeString(work.paintingName)}|year:${normalizeString(work.year)}|caption:${normalizeString(work.caption)}`;
  });
}

function paragraphsToPortableText(paragraphs: string[]): PortableTextValue {
  return paragraphs.map((paragraph, index) => ({
    _type: 'block',
    _key: `fallback-block-${index}`,
    style: 'normal',
    markDefs: [],
    children: [
      {
        _type: 'span',
        _key: `fallback-span-${index}`,
        text: paragraph,
        marks: [],
      },
    ],
  }));
}

function portableTextFromLongText(text: string): PortableTextValue {
  const paragraphs = text.split('\n\n').map((value) => value.trim()).filter(Boolean);
  return paragraphsToPortableText(paragraphs);
}

function sortByOrder<T extends { order?: number; featured?: boolean }>(items: T[] = []): T[] {
  return [...items].sort((a, b) => {
    const featuredA = a.featured ? 1 : 0;
    const featuredB = b.featured ? 1 : 0;
    if (featuredA !== featuredB) {
      return featuredB - featuredA;
    }

    const orderA = typeof a.order === 'number' ? a.order : Number.MAX_SAFE_INTEGER;
    const orderB = typeof b.order === 'number' ? b.order : Number.MAX_SAFE_INTEGER;
    return orderA - orderB;
  });
}

function isNavKey(value: string | undefined): value is NavKey {
  return value === 'bio' ||
    value === 'paintings' ||
    value === 'available' ||
    value === 'commissions' ||
    value === 'happyClients';
}

function mapNavItem(item: CmsNavigationItem): NavigationViewItem | null {
  if (!isNavKey(item.key)) {
    return null;
  }

  const fallback = DEFAULT_NAVIGATION.find((entry) => entry.key === item.key);
  if (!fallback) {
    return null;
  }

  return {
    key: item.key,
    label: item.label?.trim() || fallback.label,
    enabled: item.enabled !== false,
    order: typeof item.order === 'number' ? item.order : fallback.order,
    href: NAV_ROUTE_MAP[item.key],
  };
}

function mapCmsImageToLegacyThumb(
  image: unknown,
  options: {
    caption: string;
    meta?: string;
    status?: 'AVAILABLE' | 'SOLD';
    aspect?: 'square' | 'landscape';
  },
): LegacyThumbItem | null {
  const imageUrl = getSanityImageUrl(image, { width: 1800, fit: 'max' });
  if (!imageUrl) {
    return null;
  }

  const thumbWidth = options.aspect === 'landscape' ? 960 : 620;
  const thumbHeight = options.aspect === 'landscape' ? 720 : 620;
  const thumbUrl = getSanityImageUrl(image, {
    width: thumbWidth,
    height: thumbHeight,
    fit: 'crop',
  }) ?? imageUrl;

  return {
    imageUrl,
    thumbUrl,
    caption: options.caption,
    meta: options.meta,
    status: options.status,
  };
}

function mapPaintingToArtwork(painting: CmsPainting): Artwork | null {
  if (!painting._id || typeof painting.year !== 'number') {
    return null;
  }

  const cmsImage = getSanityImageUrl(painting.mainImage, { width: 2200, fit: 'max' });
  const fullImage = cmsImage || null;
  if (!fullImage) {
    return null;
  }

  const thumbImage = getSanityImageUrl(painting.mainImage, {
    width: 620,
    height: 620,
    fit: 'crop',
  }) ?? fullImage;

  const title = painting.title?.trim() || `Untitled ${painting.year}`;
  const caption = painting.caption?.trim() || title;
  const copyrightYear = typeof painting.copyrightYear === 'number' ? painting.copyrightYear : painting.year;
  const price = painting.price?.trim() || null;

  return {
    paintingName: caption,
    title,
    imageUrl: fullImage,
    thumbnailUrl: thumbImage,
    status: toLegacyStatus(painting.status),
    previewImageFit: painting.cardImageFit ?? 'cover',
    dimensions: painting.dimensions ?? null,
    price,
    copyrightYear,
    medium: painting.medium ?? null,
    caption,
    year: String(painting.year),
    isCommission: false,
    sourceFile: painting._id,
  };
}

function parseYearBounds(label: string): { from: number; to: number } | null {
  if (/^\d{4}$/.test(label)) {
    const year = Number(label);
    return { from: year, to: year };
  }

  const before = label.match(/before\s+(\d{4})/i);
  if (before) {
    return {
      from: Number.NEGATIVE_INFINITY,
      to: Number(before[1]) - 1,
    };
  }

  const range = label.match(/(\d{4})\s*[-–]\s*(\d{4})/);
  if (range) {
    const first = Number(range[1]);
    const second = Number(range[2]);
    return {
      from: Math.min(first, second),
      to: Math.max(first, second),
    };
  }

  return null;
}

function doesBoundsMatchRange(bounds: { from: number; to: number }, range: YearRangeFilter): boolean {
  const rangeFrom = range.from ?? Number.NEGATIVE_INFINITY;
  const rangeTo = range.to ?? Number.POSITIVE_INFINITY;
  return bounds.from <= rangeTo && bounds.to >= rangeFrom;
}

function getGroupedYearRanges(artworks: Artwork[]): YearGroup[] {
  const bucket = new Map<string, Artwork[]>();
  for (const range of YEAR_RANGE_FILTERS) {
    bucket.set(range.key, []);
  }

  for (const artwork of artworks) {
    const bounds = parseYearBounds(artwork.year);
    if (!bounds) {
      continue;
    }

    const match = YEAR_RANGE_FILTERS.find((range) => doesBoundsMatchRange(bounds, range));
    if (!match) {
      continue;
    }

    bucket.get(match.key)?.push(artwork);
  }

  return YEAR_RANGE_FILTERS.map((range, index) => ({
    year: range.label,
    works: bucket.get(range.key) ?? [],
    accentClass: ACCENT_CYCLE[index % ACCENT_CYCLE.length],
  })).filter((group) => group.works.length > 0);
}

function toFallbackSiteSettings(): SiteSettingsView {
  return {
    siteTitle: 'MBPOPART.COM',
    contactEmail: commonContact.email,
    contactPhone: commonContact.phone,
    locationLabel: 'Venice Florida USA',
    sandsDisplayMessage: siteContent.homepage.exhibiting[0] ?? '',
    footerText: DEFAULT_FOOTER_COPY,
    footerPortraitUrl: '/assets/mbface.png',
    socialLinks: [],
    footerLinks: [],
    seo: {
      metaTitle: 'Michel Balasis | Pop Art \u2014 Chicago',
      metaDescription: 'Original pop art paintings by Michel Balasis.',
    },
  };
}

export async function getSiteSettingsContent(): Promise<SiteSettingsView> {
  const settings = await sanityFetch<CmsSiteSettings>({
    query: SITE_SETTINGS_QUERY,
    tags: ['siteSettings'],
  });

  if (!settings) {
    return toFallbackSiteSettings();
  }

  return {
    siteTitle: settings.siteTitle?.trim() || 'MBPOPART.COM',
    tagline: settings.tagline?.trim() || undefined,
    contactEmail: settings.contactEmail?.trim() || commonContact.email,
    contactPhone: settings.contactPhone?.trim() || commonContact.phone,
    locationLabel: settings.locationLabel?.trim() || 'Venice Florida USA',
    sandsDisplayMessage: settings.sandsDisplayMessage?.trim() || siteContent.homepage.exhibiting[0] || '',
    footerText: settings.footerText?.trim() || DEFAULT_FOOTER_COPY,
    footerPortraitUrl: getSanityImageUrl(settings.footerPortrait, { width: 280, fit: 'crop' }) || '/assets/mbface.png',
    socialLinks: (settings.socialLinks ?? [])
      .filter((item) => Boolean(item?.label && item?.url))
      .map((item) => ({ label: item?.label?.trim() || '', url: item?.url?.trim() || '' })),
    footerLinks: (settings.footerLinks ?? [])
      .filter((item) => Boolean(item?.label && item?.url))
      .map((item) => ({ label: item?.label?.trim() || '', url: item?.url?.trim() || '' })),
    seo: {
      metaTitle: settings.defaultSEO?.metaTitle?.trim() || undefined,
      metaDescription: settings.defaultSEO?.metaDescription?.trim() || undefined,
      ogImageUrl: getSanityImageUrl(settings.defaultSEO?.ogImage, { width: 1200, height: 630, fit: 'crop' }),
    },
  };
}

export async function getNavigationContent(): Promise<NavigationViewItem[]> {
  const navigation = await sanityFetch<CmsNavigation>({
    query: NAVIGATION_QUERY,
    tags: ['navigation'],
  });

  const mapped = (navigation?.items ?? [])
    .map(mapNavItem)
    .filter((item): item is NavigationViewItem => item !== null)
    .sort((a, b) => a.order - b.order);

  return mapped.length > 0 ? mapped : DEFAULT_NAVIGATION;
}

export async function getGlobalContent(): Promise<GlobalContentView> {
  const [siteSettings, navigation] = await Promise.all([
    getSiteSettingsContent(),
    getNavigationContent(),
  ]);

  return {
    siteSettings,
    navigation,
  };
}

export async function getLandingPageContent(): Promise<LandingPageView> {
  const landing = await sanityFetch<CmsLandingPage>({
    query: LANDING_PAGE_QUERY,
    tags: ['landingPage'],
  });

  const heroImages = sortByOrder(landing?.heroImages ?? [])
    .map((hero, index) => {
      const imageUrl = getSanityImageUrl(hero.image, { width: 2200, fit: 'max' });
      if (!imageUrl) return null;
      return {
        imageUrl,
        alt: hero.alt?.trim() || `Hero image ${index + 1}`,
        caption: hero.caption?.trim() || undefined,
        order: typeof hero.order === 'number' ? hero.order : index + 1,
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  const mergedHeroImages = mergeUniqueByKey(heroImages, FALLBACK_HERO_IMAGES, (item) => `img:${normalizeString(item.imageUrl)}`);

  return {
    heroImages: mergedHeroImages.length > 0 ? mergedHeroImages : FALLBACK_HERO_IMAGES,
    introHeading: landing?.introHeading?.trim() || undefined,
    introBody: (landing?.introBody && landing.introBody.length > 0)
      ? landing.introBody
      : portableTextFromLongText(siteContent.homepage.welcomeText),
  };
}

export async function getBioPageContent(): Promise<BioPageView> {
  const page = await sanityFetch<CmsBioPage>({
    query: BIO_PAGE_QUERY,
    tags: ['bioPage'],
  });

  const cmsGallery = sortByOrder(page?.galleryImages ?? [])
    .map((item) =>
      mapCmsImageToLegacyThumb(item.image, {
        caption: item.caption?.trim() || item.alt?.trim() || 'Bio image',
      }),
    )
    .filter((item): item is LegacyThumbItem => item !== null);

  return {
    title: page?.title?.trim() || 'INTRO BIO',
    portraitImageUrl: getSanityImageUrl(page?.portraitImage, { width: 220, height: 220, fit: 'crop' }),
    body: (page?.body && page.body.length > 0)
      ? page.body
      : portableTextFromLongText(siteContent.bio.bioText),
    galleryItems: cmsGallery.length > 0 ? cmsGallery : bioItems,
  };
}

export async function getPaintingsPageContent(): Promise<PaintingsPageView> {
  const [page, paintings] = await Promise.all([
    sanityFetch<CmsPaintingsPage>({
      query: PAINTINGS_PAGE_QUERY,
      tags: ['paintingsPage'],
    }),
    sanityFetch<CmsPainting[]>({
      query: PAINTINGS_QUERY,
      tags: ['painting'],
    }),
  ]);

  const cmsArtworks = (paintings ?? [])
    .map(mapPaintingToArtwork)
    .filter((item): item is Artwork => item !== null);

  return {
    title: page?.title?.trim() || 'Paintings',
    introText: (page?.introText && page.introText.length > 0)
      ? page.introText
      : paragraphsToPortableText([
          'Browse Michel Balasis paintings by year. Click any thumbnail to view a larger image.',
          'Use the year buttons to jump directly to a specific collection.',
        ]),
    yearGroups: getGroupedYearRanges(cmsArtworks.length > 0 ? cmsArtworks : getAllArtworks()),
  };
}

export async function getAvailablePageContent(): Promise<AvailablePageView> {
  const [page, paintings] = await Promise.all([
    sanityFetch<CmsAvailablePage>({
      query: AVAILABLE_PAGE_QUERY,
      tags: ['availablePage'],
    }),
    sanityFetch<CmsPainting[]>({
      query: AVAILABLE_PAINTINGS_QUERY,
      tags: ['painting', 'availablePage'],
    }),
  ]);

  const cmsItems = (paintings ?? [])
    .map((painting): LegacyThumbItem | null => {
      const artwork = mapPaintingToArtwork(painting);
      if (!artwork) {
        return null;
      }

      const status = toLegacyStatus(painting.status);
      const caption = sanitizeAvailableCaption(artwork.paintingName);
      const item: LegacyThumbItem = {
        imageUrl: artwork.imageUrl,
        thumbUrl: artwork.thumbnailUrl,
        caption: caption || artwork.paintingName,
        status,
        imageFit: artwork.previewImageFit ?? 'cover',
      };

      const meta = buildAvailableMeta({
        dimensions: artwork.dimensions,
        price: artwork.price,
      });
      if (meta) {
        item.meta = meta;
      }

      return item;
    })
    .filter((item): item is LegacyThumbItem => item !== null);

  const sourceItems = cmsItems.length > 0 ? cmsItems : availableItems;
  const normalizedItems = sourceItems
    .filter((item) => !isComingSoonPlaceholder(item))
    .map((item) => {
      const statusFromCaption = item.caption.match(/\((available|sold)\)/i)?.[1]?.toLowerCase();
      const status = item.status ?? (statusFromCaption === 'available'
        ? 'AVAILABLE'
        : statusFromCaption === 'sold'
          ? 'SOLD'
          : undefined);

      return {
        imageUrl: item.imageUrl || item.thumbUrl,
        thumbUrl: item.thumbUrl || item.imageUrl,
        caption: sanitizeAvailableCaption(item.caption || 'Untitled'),
        status,
        meta: buildAvailableMeta({
          fallbackMeta: item.meta,
        }),
        imageFit: item.imageFit,
      } satisfies LegacyThumbItem;
    })
    .filter((item) => Boolean(item.imageUrl && item.thumbUrl));

  return {
    title: page?.title?.trim() || legacyPageCopy.available.title || DEFAULT_AVAILABLE_TITLE,
    introText: (page?.introText && page.introText.length > 0)
      ? page.introText
      : paragraphsToPortableText(legacyPageCopy.available.paragraphs),
    items: normalizedItems,
  };
}

export async function getCommissionsPageContent(): Promise<CommissionsPageView> {
  const page = await sanityFetch<CmsCommissionsPage>({
    query: COMMISSIONS_PAGE_QUERY,
    tags: ['commissionsPage'],
  });

  const processSteps = sortByOrder(page?.steps ?? [])
    .map((step, index) => {
      const imageUrl = getSanityImageUrl(step.image, { width: 1200, fit: 'max' });
      return {
        id: `step-${index + 1}`,
        label: step.title?.trim() || `Step ${index + 1}`,
        images: imageUrl ? [imageUrl] : [],
        caption: step.description?.trim() || undefined,
      };
    })
    .filter((item) => item.label.length > 0);

  const visibleExamples = sortByOrder(page?.examples ?? []).filter((example) => !example.privacyHidden);
  const exampleItems = visibleExamples
    .map((example) => {
      const orderedImages = sortByOrder(example.images ?? []);
      const preferredImage =
        orderedImages.find((image) => image.role === 'final') ??
        orderedImages.find((image) => image.role === 'happyClient') ??
        orderedImages[0];
      if (!preferredImage) {
        return null;
      }
      return mapCmsImageToLegacyThumb(preferredImage.image, {
        caption: example.title?.trim() || preferredImage.caption?.trim() || 'Commission example',
        meta: example.description?.trim() || undefined,
        aspect: 'landscape',
      });
    })
    .filter((item): item is LegacyThumbItem => item !== null);

  const resolvedProcessSteps = processSteps.length === 4 ? processSteps : commissionProcessSteps;

  return {
    title: page?.title?.trim() || legacyPageCopy.commissions.title,
    introText: (page?.introText && page.introText.length > 0)
      ? page.introText
      : paragraphsToPortableText(legacyPageCopy.commissions.paragraphs),
    processTitle: normalizeCommissionSpelling(page?.howItWorksTitle?.trim() || 'The Commission Process'),
    processSubtitle: normalizeCommissionSpelling(
      page?.howItWorksSubtitle?.trim() || DEFAULT_COMMISSION_PROCESS_SUBTITLE,
    ),
    downPaymentLabel: normalizeCommissionSpelling(
      page?.downPaymentLabel?.trim() || DEFAULT_COMMISSION_DOWN_PAYMENT_LABEL,
    ),
    downPaymentRule: page?.downPaymentRule?.trim() || DEFAULT_COMMISSION_DOWN_PAYMENT_RULE,
    processSteps: resolvedProcessSteps,
    examplesTitle: page?.examplesTitle?.trim() || 'Recent Commission Examples',
    exampleItems: exampleItems.length > 0 ? exampleItems : commissionItems,
  };
}

export async function getHappyClientsPageContent(): Promise<HappyClientsPageView> {
  const page = await sanityFetch<CmsHappyClientsPage>({
    query: HAPPY_CLIENTS_PAGE_QUERY,
    tags: ['happyClientsPage'],
  });

  const photos = sortByOrder(page?.photos ?? [])
    .map((photo) => {
      const image = getSanityImageUrl(photo.image, { width: 1800, fit: 'max' });
      if (!image) {
        return null;
      }

      const thumb = getSanityImageUrl(photo.image, { width: 720, height: 560, fit: 'crop' }) ?? image;
      return {
        image,
        thumb,
        caption: photo.caption?.trim() || undefined,
        location: photo.location?.trim() || undefined,
        note: photo.note?.trim() || undefined,
        featured: photo.featured ?? false,
        order: photo.order,
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  const fallbackPhotos = HAPPY_CLIENTS.filter((item) => item.image && item.image.trim()).map((item) => ({
    image: item.image,
    thumb: item.thumb || item.image,
    caption: item.caption,
    location: item.location,
    note: item.note,
    featured: false,
    order: 9999,
  }));

  return {
    title: page?.title?.trim() || DEFAULT_HAPPY_CLIENTS_TITLE,
    introText: (page?.introText && page.introText.length > 0)
      ? page.introText
      : paragraphsToPortableText(legacyPageCopy.photos.paragraphs),
    photos: photos.length > 0 ? photos : fallbackPhotos,
  };
}

export async function getNewsPageContent(): Promise<NewsPageView> {
  const page = await sanityFetch<CmsNewsPage>({
    query: NEWS_PAGE_QUERY,
    tags: ['newsPage'],
  });

  const items = sortByOrder(page?.items ?? [])
    .filter((item) => Boolean(item.title && item.pdfUrl))
    .map((item) => ({
      title: item.title?.trim() || '',
      date: item.date?.trim() || '',
      summary: item.summary?.trim() || '',
      pdfUrl: item.pdfUrl?.trim() || '',
    }));

  return {
    title: page?.title?.trim() || legacyPageCopy.news.title,
    introText: (page?.introText && page.introText.length > 0)
      ? page.introText
      : paragraphsToPortableText(legacyPageCopy.news.paragraphs),
    items: items.length > 0 ? items : newsItems,
  };
}

export async function getPrintsPageContent(): Promise<PrintsPageView> {
  const page = await sanityFetch<CmsPrintsPage>({
    query: PRINTS_PAGE_QUERY,
    tags: ['printsPage'],
  });

  const galleryItems = sortByOrder(page?.galleryImages ?? [])
    .map((item) =>
      mapCmsImageToLegacyThumb(item.image, {
        caption: item.caption?.trim() || item.alt?.trim() || 'Framed print',
      }),
    )
    .filter((item): item is LegacyThumbItem => item !== null);

  const defaultIntro = [
    legacyPageCopy.prints.paragraphs[0],
    legacyPageCopy.prints.paragraphs[1],
    'All prints on the following list are available:',
    legacyPageCopy.prints.paragraphs[2],
    legacyPageCopy.prints.paragraphs[3],
  ];

  return {
    title: page?.title?.trim() || legacyPageCopy.prints.title,
    introText: (page?.introText && page.introText.length > 0)
      ? page.introText
      : paragraphsToPortableText(defaultIntro),
    shipBoxImageUrl: getSanityImageUrl(page?.shipBoxImage, { width: 900, fit: 'max' }) || legacyPageCopy.prints.shipBoxImageUrl,
    shipBoxImageAlt: page?.shipBoxImageAlt?.trim() || 'Print shipping box',
    availableTitles: (() => {
      const titles = (page?.availableTitles ?? []).filter((title): title is string => Boolean(title?.trim()));
      return titles.length > 0 ? titles : legacyPageCopy.prints.availableTitles;
    })(),
    galleryItems: galleryItems.length > 0 ? galleryItems : printItems,
  };
}

function mapVenueFromCmsVenue(venue: CmsVenueItem): VenueItemView | null {
  if (!venue?.name) {
    return null;
  }

  return {
    name: venue.name.trim(),
    address: venue.address?.trim() || undefined,
    phone: venue.phone?.trim() || undefined,
    email: venue.email?.trim() || undefined,
    website: venue.website?.trim() || undefined,
    imageUrl: getSanityImageUrl(venue.image, { width: 520, height: 520, fit: 'crop' }),
  };
}

export async function getVenuesPageContent(): Promise<VenuesPageView> {
  const page = await sanityFetch<CmsVenuesPage>({
    query: VENUES_PAGE_QUERY,
    tags: ['venuesPage'],
  });

  const venues = sortByOrder(page?.venues ?? [])
    .map(mapVenueFromCmsVenue)
    .filter((item): item is VenueItemView => item !== null);

  const fallbackVenues: VenueItemView[] = siteContent.venues.map((venue) => ({
    name: venue.name,
    address: venue.address ?? undefined,
    phone: venue.phone ?? undefined,
    email: venue.email ?? undefined,
    website: venue.website ?? undefined,
    imageUrl: venue.imageUrl ?? undefined,
  }));

  return {
    title: page?.title?.trim() || legacyPageCopy.venues.title,
    introText: (page?.introText && page.introText.length > 0)
      ? page.introText
      : paragraphsToPortableText(legacyPageCopy.venues.paragraphs),
    venues: venues.length > 0 ? venues : fallbackVenues,
  };
}
