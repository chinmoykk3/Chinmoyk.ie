'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Chapter } from '@/content/chapters';
import { useMotion } from '@/hooks/useMotion';
import { Content } from '@/components/content/Content';
import { isContentRenderable, getContentText } from '@/content/schema';
import { chapter01PersonalNotes } from '@/content/chapter01';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MechanismIllustration } from './MechanismIllustration';
import { computeChapter01Phases } from './chapter01.timeline';
import { cn } from '@/lib/utils';

export interface Chapter01Props {
  chapter: Chapter;
}

export function Chapter01({ chapter }: Chapter01Props) {
  const { motionEnabled, prefersReducedMotion } = useMotion();
  const sceneRef = useRef<HTMLElement>(null);
  const pinContentRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const isReduced = prefersReducedMotion || !motionEnabled;

  // Extract verified narration lines from content
  const narrationFields = Array.isArray(chapter.narration) ? chapter.narration : [];
  const line1Field = narrationFields[0];
  const line2Field = narrationFields[1];
  const line3Field = narrationFields[2];

  // Optional personal reflection notes from /content/chapter01.ts
  const sparkNote = chapter01PersonalNotes?.spark;
  const buildNote = chapter01PersonalNotes?.firstBuild;
  const experimentNote = chapter01PersonalNotes?.experimenting;

  // Compute scrubbed kinetic states
  const phases = computeChapter01Phases(scrollProgress, isReduced);

  // Pinned GSAP ScrollTrigger timeline (~400vh desktop, ~300vh mobile)
  useEffect(() => {
    const triggerEl = sceneRef.current;
    const contentEl = pinContentRef.current;
    if (!triggerEl || !contentEl) return;

    if (isReduced) {
      setScrollProgress(1);
      return;
    }

    const isMobile = window.innerWidth < 768;
    const pinScrollDistance = isMobile ? '+=260%' : '+=360%';

    const trigger = ScrollTrigger.create({
      trigger: triggerEl,
      start: 'top top',
      end: pinScrollDistance,
      pin: contentEl,
      pinSpacing: true,
      scrub: 0.5,
      onUpdate: (self) => {
        setScrollProgress(self.progress);
        // Expose chapter progress for background scene and root exposure token
        document.documentElement.style.setProperty(
          '--ch01-progress',
          self.progress.toFixed(3)
        );
        if (self.progress >= 0.85) {
          const lift = Math.min(1, (self.progress - 0.85) / 0.15) * 0.08;
          document.documentElement.style.setProperty('--exposure-lift', lift.toFixed(3));
        } else {
          document.documentElement.style.removeProperty('--exposure-lift');
        }
      },
    });

    return () => {
      trigger.kill();
      document.documentElement.style.removeProperty('--ch01-progress');
      document.documentElement.style.removeProperty('--exposure-lift');
    };
  }, [isReduced]);

  // =========================================================================
  // REDUCED MOTION VIEW: Sequential Accessible Stills (No Pinning, Simple Fades)
  // =========================================================================
  if (isReduced) {
    return (
      <article
        id={chapter.id}
        data-chapter="1"
        data-accent="gold"
        aria-label="Chapter 01: It Started With Curiosity"
        className="relative w-full py-20 px-6 sm:px-12 bg-black text-theme-text"
      >
        <div className="max-w-4xl mx-auto space-y-24">
          {/* Header */}
          <header className="space-y-4 text-center">
            <span className="font-mono text-xs uppercase tracking-widest text-theme-gold font-medium">
              CHAPTER 01
            </span>
            <h2 className="text-fluid-h1 font-serif font-normal tracking-tight text-theme-text">
              <Content value={chapter.title} />
            </h2>
            {chapter.subtitle && (
              <p className="font-serif italic text-base sm:text-lg text-theme-muted">
                <Content value={chapter.subtitle} />
              </p>
            )}
          </header>

          {/* Still 1: Assembled / Understand */}
          <section className="space-y-6 text-center">
            <div className="h-[40vh] max-h-[380px] w-full flex items-center justify-center">
              <MechanismIllustration progress={0.2} isReducedMotion staticMode="assembled" />
            </div>
            {line1Field && (
              <p className="font-serif text-xl sm:text-2xl text-theme-text max-w-xl mx-auto leading-relaxed">
                <Content value={line1Field} />
              </p>
            )}
            {isContentRenderable(sparkNote) && (
              <aside className="text-xs italic text-theme-gold/80 max-w-sm mx-auto">
                <Content value={sparkNote} />
              </aside>
            )}
          </section>

          {/* Still 2: Exploded / Deconstruct */}
          <section className="space-y-6 text-center">
            <div className="h-[40vh] max-h-[380px] w-full flex items-center justify-center">
              <MechanismIllustration progress={0.4} isReducedMotion staticMode="exploded" />
            </div>
            {line2Field && (
              <p className="font-serif text-xl sm:text-2xl text-theme-text max-w-xl mx-auto leading-relaxed">
                <Content value={line2Field} />
              </p>
            )}
            {isContentRenderable(buildNote) && (
              <aside className="text-xs italic text-theme-gold/80 max-w-sm mx-auto">
                <Content value={buildNote} />
              </aside>
            )}
          </section>

          {/* Still 3: Rebuilt / Creation */}
          <section className="space-y-6 text-center">
            <div className="h-[40vh] max-h-[380px] w-full flex items-center justify-center">
              <MechanismIllustration progress={0.8} isReducedMotion staticMode="rebuilt" />
            </div>
            {line3Field && (
              <p className="font-serif text-xl sm:text-2xl text-theme-text max-w-xl mx-auto leading-relaxed">
                <Content value={line3Field} />
              </p>
            )}
            {isContentRenderable(experimentNote) && (
              <aside className="text-xs italic text-theme-gold/80 max-w-sm mx-auto">
                <Content value={experimentNote} />
              </aside>
            )}
            {chapter.bridge && (
              <footer className="pt-8">
                <p className="font-serif italic text-sm sm:text-base text-theme-muted/80 max-w-lg mx-auto">
                  <Content value={chapter.bridge} />
                </p>
              </footer>
            )}
          </section>
        </div>
      </article>
    );
  }

  // =========================================================================
  // STANDARD MOTION VIEW: Continuous Pinned Cinematic Narrative Scrub
  // =========================================================================
  return (
    <article
      ref={sceneRef}
      id={chapter.id}
      data-chapter="1"
      data-accent="gold"
      aria-label="Chapter 01: It Started With Curiosity"
      className="relative w-full bg-black text-theme-text select-none"
    >
      <div
        ref={pinContentRef}
        className="w-full h-[100svh] min-h-[100dvh] flex flex-col justify-between py-6 sm:py-10 px-6 sm:px-12 relative overflow-hidden"
      >
        {/* Upper Left: Outlined "01" Numeral (Instrument Serif lining numerals, no slashed zero, 1px gold stroke, ≤ 20% opacity) */}
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
            01
          </span>
        </div>

        {/* Top Center: Small "CHAPTER 01" ChapterLabel above Title */}
        <header
          className="relative z-20 max-w-2xl mx-auto w-full text-center pt-2 sm:pt-4 transition-all duration-300"
          style={{
            opacity: phases.titleCardOpacity,
            transform: `translateY(${phases.progress > 0.12 ? '-16px' : '0px'})`,
            pointerEvents: phases.titleCardOpacity > 0.1 ? 'auto' : 'none',
          }}
        >
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-theme-gold font-medium">
              CHAPTER 01
            </span>
          </div>
          <h2 className="text-fluid-h2 font-serif font-normal tracking-tight text-theme-text leading-[1.1]">
            <Content value={chapter.title} />
          </h2>
          {chapter.subtitle && (
            <p className="font-serif italic text-xs sm:text-sm text-theme-muted mt-1">
              <Content value={chapter.subtitle} />
            </p>
          )}
        </header>

        {/* Center: The Mechanism Illustration (Large & Centered, 55-60vh tall) */}
        <div className="relative z-10 flex-1 flex items-center justify-center my-auto w-full max-h-[58vh]">
          <MechanismIllustration
            progress={phases.mechanismProgress}
            isReducedMotion={false}
          />

          {/* Optional Confirmed Marginal Reflections with thin gold leader lines */}
          {isContentRenderable(sparkNote) && phases.line1Opacity > 0.3 && (
            <aside
              className="absolute left-4 sm:left-12 top-1/4 max-w-[200px] text-xs font-serif italic text-theme-gold/80 transition-opacity duration-300 pointer-events-none"
              style={{ opacity: phases.line1Opacity }}
            >
              <div className="w-12 h-px bg-theme-gold/40 mb-2" />
              <Content value={sparkNote} />
            </aside>
          )}

          {isContentRenderable(buildNote) && phases.line2Opacity > 0.3 && (
            <aside
              className="absolute right-4 sm:right-12 top-1/3 max-w-[200px] text-xs font-serif italic text-theme-gold/80 transition-opacity duration-300 pointer-events-none"
              style={{ opacity: phases.line2Opacity }}
            >
              <div className="w-12 h-px bg-theme-gold/40 mb-2 ml-auto" />
              <Content value={buildNote} />
            </aside>
          )}

          {isContentRenderable(experimentNote) && phases.line3Opacity > 0.3 && (
            <aside
              className="absolute left-6 sm:left-16 bottom-1/4 max-w-[200px] text-xs font-serif italic text-theme-gold/80 transition-opacity duration-300 pointer-events-none"
              style={{ opacity: phases.line3Opacity }}
            >
              <div className="w-12 h-px bg-theme-gold/40 mb-2" />
              <Content value={experimentNote} />
            </aside>
          )}
        </div>

        {/* Lower Third: Scrubbed SubtitleReveal Narration Lines */}
        {/* Full text is always in the DOM for accessibility and screen readers */}
        <footer className="relative z-20 w-full max-w-3xl mx-auto pb-4 sm:pb-8 text-center min-h-[90px] flex flex-col justify-end">
          {/* Accessible Screen-Reader Announcement */}
          <div className="sr-only" aria-live="polite">
            {[line1Field, line2Field, line3Field]
              .map(getContentText)
              .filter(Boolean)
              .join(' ')}
          </div>

          {/* Visual scrubbed subtitle container */}
          <div className="relative w-full flex items-center justify-center">
            {/* Narration Line 1 */}
            {line1Field && (
              <p
                aria-hidden={phases.line1Opacity < 0.1 ? 'true' : undefined}
                className="font-serif italic leading-[1.35] text-theme-text transition-opacity duration-200 pointer-events-none max-w-[28ch] mx-auto text-center"
                style={{
                  fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                  opacity: phases.line1Opacity,
                  position: phases.line1Opacity > 0 ? 'relative' : 'absolute',
                  display: phases.line1Opacity > 0 ? 'block' : 'none',
                }}
              >
                <Content value={line1Field} />
              </p>
            )}

            {/* Narration Line 2 */}
            {line2Field && (
              <p
                aria-hidden={phases.line2Opacity < 0.1 ? 'true' : undefined}
                className="font-serif italic leading-[1.35] text-theme-text transition-opacity duration-200 pointer-events-none max-w-[28ch] mx-auto text-center"
                style={{
                  fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                  opacity: phases.line2Opacity,
                  position: phases.line2Opacity > 0 ? 'relative' : 'absolute',
                  display: phases.line2Opacity > 0 ? 'block' : 'none',
                }}
              >
                <Content value={line2Field} />
              </p>
            )}

            {/* Narration Line 3 */}
            {line3Field && (
              <p
                aria-hidden={phases.line3Opacity < 0.1 ? 'true' : undefined}
                className="font-serif italic leading-[1.35] text-theme-text transition-opacity duration-200 pointer-events-none max-w-[28ch] mx-auto text-center"
                style={{
                  fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                  opacity: phases.line3Opacity,
                  position: phases.line3Opacity > 0 ? 'relative' : 'absolute',
                  display: phases.line3Opacity > 0 ? 'block' : 'none',
                }}
              >
                <Content value={line3Field} />
              </p>
            )}
          </div>

          {/* Quiet Unlabeled Bridge Line (85% - 100%) */}
          {chapter.bridge && (
            <div
              className="mt-3 transition-opacity duration-300"
              style={{
                opacity: phases.bridgeOpacity,
                display: phases.bridgeOpacity > 0 ? 'block' : 'none',
              }}
            >
              <p className="font-serif italic text-xs sm:text-sm text-theme-muted/80 max-w-lg mx-auto">
                <Content value={chapter.bridge} />
              </p>
            </div>
          )}
        </footer>
      </div>
    </article>
  );
}
