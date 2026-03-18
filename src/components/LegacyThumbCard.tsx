import React from 'react';
import Image from 'next/image';
import type { LegacyThumbItem } from '@/lib/content.types';
import { resolveLegacyImageUrl } from '@/lib/legacy-image';

interface LegacyThumbCardProps {
  item: LegacyThumbItem;
  onOpen?: () => void;
  imageFit?: 'cover' | 'contain';
  mediaAspect?: string;
}

export default function LegacyThumbCard({
  item,
  onOpen,
  imageFit = 'cover',
  mediaAspect = '1 / 1',
}: LegacyThumbCardProps) {
  const previewSrc = item.thumbUrl || item.imageUrl || '/placeholders/new-painting-coming-soon.svg';
  const fullSrc = item.imageUrl || previewSrc;
  const resolvedPreviewSrc = resolveLegacyImageUrl(previewSrc);
  const resolvedFullSrc = resolveLegacyImageUrl(fullSrc);
  const caption = item.caption?.trim() || 'Untitled';
  const effectiveImageFit = item.imageFit ?? imageFit;

  return (
    <figure className="legacy-thumb">
      {onOpen ? (
        <button type="button" onClick={onOpen} className="legacy-thumb-trigger" aria-label={`Open ${caption}`}>
          <div className="legacy-thumb-media" style={{ aspectRatio: mediaAspect }}>
            <Image
              src={resolvedPreviewSrc}
              alt={caption}
              fill
              className="legacy-thumb-image"
              style={{ objectFit: effectiveImageFit }}
              sizes="(max-width: 768px) 46vw, (max-width: 1200px) 24vw, 170px"
              referrerPolicy="no-referrer"
              unoptimized
            />
          </div>
        </button>
      ) : (
        <a href={resolvedFullSrc} target="_blank" rel="noopener noreferrer" className="legacy-thumb-link">
          <div className="legacy-thumb-media" style={{ aspectRatio: mediaAspect }}>
            <Image
              src={resolvedPreviewSrc}
              alt={caption}
              fill
              className="legacy-thumb-image"
              style={{ objectFit: effectiveImageFit }}
              sizes="(max-width: 768px) 46vw, (max-width: 1200px) 24vw, 170px"
              referrerPolicy="no-referrer"
              unoptimized
            />
          </div>
        </a>
      )}
      <figcaption className="legacy-thumb-caption">{caption}</figcaption>
      {item.status ? <p className={`legacy-status ${item.status.toLowerCase()}`}>{item.status}</p> : null}
      {item.meta ? <p className="legacy-meta">{item.meta}</p> : null}
    </figure>
  );
}
