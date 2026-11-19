'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useMotion } from '@/hooks/useMotion';
import { chapters, AccentKey } from '@/content/chapters';
import { cn } from '@/lib/utils';

export function ThreadSpine() {
  const { scrollProgress, motionEnabled } = useMotion();
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  // Map progress to chapter indices
  const chapterCount = chapters.length;
  useEffect(() => {
    const rawIndex = Math.min(chapterCount - 1, Math.floor(scrollProgress * chapterCount));
    setActiveChapterIndex(rawIndex);
  }, [scrollProgress, chapterCount]);

  const activeChapter = chapters[activeChapterIndex] || chapters[0];
  const nextChapter = chapters[Math.min(chapterCount - 1, activeChapterIndex + 1)];

  // Scroll to chapter node smoothly
  const scrollToChapter = (chapterId: string) => {
    const el = document.getElementById(chapterId);
    if (el) {
      el.scrollIntoView({ behavior: motionEnabled ? 'smooth' : 'auto' });
    }
  };

  return (
    <>
      {/* ===================================================================
          1. MOBILE: Fixed Thin Top Progress Bar
          =================================================================== */}
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-theme-border xl:hidden pointer-events-none"
      >
        <div
          data-accent={activeChapter.accentKey}
          className="h-full bg-chapter-accent transition-all duration-150 ease-out"
          style={{ width: `${Math.min(100, Math.max(0, scrollProgress * 100))}%` }}
        />
      </div>

      {/* ===================================================================
          2. DESKTOP: Fixed Left Narrative Thread Spine & Nodes
          =================================================================== */}
      <nav
        aria-label="Documentary Spine Navigation"
        className="fixed left-6 top-1/2 -translate-y-1/2 z-30 hidden xl:flex flex-col items-center select-none"
      >
        {/* Background Guide Line */}
        <div className="absolute top-0 bottom-0 w-[2px] bg-theme-border rounded-full" />

        {/* Drawn Active SVG Progress Spine */}
        <div
          data-accent={activeChapter.accentKey}
          className="absolute top-0 w-[2px] bg-chapter-accent rounded-full transition-all duration-200"
          style={{
            height: `${Math.min(100, Math.max(0, scrollProgress * 100))}%`,
          }}
        />

        {/* Chapter Nodes */}
        <div className="relative flex flex-col justify-between h-96 py-2">
          {chapters.map((ch, idx) => {
            const isActive = idx === activeChapterIndex;
            const isCompleted = idx < activeChapterIndex;

            return (
              <button
                key={ch.id}
                type="button"
                data-accent={ch.accentKey}
                onClick={() => scrollToChapter(ch.id)}
                aria-label={`Jump to ${ch.title} (${ch.emotionalArc})`}
                className="group relative flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-chapter-accent rounded-full"
              >
                {/* Node Pill Indicator */}
                <div
                  className={cn(
                    'w-3 h-3 rounded-full border transition-all duration-300',
                    isActive
                      ? 'scale-125 bg-chapter-accent border-theme-bg ring-4 ring-chapter-accent/20'
                      : isCompleted
                        ? 'bg-chapter-accent border-chapter-accent'
                        : 'bg-theme-surface border-theme-border group-hover:border-theme-border-strong'
                  )}
                />

                {/* Hover Tooltip / Canonical Chapter Title */}
                <div
                  className={cn(
                    'pointer-events-none absolute left-6 px-2.5 py-1 rounded-md text-[11px] font-mono tracking-wider whitespace-nowrap opacity-0 transition-opacity duration-200 border border-theme-border bg-theme-surface shadow-md',
                    'group-hover:opacity-100 group-focus-visible:opacity-100',
                    isActive && 'opacity-100 text-chapter-accent font-semibold'
                  )}
                >
                  <span className="font-semibold">{ch.number === 0 ? 'P' : ch.number}: </span>
                  <span>{ch.title}</span>
                </div>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
