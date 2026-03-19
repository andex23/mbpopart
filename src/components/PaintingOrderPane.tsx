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

export interface PaintingOrderPaneProps {
  defaultYear?: number | null;
  showYearSelector?: boolean;
  title?: string;
  intro?: string;
  notes?: string[];
  emptyMessage?: string;
}

export function PaintingOrderView({
  defaultYear = null,
  showYearSelector = true,
  title = 'Gallery Paintings (Order & Cleanup)',
  intro = 'Use this main gallery screen for bulk reorder, archive, and delete. When you need to change one painting’s Year, Title, Dimensions, Price, Status, or image, use Edit Individual Paintings (Details) instead.',
  notes = [
    'This screen controls the main Paintings gallery only.',
    'Use the checkboxes for bulk cleanup, or use the row buttons on a single item.',
    'The website year menus are built from the exact Year field on each painting record.',
    'If a painting belongs in a different year section, open Edit Individual Paintings (Details) and change its Year first.',
    'Archived paintings stay in CMS under Archived Paintings. Delete removes them permanently.',
  ],
  emptyMessage = 'No paintings were found for this year. Choose another year or add paintings first.',
}: PaintingOrderPaneProps) {
  return (
    <SortablePaintingsPane
      title={title}
      intro={intro}
      notes={notes}
      query={PAINTING_ORDER_QUERY}
      scope="year"
      saveButtonLabel="Save This Year Order"
      resetButtonLabel="Reset Year"
      emptyMessage={emptyMessage}
      archiveButtonLabel="Archive"
      deleteButtonLabel="Delete"
      defaultSelectedYear={defaultYear}
      showYearSelector={showYearSelector}
    />
  );
}

export default function PaintingOrderPane() {
  return <PaintingOrderView />;
}
