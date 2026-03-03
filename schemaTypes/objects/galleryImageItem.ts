import { defineField, defineType } from 'sanity';

export const galleryImageItem = defineType({
  name: 'galleryImageItem',
  title: 'Gallery Image',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'Upload high-resolution image.',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      validation: (Rule) => Rule.max(140),
    }),
    defineField({
      name: 'caption',
      title: 'Caption (Optional)',
      type: 'string',
      validation: (Rule) => Rule.max(180),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      initialValue: 1,
      validation: (Rule) => Rule.required().min(1).max(9999),
    }),
    defineField({
      name: 'featured',
      title: 'Featured First',
      type: 'boolean',
      initialValue: false,
      description: 'Turn on to prioritize this image near the top.',
    }),
  ],
  preview: {
    select: {
      title: 'caption',
      media: 'image',
      order: 'order',
      featured: 'featured',
    },
    prepare({ title, media, order, featured }) {
      return {
        title: title || 'Gallery image',
        subtitle: `${featured ? 'featured · ' : ''}order ${order ?? '-'}`,
        media,
      };
    },
  },
});
