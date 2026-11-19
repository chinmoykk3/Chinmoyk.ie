'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { AccentKey } from '@/content/chapters';
import { ContentField } from '@/content/schema';
import { Content } from '@/components/content/Content';

export interface ChapterTitleCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  number: number | string;
  title: ContentField | string;
  subtitle?: ContentField | string;
  arc?: string;
  accentKey: AccentKey;
  baseTimeSeconds?: number;
}

export function ChapterTitleCard({
  number,
  title,
  subtitle,
  arc,
  accentKey,
  className,
  ...props
}: ChapterTitleCardProps) {
  const formattedNum =
    typeof number === 'number'
      ? number === 0
        ? 'PROLOGUE'
        : `CHAPTER 0${number}`
      : String(number).toUpperCase();

  return (
    <header
      data-accent={accentKey}
      className={cn('relative max-w-4xl text-left space-y-4', className)}
      {...props}
    >
      {/* Chapter identity label - only ONE label per chapter (Rule 2) */}
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs uppercase tracking-widest text-chapter-accent font-medium">
          {formattedNum}
        </span>
        {arc && (
          <>
            <span className="text-theme-muted/40 font-mono text-xs" aria-hidden="true">
              ·
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-theme-muted">
              {arc}
            </span>
          </>
        )}
      </div>

      {/* Main Chapter Title */}
      <h2 className="text-fluid-h1 font-serif font-normal tracking-tight text-theme-text leading-[1.08]">
        <Content value={title} />
      </h2>

      {/* Subtitle / Premise */}
      {subtitle && (
        <p className="text-fluid-narration font-serif italic text-theme-muted leading-[1.35] max-w-[34ch]">
          <Content value={subtitle} />
        </p>
      )}
    </header>
  );
}
