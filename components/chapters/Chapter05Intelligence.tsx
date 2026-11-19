'use client';

import React, { useState, useRef, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Chapter } from '@/content/chapters';
import { aiWork, AIWorkItem } from '@/content/aiWork';
import { useMotion } from '@/hooks/useMotion';
import { Container } from '@/components/ui/Container';
import { Tag } from '@/components/ui/Tag';
import { Card } from '@/components/ui/Card';
import { ChapterTitleCard } from '@/components/motion/ChapterTitleCard';
import { Content } from '@/components/content/Content';
import { isContentRenderable } from '@/content/schema';
import { StaticNetworkFallback } from '@/components/three/StaticNetworkFallback';
import {
  Brain,
  Cpu,
  Layers,
  FlaskConical,
  GraduationCap,
  Telescope,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Dynamically import R3F particle network canvas with SSR disabled & fallback
const DynamicNetworkCanvas = dynamic(
  () => import('@/components/three/IntelligenceNetworkCanvas'),
  {
    ssr: false,
    loading: () => <StaticNetworkFallback />,
  }
);

export interface Chapter05IntelligenceProps {
  chapter: Chapter;
}

export function Chapter05Intelligence({ chapter }: Chapter05IntelligenceProps) {
  const { motionEnabled, prefersReducedMotion } = useMotion();
  const [activeHighlight, setActiveHighlight] = useState<
    'completed' | 'experiments' | 'learning' | 'future' | null
  >(null);
  const [inView, setInView] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const isReduced = prefersReducedMotion || !motionEnabled;
  const showDebug =
    process.env.NODE_ENV !== 'production' &&
    process.env.NEXT_PUBLIC_DEBUG_CONTENT === '1';

  // Viewport intersection observer to pause R3F frameloop off-screen
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Four visibly separate groups from /content/aiWork.ts
  const groups = [
    {
      key: 'completed' as const,
      label: 'Completed AI Engineering Work',
      statusLabel: 'COMPLETED',
      description: 'Production systems, deployed architectures, and verified AI deliverables.',
      icon: <Layers className="w-4 h-4 text-theme-iris shrink-0" />,
      tagVariant: 'gold' as const,
      items: aiWork.completed.filter((i) => isContentRenderable(i.title)),
      placeholderNotice: 'Completed projects pending benchmark verification.',
    },
    {
      key: 'experiments' as const,
      label: 'AI & Agentic Experiments',
      statusLabel: 'EXPERIMENT',
      description:
        'Proof-of-concepts, autonomous multi-agent orchestration, and local inference prototypes.',
      icon: <FlaskConical className="w-4 h-4 text-theme-iris shrink-0" />,
      tagVariant: 'rose' as const,
      items: aiWork.experiments.filter((i) => isContentRenderable(i.title)),
      placeholderNotice: '',
    },
    {
      key: 'learning' as const,
      label: 'Currently Learning & Internalizing',
      statusLabel: 'LEARNING',
      description:
        'Mathematical foundations, alignment mechanics (DPO/RLHF), and GPU compute pipelines.',
      icon: <GraduationCap className="w-4 h-4 text-theme-iris shrink-0" />,
      tagVariant: 'azure' as const,
      items: aiWork.learning.filter((i) => isContentRenderable(i.title)),
      placeholderNotice: '',
    },
    {
      key: 'future' as const,
      label: 'Future Interests & Technical Frontiers',
      statusLabel: 'FUTURE INTEREST',
      description:
        'Neuro-symbolic compilers, verifiable code generation, and ambient edge computing.',
      icon: <Telescope className="w-4 h-4 text-theme-iris shrink-0" />,
      tagVariant: 'ember' as const,
      items: aiWork.future.filter((i) => isContentRenderable(i.title)),
      placeholderNotice: '',
    },
  ];

  // Renderable models & tech
  const renderableModels = aiWork.modelsAndTechnologies.filter(isContentRenderable);

  // Renderable research questions
  const renderableQuestions = aiWork.researchQuestions.filter((q) =>
    isContentRenderable(q.question)
  );

  return (
    <article
      id={chapter.id}
      data-chapter="5"
      data-accent="iris"
      aria-labelledby="chapter-05-heading"
      className="relative w-full border-t border-theme-border transition-colors duration-300"
    >
      <div className="w-full py-16 sm:py-24 relative overflow-hidden">
        {/* Chapter Ambient Wash */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 bg-chapter-wash"
        />

        {/* Chapter Header (Rule 2: One label only, Instrument Serif title) */}
        <Container size="lg" className="relative z-10 w-full mb-12">
          <ChapterTitleCard
            id="chapter-05-heading"
            number={chapter.number}
            title={chapter.title}
            subtitle={chapter.subtitle}
            arc={chapter.emotionalArc}
            accentKey={chapter.accentKey}
          />
        </Container>

        {/* HERO: R3F Particle Network (≤ 6,000 points, paused off-screen) */}
        <Container size="lg" className="relative z-10 w-full mb-16">
          <div
            ref={heroRef}
            className="relative w-full min-h-[380px] sm:min-h-[440px] rounded-3xl bg-theme-surface border border-theme-border shadow-lg overflow-hidden flex flex-col justify-between p-8 sm:p-12"
          >
            {/* 3D Canvas Background (aria-hidden) */}
            <div aria-hidden="true" className="absolute inset-0 z-0 pointer-events-none">
              {isReduced ? (
                <StaticNetworkFallback />
              ) : (
                <Suspense fallback={<StaticNetworkFallback />}>
                  <DynamicNetworkCanvas inView={inView} highlightCategory={activeHighlight} />
                </Suspense>
              )}
            </div>

            <div className="relative z-10 flex items-center justify-between text-xs font-mono text-theme-muted">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-theme-iris animate-pulse" />
                <span>3D PARTICLE TOPOLOGY (≤ 3,600 NODES)</span>
              </div>
              <span className="text-theme-iris font-semibold hidden sm:inline">
                REASONING TOPOLOGY
              </span>
            </div>

            <div className="relative z-10 max-w-2xl my-auto py-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-theme-surface-elevated/90 border border-theme-border text-theme-iris text-xs font-mono">
                <Brain className="w-3.5 h-3.5" />
                <span>Autonomous Systems &amp; Neural Architecture</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-serif font-normal text-theme-text tracking-tight leading-tight">
                From passive code execution to autonomous reasoning loops.
              </h3>
              <p className="text-xs sm:text-sm text-theme-muted font-sans leading-relaxed max-w-xl">
                Honest documentation of what is deployed in production, what is currently an active experiment, and the frontiers being investigated.
              </p>
            </div>

            {/* Interactive Cluster Selector */}
            <div className="relative z-10 flex flex-wrap gap-2 pt-4 border-t border-theme-border">
              {groups.map((group) => (
                <button
                  key={group.key}
                  type="button"
                  onMouseEnter={() => setActiveHighlight(group.key)}
                  onMouseLeave={() => setActiveHighlight(null)}
                  onFocus={() => setActiveHighlight(group.key)}
                  onBlur={() => setActiveHighlight(null)}
                  onClick={() =>
                    setActiveHighlight(activeHighlight === group.key ? null : group.key)
                  }
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-mono transition-all border focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-iris',
                    activeHighlight === group.key
                      ? 'bg-theme-iris text-white border-theme-iris shadow-sm'
                      : 'bg-theme-surface/85 text-theme-muted border-theme-border hover:text-theme-text hover:bg-theme-surface-elevated'
                  )}
                >
                  {group.label.split(' ')[0]} Cluster
                </button>
              ))}
            </div>
          </div>
        </Container>

        {/* FOUR VISIBLY SEPARATE GROUPS (Never merge experiments into completed work) */}
        <Container size="lg" className="relative z-10 w-full mb-16 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {groups.map((group) => {
              const hasItems = group.items.length > 0;

              // Empty groups are hidden in production
              if (!hasItems) {
                if (!showDebug) return null;

                // Quiet dev-only indicator
                return (
                  <div
                    key={group.key}
                    className="p-6 rounded-2xl border border-dashed border-theme-border bg-theme-surface/40 space-y-2 text-xs font-mono text-theme-muted"
                  >
                    <div className="flex items-center gap-2 text-theme-text font-semibold">
                      {group.icon}
                      <span>{group.label}</span>
                    </div>
                    <p className="text-[11px] text-theme-muted">{group.placeholderNotice}</p>
                    <span className="inline-block px-1.5 py-0.5 rounded bg-theme-surface-elevated text-[9px] text-theme-muted">
                      DEV ONLY: Group hidden in production
                    </span>
                  </div>
                );
              }

              return (
                <section
                  key={group.key}
                  aria-labelledby={`group-${group.key}-heading`}
                  className="space-y-4"
                  onMouseEnter={() => setActiveHighlight(group.key)}
                  onMouseLeave={() => setActiveHighlight(null)}
                >
                  <div className="flex items-center justify-between pb-3 border-b border-theme-border flex-wrap gap-2">
                    <div className="flex items-center gap-2.5">
                      {group.icon}
                      <h3
                        id={`group-${group.key}-heading`}
                        className="font-serif font-normal text-lg sm:text-xl text-theme-text"
                      >
                        {group.label}
                      </h3>
                    </div>
                    <Tag variant={group.tagVariant} size="sm">
                      {group.statusLabel}
                    </Tag>
                  </div>

                  <p className="text-xs text-theme-muted leading-relaxed font-sans">
                    {group.description}
                  </p>

                  <div className="space-y-4 pt-1">
                    {group.items.map((item) => (
                      <Card
                        key={item.id}
                        withWash
                        hoverEffect
                        className={cn(
                          'p-5 border-theme-border/80 bg-theme-surface transition-all duration-300 focus-within:ring-2 focus-within:ring-theme-iris',
                          activeHighlight === group.key ? 'border-theme-iris/40 shadow-sm' : ''
                        )}
                        tabIndex={0}
                        onFocus={() => setActiveHighlight(group.key)}
                        onBlur={() => setActiveHighlight(null)}
                      >
                        <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
                          <h4 className="font-serif font-normal text-base sm:text-lg text-theme-text">
                            <Content value={item.title} />
                          </h4>
                          <Tag variant="default" size="sm">
                            <Content value={item.focusArea} />
                          </Tag>
                        </div>

                        <p className="text-xs text-theme-muted leading-relaxed font-sans">
                          <Content value={item.description} />
                        </p>

                        <div className="mt-3.5 p-3 rounded-lg bg-theme-surface-elevated/70 border border-theme-border text-xs leading-relaxed space-y-1">
                          <span className="font-semibold text-theme-iris font-mono text-[10px] uppercase tracking-wider block">
                            Technical Insight / Goal:
                          </span>
                          <p className="text-theme-text font-serif italic text-xs leading-relaxed">
                            &ldquo;<Content value={item.keyInsightOrGoal} />&rdquo;
                          </p>
                        </div>

                        <div className="mt-3.5 pt-2.5 border-t border-theme-border/60 flex flex-wrap gap-1.5">
                          {item.stack.map((tech, idx) => (
                            <Tag key={idx} variant="default" size="sm">
                              <Content value={tech} />
                            </Tag>
                          ))}
                        </div>
                      </Card>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </Container>

        {/* "MODELS AND TECHNOLOGIES I EXPLORE" (Hidden when empty) */}
        {renderableModels.length > 0 && (
          <Container size="lg" className="relative z-10 w-full mb-12">
            <div className="p-6 sm:p-8 rounded-2xl bg-theme-surface border border-theme-border space-y-4">
              <div className="flex items-center gap-2 border-b border-theme-border pb-3">
                <Cpu className="w-4 h-4 text-theme-iris" />
                <h3 className="font-serif font-normal text-lg sm:text-xl text-theme-text">
                  Models &amp; Technologies I Explore
                </h3>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {renderableModels.map((tech, idx) => (
                  <Tag key={idx} variant="default" size="md">
                    <Content value={tech} />
                  </Tag>
                ))}
              </div>
            </div>
          </Container>
        )}

        {/* "RESEARCH QUESTIONS I'M CURIOUS ABOUT" (Hidden when empty) */}
        {renderableQuestions.length > 0 && (
          <Container size="lg" className="relative z-10 w-full mb-16">
            <div className="p-6 sm:p-8 rounded-2xl bg-theme-surface border border-theme-border space-y-4">
              <div className="flex items-center gap-2 border-b border-theme-border pb-3">
                <HelpCircle className="w-4 h-4 text-theme-iris" />
                <h3 className="font-serif font-normal text-lg sm:text-xl text-theme-text">
                  Research Questions I&apos;m Curious About
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                {renderableQuestions.map((q, idx) => (
                  <div
                    key={q.id}
                    className="p-4 sm:p-5 rounded-xl bg-theme-surface-elevated border border-theme-border space-y-2.5 text-xs flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="text-[10px] font-mono text-theme-iris font-bold uppercase tracking-wider">
                        Inquiry 0{idx + 1}
                      </div>
                      <h4 className="font-serif font-normal text-sm sm:text-base text-theme-text leading-snug">
                        &ldquo;<Content value={q.question} />&rdquo;
                      </h4>
                    </div>
                    <p className="text-theme-muted text-[11px] leading-relaxed pt-2 border-t border-theme-border/60">
                      <Content value={q.context} />
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        )}

        {/* Narrative Bridge to Chapter 06 (Rule 5: Quiet first-person line) */}
        <Container size="lg" className="relative z-10 w-full pt-12 pb-4">
          <p className="text-sm sm:text-base font-serif italic text-theme-muted text-center sm:text-left max-w-2xl leading-relaxed">
            &ldquo;<Content value={chapter.bridge} />&rdquo;
          </p>
        </Container>
      </div>
    </article>
  );
}
