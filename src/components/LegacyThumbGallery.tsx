'use client';

import React, { useState } from 'react';
import type { LegacyThumbItem } from '@/data/legacy-content';
import LegacyThumbCard from '@/components/LegacyThumbCard';
import LegacyThumbViewer from '@/components/LegacyThumbViewer';

interface LegacyThumbGalleryProps {
  items: LegacyThumbItem[];
}

export default function LegacyThumbGallery({ items }: LegacyThumbGalleryProps) {
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);

  return (
    <>
      <div className="legacy-thumb-grid">
        {items.map((item, index) => (
          <LegacyThumbCard
            key={`${item.imageUrl}-${item.caption}`}
            item={item}
            onOpen={() => {
              setViewerIndex(index);
              setViewerOpen(true);
            }}
          />
        ))}
      </div>

      {viewerOpen ? (
        <LegacyThumbViewer
          items={items}
          currentIndex={viewerIndex}
          onClose={() => setViewerOpen(false)}
          onNavigate={setViewerIndex}
        />
      ) : null}
    </>
  );
}
