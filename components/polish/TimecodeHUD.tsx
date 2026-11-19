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

  if (!mounted || reduceEffects) return null;

  // Derive running documentary timecode from scroll progress (assuming a 48:00 documentary timeline)
  const totalSeconds = Math.floor(Math.max(0, Math.min(1, scrollProgress)) * 48 * 60);
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');

  // Friendly chapter display
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
        'bg-theme-surface/80 backdrop-blur-md text-[11px] font-mono text-theme-muted shadow-sm transition-opacity duration-300'
      )}
    >
      {/* Soft blinking record tally */}
      <span className="w-1.5 h-1.5 rounded-full bg-theme-gold animate-pulse" />

      {/* Film slate chapter & timecode: "CH 03 · 00:12:40" */}
      <span className="font-semibold text-theme-text uppercase tracking-wider">
        {chapterDisplay}
      </span>

      <span className="text-theme-border-strong font-light">·</span>

      <span className="tabular-nums tracking-widest text-theme-muted">
        00:{minutes}:{seconds}
      </span>
    </div>
  );
}
