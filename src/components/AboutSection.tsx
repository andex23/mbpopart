'use client';

import React from 'react';
import { AnimatedSection } from '@/components/AnimatedSection';
import Button from '@/components/Button';
import { siteContent } from '@/data/artworks';
import MichelTalkBubble from '@/components/MichelTalkBubble';

export default function AboutSection() {
  const [firstParagraph] = siteContent.bio.bioText.split('\n\n');

  return (
    <section className="py-20 lg:py-24 relative overflow-hidden bg-[var(--bg-secondary)]">
      <div
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            'linear-gradient(120deg, rgba(255,47,146,0.18), transparent 34%), radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 0)',
          backgroundSize: 'auto, 12px 12px',
        }}
      />

      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        <AnimatedSection animation="fade-in-up">
          <MichelTalkBubble
            quote="About the artist"
            title="The Story Behind The Work"
          >
            <p className="text-sm lg:text-base leading-relaxed">
              {firstParagraph}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant="primary" size="md" href="/bio" showArrow>
                Read Full Bio
              </Button>
              <Button
                variant="outline"
                size="md"
                href="/news"
                className="!border-[#2d4a99] !text-[#122150] hover:!text-[#0f5faf] hover:!border-[#0f5faf]"
              >
                Press & News
              </Button>
            </div>
          </MichelTalkBubble>
        </AnimatedSection>
      </div>
    </section>
  );
}
