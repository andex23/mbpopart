'use client';

import React, { Suspense } from 'react';
import { usePathname } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ConstructionNotice from '@/components/ConstructionNotice';
import type { NavigationViewItem } from '@/lib/content.types';

interface SiteGateProps {
  children: React.ReactNode;
  navigation: NavigationViewItem[];
  previewBypassEnabled: boolean;
  siteSettings: {
    contactEmail: string;
    contactPhone: string;
    footerText: string;
    footerPortraitUrl?: string;
  };
}

const MAINTENANCE_MODE = true;

export default function SiteGate({
  children,
  navigation,
  previewBypassEnabled,
  siteSettings,
}: SiteGateProps) {
  const pathname = usePathname();
  const isStudioRoute = pathname.startsWith('/studio');

  if (MAINTENANCE_MODE && !isStudioRoute && !previewBypassEnabled) {
    return (
      <main className="site-shell site-shell-construction">
        <ConstructionNotice
          contactEmail={siteSettings.contactEmail}
          contactPhone={siteSettings.contactPhone}
          fullPage
        />
      </main>
    );
  }

  return (
    <>
      <Suspense fallback={null}>
        <Navigation items={navigation} />
      </Suspense>
      <main className="site-shell">{children}</main>
      <Footer
        contactEmail={siteSettings.contactEmail}
        contactPhone={siteSettings.contactPhone}
        footerText={siteSettings.footerText}
        footerPortraitUrl={siteSettings.footerPortraitUrl}
      />
    </>
  );
}
