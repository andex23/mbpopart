import React from 'react';
import LegacySplitLayout from '@/components/LegacySplitLayout';
import LegacyThumbGallery from '@/components/LegacyThumbGallery';
import { availableItems, commonContact, legacyPageCopy } from '@/data/legacy-content';

export default function AvailablePage() {
  const leftContent = (
    <>
      {legacyPageCopy.available.paragraphs.map((paragraph) => (
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
    <LegacyThumbGallery items={availableItems} />
  );

  return (
    <section className="pb-8">
      <LegacySplitLayout
        title={legacyPageCopy.available.title}
        leftContent={leftContent}
        rightContent={rightContent}
      />
    </section>
  );
}
