'use client';

import { usePathname } from 'next/navigation';

interface ConstructionNoticeProps {
  contactEmail: string;
  contactPhone?: string;
}

export default function ConstructionNotice({
  contactEmail,
  contactPhone,
}: ConstructionNoticeProps) {
  const pathname = usePathname();

  if (pathname.startsWith('/studio')) {
    return null;
  }

  return (
    <section className="site-construction-banner" aria-label="Website under construction notice">
      <div className="site-construction-panel">
        <div className="site-construction-grid">
          <div className="site-construction-copy">
            <p className="site-construction-kicker">Temporary site update</p>
            <h2 className="site-construction-title">Website Under Construction</h2>
            <p className="site-construction-text">
              We&apos;re refreshing the site and reorganizing artwork pages. The current content is still
              available while the full update is being finished.
            </p>
          </div>

          <div className="site-construction-contact">
            <span className="site-construction-contact-label">Questions, purchases, or commissions</span>
            <a href={`mailto:${contactEmail}`} className="site-construction-link">
              Email: {contactEmail}
            </a>
            {contactPhone ? <span>Phone / Text: {contactPhone}</span> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
