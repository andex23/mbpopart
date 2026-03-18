import type { StructureResolver } from 'sanity/structure';
import AvailableOrderPane from './src/components/AvailableOrderPane';
import PaintingOrderPane from './src/components/PaintingOrderPane';
import StudioPreviewPane from './src/components/StudioPreviewPane';

type StudioYearRange = {
  key: string;
  title: string;
  from: number | null;
  to: number | null;
};

const EARLIEST_ARCHIVE_YEAR = 1986;
const CURRENT_YEAR = new Date().getFullYear();

const PAINTING_YEAR_RANGES: StudioYearRange[] = [
  { key: 'before-1998', title: 'Before 1998', from: null, to: 1997 },
  { key: '1999-2004', title: '1999-2004', from: 1999, to: 2004 },
  { key: '2005-2009', title: '2005-2009', from: 2005, to: 2009 },
  { key: '2010-2015', title: '2010-2015', from: 2010, to: 2015 },
  { key: '2016-2020', title: '2016-2020', from: 2016, to: 2020 },
  { key: '2021-2025', title: '2021-2025', from: 2021, to: 2025 },
  { key: '2026-current', title: '2026-Current', from: 2026, to: null },
];

const paintingDefaultOrdering = [
  { field: 'year', direction: 'desc' as const },
  { field: 'sortOrder', direction: 'asc' as const },
  { field: '_updatedAt', direction: 'desc' as const },
];

const availableInventoryOrdering = [
  { field: 'sortOrder', direction: 'asc' as const },
  { field: 'year', direction: 'desc' as const },
  { field: '_updatedAt', direction: 'desc' as const },
];

const galleryPaintingFilter = '_type == "painting" && (!defined(inventoryOnly) || inventoryOnly != true)';
const activeGalleryPaintingFilter = `${galleryPaintingFilter} && (!defined(status) || status != "archive")`;

function getYearsForRange(range: StudioYearRange): number[] {
  if (range.from === null && range.to !== null) {
    const years: number[] = [];
    for (let year = range.to; year >= EARLIEST_ARCHIVE_YEAR; year -= 1) {
      years.push(year);
    }
    return years;
  }

  if (range.from !== null && range.to !== null) {
    const years: number[] = [];
    for (let year = range.to; year >= range.from; year -= 1) {
      years.push(year);
    }
    return years;
  }

  if (range.from !== null && range.to === null) {
    const years: number[] = [];
    for (let year = CURRENT_YEAR; year >= range.from; year -= 1) {
      years.push(year);
    }
    return years;
  }

  return [];
}

function paintingRangeFilter(range: StudioYearRange): string {
  if (range.from === null && range.to !== null) {
    return `${galleryPaintingFilter} && year <= $to`;
  }

  if (range.from !== null && range.to !== null) {
    return `${galleryPaintingFilter} && year >= $from && year <= $to`;
  }

  if (range.from !== null && range.to === null) {
    return `${galleryPaintingFilter} && year >= $from`;
  }

  return galleryPaintingFilter;
}

function paintingRangeParams(range: StudioYearRange): Record<string, number> {
  const params: Record<string, number> = {};
  if (typeof range.from === 'number') {
    params.from = range.from;
  }
  if (typeof range.to === 'number') {
    params.to = range.to;
  }
  return params;
}

const singletonItem = (
  S: Parameters<StructureResolver>[0],
  title: string,
  schemaType: string,
  documentId: string,
) =>
  S.listItem()
    .title(title)
    .child(S.document().schemaType(schemaType).documentId(documentId));

export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title('Dashboard')
    .items([
      S.listItem()
        .title('Site Preview')
        .child(S.component(StudioPreviewPane).title('Site Preview')),
      singletonItem(S, 'Site Settings', 'siteSettings', 'siteSettings'),
      singletonItem(S, 'Navigation', 'navigation', 'navigation'),
      singletonItem(S, 'Landing Page', 'landingPage', 'landingPage'),
      singletonItem(S, 'Bio Page', 'bioPage', 'bioPage'),
      S.listItem()
        .title('Paintings')
        .child(
          S.list()
            .title('Paintings')
            .items([
              singletonItem(S, 'Page Settings', 'paintingsPage', 'paintingsPage'),
              S.listItem()
                .title('Painting Order, Archive & Delete')
                .child(S.component(PaintingOrderPane).title('Painting Order, Archive & Delete')),
              S.listItem()
                .title('Gallery Paintings')
                .child(
                  S.documentList()
                    .title('Gallery Paintings')
                    .schemaType('painting')
                    .filter(activeGalleryPaintingFilter)
                    .initialValueTemplates([S.initialValueTemplateItem('gallery-painting')])
                    .defaultOrdering(paintingDefaultOrdering),
                ),
              S.listItem()
                .title('Archived')
                .child(
                  S.documentList()
                    .title('Archived Paintings')
                    .schemaType('painting')
                    .filter(`${galleryPaintingFilter} && status == "archive"`)
                    .defaultOrdering(paintingDefaultOrdering),
                ),
              S.listItem()
                .title('Browse by Year')
                .child(
                  S.list()
                    .title('Browse by Year')
                    .items(
                      PAINTING_YEAR_RANGES.map((range) =>
                        S.listItem()
                          .title(range.title)
                          .child(
                            S.list()
                              .title(range.title)
                              .items([
                                S.listItem()
                                  .title(`All ${range.title}`)
                                  .child(
                                    S.documentList()
                                      .title(`${range.title} Paintings`)
                                      .schemaType('painting')
                                      .filter(`${paintingRangeFilter(range)} && (!defined(status) || status != "archive")`)
                                      .params(paintingRangeParams(range))
                                      .initialValueTemplates([S.initialValueTemplateItem('gallery-painting')])
                                      .defaultOrdering(paintingDefaultOrdering),
                                  ),
                                ...getYearsForRange(range).map((year) =>
                                  S.listItem()
                                    .title(String(year))
                                    .child(
                                      S.documentList()
                                        .title(`Paintings - ${year}`)
                                        .schemaType('painting')
                                        .filter(`${activeGalleryPaintingFilter} && year == $year`)
                                        .params({ year })
                                        .initialValueTemplates([S.initialValueTemplateItem('gallery-painting')])
                                        .defaultOrdering(paintingDefaultOrdering),
                                    ),
                                ),
                              ]),
                          ),
                      ),
                    ),
                ),
            ]),
        ),
      S.listItem()
        .title('Available')
        .child(
          S.list()
            .title('Available')
            .items([
              singletonItem(S, 'Page Settings', 'availablePage', 'availablePage'),
              S.listItem()
                .title('Available Order')
                .child(S.component(AvailableOrderPane).title('Available Order')),
              S.listItem()
                .title('Paintings Shown on Available Page')
                .child(
                  S.documentList()
                    .title('Available Page Paintings')
                    .schemaType('painting')
                    .filter('_type == "painting" && status in ["available", "sold"]')
                    .initialValueTemplates([
                      S.initialValueTemplateItem('available-inventory-painting'),
                      S.initialValueTemplateItem('sold-inventory-painting'),
                    ])
                    .defaultOrdering(availableInventoryOrdering),
                ),
              S.listItem()
                .title('Available Only')
                .child(
                  S.documentList()
                    .title('Available Paintings')
                    .schemaType('painting')
                    .filter('_type == "painting" && status == "available"')
                    .initialValueTemplates([S.initialValueTemplateItem('available-inventory-painting')])
                    .defaultOrdering(availableInventoryOrdering),
                ),
              S.listItem()
                .title('Sold Items Still Showing Here')
                .child(
                  S.documentList()
                    .title('Sold Paintings on Available Page')
                    .schemaType('painting')
                    .filter('_type == "painting" && status == "sold"')
                    .initialValueTemplates([S.initialValueTemplateItem('sold-inventory-painting')])
                    .defaultOrdering(availableInventoryOrdering),
                ),
            ]),
        ),
      singletonItem(S, 'Commissions Page', 'commissionsPage', 'commissionsPage'),
      singletonItem(S, 'Happy Clients', 'happyClientsPage', 'happyClientsPage'),
    ]);

export default deskStructure;
