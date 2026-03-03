import { defineArrayMember, defineField, defineType } from 'sanity';

export const commissionsPage = defineType({
  name: 'commissionsPage',
  title: 'Commissions Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'COMMISSIONS',
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: 'introText',
      title: 'Intro Text',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'howItWorksTitle',
      title: 'How It Works Title',
      type: 'string',
      initialValue: 'The Commission Process',
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: 'howItWorksSubtitle',
      title: 'How It Works Subtitle',
      type: 'string',
      validation: (Rule) => Rule.max(220),
    }),
    defineField({
      name: 'downPaymentRule',
      title: 'Down Payment Rule',
      type: 'text',
      rows: 3,
      initialValue:
        '50% down payment required before sketching begins. No sketching begins until down payment is received. Down payment covers materials (canvas, paint, brushes, hardware for hanging, etc.).',
      validation: (Rule) => Rule.max(360),
    }),
    defineField({
      name: 'steps',
      title: 'Process Steps (Exactly 4)',
      type: 'array',
      description: 'Steps are shown in a fixed 4-step template in the frontend.',
      of: [defineArrayMember({ type: 'commissionStepItem' })],
      validation: (Rule) => Rule.required().min(4).max(4),
    }),
    defineField({
      name: 'examples',
      title: 'Recent Commission Examples (Optional)',
      type: 'array',
      of: [defineArrayMember({ type: 'commissionExampleItem' })],
      validation: (Rule) => Rule.max(24),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Commissions Page',
      };
    },
  },
});
