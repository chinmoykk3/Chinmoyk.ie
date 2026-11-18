'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Chapter } from '@/content/chapters';
import { useMotion } from '@/hooks/useMotion';
import { ChapterLabel } from '@/components/ui/ChapterLabel';
import { Container } from '@/components/ui/Container';
import { Tag } from '@/components/ui/Tag';
import { Card } from '@/components/ui/Card';
import { Sparkles, ArrowDown, HelpCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

export interface Chapter01CuriosityProps {
  chapter: Chapter;
}

export function Chapter01Curiosity({ chapter }: Chapter01CuriosityProps) {
  const { motionEnabled, prefersReducedMotion } = useMotion();
  const sceneRef = useRef<HTMLDivElement>(null);
  const pinContentRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const isReduced = prefersReducedMotion || !motionEnabled;

  const narrationLines = [
    "I've always been fascinated by understanding how things work.",
    "But eventually, understanding wasn't enough.",
    'I wanted to create things myself.',
  ];

  const slots = chapter.curiositySlots || [
    {
      id: 'slot-spark',
      label: 'THE SPARK',
      question: 'What first sparked curiosity?',
      visualType: 'gear' as const,
      placeholder:
        '[TODO: Chinmoy to supply: what first sparked curiosity — e.g. taking apart electronics, questioning how machines think]',
    },
    {
      id: 'slot-first-build',
      label: 'FIRST CREATION',
      question: 'A first thing I built',
      visualType: 'circuit' as const,
      placeholder:
        '[TODO: Chinmoy to supply: a first thing I built — e.g. an early C script, electronic circuit, game prototype, or web tool]',
    },
    {
      id: 'slot-fuel',
      label: 'PERPETUAL DRIVE',
      question: 'What keeps me experimenting?',
      visualType: 'sketch' as const,
      placeholder:
        '[TODO: Chinmoy to supply: what keeps me experimenting — e.g. the obsession with bringing imagined systems into tangible reality]',
    },
  ];

  // GSAP ScrollTrigger for pinned scrubbed narrative progression
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
      end: '+=160%',
      pin: contentEl,
      pinSpacing: true,
      scrub: 0.6,
      onUpdate: (self) => {
        setScrollProgress(self.progress);
      },
    });

    return () => {
      trigger.kill();
    };
  }, [isReduced]);

  // Derived progress milestones
  // 0.00 - 0.35: SubtitleReveal narration plays
  // 0.30 - 0.55: Slot 1 (Gear) resolves & draws
  // 0.50 - 0.75: Slot 2 (Circuit) resolves & draws
  // 0.70 - 0.95: Slot 3 (Sketch) resolves & draws
  // 0.85 - 1.00: BridgeToNext reveals

  const activeNarrationIndex = isReduced
    ? narrationLines.length - 1
    : Math.min(
        narrationLines.length - 1,
        Math.floor((scrollProgress / 0.4) * narrationLines.length)
      );

  const getSlotProgress = (index: number) => {
    if (isReduced) return 1;
    const starts = [0.25, 0.48, 0.7];
    const ends = [0.48, 0.7, 0.92];
    const s = starts[index];
    const e = ends[index];
    if (scrollProgress < s) return 0;
    if (scrollProgress > e) return 1;
    return (scrollProgress - s) / (e - s);
  };

  return (
    <article
      id={chapter.id}
      data-chapter="1"
      data-accent="gold"
      aria-labelledby="chapter-01-heading"
      className="relative w-full border-t border-theme-border transition-colors duration-300"
    >
      <div ref={sceneRef} className="relative w-full">
        <div
          ref={pinContentRef}
          className="w-full min-h-screen py-16 flex flex-col justify-between bg-theme-bg/95 relative overflow-hidden"
        >
          {/* Subtle Golden Radial Wash */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_50%_20%,var(--wash),transparent_70%)] opacity-80"
          />

          {/* Chapter Metadata Header */}
          <Container size="lg" className="relative z-10 w-full">
            <div className="flex items-center justify-between border-b border-theme-border pb-4 flex-wrap gap-3">
              <ChapterLabel chapter="01" timecode="00:06:00" arc={chapter.emotionalArc} />

              <div className="flex items-center gap-2">
                <Tag variant="ember" size="sm">
                  3 Open Inquiries
                </Tag>
                <Tag variant="gold" size="sm">
                  INTIMATE & HUMAN
                </Tag>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <h2
                id="chapter-01-heading"
                className="text-fluid-h1 font-serif font-black tracking-tight text-theme-text"
              >
                {chapter.title}
              </h2>
              <span className="text-xs font-mono text-theme-muted uppercase tracking-wider">
                Movement I · Observation to Creation
              </span>
            </div>
          </Container>

          {/* Main Stage: Subtitle Narration + Interactive 3-Slot Visual Progression */}
          <Container size="lg" className="relative z-10 w-full my-auto py-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column (5 cols): Scrubbed Subtitle Narration */}
              <div className="lg:col-span-5 space-y-6">
                <div className="text-xs font-mono uppercase tracking-widest text-chapter-accent font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-chapter-accent animate-pulse" />
                  Voiceover Narration
                </div>

                <div className="space-y-4 font-serif italic" aria-live="polite">
                  {narrationLines.map((line, idx) => {
                    const isPassed = isReduced || idx <= activeNarrationIndex;
                    const isCurrent = isReduced || idx === activeNarrationIndex;

                    return (
                      <p
                        key={idx}
                        className={cn(
                          'text-fluid-narration sm:text-2xl transition-all duration-300 leading-snug',
                          isCurrent
                            ? 'text-theme-text font-medium opacity-100 translate-x-1'
                            : isPassed
                              ? 'text-theme-muted opacity-50'
                              : 'text-theme-muted/30 opacity-20'
                        )}
                      >
                        &ldquo;{line}&rdquo;
                      </p>
                    );
                  })}
                </div>

                <p className="text-xs font-sans text-theme-muted leading-relaxed pt-2">
                  This movement is not an inventory of credentials, but an intimate reflection on
                  what turns an inquisitive observer into a deliberate builder.
                </p>

                {/* Progress bar indicator */}
                <div className="w-full bg-theme-border rounded-full h-1 overflow-hidden">
                  <div
                    className="bg-chapter-accent h-full transition-all duration-150"
                    style={{ width: `${Math.round(scrollProgress * 100)}%` }}
                  />
                </div>
              </div>

              {/* Right Column (7 cols): The 3 Curiosity Slots with Drawing SVG Diagrams */}
              <div className="lg:col-span-7 space-y-4">
                {slots.map((slot, index) => {
                  const progress = getSlotProgress(index);
                  const isVisible = isReduced || progress > 0.05;
                  const dashoffset = isReduced ? 0 : Math.max(0, 320 * (1 - progress));

                  return (
                    <Card
                      key={slot.id}
                      className={cn(
                        'p-5 transition-all duration-500 border rounded-2xl relative overflow-hidden',
                        isVisible
                          ? 'opacity-100 translate-y-0 border-theme-border bg-theme-surface/90 shadow-md'
                          : 'opacity-25 translate-y-4 border-transparent bg-theme-surface/20'
                      )}
                    >
                      <div className="flex items-start gap-4">
                        {/* Dynamic Drawing SVG Diagram */}
                        <div
                          aria-hidden="true"
                          className="w-14 h-14 shrink-0 rounded-xl bg-theme-surface-elevated border border-theme-border flex items-center justify-center text-chapter-accent"
                        >
                          {slot.visualType === 'gear' && (
                            <svg
                              viewBox="0 0 100 100"
                              className="w-10 h-10 transition-transform duration-300"
                              style={{
                                transform: `rotate(${progress * 90}deg)`,
                              }}
                            >
                              <path
                                d="M45,12 L55,12 L57,20 L66,24 L73,19 L80,26 L75,33 L79,42 L87,44 L87,54 L79,56 L75,65 L80,72 L73,79 L66,74 L57,78 L55,86 L45,86 L43,78 L34,74 L27,79 L20,72 L25,65 L21,56 L13,54 L13,44 L21,42 L25,33 L20,26 L27,19 L34,24 L43,20 Z"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeDasharray="320"
                                strokeDashoffset={dashoffset}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <circle
                                cx="50"
                                cy="50"
                                r="12"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeDasharray="100"
                                strokeDashoffset={dashoffset}
                              />
                              <circle
                                cx="50"
                                cy="50"
                                r="4"
                                fill="currentColor"
                                opacity={progress}
                              />
                            </svg>
                          )}

                          {slot.visualType === 'circuit' && (
                            <svg viewBox="0 0 100 100" className="w-10 h-10">
                              <path
                                d="M12,50 L38,50 L52,24 L76,24 L86,34 L86,66 L70,82 L38,82 L26,70"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeDasharray="320"
                                strokeDashoffset={dashoffset}
                                strokeLinecap="round"
                              />
                              <path
                                d="M52,24 L52,14 L68,14"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeDasharray="100"
                                strokeDashoffset={dashoffset}
                              />
                              <circle
                                cx="12"
                                cy="50"
                                r="3.5"
                                fill="currentColor"
                                opacity={progress}
                              />
                              <circle
                                cx="86"
                                cy="66"
                                r="3.5"
                                fill="currentColor"
                                opacity={progress}
                              />
                              <circle
                                cx="26"
                                cy="70"
                                r="3.5"
                                fill="currentColor"
                                opacity={progress}
                              />
                            </svg>
                          )}

                          {slot.visualType === 'sketch' && (
                            <svg viewBox="0 0 100 100" className="w-10 h-10">
                              <path
                                d="M16,78 C30,22 70,22 84,78"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeDasharray="320"
                                strokeDashoffset={dashoffset}
                                strokeLinecap="round"
                              />
                              <path
                                d="M10,50 L90,50"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeDasharray="4 4"
                                opacity={progress * 0.7}
                              />
                              <circle
                                cx="50"
                                cy="50"
                                r="26"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeDasharray="200"
                                strokeDashoffset={dashoffset}
                              />
                              <circle
                                cx="50"
                                cy="50"
                                r="3"
                                fill="currentColor"
                                opacity={progress}
                              />
                            </svg>
                          )}
                        </div>

                        {/* Slot Information */}
                        <div className="space-y-1.5 flex-1">
                          <div className="flex items-center justify-between text-[11px] font-mono">
                            <span className="text-chapter-accent font-semibold tracking-wider uppercase">
                              Slot 0{index + 1} · {slot.label}
                            </span>
                            <span className="text-theme-ember font-medium flex items-center gap-1">
                              <HelpCircle className="w-3 h-3" />
                              [TODO: Chinmoy to supply]
                            </span>
                          </div>

                          <h3 className="font-serif font-bold text-base text-theme-text">
                            {slot.question}
                          </h3>

                          <div className="p-2.5 rounded-lg bg-theme-surface-elevated/70 border border-theme-border/70 text-xs font-mono text-theme-muted leading-relaxed">
                            {slot.placeholder}
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          </Container>

          {/* Narrative Bridge to Chapter 02 */}
          <Container size="lg" className="relative z-10 w-full pt-4">
            <div
              className={cn(
                'p-4 rounded-2xl bg-theme-surface border border-theme-border flex items-center justify-between flex-wrap gap-3 transition-all duration-500',
                isReduced || scrollProgress > 0.8
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-40 translate-y-2'
              )}
            >
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-chapter-accent shrink-0 mt-0.5" />
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-widest text-theme-muted">
                    Narrative Bridge &rarr; Movement II
                  </div>
                  <p className="text-xs sm:text-sm font-serif italic text-theme-text mt-0.5">
                    &ldquo;{chapter.bridgeToNext}&rdquo;
                  </p>
                </div>
              </div>

              <a
                href="#chapter-02"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-chapter-accent hover:underline font-semibold"
              >
                <span>Continue to Chapter 02</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </a>
            </div>
          </Container>
        </div>
      </div>
    </article>
  );
}
