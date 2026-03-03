import { defineField, defineType } from 'sanity';

export const newsItem = defineType({
  name: 'newsItem',
  title: 'News Item',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(180),
    }),
    defineField({
      name: 'date',
      title: 'Date Label',
      type: 'string',
      description: 'Example: July, 2010',
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(400),
    }),
    defineField({
      name: 'pdfUrl',
      title: 'PDF URL',
      type: 'url',
      validation: (Rule) =>
        Rule.required().uri({
          scheme: ['http', 'https'],
        }),
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
      subtitle: 'date',
      order: 'order',
    },
    prepare({ title, subtitle, order }) {
      return {
        title: title || 'News item',
        subtitle: `${subtitle ?? 'no date'} · order ${order ?? '-'}`,
      };
    },
  },
});
