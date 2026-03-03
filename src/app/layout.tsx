import type { Metadata } from 'next';
import { Suspense } from 'react';
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { getGlobalContent, getSiteSettingsContent } from '@/lib/cms-content';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettingsContent();
  const title = settings.seo?.metaTitle || 'Michel Balasis | Pop Art — Chicago';
  const description = settings.seo?.metaDescription ||
    'Original pop art paintings by Michel Balasis. Hand-painted acrylic on canvas, created in Chicago USA.';

  return {
    title,
    description,
    keywords: ['pop art', 'Chicago', 'Michel Balasis', 'paintings', 'acrylic', 'canvas', 'gallery'],
    openGraph: {
      title,
      description,
      type: 'website',
      images: settings.seo?.ogImageUrl ? [{ url: settings.seo.ogImageUrl }] : undefined,
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { navigation, siteSettings } = await getGlobalContent();

  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=Bebas+Neue&family=Source+Sans+3:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased">
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
      </body>
    </html>
  );
}
