import { defineArrayMember, defineField, defineType } from 'sanity';

export const bioPage = defineType({
  name: 'bioPage',
  title: 'Bio Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'Shown as the large blue heading on the Bio page. Keep it short so it stays on one line on desktop.',
      initialValue: 'INTRO BIO',
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: 'portraitImage',
      title: 'Portrait Image (Optional)',
      type: 'image',
      options: { hotspot: true },
      description: 'Small portrait shown near title.',
    }),
    defineField({
      name: 'body',
      title: 'Body Copy',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })],
      description: 'Tip: keep paragraphs reasonably short for readability.',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'galleryImages',
      title: 'Bio Gallery Images',
      type: 'array',
      description: 'Add/replace/delete images. Drag to reorder.',
      of: [defineArrayMember({ type: 'galleryImageItem' })],
      validation: (Rule) => Rule.max(80),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Bio Page',
      };
    },
  },
});
