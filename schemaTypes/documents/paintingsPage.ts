import { defineArrayMember, defineField, defineType } from 'sanity';

export const paintingsPage = defineType({
  name: 'paintingsPage',
  title: 'Paintings Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'PAINTINGS',
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: 'introText',
      title: 'Intro Text',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })],
    }),
    defineField({
      name: 'emptySectionPlaceholderText',
      title: 'Empty Section Placeholder Text',
      type: 'string',
      initialValue: 'New Painting Coming Soon',
      description: 'Shown inside placeholder painting tiles when a selected year or range has no paintings yet.',
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: 'yearGroupingMode',
      title: 'Year Grouping Mode',
      type: 'string',
      readOnly: true,
      initialValue: 'computed',
      description: 'Managed by frontend code. No manual setup needed.',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Paintings Page',
      };
    },
  },
});
