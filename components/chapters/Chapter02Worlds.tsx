'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Chapter } from '@/content/chapters';
import { useMotion } from '@/hooks/useMotion';
import { DirectorsCommentary } from '@/components/polish/DirectorsCommentary';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

export interface Chapter02WorldsProps {
  chapter: Chapter;
}

export function Chapter02Worlds({ chapter }: Chapter02WorldsProps) {
  const { motionEnabled, prefersReducedMotion } = useMotion();
  const sceneRef = useRef<HTMLElement>(null);
  const pinContentRef = useRef<HTMLDivElement>(null);
  const [convergenceProgress, setConvergenceProgress] = useState(0);

  const isReduced = prefersReducedMotion || !motionEnabled;

  const narration =
    chapter.summary ||
    "I eventually realised that I didn't want to choose between technology and creativity. I wanted to explore both.";

  const identities = [
    {
      id: 'the-builder',
      role: 'The Builder',
      accentVar: 'var(--color-azure)',
      textColor: 'text-theme-azure',
      accentKey: 'azure' as const,
      description: 'Architecting resilient full-stack systems and production foundations.',
      feedsOthers:
        'Lays the robust infrastructure and scalable mechanics that turn abstract reasoning into reliable products.',
    },
    {
      id: 'the-engineer-of-intelligence',
      role: 'The Engineer of Intelligence',
      accentVar: 'var(--color-iris)',
      textColor: 'text-theme-iris',
      accentKey: 'iris' as const,
      description:
        'Designing autonomous agent workflows, machine learning models, and cognitive systems.',
      feedsOthers:
        'Injects adaptive intelligence and reasoning loops into the builder’s static architectures.',
    },
    {
      id: 'the-visual-thinker',
      role: 'The Visual Thinker',
      accentVar: 'var(--color-rose)',
      textColor: 'text-theme-rose',
      accentKey: 'rose' as const,
      description:
        'Crafting spatial interfaces, fluid motion choreography, and tactile typography.',
      feedsOthers:
        'Gives intelligent systems a human, emotional voice, turning invisible logic into intuitive clarity.',
    },
    {
      id: 'the-explorer',
      role: 'The Explorer',
      accentVar: 'var(--color-ember)',
      textColor: 'text-theme-ember',
      accentKey: 'ember' as const,
      description:
        'Investigating decentralized topologies, civic technology, and community resilience.',
      feedsOthers:
        'Pushes systems into unmapped public frontiers, testing whether technology truly serves real people.',
    },
  ];

  useEffect(() => {
    const triggerEl = sceneRef.current;
    const contentEl = pinContentRef.current;
    if (!triggerEl || !contentEl) return;

    if (isReduced) {
      setConvergenceProgress(1);
      return;
    }

    const trigger = ScrollTrigger.create({
      trigger: triggerEl,
      start: 'top top',
      end: '+=180%',
      pin: contentEl,
      pinSpacing: true,
      scrub: 0.5,
      onUpdate: (self) => {
        setConvergenceProgress(self.progress);
      },
    });

    return () => {
      trigger.kill();
    };
  }, [isReduced]);

  const p = isReduced ? 1 : convergenceProgress;

  // Active identity focus index based on scroll
  const activeIndex = isReduced ? -1 : Math.min(3, Math.floor(p * 4));

  // Visual Coordinates in 360x360 SVG stage
  // Starts spread at distance 90 from center (180, 180), converges to distance 20
  const center = 180;
  const spread = (1 - p) * 90 + 20;

  const p1 = { x: center - spread, y: center - spread }; // Azure (Builder)
  const p2 = { x: center + spread, y: center - spread }; // Iris (Intelligence)
  const p3 = { x: center + spread, y: center + spread }; // Rose (Visual)
  const p4 = { x: center - spread, y: center + spread }; // Ember (Explorer)

  return (
    <article
      ref={sceneRef}
      id={chapter.id}
      data-chapter="2"
      data-accent="all"
      aria-label="Chapter 02: I Found More Than One World"
      className="relative w-full border-t border-theme-border/40 transition-colors duration-300"
    >
      <div
        ref={pinContentRef}
        className="w-full min-h-[100svh] flex flex-col justify-between py-12 sm:py-16 px-6 sm:px-12 relative overflow-hidden"
      >
        {/* Top: Chapter Identity (Rule 2: One label only) */}
        <header className="relative z-10 max-w-5xl mx-auto w-full flex items-baseline justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-chapter-accent font-medium">
              CHAPTER 02
            </span>
            <span className="text-theme-muted/40 font-mono text-xs" aria-hidden="true">
              ·
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-theme-muted">
              {chapter.title}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <DirectorsCommentary id="chapter-02" />
          </div>
        </header>

        {/* Center: Narration + SVG Convergence Visual + Identity Details */}
        <div className="relative z-10 max-w-5xl mx-auto w-full my-auto py-8">
          {/* Accessible screen-reader text in natural reading order */}
          <div className="sr-only">
            <h2>{chapter.title}</h2>
            <p>{narration}</p>
            <ul>
              {identities.map((item) => (
                <li key={item.id}>
                  <strong>{item.role}</strong>: {item.description} How this feeds the others:{' '}
                  {item.feedsOthers}
                </li>
              ))}
            </ul>
            <p>{chapter.bridgeToNext}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Narration and Convergence Visual (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              <p className="font-serif text-fluid-narration sm:text-3xl text-theme-text max-w-[28ch] leading-[1.35]">
                &ldquo;{narration}&rdquo;
              </p>

              {/* 4 Glowing Forms Convergence Stage */}
              <div
                aria-hidden="true"
                className="relative w-64 h-64 sm:w-72 sm:h-72 mx-auto lg:mx-0 select-none"
              >
                <svg
                  viewBox="0 0 360 360"
                  className="w-full h-full overflow-visible"
                  aria-hidden="true"
                >
                  <defs>
                    <filter id="ch02-glow" x="-40%" y="-40%" width="180%" height="180%">
                      <feGaussianBlur stdDeviation="6" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Gold thread passing through all 4 forms, tightening inward */}
                  <path
                    d={`M ${p1.x} ${p1.y} Q ${center} ${p1.y}, ${p2.x} ${p2.y} Q ${p2.x} ${center}, ${p3.x} ${p3.y} Q ${center} ${p3.y}, ${p4.x} ${p4.y} Q ${p4.x} ${center}, ${p1.x} ${p1.y}`}
                    fill="none"
                    stroke="var(--color-gold)"
                    strokeWidth={2 + p * 1.5}
                    strokeDasharray={p > 0.85 ? 'none' : '4 3'}
                    opacity={0.7 + p * 0.3}
                  />

                  {/* Form 1: The Builder (Azure) */}
                  <g transform={`translate(${p1.x}, ${p1.y})`} filter="url(#ch02-glow)">
                    <circle
                      r={30 - p * 6}
                      fill="var(--color-azure)"
                      fillOpacity={0.25 + p * 0.15}
                      stroke="var(--color-azure)"
                      strokeWidth="2"
                    />
                    <rect
                      x="-8"
                      y="-8"
                      width="16"
                      height="16"
                      rx="2"
                      fill="none"
                      stroke="var(--color-azure)"
                      strokeWidth="1.5"
                      transform={`rotate(${p * 45})`}
                    />
                  </g>

                  {/* Form 2: The Engineer of Intelligence (Iris) */}
                  <g transform={`translate(${p2.x}, ${p2.y})`} filter="url(#ch02-glow)">
                    <circle
                      r={30 - p * 6}
                      fill="var(--color-iris)"
                      fillOpacity={0.25 + p * 0.15}
                      stroke="var(--color-iris)"
                      strokeWidth="2"
                    />
                    <circle r="6" fill="none" stroke="var(--color-iris)" strokeWidth="1.5" />
                    <circle cx="0" cy="0" r="2.5" fill="var(--color-iris)" />
                  </g>

                  {/* Form 3: The Visual Thinker (Rose) */}
                  <g transform={`translate(${p3.x}, ${p3.y})`} filter="url(#ch02-glow)">
                    <circle
                      r={30 - p * 6}
                      fill="var(--color-rose)"
                      fillOpacity={0.25 + p * 0.15}
                      stroke="var(--color-rose)"
                      strokeWidth="2"
                    />
                    <polygon
                      points="0,-8 7,6 -7,6"
                      fill="none"
                      stroke="var(--color-rose)"
                      strokeWidth="1.5"
                      transform={`rotate(${p * -45})`}
                    />
                  </g>

                  {/* Form 4: The Explorer (Ember) */}
                  <g transform={`translate(${p4.x}, ${p4.y})`} filter="url(#ch02-glow)">
                    <circle
                      r={30 - p * 6}
                      fill="var(--color-ember)"
                      fillOpacity={0.25 + p * 0.15}
                      stroke="var(--color-ember)"
                      strokeWidth="2"
                    />
                    <line
                      x1="-7"
                      y1="0"
                      x2="7"
                      y2="0"
                      stroke="var(--color-ember)"
                      strokeWidth="1.5"
                    />
                    <line
                      x1="0"
                      y1="-7"
                      x2="0"
                      y2="7"
                      stroke="var(--color-ember)"
                      strokeWidth="1.5"
                    />
                  </g>

                  {/* Center Convergence Core */}
                  {p > 0.4 && (
                    <g transform={`translate(${center}, ${center})`}>
                      <circle
                        r={12 * p}
                        fill="var(--color-gold)"
                        fillOpacity={0.35 * p}
                        stroke="var(--color-gold)"
                        strokeWidth="1.5"
                      />
                      <circle r={3.5 * p} fill="var(--color-gold)" />
                    </g>
                  )}
                </svg>
              </div>
            </div>

            {/* Right: The 4 Converging Identities (6 cols) - NOT skill cards, pure typography */}
            <div aria-hidden="true" className="lg:col-span-6 space-y-6">
              {identities.map((item, idx) => {
                const isItemActive = isReduced || p > 0.8 || activeIndex === idx;

                return (
                  <div
                    key={item.id}
                    className={cn(
                      'transition-all duration-300 space-y-1.5',
                      isItemActive ? 'opacity-100 translate-x-1' : 'opacity-25'
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: item.accentVar }}
                      />
                      <h3 className="font-serif font-normal text-lg sm:text-xl text-theme-text">
                        {item.role}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-theme-muted leading-relaxed max-w-[42ch]">
                      {item.description}
                    </p>

                    <p className="text-xs font-serif italic text-theme-muted/80 leading-relaxed max-w-[42ch]">
                      &ldquo;{item.feedsOthers}&rdquo;
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom: Narrative Bridge (Rule 5: Quiet first-person line, no box, no label) */}
        <footer className="relative z-10 max-w-5xl mx-auto w-full pt-4">
          <p
            className={cn(
              'text-sm sm:text-base font-serif italic text-theme-muted text-center sm:text-left transition-opacity duration-300',
              p > 0.8 || isReduced ? 'opacity-90' : 'opacity-40'
            )}
          >
            &ldquo;{chapter.bridgeToNext}&rdquo;
          </p>
        </footer>
      </div>
    </article>
  );
}
