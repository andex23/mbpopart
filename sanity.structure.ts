import type { StructureResolver } from 'sanity/structure';
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
    return '_type == "painting" && year <= $to';
  }

  if (range.from !== null && range.to !== null) {
    return '_type == "painting" && year >= $from && year <= $to';
  }

  if (range.from !== null && range.to === null) {
    return '_type == "painting" && year >= $from';
  }

  return '_type == "painting"';
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
              S.listItem()
                .title('All Paintings')
                .child(
                  S.documentTypeList('painting')
                    .title('All Paintings')
                    .defaultOrdering(paintingDefaultOrdering),
                ),
              S.listItem()
                .title('By Year Range')
                .child(
                  S.list()
                    .title('Paintings by Year Range')
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
                                      .filter(paintingRangeFilter(range))
                                      .params(paintingRangeParams(range))
                                      .defaultOrdering(paintingDefaultOrdering),
                                  ),
                                ...getYearsForRange(range).map((year) =>
                                  S.listItem()
                                    .title(String(year))
                                    .child(
                                      S.documentList()
                                        .title(`Paintings - ${year}`)
                                        .schemaType('painting')
                                        .filter('_type == "painting" && year == $year')
                                        .params({ year })
                                        .defaultOrdering(paintingDefaultOrdering),
                                    ),
                                ),
                              ]),
                          ),
                      ),
                    ),
                ),
              S.listItem()
                .title('Available')
                .child(
                  S.documentList()
                    .title('Available Paintings')
                    .schemaType('painting')
                    .filter('_type == "painting" && status == "available"')
                    .defaultOrdering(paintingDefaultOrdering),
                ),
              S.listItem()
                .title('Sold')
                .child(
                  S.documentList()
                    .title('Sold Paintings')
                    .schemaType('painting')
                    .filter('_type == "painting" && status == "sold"')
                    .defaultOrdering(paintingDefaultOrdering),
                ),
              S.listItem()
                .title('Featured')
                .child(
                  S.documentList()
                    .title('Featured Paintings')
                    .schemaType('painting')
                    .filter('_type == "painting" && featured == true')
                    .defaultOrdering(paintingDefaultOrdering),
                ),
              S.listItem()
                .title('Archived')
                .child(
                  S.documentList()
                    .title('Archived Paintings')
                    .schemaType('painting')
                    .filter('_type == "painting" && status == "archive"')
                    .defaultOrdering(paintingDefaultOrdering),
                ),
            ]),
        ),
      singletonItem(S, 'Paintings Page', 'paintingsPage', 'paintingsPage'),
      singletonItem(S, 'Available Page', 'availablePage', 'availablePage'),
      singletonItem(S, 'Commissions Page', 'commissionsPage', 'commissionsPage'),
      singletonItem(S, 'Happy Clients', 'happyClientsPage', 'happyClientsPage'),
    ]);

export default deskStructure;
