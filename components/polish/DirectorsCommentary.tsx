'use client';

import React from 'react';
import { usePolish } from './PolishContext';
import { getCommentaryFor, hasAnyCommentary } from '@/content/commentary';
import { Film, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export function CommentaryToggle({ className }: { className?: string }) {
  const { commentaryEnabled, toggleCommentary, hasCommentary } = usePolish();

  if (!hasCommentary) return null;

  return (
    <button
      type="button"
      onClick={toggleCommentary}
      aria-pressed={commentaryEnabled}
      aria-label="Toggle Director's Commentary behind-the-scenes annotations"
      title="Director's Commentary"
      className={cn(
        'relative inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-mono transition-all',
        'border focus:outline-none focus-visible:ring-2 focus-visible:ring-chapter-accent',
        commentaryEnabled
          ? 'bg-theme-gold/15 border-theme-gold text-theme-gold font-semibold shadow-xs'
          : 'bg-theme-surface border-theme-border text-theme-muted hover:text-theme-text hover:bg-theme-surface-elevated',
        className
      )}
    >
      <Film className="w-3.5 h-3.5 shrink-0" />
      <span className="hidden sm:inline">Commentary</span>
      {commentaryEnabled && (
        <span className="w-1.5 h-1.5 rounded-full bg-theme-gold animate-pulse" />
      )}
    </button>
  );
}

export function DirectorsCommentary({ id, className }: { id: string; className?: string }) {
  const { commentaryEnabled } = usePolish();
  const item = getCommentaryFor(id);

  if (!commentaryEnabled || !item) return null;

  return (
    <div
      role="note"
      tabIndex={0}
      aria-label={`Director's note: ${item.category}`}
      className={cn(
        'relative my-4 p-4 rounded-xl border border-theme-gold/40 shadow-lg',
        'bg-theme-surface-elevated/95 backdrop-blur-md transition-all duration-300',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-gold',
        className
      )}
    >
      {/* Decorative Golden Connector Hook */}
      <div className="absolute -left-3 top-4 hidden sm:flex items-center" aria-hidden="true">
        <span className="w-3 h-[1px] bg-theme-gold" />
        <span className="w-1.5 h-1.5 rounded-full bg-theme-gold -ml-0.5" />
      </div>

      <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
        <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-theme-gold font-semibold">
          <Film className="w-3 h-3" />
          <span>DIRECTOR&apos;S COMMENTARY · {item.category}</span>
        </div>

        {item.isPlaceholder && (
          <span className="text-[9px] font-mono text-theme-ember flex items-center gap-1">
            <HelpCircle className="w-3 h-3" />
            [Pending Author Note]
          </span>
        )}
      </div>

      <p className="font-serif italic text-xs sm:text-sm text-theme-text leading-relaxed">
        &ldquo;{item.note}&rdquo;
      </p>
    </div>
  );
}
