'use client';

import React from 'react';
import Image from 'next/image';
import type { Artwork } from '@/data/artworks';

interface ArtworkCardProps {
  work: Artwork;
  onClick?: () => void;
  priority?: boolean;
}

export default function ArtworkCard({ work, onClick, priority = false }: ArtworkCardProps) {
  return (
    <button
      onClick={onClick}
      className="card-premium group cursor-pointer w-full text-left"
    >
      <div className="img-zoom-container">
        <Image
          src={work.thumbnailUrl || work.imageUrl}
          alt={work.paintingName}
          fill
          className="img-zoom object-cover"
          sizes="(max-width: 640px) 48vw, (max-width: 768px) 32vw, (max-width: 1024px) 24vw, 180px"
          priority={priority}
          unoptimized
        />
      </div>
      <div className="pt-2">
        <h3 className="legacy-thumb-caption line-clamp-2">
          {work.paintingName}
        </h3>
      </div>
    </button>
  );
}
