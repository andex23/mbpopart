import scrapedArtworks from './scraped-artworks.json';
import scrapedContent from './scraped-content.json';

export interface Artwork {
  paintingName: string;
  title: string;
  imageUrl: string;
  thumbnailUrl: string;
  previewImageFit?: 'cover' | 'contain' | null;
  dimensions: string | null;
  price?: string | null;
  copyrightYear?: number | null;
  medium: string | null;
  caption: string;
  year: string;
  isCommission: boolean;
  sourceFile: string;
}

export interface YearGroup {
  year: string;
  works: Artwork[];
  accentClass: string;
}

export interface YearRangeFilter {
  key: string;
  label: string;
  from: number | null;
  to: number | null;
}

const rawArtworks: Artwork[] = scrapedArtworks as Artwork[];

const ACCENT_CYCLE = ['accent-yellow', 'accent-pink', 'accent-blue', 'accent-orange', 'accent-green'];

const YEAR_ORDER = [
  '2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013',
  '2012', '2011', '2010', '2009', '2008', '2007', '2005-2006',
  '2001-2004', '1998-2000', 'Before 1998',
];

export const YEAR_RANGE_FILTERS: YearRangeFilter[] = [
  { key: 'before-1998', label: 'Before 1998', from: null, to: 1997 },
  { key: '1999-2004', label: '1999–2004', from: 1999, to: 2004 },
  { key: '2005-2009', label: '2005–2009', from: 2005, to: 2009 },
  { key: '2010-2015', label: '2010–2015', from: 2010, to: 2015 },
  { key: '2016-2020', label: '2016–2020', from: 2016, to: 2020 },
  { key: '2021-2025', label: '2021–2025', from: 2021, to: 2025 },
  { key: '2026-current', label: '2026–Current', from: 2026, to: null },
];

function getArtworkIdentityKey(work: Artwork): string {
  const imageKey = work.imageUrl?.trim().toLowerCase();
  if (imageKey) {
    return `img:${imageKey}`;
  }

  const titleKey = (work.paintingName || work.title || '').trim().toLowerCase();
  const captionKey = (work.caption || '').trim().toLowerCase();
  const yearKey = (work.year || '').trim();
  return `meta:${titleKey}|${captionKey}|${yearKey}`;
}

function isGenericUntitled(value: string | null | undefined): boolean {
  const normalized = (value ?? '').trim().toLowerCase();
  if (!normalized) return true;
  return normalized === 'untitled' ||
    normalized === 'untitled.' ||
    normalized === 'untitled..' ||
    normalized.startsWith('untitled ');
}

function titleFromImageUrl(imageUrl: string): string | null {
  if (!imageUrl) {
    return null;
  }

  try {
    const url = new URL(imageUrl);
    const filename = decodeURIComponent(url.pathname.split('/').pop() ?? '');
    const base = filename.replace(/\.[a-z0-9]+$/i, '').trim();
    if (!base) {
      return null;
    }

    const title = base
      .replace(/[_-]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .split(' ')
      .map((token) => token.charAt(0).toUpperCase() + token.slice(1))
      .join(' ');

    return title || null;
  } catch {
    return null;
  }
}

const artworks: Artwork[] = (() => {
  const seen = new Set<string>();
  const unique: Artwork[] = [];

  for (const work of rawArtworks) {
    const key = getArtworkIdentityKey(work);
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    unique.push(work);
  }

  return unique;
})();

const YEAR_RANGE_MAP: Record<string, YearRangeFilter> = Object.fromEntries(
  YEAR_RANGE_FILTERS.map((range) => [range.key, range]),
);

function parseYearGroupBounds(yearLabel: string): { from: number; to: number } | null {
  const beforeMatch = yearLabel.match(/Before\s+(\d{4})/i);
  if (beforeMatch) {
    const upperYear = Number(beforeMatch[1]) - 1;
    return { from: Number.NEGATIVE_INFINITY, to: upperYear };
  }

  const openEndedMatch = yearLabel.match(/(\d{4})\s*[-–]\s*(current|present)/i);
  if (openEndedMatch) {
    return { from: Number(openEndedMatch[1]), to: Number.POSITIVE_INFINITY };
  }

  const rangeMatch = yearLabel.match(/(\d{4})\s*[-–]\s*(\d{4})/);
  if (rangeMatch) {
    const start = Number(rangeMatch[1]);
    const end = Number(rangeMatch[2]);
    return { from: Math.min(start, end), to: Math.max(start, end) };
  }

  const singleYearMatch = yearLabel.match(/^\d{4}$/);
  if (singleYearMatch) {
    const year = Number(singleYearMatch[0]);
    return { from: year, to: year };
  }

  return null;
}

function doesRangeOverlap(
  bounds: { from: number; to: number },
  range: YearRangeFilter,
): boolean {
  const from = range.from ?? Number.NEGATIVE_INFINITY;
  const to = range.to ?? Number.POSITIVE_INFINITY;
  return bounds.from <= to && bounds.to >= from;
}

export function normalizeRangeFilterKey(value: string | null): string | null {
  if (!value) return null;

  if (YEAR_RANGE_MAP[value]) {
    return value;
  }

  const matchingLabel = YEAR_RANGE_FILTERS.find((range) => range.label === value);
  if (matchingLabel) {
    return matchingLabel.key;
  }

  const bounds = parseYearGroupBounds(value);
  if (!bounds) return null;

  const matchingRange = YEAR_RANGE_FILTERS.find((range) => doesRangeOverlap(bounds, range));
  return matchingRange?.key ?? null;
}

export function doesYearGroupMatchRangeFilter(yearLabel: string, rangeKey: string): boolean {
  const range = YEAR_RANGE_MAP[rangeKey];
  if (!range) return false;

  const bounds = parseYearGroupBounds(yearLabel);
  if (!bounds) return false;

  return doesRangeOverlap(bounds, range);
}

export function getAllYearGroups(): YearGroup[] {
  const grouped: Record<string, Artwork[]> = {};

  for (const work of artworks) {
    if (!grouped[work.year]) grouped[work.year] = [];
    grouped[work.year].push(work);
  }

  return YEAR_ORDER
    .filter(year => grouped[year] && grouped[year].length > 0)
    .map((year, index) => ({
      year,
      works: grouped[year],
      accentClass: ACCENT_CYCLE[index % ACCENT_CYCLE.length],
    }));
}

export function getFeaturedWorks(): Artwork[] {
  const groups = getAllYearGroups();
  const featured: Artwork[] = [];

  for (const group of groups.slice(0, 4)) {
    for (const work of group.works.slice(0, 2)) {
      featured.push(work);
      if (featured.length >= 6) return featured;
    }
  }

  return featured;
}

export function getAccentClassForIndex(index: number): string {
  return ACCENT_CYCLE[index % ACCENT_CYCLE.length];
}

export function getTotalArtworkCount(): number {
  return artworks.length;
}

export function getAllArtworks(): Artwork[] {
  return artworks;
}

export function getArtworkYearValue(work: Artwork): number | null {
  const directYear = work.year.match(/^\d{4}$/);
  if (directYear) {
    return Number(directYear[0]);
  }

  const yearBounds = parseYearGroupBounds(work.year);
  if (yearBounds) {
    if (Number.isFinite(yearBounds.to)) {
      return yearBounds.to;
    }
    if (Number.isFinite(yearBounds.from)) {
      return yearBounds.from;
    }
  }

  const yearMatch = `${work.caption} ${work.paintingName}`.match(/(19|20)\d{2}/);
  if (yearMatch) {
    return Number(yearMatch[0]);
  }

  return null;
}

export function getRangeFromFilterKey(key: string): YearRangeFilter | null {
  return YEAR_RANGE_MAP[key] ?? null;
}

export function getArtworkDisplayTitle(work: Artwork): string {
  const candidates = [work.paintingName, work.caption, work.title];
  for (const candidate of candidates) {
    const trimmed = candidate?.trim() || '';
    if (!trimmed || isGenericUntitled(trimmed)) {
      continue;
    }
    return trimmed;
  }

  const fromImage = titleFromImageUrl(work.imageUrl);
  if (fromImage) {
    return fromImage;
  }

  return 'Untitled';
}

export const siteContent = scrapedContent;
