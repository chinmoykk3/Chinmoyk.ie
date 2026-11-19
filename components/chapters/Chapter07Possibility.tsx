'use client';

import React from 'react';
import { Chapter } from '@/content/chapters';
import { NarrationText } from '@/components/ui/NarrationText';
import { cn } from '@/lib/utils';

export interface Chapter07PossibilityProps {
  chapter: Chapter;
}

export function Chapter07Possibility({ chapter }: Chapter07PossibilityProps) {
  const verifiedNarration = chapter.narration[0]?.text || '';
  const isDev = process.env.NODE_ENV !== 'production';

  return (
    <article
      id={chapter.id}
      data-chapter="7"
      data-accent="ember"
      aria-labelledby="heading-chapter-07"
      className="relative w-full border-t border-theme-border/60 transition-colors duration-300"
    >
      {/* Full-bleed Scene: Scene, Not Card (Rule 1) */}
      <div className="w-full min-h-[90svh] flex flex-col justify-between py-16 sm:py-24 px-6 sm:px-12 relative overflow-hidden">
        {/* Ambient wash (Token-based) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 bg-chapter-wash"
        />

        {/* Top: Chapter Identity (Rule 2: One label only) */}
        <header className="relative z-10 max-w-4xl mx-auto w-full flex items-baseline justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-chapter-accent font-medium">
              CHAPTER 07
            </span>
            <span className="text-theme-muted/40 font-mono text-xs" aria-hidden="true">
              ·
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-theme-muted">
              {chapter.title}
            </span>
          </div>
        </header>

        {/* Center: Main Scene Content with generous negative space (Rule 7) */}
        <div className="relative z-10 max-w-3xl mx-auto w-full my-auto py-12 space-y-8">
          <div className="space-y-3">
            <h2
              id="heading-chapter-07"
              className="text-fluid-h1 font-serif font-normal text-theme-text tracking-[-0.01em] leading-[1.1]"
            >
              {chapter.title}
            </h2>

            {chapter.subtitle && (
              <p className="text-fluid-narration font-serif italic text-theme-muted leading-[1.35] max-w-2xl">
                {chapter.subtitle}
              </p>
            )}
          </div>

          {/* Exact verified draft narration (Rule 3) */}
          <div className="pt-4">
            <NarrationText text={verifiedNarration} size="lg" />
          </div>

          {/* Quiet placeholder chip in dev only (Rule 4) */}
          {isDev && chapter.narration[1]?.text && (
            <aside
              aria-label="Development status"
              className="pt-2 text-[10px] font-mono text-theme-muted/50"
            >
              <span className="px-2 py-0.5 rounded border border-theme-border/40 bg-theme-surface/40">
                [TODO: future research hypotheses]
              </span>
            </aside>
          )}
        </div>

        {/* Bottom: Narrative Bridge leading into Epilogue (Rule 5: Quiet first-person line) */}
        {chapter.bridgeToNext && (
          <footer className="relative z-10 max-w-3xl mx-auto w-full pt-4">
            <p className="text-sm sm:text-base font-serif italic text-theme-muted text-center sm:text-left">
              &ldquo;{chapter.bridgeToNext}&rdquo;
            </p>
          </footer>
        )}
      </div>
    </article>
  );
}
