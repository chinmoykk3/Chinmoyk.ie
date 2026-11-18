'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useMotion } from '@/hooks/useMotion';
import { ArrowDown, RotateCcw, FastForward } from 'lucide-react';
import { cn } from '@/lib/utils';

export function OpeningExperience() {
  const { motionEnabled, prefersReducedMotion, lenis } = useMotion();

  // Intro playback states:
  // 0: Initial pure black + gold point appears
  // 1: Film slate label appears
  // 2: Name resolves via focus-pull (blur to sharp)
  // 3: Subtitle fades in ("The Story of Chinmoy Kalita.")
  // 4: Narration subtitle fades in ("Every story starts somewhere...")
  // 5: Gold point stretches downward + "Begin the story ↓" cue appears
  const [stage, setStage] = useState<number>(0);
  const [isDismissed, setIsDismissed] = useState<boolean>(false);
  const [isShortened, setIsShortened] = useState<boolean>(false);
  const [grainUrl, setGrainUrl] = useState<string>('');
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  const isReduced = prefersReducedMotion || !motionEnabled;

  const clearAllTimers = useCallback(() => {
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];
  }, []);

  // 1. Generate lightweight procedural noise texture (< 2KB runtime memory, 0 KB network)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const canvas = document.createElement('canvas');
      canvas.width = 96;
      canvas.height = 96;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const imgData = ctx.createImageData(96, 96);
        const data = imgData.data;
        for (let i = 0; i < data.length; i += 4) {
          const noise = Math.floor(Math.random() * 255);
          data[i] = noise;
          data[i + 1] = noise;
          data[i + 2] = noise;
          data[i + 3] = 32; // subtle opacity for 35mm film grain
        }
        ctx.putImageData(imgData, 0, 0);
        setGrainUrl(canvas.toDataURL('image/png'));
      }
    } catch {
      // Graceful fallback if canvas is disabled
    }
  }, []);

  // 2. Play intro sequence (detecting sessionStorage for returning visitors)
  const startSequence = useCallback(
    (forceFull = false) => {
      clearAllTimers();

      if (isReduced) {
        // Reduced motion: static composition with name and narration immediately sharp
        setStage(5);
        return;
      }

      const viewed = typeof window !== 'undefined' && sessionStorage.getItem('ck_intro_viewed');

      if (viewed && !forceFull) {
        // Returning visitor: shortened version (~0.6s total reveal)
        setIsShortened(true);
        setStage(1);
        const t1 = setTimeout(() => setStage(3), 200);
        const t2 = setTimeout(() => {
          setStage(5);
          sessionStorage.setItem('ck_intro_viewed', 'true');
        }, 550);
        timersRef.current = [t1, t2];
      } else {
        // First-time visitor or explicit replay: Full cinematic cadence
        setIsShortened(false);
        setStage(0);

        const t1 = setTimeout(() => setStage(1), 500); // 0.5s: slate label
        const t2 = setTimeout(() => setStage(2), 1100); // 1.1s: focus-pull begins on name
        const t3 = setTimeout(() => setStage(3), 2400); // 2.4s: subtitle fades in
        const t4 = setTimeout(() => setStage(4), 3300); // 3.3s: narration subtitle
        const t5 = setTimeout(() => {
          setStage(5); // 4.3s: gold point stretches, "Begin the story ↓"
          if (typeof window !== 'undefined') {
            sessionStorage.setItem('ck_intro_viewed', 'true');
          }
        }, 4300);

        timersRef.current = [t1, t2, t3, t4, t5];
      }
    },
    [clearAllTimers, isReduced]
  );

  useEffect(() => {
    startSequence();
    return () => clearAllTimers();
  }, [startSequence, clearAllTimers]);

  // Support global replay event
  useEffect(() => {
    const handleReplay = () => {
      setIsDismissed(false);
      startSequence(true);
    };
    window.addEventListener('ck_replay_intro', handleReplay);
    return () => window.removeEventListener('ck_replay_intro', handleReplay);
  }, [startSequence]);

  // 3. Skip intro action
  const handleSkip = useCallback(() => {
    clearAllTimers();
    setStage(5);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('ck_intro_viewed', 'true');
    }
    // Smooth transition to documentary prologue
    const el = document.getElementById('prologue');
    if (el) {
      if (lenis && motionEnabled) {
        lenis.scrollTo(el, { offset: -60, duration: 1 });
      } else {
        el.scrollIntoView({ behavior: motionEnabled ? 'smooth' : 'auto' });
      }
    }
    setIsDismissed(true);
  }, [clearAllTimers, lenis, motionEnabled]);

  // 4. Begin the story action
  const handleBegin = useCallback(() => {
    setIsDismissed(true);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('ck_intro_viewed', 'true');
    }
    const el = document.getElementById('prologue');
    if (el) {
      if (lenis && motionEnabled) {
        lenis.scrollTo(el, { offset: -60, duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: motionEnabled ? 'smooth' : 'auto' });
      }
    }
  }, [lenis, motionEnabled]);

  // If dismissed and scrolled past, keep accessible overlay unmounted or minimized
  if (isDismissed) {
    return null;
  }

  return (
    <section
      aria-label="Documentary Cinematic Opening Sequence"
      className="opening-experience-overlay fixed inset-0 z-50 flex flex-col justify-between items-center bg-cinema-bg text-cinema-text select-none overflow-hidden"
    >
      {/* 35mm Procedural Film Grain Overlay (Subtle Optical Texture) */}
      {grainUrl && !isReduced && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 opacity-30 mix-blend-screen"
          style={{ backgroundImage: `url(${grainUrl})`, backgroundRepeat: 'repeat' }}
        />
      )}

      {/* Persistent Top Navigation Bar for Opening Experience */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        {/* Subtle Status Indicator */}
        <div className="flex items-center gap-2 text-xs font-mono text-cinema-muted">
          <span className="w-1.5 h-1.5 rounded-full bg-cinema-gold animate-pulse" />
          <span className="hidden sm:inline">OVERTURE</span>
        </div>

        {/* Always Visible "Skip intro" Button */}
        <div className="flex items-center gap-3">
          {isShortened && (
            <button
              type="button"
              onClick={() => startSequence(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono text-cinema-muted hover:text-cinema-text border border-cinema-border/50 hover:bg-cinema-surface transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cinema-gold"
              aria-label="Replay full cinematic intro"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Full Intro</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleSkip}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium text-cinema-text bg-cinema-surface border border-cinema-border hover:border-cinema-gold hover:text-cinema-gold transition-all shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-cinema-gold"
            aria-label="Skip introductory sequence and proceed directly to story"
          >
            <span>Skip intro</span>
            <FastForward className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Cinematic Centerpiece */}
      <main className="relative z-20 flex-1 flex flex-col items-center justify-center px-4 w-full max-w-4xl text-center">
        {/* 1. Breathing Gold Point (Initial Spark of Curiosity) */}
        <div
          aria-hidden="true"
          className={cn(
            'w-3 h-3 rounded-full bg-cinema-gold transition-all duration-700 ease-out mb-6',
            !isReduced && 'animate-breathe shadow-[0_0_18px_var(--color-cinema-gold)]',
            stage >= 5 && 'scale-90 opacity-80'
          )}
        />

        {/* Small Film-Slate Label: "A STORY STILL UNFOLDING" */}
        <div
          className={cn(
            'transition-all duration-700 ease-out transform',
            stage >= 1 || isReduced
              ? 'opacity-80 translate-y-0'
              : 'opacity-0 translate-y-2 pointer-events-none'
          )}
        >
          <span className="inline-block text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-cinema-muted px-3 py-1 rounded-full border border-cinema-border/50 bg-cinema-surface/40 backdrop-blur-sm">
            A STORY STILL UNFOLDING
          </span>
        </div>

        {/* 2. The Name: CHINMOY KALITA resolves via focus-pull (blur+grain to sharp) BEFORE any title */}
        <div className="mt-4 sm:mt-5 overflow-visible">
          <h1
            className={cn(
              'font-serif font-black tracking-tight text-cinema-text leading-none transition-all duration-1000 ease-out',
              // Fluid clamp sizing tested for 320px screen without mid-word breaks
              'text-[clamp(1.9rem,7.5vw+0.25rem,5rem)]',
              isReduced
                ? 'opacity-100 filter-none'
                : stage >= 2
                  ? 'opacity-100 filter-none scale-100'
                  : 'opacity-20 blur-[18px] scale-[1.04]'
            )}
          >
            <span className="inline-block">CHINMOY</span>{' '}
            <span className="inline-block">KALITA</span>
          </h1>
        </div>

        {/* 3. Subtitle fades in: "The Story of Chinmoy Kalita." */}
        <div
          className={cn(
            'mt-3 sm:mt-4 transition-all duration-700 ease-out transform',
            stage >= 3 || isReduced
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-3 pointer-events-none'
          )}
        >
          <p className="font-serif italic text-base sm:text-lg md:text-xl text-cinema-muted">
            The Story of Chinmoy Kalita.
          </p>
        </div>

        {/* 4. Narration appears subtitle-style: "Every story starts somewhere. Mine started with curiosity." */}
        <div
          className={cn(
            'mt-6 sm:mt-8 max-w-xl transition-all duration-700 ease-out transform',
            stage >= 4 || isReduced
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4 pointer-events-none'
          )}
        >
          <div className="px-5 py-2.5 rounded-2xl bg-cinema-surface/75 border border-cinema-border/50 backdrop-blur-md shadow-lg inline-block">
            <p className="text-xs sm:text-sm font-sans tracking-wide text-cinema-text/90 italic">
              &ldquo;Every story starts somewhere. Mine started with curiosity.&rdquo;
            </p>
          </div>
        </div>
      </main>

      {/* 5. Gold Point Stretches Downward + Quiet "Begin the story ↓" Cue */}
      <footer className="relative z-20 pb-8 sm:pb-12 flex flex-col items-center justify-center">
        {/* Animated Gold Thread Line Stretching Downward as Start of ThreadSpine */}
        <div
          aria-hidden="true"
          className={cn(
            'w-[2px] bg-cinema-gold rounded-full transition-all duration-1000 ease-out mb-4',
            stage >= 5 || isReduced ? 'h-12 opacity-90' : 'h-0 opacity-0'
          )}
        />

        {/* Quiet "Begin the story ↓" Cue */}
        <button
          type="button"
          onClick={handleBegin}
          className={cn(
            'group flex flex-col items-center gap-1.5 text-xs font-mono uppercase tracking-[0.2em] transition-all duration-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-cinema-gold rounded-lg px-3 py-1',
            stage >= 5 || isReduced
              ? 'opacity-90 hover:opacity-100 text-cinema-gold hover:text-cinema-text cursor-pointer'
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
