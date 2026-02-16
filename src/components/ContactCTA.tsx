'use client';

import React from 'react';
import { AnimatedSection } from '@/components/AnimatedSection';
import { siteContent } from '@/data/artworks';
import { Phone, Mail } from 'lucide-react';
import Button from '@/components/Button';

export default function ContactCTA() {
  const { contact } = siteContent.bio;

  return (
    <section id="contact" className="py-20 lg:py-24 relative">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <AnimatedSection animation="fade-in-up">
            <p className="text-[var(--accent)] font-display text-sm tracking-widest mb-3">
              Get in Touch
            </p>
            <h2 className="font-display text-3xl lg:text-5xl text-[var(--text-primary)] mb-4">
              Interested in a Piece?
            </h2>
            <p className="text-[var(--text-secondary)] text-base lg:text-lg mb-10">
              Contact Michel about availability, commissions, and purchase inquiries.
            </p>
          </AnimatedSection>

          <AnimatedSection animation="fade-in-up" delay={200}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10">
              <a
                href={`tel:${contact.phone.replace(/[^\d+]/g, '')}`}
                className="flex items-center gap-3 glass-card rounded-xl px-6 py-4 hover-lift"
              >
                <Phone className="w-5 h-5 text-[var(--accent)]" />
                <span className="text-[var(--text-primary)] font-medium">{contact.phone}</span>
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-3 glass-card rounded-xl px-6 py-4 hover-lift"
              >
                <Mail className="w-5 h-5 text-[var(--accent)]" />
                <span className="text-[var(--text-primary)] font-medium">{contact.email}</span>
              </a>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-in-up" delay={400}>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button variant="primary" size="lg" href={`mailto:${contact.email}`}>
                Send an Email
              </Button>
              <Button variant="outline" size="lg" href="/gallery">
                Browse Gallery
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
