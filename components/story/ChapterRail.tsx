'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { chapters, Chapter } from '@/content/chapters';
import { useMotion } from '@/hooks/useMotion';
import { cn } from '@/lib/utils';

export function ChapterRail() {
  const { motionEnabled, lenis } = useMotion();
  const [activeChapterId, setActiveChapterId] = useState<string>(chapters[0].id);
  const railRef = useRef<HTMLDivElement>(null);

  // 1. Sync active chapter with scroll position using IntersectionObserver
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Synchronize initial active chapter if URL has a hash
    if (window.location.hash) {
      const hashId = window.location.hash.replace('#', '');
      if (chapters.some((ch) => ch.id === hashId)) {
        setActiveChapterId(hashId);
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveChapterId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-30% 0px -50% 0px',
        threshold: 0,
      }
    );

    chapters.forEach((ch) => {
      const el = document.getElementById(ch.id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // 2. Jump to chapter smoothly and update URL hash
  const jumpToChapter = useCallback(
    (chapter: Chapter) => {
      setActiveChapterId(chapter.id);

      // Update URL hash without causing a page jump
      if (typeof window !== 'undefined') {
        window.history.pushState(null, '', `#${chapter.id}`);
      }

      const el = document.getElementById(chapter.id);
      if (!el) return;

      if (lenis && motionEnabled) {
        lenis.scrollTo(el, { offset: -80, duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: motionEnabled ? 'smooth' : 'auto' });
      }
    },
    [lenis, motionEnabled]
  );

  // 3. Arrow-key keyboard chapter jumping when the rail has focus
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const currentIndex = chapters.findIndex((ch) => ch.id === activeChapterId);
      if (currentIndex === -1) return;

      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        const nextIndex = Math.min(chapters.length - 1, currentIndex + 1);
        jumpToChapter(chapters[nextIndex]);
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const prevIndex = Math.max(0, currentIndex - 1);
        jumpToChapter(chapters[prevIndex]);
      } else if (e.key === 'Home') {
        e.preventDefault();
        jumpToChapter(chapters[0]);
      } else if (e.key === 'End') {
        e.preventDefault();
        jumpToChapter(chapters[chapters.length - 1]);
      }
    },
    [activeChapterId, jumpToChapter]
  );

  return (
    <aside
      ref={railRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label="Story Mode Chapter Rail. Use arrow keys to jump between movements."
      className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden 2xl:flex flex-col gap-1.5 p-3 rounded-2xl bg-theme-surface/85 backdrop-blur-md border border-theme-border shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-chapter-accent select-none transition-colors"
    >
      <div className="text-[10px] font-mono uppercase tracking-widest text-theme-muted px-2 pb-1 border-b border-theme-border">
        Movements
      </div>

      <nav className="flex flex-col gap-1 mt-1">
        {chapters.map((ch, idx) => {
          const isActive = ch.id === activeChapterId;
          const formattedNum =
            typeof ch.number === 'number'
              ? ch.number === 0
                ? 'Prologue'
                : `0${ch.number}`
              : ch.number;

          return (
            <button
              key={ch.id}
              type="button"
              data-accent={ch.accentKey}
              onClick={() => jumpToChapter(ch)}
              aria-current={isActive ? 'step' : undefined}
              className={cn(
                'group flex items-center justify-between gap-3 px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-chapter-accent',
                isActive
                  ? 'bg-theme-surface-elevated text-chapter-accent font-semibold shadow-sm border border-theme-border'
                  : 'text-theme-muted hover:text-theme-text hover:bg-theme-surface-subtle'
              )}
            >
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    'w-1.5 h-1.5 rounded-full transition-all',
                    isActive
                      ? 'bg-chapter-accent scale-125'
                      : 'bg-theme-border-strong group-hover:bg-theme-text'
                  )}
                />
                <span>{formattedNum}</span>
              </div>

              <span className="text-[10px] text-theme-muted/80 tracking-wider uppercase font-sans">
                {ch.emotionalArc}
              </span>
            </button>
          );
        })}
      </nav>

      <div className="pt-2 border-t border-theme-border text-[9px] font-mono text-theme-muted/60 text-center">
        ↑ ↓ ARROW KEYS
      </div>
    </aside>
  );
}
