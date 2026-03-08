import { defineArrayMember, defineField, defineType } from 'sanity';

export const happyClientsPage = defineType({
  name: 'happyClientsPage',
  title: 'Happy Clients Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'Short section title shown in blue at the top of the page.',
      initialValue: 'Happy Clients',
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: 'introText',
      title: 'Intro Text',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })],
    }),
    defineField({
      name: 'photos',
      title: 'Photos',
      type: 'array',
      description: 'Upload photos, drag to reorder, set featured to show first.',
      of: [defineArrayMember({ type: 'happyClientPhotoItem' })],
      validation: (Rule) => Rule.max(1500),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Happy Clients Page',
      };
    },
  },
});
