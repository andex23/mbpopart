import { defineField, defineType } from 'sanity';

export const navigationItem = defineType({
  name: 'navigationItem',
  title: 'Navigation Item',
  type: 'object',
  fields: [
    defineField({
      name: 'key',
      title: 'Route Key',
      type: 'string',
      description: 'Route is fixed by key. You can safely rename the label only.',
      options: {
        list: [
          { title: 'Bio', value: 'bio' },
          { title: 'Paintings', value: 'paintings' },
          { title: 'Available', value: 'available' },
          { title: 'Commissions', value: 'commissions' },
          { title: 'Happy Client Photos', value: 'happyClients' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Menu Label',
      type: 'string',
      description: 'Visible text in the menu button. For the bio route, the current label is "Intro Bio".',
      validation: (Rule) => Rule.required().max(32),
    }),
    defineField({
      name: 'enabled',
      title: 'Enabled',
      type: 'boolean',
      description: 'Turn off to hide this item temporarily.',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Lower number appears first.',
      initialValue: 1,
      validation: (Rule) => Rule.required().min(1).max(50),
    }),
  ],
  preview: {
    select: {
      title: 'label',
      key: 'key',
      enabled: 'enabled',
      order: 'order',
    },
    prepare({ title, key, enabled, order }) {
      return {
        title: title || 'Untitled Item',
        subtitle: `${key ?? 'unknown'} · ${enabled ? 'visible' : 'hidden'} · order ${order ?? '-'}`,
      };
    },
  },
});
