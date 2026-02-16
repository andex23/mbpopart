'use client';

import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import LegacySplitLayout from '@/components/LegacySplitLayout';
import ArtworkCard from '@/components/ArtworkCard';
import ImageViewer from '@/components/ImageViewer';
import { getAllYearGroups } from '@/data/artworks';
import { commonContact } from '@/data/legacy-content';
import type { Artwork } from '@/data/artworks';

const INITIAL_COUNT = 30;

function GalleryContent() {
  const searchParams = useSearchParams();
  const yearParam = searchParams.get('year');

  const yearGroups = useMemo(() => getAllYearGroups(), []);
  const [activeYear, setActiveYear] = useState<string | null>(yearParam);
  const [expandedYears, setExpandedYears] = useState<Record<string, boolean>>({});
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);

  useEffect(() => {
    setActiveYear(yearParam);
  }, [yearParam]);

  const visibleGroups = activeYear ? yearGroups.filter((group) => group.year === activeYear) : yearGroups;

  const allVisibleWorks = useMemo(() => {
    const output: Artwork[] = [];
    for (const group of visibleGroups) {
      const isExpanded = expandedYears[group.year];
      const works = isExpanded ? group.works : group.works.slice(0, INITIAL_COUNT);
      output.push(...works);
    }
    return output;
  }, [expandedYears, visibleGroups]);

  const openViewer = (work: Artwork) => {
    const index = allVisibleWorks.findIndex((current) => current.imageUrl === work.imageUrl);
    if (index >= 0) {
      setViewerIndex(index);
      setViewerOpen(true);
    }
  };

  const leftContent = (
    <>
      <p>Browse Michel Balasis paintings by year. Click any thumbnail to view a larger image.</p>
      <p>Use the year buttons to jump directly to a specific collection.</p>
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
    <>
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          className={`site-nav-btn ${activeYear === null ? 'active' : ''}`}
          onClick={() => setActiveYear(null)}
        >
          All Years
        </button>
        {yearGroups.map((group) => (
          <button
            key={group.year}
            className={`site-nav-btn ${activeYear === group.year ? 'active' : ''}`}
            onClick={() => setActiveYear(group.year)}
          >
            {group.year}
          </button>
        ))}
      </div>

      {visibleGroups.map((group) => {
        const isExpanded = expandedYears[group.year];
        const works = isExpanded ? group.works : group.works.slice(0, INITIAL_COUNT);
        const hasMore = group.works.length > INITIAL_COUNT;

        return (
          <section key={group.year} className="mb-6 last:mb-0">
            <h2 className="legacy-subtitle mb-2">
              {group.year} ({group.works.length})
            </h2>

            <div className="legacy-thumb-grid">
              {works.map((work, index) => (
                <ArtworkCard
                  key={work.imageUrl}
                  work={work}
                  priority={index < 10}
                  onClick={() => openViewer(work)}
                />
              ))}
            </div>

            {hasMore ? (
              <div className="mt-3">
                <button
                  className="site-nav-btn"
                  onClick={() => setExpandedYears((prev) => ({ ...prev, [group.year]: !prev[group.year] }))}
                >
                  {isExpanded ? 'Show Less' : `Show All ${group.works.length}`}
                </button>
              </div>
            ) : null}
          </section>
        );
      })}
    </>
  );

  return (
    <>
      <LegacySplitLayout title="Paintings" leftContent={leftContent} rightContent={rightContent} />
      {viewerOpen ? (
        <ImageViewer
          works={allVisibleWorks}
          currentIndex={viewerIndex}
          onClose={() => setViewerOpen(false)}
          onNavigate={setViewerIndex}
        />
      ) : null}
    </>
  );
}

export default function GalleryPage() {
  return (
    <section className="pb-8">
      <Suspense fallback={<div className="legacy-bubble">Loading gallery...</div>}>
        <GalleryContent />
      </Suspense>
    </section>
  );
}
