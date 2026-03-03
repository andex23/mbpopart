'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { HappyClientPhotoView, LegacyThumbItem } from '@/lib/content.types';
import LegacyThumbViewer from '@/components/LegacyThumbViewer';
import { resolveLegacyImageUrl } from '@/lib/legacy-image';

interface HappyClientGridProps {
  clients: HappyClientPhotoView[];
}

const PAGE_SIZE = 12;

export default function HappyClientGrid({ clients }: HappyClientGridProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);

  const realClients = useMemo(
    () => clients.filter((client) => Boolean(client.image && client.image.trim())),
    [clients],
  );

  const totalPages = Math.ceil(realClients.length / PAGE_SIZE);
  const startIdx = (currentPage - 1) * PAGE_SIZE;
  const visible = realClients.slice(startIdx, startIdx + PAGE_SIZE);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const viewerItems: LegacyThumbItem[] = useMemo(
    () =>
      realClients
        .map((c) => ({
          imageUrl: resolveLegacyImageUrl(c.image),
          thumbUrl: resolveLegacyImageUrl(c.thumb),
          caption: c.caption ?? '',
        })),
    [realClients],
  );

  function openViewer(client: HappyClientPhotoView) {
    const idx = viewerItems.findIndex((v) => v.imageUrl === resolveLegacyImageUrl(client.image));
    if (idx !== -1) {
      setViewerIndex(idx);
      setViewerOpen(true);
    }
  }

  function goToPage(page: number) {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <>
      {realClients.length > 0 ? (
        <div className="happy-grid">
          {visible.map((client, index) => {
            const detailLine = [client.location, client.note].filter(Boolean).join(' · ');
            return (
            <figure key={`${client.image}-${client.order ?? index}`} className="happy-cell">
              <button
                type="button"
                className="happy-cell-trigger"
                onClick={() => openViewer(client)}
                aria-label={`View ${client.caption ?? 'photo'}`}
              >
                <div className="happy-cell-media">
                  <Image
                    src={resolveLegacyImageUrl(client.image)}
                    alt={client.caption ?? 'Happy client with painting'}
                    fill
                    className="happy-cell-image"
                    sizes="(max-width: 768px) 46vw, (max-width: 1200px) 30vw, 280px"
                    unoptimized
                  />
                </div>
              </button>
              <figcaption className="happy-info">
                {client.caption ? <span className="happy-caption">{client.caption}</span> : null}
                {detailLine ? <span className="happy-meta">{detailLine}</span> : null}
              </figcaption>
            </figure>
            );
          })}
        </div>
      ) : (
        <p className="happy-empty">No client photos published yet.</p>
      )}

      {totalPages > 1 && (
        <nav className="happy-pagination" aria-label="Gallery pages">
          <button
            type="button"
            className="happy-page-arrow"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              type="button"
              className={`happy-page-num ${page === currentPage ? 'active' : ''}`}
              onClick={() => goToPage(page)}
              aria-label={`Page ${page}`}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </button>
          ))}

          <button
            type="button"
            className="happy-page-arrow"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </nav>
      )}

      {viewerOpen && (
        <LegacyThumbViewer
          items={viewerItems}
          currentIndex={viewerIndex}
          onClose={() => setViewerOpen(false)}
          onNavigate={setViewerIndex}
        />
      )}
    </>
  );
}
