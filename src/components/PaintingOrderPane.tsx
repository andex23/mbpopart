import React from 'react';
import SortablePaintingsPane from './SortablePaintingsPane';

const PAINTING_ORDER_QUERY = `*[_type == "painting" && defined(year) && (!defined(inventoryOnly) || inventoryOnly != true) && (!defined(status) || status != "archive")] | order(year desc, sortOrder asc, _updatedAt desc){
  _id,
  title,
  caption,
  year,
  sortOrder,
  status
}`;

export default function PaintingOrderPane() {
  return (
    <SortablePaintingsPane
      title="Painting Order, Archive & Delete"
      intro="Choose a year, move paintings up or down, or archive or delete extras. This controls the display order inside that year section on the website."
      notes={[
        'This screen controls the main Paintings gallery only.',
        'Use the checkboxes to archive or delete several paintings at once, or use the row buttons on a single item.',
        'Archived paintings stay in CMS under Archived. Delete removes them permanently.',
        'If a painting belongs in a different year section, open that painting and change its Year first.',
      ]}
      query={PAINTING_ORDER_QUERY}
      scope="year"
      saveButtonLabel="Save This Year Order"
      resetButtonLabel="Reset Year"
      emptyMessage="No paintings were found for this year. Choose another year or add paintings first."
      archiveButtonLabel="Archive"
      deleteButtonLabel="Delete"
    />
  );
}
