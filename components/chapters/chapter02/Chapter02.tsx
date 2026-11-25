'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Chapter } from '@/content/chapters';
import { chapter02Content } from '@/content/chapter02';
import { useMotion } from '@/hooks/useMotion';
import { Content } from '@/components/content/Content';
import { isContentRenderable, getContentText } from '@/content/schema';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X } from 'lucide-react';
import { Prism } from './Prism';
import { Beams } from './Beams';
import { BuilderWorld } from './worlds/BuilderWorld';
import { IntelligenceWorld } from './worlds/IntelligenceWorld';
import { VisualWorld } from './worlds/VisualWorld';
import { ExplorerWorld } from './worlds/ExplorerWorld';
import { computeChapter02Phases } from './chapter02.timeline';
import { PRISM_1_COORDS, PRISM_2_COORDS } from './chapter02.config';
import { cn } from '@/lib/utils';

export interface Chapter02Props {
  chapter: Chapter;
}

const BEAT_STOPS = [
  { label: 'Split', progress: 0.08, cmd: '$ prism.refract(curiosity) // 4 disciplines emerging' },
  { label: 'Stack', progress: 0.36, cmd: '$ stack.mount(["fullstack", "ai", "design", "frontier"])' },
  { label: 'Converge', progress: 0.72, cmd: '// each discipline feeds the others' },
  { label: 'Synthesize', progress: 0.85, cmd: '$ merge --all --target=unified_craft' },
  { label: 'Unified', progress: 0.96, cmd: '✓ 4 worlds converged · ready to build something real' },
];

const IDENTITY_PILLS = [
  { id: 'the-builder', index: '01', shortLabel: 'Builder', accentClass: 'text-sunrise-azure border-sunrise-azure/40 bg-sunrise-azure/10' },
  { id: 'the-engineer-of-intelligence', index: '02', shortLabel: 'AI Eng', accentClass: 'text-sunrise-iris border-sunrise-iris/40 bg-sunrise-iris/10' },
  { id: 'the-visual-thinker', index: '03', shortLabel: 'Visual', accentClass: 'text-sunrise-rose border-sunrise-rose/40 bg-sunrise-rose/10' },
  { id: 'the-explorer', index: '04', shortLabel: 'Explorer', accentClass: 'text-sunrise-ember border-sunrise-ember/40 bg-sunrise-ember/10' },
];

export function Chapter02({ chapter }: Chapter02Props) {
  const { motionEnabled, prefersReducedMotion, lenis } = useMotion();
  const sceneRef = useRef<HTMLElement>(null);
  const pinContentRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIdentityId, setActiveIdentityId] = useState<string | null>(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0, isFine: false });
  const animFrameRef = useRef<number | null>(null);

  const isReduced = prefersReducedMotion || !motionEnabled;

  // Track fine pointer on desktop for ±4° prism parallax
  useEffect(() => {
    if (isReduced) return;
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setPointer((p) => ({ ...p, isFine: mediaQuery.matches }));

    const handlePointerMove = (e: MouseEvent) => {
      if (!mediaQuery.matches) return;
      const nx = (e.clientX / window.innerWidth) * 2 - 1; // -1 to 1
      const ny = (e.clientY / window.innerHeight) * 2 - 1;

      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = requestAnimationFrame(() => {
        setPointer({ x: Math.max(-1, Math.min(1, nx)), y: Math.max(-1, Math.min(1, ny)), isFine: true });
      });
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isReduced]);

  // Compute scrubbed kinetic states
  const phases = computeChapter02Phases(scrollProgress, isReduced);

  // Pinned GSAP ScrollTrigger timeline (~700vh desktop, ~560vh mobile)
  useEffect(() => {
    const triggerEl = sceneRef.current;
    const contentEl = pinContentRef.current;
    if (!triggerEl || !contentEl) return;

    if (isReduced) {
      setScrollProgress(1);
      return;
    }

    const isMobile = window.innerWidth < 768;
    const pinScrollDistance = isMobile ? '+=260%' : '+=340%';

    const trigger = ScrollTrigger.create({
      trigger: triggerEl,
      start: 'top top',
      end: pinScrollDistance,
      pin: contentEl,
      pinSpacing: true,
      scrub: 0.5,
      onUpdate: (self) => {
        setScrollProgress(self.progress);
        document.documentElement.style.setProperty(
          '--ch02-progress',
          self.progress.toFixed(3)
        );
        if (self.progress >= 0.80) {
          const lift = Math.min(1, (self.progress - 0.80) / 0.15) * 0.1;
          document.documentElement.style.setProperty('--exposure-lift', lift.toFixed(3));
        } else {
          document.documentElement.style.removeProperty('--exposure-lift');
        }
      },
    });

    scrollTriggerRef.current = trigger;

    return () => {
      trigger.kill();
      scrollTriggerRef.current = null;
      document.documentElement.style.removeProperty('--ch02-progress');
      document.documentElement.style.removeProperty('--exposure-lift');
    };
  }, [isReduced]);

  const handleJumpToBeat = useCallback(
    (targetProgress: number) => {
      const st = scrollTriggerRef.current;
      if (!st) return;
      const targetY = st.start + (st.end - st.start) * targetProgress;
      if (lenis && motionEnabled) {
        lenis.scrollTo(targetY, { duration: 0.9 });
      } else {
        window.scrollTo({ top: targetY, behavior: motionEnabled ? 'smooth' : 'auto' });
      }
    },
    [lenis, motionEnabled]
  );

  const identities = chapter02Content.identities;
  const builderIdentity = identities[0];
  const intelIdentity = identities[1];
  const visualIdentity = identities[2];
  const explorerIdentity = identities[3];

  const activeIdentity = identities.find((item) => item.id === activeIdentityId) || null;
  const activeIdentityMeta = IDENTITY_PILLS.find((p) => p.id === activeIdentityId) || null;

  const prismParallaxAngle = pointer.isFine && !isReduced ? pointer.x * 4 : 0;

  // =========================================================================
  // REDUCED MOTION VIEW: Static Stacked Sections (No Pinning, Simple Fades)
  // =========================================================================
  if (isReduced) {
    return (
      <article
        id={chapter.id}
        data-chapter="2"
        data-accent="all"
        aria-label="Chapter 02: I Found More Than One World"
        className="relative w-full py-20 px-6 sm:px-12 bg-cinema-bg text-cinema-text"
      >
        <div className="max-w-4xl mx-auto space-y-24">
          {/* Header */}
          <header className="space-y-4 text-center">
            <span className="font-mono text-xs uppercase tracking-widest text-cinema-gold font-medium">
              CHAPTER 02
            </span>
            <h2 className="text-fluid-h1 font-serif font-normal tracking-tight text-cinema-text">
              <Content value={chapter02Content.title} />
            </h2>
            {chapter02Content.subtitle && (
              <p className="font-serif italic text-base sm:text-lg text-cinema-muted">
                <Content value={chapter02Content.subtitle} />
              </p>
            )}
          </header>

          {/* 1. The Split Prism Illustration */}
          <figure className="relative w-full max-w-lg mx-auto flex flex-col items-center justify-center">
            <figcaption className="sr-only">
              A beam of light passes through a prism, splits into four colours, and is joined again into a single beam.
            </figcaption>
            <svg
              viewBox="0 0 800 500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="w-full max-h-[300px] overflow-visible"
            >
              <Beams
                inputProgress={1}
                fanProgress={1}
                crossingProgress={0}
                recombinedProgress={0}
              />
              <Prism x={PRISM_1_COORDS.center.x} y={PRISM_1_COORDS.center.y} />
            </svg>
          </figure>

          {/* 2. Four Stacked World Sections */}
          <section className="space-y-20">
            {/* World 1: The Builder */}
            <div className="space-y-4">
              <BuilderWorld progress={1} identity={builderIdentity} isStatic />
              {isContentRenderable(builderIdentity.feedsOthers) && (
                <p className="text-center font-serif italic text-xs text-theme-azure/80">
                  <Content value={builderIdentity.feedsOthers} />
                </p>
              )}
            </div>

            {/* World 2: The Engineer of Intelligence */}
            <div className="space-y-4">
              <IntelligenceWorld progress={1} identity={intelIdentity} isStatic />
              {isContentRenderable(intelIdentity.feedsOthers) && (
                <p className="text-center font-serif italic text-xs text-theme-iris/80">
                  <Content value={intelIdentity.feedsOthers} />
                </p>
              )}
            </div>

            {/* World 3: The Visual Thinker */}
            <div className="space-y-4">
              <VisualWorld progress={1} identity={visualIdentity} isStatic />
              {isContentRenderable(visualIdentity.feedsOthers) && (
                <p className="text-center font-serif italic text-xs text-theme-rose/80">
                  <Content value={visualIdentity.feedsOthers} />
                </p>
              )}
            </div>

            {/* World 4: The Explorer */}
            <div className="space-y-4">
              <ExplorerWorld progress={1} identity={explorerIdentity} isStatic />
              {isContentRenderable(explorerIdentity.feedsOthers) && (
                <p className="text-center font-serif italic text-xs text-theme-ember/80">
                  <Content value={explorerIdentity.feedsOthers} />
                </p>
              )}
            </div>
          </section>

          {/* 3. Convergence & Recombined Prism */}
          <footer className="space-y-8 text-center pt-12 border-t border-cinema-border/60">
            <svg
              viewBox="0 0 800 300"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="w-full max-h-[180px] overflow-visible mx-auto"
            >
              <Prism x={400} y={100} inverted />
              <line x1="400" y1="150" x2="400" y2="280" stroke="var(--color-accent-gold)" strokeWidth="2.5" />
              <circle cx="400" cy="280" r="4" fill="var(--color-accent-gold)" />
            </svg>

            <p className="font-serif italic text-xl sm:text-2xl text-cinema-text max-w-2xl mx-auto leading-relaxed">
              <Content value={chapter02Content.convergenceNarration} />
            </p>

            {chapter02Content.bridge && (
              <p className="font-serif italic text-sm text-cinema-muted/85 max-w-lg mx-auto">
                <Content value={chapter02Content.bridge} />
              </p>
            )}
          </footer>
        </div>
      </article>
    );
  }

  // =========================================================================
  // STANDARD MOTION VIEW: Continuous Pinned Refracting Prism & Worlds
  // =========================================================================
  const activeBeatIndex =
    phases.progress < 0.25
      ? 0
      : phases.progress < 0.65
        ? 1
        : phases.progress < 0.80
          ? 2
          : phases.progress < 0.92
            ? 3
            : 4;

  const activeWorldsCount = [
    phases.builderProgress > 0.1,
    phases.intelligenceProgress > 0.1,
    phases.visualProgress > 0.1,
    phases.explorerProgress > 0.1,
  ].filter(Boolean).length;

  const convergencePercent = Math.min(100, Math.round(phases.progress * 105));

  return (
    <article
      ref={sceneRef}
      id={chapter.id}
      data-chapter="2"
      data-accent="all"
      aria-label="Chapter 02: I Found More Than One World"
      className="relative w-full bg-cinema-bg text-cinema-text select-none"
    >
      <div
        ref={pinContentRef}
        className="w-full h-[100svh] min-h-[100dvh] flex flex-col justify-between py-6 sm:py-10 px-6 sm:px-12 relative overflow-hidden"
      >
        {/* Top 1.5px Spectrum Progress Hairline */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 h-[1.5px] z-30 transition-all duration-150 bg-gradient-to-r from-sunrise-azure via-sunrise-iris to-sunrise-ember"
          style={{ width: `${Math.round(phases.progress * 100)}%` }}
        />

        {/* Subtle Architectural Blueprint Corner Crosshairs */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-4 sm:inset-6 z-10 opacity-25">
          <span className="absolute top-0 left-0 font-mono text-xs text-cinema-gold">+</span>
          <span className="absolute top-0 right-0 font-mono text-xs text-cinema-gold">+</span>
          <span className="absolute bottom-0 left-0 font-mono text-xs text-cinema-gold">+</span>
          <span className="absolute bottom-0 right-0 font-mono text-xs text-cinema-gold">+</span>
        </div>

        {/* Upper Left: Outlined "02" Numeral (Instrument Serif lining numerals, 1px stroke, ≤ 20% opacity) */}
        <div
          aria-hidden="true"
          className="absolute top-4 left-6 sm:top-8 sm:left-12 pointer-events-none z-10 transition-opacity duration-300"
          style={{ opacity: phases.numeralOpacity }}
        >
          <span
            className="font-serif font-normal select-none block"
            style={{
              fontSize: 'clamp(4.5rem, 11vw, 9.5rem)',
              lineHeight: 0.9,
              fontVariantNumeric: 'lining-nums',
              WebkitTextStroke: '1px var(--color-accent-gold)',
              color: 'transparent',
            }}
          >
            02
          </span>
        </div>

        {/* Interactive Clickable Beat Progress Indicator in Top-Right */}
        <nav
          aria-label="Chapter 02 story beats"
          className="absolute top-6 right-6 sm:top-10 sm:right-12 z-30 hidden sm:flex items-center gap-3"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-cinema-muted/70">
            0{activeBeatIndex + 1}/05
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-cinema-gold/90">
            {BEAT_STOPS[activeBeatIndex].label}
          </span>
          <div className="flex items-center gap-1.5">
            {BEAT_STOPS.map((beat, idx) => (
              <button
                key={beat.label}
                type="button"
                onClick={() => handleJumpToBeat(beat.progress)}
                aria-label={`Jump to ${beat.label}`}
                title={`Jump to ${beat.label}`}
                className={cn(
                  'h-1.5 rounded-full transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-cinema-gold',
                  idx === activeBeatIndex
                    ? 'w-6 bg-cinema-gold'
                    : idx < activeBeatIndex
                      ? 'w-2.5 bg-cinema-gold/45 hover:bg-cinema-gold/80'
                      : 'w-2 bg-cinema-border hover:bg-cinema-muted/60'
                )}
              />
            ))}
          </div>
        </nav>

        {/* Top Center: ChapterLabel "CHAPTER 02" & Title (0% to 12%) */}
        <header
          className="relative z-20 max-w-2xl mx-auto w-full text-center pt-2 sm:pt-4 transition-all duration-300"
          style={{
            opacity: phases.titleOpacity,
            transform: `translateY(${phases.progress > 0.1 ? '-16px' : '0px'})`,
            pointerEvents: phases.titleOpacity > 0.1 ? 'auto' : 'none',
          }}
        >
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-cinema-gold font-medium">
              CHAPTER 02
            </span>
          </div>
          <h2 className="text-fluid-h2 font-serif font-normal tracking-tight text-cinema-text leading-[1.1]">
            <Content value={chapter02Content.title} />
          </h2>
          {chapter02Content.subtitle && (
            <p className="font-serif italic text-xs sm:text-sm text-cinema-muted mt-1">
              <Content value={chapter02Content.subtitle} />
            </p>
          )}
        </header>

        {/* Center: The Prism Canvas & The 4 Worlds */}
        <figure className="relative z-10 flex-1 flex items-center justify-center my-auto w-full max-h-[62vh]">
          <figcaption className="sr-only">
            A beam of light passes through a prism, splits into four colours, and is joined again into a single beam.
          </figcaption>

          {/* SVG Canvas for Prism & Light Beams */}
          <svg
            viewBox="0 0 800 800"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="absolute inset-0 w-full h-full overflow-visible select-none"
          >
            {/* 1. The Light Beams (Input, 4 Fanned, Cross Flares, Recombined) */}
            <Beams
              inputProgress={phases.inputBeamProgress}
              fanProgress={phases.fanProgress}
              crossingProgress={phases.crossingProgress}
              recombinedProgress={phases.recombinedBeamProgress}
              parallaxOffset={prismParallaxAngle}
            />

            {/* 2. Prism 1 (Refracting: apex pointing up at top) */}
            <Prism
              x={PRISM_1_COORDS.center.x}
              y={PRISM_1_COORDS.center.y}
              rotation={prismParallaxAngle}
              opacity={phases.progress < 0.85 ? 1 : Math.max(0, 1 - (phases.progress - 0.85) / 0.08)}
            />

            {/* 3. Inverted Prism 2 (Converging: apex pointing down for recombination, 80-92%) */}
            {phases.invertedPrismOpacity > 0 && (
              <Prism
                x={PRISM_2_COORDS.center.x}
                y={PRISM_2_COORDS.center.y}
                inverted
                opacity={phases.invertedPrismOpacity}
                rotation={-prismParallaxAngle * 0.5}
              />
            )}
          </svg>

          {/* Centered World View Layer (25% to 65%: Four Worlds drawn sequentially) */}
          <div className="relative z-20 w-full h-full flex items-center justify-center pointer-events-none">
            {/* World 1: The Builder (azure) */}
            {phases.builderProgress > 0 && (
              <div
                className="absolute inset-0 flex items-center justify-center transition-opacity duration-200"
                style={{ opacity: phases.builderProgress }}
              >
                <BuilderWorld progress={phases.builderProgress} identity={builderIdentity} />
              </div>
            )}

            {/* World 2: The Engineer of Intelligence (iris) */}
            {phases.intelligenceProgress > 0 && (
              <div
                className="absolute inset-0 flex items-center justify-center transition-opacity duration-200"
                style={{ opacity: phases.intelligenceProgress }}
              >
                <IntelligenceWorld progress={phases.intelligenceProgress} identity={intelIdentity} />
              </div>
            )}

            {/* World 3: The Visual Thinker (rose) */}
            {phases.visualProgress > 0 && (
              <div
                className="absolute inset-0 flex items-center justify-center transition-opacity duration-200"
                style={{ opacity: phases.visualProgress }}
              >
                <VisualWorld progress={phases.visualProgress} identity={visualIdentity} />
              </div>
            )}

            {/* World 4: The Explorer (ember) */}
            {phases.explorerProgress > 0 && (
              <div
                className="absolute inset-0 flex items-center justify-center transition-opacity duration-200"
                style={{ opacity: phases.explorerProgress }}
              >
                <ExplorerWorld progress={phases.explorerProgress} identity={explorerIdentity} />
              </div>
            )}

            {/* "Feeds the others" Marginal Leader Notes (65% to 80% Beam Crossing) */}
            {phases.feedsOthersOpacity > 0 && (
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300"
                style={{ opacity: phases.feedsOthersOpacity }}
              >
                <div className="grid grid-cols-2 gap-x-16 gap-y-10 max-w-xl mx-auto px-6">
                  {identities.map((item) => (
                    <aside key={item.id} className="text-left space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full bg-sunrise-${item.accent}`} />
                        <span className="font-mono text-[10px] uppercase tracking-wider text-cinema-muted">
                          <Content value={item.role} />
                        </span>
                      </div>
                      <p className="font-serif italic text-xs sm:text-sm text-cinema-text/90 leading-snug">
                        <Content value={item.feedsOthers} />
                      </p>
                    </aside>
                  ))}
                </div>
              </div>
            )}

            {/* Interactive Discipline Spec Card Overlay */}
            {activeIdentity && activeIdentityMeta && (
              <aside
                role="dialog"
                aria-label={`${getContentText(activeIdentity.name)} details`}
                className="pointer-events-auto absolute bottom-2 sm:bottom-4 right-2 sm:right-8 z-30 max-w-xs w-[calc(100%-1rem)] sm:w-80 rounded-xl border border-cinema-gold/30 bg-cinema-surface/90 backdrop-blur-md p-4 shadow-2xl transition-all duration-300 text-left"
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cinema-gold">
                      {activeIdentityMeta.index} · <Content value={activeIdentity.role} />
                    </span>
                    <h3 className="font-serif text-lg text-cinema-text leading-snug">
                      <Content value={activeIdentity.name} />
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveIdentityId(null)}
                    aria-label="Close discipline note"
                    className="text-cinema-muted hover:text-cinema-text p-1 rounded-md transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="font-sans text-xs text-cinema-muted leading-relaxed mb-2.5">
                  <Content value={activeIdentity.description} />
                </p>
                <div className="pt-2 border-t border-cinema-border text-[11px] font-serif italic text-cinema-text/90">
                  <Content value={activeIdentity.feedsOthers} />
                </div>
              </aside>
            )}
          </div>
        </figure>

        {/* Lower Third: Convergence Narration & Quiet Bridge Line (80% to 100%) */}
        <footer className="relative z-20 w-full max-w-3xl mx-auto pb-4 sm:pb-6 text-center min-h-[90px] flex flex-col justify-end">
          {/* Accessible Screen-Reader Announcement */}
          <div className="sr-only" aria-live="polite">
            {getContentText(chapter02Content.convergenceNarration)}
          </div>

          {/* Live Terminal Command Readout */}
          <div className="mb-2.5 flex justify-center">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cinema-border/70 bg-cinema-surface/75 font-mono text-[10px] sm:text-[11px] tracking-[0.06em] text-cinema-gold/90 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-cinema-gold animate-pulse" />
              {BEAT_STOPS[activeBeatIndex].cmd}
            </span>
          </div>

          {/* Convergence Subtitle Reveal (80% to 92%) */}
          <div
            className="transition-opacity duration-300"
            style={{
              opacity: phases.narrationOpacity,
              display: phases.narrationOpacity > 0 ? 'block' : 'none',
            }}
          >
            <p
              className="font-serif italic leading-[1.35] text-cinema-text max-w-[28ch] mx-auto text-center"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
            >
              <Content value={chapter02Content.convergenceNarration} />
            </p>
          </div>

          {/* Quiet Unlabeled Bridge Line (92% to 100%) */}
          {chapter02Content.bridge && (
            <div
              className="mt-3 transition-opacity duration-300"
              style={{
                opacity: phases.bridgeOpacity,
                display: phases.bridgeOpacity > 0 ? 'block' : 'none',
              }}
            >
              <p className="font-serif italic text-xs sm:text-sm text-cinema-muted/85 max-w-lg mx-auto">
                <Content value={chapter02Content.bridge} />
              </p>
            </div>
          )}

          {/* Bottom Interactive Discipline Bar + Live Convergence Telemetry */}
          <div className="mt-4 pt-3 border-t border-cinema-border/40 flex flex-wrap items-center justify-between gap-3 pointer-events-auto text-[10px] font-mono uppercase tracking-[0.18em]">
            <div className="flex flex-wrap items-center justify-center gap-1.5 mx-auto sm:mx-0" role="group" aria-label="Inspect disciplines">
              {IDENTITY_PILLS.map((pill) => {
                const isSelected = activeIdentityId === pill.id;
                return (
                  <button
                    key={pill.id}
                    type="button"
                    onClick={() => setActiveIdentityId(isSelected ? null : pill.id)}
                    className={cn(
                      'px-2.5 py-1 rounded-md border transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-cinema-gold',
                      isSelected
                        ? pill.accentClass
                        : 'border-cinema-border/70 bg-cinema-surface/50 text-cinema-muted hover:text-cinema-text hover:border-cinema-gold/40'
                    )}
                  >
                    {pill.index} {pill.shortLabel}
                  </button>
                );
              })}
            </div>

            <div className="hidden sm:flex items-center gap-4 text-cinema-muted/80">
              <span>
                WORLDS:{' '}
                <strong className="text-cinema-gold font-medium">
                  {phases.progress >= 0.8 ? 4 : activeWorldsCount}/4
                </strong>
              </span>
              <span>
                SYNC:{' '}
                <strong className="text-cinema-gold font-medium">
                  {phases.progress >= 0.94 ? 'UNIFIED' : `${convergencePercent}%`}
                </strong>
              </span>
            </div>
          </div>
        </footer>
      </div>
    </article>
  );
}
