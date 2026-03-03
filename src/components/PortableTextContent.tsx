import React from 'react';
import { PortableText } from '@portabletext/react';
import type { PortableTextComponents } from '@portabletext/react';
import type { PortableTextValue } from '@/lib/sanity.types';

interface PortableTextContentProps {
  value?: PortableTextValue;
  className?: string;
}

const portableComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
  },
};

export default function PortableTextContent({ value, className }: PortableTextContentProps) {
  if (!value || value.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      <PortableText value={value} components={portableComponents} />
    </div>
  );
}
