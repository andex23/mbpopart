import React from 'react';
import Image from 'next/image';
import { siteContent } from '@/data/artworks';

export default function Footer() {
  const { contact } = siteContent.bio;

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <Image
          src="https://mbpopart.com/assets/mbface.png"
          alt="Michel icon"
          width={128}
          height={128}
          className="site-footer-face"
          unoptimized
        />
        <p className="site-footer-line">
          <span className="site-footer-label">Contact Michel:</span> Phone {contact.phone} Email:{' '}
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <span className="site-footer-copy">&copy; 2020 Michel Balasis</span>
        </p>
      </div>
    </footer>
  );
}
