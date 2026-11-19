'use client';

import React, { useState, useRef, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Chapter } from '@/content/chapters';
import { aiWork, AIWorkItem } from '@/content/aiWork';
import { useMotion } from '@/hooks/useMotion';
import { Container } from '@/components/ui/Container';
import { Tag } from '@/components/ui/Tag';
import { Card } from '@/components/ui/Card';
import { Content } from '@/components/content/Content';
import { isContentRenderable } from '@/content/schema';
import {
  Brain,
  Cpu,
  Layers,
  FlaskConical,
  GraduationCap,
  Telescope,
  Code2,
  HelpCircle,
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

  // Viewport observer for 3D canvas lifecycle
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

  const sections = [
    {
      key: 'completed' as const,
      label: '1. What I Build / Completed Work',
      description: 'End-to-end deployed systems, production architectures, and real-world tools.',
      icon: <Layers className="w-4 h-4 text-theme-iris shrink-0" />,
      tagVariant: 'gold' as const,
      items: aiWork.completed.filter((i) => isContentRenderable(i.title)),
    },
    {
      key: 'experiments' as const,
      label: '2. What I Experiment With',
      description:
        'Proof-of-concepts, multi-agent orchestrations, and novel retrieval architectures.',
      icon: <FlaskConical className="w-4 h-4 text-theme-iris shrink-0" />,
      tagVariant: 'rose' as const,
      items: aiWork.experiments.filter((i) => isContentRenderable(i.title)),
    },
    {
      key: 'learning' as const,
      label: '3. Currently Learning & Internalizing',
      description:
        'Mathematical foundations, neural architecture mechanics, and deep theoretical study.',
      icon: <GraduationCap className="w-4 h-4 text-theme-iris shrink-0" />,
      tagVariant: 'azure' as const,
      items: aiWork.learning.filter((i) => isContentRenderable(i.title)),
    },
    {
      key: 'future' as const,
      label: '4. Future Interests & Frontiers',
      description:
        'Local-first intelligence, low-parameter edge agents, and private ambient computing.',
      icon: <Telescope className="w-4 h-4 text-theme-iris shrink-0" />,
      tagVariant: 'ember' as const,
      items: aiWork.future.filter((i) => isContentRenderable(i.title)),
    },
  ];

  return (
    <article
      id={chapter.id}
      data-chapter="5"
      data-accent="iris"
      aria-labelledby="chapter-05-heading"
      className="relative w-full border-t border-theme-border transition-colors duration-300"
    >
      <div className="w-full py-16 relative overflow-hidden">
        {/* Chapter Ambient Wash */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 bg-chapter-wash"
        />

        {/* Chapter Metadata Header (Rule 2: One label only) */}
        <Container size="lg" className="relative z-10 w-full mb-12">
          <div className="flex items-center justify-between border-b border-theme-border/60 pb-4 flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-widest text-chapter-accent font-medium">
                CHAPTER 05
              </span>
              <span className="text-theme-muted/40 font-mono text-xs" aria-hidden="true">
                ·
              </span>
              <span className="font-mono text-xs uppercase tracking-widest text-theme-muted">
                <Content value={chapter.title} />
              </span>
            </div>
          </div>

          <div className="mt-6">
            <h2
              id="chapter-05-heading"
              className="text-fluid-h1 font-serif font-normal tracking-tight text-theme-text leading-[1.08]"
            >
              <Content value={chapter.title} />
            </h2>
            {chapter.subtitle && (
              <p className="text-fluid-narration font-serif italic text-theme-muted mt-2 max-w-[32ch] leading-[1.35]">
                <Content value={chapter.subtitle} />
              </p>
            )}
          </div>
        </Container>

        {/* HERO: Particle Network */}
        <Container size="lg" className="relative z-10 w-full mb-16">
          <div
            ref={heroRef}
            className="relative w-full min-h-[380px] sm:min-h-[440px] rounded-3xl bg-theme-surface border border-theme-border shadow-lg overflow-hidden flex flex-col justify-between p-8 sm:p-12"
          >
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
                <span>3D PARTICLE FIELD (≤ 3,600 POINTS)</span>
              </div>
              <span className="text-theme-iris font-semibold hidden sm:inline">OP-05 // INTELLIGENCE</span>
            </div>

            <div className="relative z-10 max-w-2xl my-auto py-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-theme-iris/10 border border-theme-iris/20 text-theme-iris text-xs font-mono">
                <Brain className="w-3.5 h-3.5" />
                <span>Autonomous Systems & Intelligence</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-serif font-normal text-theme-text tracking-tight leading-tight">
                From passive code execution to autonomous reasoning loops.
              </h3>
            </div>

            <div className="relative z-10 flex flex-wrap gap-2 pt-4 border-t border-theme-border">
              {sections.map((sec) => (
                <button
                  key={sec.key}
                  type="button"
                  onMouseEnter={() => setActiveHighlight(sec.key)}
                  onMouseLeave={() => setActiveHighlight(null)}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-mono transition-all border',
                    activeHighlight === sec.key
                      ? 'bg-theme-iris text-white border-theme-iris shadow-sm'
                      : 'bg-theme-surface/80 text-theme-muted border-theme-border hover:text-theme-text'
                  )}
                >
                  {sec.label.split('/')[0]}
                </button>
              ))}
            </div>
          </div>
        </Container>

        {/* 4 PILLARS */}
        <Container size="lg" className="relative z-10 w-full mb-16 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {sections.map((section) => {
              if (section.items.length === 0) return null;
              return (
                <div key={section.key} className="space-y-4">
                  <div className="flex items-center gap-2.5 pb-2 border-b border-theme-border">
                    {section.icon}
                    <h3 className="font-serif font-bold text-lg text-theme-text">{section.label}</h3>
                  </div>

                  <div className="space-y-4">
                    {section.items.map((item) => (
                      <Card
                        key={item.id}
                        withWash
                        hoverEffect
                        className="p-5 border-theme-border/80 bg-theme-surface"
                      >
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <h4 className="font-serif font-bold text-base text-theme-text">
                            <Content value={item.title} />
                          </h4>
                          <Tag variant="default" size="sm">
                            <Content value={item.focusArea} />
                          </Tag>
                        </div>

                        <p className="text-xs text-theme-muted leading-relaxed">
                          <Content value={item.description} />
                        </p>

                        <div className="mt-3 p-3 rounded-lg bg-theme-surface-elevated/70 border border-theme-border text-xs leading-relaxed">
                          <span className="font-semibold text-theme-text font-mono text-[10px] uppercase tracking-wider block mb-0.5">
                            Technical Insight / Goal:
                          </span>
                          <span className="text-theme-muted font-sans italic">
                            &ldquo;<Content value={item.keyInsightOrGoal} />&rdquo;
                          </span>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {item.stack.map((tech, idx) => (
                            <Tag key={idx} variant="default" size="sm">
                              <Content value={tech} />
                            </Tag>
                          ))}
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Container>

        {/* RESEARCH QUESTIONS */}
        <Container size="lg" className="relative z-10 w-full mb-16">
          <div className="p-6 sm:p-8 rounded-2xl bg-theme-surface border border-theme-border space-y-4">
            <div className="flex items-center justify-between border-b border-theme-border pb-3 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-theme-iris" />
                <h3 className="font-serif font-bold text-lg text-theme-text">
                  Research Questions I&apos;m Curious About
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {aiWork.researchQuestions
                .filter((q) => isContentRenderable(q.question))
                .map((q, idx) => (
                  <div
                    key={q.id}
                    className="p-4 rounded-xl bg-theme-surface-elevated border border-theme-border space-y-2 text-xs"
                  >
                    <div className="text-[10px] font-mono text-theme-iris font-bold uppercase tracking-wider">
                      Inquiry 0{idx + 1}
                    </div>
                    <h4 className="font-serif font-bold text-sm text-theme-text leading-snug">
                      &ldquo;<Content value={q.question} />&rdquo;
                    </h4>
                    <p className="text-theme-muted text-[11px] leading-relaxed">
                      <Content value={q.context} />
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </Container>

        {/* Narrative Bridge to Chapter 06 (Rule 5: Quiet first-person line) */}
        <Container size="lg" className="relative z-10 w-full pt-12 pb-4">
          <p className="text-sm sm:text-base font-serif italic text-theme-muted text-center sm:text-left">
            &ldquo;<Content value={chapter.bridge} />&rdquo;
          </p>
        </Container>
      </div>
    </article>
  );
}

function StaticNetworkFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-theme-surface/50">
      <div className="w-48 h-48 rounded-full border border-theme-iris/20 animate-pulse" />
    </div>
  );
}
