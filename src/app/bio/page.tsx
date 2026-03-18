import React from 'react';
import Image from 'next/image';
import LegacySplitLayout from '@/components/LegacySplitLayout';
import LegacyThumbGallery from '@/components/LegacyThumbGallery';
import PortableTextContent from '@/components/PortableTextContent';
import { getBioPageContent, getSiteSettingsContent } from '@/lib/cms-content';
import { resolveLegacyImageUrl } from '@/lib/legacy-image';

export default async function BioPage() {
  const [bioPage, siteSettings] = await Promise.all([
    getBioPageContent(),
    getSiteSettingsContent(),
  ]);

  const leftContent = (
    <>
      <div className="bio-intro-copy">
        <PortableTextContent value={bioPage.body} />
      </div>
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

  const rightContent = bioPage.galleryItems.length > 0
    ? <LegacyThumbGallery items={bioPage.galleryItems.slice(0, 8)} />
    : null;

  return (
    <section className="pb-8">
      <LegacySplitLayout
        title={bioPage.title}
        titleAside={(
          <div className="bio-title-portrait">
            <Image
              src={resolveLegacyImageUrl(bioPage.portraitImageUrl || '/assets/mbface.png')}
              alt="Michel Balasis portrait"
              fill
              className="object-cover"
              sizes="96px"
              unoptimized
            />
          </div>
        )}
        leftContent={leftContent}
        rightContent={rightContent}
        bubbleClassName="bio-page"
      />
    </section>
  );
}
