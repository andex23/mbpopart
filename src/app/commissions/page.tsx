import React from 'react';
import LegacySplitLayout from '@/components/LegacySplitLayout';
import LegacyThumbGallery from '@/components/LegacyThumbGallery';
import { commissionItems, commonContact, legacyPageCopy } from '@/data/legacy-content';

export default function CommissionsPage() {
  const leftContent = (
    <>
      {legacyPageCopy.commissions.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <ul className="legacy-contact-lines">
        <li>{legacyPageCopy.commissions.scheduleLine}</li>
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
    <LegacyThumbGallery items={commissionItems} />
  );

  return (
    <section className="pb-8">
      <LegacySplitLayout
        title={legacyPageCopy.commissions.title}
        leftContent={leftContent}
        rightContent={rightContent}
      />
    </section>
  );
}
