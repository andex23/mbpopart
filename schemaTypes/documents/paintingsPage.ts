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
    defineField({
      name: 'yearRangeLabels',
      title: 'Year Range Menu Labels',
      type: 'object',
      description:
        'These control the visible labels in the Paintings menu and page filters. Paintings still land in each bucket automatically from the exact Year field on each painting.',
      fields: [
        defineField({
          name: 'before1998',
          title: '1998 and Before',
          type: 'string',
          initialValue: '1998 and Before',
          validation: (Rule) => Rule.max(40),
        }),
        defineField({
          name: 'y1999to2004',
          title: '1999–2004',
          type: 'string',
          initialValue: '1999–2004',
          validation: (Rule) => Rule.max(40),
        }),
        defineField({
          name: 'y2005to2009',
          title: '2005–2009',
          type: 'string',
          initialValue: '2005–2009',
          validation: (Rule) => Rule.max(40),
        }),
        defineField({
          name: 'y2010to2015',
          title: '2010–2015',
          type: 'string',
          initialValue: '2010–2015',
          validation: (Rule) => Rule.max(40),
        }),
        defineField({
          name: 'y2016to2020',
          title: '2016–2020',
          type: 'string',
          initialValue: '2016–2020',
          validation: (Rule) => Rule.max(40),
        }),
        defineField({
          name: 'y2021to2025',
          title: '2021–2025',
          type: 'string',
          initialValue: '2021–2025',
          validation: (Rule) => Rule.max(40),
        }),
        defineField({
          name: 'y2026current',
          title: '2026–Current',
          type: 'string',
          initialValue: '2026–Current',
          validation: (Rule) => Rule.max(40),
        }),
      ],
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
