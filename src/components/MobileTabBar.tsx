'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Image, User, Newspaper, Mail } from 'lucide-react';

const TABS = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Gallery', href: '/gallery', icon: Image },
  { label: 'Bio', href: '/bio', icon: User },
  { label: 'News', href: '/news', icon: Newspaper },
  { label: 'Contact', href: '/#contact', icon: Mail },
];

export default function MobileTabBar() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setVisible(y < lastY || y < 80);
      setLastY(y);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastY]);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 lg:hidden transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="glass border-t border-[var(--glass-border)]">
        <nav className="flex items-center justify-around h-16 max-w-md mx-auto">
          {TABS.map((tab) => {
            const basePath = tab.href.split('#')[0];
            const isActive = tab.href.includes('#')
              ? false
              : tab.href === '/'
                ? pathname === '/'
                : pathname === basePath;
            const Icon = tab.icon;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`flex flex-col items-center gap-0.5 px-3 py-1.5 transition-colors duration-200 ${
                  isActive
                    ? 'text-[var(--accent)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{tab.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
