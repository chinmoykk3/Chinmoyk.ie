'use client';

import React, { useState, useEffect } from 'react';
import { useMotion } from '@/hooks/useMotion';
import { usePolish } from './PolishContext';
import { cn } from '@/lib/utils';

export function TimecodeHUD() {
  const [mounted, setMounted] = useState(false);
  const { scrollProgress } = useMotion();
  const { reduceEffects, activeChapterKey } = usePolish();

  useEffect(() => {
    setMounted(true);
  }, []);

  // All decorative parts disabled under Reduce Effects
  if (!mounted || reduceEffects) return null;

  // Derive running documentary timecode from scroll progress (assuming a 48:00 timeline)
  const totalSeconds = Math.floor(Math.max(0, Math.min(1, scrollProgress)) * 48 * 60);
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');

  const chapterLabels: Record<string, string> = {
    prologue: 'PROLOGUE',
    ch01: 'CH 01',
    ch02: 'CH 02',
    ch03: 'CH 03',
    ch04: 'CH 04',
    ch05: 'CH 05',
    ch06: 'CH 06',
    ch07: 'CH 07',
    epilogue: 'EPILOGUE',
  };

  const chapterDisplay = chapterLabels[activeChapterKey] || 'CH 01';

  return (
    <div
      aria-hidden="true"
      className={cn(
        'fixed left-6 bottom-6 z-20 pointer-events-none select-none',
        'hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border border-theme-border/60',
        'bg-theme-surface/85 backdrop-blur-md text-[11px] font-mono text-theme-muted shadow-xs transition-opacity duration-300'
      )}
    >
      {/* Gold dot record tally */}
      <span className="w-1.5 h-1.5 rounded-full bg-theme-gold animate-pulse shrink-0" />

      {/* Film slate chapter label in muted token colors */}
      <span className="font-semibold text-theme-text uppercase tracking-wider">
        {chapterDisplay}
      </span>

      <span className="text-theme-border-strong font-light">·</span>

      {/* Tabular lining numerals */}
      <span className="tabular-nums tracking-widest text-theme-muted">
        00:{minutes}:{seconds}
      </span>
    </div>
  );
}
