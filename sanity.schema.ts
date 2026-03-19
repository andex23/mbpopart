import type { SchemaTypeDefinition, Template } from 'sanity';
import { schemaTypes } from './schemaTypes';

const templates: Template[] = [
  {
    id: 'gallery-painting',
    title: 'Year Gallery Painting',
    schemaType: 'painting',
    value: {
      status: 'notForSale',
      showOnAvailablePage: false,
      inventoryOnly: false,
      featured: false,
    },
  },
  {
    id: 'available-inventory-painting',
    title: 'Available Page Only Card',
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
    title: 'Sold Available Page Only Card',
    schemaType: 'painting',
    value: {
      status: 'sold',
      showOnAvailablePage: true,
      inventoryOnly: true,
      featured: false,
    },
  },
  {
    id: 'commission-inventory-painting',
    title: 'Commission Available Page Only Card',
    schemaType: 'painting',
    value: {
      status: 'commission',
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
