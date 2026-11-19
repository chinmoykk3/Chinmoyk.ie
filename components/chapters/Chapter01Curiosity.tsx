'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Chapter } from '@/content/chapters';
import { useMotion } from '@/hooks/useMotion';
import { DirectorsCommentary } from '@/components/polish/DirectorsCommentary';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

export interface Chapter01CuriosityProps {
  chapter: Chapter;
}

export function Chapter01Curiosity({ chapter }: Chapter01CuriosityProps) {
  const { motionEnabled, prefersReducedMotion } = useMotion();
  const sceneRef = useRef<HTMLElement>(null);
  const pinContentRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const isReduced = prefersReducedMotion || !motionEnabled;

  const narrationLines = [
    "I've always been fascinated by understanding how things work.",
    "But eventually, understanding wasn't enough.",
    'I wanted to create things myself.',
  ];

  const slots = chapter.curiositySlots || [];
  const isDev = process.env.NODE_ENV !== 'production';

  useEffect(() => {
    const triggerEl = sceneRef.current;
    const contentEl = pinContentRef.current;
    if (!triggerEl || !contentEl) return;

    if (isReduced) {
      setScrollProgress(1);
      return;
    }

    const trigger = ScrollTrigger.create({
      trigger: triggerEl,
      start: 'top top',
      end: '+=100%',
      pin: contentEl,
      pinSpacing: true,
      scrub: 0.4,
      onUpdate: (self) => {
        setScrollProgress(self.progress);
      },
    });

    return () => {
      trigger.kill();
    };
  }, [isReduced]);

  // Phase windows for the 3 narration moments and sketches
  // Line 1 & Gear: 0.08 - 0.38
  // Line 2 & Circuit: 0.38 - 0.68
  // Line 3 & Sketch: 0.68 - 0.92
  // Bridge line: 0.88 - 1.00

  const getPhaseProgress = (start: number, end: number) => {
    if (isReduced) return 1;
    if (scrollProgress < start) return 0;
    if (scrollProgress > end) return 1;
    return (scrollProgress - start) / (end - start);
  };

  const gearProgress = getPhaseProgress(0.08, 0.38);
  const circuitProgress = getPhaseProgress(0.38, 0.68);
  const sketchProgress = getPhaseProgress(0.68, 0.92);
  const bridgeProgress = getPhaseProgress(0.85, 1.0);

  return (
    <article
      ref={sceneRef}
      id={chapter.id}
      data-chapter="1"
      data-accent="gold"
      aria-label="Chapter 01: It Started With Curiosity"
      className="relative w-full border-t border-theme-border/40 transition-colors duration-300"
    >
      <div
        ref={pinContentRef}
        className="w-full min-h-[100svh] flex flex-col justify-between py-12 sm:py-16 px-6 sm:px-12 relative overflow-hidden"
      >
        {/* Top: Chapter Identity (Rule 2: One label only) */}
        <header className="relative z-10 max-w-4xl mx-auto w-full flex items-baseline justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-chapter-accent font-medium">
              CHAPTER 01
            </span>
            <span className="text-theme-muted/40 font-mono text-xs" aria-hidden="true">
              ·
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-theme-muted">
              {chapter.title}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <DirectorsCommentary id="chapter-01" />
          </div>
        </header>

        {/* Center: Full-bleed scrubbed narration + inline gold line art */}
        <div className="relative z-10 max-w-3xl mx-auto w-full my-auto py-12">
          {/* Accessible screen-reader text in natural reading order */}
          <div className="sr-only">
            <h2>{chapter.title}</h2>
            <p>{narrationLines.join(' ')}</p>
            <p>{chapter.bridgeToNext}</p>
          </div>

          {/* Visual Presentation */}
          <div aria-hidden="true" className="space-y-12 sm:space-y-16">
            {/* Line 1: Understanding */}
            <div className="relative">
              {/* Subtle gold line sketch: gear drawing on paper */}
              <div className="pointer-events-none absolute -left-12 -top-8 w-28 h-28 text-chapter-accent opacity-25 -z-10">
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full"
                  style={{
                    transform: `rotate(${gearProgress * 60}deg)`,
                  }}
                >
                  <path
                    d="M45,12 L55,12 L57,20 L66,24 L73,19 L80,26 L75,33 L79,42 L87,44 L87,54 L79,56 L75,65 L80,72 L73,79 L66,74 L57,78 L55,86 L45,86 L43,78 L34,74 L27,79 L20,72 L25,65 L21,56 L13,54 L13,44 L21,42 L25,33 L20,26 L27,19 L34,24 L43,20 Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray="320"
                    strokeDashoffset={isReduced ? 0 : Math.max(0, 320 * (1 - gearProgress))}
                    strokeLinecap="round"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray="100"
                    strokeDashoffset={isReduced ? 0 : Math.max(0, 100 * (1 - gearProgress))}
                  />
                </svg>
              </div>

              <p
                className={cn(
                  'font-serif text-fluid-narration sm:text-3xl max-w-[28ch] leading-[1.35] transition-all duration-300',
                  gearProgress > 0.05
                    ? 'text-theme-text opacity-100'
                    : 'text-theme-text/85 opacity-90'
                )}
              >
                &ldquo;{narrationLines[0]}&rdquo;
              </p>
            </div>

            {/* Line 2: Not enough */}
            <div className="relative sm:pl-8">
              {/* Gold circuit trace sketch */}
              <div className="pointer-events-none absolute right-0 -top-6 w-32 h-24 text-chapter-accent opacity-25 -z-10">
                <svg viewBox="0 0 120 80" className="w-full h-full">
                  <path
                    d="M10,40 L40,40 L55,15 L85,15 L95,35 L95,65 L80,75 L45,75"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray="260"
                    strokeDashoffset={isReduced ? 0 : Math.max(0, 260 * (1 - circuitProgress))}
                    strokeLinecap="round"
                  />
                  <circle cx="10" cy="40" r="3" fill="currentColor" opacity={circuitProgress} />
                  <circle cx="95" cy="65" r="3" fill="currentColor" opacity={circuitProgress} />
                </svg>
              </div>

              <p
                className={cn(
                  'font-serif text-fluid-narration sm:text-3xl max-w-[28ch] leading-[1.35] transition-all duration-300',
                  circuitProgress > 0.15
                    ? 'text-theme-text opacity-100'
                    : 'text-theme-muted opacity-70'
                )}
              >
                &ldquo;{narrationLines[1]}&rdquo;
              </p>
            </div>

            {/* Line 3: Create things myself */}
            <div className="relative sm:pl-16">
              {/* Compass / sketch arc */}
              <div className="pointer-events-none absolute -left-6 -top-4 w-28 h-28 text-chapter-accent opacity-25 -z-10">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path
                    d="M20,80 C30,25 70,25 80,80"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray="200"
                    strokeDashoffset={isReduced ? 0 : Math.max(0, 200 * (1 - sketchProgress))}
                    strokeLinecap="round"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeDasharray="140"
                    strokeDashoffset={isReduced ? 0 : Math.max(0, 140 * (1 - sketchProgress))}
                  />
                </svg>
              </div>

              <p
                className={cn(
                  'font-serif text-fluid-narration sm:text-3xl max-w-[28ch] leading-[1.35] transition-all duration-300',
                  sketchProgress > 0.15
                    ? 'text-theme-text opacity-100 font-medium'
                    : 'text-theme-muted opacity-60'
                )}
              >
                &ldquo;{narrationLines[2]}&rdquo;
              </p>
            </div>
          </div>

          {/* Dev-only quiet chips for confirmed personal claims (Rule 4) */}
          {isDev && slots.length > 0 && (
            <aside
              aria-label="Development status"
              className="mt-12 flex flex-wrap gap-2 text-[10px] font-mono text-theme-muted/60"
            >
              {slots.map((s) => (
                <span
                  key={s.id}
                  className="px-2 py-0.5 rounded border border-theme-border/50 bg-theme-surface/50"
                >
                  [TODO: {s.id}]
                </span>
              ))}
            </aside>
          )}
        </div>

        {/* Bottom: Narrative Bridge (Rule 5: Quiet first-person line, no box, no label) */}
        <footer className="relative z-10 max-w-3xl mx-auto w-full pt-4">
          <p
            className={cn(
              'text-sm sm:text-base font-serif italic text-theme-muted text-center sm:text-left transition-opacity duration-300',
              bridgeProgress > 0.2 ? 'opacity-90' : 'opacity-40'
            )}
          >
            &ldquo;{chapter.bridgeToNext}&rdquo;
          </p>
        </footer>
      </div>
    </article>
  );
}
