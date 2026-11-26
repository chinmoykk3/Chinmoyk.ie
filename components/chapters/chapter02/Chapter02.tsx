'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Chapter } from '@/content/chapters';
import { chapter02Content } from '@/content/chapter02';
import { useMotion } from '@/hooks/useMotion';
import { Content } from '@/components/content/Content';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cpu, Layers, Radar, Sparkles, Terminal } from 'lucide-react';
import {
  BuilderStage,
  IntelligenceStage,
  VisualStage,
  ExplorerStage,
} from './RoleStages';
import { RoleBackdropVibe } from './RoleBackdropVibe';
import { cn } from '@/lib/utils';

export interface Chapter02Props {
  chapter: Chapter;
}

const ACCENT_STYLES = {
  azure: {
    rule: 'border-l-2 border-stage-azure pl-5 sm:pl-7',
    text: 'text-stage-azure',
    dot: 'bg-stage-azure',
    backdrop:
      'radial-gradient(ellipse 65% 55% at 50% 50%, color-mix(in srgb, var(--color-accent-azure) 16%, transparent) 0%, transparent 75%)',
  },
  iris: {
    rule: 'border-l-2 border-stage-iris pl-5 sm:pl-7',
    text: 'text-stage-iris',
    dot: 'bg-stage-iris',
    backdrop:
      'radial-gradient(ellipse 65% 55% at 50% 50%, color-mix(in srgb, var(--color-accent-iris) 16%, transparent) 0%, transparent 75%)',
  },
  rose: {
    rule: 'border-l-2 border-stage-rose pl-5 sm:pl-7',
    text: 'text-stage-rose',
    dot: 'bg-stage-rose',
    backdrop:
      'radial-gradient(ellipse 65% 55% at 50% 50%, color-mix(in srgb, var(--color-accent-rose) 16%, transparent) 0%, transparent 75%)',
  },
  ember: {
    rule: 'border-l-2 border-stage-ember pl-5 sm:pl-7',
    text: 'text-stage-ember',
    dot: 'bg-stage-ember',
    backdrop:
      'radial-gradient(ellipse 65% 55% at 50% 50%, color-mix(in srgb, var(--color-accent-ember) 16%, transparent) 0%, transparent 75%)',
  },
} as const;

const SCROLL_STOPS = [
  { label: 'Intro', progress: 0.04 },
  { label: '01 Builder', progress: 0.20 },
  { label: '02 AI Eng', progress: 0.40 },
  { label: '03 Visual', progress: 0.59 },
  { label: '04 Explorer', progress: 0.77 },
  { label: 'Unified', progress: 0.93 },
];

export function Chapter02({ chapter }: Chapter02Props) {
  const { motionEnabled, prefersReducedMotion, lenis } = useMotion();
  const sceneRef = useRef<HTMLElement>(null);
  const pinContentRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const isReduced = prefersReducedMotion || !motionEnabled;
  const identities = chapter02Content.identities;

  // Pinned GSAP ScrollTrigger timeline
  useEffect(() => {
    const triggerEl = sceneRef.current;
    const contentEl = pinContentRef.current;
    if (!triggerEl || !contentEl) return;

    if (isReduced) {
      setScrollProgress(1);
      return;
    }

    const isMobile = window.innerWidth < 768;
    const pinScrollDistance = isMobile ? '+=280%' : '+=360%';

    const trigger = ScrollTrigger.create({
      trigger: triggerEl,
      start: 'top top',
      end: pinScrollDistance,
      pin: contentEl,
      pinSpacing: true,
      scrub: 0.35,
      onUpdate: (self) => {
        setScrollProgress(self.progress);
        document.documentElement.style.setProperty(
          '--ch02-progress',
          self.progress.toFixed(3)
        );
        if (self.progress >= 0.82) {
          const lift = Math.min(1, (self.progress - 0.82) / 0.14) * 0.1;
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

  const handleJumpToStop = useCallback(
    (targetProgress: number) => {
      const st = scrollTriggerRef.current;
      if (!st) return;
      const targetY = st.start + (st.end - st.start) * targetProgress;
      if (lenis && motionEnabled) {
        lenis.scrollTo(targetY, { duration: 0.75 });
      } else {
        window.scrollTo({ top: targetY, behavior: motionEnabled ? 'smooth' : 'auto' });
      }
    },
    [lenis, motionEnabled]
  );

  // Determine active stage from scroll progress:
  // -1 = Intro, 0..3 = Role 0..3, 4 = Unified Convergence
  const activeStage: number =
    scrollProgress < 0.11
      ? -1
      : scrollProgress < 0.30
        ? 0
        : scrollProgress < 0.49
          ? 1
          : scrollProgress < 0.68
            ? 2
            : scrollProgress < 0.86
              ? 3
              : 4;

  const activeIdentity = activeStage >= 0 && activeStage <= 3 ? identities[activeStage] : null;
  const activeStyle = activeIdentity ? ACCENT_STYLES[activeIdentity.accent] : null;

  // =========================================================================
  // REDUCED MOTION VIEW: Clean Stacked Roles (No Pinning)
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
        <div className="max-w-4xl mx-auto space-y-14">
          <header className="space-y-3 text-center">
            <span className="font-mono text-xs uppercase tracking-widest text-cinema-gold">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {identities.map((identity, idx) => {
              const style = ACCENT_STYLES[identity.accent];
              return (
                <div
                  key={identity.id}
                  className={cn(
                    'py-4 space-y-4',
                    style.rule
                  )}
                >
                  <div>
                    <span className={cn('font-mono text-[11px] uppercase tracking-[0.2em]', style.text)}>
                      0{idx + 1} · <Content value={identity.role} />
                    </span>
                    <h3 className="font-serif text-2xl text-cinema-text mt-1">
                      <Content value={identity.name} />
                    </h3>
                  </div>
                  <p className="font-sans text-sm text-cinema-muted">
                    <Content value={identity.description} />
                  </p>
                  {idx === 0 && <BuilderStage isReduced isHighlighted />}
                  {idx === 1 && <IntelligenceStage isReduced isHighlighted />}
                  {idx === 2 && <VisualStage isReduced isHighlighted />}
                  {idx === 3 && <ExplorerStage isReduced isHighlighted />}
                  <p className="font-serif italic text-xs text-cinema-muted pt-2 border-t border-cinema-border/60">
                    <Content value={identity.feedsOthers} />
                  </p>
                </div>
              );
            })}
          </div>

          <footer className="text-center space-y-4 pt-8 border-t border-cinema-border/40">
            <blockquote className="font-serif italic text-xl sm:text-2xl text-cinema-text max-w-2xl mx-auto">
              &ldquo;<Content value={chapter02Content.convergenceNarration} />&rdquo;
            </blockquote>
            {chapter02Content.bridge && (
              <p className="font-serif italic text-sm text-cinema-muted max-w-lg mx-auto">
                <Content value={chapter02Content.bridge} />
              </p>
            )}
          </footer>
        </div>
      </article>
    );
  }

  // =========================================================================
  // STANDARD MOTION VIEW: Scroll-Driven One-by-One Role Flash Stage
  // =========================================================================
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
        className="w-full h-[100svh] min-h-[100dvh] flex flex-col justify-between py-6 sm:py-10 px-5 sm:px-12 relative overflow-hidden"
      >
        {/* Top 1.5px Spectrum Progress Hairline */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 h-[2px] z-30 transition-all duration-100 bg-gradient-to-r from-stage-azure via-stage-iris to-stage-ember"
          style={{ width: `${Math.round(scrollProgress * 100)}%` }}
        />

        {/* Dynamic Ambient Color Flash Backdrop per Active Role */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 transition-all duration-500"
          style={{
            background: activeStyle
              ? activeStyle.backdrop
              : activeStage === 4
                ? 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255, 200, 87, 0.16) 0%, transparent 75%)'
                : 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255, 255, 255, 0.04) 0%, transparent 75%)',
          }}
        />

        {/* Full-Stage Dramatic Role Vibe & Floating Background Icons */}
        <RoleBackdropVibe activeStage={activeStage} isReduced={isReduced} />

        {/* Upper Left: Outlined "02" Numeral */}
        <div
          aria-hidden="true"
          className="absolute top-4 left-6 sm:top-8 sm:left-12 pointer-events-none z-10 opacity-20"
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

        {/* Top-Right: Clickable Role & Stage Progress Bar */}
        <nav
          aria-label="Chapter 02 roles"
          className="relative z-30 ml-auto flex items-center gap-1.5 sm:gap-2 flex-wrap justify-end"
        >
          {SCROLL_STOPS.map((stop, idx) => {
            const stopStage = idx - 1; // -1 = Intro, 0..3 = Roles, 4 = Unified
            const isCurrent = activeStage === stopStage;
            return (
              <button
                key={stop.label}
                type="button"
                onClick={() => handleJumpToStop(stop.progress)}
                className={cn(
                  'px-2 sm:px-2.5 py-1 rounded-full font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.16em] border transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-cinema-gold',
                  isCurrent
                    ? 'border-cinema-gold bg-cinema-gold/15 text-cinema-gold'
                    : 'border-cinema-border/60 bg-cinema-surface/50 text-cinema-muted hover:text-cinema-text hover:border-cinema-gold/40'
                )}
              >
                {stop.label}
              </button>
            );
          })}
        </nav>

        {/* CENTER STAGE: One-by-One Role Flash */}
        <div className="relative z-20 flex-1 flex items-center justify-center w-full max-w-2xl mx-auto my-auto">
          <AnimatePresence mode="wait">
            {/* STAGE -1: INTRO FLASH */}
            {activeStage === -1 && (
              <motion.div
                key="ch02-intro"
                initial={{ opacity: 0, y: 18, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 1.03 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="text-center space-y-4 px-4"
              >
                <span className="font-mono text-xs uppercase tracking-[0.26em] text-cinema-gold">
                  CHAPTER 02
                </span>
                <h2 className="text-fluid-display font-serif font-normal tracking-tight text-cinema-text leading-[1.05]">
                  <Content value={chapter02Content.title} />
                </h2>
                {chapter02Content.subtitle && (
                  <p className="font-serif italic text-base sm:text-xl text-cinema-muted">
                    <Content value={chapter02Content.subtitle} />
                  </p>
                )}
                <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-cinema-muted/75 pt-4">
                  Scroll to reveal each world ↓
                </p>
              </motion.div>
            )}

            {/* STAGES 0..3: UNIQUE SPATIAL COMPOSITION PER ROLE */}
            {activeIdentity && activeStyle && (
              <motion.div
                key={activeIdentity.id}
                initial={{ opacity: 0, scale: 0.9, y: 28, filter: 'brightness(1.75)' }}
                animate={{ opacity: 1, scale: 1, y: 0, filter: 'brightness(1)' }}
                exit={{ opacity: 0, scale: 1.04, y: -22 }}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                className="w-full space-y-6 px-2 sm:px-4"
              >
                {/* Dynamic Editorial Header: Left-aligned (0,3), Centered (1), Right-aligned (2) */}
                <div
                  className={cn(
                    'space-y-2.5',
                    activeStage === 1 && 'text-center flex flex-col items-center',
                    activeStage === 2 && 'text-right border-r-2 border-stage-rose pr-5 sm:pr-7',
                    (activeStage === 0 || activeStage === 3) && activeStyle.rule
                  )}
                >
                  <div
                    className={cn(
                      'flex items-center gap-4 w-full',
                      activeStage === 1 && 'justify-center',
                      activeStage === 2 && 'flex-row-reverse justify-between',
                      (activeStage === 0 || activeStage === 3) && 'justify-between'
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={cn('w-2 h-2 rounded-full animate-pulse', activeStyle.dot)} />
                      <span className={cn('font-mono text-xs uppercase tracking-[0.24em]', activeStyle.text)}>
                        0{activeStage + 1} / 04 · <Content value={activeIdentity.role} />
                      </span>
                    </div>

                    {activeStage !== 1 && (
                      <span className={cn('opacity-85', activeStyle.text)}>
                        {activeStage === 0 && <Terminal className="w-5 h-5" />}
                        {activeStage === 2 && <Layers className="w-5 h-5" />}
                        {activeStage === 3 && <Radar className="w-5 h-5" />}
                      </span>
                    )}
                  </div>

                  <h3
                    className="font-serif text-cinema-text tracking-tight leading-[1.02]"
                    style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.25rem)' }}
                  >
                    <Content value={activeIdentity.name} />
                  </h3>

                  <p
                    className={cn(
                      'font-sans text-sm sm:text-base text-cinema-muted max-w-xl leading-relaxed pt-1',
                      activeStage === 2 && 'ml-auto'
                    )}
                  >
                    <Content value={activeIdentity.description} />
                  </p>
                </div>

                {/* Role's Unique Animated Interactive Stage */}
                <div className="backdrop-blur-md">
                  {activeStage === 0 && <BuilderStage isReduced={false} isHighlighted />}
                  {activeStage === 1 && <IntelligenceStage isReduced={false} isHighlighted />}
                  {activeStage === 2 && <VisualStage isReduced={false} isHighlighted />}
                  {activeStage === 3 && <ExplorerStage isReduced={false} isHighlighted />}
                </div>

                {/* Open Feeds-Others Line */}
                <div
                  className={cn(
                    'flex items-center gap-3 pt-1',
                    activeStage === 1 && 'justify-center text-center',
                    activeStage === 2 && 'flex-row-reverse justify-between',
                    (activeStage === 0 || activeStage === 3) && 'justify-between'
                  )}
                >
                  <p className="font-serif italic text-sm sm:text-base text-cinema-text/85">
                    &ldquo;<Content value={activeIdentity.feedsOthers} />&rdquo;
                  </p>
                  {activeStage !== 1 && (
                    <span className={cn('font-mono text-[10px] uppercase tracking-[0.22em] shrink-0', activeStyle.text)}>
                      ACTIVE VIBE
                    </span>
                  )}
                </div>
              </motion.div>
            )}

            {/* STAGE 4: OPEN UNIFIED CONVERGENCE FLASH */}
            {activeStage === 4 && (
              <motion.div
                key="ch02-unified"
                initial={{ opacity: 0, scale: 0.94, y: 18, filter: 'brightness(1.35)' }}
                animate={{ opacity: 1, scale: 1, y: 0, filter: 'brightness(1)' }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="w-full py-6 text-center space-y-6 relative"
              >
                <div
                  aria-hidden="true"
                  className="mx-auto w-32 h-[2px] bg-gradient-to-r from-stage-azure via-stage-iris to-stage-ember"
                />

                <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.26em] text-cinema-gold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>4 Worlds Converged</span>
                </div>

                {/* All 4 Role Badges Lit Up Together */}
                <div className="flex flex-wrap items-center justify-center gap-2.5">
                  {identities.map((idItem) => {
                    const s = ACCENT_STYLES[idItem.accent];
                    return (
                      <span
                        key={idItem.id}
                        className={cn(
                          'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-cinema-border/80 bg-cinema-bg/60 backdrop-blur-sm font-mono text-[10px] uppercase tracking-[0.16em]',
                          s.text
                        )}
                      >
                        <span className={cn('w-1.5 h-1.5 rounded-full', s.dot)} />
                        <Content value={idItem.role} />
                      </span>
                    );
                  })}
                </div>

                <blockquote className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-cinema-text max-w-2xl mx-auto leading-snug">
                  &ldquo;<Content value={chapter02Content.convergenceNarration} />&rdquo;
                </blockquote>

                {chapter02Content.bridge && (
                  <p className="font-serif italic text-xs sm:text-sm text-cinema-muted max-w-lg mx-auto">
                    <Content value={chapter02Content.bridge} />
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Quiet Scroll Status */}
        <footer className="relative z-20 w-full max-w-4xl mx-auto flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.2em] text-cinema-muted/75">
          <span>
            {activeStage === -1
              ? 'CHAPTER 02 // INTRO'
              : activeStage === 4
                ? 'STATUS // CONVERGED'
                : `WORLD 0${activeStage + 1} OF 04`}
          </span>
          <span>SCROLL TO FLASH NEXT →</span>
        </footer>
      </div>
    </article>
  );
}
