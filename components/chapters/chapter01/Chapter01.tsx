'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Chapter } from '@/content/chapters';
import { chapter01Content } from '@/content/chapter01';
import { useMotion } from '@/hooks/useMotion';
import { Content } from '@/components/content/Content';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WORKBENCH_OBJECTS } from './chapter01.config';
import {
  Braces,
  Code2,
  Cpu,
  Flame,
  Lightbulb,
  Rocket,
  Sparkles,
  Terminal,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Chapter01Props {
  chapter: Chapter;
}

const FLOATING_GLYPHS = [
  { id: 'g1', pos: 'top-[12%] left-[6%]', anim: 'animate-ch02-vibe-1', delay: '0s', tag: '0 → 1', icon: <Terminal className="w-4 h-4" /> },
  { id: 'g2', pos: 'top-[14%] left-[23%]', anim: 'animate-ch02-vibe-2', delay: '-1.1s', tag: 'HOW?', icon: <Lightbulb className="w-3.5 h-3.5" /> },
  { id: 'g3', pos: 'top-[13%] right-[24%]', anim: 'animate-ch02-vibe-3', delay: '-2.3s', tag: 'WHY?', icon: <Zap className="w-3.5 h-3.5" /> },
  { id: 'g4', pos: 'top-[16%] right-[6%]', anim: 'animate-ch02-vibe-2', delay: '-1.4s', tag: 'BUILD', icon: <Code2 className="w-4 h-4" /> },
  { id: 'g5', pos: 'top-[46%] left-[4%]', anim: 'animate-ch02-vibe-3', delay: '-2.6s', tag: 'SILICON', icon: <Cpu className="w-4 h-4" /> },
  { id: 'g6', pos: 'top-[48%] right-[4%]', anim: 'animate-ch02-vibe-1', delay: '-0.9s', tag: 'SYNTAX', icon: <Braces className="w-4 h-4" /> },
  { id: 'g7', pos: 'bottom-[20%] left-[7%]', anim: 'animate-ch02-vibe-2', delay: '-3.1s', tag: 'INIT', icon: <Flame className="w-4 h-4" /> },
  { id: 'g8', pos: 'bottom-[18%] right-[7%]', anim: 'animate-ch02-vibe-3', delay: '-2.0s', tag: 'SPARK', icon: <Sparkles className="w-4 h-4" /> },
  { id: 'g9', pos: 'bottom-[11%] left-[20%]', anim: 'animate-ch02-vibe-1', delay: '-3.8s', tag: 'SHIP', icon: <Rocket className="w-3.5 h-3.5" /> },
  { id: 'g10', pos: 'bottom-[11%] right-[20%]', anim: 'animate-ch02-vibe-2', delay: '-4.2s', tag: '0x01', icon: <Terminal className="w-3.5 h-3.5" /> },
];

const ORBIT_NODES = [
  { angle: -140, radius: 138 },
  { angle: -40, radius: 138 },
  { angle: 140, radius: 138 },
  { angle: 40, radius: 138 },
];

const COMPASS_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];

export function Chapter01({ chapter }: Chapter01Props) {
  const { motionEnabled, prefersReducedMotion } = useMotion();
  const sceneRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [selectedNode, setSelectedNode] = useState<number | null>(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [sparkPulse, setSparkPulse] = useState(0);

  const isReduced = prefersReducedMotion || !motionEnabled;

  useEffect(() => {
    const triggerEl = sceneRef.current;
    const pinEl = pinRef.current;
    if (!triggerEl || !pinEl) return;

    if (isReduced) {
      setProgress(1);
      return;
    }

    const isMobile = window.innerWidth < 768;
    const trigger = ScrollTrigger.create({
      trigger: triggerEl,
      start: 'top top',
      end: isMobile ? '+=200%' : '+=250%',
      pin: pinEl,
      pinSpacing: true,
      scrub: 0.35,
      onUpdate: (self) => {
        setProgress(self.progress);
      },
    });

    return () => {
      trigger.kill();
    };
  }, [isReduced]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isReduced || !pinRef.current) return;
    const rect = pinRef.current.getBoundingClientRect();
    setPointer({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
    });
  };

  // 4 Scroll Beats
  const beat =
    progress < 0.16 ? 0 : progress < 0.44 ? 1 : progress < 0.72 ? 2 : 3;

  const branchScale = Math.min(1, Math.max(0, (progress - 0.12) / 0.25));
  const converged = progress >= 0.72;
  const activeLine =
    beat === 1
      ? chapter01Content.narrationLines[0]
      : beat === 2
        ? chapter01Content.narrationLines[1]
        : beat === 3
          ? chapter01Content.narrationLines[2]
          : null;

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
        ref={pinRef}
        onMouseMove={handleMouseMove}
        className="relative w-full h-[100svh] min-h-[100dvh] flex flex-col justify-between py-8 sm:py-12 px-6 sm:px-12 overflow-hidden"
      >
        {/* Top 1.5px Gold Progress Hairline */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 h-[1.5px] bg-cinema-gold z-30 transition-all duration-100"
          style={{ width: `${Math.round(progress * 100)}%` }}
        />

        {/* Ambient Gold Core Glow (Expands on ignition) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 transition-all duration-700"
          style={{
            background: converged
              ? 'radial-gradient(ellipse 68% 58% at 50% 48%, color-mix(in srgb, var(--color-accent-gold) 18%, transparent) 0%, transparent 72%)'
              : 'radial-gradient(ellipse 52% 45% at 50% 48%, color-mix(in srgb, var(--color-accent-gold) 10%, transparent) 0%, transparent 70%)',
          }}
        />

        {/* Shooting Horizontal Gold Data Streaks */}
        {!isReduced && (
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
            <div className="absolute top-[24%] left-0 w-56 h-px bg-gradient-to-r from-transparent via-cinema-gold/50 to-transparent animate-ch02-streak" />
            <div
              className="absolute bottom-[28%] left-0 w-72 h-px bg-gradient-to-r from-transparent via-cinema-gold/45 to-transparent animate-ch02-streak"
              style={{ animationDelay: '-2.4s', animationDuration: '5.8s' }}
            />
          </div>
        )}

        {/* Giant Outlined "CURIOSITY" Backdrop */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden transition-transform duration-300 ease-out"
          style={{
            opacity: 'var(--stage-watermark-opacity, 0.12)',
            transform: !isReduced
              ? `translate3d(${-pointer.x * 12}px, ${-pointer.y * 8}px, 0)`
              : 'none',
          }}
        >
          <span
            className="font-display font-bold uppercase tracking-tight leading-none whitespace-nowrap"
            style={{
              fontFamily: "'Bebas Neue', 'Oswald', 'Impact', sans-serif",
              fontSize: 'clamp(5.5rem, 23vw, 23rem)',
              WebkitTextStroke: '1.5px var(--color-accent-gold)',
              color: 'transparent',
            }}
          >
            CURIOSITY
          </span>
        </div>

        {/* Outlined "01" Watermark */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-4 left-6 sm:top-8 sm:left-12 z-0 opacity-20"
        >
          <span
            className="font-serif font-normal block"
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

        {/* High-Frequency Floating Gold Origin Glyphs */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 overflow-hidden hidden lg:block">
          {FLOATING_GLYPHS.map((g) => (
            <div key={g.id} className={cn('absolute', g.pos)}>
              <div
                className={cn(
                  'flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-cinema-gold/25 bg-cinema-gold/10 text-cinema-gold/85 backdrop-blur-sm opacity-65',
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

        {/* TOP EYEBROW */}
        <header className="relative z-20 text-center space-y-1">
          <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-cinema-gold">
            CHAPTER 01 · IT STARTED WITH CURIOSITY
          </span>
        </header>

        {/* CENTERPIECE: MAGNETIC KINETIC GENESIS ENGINE */}
        <div
          className="relative z-20 flex-1 flex items-center justify-center my-auto transition-transform duration-300 ease-out"
          style={{
            transform: !isReduced
              ? `translate3d(${pointer.x * 16}px, ${pointer.y * 12}px, 0)`
              : 'none',
          }}
        >
          {/* Click-Triggered Shockwave Pulse */}
          {!isReduced && sparkPulse > 0 && (
            <motion.div
              key={`pulse-${sparkPulse}`}
              initial={{ scale: 0.25, opacity: 0.85 }}
              animate={{ scale: 2.1, opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-none absolute w-48 h-48 rounded-full border-2 border-cinema-gold"
            />
          )}

          <svg
            viewBox="0 0 460 350"
            fill="none"
            className="w-full max-w-[460px] h-[290px] sm:h-[340px] overflow-visible"
            aria-hidden="true"
          >
            {/* 8 Faint Astrolabe Compass Rays */}
            {COMPASS_ANGLES.map((deg) => {
              const rad = (deg * Math.PI) / 180;
              return (
                <line
                  key={`ray-${deg}`}
                  x1={230 + Math.cos(rad) * 28}
                  y1={175 + Math.sin(rad) * 28}
                  x2={230 + Math.cos(rad) * (converged ? 155 : 110)}
                  y2={175 + Math.sin(rad) * (converged ? 155 : 110)}
                  stroke="var(--color-accent-gold)"
                  strokeWidth="0.8"
                  strokeDasharray="2 5"
                  opacity={converged ? 0.55 : 0.32}
                />
              );
            })}

            {/* Outer Orbital Ring */}
            <circle
              cx="230"
              cy="175"
              r="138"
              stroke="var(--color-accent-gold)"
              strokeWidth="0.9"
              strokeDasharray="4 6"
              opacity={0.18 + branchScale * 0.35}
              className={!isReduced ? 'animate-ch02-orbit' : undefined}
            />
            <circle
              cx="230"
              cy="175"
              r="74"
              stroke="var(--color-accent-gold)"
              strokeWidth="1"
              opacity={converged ? 0.65 : 0.25}
            />

            {/* 4 Branching Inquiry Traces + Interactive Nodes */}
            {WORKBENCH_OBJECTS.map((obj, idx) => {
              const cfg = ORBIT_NODES[idx];
              const rad = (cfg.angle * Math.PI) / 180;
              const dist = converged ? 74 : cfg.radius * branchScale;
              const nx = 230 + Math.cos(rad) * dist;
              const ny = 175 + Math.sin(rad) * dist;
              const isSelected = selectedNode === idx;

              return (
                <g
                  key={obj.id}
                  onMouseEnter={() => setSelectedNode(idx)}
                  onClick={() => setSelectedNode((prev) => (prev === idx ? null : idx))}
                  className="cursor-pointer"
                >
                  {/* Flowing Data Trace between Center Spark & Node */}
                  {branchScale > 0.05 && (
                    <line
                      x1="230"
                      y1="175"
                      x2={nx}
                      y2={ny}
                      stroke="var(--color-accent-gold)"
                      strokeWidth={isSelected || converged ? '1.8' : '1.1'}
                      strokeDasharray={!isReduced ? '6 8' : undefined}
                      className={!isReduced ? 'animate-ch02-packet' : undefined}
                      opacity={0.45 + branchScale * 0.5}
                    />
                  )}

                  {/* Inquiry Node */}
                  {branchScale > 0.15 && (
                    <g transform={`translate(${nx}, ${ny})`}>
                      {isSelected && (
                        <circle
                          r="26"
                          stroke="var(--color-accent-gold)"
                          strokeWidth="1"
                          strokeDasharray="3 3"
                          opacity="0.8"
                        />
                      )}
                      <circle
                        r={isSelected ? '21' : '18'}
                        fill="var(--color-cinema-bg)"
                        stroke="var(--color-accent-gold)"
                        strokeWidth={isSelected || converged ? '1.8' : '1.1'}
                      />
                      <text
                        x="0"
                        y="3"
                        textAnchor="middle"
                        fill="var(--color-accent-gold)"
                        fontFamily="var(--font-mono)"
                        fontSize="7.5"
                      >
                        {obj.shortLabel.toUpperCase()}
                      </text>
                      {!converged && (
                        <text
                          x="0"
                          y="-26"
                          textAnchor="middle"
                          fill="var(--color-cinema-muted)"
                          fontFamily="var(--font-serif)"
                          fontStyle="italic"
                          fontSize="11"
                        >
                          {obj.questionWord}
                        </text>
                      )}
                    </g>
                  )}
                </g>
              );
            })}

            {/* Clickable Center Spark / Ignited Core */}
            <g
              onClick={() => setSparkPulse((p) => p + 1)}
              className="cursor-pointer"
            >
              <circle
                cx="230"
                cy="175"
                r={converged ? 22 : 13}
                fill="var(--color-accent-gold)"
                opacity={converged ? 0.95 : 0.8}
              />
              <text
                x="230"
                y="179"
                textAnchor="middle"
                fill="var(--color-cinema-bg)"
                fontFamily="var(--font-mono)"
                fontSize={converged ? '9' : '9.5'}
                fontWeight="bold"
              >
                {converged ? '01' : '>_'}
              </text>
            </g>

            {/* Downward Gold Beam to Chapter 02 upon Convergence */}
            {converged && (
              <line
                x1="230"
                y1="197"
                x2="230"
                y2="370"
                stroke="var(--color-accent-gold)"
                strokeWidth="2"
                opacity="0.85"
              />
            )}
          </svg>

          {/* Floating Whisper Pill for Selected/Hovered Node */}
          {selectedNode !== null && WORKBENCH_OBJECTS[selectedNode] && (
            <motion.div
              initial={!isReduced ? { opacity: 0, y: 6 } : false}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-1 px-4 py-2 rounded-full border border-cinema-gold/40 bg-cinema-surface/85 backdrop-blur-md font-mono text-[11px] text-cinema-gold text-center max-w-md"
            >
              {WORKBENCH_OBJECTS[selectedNode].name}: {WORKBENCH_OBJECTS[selectedNode].insight}
            </motion.div>
          )}
        </div>

        {/* BOTTOM KINETIC NARRATION REVEAL */}
        <footer className="relative z-20 max-w-3xl mx-auto w-full text-center space-y-3 min-h-[100px] flex flex-col justify-end">
          <AnimatePresence mode="wait">
            {beat === 0 ? (
              <motion.div
                key="ch01-beat0"
                initial={!isReduced ? { opacity: 0, y: 10 } : false}
                animate={{ opacity: 1, y: 0 }}
                exit={!isReduced ? { opacity: 0, y: -10 } : undefined}
                transition={{ duration: 0.25 }}
                className="space-y-2"
              >
                <h2 className="text-fluid-h1 font-serif text-cinema-text">
                  <Content value={chapter01Content.title} />
                </h2>
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-cinema-muted">
                  Click &gt;_ to pulse · Scroll to ignite the spark ↓
                </p>
              </motion.div>
            ) : (
              activeLine && (
                <motion.p
                  key={`ch01-beat-${beat}`}
                  initial={!isReduced ? { opacity: 0, y: 14, filter: 'brightness(1.4)' } : false}
                  animate={{ opacity: 1, y: 0, filter: 'brightness(1)' }}
                  exit={!isReduced ? { opacity: 0, y: -12 } : undefined}
                  transition={{ duration: 0.3 }}
                  className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-cinema-text leading-[1.25]"
                >
                  &ldquo;<Content value={activeLine} />&rdquo;
                </motion.p>
              )
            )}
          </AnimatePresence>

          {converged && chapter01Content.bridge && (
            <p className="font-serif italic text-xs sm:text-sm text-cinema-muted pt-1">
              <Content value={chapter01Content.bridge} />
            </p>
          )}
        </footer>
      </div>
    </article>
  );
}
