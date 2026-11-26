'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Chapter } from '@/content/chapters';
import { useMotion } from '@/hooks/useMotion';
import { Content } from '@/components/content/Content';
import {
  ArrowUpRight,
  Compass,
  Eye,
  Grid,
  Layers,
  Palette,
  PenTool,
  Shuffle,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Chapter04DesignProps {
  chapter: Chapter;
}

type PosterMood = 'Swiss' | 'Editorial' | 'Brutalist' | 'Orbital';
type ProcessStage = 'sketch' | 'wireframe' | 'final';

const MOODS: PosterMood[] = ['Swiss', 'Editorial', 'Brutalist', 'Orbital'];
const STAGES: { id: ProcessStage; label: string }[] = [
  { id: 'sketch', label: '01 · Sketch' },
  { id: 'wireframe', label: '02 · Wireframe' },
  { id: 'final', label: '03 · Final' },
];

const INK_PALETTE = [
  { name: 'Rose', varColor: 'var(--color-accent-rose)', textClass: 'text-stage-rose', bgClass: 'bg-stage-rose', borderClass: 'border-stage-rose' },
  { name: 'Iris', varColor: 'var(--color-accent-iris)', textClass: 'text-stage-iris', bgClass: 'bg-stage-iris', borderClass: 'border-stage-iris' },
  { name: 'Azure', varColor: 'var(--color-accent-azure)', textClass: 'text-stage-azure', bgClass: 'bg-stage-azure', borderClass: 'border-stage-azure' },
  { name: 'Ember', varColor: 'var(--color-accent-ember)', textClass: 'text-stage-ember', bgClass: 'bg-stage-ember', borderClass: 'border-stage-ember' },
  { name: 'Gold', varColor: 'var(--color-accent-gold)', textClass: 'text-cinema-gold', bgClass: 'bg-cinema-gold', borderClass: 'border-cinema-gold' },
] as const;

const FLOATING_DESIGN_GLYPHS = [
  { id: 'd-1', pos: 'top-[13%] left-[5%]', anim: 'animate-ch02-vibe-1', delay: '0s', tag: 'BEZIER', icon: <PenTool className="w-4 h-4" /> },
  { id: 'd-2', pos: 'top-[16%] right-[6%]', anim: 'animate-ch02-vibe-2', delay: '-1.5s', tag: 'COLOR', icon: <Palette className="w-4 h-4" /> },
  { id: 'd-3', pos: 'top-[50%] left-[3%]', anim: 'animate-ch02-vibe-3', delay: '-2.7s', tag: 'GRID', icon: <Layers className="w-4 h-4" /> },
  { id: 'd-4', pos: 'top-[52%] right-[4%]', anim: 'animate-ch02-vibe-1', delay: '-1.1s', tag: 'FOCUS', icon: <Eye className="w-4 h-4" /> },
  { id: 'd-5', pos: 'bottom-[15%] left-[6%]', anim: 'animate-ch02-vibe-2', delay: '-3.3s', tag: '1.618', icon: <Compass className="w-4 h-4" /> },
  { id: 'd-6', pos: 'bottom-[14%] right-[7%]', anim: 'animate-ch02-vibe-3', delay: '-2.0s', tag: 'CRAFT', icon: <Sparkles className="w-4 h-4" /> },
];

export function Chapter04Design({ chapter }: Chapter04DesignProps) {
  const { motionEnabled, prefersReducedMotion } = useMotion();
  const isReduced = prefersReducedMotion || !motionEnabled;

  const canvasRef = useRef<HTMLDivElement>(null);
  const [mood, setMood] = useState<PosterMood>('Editorial');
  const [stage, setStage] = useState<ProcessStage>('final');
  const [inkIdx, setInkIdx] = useState(0);
  const [showGrid, setShowGrid] = useState(true);
  const [focal, setFocal] = useState<{ x: number; y: number }>({ x: 52, y: 48 });
  const [seed, setSeed] = useState('A4F9');

  const ink = INK_PALETTE[inkIdx];

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
    setFocal({
      x: Math.max(15, Math.min(85, x)),
      y: Math.max(18, Math.min(82, y)),
    });
  };

  const handleRandomize = () => {
    setMood(MOODS[Math.floor(Math.random() * MOODS.length)]);
    setInkIdx(Math.floor(Math.random() * INK_PALETTE.length));
    setFocal({
      x: 25 + Math.floor(Math.random() * 50),
      y: 25 + Math.floor(Math.random() * 50),
    });
    setSeed(Math.random().toString(16).substring(2, 6).toUpperCase());
  };

  return (
    <article
      id={chapter.id}
      data-chapter="4"
      data-accent="rose"
      aria-labelledby="chapter-04-heading"
      className="relative w-full min-h-[100dvh] bg-cinema-bg text-cinema-text py-20 sm:py-28 px-5 sm:px-10 lg:px-16 overflow-hidden border-t border-cinema-border/40 select-none"
    >
      {/* Dynamic Ink Ambient Wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 transition-all duration-500"
        style={{
          background: `radial-gradient(ellipse 65% 55% at 50% 50%, color-mix(in srgb, ${ink.varColor} 14%, transparent) 0%, transparent 75%)`,
        }}
      />

      {/* Giant Kinetic Outlined Backdrop Word */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden"
        style={{ opacity: 'var(--stage-watermark-opacity, 0.11)' }}
      >
        <span
          className="font-display font-bold uppercase tracking-tight leading-none whitespace-nowrap transition-all duration-500"
          style={{
            fontFamily: "'Bebas Neue', 'Oswald', 'Impact', sans-serif",
            fontSize: 'clamp(5.5rem, 22vw, 22rem)',
            WebkitTextStroke: `1.5px ${ink.varColor}`,
            color: 'transparent',
          }}
        >
          {mood}
        </span>
      </div>

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
            WebkitTextStroke: `1px ${ink.varColor}`,
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
                'flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-cinema-border/70 bg-cinema-surface/60 backdrop-blur-sm opacity-65',
                ink.textClass,
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

      {/* MAIN CREATIVE STUDIO */}
      <div className="relative z-20 max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2.5">
              <span className={cn('font-mono text-xs uppercase tracking-[0.25em]', ink.textClass)}>
                CHAPTER 04
              </span>
              <span className="h-px w-8 bg-cinema-border" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cinema-muted">
                GENERATIVE POSTER CANVAS
              </span>
            </div>

            <h2
              id="chapter-04-heading"
              className="text-fluid-h1 font-serif font-normal tracking-tight text-cinema-text leading-[1.06]"
            >
              <Content value={chapter.title} />
            </h2>
            <p className="font-serif italic text-sm sm:text-base text-cinema-muted">
              &ldquo;Where code organizes logic, design organizes perception.&rdquo;
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleRandomize}
              className={cn(
                'inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-cinema-surface/80 font-mono text-xs uppercase tracking-[0.16em] transition-all cursor-pointer hover:opacity-90',
                ink.borderClass,
                ink.textClass
              )}
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>Randomize #{seed}</span>
            </button>

            <Link
              href="/design"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-cinema-border bg-cinema-surface/60 font-mono text-xs uppercase tracking-[0.16em] text-cinema-text hover:border-cinema-gold/60 transition-colors"
            >
              <span>Design Lab</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </header>

        {/* FULL-STAGE INTERACTIVE POSTER GENERATOR + PROCESS SCRUBBER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* LEFT: Tactile Studio Controls */}
          <div className="lg:col-span-4 space-y-6">
            {/* 1. Mood / Layout Selector */}
            <div className="space-y-2.5">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-cinema-muted block">
                01 · Composition Mood
              </span>
              <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                {MOODS.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMood(m)}
                    className={cn(
                      'px-3 py-2 rounded-xl border text-left transition-all cursor-pointer',
                      mood === m
                        ? `${ink.borderClass} bg-cinema-surface text-cinema-text`
                        : 'border-cinema-border/60 bg-cinema-surface/30 text-cinema-muted hover:text-cinema-text'
                    )}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Ink Swatch Selector */}
            <div className="space-y-2.5">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-cinema-muted block">
                02 · Accent Ink
              </span>
              <div className="flex items-center gap-2.5">
                {INK_PALETTE.map((sw, idx) => (
                  <button
                    key={sw.name}
                    type="button"
                    onClick={() => setInkIdx(idx)}
                    aria-label={`Select ${sw.name} ink`}
                    className={cn(
                      'w-8 h-8 rounded-full transition-all cursor-pointer flex items-center justify-center',
                      sw.bgClass,
                      idx === inkIdx ? 'scale-110 ring-2 ring-cinema-text ring-offset-2 ring-offset-cinema-bg' : 'opacity-60 hover:opacity-100'
                    )}
                  />
                ))}
              </div>
            </div>

            {/* 3. Process Stage Scrubber (Sketch -> Wireframe -> Final) */}
            <div className="space-y-2.5">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-cinema-muted block">
                03 · Design Process Stage
              </span>
              <div className="flex flex-col gap-1.5 font-mono text-[11px]">
                {STAGES.map((st) => (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => setStage(st.id)}
                    className={cn(
                      'px-3.5 py-2 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between',
                      stage === st.id
                        ? `${ink.borderClass} bg-cinema-surface text-cinema-text`
                        : 'border-cinema-border/60 bg-cinema-surface/30 text-cinema-muted hover:text-cinema-text'
                    )}
                  >
                    <span>{st.label}</span>
                    {stage === st.id && <span className={cn('w-2 h-2 rounded-full', ink.bgClass)} />}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Grid Toggle + Live Coordinates */}
            <div className="flex items-center justify-between pt-2 border-t border-cinema-border/60 font-mono text-[10px] text-cinema-muted">
              <button
                type="button"
                onClick={() => setShowGrid((g) => !g)}
                className={cn(
                  'inline-flex items-center gap-1.5 px-3 py-1 rounded-full border cursor-pointer transition-colors',
                  showGrid ? `${ink.borderClass} ${ink.textClass}` : 'border-cinema-border text-cinema-muted'
                )}
              >
                <Grid className="w-3 h-3" />
                <span>Grid: {showGrid ? 'ON' : 'OFF'}</span>
              </button>
              <span>
                FOCAL: {focal.x}%, {focal.y}%
              </span>
            </div>
          </div>

          {/* RIGHT: Interactive Click-to-Sculpt Live Poster Canvas */}
          <div className="lg:col-span-8">
            <div
              ref={canvasRef}
              onClick={handleCanvasClick}
              role="application"
              aria-label="Interactive generative poster canvas. Click anywhere inside to reposition the focal point."
              className="relative w-full h-[360px] sm:h-[420px] rounded-2xl border border-cinema-border bg-cinema-surface/55 backdrop-blur-md overflow-hidden cursor-crosshair shadow-2xl"
            >
              {/* Optional Swiss Construction Grid */}
              {showGrid && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `linear-gradient(to right, ${ink.varColor} 1px, transparent 1px), linear-gradient(to bottom, ${ink.varColor} 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                  }}
                />
              )}

              {/* Live SVG Geometric Artwork (Reacts to Mood + Stage + Click Focal Point) */}
              <svg viewBox="0 0 600 400" fill="none" className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
                {/* Ambient glow at focal point (Final stage only) */}
                {stage === 'final' && (
                  <circle
                    cx={focal.x * 6}
                    cy={focal.y * 4}
                    r="110"
                    fill={ink.varColor}
                    opacity="0.16"
                  />
                )}

                {/* Main Composition Geometry based on Mood */}
                <motion.g
                  animate={{ x: (focal.x - 50) * 1.4, y: (focal.y - 50) * 1.1 }}
                  transition={isReduced ? { duration: 0 } : { type: 'spring', stiffness: 120, damping: 18 }}
                >
                  {mood === 'Editorial' && (
                    <>
                      <circle
                        cx="300"
                        cy="200"
                        r="125"
                        stroke={ink.varColor}
                        strokeWidth={stage === 'sketch' ? '1' : '2'}
                        strokeDasharray={stage === 'sketch' ? '6 6' : stage === 'wireframe' ? '10 4' : undefined}
                      />
                      <circle cx="300" cy="200" r="72" stroke="var(--color-cinema-text)" strokeWidth="1" opacity={stage === 'sketch' ? 0.3 : 0.6} />
                      <line x1="120" y1="200" x2="480" y2="200" stroke={ink.varColor} strokeWidth="0.8" opacity="0.5" />
                    </>
                  )}

                  {mood === 'Swiss' && (
                    <>
                      <rect
                        x="170"
                        y="70"
                        width="260"
                        height="260"
                        stroke={ink.varColor}
                        strokeWidth={stage === 'sketch' ? '1' : '2'}
                        strokeDasharray={stage === 'sketch' ? '5 5' : undefined}
                      />
                      <rect
                        x="220"
                        y="120"
                        width="160"
                        height="160"
                        fill={stage === 'final' ? ink.varColor : 'none'}
                        fillOpacity="0.14"
                        stroke="var(--color-cinema-text)"
                        strokeWidth="1.2"
                      />
                      <line x1="170" y1="70" x2="430" y2="330" stroke={ink.varColor} strokeWidth="1" opacity="0.5" />
                    </>
                  )}

                  {mood === 'Brutalist' && (
                    <>
                      <polygon
                        points="300,55 455,325 145,325"
                        stroke={ink.varColor}
                        strokeWidth={stage === 'sketch' ? '1.2' : '2.5'}
                        strokeDasharray={stage === 'sketch' ? '4 6' : undefined}
                        fill={stage === 'final' ? ink.varColor : 'none'}
                        fillOpacity="0.12"
                      />
                      <rect x="240" y="180" width="120" height="120" stroke="var(--color-cinema-text)" strokeWidth="1.5" />
                    </>
                  )}

                  {mood === 'Orbital' && (
                    <>
                      <ellipse cx="300" cy="200" rx="170" ry="68" stroke={ink.varColor} strokeWidth="1.5" strokeDasharray={stage === 'sketch' ? '5 5' : undefined} />
                      <ellipse cx="300" cy="200" rx="170" ry="68" transform="rotate(60 300 200)" stroke="var(--color-cinema-text)" strokeWidth="1" opacity="0.55" />
                      <ellipse cx="300" cy="200" rx="170" ry="68" transform="rotate(120 300 200)" stroke={ink.varColor} strokeWidth="1" opacity="0.7" />
                    </>
                  )}
                </motion.g>

                {/* Crosshair at Exact Clicked Focal Point */}
                <g transform={`translate(${focal.x * 6}, ${focal.y * 4})`} stroke={ink.varColor}>
                  <circle r="6" fill={stage === 'final' ? ink.varColor : 'none'} strokeWidth="1.5" />
                  <line x1="-14" y1="0" x2="14" y2="0" strokeWidth="1" opacity="0.8" />
                  <line x1="0" y1="-14" x2="0" y2="14" strokeWidth="1" opacity="0.8" />
                </g>
              </svg>

              {/* Poster Typography Overlay */}
              <div className="relative z-10 h-full p-6 sm:p-8 flex flex-col justify-between pointer-events-none">
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em]">
                  <span className={ink.textClass}>SPECIMEN // #{seed}</span>
                  <span className="text-cinema-muted">{stage.toUpperCase()} STAGE</span>
                </div>

                <div className="my-auto text-center">
                  <div
                    className={cn(
                      'text-3xl sm:text-5xl leading-none transition-all duration-300',
                      mood === 'Editorial' && 'font-serif italic',
                      mood === 'Swiss' && 'font-sans font-black uppercase tracking-tighter',
                      mood === 'Brutalist' && 'font-display uppercase tracking-wide',
                      mood === 'Orbital' && 'font-mono font-light uppercase tracking-[0.22em]',
                      stage === 'sketch' ? 'opacity-45' : 'opacity-100'
                    )}
                    style={
                      stage === 'wireframe'
                        ? { WebkitTextStroke: `1px ${ink.varColor}`, color: 'transparent' }
                        : undefined
                    }
                  >
                    DESIGN IS A LANGUAGE
                  </div>
                </div>

                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-cinema-muted">
                  <span>CLICK CANVAS TO MOVE FOCAL POINT</span>
                  <span className={ink.textClass}>{mood} · {ink.name}</span>
                </div>
              </div>
            </div>
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
