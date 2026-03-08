import React from 'react';
import HappyClientGrid from '@/components/HappyClientGrid';
import LegacySplitLayout from '@/components/LegacySplitLayout';
import PortableTextContent from '@/components/PortableTextContent';
import { getHappyClientsPageContent, getSiteSettingsContent } from '@/lib/cms-content';

export default async function PhotosPage() {
  const [photosPage, siteSettings] = await Promise.all([
    getHappyClientsPageContent(),
    getSiteSettingsContent(),
  ]);

  const leftContent = (
    <>
      <PortableTextContent value={photosPage.introText} />
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

  const rightContent = <HappyClientGrid clients={photosPage.photos} />;

  return (
    <section className="pb-8">
      <LegacySplitLayout
        title={photosPage.title}
        leftContent={leftContent}
        rightContent={rightContent}
        bubbleClassName="happy-clients-page"
      />
    </section>
  );
}
