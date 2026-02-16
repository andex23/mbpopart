'use client';

import React, { useState } from 'react';
import ArtworkCard from '@/components/ArtworkCard';
import ImageViewer from '@/components/ImageViewer';
import type { Artwork } from '@/data/artworks';

interface ArtworkGridPageProps {
  title: string;
  subtitle: string;
  works: Artwork[];
}

export default function ArtworkGridPage({ title, subtitle, works }: ArtworkGridPageProps) {
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);

  return (
    <section className="pb-8">
      <div className="legacy-bubble">
        <h1 className="legacy-heading mb-2">{title}</h1>
        <p className="text-[13px] text-[#2b3b66] mb-4">{subtitle}</p>
        <div className="legacy-thumb-grid">
          {works.map((work, index) => (
            <ArtworkCard
              key={work.imageUrl}
              work={work}
              priority={index < 10}
              onClick={() => {
                setViewerIndex(index);
                setViewerOpen(true);
              }}
            />
          ))}
        </div>
      </div>

      {viewerOpen && (
        <ImageViewer
          works={works}
          currentIndex={viewerIndex}
          onClose={() => setViewerOpen(false)}
          onNavigate={setViewerIndex}
        />
      )}
    </section>
  );
}
