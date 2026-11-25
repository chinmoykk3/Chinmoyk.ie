'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Chapter } from '@/content/chapters';
import { chapter01Content } from '@/content/chapter01';
import { useMotion } from '@/hooks/useMotion';
import { Content } from '@/components/content/Content';
import { isContentRenderable, getContentText } from '@/content/schema';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X } from 'lucide-react';
import { Workbench } from './Workbench';
import { DarknessVeil } from './DarknessVeil';
import { WORKBENCH_OBJECTS, ObjectConfig } from './chapter01.config';
import { computeChapter01Phases } from './chapter01.timeline';
import { cn } from '@/lib/utils';

export interface Chapter01Props {
  chapter: Chapter;
}

const BEAT_STOPS = [
  { label: 'Awaken', progress: 0.04 },
  { label: 'Observe', progress: 0.24 },
  { label: 'Question', progress: 0.48 },
  { label: 'Assemble', progress: 0.72 },
  { label: 'Ignite', progress: 0.92 },
];

export function Chapter01({ chapter }: Chapter01Props) {
  const { motionEnabled, prefersReducedMotion, lenis } = useMotion();
  const sceneRef = useRef<HTMLElement>(null);
  const pinContentRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeObjectId, setActiveObjectId] = useState<ObjectConfig['id'] | null>(null);

  const isReduced = prefersReducedMotion || !motionEnabled;

  const narrationLines = chapter01Content.narrationLines;
  const line1 = narrationLines[0];
  const line2 = narrationLines[1];
  const line3 = narrationLines[2];

  const personalNotes = chapter01Content.personalNotes;
  const sparkNote = personalNotes?.spark;
  const buildNote = personalNotes?.firstBuild;
  const experimentNote = personalNotes?.experimenting;

  // Compute scrubbed kinetic states
  const phases = computeChapter01Phases(scrollProgress, isReduced);

  // Pinned GSAP ScrollTrigger timeline (~600vh desktop, ~480vh mobile)
  useEffect(() => {
    const triggerEl = sceneRef.current;
    const contentEl = pinContentRef.current;
    if (!triggerEl || !contentEl) return;

    if (isReduced) {
      setScrollProgress(1);
      return;
    }

    const isMobile = window.innerWidth < 768;
    const pinScrollDistance = isMobile ? '+=260%' : '+=320%';

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
          '--ch01-progress',
          self.progress.toFixed(3)
        );
        if (self.progress >= 0.78) {
          const lift = Math.min(1, (self.progress - 0.78) / 0.15) * 0.12;
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
      document.documentElement.style.removeProperty('--ch01-progress');
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

  const activeObject = WORKBENCH_OBJECTS.find((obj) => obj.id === activeObjectId) || null;

  // =========================================================================
  // REDUCED MOTION VIEW: Three Static Sequential Stills (No Pinning, Simple Fades)
  // =========================================================================
  if (isReduced) {
    return (
      <article
        id={chapter.id}
        data-chapter="1"
        data-accent="gold"
        aria-label="Chapter 01: It Started With Curiosity"
        className="relative w-full py-20 px-6 sm:px-12 bg-cinema-bg text-cinema-text"
      >
        <div className="max-w-4xl mx-auto space-y-24">
          {/* Header */}
          <header className="space-y-4 text-center">
            <span className="font-mono text-xs uppercase tracking-widest text-cinema-gold font-medium">
              CHAPTER 01
            </span>
            <h2 className="text-fluid-h1 font-serif font-normal tracking-tight text-cinema-text">
              <Content value={chapter01Content.title} />
            </h2>
            {chapter01Content.subtitle && (
              <p className="font-serif italic text-base sm:text-lg text-cinema-muted">
                <Content value={chapter01Content.subtitle} />
              </p>
            )}
          </header>

          {/* Still 1: Dark Workbench with closed objects & Line 1 */}
          <section className="space-y-6 text-center">
            <div className="h-[40vh] max-h-[380px] w-full flex items-center justify-center">
              <Workbench
                phases={computeChapter01Phases(0.15, true)}
                isReducedMotion
              />
            </div>
            {line1 && (
              <p className="font-serif text-xl sm:text-2xl text-cinema-text max-w-xl mx-auto leading-relaxed">
                <Content value={line1} />
              </p>
            )}
            {isContentRenderable(sparkNote) && (
              <aside className="text-xs italic text-cinema-gold/80 max-w-sm mx-auto">
                <Content value={sparkNote} />
              </aside>
            )}
          </section>

          {/* Still 2: Objects Open & Line 2 */}
          <section className="space-y-6 text-center">
            <div className="h-[40vh] max-h-[380px] w-full flex items-center justify-center">
              <Workbench
                phases={{
                  ...computeChapter01Phases(0.45, true),
                  watchOpenProgress: 1,
                  radioOpenProgress: 1,
                  lensOpenProgress: 1,
                  circuitOpenProgress: 1,
                  interiorMotionSpeed: 0,
                  isIgnited: false,
                  assemblyFlightProgress: 0,
                }}
                isReducedMotion
              />
            </div>
            {line2 && (
              <p className="font-serif text-xl sm:text-2xl text-cinema-text max-w-xl mx-auto leading-relaxed">
                <Content value={line2} />
              </p>
            )}
            {isContentRenderable(buildNote) && (
              <aside className="text-xs italic text-cinema-gold/80 max-w-sm mx-auto">
                <Content value={buildNote} />
              </aside>
            )}
          </section>

          {/* Still 3: Lamp Assembled & Lit & Line 3 */}
          <section className="space-y-6 text-center">
            <div className="h-[40vh] max-h-[380px] w-full flex items-center justify-center">
              <Workbench
                phases={computeChapter01Phases(0.95, true)}
                isReducedMotion
              />
            </div>
            {line3 && (
              <p className="font-serif text-xl sm:text-2xl text-cinema-text max-w-xl mx-auto leading-relaxed">
                <Content value={line3} />
              </p>
            )}
            {isContentRenderable(experimentNote) && (
              <aside className="text-xs italic text-cinema-gold/80 max-w-sm mx-auto">
                <Content value={experimentNote} />
              </aside>
            )}
            {chapter01Content.bridge && (
              <footer className="pt-8">
                <p className="font-serif italic text-sm sm:text-base text-cinema-muted/80 max-w-lg mx-auto">
                  <Content value={chapter01Content.bridge} />
                </p>
              </footer>
            )}
          </section>
        </div>
      </article>
    );
  }

  // =========================================================================
  // STANDARD MOTION VIEW: The Lamp Workbench & Interactive Light
  // =========================================================================
  const activeBeatIndex =
    phases.progress < 0.12
      ? 0
      : phases.progress < 0.38
        ? 1
        : phases.progress < 0.60
          ? 2
          : phases.progress < 0.80
            ? 3
            : 4;

  const lumensPercent = Math.round(15 + (1 - phases.veilDarkness) * 85 + phases.ignitionGlow * 25);
  const clampedLumens = Math.min(100, lumensPercent);
  const partsAssembled = phases.isIgnited
    ? 5
    : Math.min(5, Math.floor(phases.assemblyFlightProgress * 5));

  return (
    <article
      ref={sceneRef}
      id={chapter.id}
      data-chapter="1"
      data-accent="gold"
      aria-label="Chapter 01: It Started With Curiosity"
      className="relative w-full bg-cinema-bg text-cinema-text select-none"
    >
      <div
        ref={pinContentRef}
        className="w-full h-[100svh] min-h-[100dvh] flex flex-col justify-between py-6 sm:py-10 px-6 sm:px-12 relative overflow-hidden"
      >
        {/* Subtle Architectural Blueprint Corner Crosshairs */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-4 sm:inset-6 z-10 opacity-25">
          <span className="absolute top-0 left-0 font-mono text-xs text-cinema-gold">+</span>
          <span className="absolute top-0 right-0 font-mono text-xs text-cinema-gold">+</span>
          <span className="absolute bottom-0 left-0 font-mono text-xs text-cinema-gold">+</span>
          <span className="absolute bottom-0 right-0 font-mono text-xs text-cinema-gold">+</span>
        </div>

        {/* Layer 1: Outlined "01" Numeral in Top-Left (≤ 20% opacity) */}
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

        {/* Interactive Clickable Beat Progress Indicator in Top-Right */}
        <nav
          aria-label="Chapter 01 story beats"
          className="absolute top-6 right-6 sm:top-10 sm:right-12 z-30 hidden sm:flex items-center gap-3"
        >
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

        {/* Layer 2: Workbench SVG Scene (Center) */}
        <div className="relative z-10 flex-1 flex items-center justify-center my-auto w-full max-h-[58vh]">
          <Workbench
            phases={phases}
            isReducedMotion={false}
            activeObjectId={activeObjectId}
            onSelectObject={setActiveObjectId}
          />

          {/* Interactive Curiosity Field Note Overlay when inspecting an object */}
          {activeObject && (
            <aside
              role="dialog"
              aria-label={`${activeObject.name} details`}
              className="absolute bottom-2 sm:bottom-4 right-2 sm:right-8 z-30 max-w-xs w-[calc(100%-1rem)] sm:w-80 rounded-xl border border-cinema-gold/30 bg-cinema-surface/90 backdrop-blur-md p-4 shadow-2xl transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cinema-gold">
                    {activeObject.index} · {activeObject.discipline}
                  </span>
                  <h3 className="font-serif text-lg text-cinema-text leading-snug">
                    {activeObject.name}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveObjectId(null)}
                  aria-label="Close specimen note"
                  className="text-cinema-muted hover:text-cinema-text p-1 rounded-md transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="font-serif italic text-xs sm:text-sm text-cinema-muted leading-relaxed mb-2.5">
                &ldquo;{activeObject.insight}&rdquo;
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-cinema-border text-[10px] font-mono uppercase tracking-[0.16em]">
                <span className="text-cinema-muted">Lamp Part:</span>
                <span className="text-cinema-gold">{activeObject.contributes}</span>
              </div>
            </aside>
          )}

          {/* Optional Confirmed Marginal Reflections with thin gold leader lines */}
          {isContentRenderable(sparkNote) && phases.line1Opacity > 0.3 && (
            <aside
              className="absolute left-4 sm:left-12 top-1/4 max-w-[200px] text-xs font-serif italic text-cinema-gold/80 transition-opacity duration-300 pointer-events-none z-30"
              style={{ opacity: phases.line1Opacity }}
            >
              <div className="w-12 h-px bg-cinema-gold/40 mb-2" />
              <Content value={sparkNote} />
            </aside>
          )}

          {isContentRenderable(buildNote) && phases.line2Opacity > 0.3 && (
            <aside
              className="absolute right-4 sm:right-12 top-1/3 max-w-[200px] text-xs font-serif italic text-cinema-gold/80 transition-opacity duration-300 pointer-events-none z-30"
              style={{ opacity: phases.line2Opacity }}
            >
              <div className="w-12 h-px bg-cinema-gold/40 mb-2 ml-auto" />
              <Content value={buildNote} />
            </aside>
          )}

          {isContentRenderable(experimentNote) && phases.line3Opacity > 0.3 && (
            <aside
              className="absolute left-6 sm:left-16 bottom-1/4 max-w-[200px] text-xs font-serif italic text-cinema-gold/80 transition-opacity duration-300 pointer-events-none z-30"
              style={{ opacity: phases.line3Opacity }}
            >
              <div className="w-12 h-px bg-cinema-gold/40 mb-2" />
              <Content value={experimentNote} />
            </aside>
          )}
        </div>

        {/* Layer 3: Darkness Veil Overlay (Sits ABOVE Workbench SVG, BELOW Text Layer) */}
        <DarknessVeil
          autoX={phases.autoLightX}
          autoY={phases.autoLightY}
          veilDarkness={phases.veilDarkness}
          isIgnited={phases.isIgnited}
          isReducedMotion={false}
        />

        {/* Layer 4: Text Layer (ABOVE the darkness veil, always readable regardless of light position) */}
        {/* Top: ChapterLabel "CHAPTER 01" & Title */}
        <header
          className="absolute top-6 sm:top-10 left-0 right-0 z-30 max-w-2xl mx-auto w-full text-center px-4 transition-all duration-300 pointer-events-none"
          style={{
            opacity: phases.titleOpacity,
            transform: `translateY(${phases.progress > 0.1 ? '-16px' : '0px'})`,
          }}
        >
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-cinema-gold font-medium">
              CHAPTER 01
            </span>
          </div>
          <h2 className="text-fluid-h2 font-serif font-normal tracking-tight text-cinema-text leading-[1.1]">
            <Content value={chapter01Content.title} />
          </h2>
          {chapter01Content.subtitle && (
            <p className="font-serif italic text-xs sm:text-sm text-cinema-muted mt-1">
              <Content value={chapter01Content.subtitle} />
            </p>
          )}
        </header>

        {/* Bottom: SubtitleReveal Narration Lines & Quiet Bridge */}
        <footer className="relative z-30 w-full max-w-3xl mx-auto pb-4 sm:pb-8 text-center min-h-[90px] flex flex-col justify-end pointer-events-none">
          {/* Accessible Screen-Reader Announcement */}
          <div className="sr-only" aria-live="polite">
            {[line1, line2, line3].map(getContentText).filter(Boolean).join(' ')}
          </div>

          {/* Initial Interactive Discovery Hint */}
          {phases.progress < 0.09 && (
            <div className="mb-2 transition-opacity duration-300">
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-cinema-muted/80">
                Move cursor to cast light · Scroll to unfold
              </span>
            </div>
          )}

          {/* Scrubbed Narration Subtitle Container */}
          <div className="relative w-full flex items-center justify-center">
            {/* Narration Line 1 */}
            {line1 && (
              <p
                aria-hidden={phases.line1Opacity < 0.1 ? 'true' : undefined}
                className="font-serif italic leading-[1.35] text-cinema-text transition-opacity duration-200 max-w-[28ch] mx-auto text-center"
                style={{
                  fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                  opacity: phases.line1Opacity,
                  position: phases.line1Opacity > 0 ? 'relative' : 'absolute',
                  display: phases.line1Opacity > 0 ? 'block' : 'none',
                }}
              >
                <Content value={line1} />
              </p>
            )}

            {/* Narration Line 2 */}
            {line2 && (
              <p
                aria-hidden={phases.line2Opacity < 0.1 ? 'true' : undefined}
                className="font-serif italic leading-[1.35] text-cinema-text transition-opacity duration-200 max-w-[28ch] mx-auto text-center"
                style={{
                  fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                  opacity: phases.line2Opacity,
                  position: phases.line2Opacity > 0 ? 'relative' : 'absolute',
                  display: phases.line2Opacity > 0 ? 'block' : 'none',
                }}
              >
                <Content value={line2} />
              </p>
            )}

            {/* Narration Line 3 */}
            {line3 && (
              <p
                aria-hidden={phases.line3Opacity < 0.1 ? 'true' : undefined}
                className="font-serif italic leading-[1.35] text-cinema-text transition-opacity duration-200 max-w-[28ch] mx-auto text-center"
                style={{
                  fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                  opacity: phases.line3Opacity,
                  position: phases.line3Opacity > 0 ? 'relative' : 'absolute',
                  display: phases.line3Opacity > 0 ? 'block' : 'none',
                }}
              >
                <Content value={line3} />
              </p>
            )}
          </div>

          {/* Quiet Unlabeled Bridge Line (88% to 100%) */}
          {chapter01Content.bridge && (
            <div
              className="mt-3 transition-opacity duration-300"
              style={{
                opacity: phases.bridgeOpacity,
                display: phases.bridgeOpacity > 0 ? 'block' : 'none',
              }}
            >
              <p className="font-serif italic text-xs sm:text-sm text-cinema-muted/85 max-w-lg mx-auto">
                <Content value={chapter01Content.bridge} />
              </p>
            </div>
          )}
        </footer>
      </div>
    </article>
  );
}
