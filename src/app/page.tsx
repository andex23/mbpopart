'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { siteContent } from '@/data/artworks';

const HOME_IMAGES = [
  'https://mbpopart.com/assets/home_01.jpg',
  'https://mbpopart.com/assets/home_02.jpg',
  'https://mbpopart.com/assets/home_03.jpg',
];

export default function Home() {
  const [heroImage, setHeroImage] = useState(HOME_IMAGES[0]);
  const { welcomeText, contact, exhibiting } = siteContent.homepage;
  const welcomeParagraphs = welcomeText.split('\n\n').filter(Boolean);

  useEffect(() => {
    setHeroImage(HOME_IMAGES[Math.floor(Math.random() * HOME_IMAGES.length)]);
    document.body.classList.add('home-bg');
    return () => {
      document.body.classList.remove('home-bg');
    };
  }, []);

  return (
    <section className="pb-8 page-home">
      <div className="legacy-bubble">
        <div className="legacy-home-hero">
          <Image
            src={heroImage}
            alt="Featured Michel Balasis artwork"
            fill
            className="legacy-home-hero-image"
            sizes="(max-width: 768px) 100vw, 1200px"
            priority
            unoptimized
          />
        </div>

        <div className="legacy-split-layout">
          <aside className="legacy-left-rail legacy-home-left">
            <div className="legacy-left-copy">
              {welcomeParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <ul className="legacy-contact-lines">
                <li>Phone: {contact.phone}</li>
                <li>
                  Email:{' '}
                  <a href={`mailto:${contact.email}`} className="text-[var(--link)] hover:underline">
                    {contact.email}
                  </a>
                </li>
              </ul>
            </div>
          </aside>

          <section className="legacy-right-rail legacy-home-right">
            <div className="legacy-divider" />
            <h2 className="legacy-subtitle">Exhibiting</h2>
            <ul className="legacy-exhibiting-list">
              {exhibiting.map((item, index) => {
                const [name, line2, line3] = item.split('|').map((part) => part.trim());
                return (
                  <li key={`${item}-${index}`}>
                    <b>{name}</b>
                    <br />
                    {line2}
                    <br />
                    {line3}
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      </div>
    </section>
  );
}
