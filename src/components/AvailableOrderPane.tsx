import React from 'react';
import SortablePaintingsPane from './SortablePaintingsPane';

const AVAILABLE_ORDER_QUERY = `*[_type == "painting" && status in ["available", "sold"]] | order(sortOrder asc, year desc, _updatedAt desc){
  _id,
  title,
  caption,
  year,
  sortOrder,
  status,
  comingSoon
}`;

export default function AvailableOrderPane() {
  return (
    <SortablePaintingsPane
      title="Available Order"
      intro="Move available and sold cards up or down, then save. This controls the order on the Available page."
      notes={[
        'This screen controls all paintings currently shown on the Available page.',
        'Use this instead of editing Manual Sort Order by hand.',
      ]}
      query={AVAILABLE_ORDER_QUERY}
      scope="flat"
      saveButtonLabel="Save Available Order"
      resetButtonLabel="Reset Order"
      emptyMessage="No available or sold paintings were found. Add available items first."
    />
  );
}
