interface ConstructionNoticeProps {
  contactEmail: string;
  contactPhone?: string;
  socialLinks?: Array<{ label: string; url: string }>;
  fullPage?: boolean;
}

export default function ConstructionNotice({
  contactEmail,
  contactPhone,
  socialLinks = [],
  fullPage = false,
}: ConstructionNoticeProps) {
  return (
    <section
      className={`site-construction-banner${fullPage ? ' site-construction-banner-full' : ''}`}
      aria-label="Website under construction notice"
    >
      <div className="site-construction-panel">
        <div className="site-construction-grid">
          <div className="site-construction-copy">
            <p className="site-construction-kicker">Temporary site update</p>
            <h2 className="site-construction-title">Website Under Construction</h2>
            <p className="site-construction-text">
              Michel is refreshing the site and reorganizing artwork pages. Please contact Michel directly
              for purchases, commissions, or questions while the full update is being finished.
            </p>
          </div>

          <div className="site-construction-contact">
            <a href={`mailto:${contactEmail}`} className="site-construction-link">
              Email: {contactEmail}
            </a>
            {contactPhone ? <span>Phone / Text: {contactPhone}</span> : null}
            {socialLinks.length > 0 ? (
              <nav className="site-construction-socials" aria-label="Social links">
                {socialLinks.map((link) => (
                  <a
                    key={`${link.label}-${link.url}`}
                    className="site-construction-social-link"
                    href={link.url}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
