import { defineArrayMember, defineField, defineType } from 'sanity';

const EARLIEST_SELECTABLE_YEAR = 1950;
const LATEST_SELECTABLE_YEAR = new Date().getFullYear() + 5;
const PAINTING_VALIDATION_API_VERSION = '2026-02-23';
const PAINTING_YEAR_OPTIONS = Array.from(
  { length: LATEST_SELECTABLE_YEAR - EARLIEST_SELECTABLE_YEAR + 1 },
  (_, index) => {
    const year = LATEST_SELECTABLE_YEAR - index;
    return { title: String(year), value: year };
  },
);

export const painting = defineType({
  name: 'painting',
  title: 'Painting',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'images', title: 'Images' },
    { name: 'placement', title: 'Placement' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: 'caption',
      title: 'Caption (Shown Under Image)',
      type: 'string',
      group: 'content',
      description: 'Optional short label shown on painting cards. If empty, title is used.',
      validation: (Rule) => Rule.max(140),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      group: 'content',
      description: 'Choose the exact year from the dropdown. The website year menus and year sections are built directly from this field.',
      options: {
        list: PAINTING_YEAR_OPTIONS,
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required().integer().min(1900).max(2100),
    }),
    defineField({
      name: 'copyrightYear',
      title: 'Copyright Year (Optional)',
      type: 'number',
      group: 'content',
      description: 'Shown on painting preview metadata as © year.',
      validation: (Rule) => Rule.integer().min(1900).max(2100),
    }),
    defineField({
      name: 'description',
      title: 'Description (Optional)',
      type: 'array',
      group: 'content',
      of: [defineArrayMember({ type: 'block' })],
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      group: 'images',
      description: 'Upload high-resolution image. To change how it sits inside the smaller card window, open the image editor and adjust the square crop first. Then move the hotspot circle if needed to keep the important area visible.',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImageAlt',
      title: 'Main Image Alt Text',
      type: 'string',
      group: 'images',
      validation: (Rule) => Rule.max(140),
    }),
    defineField({
      name: 'cardImageFit',
      title: 'Card Preview Fit',
      type: 'string',
      group: 'images',
      description: 'Use "Show Full Painting" when the small square card should keep the whole artwork visible instead of cropping it.',
      options: {
        list: [
          { title: 'Fill Window', value: 'cover' },
          { title: 'Show Full Painting', value: 'contain' },
        ],
        layout: 'radio',
      },
      initialValue: 'cover',
    }),
    defineField({
      name: 'galleryImages',
      title: 'Additional Images (Optional)',
      type: 'array',
      group: 'images',
      of: [defineArrayMember({ type: 'galleryImageItem' })],
      validation: (Rule) => Rule.max(20),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      group: 'placement',
      description: 'This is the visible label for the painting. It does not decide whether the painting appears on the Available page. Use Show on Available Page separately.',
      options: {
        list: [
          { title: 'Available', value: 'available' },
          { title: 'Sold', value: 'sold' },
          { title: 'Commission', value: 'commission' },
          { title: 'Not For Sale', value: 'notForSale' },
          { title: 'Archive', value: 'archive' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'notForSale',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'showOnAvailablePage',
      title: 'Show on Available Page',
      type: 'boolean',
      group: 'placement',
      initialValue: false,
      description: 'Simplest workflow: keep one painting record, then turn this on only if this same painting should also appear on the Available page. Leave it off for normal year-gallery paintings.',
      validation: (Rule) =>
        Rule.custom(async (value, context) => {
          if (value !== true) {
            return true;
          }

          const document = context.document as {
            _id?: string;
            title?: string;
            status?: string;
          } | undefined;

          const title = document?.title?.trim();
          if (!title) {
            return true;
          }

          if (!['available', 'sold', 'commission'].includes(document?.status ?? '')) {
            return 'Use Status = Available, Sold, or Commission before showing this painting on the Available page.';
          }

          const baseId = document?._id?.replace(/^drafts\./, '');
          const draftId = baseId ? `drafts.${baseId}` : null;
          const publishedId = baseId ?? null;
          const client = context.getClient({ apiVersion: PAINTING_VALIDATION_API_VERSION });
          const duplicateCount = await client.fetch<number>(
            `count(*[
              _type == "painting" &&
              defined(showOnAvailablePage) &&
              showOnAvailablePage == true &&
              status in ["available", "sold", "commission"] &&
              lower(title) == $title &&
              !(_id in [$draftId, $publishedId])
            ])`,
            {
              title: title.toLowerCase(),
              draftId,
              publishedId,
            },
          );

          return duplicateCount > 0
            ? 'Another painting with this same title is already set to show on the Available page. Use that record instead of creating a duplicate.'
            : true;
        }),
    }),
    defineField({
      name: 'inventoryOnly',
      title: 'Available Page Only (Hide From Year Gallery)',
      type: 'boolean',
      group: 'placement',
      description: 'Turn this on only for a stand-alone Available-page card that should not appear in the main Paintings year gallery.',
      initialValue: false,
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      group: 'placement',
      initialValue: false,
    }),
    defineField({
      name: 'sortOrder',
      title: 'Manual Sort Order (Optional)',
      type: 'number',
      group: 'placement',
      description: 'Lower values appear first within the same year. Easiest method: use Paintings > 1. Add / Reorder Year Gallery Paintings or Available > 1. Reorder Available Page Cards.',
      validation: (Rule) => Rule.min(0).max(100000),
    }),
    defineField({
      name: 'dimensions',
      title: 'Dimensions (Optional)',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: 'price',
      title: 'Price (Optional)',
      type: 'string',
      group: 'content',
      description: 'Example: $500 or SOLD',
      validation: (Rule) => Rule.max(80),
    }),
    defineField({
      name: 'medium',
      title: 'Medium (Optional)',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.max(60),
    }),
  ],
  orderings: [
    {
      title: 'Website Display Order',
      name: 'websiteDisplayOrder',
      by: [
        { field: 'year', direction: 'desc' },
        { field: 'sortOrder', direction: 'asc' },
        { field: '_updatedAt', direction: 'desc' },
      ],
    },
    {
      title: 'Manual Sort Order',
      name: 'manualSortOrder',
      by: [
        { field: 'sortOrder', direction: 'asc' },
        { field: 'year', direction: 'desc' },
        { field: '_updatedAt', direction: 'desc' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      caption: 'caption',
      year: 'year',
      copyrightYear: 'copyrightYear',
      media: 'mainImage',
      status: 'status',
      showOnAvailablePage: 'showOnAvailablePage',
      sortOrder: 'sortOrder',
      inventoryOnly: 'inventoryOnly',
      cardImageFit: 'cardImageFit',
    },
    prepare({ title, caption, year, copyrightYear, media, status, showOnAvailablePage, sortOrder, inventoryOnly, cardImageFit }) {
      return {
        title: caption || title || 'Untitled painting',
        subtitle:
          `${copyrightYear ?? year ?? 'no year'} · ${status ?? 'no status'} · order: ${sortOrder ?? 'auto'}${inventoryOnly ? ' · available-page-only' : ' · year gallery'}` +
          `${showOnAvailablePage === true ? ' · shown on available page' : showOnAvailablePage === false ? ' · hidden from available page' : ''}` +
          `${cardImageFit === 'contain' ? ' · full card' : ''}` +
          `${caption && title ? ` · title: ${title}` : ''}`,
        media,
      };
    },
  },
});
