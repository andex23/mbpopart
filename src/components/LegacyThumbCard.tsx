import React from 'react';
import Image from 'next/image';
import type { LegacyThumbItem } from '@/data/legacy-content';

interface LegacyThumbCardProps {
  item: LegacyThumbItem;
  onOpen?: () => void;
}

export default function LegacyThumbCard({ item, onOpen }: LegacyThumbCardProps) {
  return (
    <figure className="legacy-thumb">
      {onOpen ? (
        <button type="button" onClick={onOpen} className="legacy-thumb-trigger" aria-label={`Open ${item.caption}`}>
          <div className="legacy-thumb-media">
            <Image
              src={item.thumbUrl}
              alt={item.caption}
              fill
              className="legacy-thumb-image object-cover"
              sizes="(max-width: 768px) 46vw, (max-width: 1200px) 24vw, 170px"
              unoptimized
            />
          </div>
        </button>
      ) : (
        <a href={item.imageUrl} target="_blank" rel="noopener noreferrer" className="legacy-thumb-link">
          <div className="legacy-thumb-media">
            <Image
              src={item.thumbUrl}
              alt={item.caption}
              fill
              className="legacy-thumb-image object-cover"
              sizes="(max-width: 768px) 46vw, (max-width: 1200px) 24vw, 170px"
              unoptimized
            />
          </div>
        </a>
      )}
      <figcaption className="legacy-thumb-caption">{item.caption}</figcaption>
      {item.status ? <p className={`legacy-status ${item.status.toLowerCase()}`}>{item.status}</p> : null}
      {item.meta ? <p className="legacy-meta">{item.meta}</p> : null}
    </figure>
  );
}
