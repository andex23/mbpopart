import { defineField, defineType } from 'sanity';

export const commissionStepItem = defineType({
  name: 'commissionStepItem',
  title: 'Commission Step',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Step Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.max(180),
    }),
    defineField({
      name: 'image',
      title: 'Step Image',
      type: 'image',
      description: 'Optional image for this step. Keep it clear and close-up.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      initialValue: 1,
      validation: (Rule) => Rule.required().min(1).max(20),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'image',
      order: 'order',
    },
    prepare({ title, subtitle, media, order }) {
      return {
        title: title || 'Step',
        subtitle: subtitle ? `${subtitle} · order ${order ?? '-'}` : `order ${order ?? '-'}`,
        media,
      };
    },
  },
});
