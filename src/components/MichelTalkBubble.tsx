import React from 'react';
import Image from 'next/image';

interface MichelTalkBubbleProps {
  quote: string;
  title?: string;
  children: React.ReactNode;
}

export default function MichelTalkBubble({
  quote,
  title,
  children,
}: MichelTalkBubbleProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[170px_1fr] gap-5 lg:gap-6 items-start">
      <aside className="flex lg:block items-center gap-3 lg:gap-0">
        <div className="michel-avatar-frame">
          <div className="relative aspect-square">
            <Image
              src="https://mbpopart.com/assets/BioPhotos/Prof-Balasis.gif"
              alt="Michel Balasis"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 96px, 170px"
              unoptimized
            />
          </div>
        </div>
        <p className="michel-avatar-label lg:mt-2">Michel says</p>
      </aside>

      <article className="talk-bubble">
        <p className="talk-bubble-quote">{quote}</p>
        {title && (
          <h2 className="font-display text-2xl md:text-3xl text-[#122150] mt-3 mb-3">
            {title}
          </h2>
        )}
        <div className="talk-bubble-content">{children}</div>
      </article>
    </div>
  );
}
