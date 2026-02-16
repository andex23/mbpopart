import React from 'react';
import LegacySplitLayout from '@/components/LegacySplitLayout';
import LegacyThumbGallery from '@/components/LegacyThumbGallery';
import { siteContent } from '@/data/artworks';
import { bioItems } from '@/data/legacy-content';

export default function BioPage() {
  const paragraphs = siteContent.bio.bioText.split('\n\n').filter(Boolean);
  const { contact } = siteContent.bio;

  const leftContent = (
    <>
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <ul className="legacy-contact-lines">
        <li><b>Contact Michel</b></li>
        <li>Phone: {contact.phone}</li>
        <li>
          Email:{' '}
          <a href={`mailto:${contact.email}`} className="text-[var(--link)] hover:underline">
            {contact.email}
          </a>
        </li>
      </ul>
    </>
  );

  const rightContent = <LegacyThumbGallery items={bioItems} />;

  return (
    <section className="pb-8">
      <LegacySplitLayout title="BIO" leftContent={leftContent} rightContent={rightContent} />
    </section>
  );
}
