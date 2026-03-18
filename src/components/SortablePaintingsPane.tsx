import React from 'react';
import { useClient } from 'sanity';

type PaintingOrderItem = {
  _id: string;
  title?: string;
  caption?: string;
  year?: number;
  sortOrder?: number;
  status?: string;
};

type SortScope = 'year' | 'flat';

interface SortablePaintingsPaneProps {
  title: string;
  intro: string;
  notes?: string[];
  query: string;
  scope: SortScope;
  saveButtonLabel: string;
  resetButtonLabel: string;
  emptyMessage: string;
  archiveButtonLabel?: string;
  deleteButtonLabel?: string;
  defaultSelectedYear?: number | null;
  showYearSelector?: boolean;
}

const API_VERSION = '2021-10-21';
const SORT_STEP = 10;

const panelStyle: React.CSSProperties = {
  padding: '24px',
  maxWidth: '980px',
  margin: '0 auto',
  fontFamily: 'Inter, system-ui, sans-serif',
  color: '#162033',
};

const cardStyle: React.CSSProperties = {
  border: '1px solid #bcc8d6',
  borderRadius: '14px',
  padding: '20px',
  background: '#f7fbff',
  boxShadow: '0 12px 28px rgba(15, 23, 42, 0.1)',
};

const controlRowStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '12px',
  alignItems: 'center',
  marginTop: '18px',
  marginBottom: '18px',
};

const buttonStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '10px 14px',
  borderRadius: '10px',
  border: '1px solid #9db1c7',
  background: '#ffffff',
  color: '#162033',
  textDecoration: 'none',
  fontWeight: 600,
  cursor: 'pointer',
};

const primaryButtonStyle: React.CSSProperties = {
  ...buttonStyle,
  background: '#1f2937',
  borderColor: '#1f2937',
  color: '#ffffff',
};

const disabledButtonStyle: React.CSSProperties = {
  ...buttonStyle,
  opacity: 0.45,
  cursor: 'not-allowed',
};

const selectStyle: React.CSSProperties = {
  minWidth: '150px',
  minHeight: '42px',
  padding: '8px 12px',
  borderRadius: '10px',
  border: '1px solid #9db1c7',
  background: '#ffffff',
  color: '#162033',
  font: 'inherit',
};

const listStyle: React.CSSProperties = {
  display: 'grid',
  gap: '10px',
};

const rowStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '64px minmax(0, 1fr) auto',
  gap: '12px',
  alignItems: 'center',
  padding: '12px 14px',
  borderRadius: '12px',
  border: '1px solid #c6d3e1',
  background: '#ffffff',
};

const badgeStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '42px',
  padding: '8px 10px',
  borderRadius: '999px',
  background: '#1f2937',
  color: '#ffffff',
  fontWeight: 700,
};

const itemMetaStyle: React.CSSProperties = {
  marginTop: '3px',
  color: '#334155',
  fontSize: '0.92rem',
  lineHeight: 1.4,
};

const itemBodyStyle: React.CSSProperties = {
  display: 'grid',
  gap: '8px',
};

const itemContentStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '24px minmax(0, 1fr)',
  gap: '10px',
  alignItems: 'start',
};

const checkboxStyle: React.CSSProperties = {
  width: '18px',
  height: '18px',
  margin: 0,
  accentColor: '#1f2937',
  cursor: 'pointer',
};

const selectionCountStyle: React.CSSProperties = {
  color: '#334155',
  fontWeight: 600,
};

const rowButtonGroupStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  justifyContent: 'flex-end',
};

const rowButtonStyle: React.CSSProperties = {
  ...buttonStyle,
  minWidth: '68px',
  padding: '8px 10px',
  fontSize: '0.92rem',
};

const dangerButtonStyle: React.CSSProperties = {
  ...buttonStyle,
  borderColor: '#d97706',
  color: '#92400e',
  background: '#fff7ed',
};

const deleteButtonStyle: React.CSSProperties = {
  ...buttonStyle,
  borderColor: '#dc2626',
  color: '#991b1b',
  background: '#fef2f2',
};

const messageStyle: React.CSSProperties = {
  margin: '0 0 14px',
  padding: '10px 12px',
  borderRadius: '10px',
  background: '#eef4ff',
  color: '#1f3c88',
  fontWeight: 600,
};

const warningStyle: React.CSSProperties = {
  ...messageStyle,
  background: '#fff4e8',
  color: '#8a4b00',
};

function useCompactLayout(breakpoint = 760): boolean {
  const [isCompact, setIsCompact] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const sync = () => setIsCompact(mediaQuery.matches);
    sync();

    mediaQuery.addEventListener('change', sync);
    return () => mediaQuery.removeEventListener('change', sync);
  }, [breakpoint]);

  return isCompact;
}

function getDisplayTitle(item: PaintingOrderItem): string {
  return item.caption?.trim() || item.title?.trim() || 'Untitled painting';
}

function getYears(items: PaintingOrderItem[]): number[] {
  return [...new Set(items.map((item) => item.year).filter((year): year is number => typeof year === 'number'))]
    .sort((a, b) => b - a);
}

function getItemsForYear(items: PaintingOrderItem[], year: number | null): PaintingOrderItem[] {
  if (year === null) {
    return [];
  }

  return items.filter((item) => item.year === year);
}

function reorderItems(items: PaintingOrderItem[], fromIndex: number, toIndex: number): PaintingOrderItem[] {
  if (toIndex < 0 || toIndex >= items.length || fromIndex === toIndex) {
    return items;
  }

  const next = [...items];
  const [moved] = next.splice(fromIndex, 1);
  next.splice(toIndex, 0, moved);
  return next;
}

function buildMetaLine(item: PaintingOrderItem, scope: SortScope): string {
  const parts: string[] = [];

  if (item.title && item.caption && item.caption.trim() !== item.title.trim()) {
    parts.push(`Title: ${item.title}`);
  }

  if (scope === 'flat' && typeof item.year === 'number') {
    parts.push(`year: ${item.year}`);
  }

  parts.push(item.status ?? 'no status');
  parts.push(`current sort: ${item.sortOrder ?? 'auto'}`);

  return parts.join(' · ');
}

export default function SortablePaintingsPane({
  title,
  intro,
  notes = [],
  query,
  scope,
  saveButtonLabel,
  resetButtonLabel,
  emptyMessage,
  archiveButtonLabel,
  deleteButtonLabel,
  defaultSelectedYear = null,
  showYearSelector = true,
}: SortablePaintingsPaneProps) {
  const isCompact = useCompactLayout();
  const client = useClient({ apiVersion: API_VERSION });
  const [paintings, setPaintings] = React.useState<PaintingOrderItem[]>([]);
  const [selectedYear, setSelectedYear] = React.useState<number | null>(defaultSelectedYear);
  const [draftItems, setDraftItems] = React.useState<PaintingOrderItem[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSaving, setIsSaving] = React.useState(false);
  const [archivingId, setArchivingId] = React.useState<string | null>(null);
  const [deletingId, setDeletingId] = React.useState<string | null>(null);
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
  const [message, setMessage] = React.useState('');
  const [warning, setWarning] = React.useState('');
  const [refreshTick, setRefreshTick] = React.useState(0);

  React.useEffect(() => {
    let cancelled = false;

    async function loadPaintings() {
      setIsLoading(true);
      setWarning('');

      try {
        const result = await client.fetch<PaintingOrderItem[]>(query);

        if (cancelled) {
          return;
        }

        const nextPaintings = result ?? [];

        if (scope === 'year') {
          const availableYears = getYears(nextPaintings);
          const nextSelectedYear =
            typeof defaultSelectedYear === 'number' && availableYears.includes(defaultSelectedYear)
              ? defaultSelectedYear
              : typeof selectedYear === 'number' && availableYears.includes(selectedYear)
                ? selectedYear
                : availableYears[0] ?? null;

          setSelectedYear(nextSelectedYear);
          setDraftItems(getItemsForYear(nextPaintings, nextSelectedYear));
        } else {
          setSelectedYear(null);
          setDraftItems(nextPaintings);
        }

        setPaintings(nextPaintings);
      } catch {
        if (!cancelled) {
          setWarning('Could not load paintings. Refresh the CMS and try again.');
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void loadPaintings();

    return () => {
      cancelled = true;
    };
  }, [client, defaultSelectedYear, query, refreshTick, scope, selectedYear]);

  React.useEffect(() => {
    setSelectedIds((current) => current.filter((id) => draftItems.some((item) => item._id === id)));
  }, [draftItems]);

  React.useEffect(() => {
    if (scope === 'year') {
      setDraftItems(getItemsForYear(paintings, selectedYear));
      return;
    }

    setDraftItems(paintings);
  }, [paintings, scope, selectedYear]);

  const years = getYears(paintings);
  const selectedIdSet = React.useMemo(() => new Set(selectedIds), [selectedIds]);
  const allShownSelected = draftItems.length > 0 && draftItems.every((item) => selectedIdSet.has(item._id));
  const isActing = archivingId !== null || deletingId !== null;

  function toggleSelection(id: string) {
    setSelectedIds((current) => (
      current.includes(id)
        ? current.filter((itemId) => itemId !== id)
        : [...current, id]
    ));
    setMessage('');
    setWarning('');
  }

  function toggleSelectAllShown() {
    setSelectedIds((current) => {
      if (draftItems.length > 0 && draftItems.every((item) => current.includes(item._id))) {
        return current.filter((id) => !draftItems.some((item) => item._id === id));
      }

      const next = new Set(current);
      draftItems.forEach((item) => next.add(item._id));
      return [...next];
    });
    setMessage('');
    setWarning('');
  }

  function clearSelection() {
    setSelectedIds([]);
    setMessage('');
    setWarning('');
  }

  async function saveOrder() {
    if ((scope === 'year' && selectedYear === null) || draftItems.length === 0) {
      return;
    }

    setIsSaving(true);
    setMessage('');
    setWarning('');

    try {
      const nextItems = draftItems.map((item, index) => ({
        ...item,
        sortOrder: (index + 1) * SORT_STEP,
      }));

      const transaction = client.transaction();
      let changes = 0;

      for (const item of nextItems) {
        if (item.sortOrder !== paintings.find((painting) => painting._id === item._id)?.sortOrder) {
          transaction.patch(item._id, {
            set: { sortOrder: item.sortOrder },
          });
          changes += 1;
        }
      }

      if (changes === 0) {
        setMessage(scope === 'year' ? `No order changes to save for ${selectedYear}.` : 'No available order changes to save.');
        setIsSaving(false);
        return;
      }

      await transaction.commit();

      const nextPaintings = paintings.map((item) => {
        const updated = nextItems.find((draftItem) => draftItem._id === item._id);
        return updated ? updated : item;
      });

      setPaintings(nextPaintings);
      setDraftItems(nextItems);
      setMessage(scope === 'year' ? `Saved ${selectedYear} painting order.` : 'Saved available page order.');
    } catch {
      setWarning('Save failed. Try again in a moment.');
    } finally {
      setIsSaving(false);
    }
  }

  async function archiveItems(itemsToArchive: PaintingOrderItem[]) {
    if (!archiveButtonLabel) {
      return;
    }

    if (itemsToArchive.length === 0) {
      return;
    }

    const ids = itemsToArchive.map((item) => item._id);
    const archiveIdSet = new Set(ids);
    setArchivingId(itemsToArchive.length === 1 ? itemsToArchive[0]._id : '__bulk__');
    setMessage('');
    setWarning('');

    try {
      const transaction = client.transaction();
      for (const item of itemsToArchive) {
        transaction.patch(item._id, {
          set: { status: 'archive' },
        });
      }
      await transaction.commit();

      const nextPaintings = paintings.filter((painting) => !archiveIdSet.has(painting._id));
      setPaintings(nextPaintings);
      setDraftItems((current) => current.filter((painting) => !archiveIdSet.has(painting._id)));
      setSelectedIds((current) => current.filter((id) => !archiveIdSet.has(id)));
      setMessage(
        itemsToArchive.length === 1
          ? `Moved "${getDisplayTitle(itemsToArchive[0])}" to Archived.`
          : `Moved ${itemsToArchive.length} paintings to Archived.`,
      );
    } catch {
      setWarning(
        itemsToArchive.length === 1
          ? 'Could not archive that painting. Try again in a moment.'
          : 'Could not archive the selected paintings. Try again in a moment.',
      );
    } finally {
      setArchivingId(null);
    }
  }

  async function deleteItems(itemsToDelete: PaintingOrderItem[]) {
    if (!deleteButtonLabel || itemsToDelete.length === 0) {
      return;
    }

    const confirmed = typeof window === 'undefined'
      ? true
      : window.confirm(
          itemsToDelete.length === 1
            ? `Delete "${getDisplayTitle(itemsToDelete[0])}" permanently from the CMS? This cannot be undone.`
            : `Delete ${itemsToDelete.length} paintings permanently from the CMS? This cannot be undone.`,
        );

    if (!confirmed) {
      return;
    }

    const ids = itemsToDelete.map((item) => item._id);
    const deleteIdSet = new Set(ids);
    setDeletingId(itemsToDelete.length === 1 ? itemsToDelete[0]._id : '__bulk__');
    setMessage('');
    setWarning('');

    try {
      const transaction = client.transaction();
      for (const item of itemsToDelete) {
        transaction.delete(item._id);
      }
      await transaction.commit();

      const nextPaintings = paintings.filter((painting) => !deleteIdSet.has(painting._id));
      setPaintings(nextPaintings);
      setDraftItems((current) => current.filter((painting) => !deleteIdSet.has(painting._id)));
      setSelectedIds((current) => current.filter((id) => !deleteIdSet.has(id)));
      setMessage(
        itemsToDelete.length === 1
          ? `Deleted "${getDisplayTitle(itemsToDelete[0])}" from the CMS.`
          : `Deleted ${itemsToDelete.length} paintings from the CMS.`,
      );
    } catch {
      setWarning(
        itemsToDelete.length === 1
          ? 'Could not delete that painting. Try again in a moment.'
          : 'Could not delete the selected paintings. Try again in a moment.',
      );
    } finally {
      setDeletingId(null);
    }
  }

  async function archiveItem(item: PaintingOrderItem) {
    await archiveItems([item]);
  }

  async function archiveSelectedItems() {
    await archiveItems(draftItems.filter((item) => selectedIdSet.has(item._id)));
  }

  async function deleteItem(item: PaintingOrderItem) {
    await deleteItems([item]);
  }

  async function deleteSelectedItems() {
    await deleteItems(draftItems.filter((item) => selectedIdSet.has(item._id)));
  }

  function moveItem(index: number, direction: -1 | 1) {
    setDraftItems((current) => reorderItems(current, index, index + direction));
    setMessage('');
    setWarning('');
  }

  function moveToEdge(index: number, edge: 'top' | 'bottom') {
    setDraftItems((current) => reorderItems(current, index, edge === 'top' ? 0 : current.length - 1));
    setMessage('');
    setWarning('');
  }

  const compactPanelStyle: React.CSSProperties = isCompact
    ? {
        ...panelStyle,
        padding: '16px',
      }
    : panelStyle;

  const compactCardStyle: React.CSSProperties = isCompact
    ? {
        ...cardStyle,
        padding: '16px',
      }
    : cardStyle;

  const compactControlRowStyle: React.CSSProperties = isCompact
    ? {
        ...controlRowStyle,
        flexDirection: 'column',
        alignItems: 'stretch',
      }
    : controlRowStyle;

  const compactLabelStyle: React.CSSProperties = isCompact
    ? {
        display: 'grid',
        gap: '6px',
        fontWeight: 600,
        width: '100%',
      }
    : {
        display: 'grid',
        gap: '6px',
        fontWeight: 600,
      };

  const compactSelectStyle: React.CSSProperties = isCompact
    ? {
        ...selectStyle,
        width: '100%',
        minWidth: 0,
      }
    : selectStyle;

  const compactActionButtonStyle = (baseStyle: React.CSSProperties): React.CSSProperties => (
    isCompact
      ? {
          ...baseStyle,
          width: '100%',
        }
      : baseStyle
  );

  const compactRowStyle: React.CSSProperties = isCompact
    ? {
        ...rowStyle,
        gridTemplateColumns: 'minmax(0, 1fr)',
        gap: '10px',
        padding: '12px',
      }
    : rowStyle;

  const compactBadgeStyle: React.CSSProperties = isCompact
    ? {
        ...badgeStyle,
        minWidth: '40px',
        width: 'fit-content',
      }
    : badgeStyle;

  const compactRowButtonGroupStyle: React.CSSProperties = isCompact
    ? {
        ...rowButtonGroupStyle,
        display: 'grid',
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        justifyContent: 'stretch',
      }
    : rowButtonGroupStyle;

  const compactRowButtonStyle: React.CSSProperties = isCompact
    ? {
        ...rowButtonStyle,
        width: '100%',
        minWidth: 0,
      }
    : rowButtonStyle;

  return (
    <div style={compactPanelStyle}>
      <div style={compactCardStyle}>
        <h2 style={{ margin: '0 0 8px', fontSize: '1.5rem', lineHeight: 1.15, color: '#122150' }}>{title}</h2>
        <p style={{ margin: '0', lineHeight: 1.6, color: '#20304b' }}>{intro}</p>
        {notes.map((note) => (
          <p key={note} style={{ margin: '10px 0 0', lineHeight: 1.6, color: '#334155' }}>
            {note}
          </p>
        ))}

        <div style={compactControlRowStyle}>
          {scope === 'year' && showYearSelector ? (
            <label style={compactLabelStyle}>
              <span>Year section</span>
              <select
                value={selectedYear ?? ''}
                onChange={(event) => setSelectedYear(Number(event.target.value))}
                style={compactSelectStyle}
                disabled={isLoading || years.length === 0}
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </label>
          ) : null}

          <button
            type="button"
            onClick={() => setRefreshTick((current) => current + 1)}
            style={compactActionButtonStyle(isLoading || isSaving || isActing ? disabledButtonStyle : buttonStyle)}
            disabled={isLoading || isSaving || isActing}
          >
            Refresh
          </button>

          <button
            type="button"
            onClick={() => setDraftItems(scope === 'year' ? getItemsForYear(paintings, selectedYear) : paintings)}
            style={compactActionButtonStyle(isLoading || isSaving || isActing ? disabledButtonStyle : buttonStyle)}
            disabled={isLoading || isSaving || isActing}
          >
            {resetButtonLabel}
          </button>

          <button
            type="button"
            onClick={saveOrder}
            style={compactActionButtonStyle(
              isLoading || isSaving || isActing || draftItems.length === 0 ? disabledButtonStyle : primaryButtonStyle,
            )}
            disabled={isLoading || isSaving || isActing || draftItems.length === 0}
          >
            {isSaving ? 'Saving...' : saveButtonLabel}
          </button>
        </div>

        {archiveButtonLabel || deleteButtonLabel ? (
          <div style={compactControlRowStyle}>
            <button
              type="button"
              onClick={toggleSelectAllShown}
              style={compactActionButtonStyle(
                isLoading || isSaving || draftItems.length === 0 || isActing
                  ? disabledButtonStyle
                  : buttonStyle,
              )}
              disabled={isLoading || isSaving || draftItems.length === 0 || isActing}
            >
              {allShownSelected ? 'Clear Shown' : 'Select All Shown'}
            </button>

            <button
              type="button"
              onClick={clearSelection}
              style={compactActionButtonStyle(
                isLoading || isSaving || selectedIds.length === 0 || isActing
                  ? disabledButtonStyle
                  : buttonStyle,
              )}
              disabled={isLoading || isSaving || selectedIds.length === 0 || isActing}
            >
              Clear Selection
            </button>

            {archiveButtonLabel ? (
              <button
                type="button"
                onClick={archiveSelectedItems}
                style={compactActionButtonStyle(
                  isLoading || isSaving || selectedIds.length === 0 || isActing
                    ? disabledButtonStyle
                    : dangerButtonStyle,
                )}
                disabled={isLoading || isSaving || selectedIds.length === 0 || isActing}
              >
                {archivingId === '__bulk__' ? 'Archiving...' : `${archiveButtonLabel} Selected (${selectedIds.length})`}
              </button>
            ) : null}

            {deleteButtonLabel ? (
              <button
                type="button"
                onClick={deleteSelectedItems}
                style={compactActionButtonStyle(
                  isLoading || isSaving || selectedIds.length === 0 || isActing
                    ? disabledButtonStyle
                    : deleteButtonStyle,
                )}
                disabled={isLoading || isSaving || selectedIds.length === 0 || isActing}
              >
                {deletingId === '__bulk__' ? 'Deleting...' : `${deleteButtonLabel} Selected (${selectedIds.length})`}
              </button>
            ) : null}

            <span style={selectionCountStyle}>
              {selectedIds.length} selected
            </span>
          </div>
        ) : null}

        {message ? <p style={messageStyle}>{message}</p> : null}
        {warning ? <p style={warningStyle}>{warning}</p> : null}

        {isLoading ? (
          <p style={{ margin: 0, color: '#334155' }}>Loading paintings...</p>
        ) : draftItems.length === 0 ? (
          <p style={{ margin: 0, color: '#334155' }}>{emptyMessage}</p>
        ) : (
          <div style={listStyle}>
            {draftItems.map((item, index) => (
              <div key={item._id} style={compactRowStyle}>
                <div style={compactBadgeStyle}>{index + 1}</div>

                <div style={{ minWidth: 0 }}>
                  <div style={itemBodyStyle}>
                    {archiveButtonLabel || deleteButtonLabel ? (
                      <label style={itemContentStyle}>
                        <input
                          type="checkbox"
                          checked={selectedIdSet.has(item._id)}
                          onChange={() => toggleSelection(item._id)}
                          style={checkboxStyle}
                          disabled={isSaving || isActing}
                        />
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontWeight: 700, color: '#122150' }}>{getDisplayTitle(item)}</div>
                          <div style={itemMetaStyle}>{buildMetaLine(item, scope)}</div>
                        </div>
                      </label>
                    ) : (
                      <>
                        <div style={{ fontWeight: 700, color: '#122150' }}>{getDisplayTitle(item)}</div>
                        <div style={itemMetaStyle}>{buildMetaLine(item, scope)}</div>
                      </>
                    )}
                  </div>
                </div>

                <div style={compactRowButtonGroupStyle}>
                  <button
                    type="button"
                    onClick={() => moveToEdge(index, 'top')}
                    style={index === 0 ? { ...disabledButtonStyle, ...compactRowButtonStyle } : compactRowButtonStyle}
                    disabled={index === 0 || isSaving || isActing}
                  >
                    Top
                  </button>
                  <button
                    type="button"
                    onClick={() => moveItem(index, -1)}
                    style={index === 0 ? { ...disabledButtonStyle, ...compactRowButtonStyle } : compactRowButtonStyle}
                    disabled={index === 0 || isSaving || isActing}
                  >
                    Up
                  </button>
                  <button
                    type="button"
                    onClick={() => moveItem(index, 1)}
                    style={
                      index === draftItems.length - 1
                        ? { ...disabledButtonStyle, ...compactRowButtonStyle }
                        : compactRowButtonStyle
                    }
                    disabled={index === draftItems.length - 1 || isSaving || isActing}
                  >
                    Down
                  </button>
                  <button
                    type="button"
                    onClick={() => moveToEdge(index, 'bottom')}
                    style={
                      index === draftItems.length - 1
                        ? { ...disabledButtonStyle, ...compactRowButtonStyle }
                        : compactRowButtonStyle
                    }
                    disabled={index === draftItems.length - 1 || isSaving || isActing}
                  >
                    Bottom
                  </button>
                  {archiveButtonLabel ? (
                    <button
                      type="button"
                      onClick={() => archiveItem(item)}
                      style={{
                        ...(isCompact ? compactRowButtonStyle : rowButtonStyle),
                        ...dangerButtonStyle,
                        ...(isCompact ? { gridColumn: '1 / -1' } : {}),
                        ...(archivingId === item._id || isSaving || isActing ? disabledButtonStyle : {}),
                      }}
                      disabled={archivingId === item._id || isSaving || isActing}
                    >
                      {archivingId === item._id ? 'Archiving...' : archiveButtonLabel}
                    </button>
                  ) : null}
                  {deleteButtonLabel ? (
                    <button
                      type="button"
                      onClick={() => deleteItem(item)}
                      style={{
                        ...(isCompact ? compactRowButtonStyle : rowButtonStyle),
                        ...deleteButtonStyle,
                        ...(isCompact ? { gridColumn: '1 / -1' } : {}),
                        ...(deletingId === item._id || isSaving || isActing ? disabledButtonStyle : {}),
                      }}
                      disabled={deletingId === item._id || isSaving || isActing}
                    >
                      {deletingId === item._id ? 'Deleting...' : deleteButtonLabel}
                    </button>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
