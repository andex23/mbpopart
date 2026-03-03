import { defineField, defineType } from 'sanity';

export const venueItem = defineType({
  name: 'venueItem',
  title: 'Venue Item',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Venue Name',
      type: 'string',
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'string',
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      validation: (Rule) => Rule.max(40),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'website',
      title: 'Website',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Upload a venue image.',
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
      title: 'name',
      subtitle: 'address',
      media: 'image',
      order: 'order',
    },
    prepare({ title, subtitle, media, order }) {
      return {
        title: title || 'Venue',
        subtitle: `${subtitle ?? 'no address'} · order ${order ?? '-'}`,
        media,
      };
    },
  },
});
