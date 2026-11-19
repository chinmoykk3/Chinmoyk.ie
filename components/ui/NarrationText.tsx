import React from 'react';
import { cn } from '@/lib/utils';
import { ContentField } from '@/content/schema';
import { Content } from '@/components/content/Content';

export interface NarrationTextProps extends React.HTMLAttributes<HTMLQuoteElement> {
  value?: ContentField;
  text?: string;
  speaker?: string;
  note?: string;
  size?: 'sm' | 'md' | 'lg';
  isDraft?: boolean;
}

export function NarrationText({
  value,
  text,
  speaker,
  note,
  size = 'md',
  isDraft = false,
  className,
  ...props
}: NarrationTextProps) {
  const contentValue = value || (text ? { text, status: (text.startsWith('[TODO:') ? 'placeholder' : 'draft') as any, note } : null);

  if (!contentValue) return null;

  // Placeholder status: renders nothing in production
  if (contentValue.status === 'placeholder') {
    const showDebug =
      process.env.NODE_ENV !== 'production' &&
      process.env.NEXT_PUBLIC_DEBUG_CONTENT === '1';

    if (showDebug) {
      return (
        <aside
          aria-label="Content placeholder"
          className="my-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono text-theme-muted/60 border border-theme-border/40 bg-theme-surface/40 select-none"
        >
          <span>TODO</span>
        </aside>
      );
    }
    return null;
  }

  const rawText = contentValue.text.trim();
  if (!rawText) return null;

  const sizeClasses = {
    sm: 'text-lg sm:text-xl',
    md: 'text-fluid-narration sm:text-2xl',
    lg: 'text-2xl sm:text-3xl lg:text-4xl',
  };

  return (
    <blockquote
      className={cn(
        'relative font-serif font-normal italic leading-[1.35] text-theme-text transition-colors duration-200',
        sizeClasses[size],
        className
      )}
      {...props}
    >
      <span className="select-none text-chapter-accent mr-1">&ldquo;</span>
      {rawText}
      <span className="select-none text-chapter-accent ml-1">&rdquo;</span>

      {(speaker || note || contentValue.note) && (
        <footer className="mt-3 not-italic font-sans flex flex-wrap items-center gap-2 text-xs text-theme-muted font-normal">
          {speaker && <cite className="font-medium text-theme-text">{speaker}</cite>}
          {(note || contentValue.note) && (
            <span className="text-theme-muted/70">{note || contentValue.note}</span>
          )}
        </footer>
      )}
    </blockquote>
  );
}
