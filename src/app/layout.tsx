import type { Metadata } from 'next';
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Michel Balasis | Pop Art — Chicago',
  description:
    'Original pop art paintings by Michel Balasis. Hand-painted acrylic on canvas, created in Chicago USA.',
  keywords: ['pop art', 'Chicago', 'Michel Balasis', 'paintings', 'acrylic', 'canvas', 'gallery'],
  openGraph: {
    title: 'Michel Balasis | Pop Art — Chicago',
    description: 'Original pop art paintings by Michel Balasis.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=Bebas+Neue&family=Source+Sans+3:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased">
        <Navigation />
        <main className="site-shell">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
