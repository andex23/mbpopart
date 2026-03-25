import { defineArrayMember, defineField, defineType } from 'sanity';

export const commissionExampleItem = defineType({
  name: 'commissionExampleItem',
  title: 'Commission Example',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.max(220),
    }),
    defineField({
      name: 'privacyHidden',
      title: 'Hide This Example',
      type: 'boolean',
      initialValue: false,
      description: 'Use when a client asks for privacy.',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      description: 'Add as many images as needed for this commission example.',
      of: [defineArrayMember({ type: 'commissionExampleImageItem' })],
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      initialValue: 1,
      validation: (Rule) => Rule.required().min(1).max(999),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'images.0.image',
      order: 'order',
      hidden: 'privacyHidden',
    },
    prepare({ title, subtitle, media, order, hidden }) {
      return {
        title: title || 'Commission example',
        subtitle: `${hidden ? 'hidden · ' : ''}${subtitle ? `${subtitle} · ` : ''}order ${order ?? '-'}`,
        media,
      };
    },
  },
});
