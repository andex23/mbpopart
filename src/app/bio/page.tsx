import React from 'react';
import Image from 'next/image';
import LegacySplitLayout from '@/components/LegacySplitLayout';
import LegacyThumbGallery from '@/components/LegacyThumbGallery';
import PortableTextContent from '@/components/PortableTextContent';
import { getBioPageContent, getSiteSettingsContent } from '@/lib/cms-content';

export default async function BioPage() {
  const [bioPage, siteSettings] = await Promise.all([
    getBioPageContent(),
    getSiteSettingsContent(),
  ]);

  const bioGalleryItems = (() => {
    const current = bioPage.galleryItems.slice(0, 8);
    if (current.length >= 8) {
      return current;
    }

    const placeholders = Array.from({ length: 8 - current.length }, (_, index) => ({
      imageUrl: '/placeholders/new-painting-coming-soon.svg',
      thumbUrl: '/placeholders/new-painting-coming-soon.svg',
      caption: `Bio Photo ${current.length + index + 1} - Coming Soon`,
    }));

    return [...current, ...placeholders];
  })();

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

  const rightContent = <LegacyThumbGallery items={bioGalleryItems} />;

  return (
    <section className="pb-8">
      <LegacySplitLayout
        title={bioPage.title}
        titleAside={(
          <div className="bio-title-portrait">
            <Image
              src={bioPage.portraitImageUrl || '/assets/mbface.png'}
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
