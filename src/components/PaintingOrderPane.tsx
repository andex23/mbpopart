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
  title = 'Gallery Paintings',
  intro = 'Choose a year, move paintings up or down, or archive or delete extras. This is the main gallery management screen for the Paintings page.',
  notes = [
    'This screen controls the main Paintings gallery only.',
    'Use the checkboxes to archive or delete several paintings at once, or use the row buttons on a single item.',
    'Archived paintings stay in CMS under Archived. Delete removes them permanently.',
    'If a painting belongs in a different year section, open Edit Individual Paintings and change its Year first.',
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
