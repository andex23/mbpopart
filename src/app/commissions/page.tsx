import React from 'react';
import LegacySplitLayout from '@/components/LegacySplitLayout';
import LegacyThumbGallery from '@/components/LegacyThumbGallery';
import CommissionProcess from '@/components/CommissionProcess';
import PortableTextContent from '@/components/PortableTextContent';
import { getCommissionsPageContent, getSiteSettingsContent } from '@/lib/cms-content';

export default async function CommissionsPage() {
  const [commissionsPage, siteSettings] = await Promise.all([
    getCommissionsPageContent(),
    getSiteSettingsContent(),
  ]);

  const leftContent = (
    <>
      <PortableTextContent value={commissionsPage.introText} />
      <ul className="legacy-contact-lines">
        <li>Contact Michel to inquire about scheduling</li>
        <li>Phone / Text: {siteSettings.contactPhone}</li>
        <li>
          Email:{' '}
          <a href={`mailto:${siteSettings.contactEmail}`} className="text-[var(--link)] hover:underline">
            {siteSettings.contactEmail}
          </a>
        </li>
      </ul>
    </>
  );

  const exampleItems = commissionsPage.exampleItems;

  const rightContent = (
    <>
      <CommissionProcess
        title={commissionsPage.processTitle}
        subtitle={commissionsPage.processSubtitle}
        downPaymentLabel={commissionsPage.downPaymentLabel}
        downPaymentRule={commissionsPage.downPaymentRule}
        steps={commissionsPage.processSteps}
      />

      <section className="commission-examples-section" aria-label="Recent Commission Examples">
        <h2 className="legacy-subtitle commission-examples-heading">{commissionsPage.examplesTitle}</h2>
        {exampleItems.length > 0 ? (
          <LegacyThumbGallery items={exampleItems} imageFit="cover" mediaAspect="4 / 3" />
        ) : (
          <p className="commission-examples-empty">No commission examples have been published yet.</p>
        )}
      </section>
    </>
  );

  return (
    <section className="pb-8">
      <LegacySplitLayout
        title={commissionsPage.title}
        leftContent={leftContent}
        rightContent={rightContent}
        bubbleClassName="commission-page"
      />
    </section>
  );
}
