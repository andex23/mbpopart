import React from 'react';

interface LegacySplitLayoutProps {
  title: string;
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  rightHeader?: React.ReactNode;
  titleAside?: React.ReactNode;
  bubbleClassName?: string;
}

export default function LegacySplitLayout({
  title,
  leftContent,
  rightContent,
  rightHeader,
  titleAside,
  bubbleClassName = '',
}: LegacySplitLayoutProps) {
  return (
    <div className={`legacy-bubble ${bubbleClassName}`.trim()}>
      <div className="legacy-split-layout">
        <aside className="legacy-left-rail">
          <div className="legacy-title-row">
            <h1 className="legacy-heading">{title}</h1>
            {titleAside ? <div className="legacy-title-aside">{titleAside}</div> : null}
          </div>
          <div className="legacy-left-copy">{leftContent}</div>
        </aside>
        <section className="legacy-right-rail">
          {rightHeader ? <div className="legacy-right-header">{rightHeader}</div> : null}
          {rightContent}
        </section>
      </div>
    </div>
  );
}
