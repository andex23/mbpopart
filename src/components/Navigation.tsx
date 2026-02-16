'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { ChevronDown, Menu, X } from 'lucide-react';

const YEAR_LINKS = [
  '2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010',
  '2009', '2008', '2007', '2005-2006', '2001-2004', '1998-2000', 'Before 1998',
];

const NAV_LINKS = [
  { label: 'Bio', href: '/bio' },
  { label: 'Available', href: '/available' },
  { label: 'Commissions', href: '/commissions' },
  { label: 'Prints', href: '/prints' },
  { label: 'Venues', href: '/venues' },
  { label: 'News', href: '/news' },
  { label: 'Photos', href: '/photos' },
];

export default function Navigation() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobilePaintingsOpen, setMobilePaintingsOpen] = useState(false);

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
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) {
      setMobilePaintingsOpen(false);
      return;
    }

    if (pathname === '/gallery') {
      setMobilePaintingsOpen(true);
    }
  }, [mobileOpen, pathname]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  const isActive = (href: string) => {
    return pathname === href;
  };

  const [bioLink, ...otherLinks] = NAV_LINKS;

  return (
    <>
      <header className="site-header">
        <div className="site-header-inner">
          <Link href="/" className="site-logo" aria-label="MB Pop Art Home">
            <Image
              src="https://mbpopart.com/assets/mbpopart-small.png"
              alt="MB Pop Art"
              width={280}
              height={62}
              unoptimized
            />
          </Link>

          <nav className="site-nav-desktop" aria-label="Main navigation">
            <Link
              href={bioLink.href}
              className={`site-nav-btn ${isActive(bioLink.href) ? 'active' : ''}`}
            >
              {bioLink.label}
            </Link>
            <div className="site-nav-dropdown">
              <Link
                href="/gallery"
                className={`site-nav-btn ${pathname === '/gallery' ? 'active' : ''}`}
              >
                Paintings <ChevronDown className="w-3.5 h-3.5" />
              </Link>
              <div className="site-nav-dropdown-menu">
                <Link href="/gallery" className="site-subnav-btn">
                  All Years
                </Link>
                {YEAR_LINKS.map((year) => (
                  <Link key={year} href={`/gallery?year=${encodeURIComponent(year)}`} className="site-subnav-btn">
                    {year}
                  </Link>
                ))}
              </div>
            </div>
            {otherLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`site-nav-btn ${isActive(link.href) ? 'active' : ''}`}
              >
                {link.label}
              </Link>
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
            <Link
              href={bioLink.href}
              onClick={() => setMobileOpen(false)}
              className={`site-mobile-link ${isActive(bioLink.href) ? 'active' : ''}`}
            >
              {bioLink.label}
            </Link>
            <div className="site-mobile-group">
              <button
                type="button"
                className={`site-mobile-group-toggle ${pathname === '/gallery' ? 'active' : ''}`}
                aria-expanded={mobilePaintingsOpen}
                onClick={() => setMobilePaintingsOpen((value) => !value)}
              >
                <span>Paintings</span>
                <ChevronDown className={`site-mobile-chevron ${mobilePaintingsOpen ? 'open' : ''}`} />
              </button>
              <div className={`site-mobile-years-wrap ${mobilePaintingsOpen ? 'open' : ''}`}>
                <div className="site-mobile-years">
                  <Link
                    href="/gallery"
                    onClick={() => setMobileOpen(false)}
                    className={`site-mobile-year ${pathname === '/gallery' ? 'active' : ''}`}
                  >
                    All Years
                  </Link>
                  {YEAR_LINKS.map((year) => (
                    <Link
                      key={year}
                      href={`/gallery?year=${encodeURIComponent(year)}`}
                      onClick={() => setMobileOpen(false)}
                      className="site-mobile-year"
                    >
                      {year}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            {otherLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`site-mobile-link ${isActive(link.href) ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
