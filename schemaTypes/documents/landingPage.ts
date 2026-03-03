import { defineArrayMember, defineField, defineType } from 'sanity';

export const landingPage = defineType({
  name: 'landingPage',
  title: 'Landing Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroImages',
      title: 'Hero Images',
      type: 'array',
      description: 'Add, replace, delete, or drag to reorder hero images.',
      of: [defineArrayMember({ type: 'heroImageItem' })],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'introHeading',
      title: 'Intro Heading',
      type: 'string',
      validation: (Rule) => Rule.max(80),
    }),
    defineField({
      name: 'introBody',
      title: 'Intro Body',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })],
      description: 'Main left-side intro text on the homepage.',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'smallLabels',
      title: 'Small Labels (Optional)',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'key', type: 'string', title: 'Key', validation: (Rule) => Rule.required() }),
            defineField({ name: 'label', type: 'string', title: 'Label', validation: (Rule) => Rule.required().max(60) }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'key' },
          },
        }),
      ],
      validation: (Rule) => Rule.max(20),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Landing Page',
      };
    },
  },
});
