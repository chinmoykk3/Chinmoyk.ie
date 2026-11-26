'use client';

import React, { useState, useRef, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Chapter } from '@/content/chapters';
import { aiWork } from '@/content/aiWork';
import { useMotion } from '@/hooks/useMotion';
import { Container } from '@/components/ui/Container';
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
  Sparkles,
  Network,
  Binary,
  Workflow,
  Terminal,
  ShieldCheck,
  Play,
  RotateCcw,
  ArrowUpRight,
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

type ClusterKey = 'completed' | 'experiments' | 'learning' | 'future';

interface ReasoningNode {
  id: string;
  label: string;
  role: string;
  detail: string;
  verifiedDetail: string;
}

const REASONING_PIPELINES: Record<
  'agentic' | 'local-rag' | 'dpo' | 'neuro-symbolic',
  {
    id: string;
    title: string;
    tag: string;
    backdropWord: string;
    nodes: ReasoningNode[];
  }
> = {
  agentic: {
    id: 'agentic',
    title: 'Multi-Agent Verification Loop',
    tag: 'EXPERIMENT // CONSENSUS',
    backdropWord: 'AGENTIC',
    nodes: [
      {
        id: 'intent',
        label: '01. Intent',
        role: 'Task Decomposition',
        detail: 'Parse specification into bounded sub-goals and tool contracts.',
        verifiedDetail: 'Schema-validated AST goals with strict tool-permission boundaries.',
      },
      {
        id: 'propose',
        label: '02. Proposer',
        role: 'Candidate Synthesis',
        detail: 'Generate candidate patch & reasoning trace in isolated scratchpad.',
        verifiedDetail: 'Produces typed diff + explicit assumptions for downstream critique.',
      },
      {
        id: 'critique',
        label: '03. Critique',
        role: 'Adversarial Review',
        detail: 'Separate critic agent probes edge cases, types, and regressions.',
        verifiedDetail: 'Deterministic test harness & lint gate rejects ungrounded claims.',
      },
      {
        id: 'commit',
        label: '04. Output',
        role: 'Verified Resolution',
        detail: 'Emit final response after consensus threshold is met.',
        verifiedDetail: 'Hallucination rate reduced >40% via separated propose/verify loops.',
      },
    ],
  },
  'local-rag': {
    id: 'local-rag',
    title: 'Local GGUF Grounding',
    tag: 'EXPERIMENT // PRIVACY',
    backdropWord: 'LOCAL',
    nodes: [
      {
        id: 'embed',
        label: '01. Quantize',
        role: 'llama.cpp Runtime',
        detail: 'Load 4-bit GGUF SLM weights directly into local unified memory.',
        verifiedDetail: 'Zero cloud egress; memory-mapped weights keep latency sub-second.',
      },
      {
        id: 'retrieve',
        label: '02. Retrieve',
        role: 'ChromaDB Vector Index',
        detail: 'Fetch top-k local document chunks via cosine similarity.',
        verifiedDetail: 'Hybrid BM25 + dense vector reranking with source-line citations.',
      },
      {
        id: 'ground',
        label: '03. Ground',
        role: 'Context Injection',
        detail: 'Constrain generation window strictly to retrieved local context.',
        verifiedDetail: 'Rejects unsupported facts outside retrieved document spans.',
      },
      {
        id: 'stream',
        label: '04. Stream',
        role: 'Offline Synthesis',
        detail: 'Stream grounded answer locally with zero API telemetry.',
        verifiedDetail: '100% air-gapped execution on consumer hardware.',
      },
    ],
  },
  dpo: {
    id: 'dpo',
    title: 'DPO Alignment Mechanics',
    tag: 'LEARNING // ALIGNMENT',
    backdropWord: 'ALIGN',
    nodes: [
      {
        id: 'pairs',
        label: '01. Pairs',
        role: 'Preference Dataset',
        detail: 'Sample chosen (yw) vs rejected (yl) completions for prompt x.',
        verifiedDetail: 'Curated pairwise preference tuples without scalar reward labeling.',
      },
      {
        id: 'ref',
        label: '02. Reference',
        role: 'Frozen Policy Ratio',
        detail: 'Compute log-probability ratio against frozen reference model.',
        verifiedDetail: 'Implicit KL-divergence penalty prevents policy collapse.',
      },
      {
        id: 'loss',
        label: '03. DPO Loss',
        role: 'Closed-Form Objective',
        detail: 'Optimize binary cross-entropy directly on preference log-ratios.',
        verifiedDetail: 'Mathematically equivalent to RLHF without unstable reward-model training.',
      },
      {
        id: 'policy',
        label: '04. Policy',
        role: 'Aligned Weights',
        detail: 'Updated policy favors calibrated, helpful, constrained outputs.',
        verifiedDetail: 'Lower variance gradients and simpler PyTorch training loop.',
      },
    ],
  },
  'neuro-symbolic': {
    id: 'neuro-symbolic',
    title: 'Neuro-Symbolic Compiler',
    tag: 'FRONTIER // FORMAL',
    backdropWord: 'FORMAL',
    nodes: [
      {
        id: 'neural',
        label: '01. Neural',
        role: 'Statistical Synthesis',
        detail: 'LLM proposes candidate algorithm and invariants.',
        verifiedDetail: 'Explores wide solution space while emitting formal type hints.',
      },
      {
        id: 'ast',
        label: '02. AST Lift',
        role: 'Symbolic Encoding',
        detail: 'Translate candidate control flow into formal SMT constraints.',
        verifiedDetail: 'Maps program states into first-order logic predicates.',
      },
      {
        id: 'z3',
        label: '03. Z3 Solver',
        role: 'Proof Verification',
        detail: 'Check satisfiability and search for counterexample inputs.',
        verifiedDetail: 'If counterexample exists, feed exact witness back to step 01.',
      },
      {
        id: 'sound',
        label: '04. Proven',
        role: 'Sound Artifact',
        detail: 'Emit code accompanied by machine-checked correctness proof.',
        verifiedDetail: 'Eliminates unbounded edge-case risk of pure token prediction.',
      },
    ],
  },
};

const FLOATING_GLYPHS = [
  { Icon: Brain, top: '8%', left: '6%', delay: '0s', size: 'w-7 h-7' },
  { Icon: Network, top: '16%', right: '8%', delay: '1.2s', size: 'w-8 h-8' },
  { Icon: Binary, top: '38%', left: '4%', delay: '0.6s', size: 'w-6 h-6' },
  { Icon: Cpu, top: '52%', right: '5%', delay: '2.1s', size: 'w-7 h-7' },
  { Icon: Workflow, top: '72%', left: '7%', delay: '1.7s', size: 'w-6 h-6' },
  { Icon: Sparkles, top: '84%', right: '9%', delay: '0.9s', size: 'w-6 h-6' },
];

export function Chapter05Intelligence({ chapter }: Chapter05IntelligenceProps) {
  const { motionEnabled, prefersReducedMotion } = useMotion();
  const [activeHighlight, setActiveHighlight] = useState<ClusterKey | null>(null);
  const [selectedPipeline, setSelectedPipeline] =
    useState<keyof typeof REASONING_PIPELINES>('agentic');
  const [activeStep, setActiveStep] = useState<number>(0);
  const [verifierEnabled, setVerifierEnabled] = useState<boolean>(true);
  const [activeInquiry, setActiveInquiry] = useState<number>(0);
  const [inView, setInView] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  const isReduced = prefersReducedMotion || !motionEnabled;
  const showDebug =
    process.env.NODE_ENV !== 'production' &&
    process.env.NEXT_PUBLIC_DEBUG_CONTENT === '1';

  // Viewport intersection observer to pause R3F frameloop off-screen
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.08 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const groups = [
    {
      key: 'completed' as const,
      label: 'Completed AI Engineering Work',
      shortLabel: 'Completed',
      statusLabel: 'COMPLETED',
      backdropWord: 'DEPLOYED',
      description: 'Production systems, deployed architectures, and verified AI deliverables.',
      icon: Layers,
      items: aiWork.completed.filter((i) => isContentRenderable(i.title)),
      placeholderNotice: 'Completed projects pending benchmark verification.',
    },
    {
      key: 'experiments' as const,
      label: 'AI & Agentic Experiments',
      shortLabel: 'Experiments',
      statusLabel: 'EXPERIMENT',
      backdropWord: 'AGENTIC',
      description:
        'Proof-of-concepts, autonomous multi-agent orchestration, and local inference prototypes.',
      icon: FlaskConical,
      items: aiWork.experiments.filter((i) => isContentRenderable(i.title)),
      placeholderNotice: '',
    },
    {
      key: 'learning' as const,
      label: 'Currently Learning & Internalizing',
      shortLabel: 'Learning',
      statusLabel: 'LEARNING',
      backdropWord: 'ALIGNMENT',
      description:
        'Mathematical foundations, alignment mechanics (DPO/RLHF), and GPU compute pipelines.',
      icon: GraduationCap,
      items: aiWork.learning.filter((i) => isContentRenderable(i.title)),
      placeholderNotice: '',
    },
    {
      key: 'future' as const,
      label: 'Future Interests & Technical Frontiers',
      shortLabel: 'Frontiers',
      statusLabel: 'FRONTIER',
      backdropWord: 'FRONTIER',
      description:
        'Neuro-symbolic compilers, verifiable code generation, and ambient edge computing.',
      icon: Telescope,
      items: aiWork.future.filter((i) => isContentRenderable(i.title)),
      placeholderNotice: '',
    },
  ];

  const visibleGroups = groups.filter((g) => g.items.length > 0 || showDebug);
  const renderableModels = aiWork.modelsAndTechnologies.filter(isContentRenderable);
  const renderableQuestions = aiWork.researchQuestions.filter((q) =>
    isContentRenderable(q.question)
  );

  const pipeline = REASONING_PIPELINES[selectedPipeline];
  const currentNode = pipeline.nodes[activeStep] ?? pipeline.nodes[0];

  const backdropText = activeHighlight
    ? groups.find((g) => g.key === activeHighlight)?.backdropWord ?? 'INTELLIGENCE'
    : pipeline.backdropWord;

  const handlePipelineSelect = (key: keyof typeof REASONING_PIPELINES) => {
    setSelectedPipeline(key);
    setActiveStep(0);
    if (key === 'agentic' || key === 'local-rag') setActiveHighlight('experiments');
    if (key === 'dpo') setActiveHighlight('learning');
    if (key === 'neuro-symbolic') setActiveHighlight('future');
  };

  return (
    <article
      id={chapter.id}
      data-chapter="5"
      data-accent="iris"
      aria-labelledby="chapter-05-heading"
      ref={stageRef}
      className="relative w-full bg-cinema-bg text-cinema-text border-t border-cinema-border/40 overflow-hidden transition-colors duration-300"
    >
      {/* Ambient Iris Radial Spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 68% 52% at 50% 24%, color-mix(in srgb, var(--color-accent-iris) 15%, transparent) 0%, transparent 74%)',
        }}
      />

      {/* Subtle Blueprint Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          opacity: 'var(--stage-grid-opacity, 0.06)',
          backgroundImage:
            'linear-gradient(to right, var(--color-accent-iris) 1px, transparent 1px), linear-gradient(to bottom, var(--color-accent-iris) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />

      {/* Giant Kinetic Outlined Bebas Neue Backdrop Word */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-x-0 top-12 sm:top-16 z-0 flex justify-center overflow-hidden"
      >
        <span
          className="text-[22vw] sm:text-[17vw] leading-none tracking-[0.04em] uppercase transition-all duration-500"
          style={{
            fontFamily: "'Bebas Neue', 'Oswald', 'Impact', sans-serif",
            WebkitTextStroke: '1.5px var(--color-accent-iris)',
            color: 'transparent',
            opacity: 'var(--stage-watermark-opacity, 0.12)',
          }}
        >
          {backdropText}
        </span>
      </div>

      {/* Floating AI Glyphs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {FLOATING_GLYPHS.map(({ Icon, top, left, right, delay, size }, idx) => (
          <div
            key={idx}
            className="absolute text-stage-iris/30"
            style={{
              top,
              left,
              right,
              animation: isReduced ? undefined : `floatSlow 7s ease-in-out ${delay} infinite`,
            }}
          >
            <Icon className={size} strokeWidth={1.35} />
          </div>
        ))}
      </div>

      {/* Borderless 3D Neural Particle Field (Blended seamlessly into stage top) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[560px] sm:h-[640px] z-0 opacity-75"
        style={{
          maskImage: 'linear-gradient(to bottom, black 55%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 55%, transparent 100%)',
        }}
      >
        {isReduced ? (
          <StaticNetworkFallback />
        ) : (
          <Suspense fallback={<StaticNetworkFallback />}>
            <DynamicNetworkCanvas inView={inView} highlightCategory={activeHighlight} />
          </Suspense>
        )}
      </div>

      {/* MAIN FOREGROUND STAGE */}
      <div className="relative z-10 w-full py-20 sm:py-28">
        <Container size="lg" className="space-y-16 sm:space-y-20">
          {/* 1. Open Editorial Chapter Header */}
          <header className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2.5 text-xs font-mono tracking-[0.2em] uppercase text-stage-iris">
                <span className="w-2 h-2 rounded-full bg-stage-iris animate-pulse" />
                <span>
                  Chapter {chapter.number} — {chapter.emotionalArc}
                </span>
              </div>

              <h2
                id="chapter-05-heading"
                className="font-serif font-normal text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.02] text-cinema-text"
              >
                <Content value={chapter.title} />
              </h2>

              <p className="text-sm sm:text-base text-cinema-muted font-sans leading-relaxed max-w-2xl">
                <Content value={chapter.subtitle} />
              </p>
            </div>

            {/* Cluster Focus Controls (Syncs with 3D Particle Network) */}
            <div className="lg:col-span-4 flex flex-col items-start lg:items-end gap-2.5">
              <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-cinema-muted">
                Neural Cluster Focus
              </span>
              <div className="flex flex-wrap lg:justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setActiveHighlight(null)}
                  className={cn(
                    'px-3 py-1.5 rounded-full text-xs font-mono border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-stage-iris',
                    activeHighlight === null
                      ? 'bg-stage-iris/15 text-stage-iris border-stage-iris font-semibold'
                      : 'bg-cinema-bg/70 text-cinema-muted border-cinema-border hover:text-cinema-text hover:border-stage-iris/50'
                  )}
                >
                  All Nodes
                </button>
                {visibleGroups.map((g) => (
                  <button
                    key={g.key}
                    type="button"
                    onClick={() =>
                      setActiveHighlight(activeHighlight === g.key ? null : g.key)
                    }
                    className={cn(
                      'px-3 py-1.5 rounded-full text-xs font-mono border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-stage-iris',
                      activeHighlight === g.key
                        ? 'bg-stage-iris/15 text-stage-iris border-stage-iris font-semibold'
                        : 'bg-cinema-bg/70 text-cinema-muted border-cinema-border hover:text-cinema-text hover:border-stage-iris/50'
                    )}
                  >
                    {g.shortLabel}
                  </button>
                ))}
              </div>
            </div>
          </header>

          {/* 2. Interactive Reasoning Loop Playground (Borderless Split Stage) */}
          <section
            aria-label="Interactive AI reasoning loop simulator"
            className="border-y border-cinema-border/60 py-10 sm:py-12 backdrop-blur-[2px]"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Left: Architecture Selector & Verifier Switch */}
              <div className="lg:col-span-5 space-y-5">
                <div className="flex items-center justify-between gap-3">
                  <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-stage-iris">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>Reasoning Trace Sandbox</span>
                  </div>
                  <span className="text-[11px] font-mono text-cinema-muted">
                    {pipeline.tag}
                  </span>
                </div>

                <h3 className="font-serif font-normal text-2xl sm:text-3xl text-cinema-text leading-snug">
                  From passive execution to verifiable reasoning loops.
                </h3>

                {/* Pipeline Switcher */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  {(
                    Object.keys(REASONING_PIPELINES) as Array<
                      keyof typeof REASONING_PIPELINES
                    >
                  ).map((key) => {
                    const item = REASONING_PIPELINES[key];
                    const active = selectedPipeline === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => handlePipelineSelect(key)}
                        className={cn(
                          'text-left px-3 py-2.5 rounded-lg border text-xs font-mono transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-stage-iris',
                          active
                            ? 'border-stage-iris bg-stage-iris/10 text-cinema-text'
                            : 'border-cinema-border/60 bg-cinema-bg/50 text-cinema-muted hover:text-cinema-text hover:border-stage-iris/40'
                        )}
                      >
                        <div className="font-semibold truncate">{item.title}</div>
                      </button>
                    );
                  })}
                </div>

                {/* Deterministic Verifier Toggle */}
                <div className="flex items-center justify-between gap-4 pt-2 border-t border-cinema-border/40">
                  <button
                    type="button"
                    onClick={() => setVerifierEnabled((v) => !v)}
                    aria-pressed={verifierEnabled}
                    className={cn(
                      'inline-flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-md border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-stage-iris',
                      verifierEnabled
                        ? 'border-stage-iris text-stage-iris bg-stage-iris/10'
                        : 'border-cinema-border text-cinema-muted bg-cinema-bg/40'
                    )}
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>
                      Deterministic Verifier: {verifierEnabled ? 'ON' : 'OFF'}
                    </span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveStep((s) => (s + 1) % pipeline.nodes.length)
                      }
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-cinema-text text-cinema-bg text-xs font-mono font-semibold hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-stage-iris"
                    >
                      <Play className="w-3 h-3" />
                      <span>Step</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveStep(0)}
                      aria-label="Reset reasoning step"
                      className="p-1.5 rounded-md border border-cinema-border text-cinema-muted hover:text-cinema-text transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-stage-iris"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Right: Interactive 4-Node Pipeline & Live Inspection Readout */}
              <div className="lg:col-span-7 space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {pipeline.nodes.map((node, idx) => {
                    const isActive = idx === activeStep;
                    const isPassed = idx < activeStep;
                    return (
                      <button
                        key={node.id}
                        type="button"
                        onClick={() => setActiveStep(idx)}
                        className={cn(
                          'relative text-left p-3.5 rounded-xl border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-stage-iris',
                          isActive
                            ? 'border-stage-iris bg-stage-iris/12 shadow-sm'
                            : isPassed
                              ? 'border-stage-iris/40 bg-cinema-bg/70 text-cinema-text'
                              : 'border-cinema-border/60 bg-cinema-bg/40 text-cinema-muted hover:border-stage-iris/40'
                        )}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span
                            className={cn(
                              'text-[11px] font-mono font-semibold',
                              isActive || isPassed ? 'text-stage-iris' : 'text-cinema-muted'
                            )}
                          >
                            {node.label}
                          </span>
                          <span
                            className={cn(
                              'w-1.5 h-1.5 rounded-full',
                              isActive
                                ? 'bg-stage-iris animate-ping'
                                : isPassed
                                  ? 'bg-stage-iris'
                                  : 'bg-cinema-border'
                            )}
                          />
                        </div>
                        <div className="text-xs font-sans font-medium text-cinema-text">
                          {node.role}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Open Console Output Strip */}
                <div className="pl-4 border-l-2 border-stage-iris space-y-2 py-1">
                  <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-stage-iris">
                    <span>
                      Active Stage: {currentNode.label} — {currentNode.role}
                    </span>
                    <span>
                      {verifierEnabled ? 'VERIFIED PATH' : 'PROBABILISTIC PATH'}
                    </span>
                  </div>
                  <p className="text-sm sm:text-base font-sans text-cinema-text leading-relaxed">
                    {verifierEnabled ? currentNode.verifiedDetail : currentNode.detail}
                  </p>
                </div>

                {/* Models & Technologies Strip */}
                {renderableModels.length > 0 && (
                  <div className="pt-2 space-y-2">
                    <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-cinema-muted">
                      Core Models &amp; Architectures Explored
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {renderableModels.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-md text-xs font-mono border border-cinema-border/70 bg-cinema-bg/60 text-cinema-text"
                        >
                          <Content value={tech} />
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* 3. Open Editorial AI Dossier (Visibly Separated Tracks — Never Merged) */}
          <div className="space-y-14">
            {visibleGroups.map((group) => {
              const Icon = group.icon;
              const isHighlighted = activeHighlight === group.key;

              if (group.items.length === 0 && showDebug) {
                return (
                  <div
                    key={group.key}
                    className="py-4 border-b border-dashed border-cinema-border/60 flex items-center justify-between text-xs font-mono text-cinema-muted"
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-stage-iris" />
                      <span>{group.label}</span>
                    </div>
                    <span>DEV ONLY: {group.placeholderNotice}</span>
                  </div>
                );
              }

              return (
                <section
                  key={group.key}
                  aria-labelledby={`group-${group.key}-heading`}
                  onMouseEnter={() => setActiveHighlight(group.key)}
                  onMouseLeave={() => setActiveHighlight(null)}
                  className={cn(
                    'space-y-6 transition-opacity duration-300',
                    activeHighlight && !isHighlighted ? 'opacity-65' : 'opacity-100'
                  )}
                >
                  {/* Track Header */}
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-3 border-b border-cinema-border/70">
                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.16em] text-stage-iris">
                        <Icon className="w-3.5 h-3.5" />
                        <span>{group.statusLabel}</span>
                      </div>
                      <h3
                        id={`group-${group.key}-heading`}
                        className="font-serif font-normal text-2xl sm:text-3xl text-cinema-text"
                      >
                        {group.label}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-cinema-muted font-sans max-w-md sm:text-right">
                      {group.description}
                    </p>
                  </div>

                  {/* Open Two-Column Editorial Entries */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {group.items.map((item) => (
                      <div
                        key={item.id}
                        tabIndex={0}
                        onFocus={() => setActiveHighlight(group.key)}
                        onBlur={() => setActiveHighlight(null)}
                        className="group space-y-3.5 focus:outline-none"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <h4 className="font-serif font-normal text-xl sm:text-2xl text-cinema-text leading-snug group-hover:text-stage-iris transition-colors">
                            <Content value={item.title} />
                          </h4>
                          <span className="shrink-0 text-[11px] font-mono uppercase tracking-wider text-stage-iris pt-1">
                            <Content value={item.focusArea} />
                          </span>
                        </div>

                        <p className="text-sm text-cinema-muted font-sans leading-relaxed">
                          <Content value={item.description} />
                        </p>

                        <blockquote className="pl-3.5 border-l-2 border-stage-iris/70 space-y-1">
                          <span className="block text-[10px] font-mono uppercase tracking-[0.15em] text-stage-iris">
                            Technical Insight / Goal
                          </span>
                          <p className="text-xs sm:text-sm font-serif italic text-cinema-text leading-relaxed">
                            &ldquo;<Content value={item.keyInsightOrGoal} />&rdquo;
                          </p>
                        </blockquote>

                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          {item.stack.map((tech, idx) => (
                            <span
                              key={idx}
                              className="text-[11px] font-mono px-2 py-0.5 rounded border border-cinema-border/60 text-cinema-muted"
                            >
                              <Content value={tech} />
                            </span>
                          ))}
                          {item.link && (
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[11px] font-mono text-stage-iris hover:underline ml-auto"
                            >
                              <span>Inspect</span>
                              <ArrowUpRight className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>

          {/* 4. Interactive Research Inquiries */}
          {renderableQuestions.length > 0 && (
            <section
              aria-label="Open research questions"
              className="pt-8 border-t border-cinema-border/60 space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-xs font-mono uppercase tracking-[0.18em] text-stage-iris">
                  Open Research Inquiries
                </span>
                <span className="text-xs font-mono text-cinema-muted">
                  Select an inquiry to inspect context
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {renderableQuestions.map((q, idx) => {
                  const selected = activeInquiry === idx;
                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => setActiveInquiry(idx)}
                      className={cn(
                        'text-left p-5 rounded-xl border transition-all flex flex-col justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-stage-iris',
                        selected
                          ? 'border-stage-iris bg-stage-iris/10'
                          : 'border-cinema-border/60 bg-cinema-bg/40 hover:border-stage-iris/50'
                      )}
                    >
                      <div className="space-y-2.5">
                        <span className="text-[11px] font-mono font-semibold text-stage-iris uppercase tracking-wider">
                          Inquiry 0{idx + 1}
                        </span>
                        <h4 className="font-serif font-normal text-base sm:text-lg text-cinema-text leading-snug">
                          &ldquo;<Content value={q.question} />&rdquo;
                        </h4>
                      </div>
                      <p className="text-xs text-cinema-muted font-sans leading-relaxed pt-3 border-t border-cinema-border/40">
                        <Content value={q.context} />
                      </p>
                    </button>
                  );
                })}
              </div>
            </section>
          )}

          {/* 5. Narrative Bridge to Chapter 06 */}
          <div className="pt-8 border-t border-cinema-border/40">
            <p className="text-sm sm:text-base font-serif italic text-cinema-muted max-w-2xl leading-relaxed">
              &ldquo;<Content value={chapter.bridge} />&rdquo;
            </p>
          </div>
        </Container>
      </div>
    </article>
  );
}
