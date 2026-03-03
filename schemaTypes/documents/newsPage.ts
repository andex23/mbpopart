import { defineArrayMember, defineField, defineType } from 'sanity';

export const newsPage = defineType({
  name: 'newsPage',
  title: 'News Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'News',
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: 'introText',
      title: 'Intro Text',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })],
    }),
    defineField({
      name: 'items',
      title: 'News Items',
      type: 'array',
      of: [defineArrayMember({ type: 'newsItem' })],
      validation: (Rule) => Rule.max(200),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'News Page',
      };
    },
  },
});
