'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Chapter } from '@/content/chapters';
import { useMotion } from '@/hooks/useMotion';
import { DirectorsCommentary } from '@/components/polish/DirectorsCommentary';
import { Content } from '@/components/content/Content';
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
      end: '+=120%',
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
              <Content value={chapter.title} />
            </span>
          </div>

          <div className="flex items-center gap-3">
            <DirectorsCommentary id="chapter-02" />
          </div>
        </header>

        {/* Center: Narration + SVG Convergence Visual + Identity Details */}
        <div className="relative z-10 max-w-5xl mx-auto w-full my-auto py-8">
          <div className="sr-only">
            <h2><Content value={chapter.title} /></h2>
            <p><Content value={narration} /></p>
            <p><Content value={chapter.bridge} /></p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Narration and Convergence Visual */}
            <div className="lg:col-span-6 space-y-6">
              <p className="font-serif text-fluid-narration sm:text-3xl text-theme-text max-w-[28ch] leading-[1.35]">
                &ldquo;<Content value={narration} />&rdquo;
              </p>

              {/* 4 Glowing Forms Convergence Stage */}
              <div
                aria-hidden="true"
                className="relative w-full aspect-square max-w-[340px] mx-auto border border-theme-border/50 rounded-full flex items-center justify-center p-6 bg-theme-surface/40 backdrop-blur-xs"
              >
                {/* Center Core Gold Thread Node */}
                <div
                  className="w-4 h-4 rounded-full bg-theme-gold transition-all duration-300"
                  style={{
                    boxShadow: `0 0 ${16 + p * 32}px var(--color-gold)`,
                    transform: `scale(${1 + p * 0.4})`,
                  }}
                />

                {/* 4 Satellites converging inward */}
                {identities.map((item, idx) => {
                  const angle = (idx * Math.PI) / 2 - Math.PI / 4;
                  const maxRadius = 120;
                  const currentRadius = maxRadius * (1 - p * 0.72);
                  const x = Math.cos(angle) * currentRadius;
                  const y = Math.sin(angle) * currentRadius;

                  return (
                    <div
                      key={item.id}
                      className="absolute w-3.5 h-3.5 rounded-full transition-transform duration-100 ease-out flex items-center justify-center"
                      style={{
                        transform: `translate(${x}px, ${y}px)`,
                        backgroundColor: item.accentVar,
                        boxShadow: `0 0 14px ${item.accentVar}`,
                      }}
                    />
                  );
                })}
              </div>
            </div>

            {/* Right: Identities List */}
            <div className="lg:col-span-6 space-y-4">
              {identities.map((item, idx) => {
                const isActive = p > idx * 0.22;
                return (
                  <div
                    key={item.id}
                    className={cn(
                      'p-4 rounded-xl border transition-all duration-300',
                      isActive
                        ? 'border-theme-border bg-theme-surface/60 shadow-sm'
                        : 'border-transparent opacity-60'
                    )}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className={cn('text-xs font-mono uppercase font-semibold', item.textColor)}>
                        {item.role}
                      </span>
                    </div>
                    <p className="text-xs text-theme-text mb-1 leading-relaxed">{item.description}</p>
                    <p className="text-xs font-serif italic text-theme-muted/80 leading-relaxed max-w-[42ch]">
                      &ldquo;{item.feedsOthers}&rdquo;
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom: Narrative Bridge (Rule 5: Quiet first-person line) */}
        <footer className="relative z-10 max-w-5xl mx-auto w-full pt-4">
          <p
            className={cn(
              'text-sm sm:text-base font-serif italic text-theme-muted text-center sm:text-left transition-opacity duration-300',
              p > 0.8 || isReduced ? 'opacity-90' : 'opacity-40'
            )}
          >
            &ldquo;<Content value={chapter.bridge} />&rdquo;
          </p>
        </footer>
      </div>
    </article>
  );
}
