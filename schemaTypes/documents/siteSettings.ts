import { defineArrayMember, defineField, defineType } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline / Subtitle (Optional)',
      type: 'string',
      validation: (Rule) => Rule.max(140),
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'contactPhone',
      title: 'Contact Phone',
      type: 'string',
      description: 'Shown in contact blocks and footer.',
      validation: (Rule) => Rule.max(30),
    }),
    defineField({
      name: 'locationLabel',
      title: 'Location Label',
      type: 'string',
      description: 'Example: Venice Florida USA',
      validation: (Rule) => Rule.max(80),
    }),
    defineField({
      name: 'sandsDisplayMessage',
      title: 'Landing Right-Panel Message',
      type: 'text',
      rows: 2,
      description: 'Example: "See a wide variety of Michel paintings on display at Sands on Miami..."',
      validation: (Rule) => Rule.max(260),
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      description: 'Shown below the phone line in the construction contact box and footer. Drag items to reorder them.',
      of: [defineArrayMember({ type: 'linkItem' })],
      validation: (Rule) => Rule.max(8),
    }),
    defineField({
      name: 'maintenanceModeEnabled',
      title: 'Maintenance Mode',
      type: 'boolean',
      initialValue: false,
      description:
        'Turn on the full-page under construction screen for public visitors. Sanity Studio and the private preview bypass still work.',
    }),
    defineField({
      name: 'footerPortrait',
      title: 'Footer Portrait (Optional)',
      type: 'image',
      options: { hotspot: true },
      description: 'Small portrait shown in footer. Recommended: square image.',
    }),
    defineField({
      name: 'footerText',
      title: 'Footer Text',
      type: 'string',
      description: 'Shown in the footer copyright line. Example: © 2026 Michel Balasis',
      initialValue: '© 2026 Michel Balasis',
      validation: (Rule) => Rule.max(120),
    }),
    defineField({
      name: 'footerLinks',
      title: 'Footer Links',
      type: 'array',
      description: 'Drag items to reorder them.',
      of: [defineArrayMember({ type: 'linkItem' })],
      validation: (Rule) => Rule.max(8),
    }),
    defineField({
      name: 'defaultSEO',
      title: 'Default SEO',
      type: 'object',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          validation: (Rule) => Rule.max(70),
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          validation: (Rule) => Rule.max(180),
        }),
        defineField({
          name: 'ogImage',
          title: 'Social Share Image',
          type: 'image',
          options: { hotspot: true },
          description: 'Recommended: 1200 × 630 px',
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
      };
    },
  },
});
