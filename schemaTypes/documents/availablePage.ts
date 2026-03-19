import { defineArrayMember, defineField, defineType } from 'sanity';

export const availablePage = defineType({
  name: 'availablePage',
  title: 'Available Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'Short section title shown in blue at the top of the page. Use Available > Paintings Shown on Available Page (Order & Cleanup) for bulk reorder/cleanup, or Available > Edit Available Paintings (Details) for one-by-one edits.',
      initialValue: 'Available',
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: 'introText',
      title: 'Intro Text',
      type: 'array',
      description: 'This controls the intro copy at the top of the Available page.',
      of: [defineArrayMember({ type: 'block' })],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Available Page',
      };
    },
  },
});
