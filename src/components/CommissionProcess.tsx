'use client';

import React from 'react';
import { useMemo, useState } from 'react';
import type { CommissionProcessStepView, LegacyThumbItem } from '@/lib/content.types';
import LegacyThumbViewer from '@/components/LegacyThumbViewer';
import { resolveLegacyImageUrl } from '@/lib/legacy-image';

interface CommissionProcessProps {
  title?: string;
  subtitle?: string;
  downPaymentLabel?: string;
  downPaymentRule?: string;
  steps: CommissionProcessStepView[];
}

function EmptyStepThumb({
  label,
  isPayment,
  paymentText,
}: {
  label: string;
  isPayment?: boolean;
  paymentText?: string;
}) {
  if (isPayment) {
    return (
      <div className="process-placeholder process-placeholder-payment">
        <div className="process-payment-window">
          <span className="process-payment-text">{paymentText}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="process-placeholder">
      <span className="process-placeholder-label">{label}</span>
    </div>
  );
}

export default function CommissionProcess({
  title = 'The Commission Process',
  subtitle = 'Many commissions follow a structured creative process — from your reference photo to a finished original Michel painting.',
  downPaymentLabel = '50% Down Payment',
  downPaymentRule = 'Clients can make their 50% Down Payment via Zelle, Venmo, or Cash',
  steps,
}: CommissionProcessProps) {
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);

  const flowSteps = useMemo<CommissionProcessStepView[]>(() => {
    const normalized = steps.slice(0, 4);
    if (normalized.length === 0) {
      return [];
    }

    if (normalized.some((step) => /down\s*payment/i.test(step.label))) {
      return normalized;
    }

    const paymentStep: CommissionProcessStepView = {
      id: 'down-payment-step',
      label: downPaymentLabel,
      images: [],
      caption: downPaymentRule,
    };

    return [normalized[0], paymentStep, ...normalized.slice(1)];
  }, [downPaymentLabel, downPaymentRule, steps]);

  const viewerItems: LegacyThumbItem[] = useMemo(
    () =>
      flowSteps.flatMap((step) =>
        step.images.map((src) => ({
          imageUrl: src,
          thumbUrl: src,
          caption: step.label,
        })),
      ),
    [flowSteps],
  );

  const openViewer = (src: string) => {
    const index = viewerItems.findIndex((item) => item.imageUrl === src);
    if (index !== -1) {
      setViewerIndex(index);
      setViewerOpen(true);
    }
  };

  return (
    <>
      <div className="process-section">
        <h2 className="process-heading">{title}</h2>
        <p className="process-intro">
          {subtitle}
        </p>

        <ol className="process-timeline" style={{ '--process-cols': flowSteps.length } as React.CSSProperties}>
          {flowSteps.map((step, i) => {
            const isDownPayment = /down\s*payment/i.test(step.label);

            return (
              <li key={step.id} className="process-step">
                <span className="process-step-number">{i + 1}</span>

                <div className={`process-step-card${isDownPayment ? ' process-step-card-payment' : ''}`}>
                  {isDownPayment ? (
                    <EmptyStepThumb label={step.label} isPayment paymentText={downPaymentRule} />
                  ) : step.images.length > 0 ? (
                    <div className="process-step-images">
                      {step.images.map((src) => (
                        <button
                          key={src}
                          type="button"
                          className="process-step-image-trigger"
                          onClick={() => openViewer(src)}
                          aria-label={`Open ${step.label}`}
                        >
                          <div className="process-step-media">
                          <img
                            src={resolveLegacyImageUrl(src)}
                            alt={step.label}
                            className="process-step-img"
                            referrerPolicy="no-referrer"
                          />
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <EmptyStepThumb label={step.label} />
                  )}
                  <span className="process-step-label">{step.label}</span>
                  {step.caption && !isDownPayment ? (
                    <span className="process-step-caption">{step.caption}</span>
                  ) : null}
                </div>

                {i < flowSteps.length - 1 && (
                  <span className="process-arrow" aria-hidden="true" />
                )}
              </li>
            );
          })}
        </ol>
      </div>

      {viewerOpen ? (
        <LegacyThumbViewer
          items={viewerItems}
          currentIndex={viewerIndex}
          onClose={() => setViewerOpen(false)}
          onNavigate={setViewerIndex}
        />
      ) : null}
    </>
  );
}
