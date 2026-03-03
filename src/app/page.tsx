import React from 'react';
import Image from 'next/image';
import PortableTextContent from '@/components/PortableTextContent';
import { getLandingPageContent, getSiteSettingsContent } from '@/lib/cms-content';

export default async function Home() {
  const [landingContent, siteSettings] = await Promise.all([
    getLandingPageContent(),
    getSiteSettingsContent(),
  ]);

  const heroImage = landingContent.heroImages[0] ?? {
    imageUrl: '/home/home_01.jpg',
    alt: 'Featured Michel artwork',
    caption: '',
    order: 1,
  };

  return (
    <section className="pb-8 page-home">
      <div className="legacy-bubble">
        <div className="legacy-home-content-shell">
          <div className="legacy-home-hero">
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.alt}
              fill
              className="legacy-home-hero-image"
              sizes="(max-width: 768px) 100vw, 904px"
              priority
              unoptimized
            />
          </div>

          <div className="legacy-split-layout legacy-home-split">
            <aside className="legacy-left-rail legacy-home-left">
              <div className="legacy-left-copy home-copy-content">
                <PortableTextContent value={landingContent.introBody} />
                <ul className="legacy-contact-lines">
                  <li>Phone / Text: {siteSettings.contactPhone}</li>
                  <li>
                    Email:{' '}
                    <a href={`mailto:${siteSettings.contactEmail}`} className="text-[var(--link)] hover:underline">
                      {siteSettings.contactEmail}
                    </a>
                  </li>
                </ul>
              </div>
            </aside>

            <section className="legacy-right-rail legacy-home-right">
              <div className="legacy-divider" />
              <p className="legacy-home-message">{siteSettings.sandsDisplayMessage}</p>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
