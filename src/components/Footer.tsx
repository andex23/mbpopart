import React from 'react';
import Image from 'next/image';
import { resolveLegacyImageUrl } from '@/lib/legacy-image';

interface FooterProps {
  contactEmail: string;
  contactPhone: string;
  footerText: string;
  footerPortraitUrl?: string;
}

export default function Footer({
  contactEmail,
  contactPhone,
  footerText,
  footerPortraitUrl = '/assets/mbface.png',
}: FooterProps) {

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <Image
          src={resolveLegacyImageUrl(footerPortraitUrl)}
          alt="Michel icon"
          width={128}
          height={128}
          className="site-footer-face"
          unoptimized
        />
        <div className="site-footer-content">
          <div className="site-footer-contact" role="contentinfo">
            <p className="site-footer-line site-footer-line-main">Contact Michel</p>
            <div className="site-footer-line-bottom">
              <p className="site-footer-line">Phone / Text : {contactPhone}</p>
              <p className="site-footer-copy">{footerText}</p>
            </div>
            <p className="site-footer-line">
              Email :{' '}
              <a className="site-footer-email" href={`mailto:${contactEmail}`}>{contactEmail}</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
