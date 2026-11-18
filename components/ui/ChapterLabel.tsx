import React from 'react';
import { cn } from '@/lib/utils';

export interface ChapterLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  chapter: number | string;
  timecode?: string;
  arc?: string;
  variant?: 'subtle' | 'badge' | 'line';
}

export function ChapterLabel({
  chapter,
  timecode = '00:00:00',
  arc,
  variant = 'badge',
  className,
  ...props
}: ChapterLabelProps) {
  const formattedChapter =
    typeof chapter === 'number'
      ? chapter === 0
        ? 'PROLOGUE'
        : `CHAPTER ${String(chapter).padStart(2, '0')}`
      : String(chapter).toUpperCase();

  if (variant === 'line') {
    return (
      <div
        className={cn(
          'flex items-center gap-3 font-mono text-xs tracking-widest text-theme-muted',
          className
        )}
        {...props}
      >
        <span className="w-8 h-[1px] bg-chapter-accent" />
        <span className="text-chapter-accent font-semibold">{formattedChapter}</span>
        <span>&middot;</span>
        <span className="tabular-nums">{timecode}</span>
        {arc && (
          <>
            <span>&middot;</span>
            <span className="uppercase text-theme-text font-medium">{arc}</span>
          </>
        )}
      </div>
    );
  }

  if (variant === 'subtle') {
    return (
      <div
        className={cn(
          'inline-flex items-center gap-2 font-mono text-xs tracking-wider text-theme-muted',
          className
        )}
        {...props}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-chapter-accent" />
        <span className="font-semibold text-theme-text">{formattedChapter}</span>
        <span>&middot;</span>
        <span className="tabular-nums opacity-80">{timecode}</span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 px-3 py-1 rounded-full font-mono text-xs tracking-wider border border-theme-border bg-theme-surface shadow-sm backdrop-blur-sm',
        className
      )}
      {...props}
    >
      <span className="w-2 h-2 rounded-full bg-chapter-accent animate-pulse" />
      <span className="font-semibold text-chapter-accent">{formattedChapter}</span>
      <span className="text-theme-border-strong">&middot;</span>
      <span className="text-theme-muted tabular-nums">{timecode}</span>
      {arc && (
        <>
          <span className="text-theme-border-strong">&middot;</span>
          <span className="text-theme-text font-medium uppercase">{arc}</span>
        </>
      )}
    </div>
  );
}
