'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Chapter } from '@/content/chapters';
import { useMotion } from '@/hooks/useMotion';
import { ChapterLabel } from '@/components/ui/ChapterLabel';
import { Container } from '@/components/ui/Container';
import { Tag } from '@/components/ui/Tag';
import { Card } from '@/components/ui/Card';
import { Sparkles, ArrowDown, HelpCircle, Layers, Cpu, Palette, Compass } from 'lucide-react';
import { DirectorsCommentary } from '@/components/polish/DirectorsCommentary';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

export interface Chapter02WorldsProps {
  chapter: Chapter;
}

export function Chapter02Worlds({ chapter }: Chapter02WorldsProps) {
  const { motionEnabled, prefersReducedMotion } = useMotion();
  const sceneRef = useRef<HTMLDivElement>(null);
  const pinContentRef = useRef<HTMLDivElement>(null);
  const [convergenceProgress, setConvergenceProgress] = useState(0);

  const isReduced = prefersReducedMotion || !motionEnabled;

  const identities = chapter.convergingIdentities || [
    {
      id: 'the-builder',
      role: 'The Builder',
      accent: 'azure' as const,
      description: 'Architecting resilient full-stack systems and production foundations.',
      feedsOthers:
        'Lays the robust infrastructure and scalable mechanics that turn abstract reasoning into reliable products.',
      isPlaceholder: true,
    },
    {
      id: 'the-engineer-of-intelligence',
      role: 'The Engineer of Intelligence',
      accent: 'iris' as const,
      description:
        'Designing autonomous agent workflows, machine learning models, and cognitive systems.',
      feedsOthers:
        'Injects adaptive intelligence and reasoning loops into the builder’s static architectures.',
      isPlaceholder: true,
    },
    {
      id: 'the-visual-thinker',
      role: 'The Visual Thinker',
      accent: 'rose' as const,
      description:
        'Crafting spatial interfaces, fluid motion choreography, and tactile typography.',
      feedsOthers:
        'Gives intelligent systems a human, emotional voice, turning invisible logic into intuitive clarity.',
      isPlaceholder: true,
    },
    {
      id: 'the-explorer',
      role: 'The Explorer',
      accent: 'ember' as const,
      description:
        'Investigating decentralized topologies, civic technology, and community resilience.',
      feedsOthers:
        'Pushes systems into unmapped public frontiers, testing whether technology truly serves real people.',
      isPlaceholder: true,
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
      end: '+=160%',
      pin: contentEl,
      pinSpacing: true,
      scrub: 0.6,
      onUpdate: (self) => {
        setConvergenceProgress(self.progress);
      },
    });

    return () => {
      trigger.kill();
    };
  }, [isReduced]);

  const p = isReduced ? 1 : convergenceProgress;

  // Visual Coordinates in 400x400 viewBox:
  // Starts separate at corners, converges to (200, 200)
  const spread = (1 - p) * 95; // 95 distance at start, 0 at full convergence
  const center = 200;

  const p1 = { x: center - spread, y: center - spread }; // Azure (Builder): Top-Left
  const p2 = { x: center + spread, y: center - spread }; // Iris (Intelligence): Top-Right
  const p3 = { x: center + spread, y: center + spread }; // Rose (Visual): Bottom-Right
  const p4 = { x: center - spread, y: center + spread }; // Ember (Explorer): Bottom-Left

  return (
    <article
      id={chapter.id}
      data-chapter="2"
      data-accent="all"
      aria-labelledby="chapter-02-heading"
      className="relative w-full border-t border-theme-border transition-colors duration-300"
    >
      <div ref={sceneRef} className="relative w-full">
        <div
          ref={pinContentRef}
          className="w-full min-h-screen py-16 flex flex-col justify-between bg-theme-bg/95 relative overflow-hidden"
        >
          {/* Chromatic Multi-Tone Wash: Azure, Iris, Rose, Ember convergence */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 opacity-70 bg-[radial-gradient(ellipse_at_30%_30%,rgba(2,132,199,0.06)_0%,transparent_60%),radial-gradient(ellipse_at_70%_30%,rgba(124,58,237,0.06)_0%,transparent_60%),radial-gradient(ellipse_at_70%_70%,rgba(225,29,72,0.06)_0%,transparent_60%),radial-gradient(ellipse_at_30%_70%,rgba(194,65,12,0.06)_0%,transparent_60%)]"
          />

          {/* Chapter Metadata Header */}
          <Container size="lg" className="relative z-10 w-full">
            <div className="flex items-center justify-between border-b border-theme-border pb-4 flex-wrap gap-3">
              <ChapterLabel chapter="02" timecode="00:12:00" arc={chapter.emotionalArc} />

              <div className="flex items-center gap-2">
                <Tag variant="azure" size="sm">
                  Builder
                </Tag>
                <Tag variant="iris" size="sm">
                  Intelligence
                </Tag>
                <Tag variant="rose" size="sm">
                  Visual
                </Tag>
                <Tag variant="ember" size="sm">
                  Explorer
                </Tag>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <h2
                id="chapter-02-heading"
                className="text-fluid-h1 font-serif font-black tracking-tight text-theme-text"
              >
                {chapter.title}
              </h2>
              <span className="text-xs font-mono text-theme-muted uppercase tracking-wider">
                Movement II · The Convergence
              </span>
            </div>
          </Container>

          {/* Main Stage: Convergence Visualization + Interlocking Identity Matrix */}
          <Container size="lg" className="relative z-10 w-full my-auto py-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column (5 cols): Central Thesis + SVG Convergence Canvas */}
              <div className="lg:col-span-5 flex flex-col items-center text-center space-y-6">
                <div className="space-y-3">
                  <span className="text-xs font-mono uppercase tracking-widest text-chapter-accent font-semibold inline-block">
                    Synthesis of Worlds
                  </span>
                  <blockquote className="text-fluid-narration sm:text-2xl font-serif italic text-theme-text leading-snug">
                    &ldquo;I didn&apos;t want to choose between technology and creativity. I wanted
                    to explore both.&rdquo;
                  </blockquote>
                  <p className="text-xs text-theme-muted max-w-md mx-auto leading-relaxed">
                    Rejecting false dichotomies. Engineering without aesthetics is brute utility;
                    design without deep systems architecture is hollow decoration.
                  </p>
                </div>

                {/* SVG 4-Form Convergence Artifact */}
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 my-2 flex items-center justify-center">
                  <svg
                    viewBox="0 0 400 400"
                    className="w-full h-full overflow-visible select-none drop-shadow-lg"
                    aria-label="Interactive convergence of Builder, Intelligence, Visual, and Explorer identities threaded by gold spine"
                  >
                    <defs>
                      <filter id="glow-blur" x="-30%" y="-30%" width="160%" height="160%">
                        <feGaussianBlur stdDeviation="8" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                    </defs>

                    {/* Gold Thread Passing Through All Four Forms */}
                    <path
                      d={`M ${p1.x} ${p1.y} C ${p1.x + 30} ${p1.y}, ${p2.x - 30} ${p2.y}, ${p2.x} ${p2.y} C ${p2.x} ${p2.y + 30}, ${p3.x} ${p3.y - 30}, ${p3.x} ${p3.y} C ${p3.x - 30} ${p3.y}, ${p4.x + 30} ${p4.y}, ${p4.x} ${p4.y} C ${p4.x} ${p4.y - 30}, ${p1.x} ${p1.y + 30}, ${p1.x} ${p1.y} Z`}
                      fill="none"
                      stroke="var(--color-gold)"
                      strokeWidth={3 + p * 2}
                      strokeDasharray={p > 0.8 ? 'none' : '6 4'}
                      opacity={0.85}
                    />

                    {/* Form 1: The Builder (Azure) */}
                    <g transform={`translate(${p1.x}, ${p1.y})`} filter="url(#glow-blur)">
                      <circle
                        r={40 - p * 6}
                        fill="var(--color-azure)"
                        fillOpacity={0.25 + p * 0.15}
                        stroke="var(--color-azure)"
                        strokeWidth="2.5"
                      />
                      <rect
                        x="-10"
                        y="-10"
                        width="20"
                        height="20"
                        rx="3"
                        fill="none"
                        stroke="var(--color-azure)"
                        strokeWidth="2"
                        transform={`rotate(${p * 45})`}
                      />
                    </g>

                    {/* Form 2: The Engineer of Intelligence (Iris) */}
                    <g transform={`translate(${p2.x}, ${p2.y})`} filter="url(#glow-blur)">
                      <circle
                        r={40 - p * 6}
                        fill="var(--color-iris)"
                        fillOpacity={0.25 + p * 0.15}
                        stroke="var(--color-iris)"
                        strokeWidth="2.5"
                      />
                      <circle r="8" fill="none" stroke="var(--color-iris)" strokeWidth="2" />
                      <circle cx="0" cy="0" r="3" fill="var(--color-iris)" />
                    </g>

                    {/* Form 3: The Visual Thinker (Rose) */}
                    <g transform={`translate(${p3.x}, ${p3.y})`} filter="url(#glow-blur)">
                      <circle
                        r={40 - p * 6}
                        fill="var(--color-rose)"
                        fillOpacity={0.25 + p * 0.15}
                        stroke="var(--color-rose)"
                        strokeWidth="2.5"
                      />
                      <polygon
                        points="0,-12 10,8 -10,8"
                        fill="none"
                        stroke="var(--color-rose)"
                        strokeWidth="2"
                        transform={`rotate(${p * -60})`}
                      />
                    </g>

                    {/* Form 4: The Explorer (Ember) */}
                    <g transform={`translate(${p4.x}, ${p4.y})`} filter="url(#glow-blur)">
                      <circle
                        r={40 - p * 6}
                        fill="var(--color-ember)"
                        fillOpacity={0.25 + p * 0.15}
                        stroke="var(--color-ember)"
                        strokeWidth="2.5"
                      />
                      <circle r="6" fill="none" stroke="var(--color-ember)" strokeWidth="2" />
                      <line
                        x1="-10"
                        y1="0"
                        x2="10"
                        y2="0"
                        stroke="var(--color-ember)"
                        strokeWidth="2"
                      />
                      <line
                        x1="0"
                        y1="-10"
                        x2="0"
                        y2="10"
                        stroke="var(--color-ember)"
                        strokeWidth="2"
                      />
                    </g>

                    {/* Central Converged Nucleus (Emerges as p -> 1) */}
                    {p > 0.3 && (
                      <g transform={`translate(${center}, ${center})`}>
                        <circle
                          r={18 * p}
                          fill="var(--color-gold)"
                          fillOpacity={0.4 * p}
                          stroke="var(--color-gold)"
                          strokeWidth="2"
                        />
                        <circle r={5 * p} fill="var(--color-gold)" />
                      </g>
                    )}
                  </svg>
                </div>

                <div className="flex items-center gap-2 text-[11px] font-mono text-theme-muted">
                  <span>Separate Facets</span>
                  <div className="w-16 h-1 bg-theme-border rounded-full overflow-hidden">
                    <div
                      className="h-full bg-chapter-accent transition-all duration-150"
                      style={{ width: `${Math.round(p * 100)}%` }}
                    />
                  </div>
                  <span className="font-semibold text-theme-text">Unified Lens</span>
                </div>
              </div>

              {/* Right Column (7 cols): Interlocking Identities Matrix */}
              <div className="lg:col-span-7 space-y-3.5">
                <div className="text-xs font-mono uppercase tracking-widest text-theme-muted flex items-center justify-between pb-1 border-b border-theme-border">
                  <span>Interlocking Identities · How Each Feeds The Others</span>
                  <span className="text-theme-ember font-semibold text-[11px]">
                    NOT Skill Badges
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {identities.map((item, idx) => {
                    const icons = [
                      <Layers key="builder" className="w-4 h-4 text-theme-azure shrink-0" />,
                      <Cpu key="intel" className="w-4 h-4 text-theme-iris shrink-0" />,
                      <Palette key="visual" className="w-4 h-4 text-theme-rose shrink-0" />,
                      <Compass key="explorer" className="w-4 h-4 text-theme-ember shrink-0" />,
                    ];

                    const tagVariants = ['azure', 'iris', 'rose', 'ember'] as const;

                    return (
                      <Card
                        key={item.id}
                        className={cn(
                          'p-4.5 rounded-xl border transition-all duration-300',
                          'bg-theme-surface hover:bg-theme-surface-elevated'
                        )}
                      >
                        <div className="flex items-start justify-between gap-3 mb-1.5">
                          <div className="flex items-center gap-2">
                            {icons[idx]}
                            <h3 className="font-serif font-bold text-base text-theme-text">
                              {item.role}
                            </h3>
                          </div>

                          <Tag variant={tagVariants[idx]} size="sm">
                            {item.accent.toUpperCase()}
                          </Tag>
                        </div>

                        <p className="text-xs text-theme-muted mb-2.5 leading-relaxed">
                          {item.description}
                        </p>

                        {/* Crucial: How it feeds the other disciplines */}
                        <div className="p-2.5 rounded-lg bg-theme-surface-elevated border border-theme-border text-xs leading-relaxed">
                          <span className="font-semibold text-theme-text font-mono text-[11px] uppercase tracking-wider block mb-0.5">
                            How this feeds the others:
                          </span>
                          <span className="text-theme-muted font-sans italic">
                            &ldquo;{item.feedsOthers}&rdquo;
                          </span>
                        </div>

                        {item.isPlaceholder && (
                          <div className="mt-2 text-[10px] font-mono text-theme-ember flex items-center gap-1">
                            <HelpCircle className="w-3 h-3" />
                            [TODO: Chinmoy can refine personal disciplinary connections]
                          </div>
                        )}
                      </Card>
                    );
                  })}
                </div>

                {/* Director's Behind-The-Scenes Commentary */}
                <DirectorsCommentary id="chapter-02" />
              </div>
            </div>
          </Container>

          {/* Narrative Bridge to Chapter 03 */}
          <Container size="lg" className="relative z-10 w-full pt-4">
            <div
              className={cn(
                'p-4 rounded-2xl bg-theme-surface border border-theme-border flex items-center justify-between flex-wrap gap-3 transition-all duration-500',
                isReduced || p > 0.85 ? 'opacity-100 translate-y-0' : 'opacity-40 translate-y-2'
              )}
            >
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-chapter-accent shrink-0 mt-0.5" />
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-widest text-theme-muted">
                    Narrative Bridge &rarr; Movement III
                  </div>
                  <p className="text-xs sm:text-sm font-serif italic text-theme-text mt-0.5">
                    &ldquo;{chapter.bridgeToNext}&rdquo;
                  </p>
                </div>
              </div>

              <a
                href="#chapter-03"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-chapter-accent hover:underline font-semibold"
              >
                <span>Continue to Chapter 03</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </a>
            </div>
          </Container>
        </div>
      </div>
    </article>
  );
}
