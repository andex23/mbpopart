'use client';

import React, { useCallback, useEffect } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import type { LegacyThumbItem } from '@/data/legacy-content';

interface LegacyThumbViewerProps {
  items: LegacyThumbItem[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function LegacyThumbViewer({
  items,
  currentIndex,
  onClose,
  onNavigate,
}: LegacyThumbViewerProps) {
  const item = items[currentIndex];

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      onNavigate(currentIndex - 1);
    }
  }, [currentIndex, onNavigate]);

  const goNext = useCallback(() => {
    if (currentIndex < items.length - 1) {
      onNavigate(currentIndex + 1);
    }
  }, [currentIndex, items.length, onNavigate]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
      if (event.key === 'ArrowLeft') {
        goPrev();
      }
      if (event.key === 'ArrowRight') {
        goNext();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [goNext, goPrev, onClose]);

  if (!item) {
    return null;
  }

  return (
    <div className="legacy-lightbox" role="dialog" aria-modal="true" aria-label={item.caption}>
      <button className="legacy-lightbox-backdrop" aria-label="Close preview" onClick={onClose} />

      <div className="legacy-lightbox-panel">
        <button type="button" className="legacy-lightbox-close" onClick={onClose} aria-label="Close preview">
          <X className="w-5 h-5" />
        </button>

        <div className="legacy-lightbox-image-wrap">
          <Image
            src={item.imageUrl}
            alt={item.caption}
            fill
            className="legacy-lightbox-image"
            sizes="100vw"
            priority
            unoptimized
          />
        </div>
      </div>
    </div>
  );
}
