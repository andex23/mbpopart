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
      description: 'This controls the big blue page heading only. Use Paintings > 1. Add / Reorder Year Gallery Paintings for bulk reorder/cleanup, or Paintings > 2. Edit One Gallery Painting for one-by-one field edits.',
      initialValue: 'PAINTINGS',
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: 'introText',
      title: 'Intro Text',
      type: 'array',
      description: 'This controls the intro copy at the top of the Paintings page.',
      of: [defineArrayMember({ type: 'block' })],
    }),
    defineField({
      name: 'yearGroupingMode',
      title: 'How Year Menus Are Built',
      type: 'string',
      readOnly: true,
      initialValue: 'computed',
      description: 'Managed by the website. Year sections and year menus are built automatically from the exact Year field on each painting record.',
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
