import React from 'react';
import Image from 'next/image';
import LegacySplitLayout from '@/components/LegacySplitLayout';
import LegacyThumbGallery from '@/components/LegacyThumbGallery';
import { commonContact, legacyPageCopy, printItems } from '@/data/legacy-content';

export default function PrintsPage() {
  const leftContent = (
    <>
      <p>{legacyPageCopy.prints.paragraphs[0]}</p>
      <p>{legacyPageCopy.prints.paragraphs[1]}</p>
      <div className="legacy-print-box relative w-full max-w-[283px] aspect-[283/350] border border-[var(--box-border)] bg-white p-1">
        <Image
          src={legacyPageCopy.prints.shipBoxImageUrl}
          alt="Print shipping box"
          fill
          className="object-cover"
          sizes="283px"
          unoptimized
        />
      </div>
      <p>All prints on the following list are available:</p>
      <ul>
        {legacyPageCopy.prints.availableTitles.map((title) => (
          <li key={title}>{title}</li>
        ))}
      </ul>
      <p>{legacyPageCopy.prints.paragraphs[2]}</p>
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
      <p>{legacyPageCopy.prints.paragraphs[3]}</p>
    </>
  );

  const rightContent = (
    <LegacyThumbGallery items={printItems} />
  );

  return (
    <section className="pb-8">
      <LegacySplitLayout
        title={legacyPageCopy.prints.title}
        leftContent={leftContent}
        rightContent={rightContent}
      />
    </section>
  );
}
