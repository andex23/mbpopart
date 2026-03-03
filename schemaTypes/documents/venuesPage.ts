import { defineArrayMember, defineField, defineType } from 'sanity';

export const venuesPage = defineType({
  name: 'venuesPage',
  title: 'Venues Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Venues',
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: 'introText',
      title: 'Intro Text',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })],
    }),
    defineField({
      name: 'venues',
      title: 'Venues',
      type: 'array',
      of: [defineArrayMember({ type: 'venueItem' })],
      validation: (Rule) => Rule.max(200),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Venues Page',
      };
    },
  },
});
