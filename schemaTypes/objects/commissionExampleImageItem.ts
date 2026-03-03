import { defineField, defineType } from 'sanity';

export const commissionExampleImageItem = defineType({
  name: 'commissionExampleImageItem',
  title: 'Commission Example Image',
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
      name: 'role',
      title: 'Image Role (Optional)',
      type: 'string',
      description: 'For clarity: client photo, sketch, progress, final, etc.',
      options: {
        list: [
          { title: 'Client Photo', value: 'client' },
          { title: 'Sketch', value: 'sketch' },
          { title: 'Progress', value: 'progress' },
          { title: 'Final', value: 'final' },
          { title: 'Happy Client', value: 'happyClient' },
        ],
        layout: 'dropdown',
      },
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
      title: 'caption',
      subtitle: 'role',
      media: 'image',
      order: 'order',
    },
    prepare({ title, subtitle, media, order }) {
      return {
        title: title || 'Example image',
        subtitle: `${subtitle ?? 'no role'} · order ${order ?? '-'}`,
        media,
      };
    },
  },
});
