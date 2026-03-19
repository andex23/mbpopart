import type { SchemaTypeDefinition, Template } from 'sanity';
import { schemaTypes } from './schemaTypes';

const templates: Template[] = [
  {
    id: 'gallery-painting',
    title: 'Gallery Painting',
    schemaType: 'painting',
    value: {
      status: 'notForSale',
      inventoryOnly: false,
      featured: false,
    },
  },
  {
    id: 'available-inventory-painting',
    title: 'Available Inventory Painting',
    schemaType: 'painting',
    value: {
      status: 'available',
      showOnAvailablePage: true,
      inventoryOnly: true,
      featured: false,
    },
  },
  {
    id: 'sold-inventory-painting',
    title: 'Sold Inventory Painting',
    schemaType: 'painting',
    value: {
      status: 'sold',
      showOnAvailablePage: true,
      inventoryOnly: true,
      featured: false,
    },
  },
];

export const schema: { types: SchemaTypeDefinition[]; templates: Template[] } = {
  types: schemaTypes,
  templates,
};

export default schema;
