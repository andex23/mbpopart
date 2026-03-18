import React from 'react';
import SortablePaintingsPane from './SortablePaintingsPane';

const PAINTING_ORDER_QUERY = `*[_type == "painting" && defined(year) && (!defined(inventoryOnly) || inventoryOnly != true) && (!defined(status) || status != "archive")] | order(year desc, sortOrder asc, _updatedAt desc){
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
      title="Painting Order & Cleanup"
      intro="Choose a year, move paintings up or down, or hide extras. This controls the display order inside that year section on the website."
      notes={[
        'This screen controls the main Paintings gallery only.',
        'Use Hide to remove an extra painting from the public gallery quickly. Hidden paintings stay in Archived.',
        'If a painting belongs in a different year section, open that painting and change its Year first.',
      ]}
      query={PAINTING_ORDER_QUERY}
      scope="year"
      saveButtonLabel="Save This Year Order"
      resetButtonLabel="Reset Year"
      emptyMessage="No paintings were found for this year. Choose another year or add paintings first."
      archiveButtonLabel="Hide"
    />
  );
}
