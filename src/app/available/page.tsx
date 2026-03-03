import React from 'react';
import LegacySplitLayout from '@/components/LegacySplitLayout';
import LegacyThumbGallery from '@/components/LegacyThumbGallery';
import PortableTextContent from '@/components/PortableTextContent';
import { getAvailablePageContent, getSiteSettingsContent } from '@/lib/cms-content';

export default async function AvailablePage() {
  const [availablePage, siteSettings] = await Promise.all([
    getAvailablePageContent(),
    getSiteSettingsContent(),
  ]);

  const leftContent = (
    <>
      <PortableTextContent value={availablePage.introText} />
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
    <LegacyThumbGallery items={availablePage.items} />
  );

  return (
    <section className="pb-8">
      <LegacySplitLayout
        title={availablePage.title}
        leftContent={leftContent}
        rightContent={rightContent}
      />
    </section>
  );
}
