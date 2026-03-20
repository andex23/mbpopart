'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import ArtworkCard from '@/components/ArtworkCard';
import ImageViewer from '@/components/ImageViewer';
import LegacySplitLayout from '@/components/LegacySplitLayout';
import PortableTextContent from '@/components/PortableTextContent';
import RetroNavButton from '@/components/RetroNavButton';
import {
  doesYearGroupMatchRangeFilter,
  getArtworkYearValue,
  getRangeFromFilterKey,
  normalizeRangeFilterKey,
} from '@/data/artworks';
import type { Artwork } from '@/data/artworks';
import type { PaintingsPageView, SiteSettingsView } from '@/lib/content.types';

const INITIAL_COUNT = 30;

interface GallerySection {
  key: string;
  label: string;
  works: Artwork[];
}

interface GalleryClientPageProps {
  pageContent: PaintingsPageView;
  siteSettings: SiteSettingsView;
}

function parseQueryYear(value: string | null): number | null {
  if (!value || !/^\d{4}$/.test(value)) {
    return null;
  }

  return Number(value);
}

export default function GalleryClientPage({ pageContent, siteSettings }: GalleryClientPageProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const rangeFromQuery = normalizeRangeFilterKey(searchParams.get('range'));
  const yearFromQuery = parseQueryYear(searchParams.get('year'));
  const legacyRangeParam = searchParams.get('year');
  const legacyRangeFromQuery = normalizeRangeFilterKey(
    yearFromQuery === null ? legacyRangeParam : null,
  );
  const initialRange = rangeFromQuery ?? legacyRangeFromQuery;

  const [activeRangeKey, setActiveRangeKey] = useState<string | null>(initialRange);
  const [activeYear, setActiveYear] = useState<number | null>(yearFromQuery);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);

  useEffect(() => {
    setActiveRangeKey(initialRange);
    setActiveYear(yearFromQuery);
  }, [initialRange, yearFromQuery]);

  const visibleRangeGroups = useMemo(() => {
    if (!activeRangeKey) {
      return pageContent.yearGroups;
    }

    return pageContent.yearGroups.filter((group) => (
      group.rangeKey === activeRangeKey ||
      doesYearGroupMatchRangeFilter(group.year, activeRangeKey)
    ));
  }, [activeRangeKey, pageContent.yearGroups]);

  const rangeBuckets = useMemo(() => {
    const bucket = new Map<number, Artwork[]>();
    const range = activeRangeKey ? getRangeFromFilterKey(activeRangeKey) : null;
    const minYear = range?.from ?? Number.NEGATIVE_INFINITY;
    const maxYear = range?.to ?? Number.POSITIVE_INFINITY;

    for (const group of visibleRangeGroups) {
      for (const work of group.works) {
        const numericYear = getArtworkYearValue(work);
        if (numericYear === null) {
          continue;
        }
        if (numericYear < minYear || numericYear > maxYear) {
          continue;
        }

        const current = bucket.get(numericYear);
        if (current) {
          current.push(work);
        } else {
          bucket.set(numericYear, [work]);
        }
      }
    }

    return bucket;
  }, [activeRangeKey, visibleRangeGroups]);

  const availableYearsInRange = useMemo(
    () => Array.from(rangeBuckets.keys()).sort((a, b) => b - a),
    [rangeBuckets],
  );

  useEffect(() => {
    if (!activeRangeKey) {
      if (activeYear !== null) {
        setActiveYear(null);
      }
      return;
    }

    if (availableYearsInRange.length === 0) {
      if (activeYear !== null) {
        setActiveYear(null);
      }
      return;
    }

    if (activeYear === null || !availableYearsInRange.includes(activeYear)) {
      setActiveYear(availableYearsInRange[0]);
    }
  }, [activeRangeKey, activeYear, availableYearsInRange]);

  useEffect(() => {
    setExpandedSections({});
  }, [activeRangeKey, activeYear]);

  const displaySections = useMemo<GallerySection[]>(() => {
    if (!activeRangeKey) {
      return visibleRangeGroups.map((group) => ({
        key: `group-${group.year}`,
        label: group.year,
        works: group.works,
      }));
    }

    if (availableYearsInRange.length === 0) {
      return [];
    }

    if (activeYear !== null) {
      const works = rangeBuckets.get(activeYear) ?? [];
      return [
        {
          key: `year-${activeYear}`,
          label: String(activeYear),
          works,
        },
      ];
    }

    return availableYearsInRange.map((year) => ({
      key: `year-${year}`,
      label: String(year),
      works: rangeBuckets.get(year) ?? [],
    }));
  }, [activeRangeKey, activeYear, availableYearsInRange, rangeBuckets, visibleRangeGroups]);

  const renderedSections = useMemo(() => (
    displaySections.map((section) => {
      const isExpanded = expandedSections[section.key];
      const totalWorks = section.works.length;
      const hasMore = totalWorks > INITIAL_COUNT;
      const works = isExpanded ? section.works : section.works.slice(0, INITIAL_COUNT);

      return {
        ...section,
        totalWorks,
        hasMore,
        isExpanded,
        works,
      };
    })
  ), [displaySections, expandedSections]);

  const allVisibleWorks = useMemo(() => (
    renderedSections.flatMap((section) => section.works)
  ), [renderedSections]);

  const updateQuery = (rangeKey: string | null, year: number | null) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('range');
    params.delete('year');

    if (rangeKey) {
      params.set('range', rangeKey);
    }

    if (year !== null) {
      params.set('year', String(year));
    }

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const handleRangeChange = (rangeKey: string | null) => {
    setActiveRangeKey(rangeKey);
    if (!rangeKey) {
      setActiveYear(null);
      updateQuery(null, null);
      return;
    }

    const range = getRangeFromFilterKey(rangeKey);
    const fallbackYear = range?.to ?? new Date().getFullYear();
    setActiveYear(fallbackYear);
    updateQuery(rangeKey, null);
  };

  const handleYearChange = (year: number) => {
    setActiveYear(year);
    updateQuery(activeRangeKey, year);
  };

  const openViewer = (work: Artwork) => {
    const index = allVisibleWorks.findIndex((current) => current.imageUrl === work.imageUrl);
    if (index >= 0) {
      setViewerIndex(index);
      setViewerOpen(true);
    }
  };

  const activeRangeLabel = pageContent.yearRanges.find((range) => range.key === activeRangeKey)?.label;
  const emptySectionLabel = (activeYear !== null ? String(activeYear) : activeRangeLabel) || 'Selected Section';

  const leftContent = activeRangeKey === null ? (
    <>
      <PortableTextContent value={pageContent.introText} />
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
  ) : null;

  const rightContent = (
    <>
      {activeRangeKey === null ? (
        <div className="flex flex-wrap gap-2 mb-3">
          <RetroNavButton
            type="button"
            active
            onClick={() => handleRangeChange(null)}
          >
            All Years
          </RetroNavButton>
          {pageContent.yearRanges.map((range) => (
            <RetroNavButton
              type="button"
              key={range.key}
              active={false}
              onClick={() => handleRangeChange(range.key)}
            >
              {range.label}
            </RetroNavButton>
          ))}
        </div>
      ) : null}

      {activeRangeKey && availableYearsInRange.length > 0 ? (
        <div className="gallery-year-selector">
          <p className="gallery-year-selector-label">
            {activeRangeLabel ? `${activeRangeLabel} Years` : 'Year Selector'}
          </p>
          <div className="flex flex-wrap gap-2">
            {availableYearsInRange.map((year) => (
              <RetroNavButton
                type="button"
                key={year}
                active={activeYear === year}
                onClick={() => handleYearChange(year)}
              >
                {year}
              </RetroNavButton>
            ))}
          </div>
        </div>
      ) : null}

      {renderedSections.length === 0 ? (
        <section className="gallery-year-section" aria-live="polite">
          <div className="gallery-year-header">
            <h2 className="legacy-subtitle mb-0">
              {emptySectionLabel} (0)
            </h2>
          </div>
          <p className="legacy-empty-message">No paintings have been published in this section yet.</p>
        </section>
      ) : null}

      {renderedSections.map((section) => (
        <section key={section.key} className="gallery-year-section">
          <div className="gallery-year-header">
            <h2 className="legacy-subtitle mb-0">
              {section.label} ({section.totalWorks})
            </h2>
            {section.hasMore ? (
              <RetroNavButton
                type="button"
                onClick={() =>
                  setExpandedSections((prev) => ({
                    ...prev,
                    [section.key]: !prev[section.key],
                  }))
                }
              >
                {section.isExpanded ? 'Collapse Year' : `Show All ${section.totalWorks}`}
              </RetroNavButton>
            ) : null}
          </div>

          <div className="legacy-thumb-grid">
            {section.works.map((work, index) => (
              <ArtworkCard
                key={work.imageUrl}
                work={work}
                priority={index < 10}
                onClick={() => openViewer(work)}
              />
            ))}
          </div>
        </section>
      ))}
    </>
  );

  return (
    <>
      {activeRangeKey === null ? (
        <LegacySplitLayout
          title={pageContent.title}
          leftContent={leftContent}
          rightContent={rightContent}
        />
      ) : (
        <div className="legacy-bubble gallery-range-page">
          <section className="gallery-range-content">{rightContent}</section>
        </div>
      )}
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
