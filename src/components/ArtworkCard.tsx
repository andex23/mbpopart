'use client';

import React from 'react';
import Image from 'next/image';
import { getArtworkDisplayTitle, getArtworkYearValue } from '@/data/artworks';
import type { Artwork } from '@/data/artworks';
import { resolveLegacyImageUrl } from '@/lib/legacy-image';

interface ArtworkCardProps {
  work: Artwork;
  onClick?: () => void;
  priority?: boolean;
}

export default function ArtworkCard({ work, onClick, priority = false }: ArtworkCardProps) {
  const previewSrc = work.thumbnailUrl || work.imageUrl;
  const resolvedPreviewSrc = resolveLegacyImageUrl(previewSrc);
  const title = getArtworkDisplayTitle(work);
  const statusClassName = work.status ? `artwork-preview-status ${work.status.toLowerCase()}` : null;
  const copyrightYear = work.copyrightYear ?? getArtworkYearValue(work);
  const metaParts = [
    work.dimensions?.trim(),
    copyrightYear ? `© ${copyrightYear}` : undefined,
  ].filter(Boolean) as string[];
  const metadata = metaParts.join(' · ');

  return (
    <button
      onClick={onClick}
      className="card-premium group cursor-pointer w-full text-left"
    >
      <div className="img-zoom-container">
        <Image
          src={resolvedPreviewSrc}
          alt={title}
          fill
          className="img-zoom"
          style={{ objectFit: work.previewImageFit ?? 'cover' }}
          sizes="(max-width: 640px) 48vw, (max-width: 768px) 32vw, (max-width: 1024px) 24vw, 180px"
          priority={priority}
          referrerPolicy="no-referrer"
          unoptimized
        />
        <div className="artwork-preview-overlay">
          <p className="artwork-preview-title">{title}</p>
          {work.status ? <p className={statusClassName ?? undefined}>{work.status}</p> : null}
          {metadata ? <p className="artwork-preview-meta">{metadata}</p> : null}
        </div>
      </div>
    </button>
  );
}
