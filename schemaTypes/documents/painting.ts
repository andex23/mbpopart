import { defineArrayMember, defineField, defineType } from 'sanity';

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
      description: 'Use a 4-digit year like 2019.',
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
      name: 'comingSoon',
      title: 'Show "Coming Soon" Placeholder',
      type: 'boolean',
      group: 'images',
      description: 'Enable when image is not ready yet. A branded placeholder tile is shown.',
      initialValue: false,
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      group: 'images',
      description: 'Upload high-resolution image. To nudge how it sits inside the smaller card window, open the image editor and adjust the hotspot/crop so the important area stays visible.',
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
      group: 'images',
      validation: (Rule) => Rule.max(140),
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
      description: 'Available and Sold paintings appear on the Available page automatically. Use this to control what shows there.',
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
      name: 'inventoryOnly',
      title: 'Inventory Only',
      type: 'boolean',
      group: 'placement',
      description: 'Use for Available/Sold inventory cards that should appear on the Available page, but not in the main Paintings year gallery.',
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
      description: 'Lower values appear first within the same year. Easiest method: use Paintings > Painting Order in the CMS.',
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
      comingSoon: 'comingSoon',
      sortOrder: 'sortOrder',
      inventoryOnly: 'inventoryOnly',
    },
    prepare({ title, caption, year, copyrightYear, media, status, comingSoon, sortOrder, inventoryOnly }) {
      return {
        title: caption || title || 'Untitled painting',
        subtitle:
          `${copyrightYear ?? year ?? 'no year'} · ${status ?? 'no status'} · order: ${sortOrder ?? 'auto'}${inventoryOnly ? ' · inventory only' : ''}${comingSoon ? ' · coming soon' : ''}` +
          `${caption && title ? ` · title: ${title}` : ''}`,
        media,
      };
    },
  },
});
