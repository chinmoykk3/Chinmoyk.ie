'use client';

import React from 'react';
import { ContentField, ContentStatus } from '@/content/schema';

export interface ContentProps {
  value?: ContentField | string | null;
  as?: React.ElementType;
  className?: string;
  fallback?: React.ReactNode;
  children?: React.ReactNode;
}

export function Content({
  value,
  as: Component = 'span',
  className,
  fallback = null,
  children,
}: ContentProps) {
  // If children passed, prioritize value or children
  if (!value && children) {
    return <Component className={className}>{children}</Component>;
  }

  if (!value) return fallback as React.ReactElement | null;

  if (typeof value === 'string') {
    if (!value.trim()) return fallback as React.ReactElement | null;
    return <Component className={className}>{value}</Component>;
  }

  if (value.status === 'confirmed' || value.status === 'draft') {
    if (!value.text.trim()) return fallback as React.ReactElement | null;
    return <Component className={className}>{value.text}</Component>;
  }

  // Placeholder status: renders nothing in production
  // Only shows quiet TODO chip when in dev AND NEXT_PUBLIC_DEBUG_CONTENT=1
  const showDebugChip =
    process.env.NODE_ENV !== 'production' &&
    process.env.NEXT_PUBLIC_DEBUG_CONTENT === '1';

  if (showDebugChip) {
    return (
      <span
        title={value.note || 'Placeholder content'}
        className="inline-block px-1.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-theme-muted/70 bg-theme-surface border border-theme-border/60 rounded select-none"
      >
        TODO
      </span>
    );
  }

  return fallback as React.ReactElement | null;
}
