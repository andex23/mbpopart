'use client';

import React, { useEffect, useCallback, useState, useRef } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Artwork } from '@/data/artworks';

interface ImageViewerProps {
  works: Artwork[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function ImageViewer({ works, currentIndex, onClose, onNavigate }: ImageViewerProps) {
  const work = works[currentIndex];
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const [isClosing, setIsClosing] = useState(false);

  const goNext = useCallback(() => {
    if (currentIndex < works.length - 1) onNavigate(currentIndex + 1);
  }, [currentIndex, works.length, onNavigate]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) onNavigate(currentIndex - 1);
  }, [currentIndex, onNavigate]);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(onClose, 200);
  }, [onClose]);

  // Keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [goNext, goPrev, handleClose]);

  // Swipe detection
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const onTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 60) {
      if (diff > 0) goNext();
      else goPrev();
    }
  };

  if (!work) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-black/95 flex flex-col transition-opacity duration-200 ${
        isClosing ? 'opacity-0' : 'animate-fade-in'
      }`}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Close Button */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 z-10 p-3 rounded-xl glass text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
        aria-label="Close viewer"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-lg glass text-white/60 text-sm">
        {currentIndex + 1} / {works.length}
      </div>

      {/* Navigation Arrows */}
      {currentIndex > 0 && (
        <button
          onClick={goPrev}
          className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-xl glass text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200"
          aria-label="Previous"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}
      {currentIndex < works.length - 1 && (
        <button
          onClick={goNext}
          className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-xl glass text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200"
          aria-label="Next"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Image Area */}
      <div className="flex-1 flex items-center justify-center p-4 pb-0">
        <div className="relative w-full h-full max-w-5xl">
          <Image
            src={work.imageUrl}
            alt={work.paintingName}
            fill
            className="object-contain"
            sizes="100vw"
            priority
            unoptimized
          />
        </div>
      </div>

      {/* Glass Caption Bar */}
      <div className="glass border-t border-[var(--glass-border)] px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <div className="min-w-0">
            <h3 className="text-white font-medium text-base truncate">{work.paintingName}</h3>
            <p className="text-white/50 text-sm mt-0.5">
              {[work.year, work.medium, work.dimensions].filter(Boolean).join(' · ')}
            </p>
          </div>
          {work.isCommission && (
            <span className="flex-shrink-0 px-3 py-1 rounded-lg bg-[var(--accent)]/20 text-[var(--accent)] text-xs font-medium">
              Commission
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
