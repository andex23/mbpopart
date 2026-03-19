'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { ChevronDown, Menu, X } from 'lucide-react';
import { normalizeRangeFilterKey, YEAR_RANGE_FILTERS } from '@/data/artworks';
import type { NavigationViewItem } from '@/lib/content.types';
import { resolveLegacyImageUrl } from '@/lib/legacy-image';

interface NavigationProps {
  items: NavigationViewItem[];
}

function sortNavigationItems(items: NavigationViewItem[]): NavigationViewItem[] {
  return [...items]
    .filter((item) => item.enabled)
    .sort((a, b) => a.order - b.order);
}

export default function Navigation({ items }: NavigationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobilePaintingsOpen, setMobilePaintingsOpen] = useState(false);
  const [desktopPaintingsOpen, setDesktopPaintingsOpen] = useState(false);
  const desktopPaintingsRef = useRef<HTMLDivElement | null>(null);
  const sortedItems = sortNavigationItems(items);
  const paintingsItem = sortedItems.find((item) => item.key === 'paintings');
  const searchParamsKey = searchParams.toString();
  const selectedRangeKey = pathname === '/gallery'
    ? normalizeRangeFilterKey(searchParams.get('range') ?? searchParams.get('year'))
    : null;
  const paintingMenuRanges = YEAR_RANGE_FILTERS;

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
    setDesktopPaintingsOpen(false);
  }, [pathname, searchParamsKey]);

  useEffect(() => {
    if (!mobileOpen) {
      setMobilePaintingsOpen(false);
    }
  }, [mobileOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
        setDesktopPaintingsOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!desktopPaintingsOpen) {
      return undefined;
    }

    const onPointerDown = (event: PointerEvent) => {
      if (desktopPaintingsRef.current?.contains(event.target as Node)) {
        return;
      }

      setDesktopPaintingsOpen(false);
    };

    window.addEventListener('pointerdown', onPointerDown);
    return () => {
      window.removeEventListener('pointerdown', onPointerDown);
    };
  }, [desktopPaintingsOpen]);

  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <>
      <header className="site-header">
        <div className="site-header-inner">
          <Link href="/" className="site-logo" aria-label="MB Pop Art Home">
            <Image
              src={resolveLegacyImageUrl('https://mbpopart.com/assets/mbpopart-small.png')}
              alt="MB Pop Art"
              width={280}
              height={62}
              unoptimized
            />
          </Link>

          <nav className="site-nav-desktop" aria-label="Main navigation">
            {sortedItems.map((item) => (
              item.key === 'paintings' && paintingsItem ? (
                <div
                  key={item.key}
                  ref={desktopPaintingsRef}
                  className={`site-nav-dropdown ${desktopPaintingsOpen ? 'open' : ''}`}
                >
                  <button
                    type="button"
                    className={`site-nav-btn ${pathname === '/gallery' ? 'active' : ''}`}
                    aria-expanded={desktopPaintingsOpen}
                    aria-haspopup="menu"
                    aria-controls="site-paintings-menu"
                    onClick={() => setDesktopPaintingsOpen((value) => !value)}
                  >
                    {paintingsItem.label} <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  <div
                    id="site-paintings-menu"
                    className={`site-nav-dropdown-menu ${desktopPaintingsOpen ? 'open' : ''}`}
                    role="menu"
                  >
                    <Link
                      href="/gallery"
                      onClick={() => setDesktopPaintingsOpen(false)}
                      className={`site-subnav-btn ${selectedRangeKey === null && pathname === '/gallery' ? 'active' : ''}`}
                      role="menuitem"
                    >
                      All Years
                    </Link>
                    {paintingMenuRanges.map((range) => (
                      <Link
                        key={range.key}
                        href={`/gallery?range=${encodeURIComponent(range.key)}`}
                        onClick={() => setDesktopPaintingsOpen(false)}
                        className={`site-subnav-btn ${selectedRangeKey === range.key ? 'active' : ''}`}
                        role="menuitem"
                      >
                        {range.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`site-nav-btn ${isActive(item.href) ? 'active' : ''}`}
                >
                  {item.label}
                </Link>
              )
            ))}
          </nav>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="site-mobile-toggle"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            aria-controls="site-mobile-menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div className="site-mobile-overlay">
          <button
            className="site-mobile-toggle ml-auto mb-2 block"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
          <nav id="site-mobile-menu" className="site-mobile-nav" aria-label="Mobile navigation">
            {sortedItems.map((item) => (
              item.key === 'paintings' && paintingsItem ? (
                <div key={item.key} className="site-mobile-group">
                  <button
                    type="button"
                    className={`site-mobile-group-toggle ${pathname === '/gallery' ? 'active' : ''}`}
                    aria-expanded={mobilePaintingsOpen}
                    onClick={() => setMobilePaintingsOpen((value) => !value)}
                  >
                    <span>{paintingsItem.label}</span>
                    <ChevronDown className={`site-mobile-chevron ${mobilePaintingsOpen ? 'open' : ''}`} />
                  </button>
                  <div className={`site-mobile-years-wrap ${mobilePaintingsOpen ? 'open' : ''}`}>
                    <div className="site-mobile-years">
                      <Link
                        href="/gallery"
                        onClick={() => setMobileOpen(false)}
                        className={`site-mobile-year ${pathname === '/gallery' && !selectedRangeKey ? 'active' : ''}`}
                      >
                        All Years
                      </Link>
                      {paintingMenuRanges.map((range) => (
                        <Link
                          key={range.key}
                          href={`/gallery?range=${encodeURIComponent(range.key)}`}
                          onClick={() => setMobileOpen(false)}
                          className={`site-mobile-year ${selectedRangeKey === range.key ? 'active' : ''}`}
                        >
                          {range.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`site-mobile-link ${isActive(item.href) ? 'active' : ''}`}
                >
                  {item.label}
                </Link>
              )
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
