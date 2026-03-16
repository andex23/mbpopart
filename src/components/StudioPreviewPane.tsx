import React from 'react';

const panelStyle: React.CSSProperties = {
  padding: '24px',
  maxWidth: '720px',
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

const buttonRowStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '12px',
  marginTop: '18px',
};

const primaryButtonStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '10px 16px',
  borderRadius: '10px',
  background: '#1f2937',
  color: '#ffffff',
  textDecoration: 'none',
  fontWeight: 600,
};

const secondaryButtonStyle: React.CSSProperties = {
  ...primaryButtonStyle,
  background: '#eef2f7',
  color: '#1f2937',
};

export default function StudioPreviewPane() {
  return (
    <div style={panelStyle}>
      <div style={cardStyle}>
        <h2 style={{ margin: '0 0 8px', fontSize: '1.5rem', lineHeight: 1.15 }}>Site Preview</h2>
        <p style={{ margin: '0 0 10px', lineHeight: 1.6 }}>
          Open the live website in preview mode without the construction banner. This only affects the browser
          where you click the button.
        </p>
        <p style={{ margin: '0', lineHeight: 1.6 }}>
          After opening preview once, browse the site normally in that same browser tab or window.
        </p>

        <div style={buttonRowStyle}>
          <a
            href="/api/studio-preview?next=/"
            target="_blank"
            rel="noopener"
            style={primaryButtonStyle}
          >
            Open Site Preview
          </a>
          <a
            href="/api/preview-site?disable=1&next=/studio"
            style={secondaryButtonStyle}
          >
            Turn Preview Off
          </a>
        </div>
      </div>
    </div>
  );
}
