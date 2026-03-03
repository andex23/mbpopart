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
      initialValue: 'Available Paintings',
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: 'introText',
      title: 'Intro Text',
      type: 'array',
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
