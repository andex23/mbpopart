import React from 'react';
import SortablePaintingsPane from './SortablePaintingsPane';

const AVAILABLE_ORDER_QUERY = `*[_type == "painting" && defined(showOnAvailablePage) && showOnAvailablePage == true && status in ["available", "sold", "commission"]] | order(sortOrder asc, year desc, _updatedAt desc){
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
      title="Reorder Available Page Cards"
      intro="Use this screen for bulk reorder, archive, and delete on the Available page. Easiest workflow: use the same year-gallery painting record and turn on Show on Available Page. Only create a separate Available Page Only card when it should not appear in the year gallery."
      notes={[
        'This screen controls all paintings currently shown on the Available page.',
        'Use this instead of editing Manual Sort Order by hand.',
        'A painting can stay in its year gallery and also appear here if Show on Available Page is turned on.',
        'Archive removes the painting from the public site but keeps it in CMS. Delete removes it permanently.',
        'To remove a painting from the Available page without removing it from its year gallery, turn off Show on Available Page in that same painting record.',
      ]}
      query={AVAILABLE_ORDER_QUERY}
      scope="flat"
      saveButtonLabel="Save Available Order"
      resetButtonLabel="Reset Order"
      emptyMessage="No available-page cards were found. Turn on Show on Available Page, or add an Available Page Only card first."
      archiveButtonLabel="Archive"
      deleteButtonLabel="Delete"
    />
  );
}
