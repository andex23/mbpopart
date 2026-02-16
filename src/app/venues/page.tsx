import React from 'react';
import Image from 'next/image';
import LegacySplitLayout from '@/components/LegacySplitLayout';
import { siteContent } from '@/data/artworks';
import { commonContact, legacyPageCopy } from '@/data/legacy-content';

export default function VenuesPage() {
  const leftContent = (
    <>
      {legacyPageCopy.venues.paragraphs.map((paragraph) => (
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
    <ul className="legacy-venue-list list-none m-0 p-0">
      {siteContent.venues.map((venue) => (
        <li key={venue.name} className="legacy-venue-card">
          {venue.imageUrl ? (
            <div className="relative w-[120px] h-[120px] flex-shrink-0 border border-[var(--box-border)] bg-white">
              <Image
                src={venue.imageUrl}
                alt={venue.name}
                fill
                className="object-cover"
                sizes="120px"
                unoptimized
              />
            </div>
          ) : null}
          <div className="legacy-venue-meta">
            <p><b>{venue.name}</b></p>
            {venue.address ? <p>{venue.address}</p> : null}
            {venue.phone ? <p>Phone: {venue.phone}</p> : null}
            {venue.email ? <p>Email: {venue.email}</p> : null}
            {venue.website ? (
              <p>
                <a href={venue.website} target="_blank" rel="noopener noreferrer" className="text-[var(--link)] hover:underline">
                  {venue.website}
                </a>
              </p>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );

  return (
    <section className="pb-8">
      <LegacySplitLayout
        title={legacyPageCopy.venues.title}
        leftContent={leftContent}
        rightContent={rightContent}
      />
    </section>
  );
}
