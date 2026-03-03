'use client';

import React from 'react';
import { Button } from 'pixel-retroui';

interface RetroNavButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export default function RetroNavButton({
  active = false,
  className = '',
  style,
  children,
  ...props
}: RetroNavButtonProps) {
  return (
    <Button
      className={`site-nav-btn retro-nav-button ${active ? 'active' : ''} ${className}`.trim()}
      bg={active ? 'var(--accent)' : '#3f434d'}
      textColor="#ffffff"
      shadow="transparent"
      borderColor={active ? 'var(--accent)' : '#3f434d'}
      style={{ borderImageSource: 'none', borderWidth: '1px', ...style }}
      {...props}
    >
      {children}
    </Button>
  );
}
