'use client';

import React, { useRef, useState, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Chapter } from '@/content/chapters';
import { aiWork, AIWorkItem } from '@/content/aiWork';
import { useMotion } from '@/hooks/useMotion';
import { ChapterLabel } from '@/components/ui/ChapterLabel';
import { Container } from '@/components/ui/Container';
import { Tag } from '@/components/ui/Tag';
import { Card } from '@/components/ui/Card';
import { StaticNetworkFallback } from '@/components/three/StaticNetworkFallback';
import {
  Sparkles,
  ArrowDown,
  Cpu,
  Brain,
  FlaskConical,
  GraduationCap,
  Telescope,
  HelpCircle,
  Code2,
  CheckCircle2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Dynamically import R3F particle network canvas with SSR disabled & fallback
const DynamicNetworkCanvas = dynamic(() => import('@/components/three/IntelligenceNetworkCanvas'), {
  ssr: false,
  loading: () => <StaticNetworkFallback />,
});

export interface Chapter05IntelligenceProps {
  chapter: Chapter;
}

type AICategoryKey = 'completed' | 'experiments' | 'learning' | 'future';

export function Chapter05Intelligence({ chapter }: Chapter05IntelligenceProps) {
  const { motionEnabled, prefersReducedMotion } = useMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [activeHighlight, setActiveHighlight] = useState<AICategoryKey | null>(null);

  const isReduced = prefersReducedMotion || !motionEnabled;

  // Track viewport intersection to pause canvas when off-screen
  useEffect(() => {
    const el = heroRef.current;
    if (!el || typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setInView(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const groups: {
    key: AICategoryKey;
    label: string;
    description: string;
    icon: React.ReactNode;
    tagVariant: 'iris' | 'default' | 'azure' | 'ember';
    items: AIWorkItem[];
  }[] = [
    {
      key: 'completed',
      label: '1. Completed AI Engineering Work',
      description:
        'Production-ready implementations, structured content pipelines, and deployed solutions.',
      icon: <CheckCircle2 className="w-4 h-4 text-theme-iris shrink-0" />,
      tagVariant: 'iris',
      items: aiWork.completed,
    },
    {
      key: 'experiments',
      label: '2. Active Experiments & Prototypes',
      description:
        'Proof-of-concepts, agent orchestration testbeds, and iterative hypothesis testing.',
      icon: <FlaskConical className="w-4 h-4 text-theme-iris shrink-0" />,
      tagVariant: 'default',
      items: aiWork.experiments,
    },
    {
      key: 'learning',
      label: '3. Currently Learning & Internalizing',
      description:
        'Mathematical foundations, neural architecture mechanics, and deep theoretical study.',
      icon: <GraduationCap className="w-4 h-4 text-theme-iris shrink-0" />,
      tagVariant: 'azure',
      items: aiWork.learning,
    },
    {
      key: 'future',
      label: '4. Future Interests & Frontiers',
      description:
        'Local-first intelligence, low-parameter edge agents, and private ambient computing.',
      icon: <Telescope className="w-4 h-4 text-theme-iris shrink-0" />,
      tagVariant: 'ember',
      items: aiWork.future,
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
        {/* Iris Ambient Radial Wash */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(167,139,250,0.08)_0%,transparent_70%)]"
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
                {chapter.title}
              </span>
            </div>
          </div>

          <div className="mt-6">
            <h2
              id="chapter-05-heading"
              className="text-fluid-h1 font-serif font-normal tracking-tight text-theme-text leading-[1.08]"
            >
              {chapter.title}
            </h2>
            {chapter.subtitle && (
              <p className="text-fluid-narration font-serif italic text-theme-muted mt-2 max-w-[32ch] leading-[1.35]">
                {chapter.subtitle}
              </p>
            )}
          </div>
        </Container>

        {/* ===================================================================
            HERO: R3F Instanced Particle Network (<= 6,000 points) + Core Message
            =================================================================== */}
        <Container size="lg" className="relative z-10 w-full mb-16">
          <div
            ref={heroRef}
            className="relative w-full min-h-[380px] sm:min-h-[440px] rounded-3xl bg-theme-surface border border-theme-border shadow-lg overflow-hidden flex flex-col justify-between p-8 sm:p-12"
          >
            {/* Background 3D Network Canvas (aria-hidden) */}
            <div aria-hidden="true" className="absolute inset-0 z-0 pointer-events-none">
              {isReduced ? (
                <StaticNetworkFallback />
              ) : (
                <Suspense fallback={<StaticNetworkFallback />}>
                  <DynamicNetworkCanvas inView={inView} highlightCategory={activeHighlight} />
                </Suspense>
              )}
            </div>

            {/* Top Status Indicators */}
            <div className="relative z-10 flex items-center justify-between text-xs font-mono text-theme-muted">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-theme-iris animate-pulse" />
                <span>3D PARTICLE FIELD (≤ 3,600 POINTS)</span>
              </div>
              <span className="hidden sm:inline">CAP DPR: 1.75 · PAUSE OFF-SCREEN</span>
            </div>

            {/* Central Thesis Statement */}
            <div className="relative z-10 my-auto py-8 max-w-2xl text-center mx-auto space-y-4">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-theme-iris font-semibold px-3 py-1 rounded-full border border-theme-iris/30 bg-theme-surface/70 backdrop-blur-md inline-block">
                Core Philosophy
              </span>

              <h3 className="text-fluid-display font-serif font-black text-theme-text leading-tight tracking-tight">
                &ldquo;I want to understand and build intelligent systems,{' '}
                <span className="text-theme-iris">not merely use AI tools.&rdquo;</span>
              </h3>

              <p className="text-xs sm:text-sm text-theme-muted font-sans leading-relaxed">
                Consumer prompts and wrapper apps are trivial. True engineering lies in structuring
                cognitive memory, deterministically grounding outputs, evaluating failure modes, and
                hosting local-first models.
              </p>
            </div>

            {/* Bottom Interactive Prompt */}
            <div className="relative z-10 text-center text-[11px] font-mono text-theme-muted/80">
              Hover or focus the research tracks below to illuminate related clusters in the field ↓
            </div>
          </div>
        </Container>

        {/* ===================================================================
            FOUR HONESTLY SEPARATED AI WORK GROUPS
            =================================================================== */}
        <Container size="lg" className="relative z-10 w-full mb-16 space-y-8">
          <div className="flex items-center justify-between border-b border-theme-border pb-3 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-theme-iris" />
              <h3 className="font-serif font-bold text-xl text-theme-text">
                The Four Research Tracts
              </h3>
            </div>
            <span className="text-xs font-mono text-theme-muted">
              Never Merged · Rigorously Categorized
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {groups.map((grp) => (
              <div
                key={grp.key}
                onMouseEnter={() => setActiveHighlight(grp.key)}
                onMouseLeave={() => setActiveHighlight(null)}
                className="space-y-4"
              >
                <div className="flex items-center justify-between border-b border-theme-border pb-2">
                  <div className="flex items-center gap-2">
                    {grp.icon}
                    <h4 className="font-serif font-bold text-base text-theme-text">{grp.label}</h4>
                  </div>
                  <Tag variant={grp.tagVariant} size="sm">
                    {grp.key.toUpperCase()}
                  </Tag>
                </div>

                <p className="text-xs text-theme-muted leading-relaxed">{grp.description}</p>

                <div className="space-y-3">
                  {grp.items.map((item) => (
                    <Card
                      key={item.id}
                      onFocus={() => setActiveHighlight(grp.key)}
                      onBlur={() => setActiveHighlight(null)}
                      tabIndex={0}
                      className={cn(
                        'p-5 transition-all duration-300 border-theme-border/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-iris',
                        activeHighlight === grp.key
                          ? 'border-theme-iris/60 bg-theme-surface-elevated shadow-md'
                          : 'bg-theme-surface hover:bg-theme-surface-elevated'
                      )}
                    >
                      <div className="flex items-center justify-between text-xs font-mono mb-2">
                        <span className="font-semibold text-theme-text">{item.focusArea}</span>
                        <span className="text-theme-muted">{item.dateOrQuarter}</span>
                      </div>

                      <h5 className="font-serif font-bold text-base text-theme-text">
                        {item.title}
                      </h5>

                      <p className="text-xs text-theme-muted mt-2 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Technical Insight */}
                      <div className="mt-3 p-3 rounded-lg bg-theme-surface-elevated/70 border border-theme-border text-xs leading-relaxed">
                        <span className="font-semibold text-theme-text font-mono text-[10px] uppercase tracking-wider block mb-0.5">
                          Technical Insight / Goal:
                        </span>
                        <span className="text-theme-muted font-sans italic">
                          &ldquo;{item.keyInsightOrGoal}&rdquo;
                        </span>
                      </div>

                      {/* Tech Stack Tags */}
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {item.stack.map((tech, idx) => (
                          <Tag key={idx} variant="default" size="sm">
                            {tech}
                          </Tag>
                        ))}
                      </div>

                      {item.isPlaceholder && (
                        <div className="mt-3 pt-2 border-t border-theme-border/60 flex items-center gap-1.5 text-[10px] font-mono text-theme-ember">
                          <HelpCircle className="w-3 h-3" />
                          <span>[Placeholder marked in /content/aiWork.ts]</span>
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>

        {/* ===================================================================
            MODELS & TECHNOLOGIES EXPLORED STRIP (Placeholder list to confirm)
            =================================================================== */}
        <Container size="lg" className="relative z-10 w-full mb-16">
          <div className="p-6 sm:p-8 rounded-2xl bg-theme-surface border border-theme-border space-y-4">
            <div className="flex items-center justify-between border-b border-theme-border pb-3 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-theme-iris" />
                <h3 className="font-serif font-bold text-lg text-theme-text">
                  Models & Technologies I Explore
                </h3>
              </div>
              <span className="text-xs font-mono text-theme-ember font-semibold">
                [Placeholder List for Chinmoy to Confirm]
              </span>
            </div>

            <p className="text-xs text-theme-muted leading-relaxed">
              Active engineering paradigms, inference engines, and architectural frameworks utilized
              across experimental builds:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
              {aiWork.modelsAndTechnologies.map((tech, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-theme-surface-elevated border border-theme-border text-xs flex items-start gap-2.5"
                >
                  <Cpu className="w-4 h-4 text-theme-iris shrink-0 mt-0.5" />
                  <span className="text-theme-text leading-snug">{tech}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>

        {/* ===================================================================
            RESEARCH QUESTIONS I'M CURIOUS ABOUT BLOCK (Placeholders)
            =================================================================== */}
        <Container size="lg" className="relative z-10 w-full mb-16">
          <div className="p-6 sm:p-8 rounded-2xl bg-theme-surface border border-theme-border space-y-4">
            <div className="flex items-center justify-between border-b border-theme-border pb-3 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-theme-iris" />
                <h3 className="font-serif font-bold text-lg text-theme-text">
                  Research Questions I&apos;m Curious About
                </h3>
              </div>
              {process.env.NODE_ENV !== 'production' && (
                <span className="text-[10px] font-mono text-theme-muted/60">
                  [TODO: chinmoy-research-questions]
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {aiWork.researchQuestions.map((q, idx) => (
                <div
                  key={q.id}
                  className="p-4 rounded-xl bg-theme-surface-elevated border border-theme-border space-y-2 text-xs"
                >
                  <div className="text-[10px] font-mono text-theme-iris font-bold uppercase tracking-wider">
                    Inquiry 0{idx + 1}
                  </div>
                  <h4 className="font-serif font-bold text-sm text-theme-text leading-snug">
                    &ldquo;{q.question}&rdquo;
                  </h4>
                  <p className="text-theme-muted text-[11px] leading-relaxed">{q.context}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>

        {/* Narrative Bridge to Chapter 06 (Rule 5: Quiet first-person line, no box, no label) */}
        <Container size="lg" className="relative z-10 w-full pt-12 pb-4">
          <p className="text-sm sm:text-base font-serif italic text-theme-muted text-center sm:text-left">
            &ldquo;{chapter.bridgeToNext}&rdquo;
          </p>
        </Container>
      </div>
    </article>
  );
}
