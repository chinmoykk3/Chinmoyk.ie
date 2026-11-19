'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Chapter } from '@/content/chapters';
import { useMotion } from '@/hooks/useMotion';
import { ChapterTitleCard } from '@/components/motion/ChapterTitleCard';
import { Content } from '@/components/content/Content';
import { isContentRenderable } from '@/content/schema';
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
  const showDebugChips =
    process.env.NODE_ENV !== 'production' &&
    process.env.NEXT_PUBLIC_DEBUG_CONTENT === '1';

  // Pinned scroll trigger for the narrative scrub
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
      end: '+=120%',
      pin: contentEl,
      pinSpacing: true,
      scrub: 0.5,
      onUpdate: (self) => {
        setScrollProgress(self.progress);
      },
    });

    return () => {
      trigger.kill();
    };
  }, [isReduced]);

  // Phase progression for scrubbed reveals
  const getPhase = (start: number, end: number) => {
    if (isReduced) return 1;
    if (scrollProgress < start) return 0;
    if (scrollProgress > end) return 1;
    return (scrollProgress - start) / (end - start);
  };

  const line1Progress = getPhase(0.05, 0.35);
  const line2Progress = getPhase(0.35, 0.65);
  const line3Progress = getPhase(0.65, 0.90);
  const bridgeProgress = getPhase(0.85, 1.0);

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
        {/* Top: ChapterTitleCard (Rule 2: One label only, gold accent) */}
        <div className="relative z-10 max-w-4xl mx-auto w-full">
          <ChapterTitleCard
            number={1}
            title={chapter.title}
            subtitle={chapter.subtitle}
            arc={chapter.emotionalArc}
            accentKey="gold"
          />
        </div>

        {/* Center: Pinned scrubbed narration + gold thinking-on-paper SVG sketches (≤ 35% opacity) */}
        <div className="relative z-10 max-w-3xl mx-auto w-full my-auto py-8">
          {/* Accessible screen-reader text */}
          <div className="sr-only">
            <h2><Content value={chapter.title} /></h2>
            <p>{narrationLines.join(' ')}</p>
            <p><Content value={chapter.bridge} /></p>
          </div>

          {/* Visual line-by-line scrub with inline gold sketches */}
          <div aria-hidden="true" className="space-y-12 sm:space-y-16">
            {/* Line 1: Understanding & Gear sketch */}
            <div className="relative">
              {/* Gold SVG Gear sketch (≤ 35% opacity behind text) */}
              <div className="pointer-events-none absolute -left-8 -top-8 w-28 h-28 text-theme-gold opacity-25 -z-10">
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full"
                  style={{
                    transform: `rotate(${line1Progress * 45}deg)`,
                  }}
                >
                  <path
                    d="M45,12 L55,12 L57,20 L66,24 L73,19 L80,26 L75,33 L79,42 L87,44 L87,54 L79,56 L75,65 L80,72 L73,79 L66,74 L57,78 L55,86 L45,86 L43,78 L34,74 L27,79 L20,72 L25,65 L21,56 L13,54 L13,44 L21,42 L25,33 L20,26 L27,19 L34,24 L43,20 Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeDasharray="320"
                    strokeDashoffset={isReduced ? 0 : Math.max(0, 320 * (1 - line1Progress))}
                    strokeLinecap="round"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeDasharray="100"
                    strokeDashoffset={isReduced ? 0 : Math.max(0, 100 * (1 - line1Progress))}
                  />
                </svg>
              </div>

              <p
                className={cn(
                  'font-serif text-fluid-narration sm:text-3xl max-w-[32ch] leading-[1.38] transition-all duration-300',
                  line1Progress > 0.05
                    ? 'text-theme-text opacity-100'
                    : 'text-theme-muted opacity-40'
                )}
              >
                &ldquo;{narrationLines[0]}&rdquo;
              </p>
            </div>

            {/* Line 2: Understanding wasn't enough & Circuit trace sketch */}
            <div className="relative sm:pl-8">
              {/* Gold SVG Circuit trace sketch (≤ 35% opacity behind text) */}
              <div className="pointer-events-none absolute right-0 -top-6 w-36 h-24 text-theme-gold opacity-25 -z-10">
                <svg viewBox="0 0 120 80" className="w-full h-full">
                  <path
                    d="M10,40 L40,40 L55,15 L85,15 L95,35 L95,65 L80,75 L45,75"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeDasharray="260"
                    strokeDashoffset={isReduced ? 0 : Math.max(0, 260 * (1 - line2Progress))}
                    strokeLinecap="round"
                  />
                  <circle cx="10" cy="40" r="3" fill="currentColor" opacity={line2Progress} />
                  <circle cx="95" cy="65" r="3" fill="currentColor" opacity={line2Progress} />
                </svg>
              </div>

              <p
                className={cn(
                  'font-serif text-fluid-narration sm:text-3xl max-w-[32ch] leading-[1.38] transition-all duration-300',
                  line2Progress > 0.15
                    ? 'text-theme-text opacity-100'
                    : 'text-theme-muted opacity-40'
                )}
              >
                &ldquo;{narrationLines[1]}&rdquo;
              </p>
            </div>

            {/* Line 3: Create things myself & Pencil sketch lines */}
            <div className="relative sm:pl-16">
              {/* Gold SVG Pencil lines sketch (≤ 35% opacity behind text) */}
              <div className="pointer-events-none absolute -left-6 -top-4 w-32 h-28 text-theme-gold opacity-25 -z-10">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path
                    d="M15,80 C25,25 65,25 85,75"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeDasharray="200"
                    strokeDashoffset={isReduced ? 0 : Math.max(0, 200 * (1 - line3Progress))}
                    strokeLinecap="round"
                  />
                  <path
                    d="M30,85 C45,45 75,45 90,85"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeDasharray="160"
                    strokeDashoffset={isReduced ? 0 : Math.max(0, 160 * (1 - line3Progress))}
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <p
                className={cn(
                  'font-serif text-fluid-narration sm:text-3xl max-w-[32ch] leading-[1.38] transition-all duration-300',
                  line3Progress > 0.15
                    ? 'text-theme-text opacity-100 font-medium'
                    : 'text-theme-muted opacity-40'
                )}
              >
                &ldquo;{narrationLines[2]}&rdquo;
              </p>
            </div>
          </div>

          {/* Three optional personal slots from /content: skipped silently if empty or placeholder */}
          <div className="mt-12 space-y-3">
            {slots.map((slot) => {
              const hasConfirmedContent = isContentRenderable(slot.question);
              if (!hasConfirmedContent && !showDebugChips) return null;

              return (
                <div key={slot.id} className="text-xs font-mono text-theme-muted flex items-center gap-2">
                  {hasConfirmedContent && (
                    <span className="text-theme-text font-serif italic text-sm">
                      <Content value={slot.question} />
                    </span>
                  )}
                  {showDebugChips && !hasConfirmedContent && (
                    <span className="px-2 py-0.5 rounded border border-theme-border/50 bg-theme-surface/50 text-[10px]">
                      TODO: {slot.id}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom: Unlabeled quiet first-person narrative bridge line (Rule 5) */}
        <footer className="relative z-10 max-w-3xl mx-auto w-full pt-4">
          <p
            className={cn(
              'text-sm sm:text-base font-serif italic text-theme-muted text-center sm:text-left transition-opacity duration-300',
              bridgeProgress > 0.2 || isReduced ? 'opacity-90' : 'opacity-30'
            )}
          >
            &ldquo;<Content value={chapter.bridge} />&rdquo;
          </p>
        </footer>
      </div>
    </article>
  );
}
