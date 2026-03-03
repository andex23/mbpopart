import { defineArrayMember, defineField, defineType } from 'sanity';

export const navigation = defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  fields: [
    defineField({
      name: 'items',
      title: 'Menu Items',
      type: 'array',
      description: 'You can rename labels, reorder items, and hide items. Route is fixed by key.',
      of: [defineArrayMember({ type: 'navigationItem' })],
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .max(5)
          .custom((items) => {
            if (!Array.isArray(items)) return true;
            const keys = items.map((item) => (item as { key?: string })?.key).filter(Boolean);
            return new Set(keys).size === keys.length ? true : 'Each route key can only appear once.';
          }),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Navigation',
      };
    },
  },
});
