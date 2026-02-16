'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatedSection } from '@/components/AnimatedSection';
import { getAllYearGroups } from '@/data/artworks';
import type { YearGroup } from '@/data/artworks';

export default function GalleryEntryPoints() {
  const yearGroups = getAllYearGroups();
  const [activeYear, setActiveYear] = useState(yearGroups[0]?.year || '2020');

  const activeGroup = yearGroups.find((g) => g.year === activeYear);
  const previewWorks = activeGroup?.works.slice(0, 4) || [];

  return (
    <section className="py-20 lg:py-24 bg-[var(--bg-secondary)]">
      <div className="max-w-[1280px] mx-auto px-6">
        <AnimatedSection animation="fade-in-up">
          <div className="text-center mb-12">
            <p className="text-[var(--accent)] font-display text-sm tracking-widest mb-2">
              Browse by Year
            </p>
            <h2 className="font-display text-3xl lg:text-5xl text-[var(--text-primary)]">
              Explore the Collection
            </h2>
          </div>
        </AnimatedSection>

        {/* Year Chips */}
        <AnimatedSection animation="fade-in-up" delay={200}>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {yearGroups.map((group) => (
              <button
                key={group.year}
                onClick={() => setActiveYear(group.year)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeYear === group.year
                    ? `${group.accentClass} shadow-lg`
                    : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:bg-[var(--border-color)] hover:text-[var(--text-primary)]'
                }`}
              >
                {group.year}
                <span className="ml-1.5 text-xs opacity-70">({group.works.length})</span>
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Preview Grid */}
        <AnimatedSection animation="scale-in" delay={300}>
          <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
            {previewWorks.map((work) => (
              <Link
                key={work.imageUrl}
                href={`/gallery?year=${activeYear}`}
                className="group relative aspect-square rounded-xl overflow-hidden"
              >
                <Image
                  src={work.thumbnailUrl || work.imageUrl}
                  alt={work.paintingName}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 45vw, 280px"
                  unoptimized
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                  <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {work.paintingName}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </AnimatedSection>

        <div className="mt-10 text-center">
          <Link
            href={`/gallery?year=${activeYear}`}
            className="inline-flex items-center gap-2 text-[var(--accent)] font-medium text-sm hover:underline transition-colors"
          >
            View all {activeGroup?.works.length} paintings from {activeYear} &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
