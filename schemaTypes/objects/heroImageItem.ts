import { defineArrayMember, defineField, defineType } from 'sanity';

export const heroImageItem = defineType({
  name: 'heroImageItem',
  title: 'Hero Image',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'Upload a wide hero image. Recommended: 1800px+ width.',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      description: 'Short description for accessibility.',
      validation: (Rule) => Rule.required().max(140),
    }),
    defineField({
      name: 'caption',
      title: 'Caption (Optional)',
      type: 'string',
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      initialValue: 1,
      validation: (Rule) => Rule.required().min(1).max(999),
    }),
    defineField({
      name: 'labels',
      title: 'Optional Small Labels',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'string',
          validation: (Rule) => Rule.max(32),
        }),
      ],
      description: 'Optional tiny overlay labels for this hero image.',
    }),
  ],
  preview: {
    select: {
      title: 'alt',
      subtitle: 'caption',
      media: 'image',
      order: 'order',
    },
    prepare({ title, subtitle, media, order }) {
      return {
        title: title || `Hero image ${order ?? ''}`,
        subtitle: subtitle ? `${subtitle} · order ${order ?? '-'}` : `order ${order ?? '-'}`,
        media,
      };
    },
  },
});
