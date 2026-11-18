import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  const variantClasses = {
    primary:
      'bg-theme-text text-theme-bg font-semibold hover:opacity-90 shadow-sm border border-transparent',
    secondary:
      'bg-theme-surface hover:bg-theme-surface-elevated text-theme-text font-medium border border-theme-border shadow-sm',
    outline:
      'bg-transparent hover:bg-theme-surface text-theme-text border border-theme-border font-medium',
    ghost:
      'bg-transparent hover:bg-theme-surface text-theme-muted hover:text-theme-text font-medium',
    accent:
      'bg-chapter-accent text-theme-bg font-semibold hover:opacity-95 shadow-md border border-transparent',
  };

  return (
    <button
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full tracking-wide transition-all duration-200',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-chapter-accent focus-visible:ring-offset-2 focus-visible:ring-offset-theme-bg',
        'disabled:opacity-50 disabled:pointer-events-none cursor-pointer',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
