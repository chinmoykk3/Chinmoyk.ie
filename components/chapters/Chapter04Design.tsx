'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Chapter } from '@/content/chapters';
import { useMotion } from '@/hooks/useMotion';
import { Content } from '@/components/content/Content';
import { usePolish } from '@/components/polish/PolishContext';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Compass,
  Eye,
  Layers,
  Palette,
  PenTool,
  Sliders,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Chapter04DesignProps {
  chapter: Chapter;
}

const STUDIO_SPECIMENS = [
  {
    id: 'kinetic-type',
    index: '01',
    category: 'Typography',
    title: 'Typography as Architecture',
    subtitle: 'Where code organizes logic, typography organizes perception.',
    backdropWord: 'TYPEFACE',
  },
  {
    id: 'color-system',
    index: '02',
    category: 'Color Systems',
    title: 'The Sunrise-Ramp Spectrum',
    subtitle: 'Pure neutral blacks paired with calibrated WCAG AA accent radiance.',
    backdropWord: 'SPECTRUM',
  },
  {
    id: 'golden-grid',
    index: '03',
    category: 'Composition',
    title: 'Modular Grid & 1.618',
    subtitle: 'Mathematical proportion turned into calm visual hierarchy.',
    backdropWord: 'GEOMETRY',
  },
  {
    id: 'motion-feel',
    index: '04',
    category: 'Motion Craft',
    title: 'Physics of Micro-Interaction',
    subtitle: 'Every transition is paced to feel tactile, deliberate, and weightless.',
    backdropWord: 'KINETICS',
  },
] as const;

const FLOATING_DESIGN_GLYPHS = [
  { id: 'd-1', pos: 'top-[13%] left-[5%]', anim: 'animate-ch02-vibe-1', delay: '0s', tag: 'BEZIER', icon: <PenTool className="w-4 h-4" /> },
  { id: 'd-2', pos: 'top-[16%] right-[6%]', anim: 'animate-ch02-vibe-2', delay: '-1.5s', tag: 'COLOR', icon: <Palette className="w-4 h-4" /> },
  { id: 'd-3', pos: 'top-[48%] left-[3%]', anim: 'animate-ch02-vibe-3', delay: '-2.7s', tag: 'GRID', icon: <Layers className="w-4 h-4" /> },
  { id: 'd-4', pos: 'top-[50%] right-[4%]', anim: 'animate-ch02-vibe-1', delay: '-1.1s', tag: 'FOCUS', icon: <Eye className="w-4 h-4" /> },
  { id: 'd-5', pos: 'bottom-[15%] left-[7%]', anim: 'animate-ch02-vibe-2', delay: '-3.3s', tag: '1.618', icon: <Compass className="w-4 h-4" /> },
  { id: 'd-6', pos: 'bottom-[14%] right-[8%]', anim: 'animate-ch02-vibe-3', delay: '-2.0s', tag: 'CRAFT', icon: <Sparkles className="w-4 h-4" /> },
];

const SUNRISE_SWATCHES = [
  { name: 'Azure', token: 'Systems', bgClass: 'bg-sunrise-azure', textClass: 'text-sunrise-azure', borderClass: 'border-sunrise-azure', ratio: '6.34:1 AA' },
  { name: 'Iris', token: 'Intelligence', bgClass: 'bg-sunrise-iris', textClass: 'text-sunrise-iris', borderClass: 'border-sunrise-iris', ratio: '6.75:1 AA' },
  { name: 'Rose', token: 'Expression', bgClass: 'bg-sunrise-rose', textClass: 'text-sunrise-rose', borderClass: 'border-sunrise-rose', ratio: '5.54:1 AA' },
  { name: 'Ember', token: 'Frontiers', bgClass: 'bg-sunrise-ember', textClass: 'text-sunrise-ember', borderClass: 'border-sunrise-ember', ratio: '5.18:1 AA' },
  { name: 'Gold', token: 'Curiosity', bgClass: 'bg-cinema-gold', textClass: 'text-cinema-gold', borderClass: 'border-cinema-gold', ratio: '13.6:1 AAA' },
] as const;

export function Chapter04Design({ chapter }: Chapter04DesignProps) {
  const { motionEnabled, prefersReducedMotion } = useMotion();
  const { triggerLowerThird } = usePolish();
  const isReduced = prefersReducedMotion || !motionEnabled;

  const [activeIndex, setActiveIndex] = useState(0);

  // Specimen 01 state: Typography Playground
  const [typeFace, setTypeFace] = useState<'serif' | 'display' | 'mono'>('serif');
  const [typeTracking, setTypeTracking] = useState<'tight' | 'wide'>('tight');

  // Specimen 02 state: Color System Explorer
  const [swatchIdx, setSwatchIdx] = useState(2); // Rose default

  // Specimen 03 state: Modular Geometry Layers
  const [layers, setLayers] = useState({ grid: true, circle: true, golden: true });

  // Specimen 04 state: Motion Easing Playground
  const [motionPreset, setMotionPreset] = useState<'cinema' | 'snappy' | 'spring'>('cinema');
  const [motionPulse, setMotionPulse] = useState(0);

  const activeSpecimen = STUDIO_SPECIMENS[activeIndex];

  const selectSpecimen = (idx: number) => {
    const clamped = (idx + STUDIO_SPECIMENS.length) % STUDIO_SPECIMENS.length;
    setActiveIndex(clamped);
    const s = STUDIO_SPECIMENS[clamped];
    triggerLowerThird({
      title: s.title,
      subtitle: s.subtitle,
      category: s.category,
    });
  };

  return (
    <article
      id={chapter.id}
      data-chapter="4"
      data-accent="rose"
      aria-labelledby="chapter-04-heading"
      className="relative w-full min-h-[100dvh] bg-cinema-bg text-cinema-text py-20 sm:py-28 px-5 sm:px-10 lg:px-16 overflow-hidden border-t border-cinema-border/40 select-none"
    >
      {/* Rose Spotlight Wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 65% 55% at 55% 50%, rgba(255, 92, 138, 0.16) 0%, transparent 75%)',
        }}
      />

      {/* Diagonal Editorial Rule Lines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(-35deg, var(--color-accent-rose) 0px, var(--color-accent-rose) 1px, transparent 1px, transparent 84px)',
        }}
      />

      {/* Giant Kinetic Outlined Backdrop Word */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`ch04-bg-${activeSpecimen.backdropWord}`}
          aria-hidden="true"
          initial={!isReduced ? { opacity: 0, scale: 1.06 } : false}
          animate={{ opacity: 0.12, scale: 1 }}
          exit={!isReduced ? { opacity: 0 } : undefined}
          transition={{ duration: 0.45 }}
          className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden"
        >
          <span
            className="font-display font-bold uppercase tracking-tight leading-none whitespace-nowrap"
            style={{
              fontFamily: "'Bebas Neue', 'Oswald', 'Impact', sans-serif",
              fontSize: 'clamp(5.5rem, 22vw, 22rem)',
              WebkitTextStroke: '1.5px var(--color-accent-rose)',
              color: 'transparent',
            }}
          >
            {activeSpecimen.backdropWord}
          </span>
        </motion.div>
      </AnimatePresence>

      {/* Outlined "04" Watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-6 left-6 sm:top-10 sm:left-12 z-0 opacity-20"
      >
        <span
          className="font-serif font-normal block"
          style={{
            fontSize: 'clamp(4.5rem, 11vw, 9.5rem)',
            lineHeight: 0.9,
            fontVariantNumeric: 'lining-nums',
            WebkitTextStroke: '1px var(--color-accent-rose)',
            color: 'transparent',
          }}
        >
          04
        </span>
      </div>

      {/* Floating Design Glyphs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 overflow-hidden hidden lg:block">
        {FLOATING_DESIGN_GLYPHS.map((g) => (
          <div key={g.id} className={cn('absolute', g.pos)}>
            <div
              className={cn(
                'flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-sunrise-rose/25 bg-sunrise-rose/10 text-sunrise-rose/80 backdrop-blur-sm opacity-65',
                !isReduced && g.anim
              )}
              style={!isReduced ? { animationDelay: g.delay } : undefined}
            >
              {g.icon}
              <span className="font-mono text-[9px] font-semibold tracking-[0.18em]">
                {g.tag}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* MAIN STUDIO CONTAINER */}
      <div className="relative z-20 max-w-6xl mx-auto flex flex-col justify-between space-y-12">
        {/* TOP HEADER */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2.5">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-sunrise-rose">
                CHAPTER 04
              </span>
              <span className="h-px w-8 bg-cinema-border" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cinema-muted">
                INTERACTIVE DESIGN STUDIO
              </span>
            </div>

            <h2
              id="chapter-04-heading"
              className="text-fluid-h1 font-serif font-normal tracking-tight text-cinema-text leading-[1.06]"
            >
              <Content value={chapter.title} />
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 font-mono text-[11px] text-cinema-muted">
              <button
                type="button"
                onClick={() => selectSpecimen(activeIndex - 1)}
                aria-label="Previous design specimen"
                className="p-1.5 rounded-full border border-cinema-border hover:border-sunrise-rose/60 hover:text-sunrise-rose transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
              <span className="px-2 text-cinema-text">
                0{activeIndex + 1} / 0{STUDIO_SPECIMENS.length}
              </span>
              <button
                type="button"
                onClick={() => selectSpecimen(activeIndex + 1)}
                aria-label="Next design specimen"
                className="p-1.5 rounded-full border border-cinema-border hover:border-sunrise-rose/60 hover:text-sunrise-rose transition-colors cursor-pointer"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <Link
              href="/design"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-sunrise-rose/40 bg-sunrise-rose/10 font-mono text-[11px] text-sunrise-rose hover:bg-sunrise-rose/20 transition-colors"
            >
              <span>Design Lab</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </header>

        {/* ASYMMETRIC SPLIT STUDIO: Left Specimen Selector + Right Live Sandbox */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT RAIL: 4 Playable Design Specimens */}
          <nav
            aria-label="Design Studio Specimens"
            className="lg:col-span-4 flex lg:flex-col gap-2.5 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0"
          >
            {STUDIO_SPECIMENS.map((spec, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <button
                  key={spec.id}
                  type="button"
                  onClick={() => selectSpecimen(idx)}
                  className={cn(
                    'shrink-0 lg:w-full text-left px-4 py-3.5 rounded-xl border transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer',
                    isSelected
                      ? 'border-sunrise-rose/70 bg-sunrise-rose/10 text-cinema-text shadow-[0_0_24px_rgba(255,92,138,0.14)]'
                      : 'border-cinema-border/50 bg-cinema-surface/30 text-cinema-muted hover:text-cinema-text hover:border-cinema-border'
                  )}
                >
                  <div className="space-y-0.5 min-w-0">
                    <div className={cn('font-mono text-[10px] uppercase tracking-[0.18em]', isSelected ? 'text-sunrise-rose' : 'text-cinema-muted/70')}>
                      {spec.index} · {spec.category}
                    </div>
                    <div className="font-serif text-base sm:text-lg truncate">
                      {spec.title}
                    </div>
                  </div>
                  <Sliders className={cn('w-4 h-4 shrink-0', isSelected ? 'text-sunrise-rose' : 'opacity-40')} />
                </button>
              );
            })}
          </nav>

          {/* RIGHT STAGE: Open Interactive Design Sandbox */}
          <div className="lg:col-span-8 min-h-[340px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSpecimen.id}
                initial={!isReduced ? { opacity: 0, y: 18, filter: 'brightness(1.35)' } : false}
                animate={{ opacity: 1, y: 0, filter: 'brightness(1)' }}
                exit={!isReduced ? { opacity: 0, y: -14 } : undefined}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-6"
              >
                {/* Open Editorial Header */}
                <div className="border-l-2 border-sunrise-rose pl-5 sm:pl-7 space-y-2">
                  <div className="font-mono text-xs uppercase tracking-[0.22em] text-sunrise-rose">
                    SPECIMEN {activeSpecimen.index} · {activeSpecimen.category}
                  </div>
                  <h3
                    className="font-serif text-cinema-text tracking-tight leading-[1.04]"
                    style={{ fontSize: 'clamp(2.1rem, 4.5vw, 3.5rem)' }}
                  >
                    {activeSpecimen.title}
                  </h3>
                  <p className="font-serif italic text-sm sm:text-base text-cinema-muted">
                    &ldquo;{activeSpecimen.subtitle}&rdquo;
                  </p>
                </div>

                {/* ---------------------------------------------------------- */}
                {/* SPECIMEN 01: LIVE TYPOGRAPHY PLAYGROUND                    */}
                {/* ---------------------------------------------------------- */}
                {activeIndex === 0 && (
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 font-mono text-[10px]">
                      {(['serif', 'display', 'mono'] as const).map((f) => (
                        <button
                          key={f}
                          type="button"
                          onClick={() => setTypeFace(f)}
                          className={cn(
                            'px-3 py-1 rounded-full border uppercase tracking-wider cursor-pointer transition-all',
                            typeFace === f
                              ? 'border-sunrise-rose bg-sunrise-rose/20 text-sunrise-rose'
                              : 'border-cinema-border text-cinema-muted hover:text-cinema-text'
                          )}
                        >
                          {f}
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={() => setTypeTracking((t) => (t === 'tight' ? 'wide' : 'tight'))}
                        className="px-3 py-1 rounded-full border border-sunrise-rose/40 text-sunrise-rose hover:bg-sunrise-rose/15 cursor-pointer ml-auto"
                      >
                        Tracking: {typeTracking.toUpperCase()}
                      </button>
                    </div>

                    <div className="py-6 px-5 rounded-xl border border-sunrise-rose/25 bg-cinema-surface/50 backdrop-blur-md text-center overflow-hidden">
                      <div
                        className={cn(
                          'text-3xl sm:text-5xl text-cinema-text leading-tight transition-all duration-300',
                          typeFace === 'serif' && 'font-serif italic',
                          typeFace === 'display' && 'font-display uppercase font-bold',
                          typeFace === 'mono' && 'font-mono uppercase',
                          typeTracking === 'tight' ? 'tracking-tight' : 'tracking-[0.2em]'
                        )}
                      >
                        DESIGN IS A LANGUAGE
                      </div>
                    </div>
                  </div>
                )}

                {/* ---------------------------------------------------------- */}
                {/* SPECIMEN 02: LIVE SUNRISE-RAMP COLOR & CONTRAST LAB        */}
                {/* ---------------------------------------------------------- */}
                {activeIndex === 1 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-5 gap-2">
                      {SUNRISE_SWATCHES.map((sw, idx) => (
                        <button
                          key={sw.name}
                          type="button"
                          onClick={() => setSwatchIdx(idx)}
                          className={cn(
                            'p-3 rounded-xl border transition-all text-left space-y-2 cursor-pointer',
                            idx === swatchIdx
                              ? `${sw.borderClass} bg-cinema-surface`
                              : 'border-cinema-border/60 bg-cinema-surface/30 hover:border-cinema-border'
                          )}
                        >
                          <div className={cn('w-full h-6 rounded-md', sw.bgClass)} />
                          <div className="font-mono text-[10px] text-cinema-text">{sw.name}</div>
                        </button>
                      ))}
                    </div>

                    <div className="px-5 py-4 rounded-xl border border-cinema-border bg-cinema-surface/60 flex items-center justify-between font-mono text-xs">
                      <div className="flex items-center gap-3">
                        <span className={cn('w-3 h-3 rounded-full', SUNRISE_SWATCHES[swatchIdx].bgClass)} />
                        <span className="text-cinema-text">
                          {SUNRISE_SWATCHES[swatchIdx].name} · {SUNRISE_SWATCHES[swatchIdx].token}
                        </span>
                      </div>
                      <span className={SUNRISE_SWATCHES[swatchIdx].textClass}>
                        WCAG {SUNRISE_SWATCHES[swatchIdx].ratio}
                      </span>
                    </div>
                  </div>
                )}

                {/* ---------------------------------------------------------- */}
                {/* SPECIMEN 03: INTERACTIVE GOLDEN-RATIO GEOMETRY COMPOSER    */}
                {/* ---------------------------------------------------------- */}
                {activeIndex === 2 && (
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2 font-mono text-[10px]">
                      {(['grid', 'circle', 'golden'] as const).map((layerKey) => (
                        <button
                          key={layerKey}
                          type="button"
                          onClick={() =>
                            setLayers((prev) => ({ ...prev, [layerKey]: !prev[layerKey] }))
                          }
                          className={cn(
                            'px-3 py-1 rounded-full border uppercase tracking-wider cursor-pointer transition-all',
                            layers[layerKey]
                              ? 'border-sunrise-rose bg-sunrise-rose/20 text-sunrise-rose'
                              : 'border-cinema-border text-cinema-muted hover:text-cinema-text'
                          )}
                        >
                          {layerKey}: {layers[layerKey] ? 'ON' : 'OFF'}
                        </button>
                      ))}
                    </div>

                    <div className="h-44 rounded-xl border border-sunrise-rose/25 bg-cinema-surface/40 flex items-center justify-center relative overflow-hidden">
                      <svg viewBox="0 0 320 160" fill="none" className="w-full h-full" aria-hidden="true">
                        {layers.grid && (
                          <g stroke="var(--color-border-strong)" strokeWidth="0.7" opacity="0.55">
                            <line x1="0" y1="80" x2="320" y2="80" strokeDasharray="3 3" />
                            <line x1="160" y1="0" x2="160" y2="160" strokeDasharray="3 3" />
                            <rect x="60" y="20" width="200" height="120" />
                          </g>
                        )}
                        {layers.circle && (
                          <g stroke="var(--color-accent-rose)" fill="none">
                            <circle cx="160" cy="80" r="56" strokeWidth="1.5" />
                            <circle cx="160" cy="80" r="34" strokeWidth="1" strokeDasharray="4 4" />
                          </g>
                        )}
                        {layers.golden && (
                          <g stroke="var(--color-accent-gold)" fill="none">
                            <path d="M 160,80 A 21 21 0 0 1 181,59 A 34 34 0 0 1 215,93 A 55 55 0 0 1 160,148" strokeWidth="1.6" />
                            <circle cx="160" cy="80" r="3.5" fill="var(--color-accent-rose)" stroke="none" />
                          </g>
                        )}
                      </svg>
                    </div>
                  </div>
                )}

                {/* ---------------------------------------------------------- */}
                {/* SPECIMEN 04: MOTION EASING & SPRING PLAYGROUND             */}
                {/* ---------------------------------------------------------- */}
                {activeIndex === 3 && (
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[10px]">
                      <div className="flex gap-2">
                        {(['cinema', 'snappy', 'spring'] as const).map((preset) => (
                          <button
                            key={preset}
                            type="button"
                            onClick={() => {
                              setMotionPreset(preset);
                              setMotionPulse((p) => p + 1);
                            }}
                            className={cn(
                              'px-3 py-1 rounded-full border uppercase tracking-wider cursor-pointer transition-all',
                              motionPreset === preset
                                ? 'border-sunrise-rose bg-sunrise-rose/20 text-sunrise-rose'
                                : 'border-cinema-border text-cinema-muted hover:text-cinema-text'
                            )}
                          >
                            {preset}
                          </button>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={() => setMotionPulse((p) => p + 1)}
                        className="px-3 py-1 rounded-full border border-sunrise-rose/50 bg-sunrise-rose/15 text-sunrise-rose cursor-pointer"
                      >
                        Replay ⚡
                      </button>
                    </div>

                    <div className="h-24 px-6 rounded-xl border border-sunrise-rose/25 bg-cinema-surface/40 flex items-center relative overflow-hidden">
                      <div className="w-full h-px bg-cinema-border relative flex items-center">
                        <motion.div
                          key={`${motionPreset}-${motionPulse}`}
                          initial={!isReduced ? { x: 0 } : false}
                          animate={{ x: 'calc(100% - 28px)' }}
                          transition={
                            motionPreset === 'spring'
                              ? { type: 'spring', stiffness: 260, damping: 16 }
                              : motionPreset === 'snappy'
                                ? { duration: 0.35, ease: [0.16, 1, 0.3, 1] }
                                : { duration: 0.9, ease: [0.22, 1, 0.36, 1] }
                          }
                          className="w-7 h-7 rounded-full bg-sunrise-rose shadow-[0_0_20px_var(--color-accent-rose)]"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Narrative Bridge to Chapter 05 */}
        <footer className="pt-8 border-t border-cinema-border/40">
          <p className="text-sm sm:text-base font-serif italic text-cinema-muted max-w-2xl leading-relaxed">
            &ldquo;<Content value={chapter.bridge} />&rdquo;
          </p>
        </footer>
      </div>
    </article>
  );
}
