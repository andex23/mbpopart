'use client';

import React, { useMemo } from 'react';
import LegacyThumbViewer from '@/components/LegacyThumbViewer';
import type { LegacyThumbItem } from '@/lib/content.types';
import { getArtworkDisplayTitle } from '@/data/artworks';
import type { Artwork } from '@/data/artworks';

interface ImageViewerProps {
  works: Artwork[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function ImageViewer({ works, currentIndex, onClose, onNavigate }: ImageViewerProps) {
  const items: LegacyThumbItem[] = useMemo(
    () =>
      works.map((work) => ({
        imageUrl: work.imageUrl,
        thumbUrl: work.thumbnailUrl ?? work.imageUrl,
        caption: getArtworkDisplayTitle(work),
      })),
    [works],
  );

  return (
    <LegacyThumbViewer
      items={items}
      currentIndex={currentIndex}
      onClose={onClose}
      onNavigate={onNavigate}
    />
  );
}
