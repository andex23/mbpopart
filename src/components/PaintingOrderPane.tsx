import React from 'react';
import SortablePaintingsPane from './SortablePaintingsPane';

const PAINTING_ORDER_QUERY = `*[_type == "painting" && defined(year) && (!defined(inventoryOnly) || inventoryOnly != true)] | order(year desc, sortOrder asc, _updatedAt desc){
  _id,
  title,
  caption,
  year,
  sortOrder,
  status,
  comingSoon
}`;

export default function PaintingOrderPane() {
  return (
    <SortablePaintingsPane
      title="Painting Order"
      intro="Choose a year, move paintings up or down, then save. This controls the display order inside that year section on the website."
      notes={[
        'This screen controls the main Paintings gallery only.',
        'If a painting belongs in a different year section, open that painting and change its Year first.',
      ]}
      query={PAINTING_ORDER_QUERY}
      scope="year"
      saveButtonLabel="Save This Year Order"
      resetButtonLabel="Reset Year"
      emptyMessage="No paintings were found for this year. Choose another year or add paintings first."
    />
  );
}
