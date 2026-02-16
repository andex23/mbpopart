'use client';

import React from 'react';
import { AnimatedSection } from '@/components/AnimatedSection';
import { siteContent } from '@/data/artworks';
import { MapPin, Phone, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function VenuesSection() {
  const venues = siteContent.venues.slice(0, 6);

  return (
    <section className="py-20 lg:py-24">
      <div className="max-w-[1280px] mx-auto px-6">
        <AnimatedSection animation="fade-in-up">
          <div className="text-center mb-12">
            <p className="text-[var(--accent)] font-display text-sm tracking-widest mb-2">
              Where to See
            </p>
            <h2 className="font-display text-3xl lg:text-5xl text-[var(--text-primary)]">
              Exhibition Venues
            </h2>
            <p className="text-[var(--text-secondary)] text-sm mt-4 max-w-2xl mx-auto">
              A quick look at featured venues. Browse the full venue list on the dedicated page.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {venues.map((venue, i) => (
            <AnimatedSection key={venue.name} animation="fade-in-up" delay={i * 80}>
              <div className="card-premium comic-panel p-6 h-full flex flex-col">
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3">
                  {venue.name}
                </h3>
                <div className="space-y-2 flex-1">
                  <p className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                    <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5 text-[var(--text-muted)]" />
                    {venue.address}
                  </p>
                  {venue.phone && (
                    <p className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                      <Phone className="w-4 h-4 flex-shrink-0 text-[var(--text-muted)]" />
                      <a href={`tel:${venue.phone.replace(/[^\d+]/g, '')}`} className="hover:text-[var(--accent)] transition-colors">
                        {venue.phone}
                      </a>
                    </p>
                  )}
                </div>
                {venue.website && (
                  <a
                    href={venue.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-[var(--accent)] hover:underline"
                  >
                    Visit Website <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection animation="fade-in-up" delay={180}>
          <div className="mt-8 text-center">
            <Link
              href="/venues"
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)] hover:underline"
            >
              View all venues &rarr;
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
