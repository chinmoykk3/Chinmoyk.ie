import React from 'react';
import { cn } from '@/lib/utils';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    'default' | 'accent' | 'outline' | 'status' | 'gold' | 'rose' | 'azure' | 'iris' | 'ember';
  size?: 'sm' | 'md';
  children: React.ReactNode;
}

export function Tag({ variant = 'default', size = 'md', className, children, ...props }: TagProps) {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-1 text-xs',
  };

  const variantClasses = {
    default: 'bg-theme-surface-elevated text-theme-muted border border-theme-border font-mono',
    accent:
      'bg-chapter-accent/15 text-chapter-accent border border-chapter-accent/30 font-mono font-medium',
    gold: 'bg-theme-gold/15 text-theme-gold border border-theme-gold/30 font-mono font-medium',
    rose: 'bg-theme-rose/15 text-theme-rose border border-theme-rose/30 font-mono font-medium',
    azure: 'bg-theme-azure/15 text-theme-azure border border-theme-azure/30 font-mono font-medium',
    iris: 'bg-theme-iris/15 text-theme-iris border border-theme-iris/30 font-mono font-medium',
    ember: 'bg-theme-ember/15 text-theme-ember border border-theme-ember/30 font-mono font-medium',
    outline: 'bg-transparent text-theme-text border border-theme-border font-mono',
    status:
      'bg-theme-surface text-theme-text border border-theme-border-strong font-mono uppercase tracking-wider',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md font-mono tracking-wide transition-colors duration-200 select-none',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
