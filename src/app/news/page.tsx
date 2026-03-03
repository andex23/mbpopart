import React from 'react';
import LegacySplitLayout from '@/components/LegacySplitLayout';
import PortableTextContent from '@/components/PortableTextContent';
import { getNewsPageContent, getSiteSettingsContent } from '@/lib/cms-content';

export default async function NewsPage() {
  const [newsPage, siteSettings] = await Promise.all([
    getNewsPageContent(),
    getSiteSettingsContent(),
  ]);

  const leftContent = (
    <>
      <PortableTextContent value={newsPage.introText} />
      <ul className="legacy-contact-lines">
        <li><b>Contact Michel</b></li>
        <li>Phone / Text: {siteSettings.contactPhone}</li>
        <li>
          Email:{' '}
          <a href={`mailto:${siteSettings.contactEmail}`} className="text-[var(--link)] hover:underline">
            {siteSettings.contactEmail}
          </a>
        </li>
      </ul>
    </>
  );

  const rightContent = (
    <div className="legacy-news-list">
      {newsPage.items.map((item) => (
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
        title={newsPage.title}
        leftContent={leftContent}
        rightContent={rightContent}
      />
    </section>
  );
}
