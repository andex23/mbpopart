import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glow';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  showArrow?: boolean;
  fullWidth?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'right',
  showArrow = false,
  fullWidth = false,
  className = '',
  type = 'button',
}) => {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm gap-1.5',
    md: 'px-6 py-3 text-sm gap-2',
    lg: 'px-8 py-3.5 text-base gap-2',
    xl: 'px-10 py-4 text-base gap-2.5',
  };

  const variantClasses = {
    primary: `
      relative overflow-hidden
      bg-[var(--accent)]
      hover:bg-[var(--accent-hover)]
      text-black font-medium
      shadow-lg shadow-yellow-500/25
      hover:shadow-xl hover:shadow-yellow-500/30
      hover:-translate-y-0.5
      active:translate-y-0 active:shadow-md
      before:absolute before:inset-0
      before:bg-white/10
      before:-translate-x-full before:hover:translate-x-full
      before:transition-transform before:duration-700
    `,
    secondary: `
      relative overflow-hidden
      bg-[var(--bg-tertiary)]
      hover:bg-[var(--border-color)]
      text-[var(--text-primary)] font-medium
      shadow-lg shadow-black/20
      hover:shadow-xl hover:shadow-black/25
      hover:-translate-y-0.5
      active:translate-y-0 active:shadow-md
    `,
    outline: `
      relative overflow-hidden
      bg-transparent
      border-2 border-[var(--border-color)]
      hover:border-[var(--accent)]
      text-[var(--text-primary)]
      hover:text-[var(--accent)]
      font-medium
      hover:-translate-y-0.5
      hover:shadow-lg hover:shadow-yellow-500/10
      active:translate-y-0
    `,
    ghost: `
      bg-transparent
      hover:bg-[var(--bg-secondary)]
      text-[var(--text-secondary)]
      hover:text-[var(--text-primary)]
      font-medium
    `,
    glow: `
      relative overflow-hidden
      bg-[var(--accent)]
      text-black font-medium
      shadow-[0_0_20px_rgba(255,215,0,0.5)]
      hover:shadow-[0_0_30px_rgba(255,215,0,0.7),0_0_60px_rgba(255,215,0,0.4)]
      hover:-translate-y-0.5
      hover:bg-[var(--accent-hover)]
      active:translate-y-0
      transition-all duration-300
    `,
  };

  const baseClasses = `
    inline-flex items-center justify-center
    rounded-xl
    transition-all duration-300 ease-out
    focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)]
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none
    cursor-pointer
    ${fullWidth ? 'w-full' : ''}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${className}
  `;

  const LoadingSpinner = () => (
    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  );

  const content = (
    <>
      {loading && <LoadingSpinner />}
      {!loading && icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
      <span className="relative z-10">{children}</span>
      {!loading && icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
      {!loading && showArrow && !icon && (
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={`group ${baseClasses}`}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled || loading} className={`group ${baseClasses}`}>
      {content}
    </button>
  );
};

export default Button;
