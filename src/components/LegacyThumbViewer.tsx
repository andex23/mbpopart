'use client';

import React, { useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { LegacyThumbItem } from '@/lib/content.types';
import { resolveLegacyImageUrl } from '@/lib/legacy-image';

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
        {currentIndex > 0 ? (
          <button
            type="button"
            className="legacy-lightbox-nav legacy-lightbox-nav-prev"
            onClick={goPrev}
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        ) : null}

        {currentIndex < items.length - 1 ? (
          <button
            type="button"
            className="legacy-lightbox-nav legacy-lightbox-nav-next"
            onClick={goNext}
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        ) : null}

        <button type="button" className="legacy-lightbox-close" onClick={onClose} aria-label="Close preview">
          <X className="w-5 h-5" />
        </button>

        <div className="legacy-lightbox-image-wrap">
          <img
            src={resolveLegacyImageUrl(item.imageUrl)}
            alt={item.caption}
            className="legacy-lightbox-image"
          />
        </div>
        {item.caption ? <div className="legacy-lightbox-caption">{item.caption}</div> : null}
      </div>
    </div>
  );
}
