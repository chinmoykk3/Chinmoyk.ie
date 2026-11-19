'use client';

import React from 'react';
import { usePolish } from './PolishContext';
import { useMotion } from '@/hooks/useMotion';
import { cn } from '@/lib/utils';

export function LowerThird() {
  const { activeLowerThird, reduceEffects } = usePolish();
  const { prefersReducedMotion, motionEnabled } = useMotion();

  const isReduced = prefersReducedMotion || !motionEnabled || reduceEffects;

  if (!activeLowerThird) return null;

  return (
    <aside
      aria-live="polite"
      aria-atomic="true"
      className={cn(
        'fixed left-4 sm:left-8 bottom-6 sm:bottom-8 z-30 pointer-events-none select-none max-w-[calc(100vw-2rem)] sm:max-w-md',
        'bottom-[calc(1.5rem+env(safe-area-inset-bottom,0px))]'
      )}
    >
      <div
        className={cn(
          'flex items-center gap-3 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl border border-theme-border/80 shadow-2xl',
          'bg-theme-surface/92 backdrop-blur-md transition-all duration-500 ease-out',
          isReduced ? 'opacity-100' : 'animate-in fade-in slide-in-from-left-6 duration-400'
        )}
      >
        {/* Film slate gold accent bar */}
        <div className="h-7 w-1 rounded-full bg-theme-gold shrink-0" aria-hidden="true" />

        <div className="min-w-0 flex-1">
          {activeLowerThird.category && (
            <span className="block font-mono text-[9px] uppercase tracking-widest text-theme-gold font-semibold leading-none mb-0.5">
              {activeLowerThird.category}
            </span>
          )}
          <h4 className="font-sans font-bold text-xs sm:text-sm text-theme-text leading-tight truncate">
            {activeLowerThird.title}
          </h4>
          <p className="font-mono text-[10px] sm:text-xs text-theme-muted truncate leading-snug mt-0.5">
            {activeLowerThird.subtitle}
          </p>
        </div>
      </div>
    </aside>
  );
}
