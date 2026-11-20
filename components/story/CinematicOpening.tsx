'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useMotion } from '@/hooks/useMotion';
import { ArrowDown, FastForward } from 'lucide-react';
import { cn } from '@/lib/utils';

export function CinematicOpening() {
  const { motionEnabled, prefersReducedMotion, lenis } = useMotion();

  // Intro playback stages:
  // 0: (a) Gold point appears and breathes
  // 1: (b) Name CHINMOY KALITA resolves via focus-pull BEFORE any other text
  // 2: (c) Subtitle "The Story of Chinmoy Kalita." fades in
  // 3: (d) Narration subtitle "Every story starts somewhere. Mine started with curiosity."
  // 4: (e) "A STORY STILL UNFOLDING" film-slate label at top
  // 5: (f) Gold point stretches downward into ThreadSpine + quiet "Begin the story ↓" cue
  const [stage, setStage] = useState<number>(0);
  const [mounted, setMounted] = useState<boolean>(false);
  const [isSkipped, setIsSkipped] = useState<boolean>(false);
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  const isReduced = prefersReducedMotion || !motionEnabled;

  const clearAllTimers = useCallback(() => {
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];
  }, []);

  // Determine intro duration: first visit gets full sequence; returning visitor gets short version
  const startSequence = useCallback(() => {
    clearAllTimers();

    if (isReduced) {
      setStage(5);
      return;
    }

    let returning = false;
    try {
      returning = sessionStorage.getItem('story_intro_seen') === 'true';
    } catch {
      // Fallback if sessionStorage is restricted
    }

    if (returning) {
      // Returning visitor: fast cadence (~0.6s to full resolution)
      setStage(1);
      const t1 = setTimeout(() => setStage(2), 150);
      const t2 = setTimeout(() => setStage(3), 300);
      const t3 = setTimeout(() => setStage(4), 450);
      const t4 = setTimeout(() => setStage(5), 600);
      timersRef.current = [t1, t2, t3, t4];
    } else {
      // First-time visitor: full cinematic pacing
      setStage(0);

      // (a) Gold point breathes initially (0 - 800ms)
      // (b) Name CHINMOY KALITA resolves via focus-pull BEFORE any other text (800ms)
      const t1 = setTimeout(() => setStage(1), 800);
      // (c) Subtitle "The Story of Chinmoy Kalita." fades in (2000ms)
      const t2 = setTimeout(() => setStage(2), 2000);
      // (d) Narration "Every story starts somewhere..." (2800ms)
      const t3 = setTimeout(() => setStage(3), 2800);
      // (e) "A STORY STILL UNFOLDING" label appears at top (3600ms)
      const t4 = setTimeout(() => setStage(4), 3600);
      // (f) Gold point stretches into ThreadSpine + "Begin the story ↓" cue (4500ms)
      const t5 = setTimeout(() => {
        setStage(5);
        try {
          sessionStorage.setItem('story_intro_seen', 'true');
        } catch {}
      }, 4500);

      timersRef.current = [t1, t2, t3, t4, t5];
    }
  }, [clearAllTimers, isReduced]);

  useEffect(() => {
    setMounted(true);
    startSequence();
    return () => clearAllTimers();
  }, [startSequence, clearAllTimers]);

  // Persistent "Skip intro" button action: immediately resolves all elements
  const handleSkip = useCallback(() => {
    clearAllTimers();
    setIsSkipped(true);
    setStage(5);
    try {
      sessionStorage.setItem('story_intro_seen', 'true');
    } catch {}
  }, [clearAllTimers]);

  // "Begin the story ↓" action: smooth scroll into Chapter 01
  const handleBegin = useCallback(() => {
    try {
      sessionStorage.setItem('story_intro_seen', 'true');
    } catch {}

    const el = document.getElementById('chapter-01');
    if (el) {
      if (lenis && motionEnabled) {
        lenis.scrollTo(el, { duration: 1.2, offset: -40 });
      } else {
        el.scrollIntoView({ behavior: motionEnabled ? 'smooth' : 'auto' });
      }
      if (typeof window !== 'undefined') {
        window.history.pushState(null, '', '#chapter-01');
      }
    }
  }, [lenis, motionEnabled]);

  return (
    <section
      id="prologue"
      data-chapter="0"
      data-accent="gold"
      aria-label="Prologue — The Story of Chinmoy Kalita"
      className={cn(
        'relative w-full min-h-[100dvh] flex flex-col justify-between items-center select-none overflow-hidden',
        // Pure black base with no borders or panels (Rule 1: Scene, Not Card)
        'bg-cinema-bg text-cinema-text'
      )}
    >
      {/* 35mm Optical Grain Overlay (Canvas/CSS procedural texture) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-25 mix-blend-screen bg-repeat"
        style={{
          backgroundImage:
            'radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Top Bar: Film-slate label & Persistent "Skip intro" button */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-6 sm:pt-8 flex items-center justify-between">
        {/* (e) Film-slate label: "A STORY STILL UNFOLDING" (Unboxed, pure typography) */}
        <div
          className={cn(
            'transition-opacity duration-700 ease-out',
            stage >= 4 || isReduced || isSkipped ? 'opacity-80' : 'opacity-0'
          )}
        >
          <span className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.25em] text-cinema-muted">
            A STORY STILL UNFOLDING
          </span>
        </div>

        {/* Persistent "Skip intro" button */}
        {(stage < 5 && !isReduced && !isSkipped) && (
          <button
            type="button"
            onClick={handleSkip}
            aria-label="Skip introductory sequence"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-cinema-muted hover:text-cinema-gold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cinema-gold rounded-sm px-2 py-1"
          >
            <span>Skip intro</span>
            <FastForward className="w-3.5 h-3.5" />
          </button>
        )}
      </header>

      {/* Centerpiece: (a) Gold point, (b) Name focus-pull, (c) Subtitle, (d) Narration */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 w-full max-w-4xl text-center py-12">
        {/* (a) Breathing Gold Point (Central Light Source) */}
        <div
          aria-hidden="true"
          className={cn(
            'w-3 h-3 rounded-full bg-cinema-gold transition-all duration-700 ease-out mb-6 sm:mb-8',
            !isReduced && 'animate-breathe shadow-[0_0_20px_var(--color-cinema-gold)]',
            stage >= 5 && 'scale-90 opacity-80'
          )}
        />

        {/* (b) Name: CHINMOY KALITA resolves via focus-pull BEFORE any other text.
            Largest element, Instrument Serif, fluid clamp so it never breaks mid-word at 320px */}
        <h1
          className={cn(
            'font-serif font-black tracking-tight text-cinema-text leading-[1.04] transition-all duration-1000 ease-out',
            // Tested fluid clamp: scales gracefully from 320px mobile to 1440px desktop
            'text-[clamp(2.1rem,7.5vw+0.25rem,5.25rem)]',
            isReduced || isSkipped
              ? 'opacity-100 filter-none'
              : stage >= 1
                ? 'opacity-100 filter-none scale-100'
                : 'opacity-15 blur-[16px] scale-[1.04]'
          )}
        >
          <span className="inline-block whitespace-nowrap">CHINMOY</span>{' '}
          <span className="inline-block whitespace-nowrap">KALITA</span>
        </h1>

        {/* (c) Subtitle: "The Story of Chinmoy Kalita." */}
        <p
          className={cn(
            'font-serif italic text-base sm:text-xl text-cinema-muted mt-3 sm:mt-4 transition-all duration-700 ease-out',
            stage >= 2 || isReduced || isSkipped
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-3 pointer-events-none'
          )}
        >
          The Story of Chinmoy Kalita.
        </p>

        {/* (d) Narration, subtitle-style: "Every story starts somewhere. Mine started with curiosity." (No card/box) */}
        <p
          className={cn(
            'font-serif italic text-sm sm:text-base md:text-lg text-cinema-text/85 max-w-xl mx-auto mt-6 sm:mt-8 leading-relaxed transition-all duration-700 ease-out',
            stage >= 3 || isReduced || isSkipped
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-3 pointer-events-none'
          )}
        >
          &ldquo;Every story starts somewhere. Mine started with curiosity.&rdquo;
        </p>
      </main>

      {/* Bottom Cue: (f) Gold thread stretch + quiet "Begin the story ↓" */}
      <footer className="relative z-10 pb-8 sm:pb-12 flex flex-col items-center justify-center">
        {/* Animated Gold Thread Line Stretching Downward into the ThreadSpine */}
        <div
          aria-hidden="true"
          className={cn(
            'w-[2px] bg-cinema-gold rounded-full transition-all duration-1000 ease-out mb-3',
            stage >= 5 || isReduced || isSkipped ? 'h-10 opacity-90' : 'h-0 opacity-0'
          )}
        />

        {/* Quiet "Begin the story ↓" Cue */}
        <button
          type="button"
          onClick={handleBegin}
          className={cn(
            'group flex flex-col items-center gap-1.5 text-xs font-mono uppercase tracking-[0.2em] transition-all duration-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-cinema-gold rounded-sm px-3 py-1',
            stage >= 5 || isReduced || isSkipped
              ? 'opacity-85 hover:opacity-100 text-cinema-gold hover:text-cinema-text cursor-pointer'
              : 'opacity-0 pointer-events-none'
          )}
          aria-label="Begin the documentary story"
        >
          <span>Begin the story</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </button>
      </footer>
    </section>
  );
}
