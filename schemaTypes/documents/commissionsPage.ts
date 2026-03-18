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
      description: 'Intro sentence shown under "The Commission Process".',
      initialValue:
        'Many commissions follow a structured creative process — from your reference photo to a finished original Michel painting.',
      validation: (Rule) => Rule.max(220),
    }),
    defineField({
      name: 'downPaymentLabel',
      title: 'Step 2 Label (Down Payment)',
      type: 'string',
      description: 'This is step 2 of the 5-step process shown on the website.',
      initialValue: '50% Down Payment',
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: 'downPaymentRule',
      title: 'Step 2 Window Text',
      type: 'text',
      rows: 3,
      description: 'Text shown inside the down payment card window for step 2.',
      initialValue: 'Clients can make their 50% Down Payment via Zelle, Venmo, or Cash',
      validation: (Rule) => Rule.max(360),
    }),
    defineField({
      name: 'steps',
      title: 'Image Steps for the 5-Step Process',
      type: 'array',
      description: 'The website shows 5 total steps. Step 2 is the payment card above, and these 4 image records fill steps 1, 3, 4, and 5 in order.',
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
