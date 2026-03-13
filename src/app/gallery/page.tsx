import React, { Suspense } from 'react';
import GalleryClientPage from '@/components/GalleryClientPage';
import { getPaintingsPageContent, getSiteSettingsContent } from '@/lib/cms-content';

export default async function GalleryPage() {
  const [pageContent, siteSettings] = await Promise.all([
    getPaintingsPageContent(),
    getSiteSettingsContent(),
  ]);

  return (
    <section className="pb-8">
      <Suspense fallback={<div className="legacy-bubble">Loading gallery...</div>}>
        <GalleryClientPage pageContent={pageContent} siteSettings={siteSettings} />
      </Suspense>
    </section>
  );
}
