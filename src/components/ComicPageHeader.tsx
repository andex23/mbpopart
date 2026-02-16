import React from 'react';

interface ComicPageHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
  bubble?: string;
}

export default function ComicPageHeader({
  eyebrow,
  title,
  description,
  bubble,
}: ComicPageHeaderProps) {
  return (
    <section className="pt-24 lg:pt-28 pb-10 lg:pb-12 relative overflow-hidden bg-[var(--bg-secondary)]">
      <div
        className="absolute inset-0 opacity-[0.24]"
        style={{
          backgroundImage:
            'linear-gradient(130deg, rgba(255,47,146,0.18), transparent 36%), linear-gradient(300deg, rgba(31,215,255,0.16), transparent 42%), radial-gradient(circle at 2px 2px, rgba(255,255,255,0.28) 1.5px, transparent 0)',
          backgroundSize: 'auto, auto, 12px 12px',
        }}
      />
      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        <p className="font-display text-xs lg:text-sm tracking-[0.25em] text-[var(--accent)] mb-3">
          {eyebrow}
        </p>
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-[var(--text-primary)] leading-[0.92]">
          {title}
        </h1>
        <p className="mt-4 text-[var(--text-secondary)] max-w-2xl text-sm md:text-base leading-relaxed">
          {description}
        </p>
        {bubble && (
          <div className="mt-6 inline-flex speech-bubble px-5 py-2.5">
            <span className="text-[11px] md:text-xs uppercase tracking-[0.15em] text-[var(--text-primary)]">
              {bubble}
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
