'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useMotion } from '@/hooks/useMotion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';
import { AccentKey } from '@/content/chapters';

export interface ChapterTitleCardProps extends React.HTMLAttributes<HTMLDivElement> {
  number: number | string;
  title: string;
  subtitle: string;
  arc: string;
  accentKey: AccentKey;
  baseTimeSeconds?: number; // e.g. 180 for 00:03:00:00
}

export function ChapterTitleCard({
  number,
  title,
  subtitle,
  arc,
  accentKey,
  baseTimeSeconds = 0,
  className,
  ...props
}: ChapterTitleCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { motionEnabled } = useMotion();
  const [runningTimecode, setRunningTimecode] = useState('00:00:00:00');

  const formattedNum =
    typeof number === 'number'
      ? number === 0
        ? 'PROLOGUE'
        : `0${number}`
      : String(number).toUpperCase();

  const formatTimecode = (totalSec: number, progressOffset: number) => {
    const elapsed = totalSec + progressOffset;
    const hours = Math.floor(elapsed / 3600);
    const mins = Math.floor((elapsed % 3600) / 60);
    const secs = Math.floor(elapsed % 60);
    const frames = Math.floor((elapsed % 1) * 24);

    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}:${String(frames).padStart(2, '0')}`;
  };

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    if (!motionEnabled) {
      setRunningTimecode(formatTimecode(baseTimeSeconds, 0));
      return;
    }

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        // Increment timecode dynamically over a 45-second cinematic window per chapter
        const progressOffset = self.progress * 45;
        setRunningTimecode(formatTimecode(baseTimeSeconds, progressOffset));
      },
    });

    return () => {
      trigger.kill();
    };
  }, [baseTimeSeconds, motionEnabled]);

  return (
    <div
      ref={cardRef}
      data-accent={accentKey}
      className={cn(
        'relative overflow-hidden rounded-2xl p-8 sm:p-12 border border-theme-border bg-theme-surface backdrop-blur-md shadow-lg transition-colors duration-300',
        className
      )}
      {...props}
    >
      {/* Decorative top film metadata strip */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-theme-border pb-4 text-xs font-mono">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-chapter-accent animate-pulse" />
          <span className="tracking-widest text-theme-muted uppercase">
            FILM STRIP · REEL {formattedNum}
          </span>
        </div>

        {/* Dynamic Running Timecode */}
        <div className="flex items-center gap-2">
          <span className="text-theme-muted text-[10px] uppercase tracking-widest">TIMECODE:</span>
          <span className="tabular-nums font-bold text-chapter-accent tracking-widest bg-theme-surface-elevated px-2 py-0.5 rounded border border-theme-border">
            {runningTimecode}
          </span>
        </div>
      </div>

      {/* Main Chapter Typography */}
      <div className="mt-8 space-y-3">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-chapter-accent/15 text-chapter-accent border border-chapter-accent/30">
            {formattedNum}
          </span>
          <span className="text-xs font-mono uppercase tracking-widest text-theme-muted">
            {arc}
          </span>
        </div>

        <h3 className="text-fluid-h1 font-serif font-black text-theme-text tracking-tight">
          {title}
        </h3>

        <p className="text-fluid-narration font-serif italic text-theme-muted">{subtitle}</p>
      </div>

      {/* Subtle corner film crop marks */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-4 right-4 text-[10px] font-mono text-theme-muted/50 uppercase tracking-widest"
      >
        EXPOSURE · 24FPS
      </div>
    </div>
  );
}
