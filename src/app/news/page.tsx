import React from 'react';
import LegacySplitLayout from '@/components/LegacySplitLayout';
import { commonContact, legacyPageCopy, newsItems } from '@/data/legacy-content';

export default function NewsPage() {
  const leftContent = (
    <>
      {legacyPageCopy.news.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <ul className="legacy-contact-lines">
        <li><b>Contact Michel</b></li>
        <li>Phone: {commonContact.phone}</li>
        <li>
          Email:{' '}
          <a href={`mailto:${commonContact.email}`} className="text-[var(--link)] hover:underline">
            {commonContact.email}
          </a>
        </li>
      </ul>
    </>
  );

  const rightContent = (
    <div className="legacy-news-list">
      {newsItems.map((item) => (
        <article key={item.pdfUrl} className="legacy-news-item">
          <h3>
            <a href={item.pdfUrl} target="_blank" rel="noopener noreferrer" className="text-[var(--link)] hover:underline font-semibold">
              {item.title}
            </a>
          </h3>
          <p>{item.date}</p>
          <p>{item.summary}</p>
        </article>
      ))}
    </div>
  );

  return (
    <section className="pb-8">
      <LegacySplitLayout
        title={legacyPageCopy.news.title}
        leftContent={leftContent}
        rightContent={rightContent}
      />
    </section>
  );
}
