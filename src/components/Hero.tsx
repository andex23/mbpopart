'use client';

import React from 'react';
import Image from 'next/image';
import Button from '@/components/Button';
import { AnimatedSection } from '@/components/AnimatedSection';
import { getFeaturedWorks } from '@/data/artworks';

export default function Hero() {
  const featured = getFeaturedWorks();
  const heroImage = featured[0];

  return (
    <section className="relative w-full h-screen lg:h-[85vh] min-h-[600px] overflow-hidden">
      {/* Background Artwork */}
      {heroImage && (
        <div className="absolute inset-0">
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.paintingName}
            fill
            className="object-cover"
            priority
            sizes="100vw"
            unoptimized
          />
        </div>
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/35 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-primary)]/80 via-[var(--pop-pink)]/15 to-[var(--pop-blue)]/20" />
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.35) 1px, transparent 0)',
          backgroundSize: '9px 9px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex items-end pb-20 lg:pb-24">
        <div className="max-w-[1280px] mx-auto px-6 w-full">
          <AnimatedSection animation="fade-in-up" delay={200}>
            <p className="text-[var(--accent)] font-display text-lg lg:text-xl tracking-[0.2em] mb-4">
              Pop Art &middot; Chicago
            </p>
          </AnimatedSection>

          <AnimatedSection animation="fade-in-up" delay={400}>
            <h1 className="font-display text-5xl md:text-6xl lg:text-8xl xl:text-9xl text-white leading-[0.9] mb-6"
              style={{ textShadow: '0 4px 30px rgba(0,0,0,0.5)' }}
            >
              Michel
              <br />
              Balasis
            </h1>
          </AnimatedSection>

          <AnimatedSection animation="fade-in-up" delay={600}>
            <div className="talk-bubble max-w-2xl">
              <p className="talk-bubble-quote">Michel says</p>
              <p className="text-[#203777] text-base lg:text-lg mt-3">
                Original hand-painted acrylic on canvas. Bold graphic imagery rooted in comic Pop Art of the 60&apos;s and 70&apos;s.
              </p>
              <div className="mt-5 flex flex-col sm:flex-row gap-3">
                <Button variant="glow" size="md" href="/gallery" showArrow>
                  View Gallery
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  href="/bio"
                  className="!border-[#2d4a99] !text-[#122150] hover:!text-[#0f5faf] hover:!border-[#0f5faf]"
                >
                  Artist Bio
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
