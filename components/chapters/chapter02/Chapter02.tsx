'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Chapter } from '@/content/chapters';
import { chapter02Content } from '@/content/chapter02';
import { useMotion } from '@/hooks/useMotion';
import { Content } from '@/components/content/Content';
import { isContentRenderable, getContentText } from '@/content/schema';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Prism } from './Prism';
import { Beams } from './Beams';
import { BuilderWorld } from './worlds/BuilderWorld';
import { IntelligenceWorld } from './worlds/IntelligenceWorld';
import { VisualWorld } from './worlds/VisualWorld';
import { ExplorerWorld } from './worlds/ExplorerWorld';
import { computeChapter02Phases } from './chapter02.timeline';
import { PRISM_1_COORDS, PRISM_2_COORDS, BEAMS_CONFIG } from './chapter02.config';
import { cn } from '@/lib/utils';

export interface Chapter02Props {
  chapter: Chapter;
}

export function Chapter02({ chapter }: Chapter02Props) {
  const { motionEnabled, prefersReducedMotion } = useMotion();
  const sceneRef = useRef<HTMLElement>(null);
  const pinContentRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
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
    const pinScrollDistance = isMobile ? '+=460%' : '+=600%';

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

    return () => {
      trigger.kill();
      document.documentElement.style.removeProperty('--ch02-progress');
      document.documentElement.style.removeProperty('--exposure-lift');
    };
  }, [isReduced]);

  const identities = chapter02Content.identities;
  const builderIdentity = identities[0];
  const intelIdentity = identities[1];
  const visualIdentity = identities[2];
  const explorerIdentity = identities[3];

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
        className="relative w-full py-20 px-6 sm:px-12 bg-black text-theme-text"
      >
        <div className="max-w-4xl mx-auto space-y-24">
          {/* Header */}
          <header className="space-y-4 text-center">
            <span className="font-mono text-xs uppercase tracking-widest text-theme-gold font-medium">
              CHAPTER 02
            </span>
            <h2 className="text-fluid-h1 font-serif font-normal tracking-tight text-theme-text">
              <Content value={chapter02Content.title} />
            </h2>
            {chapter02Content.subtitle && (
              <p className="font-serif italic text-base sm:text-lg text-theme-muted">
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
          <footer className="space-y-8 text-center pt-12 border-t border-theme-border/40">
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

            <p className="font-serif italic text-xl sm:text-2xl text-theme-text max-w-2xl mx-auto leading-relaxed">
              <Content value={chapter02Content.convergenceNarration} />
            </p>

            {chapter02Content.bridge && (
              <p className="font-serif italic text-sm text-theme-muted/80 max-w-lg mx-auto">
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
  return (
    <article
      ref={sceneRef}
      id={chapter.id}
      data-chapter="2"
      data-accent="all"
      aria-label="Chapter 02: I Found More Than One World"
      className="relative w-full bg-black text-theme-text select-none"
    >
      <div
        ref={pinContentRef}
        className="w-full h-[100svh] min-h-[100dvh] flex flex-col justify-between py-6 sm:py-10 px-6 sm:px-12 relative overflow-hidden"
      >
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
            <span className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-theme-gold font-medium">
              CHAPTER 02
            </span>
          </div>
          <h2 className="text-fluid-h2 font-serif font-normal tracking-tight text-theme-text leading-[1.1]">
            <Content value={chapter02Content.title} />
          </h2>
          {chapter02Content.subtitle && (
            <p className="font-serif italic text-xs sm:text-sm text-theme-muted mt-1">
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
                        <span className={`w-1.5 h-1.5 rounded-full bg-theme-${item.accent}`} />
                        <span className="font-mono text-[10px] uppercase tracking-wider text-theme-muted">
                          <Content value={item.role} />
                        </span>
                      </div>
                      <p className="font-serif italic text-xs sm:text-sm text-theme-text/90 leading-snug">
                        <Content value={item.feedsOthers} />
                      </p>
                    </aside>
                  ))}
                </div>
              </div>
            )}
          </div>
        </figure>

        {/* Lower Third: Convergence Narration & Quiet Bridge Line (80% to 100%) */}
        <footer className="relative z-20 w-full max-w-3xl mx-auto pb-4 sm:pb-8 text-center min-h-[90px] flex flex-col justify-end">
          {/* Accessible Screen-Reader Announcement */}
          <div className="sr-only" aria-live="polite">
            {getContentText(chapter02Content.convergenceNarration)}
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
              className="font-serif italic leading-[1.35] text-theme-text max-w-[28ch] mx-auto text-center"
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
              <p className="font-serif italic text-xs sm:text-sm text-theme-muted/80 max-w-lg mx-auto">
                <Content value={chapter02Content.bridge} />
              </p>
            </div>
          )}
        </footer>
      </div>
    </article>
  );
}
