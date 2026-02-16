'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatedSection } from '@/components/AnimatedSection';
import { getFeaturedWorks } from '@/data/artworks';
import type { Artwork } from '@/data/artworks';

function ArtworkPreviewCard({ work, index }: { work: Artwork; index: number }) {
  return (
    <AnimatedSection animation="fade-in-up" delay={index * 100}>
      <div className="card-premium group cursor-pointer overflow-hidden">
        <div className="img-zoom-container aspect-[3/4] relative">
          <Image
            src={work.thumbnailUrl || work.imageUrl}
            alt={work.paintingName}
            fill
            className="img-zoom object-cover"
            sizes="(max-width: 768px) 80vw, (max-width: 1024px) 33vw, 25vw"
            unoptimized
          />
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <div>
              <p className="text-white text-sm font-medium truncate">{work.paintingName}</p>
              {work.dimensions && (
                <p className="text-[var(--text-muted)] text-xs mt-0.5">{work.dimensions}</p>
              )}
            </div>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-sm font-medium text-[var(--text-primary)] truncate">
            {work.paintingName}
          </h3>
          <p className="text-xs text-[var(--text-muted)] mt-1">{work.year} &middot; {work.medium || 'Acrylic on canvas'}</p>
        </div>
      </div>
    </AnimatedSection>
  );
}

export default function FeaturedWorks() {
  const works = getFeaturedWorks();

  return (
    <section className="py-20 lg:py-24">
      <div className="max-w-[1280px] mx-auto px-6">
        <AnimatedSection animation="fade-in-left">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-[var(--accent)] font-display text-sm tracking-widest mb-2">
                Featured Works
              </p>
              <h2 className="font-display text-3xl lg:text-5xl text-[var(--text-primary)]">
                Latest Paintings
              </h2>
            </div>
            <Link
              href="/gallery"
              className="hidden sm:inline-flex text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors duration-200"
            >
              View All &rarr;
            </Link>
          </div>
        </AnimatedSection>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-3 gap-8">
          {works.slice(0, 6).map((work, i) => (
            <ArtworkPreviewCard key={work.imageUrl} work={work} index={i} />
          ))}
        </div>

        {/* Mobile Horizontal Scroll */}
        <div className="md:hidden flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4 -mx-6 px-6">
          {works.slice(0, 6).map((work, i) => (
            <div key={work.imageUrl} className="snap-start flex-shrink-0 w-[72vw]">
              <ArtworkPreviewCard work={work} index={i} />
            </div>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/gallery"
            className="text-sm font-medium text-[var(--accent)] hover:underline"
          >
            View All Paintings &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
