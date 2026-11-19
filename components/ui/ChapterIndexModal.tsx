'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { X, ChevronRight } from 'lucide-react';
import { chapters } from '@/content/chapters';
import { Content } from '@/components/content/Content';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { useMotion } from '@/hooks/useMotion';
import { cn } from '@/lib/utils';

export interface ChapterIndexModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChapterIndexModal({ isOpen, onClose }: ChapterIndexModalProps) {
  const router = useRouter();
  const pathname = usePathname();
  const trapRef = useFocusTrap(isOpen, onClose);
  const { motionEnabled, scrollProgress } = useMotion();

  const chapterList = chapters.visible ? chapters.visible() : chapters;
  const activeChapterIndex = Math.min(
    chapterList.length - 1,
    Math.floor(scrollProgress * chapterList.length)
  );

  // Prevent background scrolling while modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSelectChapter = (chapterId: string) => {
    onClose();

    if (pathname === '/') {
      const el = document.getElementById(chapterId);
      if (el) {
        el.scrollIntoView({ behavior: motionEnabled ? 'smooth' : 'auto' });
        window.history.pushState(null, '', `#${chapterId}`);
      }
    } else {
      router.push(`/#${chapterId}`);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Chapter Index"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={trapRef}
        className={cn(
          'relative w-full max-w-xl max-h-[85vh] flex flex-col',
          'rounded-2xl bg-theme-surface border border-theme-border shadow-2xl',
          'overflow-hidden animate-in fade-in zoom-in-95 duration-200'
        )}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-theme-border bg-theme-surface-elevated/40">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-theme-muted block">
              Documentary Architecture
            </span>
            <h2 className="font-serif font-bold text-xl text-theme-text">
              Chapter Index
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close chapter index"
            className="p-1.5 rounded-full text-theme-muted hover:text-theme-text hover:bg-theme-surface-elevated border border-theme-border focus:outline-none focus-visible:ring-2 focus-visible:ring-chapter-accent transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Chapter List */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-2">
          {chapterList.map((ch, idx) => {
            const isActive = pathname === '/' && idx === activeChapterIndex;
            const formattedNum =
              typeof ch.number === 'number'
                ? ch.number === 0
                  ? 'Prologue'
                  : `Chapter 0${ch.number}`
                : String(ch.number);

            return (
              <button
                key={ch.id}
                type="button"
                data-accent={ch.accentKey}
                onClick={() => handleSelectChapter(ch.id)}
                aria-current={isActive ? 'step' : undefined}
                className={cn(
                  'w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between group',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-chapter-accent',
                  isActive
                    ? 'bg-theme-surface-elevated border-chapter-accent shadow-sm'
                    : 'bg-theme-surface/50 border-theme-border/60 hover:bg-theme-surface-elevated hover:border-theme-border'
                )}
              >
                <div className="flex items-center gap-3 min-w-0 pr-3">
                  {/* Accent Node */}
                  <span
                    className={cn(
                      'w-2 h-2 rounded-full shrink-0 transition-transform',
                      isActive ? 'bg-chapter-accent scale-125' : 'bg-theme-muted group-hover:bg-chapter-accent'
                    )}
                  />

                  <div className="min-w-0">
                    <div className="font-mono text-[11px] text-theme-muted uppercase tracking-wider">
                      {formattedNum} · {ch.emotionalArc}
                    </div>
                    <div className="font-serif font-bold text-sm sm:text-base text-theme-text group-hover:text-chapter-accent transition-colors truncate">
                      <Content value={ch.title} />
                    </div>
                  </div>
                </div>

                <ChevronRight className="w-4 h-4 text-theme-muted shrink-0 group-hover:text-chapter-accent transition-colors" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
