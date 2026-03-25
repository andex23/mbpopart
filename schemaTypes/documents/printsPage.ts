import { defineArrayMember, defineField, defineType } from 'sanity';

export const printsPage = defineType({
  name: 'printsPage',
  title: 'Prints Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Framed Prints',
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: 'introText',
      title: 'Intro Text',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })],
    }),
    defineField({
      name: 'shipBoxImage',
      title: 'Shipping Box Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Image shown in the left column.',
    }),
    defineField({
      name: 'shipBoxImageAlt',
      title: 'Shipping Box Image Alt Text',
      type: 'string',
      validation: (Rule) => Rule.max(140),
    }),
    defineField({
      name: 'availableTitles',
      title: 'Available Print Titles',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      description: 'One title per line.',
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'galleryImages',
      title: 'Print Gallery Images',
      type: 'array',
      description: 'Upload as many print images as needed. Drag to reorder.',
      of: [defineArrayMember({ type: 'galleryImageItem' })],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Prints Page',
      };
    },
  },
});
