import React from 'react';
import SortablePaintingsPane from './SortablePaintingsPane';

const AVAILABLE_ORDER_QUERY = `*[_type == "painting" && ((defined(showOnAvailablePage) && showOnAvailablePage == true) || (!defined(showOnAvailablePage) && status in ["available", "sold"]))] | order(sortOrder asc, year desc, _updatedAt desc){
  _id,
  title,
  caption,
  year,
  sortOrder,
  status,
  showOnAvailablePage,
  mainImageAlt,
  cardImageFit,
  "imageUrl": mainImage.asset->url
}`;

export default function AvailableOrderPane() {
  return (
    <SortablePaintingsPane
      title="Paintings Shown on Available Page (Order & Cleanup)"
      intro="Use this screen for bulk reorder, archive, and delete on the Available page. When you need to change one painting’s Title, Year, Dimensions, Price, Status, or image, use Edit Available Paintings (Details)."
      notes={[
        'This screen controls all paintings currently shown on the Available page.',
        'Use this instead of editing Manual Sort Order by hand.',
        'Archive removes the painting from the Available page but keeps it in CMS. Delete removes it permanently.',
        'To remove a painting from the Available page without removing it from its year gallery, turn off Show on Available Page in the painting record.',
      ]}
      query={AVAILABLE_ORDER_QUERY}
      scope="flat"
      saveButtonLabel="Save Available Order"
      resetButtonLabel="Reset Order"
      emptyMessage="No available or sold paintings were found. Add available items first."
      archiveButtonLabel="Archive"
      deleteButtonLabel="Delete"
    />
  );
}
