'use client';

import React from 'react';
import { usePolish } from './PolishContext';
import { useMotion } from '@/hooks/useMotion';
import { cn } from '@/lib/utils';

export function LowerThird() {
  const { activeLowerThird, reduceEffects } = usePolish();
  const { prefersReducedMotion, motionEnabled } = useMotion();

  const isReduced = prefersReducedMotion || !motionEnabled || reduceEffects;

  // Decorative parts are hidden when Reduce Effects is enabled
  if (!activeLowerThird || isReduced) return null;

  return (
    <aside
      aria-hidden="true"
      className={cn(
        'fixed left-4 sm:left-6 z-30 pointer-events-none select-none max-w-[calc(100vw-2rem)] sm:max-w-md',
        'bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] sm:bottom-6'
      )}
    >
      <div
        className={cn(
          'px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl border border-theme-border/80 shadow-2xl',
          'bg-theme-surface/95 backdrop-blur-md transition-all duration-300 ease-out',
          'animate-in fade-in slide-in-from-left-4 duration-300'
        )}
      >
        {/* Mobile: Single compact line above safe area */}
        <div className="flex sm:hidden items-center gap-2 text-xs truncate">
          <span className="w-1.5 h-1.5 rounded-full bg-theme-gold shrink-0" />
          <span className="font-sans font-medium text-theme-text truncate">
            {activeLowerThird.title}
          </span>
          <span className="font-mono text-[10px] text-theme-muted truncate">
            — {activeLowerThird.subtitle}
          </span>
        </div>

        {/* Desktop: Slim bar with short gold line, title (Geist Sans) and subtitle (Geist Mono) */}
        <div className="hidden sm:flex items-center gap-3">
          <div className="h-6 w-1 rounded-full bg-theme-gold shrink-0" />
          <div className="min-w-0 flex-1">
            {activeLowerThird.category && (
              <span className="block font-mono text-[9px] uppercase tracking-widest text-theme-gold font-semibold leading-none mb-0.5">
                {activeLowerThird.category}
              </span>
            )}
            <h4 className="font-sans font-semibold text-xs sm:text-sm text-theme-text leading-tight truncate">
              {activeLowerThird.title}
            </h4>
            <p className="font-mono text-[10px] text-theme-muted truncate leading-snug mt-0.5">
              {activeLowerThird.subtitle}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
