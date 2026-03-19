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
    maintenanceModeEnabled: boolean;
    footerText: string;
    footerPortraitUrl?: string;
    socialLinks: Array<{ label: string; url: string }>;
  };
}

export default function SiteGate({
  children,
  navigation,
  previewBypassEnabled,
  siteSettings,
}: SiteGateProps) {
  const pathname = usePathname();
  const isStudioRoute = pathname.startsWith('/studio');
  const maintenanceModeEnabled = siteSettings.maintenanceModeEnabled === true;

  if (maintenanceModeEnabled && !isStudioRoute && !previewBypassEnabled) {
    return (
      <main className="site-shell site-shell-construction">
        <ConstructionNotice
          contactEmail={siteSettings.contactEmail}
          contactPhone={siteSettings.contactPhone}
          socialLinks={siteSettings.socialLinks}
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
        socialLinks={siteSettings.socialLinks}
      />
    </>
  );
}
