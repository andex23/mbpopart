import React from 'react';
import Image from 'next/image';
import LegacySplitLayout from '@/components/LegacySplitLayout';
import PortableTextContent from '@/components/PortableTextContent';
import { getSiteSettingsContent, getVenuesPageContent } from '@/lib/cms-content';
import { resolveLegacyImageUrl } from '@/lib/legacy-image';

export default async function VenuesPage() {
  const [venuesPage, siteSettings] = await Promise.all([
    getVenuesPageContent(),
    getSiteSettingsContent(),
  ]);

  const leftContent = (
    <>
      <PortableTextContent value={venuesPage.introText} />
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
    <ul className="legacy-venue-list list-none m-0 p-0">
      {venuesPage.venues.map((venue) => (
        <li key={venue.name} className="legacy-venue-card">
          {venue.imageUrl ? (
            <div className="relative w-[120px] h-[120px] flex-shrink-0 border border-[var(--box-border)] bg-white">
              <Image
                src={resolveLegacyImageUrl(venue.imageUrl)}
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
            {venue.phone ? <p>Phone / Text: {venue.phone}</p> : null}
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
        title={venuesPage.title}
        leftContent={leftContent}
        rightContent={rightContent}
      />
    </section>
  );
}
