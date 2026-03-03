import { defineField, defineType } from 'sanity';

export const happyClientPhotoItem = defineType({
  name: 'happyClientPhotoItem',
  title: 'Happy Client Photo',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Caption (Optional)',
      type: 'string',
      validation: (Rule) => Rule.max(140),
    }),
    defineField({
      name: 'location',
      title: 'Location (Optional)',
      type: 'string',
      validation: (Rule) => Rule.max(100),
    }),
    defineField({
      name: 'note',
      title: 'Short Note (Optional)',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'featured',
      title: 'Feature First',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      initialValue: 1,
      validation: (Rule) => Rule.required().min(1).max(9999),
    }),
  ],
  preview: {
    select: {
      title: 'caption',
      location: 'location',
      note: 'note',
      featured: 'featured',
      order: 'order',
      media: 'image',
    },
    prepare({ title, location, note, featured, order, media }) {
      const contextParts = [location, note].filter(Boolean);
      return {
        title: title || 'Happy client photo',
        subtitle: `${featured ? 'featured · ' : ''}${contextParts.join(' · ')}${contextParts.length ? ' · ' : ''}order ${order ?? '-'}`,
        media,
      };
    },
  },
});
