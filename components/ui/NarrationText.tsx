import React from 'react';
import { cn } from '@/lib/utils';

export interface NarrationTextProps extends React.HTMLAttributes<HTMLQuoteElement> {
  text: string;
  speaker?: string;
  note?: string;
  size?: 'sm' | 'md' | 'lg';
  isDraft?: boolean;
}

export function NarrationText({
  text,
  speaker,
  note,
  size = 'md',
  isDraft = false,
  className,
  ...props
}: NarrationTextProps) {
  const isTodo = text.startsWith('[TODO:');

  // Rule 3: Missing content renders nothing in production
  if (isTodo && process.env.NODE_ENV === 'production') {
    return null;
  }

  // Rule 4: In development, quiet tiny muted chip
  if (isTodo) {
    return (
      <aside
        aria-label="Content placeholder"
        className="my-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono text-theme-muted/60 border border-theme-border/40 bg-theme-surface/40 select-none"
      >
        <span>[TODO]</span>
      </aside>
    );
  }

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
      {text}
      <span className="select-none text-chapter-accent ml-1">&rdquo;</span>

      {(speaker || note) && (
        <footer className="mt-3 not-italic font-sans flex flex-wrap items-center gap-2 text-xs text-theme-muted font-normal">
          {speaker && <span className="font-medium text-theme-text">{speaker}</span>}
          {speaker && note && <span>&middot;</span>}
          {note && <span>{note}</span>}
        </footer>
      )}
    </blockquote>
  );
}
