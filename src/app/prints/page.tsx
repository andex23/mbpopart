import React from 'react';
import Image from 'next/image';
import LegacySplitLayout from '@/components/LegacySplitLayout';
import LegacyThumbGallery from '@/components/LegacyThumbGallery';
import PortableTextContent from '@/components/PortableTextContent';
import { getPrintsPageContent, getSiteSettingsContent } from '@/lib/cms-content';

export default async function PrintsPage() {
  const [printsPage, siteSettings] = await Promise.all([
    getPrintsPageContent(),
    getSiteSettingsContent(),
  ]);

  const leftContent = (
    <>
      <PortableTextContent value={printsPage.introText} />
      {printsPage.shipBoxImageUrl ? (
        <div className="legacy-print-box relative w-full max-w-[283px] aspect-[283/350] border border-[var(--box-border)] bg-white p-1">
          <Image
            src={printsPage.shipBoxImageUrl}
            alt={printsPage.shipBoxImageAlt}
            fill
            className="object-cover"
            sizes="283px"
            unoptimized
          />
        </div>
      ) : null}
      <p>All prints on the following list are available:</p>
      <ul>
        {printsPage.availableTitles.map((title) => (
          <li key={title}>{title}</li>
        ))}
      </ul>
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
    <LegacyThumbGallery items={printsPage.galleryItems} />
  );

  return (
    <section className="pb-8">
      <LegacySplitLayout
        title={printsPage.title}
        leftContent={leftContent}
        rightContent={rightContent}
      />
    </section>
  );
}
