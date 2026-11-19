'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useMotion } from '@/hooks/useMotion';
import { chapters, AccentKey } from '@/content/chapters';
import { Content } from '@/components/content/Content';
import { getContentText } from '@/content/schema';
import { cn } from '@/lib/utils';

export function ThreadSpine() {
  const { scrollProgress, motionEnabled } = useMotion();
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  const chapterList = chapters.visible ? chapters.visible() : chapters;
  const chapterCount = chapterList.length;

  useEffect(() => {
    const rawIndex = Math.min(chapterCount - 1, Math.floor(scrollProgress * chapterCount));
    setActiveChapterIndex(rawIndex);
  }, [scrollProgress, chapterCount]);

  const activeChapter = chapterList[activeChapterIndex] || chapterList[0];
  const nextChapter = chapterList[Math.min(chapterCount - 1, activeChapterIndex + 1)] || activeChapter;

  // Calculate boundary cross-fade ratio between current chapter and next chapter
  // As scrollProgress nears the end of activeChapter's slice, crossFade blends from 0 to 1
  const boundaryBlend = useMemo(() => {
    if (chapterCount <= 1) return 0;
    const sliceSize = 1 / chapterCount;
    const sliceStart = activeChapterIndex * sliceSize;
    const withinSlice = (scrollProgress - sliceStart) / sliceSize; // 0.0 -> 1.0 within this chapter
    // Blend during the final 30% of each chapter's section
    const blendZoneStart = 0.7;
    if (withinSlice < blendZoneStart) return 0;
    return Math.min(1, Math.max(0, (withinSlice - blendZoneStart) / (1 - blendZoneStart)));
  }, [scrollProgress, activeChapterIndex, chapterCount]);

  const scrollToChapter = (chapterId: string) => {
    const el = document.getElementById(chapterId);
    if (el) {
      el.scrollIntoView({ behavior: motionEnabled ? 'smooth' : 'auto' });
    }
  };

  const spineHeight = 380; // px
  const currentDrawY = Math.min(spineHeight, Math.max(0, scrollProgress * spineHeight));

  return (
    <>
      {/* ===================================================================
          1. MOBILE: Fixed Thin Top Progress Bar with Boundary Accent Fade
          =================================================================== */}
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-theme-border xl:hidden pointer-events-none overflow-hidden"
      >
        {/* Base active chapter bar */}
        <div
          data-accent={activeChapter.accentKey}
          className="h-full bg-chapter-accent transition-all duration-150 ease-out"
          style={{
            width: `${Math.min(100, Math.max(0, scrollProgress * 100))}%`,
            opacity: 1 - boundaryBlend * 0.7,
          }}
        />
        {/* Overlapping next chapter bar cross-fading in at boundary */}
        {boundaryBlend > 0 && (
          <div
            data-accent={nextChapter.accentKey}
            className="absolute top-0 left-0 h-full bg-chapter-accent transition-all duration-150 ease-out"
            style={{
              width: `${Math.min(100, Math.max(0, scrollProgress * 100))}%`,
              opacity: boundaryBlend,
            }}
          />
        )}
      </div>

      {/* ===================================================================
          2. DESKTOP: Fixed Left Narrative Thread Spine & Nodes (Continuous SVG)
          =================================================================== */}
      <nav
        aria-label="Documentary Spine Navigation"
        className="fixed left-6 top-1/2 -translate-y-1/2 z-30 hidden xl:flex flex-col items-center select-none"
      >
        <div className="relative" style={{ height: `${spineHeight}px`, width: '24px' }}>
          {/* Continuous SVG Line Track */}
          <svg
            width="24"
            height={spineHeight}
            viewBox={`0 0 24 ${spineHeight}`}
            className="absolute left-0 top-0 overflow-visible"
            aria-hidden="true"
          >
            {/* Background guide path */}
            <line
              x1="12"
              y1="4"
              x2="12"
              y2={spineHeight - 4}
              stroke="var(--color-border)"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* Continuous Gold Active SVG Thread */}
            <line
              x1="12"
              y1="4"
              x2="12"
              y2={Math.max(4, currentDrawY)}
              stroke="var(--color-thread)"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="transition-all duration-100 ease-out"
              style={{
                filter: 'drop-shadow(0 0 4px var(--color-gold))',
              }}
            />
          </svg>

          {/* Chapter Nodes positioned along the spine */}
          <div className="relative flex flex-col justify-between h-full py-1">
            {chapterList.map((ch, idx) => {
              const isActive = idx === activeChapterIndex;
              const isCompleted = idx < activeChapterIndex;
              const titleStr = getContentText(ch.title) || '';

              // Cross-fade accent at boundary: if active and blending, use next accent partially
              const nodeAccent =
                isActive && boundaryBlend > 0.5 ? nextChapter.accentKey : ch.accentKey;

              return (
                <button
                  key={ch.id}
                  type="button"
                  data-accent={nodeAccent}
                  onClick={() => scrollToChapter(ch.id)}
                  aria-label={`Jump to ${titleStr} (${ch.emotionalArc})`}
                  className="group relative flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-chapter-accent rounded-full -ml-[1px]"
                >
                  {/* Small Chapter Node */}
                  <div
                    className={cn(
                      'w-3 h-3 rounded-full border transition-all duration-300',
                      isActive
                        ? 'scale-125 bg-chapter-accent border-theme-bg ring-4 ring-chapter-accent/25'
                        : isCompleted
                          ? 'bg-chapter-accent border-chapter-accent'
                          : 'bg-theme-surface border-theme-border group-hover:border-theme-border-strong'
                    )}
                  />

                  {/* Hover Tooltip / Title Card */}
                  <div
                    className={cn(
                      'pointer-events-none absolute left-7 px-2.5 py-1 rounded-md text-[11px] font-mono tracking-wider whitespace-nowrap opacity-0 transition-opacity duration-200 border border-theme-border bg-theme-surface shadow-md',
                      'group-hover:opacity-100 group-focus-visible:opacity-100',
                      isActive && 'opacity-100 text-chapter-accent font-semibold'
                    )}
                  >
                    <span className="font-semibold">{ch.number === 0 ? 'P' : ch.number}: </span>
                    <Content value={ch.title} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}
