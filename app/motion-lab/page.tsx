'use client';

import React, { useRef, useState } from 'react';
import { Container } from '@/components/ui/Container';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { Reveal } from '@/components/motion/Reveal';
import { SubtitleReveal } from '@/components/motion/SubtitleReveal';
import { FocusPullText } from '@/components/motion/FocusPullText';
import { ChapterTitleCard } from '@/components/motion/ChapterTitleCard';
import { PinnedScene } from '@/components/motion/PinnedScene';
import { SvgDraw } from '@/components/motion/SvgDraw';
import { ThreadSpine } from '@/components/motion/ThreadSpine';
import { Tag } from '@/components/ui/Tag';
import { Button } from '@/components/ui/Button';
import { Card, CardTitle, CardDescription } from '@/components/ui/Card';
import { useMotion } from '@/hooks/useMotion';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { useChapterProgress } from '@/hooks/useChapterProgress';
import {
  Gauge,
  Eye,
  Film,
  Layers,
  Sparkles,
  Camera,
  Activity,
  PenTool,
  Compass,
} from 'lucide-react';

export default function MotionLabPage() {
  const {
    motionEnabled,
    prefersReducedMotion,
    reduceEffects,
    toggleMotion,
    toggleReduceEffects,
    scrollProgress,
  } = useMotion();

  const demoSectionRef = useRef<HTMLDivElement>(null);
  const elementProgress = useScrollProgress(demoSectionRef);
  const chapterProgress = useChapterProgress('motion-lab-chapter-target');
  const [pinnedProgress, setPinnedProgress] = useState(0);

  return (
    <div className="w-full pb-32">
      {/* Thread Spine integration */}
      <ThreadSpine />

      {/* Hero header */}
      <SectionWrapper
        chapter="prologue"
        accent="gold"
        withWash
        padding="lg"
        className="border-b border-theme-border"
      >
        <Container size="md">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Tag variant="gold" size="md">
                DEV LABORATORY · MOTION INFRASTRUCTURE
              </Tag>

              {/* Motion & Effects Toggles */}
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  variant={motionEnabled ? 'accent' : 'secondary'}
                  size="sm"
                  onClick={toggleMotion}
                  className="flex items-center gap-2"
                >
                  <Activity className="w-4 h-4" />
                  {motionEnabled ? 'Motion: Enabled' : 'Motion: Reduced'}
                </Button>

                <Button
                  variant={reduceEffects ? 'accent' : 'secondary'}
                  size="sm"
                  onClick={toggleReduceEffects}
                  className="flex items-center gap-2"
                >
                  <Layers className="w-4 h-4" />
                  {reduceEffects ? 'Reduce Effects: ON' : 'Reduce Effects: OFF'}
                </Button>
              </div>
            </div>

            <h1 className="text-fluid-h1 font-serif font-black text-theme-text tracking-tight">
              Motion Laboratory & Primitives
            </h1>

            <p className="text-fluid-narration font-serif italic text-theme-muted max-w-2xl">
              Testing synchronized Lenis scroll physics, GSAP ScrollTrigger single-RAF ticker,
              exposure progression, and WCAG AA reduced-motion fallbacks.
            </p>

            {/* Live Telemetry Bar */}
            <div className="p-4 rounded-xl bg-theme-surface border border-theme-border grid grid-cols-2 sm:grid-cols-5 gap-4 text-xs font-mono">
              <div>
                <span className="text-theme-muted block">Scroll Progress</span>
                <span className="text-sm font-bold text-chapter-accent tabular-nums">
                  {(scrollProgress * 100).toFixed(1)}%
                </span>
              </div>
              <div>
                <span className="text-theme-muted block">--exposure Token</span>
                <span className="text-sm font-bold text-theme-gold tabular-nums">
                  {scrollProgress.toFixed(3)}
                </span>
              </div>
              <div>
                <span className="text-theme-muted block">OS Prefers Reduced</span>
                <span className="text-sm font-bold text-theme-text">
                  {prefersReducedMotion ? 'ACTIVE' : 'OFF'}
                </span>
              </div>
              <div>
                <span className="text-theme-muted block">Reduce Effects</span>
                <span
                  className={`text-sm font-bold ${
                    reduceEffects ? 'text-theme-ember' : 'text-theme-muted'
                  }`}
                >
                  {reduceEffects ? 'ACTIVE' : 'OFF'}
                </span>
              </div>
              <div>
                <span className="text-theme-muted block">Effective State</span>
                <span
                  className={`text-sm font-bold ${
                    motionEnabled ? 'text-theme-azure' : 'text-theme-ember'
                  }`}
                >
                  {motionEnabled ? 'SMOOTH' : 'FALLBACK'}
                </span>
              </div>
            </div>
          </div>
        </Container>
      </SectionWrapper>

      {/* 1. REVEAL PRIMITIVES */}
      <SectionWrapper padding="md">
        <Container size="md" className="space-y-6">
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-theme-azure" />
            <h2 className="text-2xl font-serif font-bold text-theme-text">
              1. &lt;Reveal&gt; Primitives (Translate, Fade, Mask)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Translate Up */}
            <Reveal variant="translate" delay={0.1}>
              <Card elevated className="h-full space-y-2">
                <Tag variant="azure" size="sm">
                  variant=&quot;translate&quot;
                </Tag>
                <CardTitle className="text-lg">Translate Up</CardTitle>
                <CardDescription>
                  Smooth 28px vertical displacement with power3 easing and dynamic will-change
                  cleanup.
                </CardDescription>
              </Card>
            </Reveal>

            {/* Fade In */}
            <Reveal variant="fade" delay={0.2}>
              <Card elevated className="h-full space-y-2">
                <Tag variant="rose" size="sm">
                  variant=&quot;fade&quot;
                </Tag>
                <CardTitle className="text-lg">Pure Fade</CardTitle>
                <CardDescription>
                  Subtle opacity ramp designed for background elements, cards, and quiet
                  transitions.
                </CardDescription>
              </Card>
            </Reveal>

            {/* Mask Wipe */}
            <Reveal variant="mask" delay={0.3}>
              <Card elevated className="h-full space-y-2">
                <Tag variant="gold" size="sm">
                  variant=&quot;mask&quot;
                </Tag>
                <CardTitle className="text-lg">Cinematic Mask Wipe</CardTitle>
                <CardDescription>
                  Curtain wipe using polygon clip-path reveal for high-impact documentary titles.
                </CardDescription>
              </Card>
            </Reveal>
          </div>
        </Container>
      </SectionWrapper>

      {/* 2. SUBTITLE REVEAL */}
      <SectionWrapper chapter="3" accent="azure" withWash padding="md">
        <Container size="md" className="space-y-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-theme-azure" />
            <h2 className="text-2xl font-serif font-bold text-theme-text">
              2. &lt;SubtitleReveal&gt; Scrubbed Narration
            </h2>
          </div>
          <p className="text-xs font-mono text-theme-muted">
            Scroll down slowly: current line illuminates, prior lines dim, unread lines wait in
            shadow. Screen readers receive the whole paragraph unimpeded.
          </p>

          <Card elevated className="p-8 sm:p-12">
            <SubtitleReveal
              size="lg"
              lines={[
                'Software creation shifts the moment you realize code is never about the developer.',
                'It is about the human whose friction you remove, whose life becomes lighter.',
                'Every variable name is an intention; every architecture is an ethical stance.',
                'And the strongest systems are those that disappear into quiet dependability.',
              ]}
            />
          </Card>
        </Container>
      </SectionWrapper>

      {/* 3. FOCUS PULL TEXT */}
      <SectionWrapper chapter="4" accent="rose" padding="md">
        <Container size="md" className="space-y-6">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-theme-rose" />
            <h2 className="text-2xl font-serif font-bold text-theme-text">
              3. &lt;FocusPullText&gt; Optical Camera Pull
            </h2>
          </div>
          <p className="text-xs font-mono text-theme-muted">
            Scroll past this container to watch text pull into focus from 12px focal lens blur to
            razor crispness with a subtle 35mm film grain overlay.
          </p>

          <Card elevated className="p-8 sm:p-12 text-center space-y-4">
            <FocusPullText initialBlur={12}>
              <div className="text-fluid-h1 font-serif font-black text-theme-text">
                &ldquo;Form follows understanding.&rdquo;
              </div>
              <p className="text-sm font-serif italic text-theme-rose mt-2">
                Simulating 35mm anamorphic lens depth-of-field transition
              </p>
            </FocusPullText>
          </Card>
        </Container>
      </SectionWrapper>

      {/* 4. CHAPTER TITLE CARD */}
      <SectionWrapper chapter="5" accent="iris" padding="md">
        <Container size="md" className="space-y-6">
          <div className="flex items-center gap-2">
            <Film className="w-5 h-5 text-theme-iris" />
            <h2 className="text-2xl font-serif font-bold text-theme-text">
              4. &lt;ChapterTitleCard&gt; Film Title Card With One Label (Rule 2)
            </h2>
          </div>

          <ChapterTitleCard
            number={5}
            title="The World of Intelligence"
            subtitle="Autonomous agents, generative models, and intelligent workflows"
            arc="Exploration"
            accentKey="iris"
            baseTimeSeconds={1420}
          />
        </Container>
      </SectionWrapper>

      {/* 5. PINNED SCENE */}
      <SectionWrapper chapter="6" accent="gold-ember" padding="none">
        <PinnedScene pinDuration="+=100%" onProgress={(prog) => setPinnedProgress(prog)}>
          <Container size="md">
            <Card elevated className="p-8 sm:p-12 text-center space-y-6">
              <div className="flex justify-center">
                <Tag variant="ember" size="md">
                  &lt;PinnedScene&gt; SCRUB DEMO
                </Tag>
              </div>

              <h3 className="text-fluid-h2 font-serif font-black text-theme-text">
                Pinned Scroll Progression
              </h3>

              <div className="max-w-md mx-auto space-y-2">
                <div className="h-3 w-full bg-theme-surface-elevated rounded-full overflow-hidden border border-theme-border">
                  <div
                    className="h-full bg-theme-ember transition-all duration-75"
                    style={{ width: `${Math.min(100, Math.max(0, pinnedProgress * 100))}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs font-mono text-theme-muted">
                  <span>START (0%)</span>
                  <span className="font-bold text-theme-ember">
                    {(pinnedProgress * 100).toFixed(0)}% PINNED
                  </span>
                  <span>RELEASE (100%)</span>
                </div>
              </div>

              <p className="text-sm text-theme-muted max-w-lg mx-auto leading-relaxed">
                {pinnedProgress < 0.33
                  ? 'Stage 1: Encountering scale constraints and organizational complexity.'
                  : pinnedProgress < 0.66
                    ? 'Stage 2: Refactoring bottlenecks, tuning queries, and enforcing rigor.'
                    : 'Stage 3: Systems stabilize, enabling durable real-world resilience.'}
              </p>
            </Card>
          </Container>
        </PinnedScene>
      </SectionWrapper>

      {/* 6. SVG DRAW PRIMITIVE */}
      <SectionWrapper padding="md">
        <Container size="md" className="space-y-6">
          <div className="flex items-center gap-2">
            <PenTool className="w-5 h-5 text-theme-gold" />
            <h2 className="text-2xl font-serif font-bold text-theme-text">
              6. &lt;SvgDraw&gt; Stroke-Dashoffset Vector Drawing
            </h2>
          </div>
          <p className="text-xs font-mono text-theme-muted">
            Bound to scroll progress or triggered in-view. Fully drawn immediately under reduced motion.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Scroll-scrubbed SVG Draw */}
            <Card elevated className="p-8 flex flex-col items-center justify-center space-y-4 text-center">
              <Tag variant="gold" size="sm">
                triggerOn=&quot;scroll&quot;
              </Tag>
              <SvgDraw
                triggerOn="scroll"
                path="M 20 80 Q 150 10 280 80 T 540 80"
                viewBox="0 0 560 120"
                className="w-full h-28 text-chapter-accent"
                strokeWidth={3}
              />
              <CardDescription>
                Sinusoidal narrative bezier path scrubbed proportionally by scroll progression.
              </CardDescription>
            </Card>

            {/* In-view Triggered SVG Draw */}
            <Card elevated className="p-8 flex flex-col items-center justify-center space-y-4 text-center">
              <Tag variant="azure" size="sm">
                triggerOn=&quot;inView&quot;
              </Tag>
              <SvgDraw
                triggerOn="inView"
                path="M 40 100 L 120 20 L 200 100 L 280 20 L 360 100"
                viewBox="0 0 400 120"
                className="w-full h-28 text-theme-azure"
                strokeWidth={3}
              />
              <CardDescription>
                Geometric pulse path drawn once upon entering the viewport with ease-out physics.
              </CardDescription>
            </Card>
          </div>
        </Container>
      </SectionWrapper>

      {/* 7. CHAPTER TARGET & USE CHAPTER PROGRESS */}
      <SectionWrapper
        id="motion-lab-chapter-target"
        chapter="7"
        accent="ember"
        withWash
        padding="md"
      >
        <Container size="md" className="space-y-6">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-theme-ember" />
            <h2 className="text-2xl font-serif font-bold text-theme-text">
              7. useChapterProgress Hook Telemetry
            </h2>
          </div>

          <div className="p-8 rounded-2xl bg-theme-surface border border-theme-border space-y-4">
            <Tag variant="ember" size="sm">
              TARGET CHAPTER ID: &quot;motion-lab-chapter-target&quot;
            </Tag>
            <div className="grid grid-cols-3 gap-4 text-xs font-mono">
              <div>
                <span className="text-theme-muted block">Chapter Progress</span>
                <span className="text-lg font-bold text-theme-text tabular-nums">
                  {(chapterProgress.progress * 100).toFixed(1)}%
                </span>
              </div>
              <div>
                <span className="text-theme-muted block">In Viewport</span>
                <span
                  className={`text-lg font-bold ${
                    chapterProgress.isInView ? 'text-theme-ember' : 'text-theme-muted'
                  }`}
                >
                  {chapterProgress.isInView ? 'ACTIVE' : 'INACTIVE'}
                </span>
              </div>
              <div>
                <span className="text-theme-muted block">Passed Viewport</span>
                <span
                  className={`text-lg font-bold ${
                    chapterProgress.isPassed ? 'text-emerald-500' : 'text-theme-muted'
                  }`}
                >
                  {chapterProgress.isPassed ? 'TRUE' : 'FALSE'}
                </span>
              </div>
            </div>
          </div>
        </Container>
      </SectionWrapper>

      {/* 8. useScrollProgress LOCAL ELEMENT TRACKING */}
      <SectionWrapper padding="md">
        <Container size="md" className="space-y-6">
          <div className="flex items-center gap-2">
            <Gauge className="w-5 h-5 text-theme-gold" />
            <h2 className="text-2xl font-serif font-bold text-theme-text">
              8. useScrollProgress Hook Telemetry
            </h2>
          </div>

          <div
            ref={demoSectionRef}
            className="p-8 rounded-2xl bg-theme-surface border border-theme-border space-y-4"
          >
            <Tag variant="gold" size="sm">
              TARGET ELEMENT BOUNDING BOX
            </Tag>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
              <div>
                <span className="text-theme-muted block">Element Progress</span>
                <span className="text-lg font-bold text-theme-text tabular-nums">
                  {(elementProgress.progress * 100).toFixed(1)}%
                </span>
              </div>
              <div>
                <span className="text-theme-muted block">Scroll Direction</span>
                <span className="text-lg font-bold text-theme-text">
                  {elementProgress.direction > 0 ? 'DOWN (↓)' : 'UP (↑)'}
                </span>
              </div>
              <div>
                <span className="text-theme-muted block">Velocity</span>
                <span className="text-lg font-bold text-theme-text tabular-nums">
                  {Math.round(elementProgress.velocity)}
                </span>
              </div>
              <div>
                <span className="text-theme-muted block">In Viewport</span>
                <span
                  className={`text-lg font-bold ${
                    elementProgress.isInView ? 'text-emerald-500' : 'text-theme-muted'
                  }`}
                >
                  {elementProgress.isInView ? 'TRUE' : 'FALSE'}
                </span>
              </div>
            </div>
          </div>
        </Container>
      </SectionWrapper>
    </div>
  );
}
