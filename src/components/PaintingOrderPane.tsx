import React from 'react';
import { useClient } from 'sanity';

type PaintingOrderItem = {
  _id: string;
  title?: string;
  caption?: string;
  year?: number;
  sortOrder?: number;
  status?: string;
  comingSoon?: boolean;
};

const API_VERSION = '2021-10-21';
const SORT_STEP = 10;

const panelStyle: React.CSSProperties = {
  padding: '24px',
  maxWidth: '980px',
  margin: '0 auto',
  fontFamily: 'Inter, system-ui, sans-serif',
};

const cardStyle: React.CSSProperties = {
  border: '1px solid #d5d8de',
  borderRadius: '14px',
  padding: '20px',
  background: '#ffffff',
  boxShadow: '0 10px 24px rgba(15, 23, 42, 0.08)',
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
  border: '1px solid #c9d2df',
  background: '#ffffff',
  color: '#1f2937',
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
  border: '1px solid #c9d2df',
  background: '#ffffff',
  color: '#1f2937',
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
  border: '1px solid #d9e0ea',
  background: '#f9fbfd',
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
  color: '#5c6677',
  fontSize: '0.92rem',
  lineHeight: 1.4,
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

export default function PaintingOrderPane() {
  const client = useClient({ apiVersion: API_VERSION });
  const [paintings, setPaintings] = React.useState<PaintingOrderItem[]>([]);
  const [selectedYear, setSelectedYear] = React.useState<number | null>(null);
  const [draftItems, setDraftItems] = React.useState<PaintingOrderItem[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSaving, setIsSaving] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [warning, setWarning] = React.useState('');
  const [refreshTick, setRefreshTick] = React.useState(0);

  React.useEffect(() => {
    let cancelled = false;

    async function loadPaintings() {
      setIsLoading(true);
      setWarning('');

      try {
        const result = await client.fetch<PaintingOrderItem[]>(
          `*[_type == "painting" && defined(year)] | order(year desc, sortOrder asc, _updatedAt desc){
            _id,
            title,
            caption,
            year,
            sortOrder,
            status,
            comingSoon
          }`,
        );

        if (cancelled) {
          return;
        }

        const nextPaintings = result ?? [];
        const availableYears = getYears(nextPaintings);
        const nextSelectedYear =
          typeof selectedYear === 'number' && availableYears.includes(selectedYear)
            ? selectedYear
            : availableYears[0] ?? null;

        setPaintings(nextPaintings);
        setSelectedYear(nextSelectedYear);
        setDraftItems(getItemsForYear(nextPaintings, nextSelectedYear));
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
  }, [client, refreshTick]);

  React.useEffect(() => {
    setDraftItems(getItemsForYear(paintings, selectedYear));
  }, [paintings, selectedYear]);

  const years = getYears(paintings);

  async function saveOrder() {
    if (selectedYear === null || draftItems.length === 0) {
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
        setMessage(`No order changes to save for ${selectedYear}.`);
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
      setMessage(`Saved ${selectedYear} painting order.`);
    } catch {
      setWarning('Save failed. Try again in a moment.');
    } finally {
      setIsSaving(false);
    }
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

  return (
    <div style={panelStyle}>
      <div style={cardStyle}>
        <h2 style={{ margin: '0 0 8px', fontSize: '1.5rem', lineHeight: 1.15 }}>Painting Order</h2>
        <p style={{ margin: '0', lineHeight: 1.6 }}>
          Choose a year, move paintings up or down, then save. This controls the display order inside that year
          section on the website.
        </p>
        <p style={{ margin: '10px 0 0', lineHeight: 1.6, color: '#5c6677' }}>
          If a painting belongs in a different year section, open that painting and change its <b>Year</b> first.
        </p>

        <div style={controlRowStyle}>
          <label style={{ display: 'grid', gap: '6px', fontWeight: 600 }}>
            <span>Year section</span>
            <select
              value={selectedYear ?? ''}
              onChange={(event) => setSelectedYear(Number(event.target.value))}
              style={selectStyle}
              disabled={isLoading || years.length === 0}
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </label>

          <button
            type="button"
            onClick={() => setRefreshTick((current) => current + 1)}
            style={isLoading || isSaving ? disabledButtonStyle : buttonStyle}
            disabled={isLoading || isSaving}
          >
            Refresh
          </button>

          <button
            type="button"
            onClick={() => setDraftItems(getItemsForYear(paintings, selectedYear))}
            style={isLoading || isSaving ? disabledButtonStyle : buttonStyle}
            disabled={isLoading || isSaving}
          >
            Reset Year
          </button>

          <button
            type="button"
            onClick={saveOrder}
            style={isLoading || isSaving || draftItems.length === 0 ? disabledButtonStyle : primaryButtonStyle}
            disabled={isLoading || isSaving || draftItems.length === 0}
          >
            {isSaving ? 'Saving...' : 'Save This Year Order'}
          </button>
        </div>

        {message ? <p style={messageStyle}>{message}</p> : null}
        {warning ? <p style={warningStyle}>{warning}</p> : null}

        {isLoading ? (
          <p style={{ margin: 0, color: '#5c6677' }}>Loading paintings...</p>
        ) : draftItems.length === 0 ? (
          <p style={{ margin: 0, color: '#5c6677' }}>
            No paintings were found for this year. Choose another year or add paintings first.
          </p>
        ) : (
          <div style={listStyle}>
            {draftItems.map((item, index) => (
              <div key={item._id} style={rowStyle}>
                <div style={badgeStyle}>{index + 1}</div>

                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 700 }}>{getDisplayTitle(item)}</div>
                  <div style={itemMetaStyle}>
                    {item.title && item.caption && item.caption.trim() !== item.title.trim()
                      ? `Title: ${item.title} · `
                      : ''}
                    {item.status ?? 'no status'} · current sort: {item.sortOrder ?? 'auto'}
                    {item.comingSoon ? ' · coming soon' : ''}
                  </div>
                </div>

                <div style={rowButtonGroupStyle}>
                  <button
                    type="button"
                    onClick={() => moveToEdge(index, 'top')}
                    style={index === 0 ? disabledButtonStyle : rowButtonStyle}
                    disabled={index === 0 || isSaving}
                  >
                    Top
                  </button>
                  <button
                    type="button"
                    onClick={() => moveItem(index, -1)}
                    style={index === 0 ? disabledButtonStyle : rowButtonStyle}
                    disabled={index === 0 || isSaving}
                  >
                    Up
                  </button>
                  <button
                    type="button"
                    onClick={() => moveItem(index, 1)}
                    style={index === draftItems.length - 1 ? disabledButtonStyle : rowButtonStyle}
                    disabled={index === draftItems.length - 1 || isSaving}
                  >
                    Down
                  </button>
                  <button
                    type="button"
                    onClick={() => moveToEdge(index, 'bottom')}
                    style={index === draftItems.length - 1 ? disabledButtonStyle : rowButtonStyle}
                    disabled={index === draftItems.length - 1 || isSaving}
                  >
                    Bottom
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
