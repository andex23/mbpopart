import scrapedArtworks from './scraped-artworks.json';
import scrapedContent from './scraped-content.json';

export interface Artwork {
  paintingName: string;
  title: string;
  imageUrl: string;
  thumbnailUrl: string;
  dimensions: string | null;
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

const artworks: Artwork[] = scrapedArtworks as Artwork[];

const ACCENT_CYCLE = ['accent-yellow', 'accent-pink', 'accent-blue', 'accent-orange', 'accent-green'];

const YEAR_ORDER = [
  '2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013',
  '2012', '2011', '2010', '2009', '2008', '2007', '2005-2006',
  '2001-2004', '1998-2000', 'Before 1998',
];

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

export const siteContent = scrapedContent;
