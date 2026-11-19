'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Chapter } from '@/content/chapters';
import { useMotion } from '@/hooks/useMotion';
import { ChapterTitleCard } from '@/components/motion/ChapterTitleCard';
import { Content } from '@/components/content/Content';
import { isContentRenderable } from '@/content/schema';
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
  const narration = chapter.narration[0];

  const identities = [
    {
      id: 'the-builder',
      role: 'The Builder',
      accentVar: 'var(--color-azure)',
      textColor: 'text-theme-azure',
      quadrant: 'top-left',
      description: 'Architecting resilient full-stack systems and production foundations.',
      feedsOthers:
        'Lays the robust infrastructure and scalable mechanics that turn abstract reasoning into reliable products.',
    },
    {
      id: 'the-engineer-of-intelligence',
      role: 'The Engineer of Intelligence',
      accentVar: 'var(--color-iris)',
      textColor: 'text-theme-iris',
      quadrant: 'top-right',
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
      quadrant: 'bottom-left',
      description:
        'Crafting spatial interfaces, fluid motion choreography, and tactile typography.',
      feedsOthers:
        'Gives intelligent systems a human voice, turning invisible logic into intuitive clarity.',
    },
    {
      id: 'the-explorer',
      role: 'The Explorer',
      accentVar: 'var(--color-ember)',
      textColor: 'text-theme-ember',
      quadrant: 'bottom-right',
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
      end: '+=130%',
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

  // The 4 identities appear sequentially in the opening half, then converge inward
  // Convergence factor: 0 (spread out) to 1 (merged into unified nucleus)
  const convergeFactor = Math.max(0, Math.min(1, (p - 0.35) / 0.65));

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
        {/* Top: ChapterTitleCard (Rule 2: One label only, "all" accent convergence) */}
        <div className="relative z-10 max-w-5xl mx-auto w-full">
          <ChapterTitleCard
            number={2}
            title={chapter.title}
            subtitle={chapter.subtitle}
            arc={chapter.emotionalArc}
            accentKey="all"
          />
        </div>

        {/* Center: The Convergence Story Beat (NOT skill cards, NOT a list) */}
        <div className="relative z-10 max-w-5xl mx-auto w-full my-auto py-8">
          <div className="sr-only">
            <h2><Content value={chapter.title} /></h2>
            <p><Content value={narration} /></p>
            {identities.map((item) => (
              <div key={item.id}>
                <h3>{item.role}</h3>
                <p>{item.description}</p>
                <p>{item.feedsOthers}</p>
              </div>
            ))}
            <p><Content value={chapter.bridge} /></p>
          </div>

          {/* Central Narration Statement */}
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <p
              className={cn(
                'font-serif text-fluid-narration sm:text-3xl text-theme-text leading-[1.38] transition-all duration-700',
                p > 0.4 || isReduced ? 'opacity-100 scale-100' : 'opacity-60 scale-[0.98]'
              )}
            >
              &ldquo;<Content value={narration} />&rdquo;
            </p>
          </div>

          {/* Spatial Convergence Stage: 4 Glowing Forms converging into one central gold nucleus */}
          <div
            aria-hidden="true"
            className="relative w-full max-w-3xl mx-auto h-[320px] sm:h-[400px] flex items-center justify-center select-none"
          >
            {/* Continuous Gold Thread Line passing vertically through the epicenter */}
            <div
              className={cn(
                'absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] transition-opacity duration-700',
                p > 0.2 || isReduced ? 'opacity-40' : 'opacity-10'
              )}
              style={{
                background:
                  'linear-gradient(to bottom, transparent, var(--color-thread), transparent)',
              }}
            />

            {/* Central Converged Nucleus: emerges as the 4 identities merge */}
            <div
              className="absolute z-20 w-8 h-8 rounded-full transition-all duration-500 ease-out flex items-center justify-center"
              style={{
                backgroundColor: 'var(--color-thread)',
                boxShadow: `0 0 ${20 + convergeFactor * 45}px var(--color-gold)`,
                transform: `scale(${0.5 + convergeFactor * 0.9})`,
                opacity: 0.3 + convergeFactor * 0.7,
              }}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-theme-bg" />
            </div>

            {/* Four Glowing Forms appearing in 4 quadrants and converging */}
            {identities.map((item, idx) => {
              // Quad layout angles: 0: top-left (-135deg), 1: top-right (-45deg), 2: bottom-left (135deg), 3: bottom-right (45deg)
              const angles = [-2.356, -0.785, 2.356, 0.785];
              const angle = angles[idx];

              // Maximum spread distance from center
              const maxDistX = 220;
              const maxDistY = 130;

              // Distance shrinks as convergeFactor moves to 1
              const currentX = Math.cos(angle) * maxDistX * (1 - convergeFactor * 0.85);
              const currentY = Math.sin(angle) * maxDistY * (1 - convergeFactor * 0.85);

              // Staggered reveal in the first phase
              const isRevealed = p >= idx * 0.1 || isReduced;

              return (
                <div
                  key={item.id}
                  className={cn(
                    'absolute flex flex-col items-center pointer-events-none transition-all duration-300 ease-out',
                    isRevealed ? 'opacity-100' : 'opacity-0 scale-75'
                  )}
                  style={{
                    transform: `translate(${currentX}px, ${currentY}px)`,
                  }}
                >
                  {/* Glowing Core Orb */}
                  <div
                    className="w-5 h-5 rounded-full mb-2 transition-transform duration-300"
                    style={{
                      backgroundColor: item.accentVar,
                      boxShadow: `0 0 20px ${item.accentVar}`,
                      transform: `scale(${1 - convergeFactor * 0.25})`,
                    }}
                  />

                  {/* Identity Name & Description (fades into nucleus label during total merge) */}
                  <div
                    className={cn(
                      'text-center max-w-[190px] sm:max-w-[220px] transition-opacity duration-300',
                      convergeFactor > 0.85 ? 'opacity-25' : 'opacity-100'
                    )}
                  >
                    <span className={cn('block font-mono text-xs uppercase font-bold tracking-wider', item.textColor)}>
                      {item.role}
                    </span>
                    <span className="block text-[11px] font-sans text-theme-text/80 leading-tight mt-0.5">
                      {item.description}
                    </span>
                    {/* Quiet line on how it feeds the others (from /content) */}
                    <span className="block text-[10px] font-serif italic text-theme-muted/80 leading-tight mt-1">
                      &ldquo;{item.feedsOthers}&rdquo;
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom: Unlabeled quiet first-person narrative bridge line (Rule 5) */}
        <footer className="relative z-10 max-w-5xl mx-auto w-full pt-4">
          <p
            className={cn(
              'text-sm sm:text-base font-serif italic text-theme-muted text-center sm:text-left transition-opacity duration-300',
              p > 0.75 || isReduced ? 'opacity-90' : 'opacity-30'
            )}
          >
            &ldquo;<Content value={chapter.bridge} />&rdquo;
          </p>
        </footer>
      </div>
    </article>
  );
}
