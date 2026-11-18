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

  const sizeClasses = {
    sm: 'text-lg sm:text-xl',
    md: 'text-fluid-narration sm:text-2xl',
    lg: 'text-2xl sm:text-3xl lg:text-4xl',
  };

  return (
    <blockquote
      className={cn(
        'relative font-serif font-normal italic leading-relaxed transition-colors duration-200',
        sizeClasses[size],
        isTodo
          ? 'font-mono not-italic text-xs p-4 rounded-xl border border-theme-ember/40 bg-theme-ember/10 text-theme-text'
          : 'text-theme-text',
        className
      )}
      {...props}
    >
      <span className="select-none text-chapter-accent mr-1">&ldquo;</span>
      {text}
      <span className="select-none text-chapter-accent ml-1">&rdquo;</span>

      {(speaker || note || isDraft) && (
        <footer className="mt-3 not-italic font-sans flex flex-wrap items-center gap-2 text-xs text-theme-muted font-normal">
          {speaker && <span className="font-medium text-theme-text">{speaker}</span>}
          {speaker && note && <span>&middot;</span>}
          {note && <span>{note}</span>}
          {isDraft && (
            <span className="px-2 py-0.5 rounded text-[10px] font-mono tracking-wider bg-theme-ember/15 text-theme-ember uppercase">
              Draft Narration
            </span>
          )}
        </footer>
      )}
    </blockquote>
  );
}
