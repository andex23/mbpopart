import { defineArrayMember, defineField, defineType } from 'sanity';

export const painting = defineType({
  name: 'painting',
  title: 'Painting',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: 'caption',
      title: 'Caption (Shown Under Image)',
      type: 'string',
      description: 'Optional short label shown on painting cards. If empty, title is used.',
      validation: (Rule) => Rule.max(140),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      description: 'Use a 4-digit year like 2019.',
      validation: (Rule) => Rule.required().integer().min(1900).max(2100),
    }),
    defineField({
      name: 'copyrightYear',
      title: 'Copyright Year (Optional)',
      type: 'number',
      description: 'Shown on painting preview metadata as © year.',
      validation: (Rule) => Rule.integer().min(1900).max(2100),
    }),
    defineField({
      name: 'description',
      title: 'Description (Optional)',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })],
    }),
    defineField({
      name: 'comingSoon',
      title: 'Show "Coming Soon" Placeholder',
      type: 'boolean',
      description: 'Enable when image is not ready yet. A branded placeholder tile is shown.',
      initialValue: false,
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      description: 'Upload high-resolution image.',
      options: { hotspot: true },
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const document = context.document as { comingSoon?: boolean } | undefined;
          if (document?.comingSoon || value) {
            return true;
          }
          return 'Main Image is required unless "Show Coming Soon Placeholder" is enabled.';
        }),
    }),
    defineField({
      name: 'mainImageAlt',
      title: 'Main Image Alt Text',
      type: 'string',
      validation: (Rule) => Rule.max(140),
    }),
    defineField({
      name: 'galleryImages',
      title: 'Additional Images (Optional)',
      type: 'array',
      of: [defineArrayMember({ type: 'galleryImageItem' })],
      validation: (Rule) => Rule.max(20),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      description: 'Available appears on the Available page automatically.',
      options: {
        list: [
          { title: 'Available', value: 'available' },
          { title: 'Sold', value: 'sold' },
          { title: 'Not For Sale', value: 'notForSale' },
          { title: 'Archive', value: 'archive' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'notForSale',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'sortOrder',
      title: 'Manual Sort Order (Optional)',
      type: 'number',
      description: 'Lower values appear first within the same year. Easiest method: use Paintings > Painting Order in the CMS.',
      validation: (Rule) => Rule.min(0).max(100000),
    }),
    defineField({
      name: 'dimensions',
      title: 'Dimensions (Optional)',
      type: 'string',
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: 'price',
      title: 'Price (Optional)',
      type: 'string',
      description: 'Example: $500 or SOLD',
      validation: (Rule) => Rule.max(80),
    }),
    defineField({
      name: 'medium',
      title: 'Medium (Optional)',
      type: 'string',
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
      comingSoon: 'comingSoon',
      sortOrder: 'sortOrder',
    },
    prepare({ title, caption, year, copyrightYear, media, status, comingSoon, sortOrder }) {
      return {
        title: caption || title || 'Untitled painting',
        subtitle:
          `${copyrightYear ?? year ?? 'no year'} · ${status ?? 'no status'} · order: ${sortOrder ?? 'auto'}${comingSoon ? ' · coming soon' : ''}` +
          `${caption && title ? ` · title: ${title}` : ''}`,
        media,
      };
    },
  },
});
