'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StageProps {
  isReduced: boolean;
  isHighlighted: boolean;
}

/* -------------------------------------------------------------------------- */
/* 01 · FULL-STACK DEVELOPER: Live Animated Architecture & Packet Pipeline    */
/* -------------------------------------------------------------------------- */
export function BuilderStage({ isReduced, isHighlighted }: StageProps) {
  const [buildBurst, setBuildBurst] = useState(0);

  return (
    <div
      className="rounded-xl border border-sunrise-azure/25 bg-cinema-bg/90 p-3.5 space-y-2.5"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between font-mono text-[10px]">
        <span className="flex items-center gap-1.5 text-sunrise-azure">
          <span className={cn('w-1.5 h-1.5 rounded-full bg-sunrise-azure', !isReduced && 'animate-pulse')} />
          <span>STACK // PIPELINE</span>
        </span>
        <button
          type="button"
          onClick={() => setBuildBurst((b) => b + 1)}
          className="px-2 py-0.5 rounded border border-sunrise-azure/40 bg-sunrise-azure/10 text-sunrise-azure hover:bg-sunrise-azure/20 transition-colors cursor-pointer"
        >
          Deploy {buildBurst > 0 ? `#${buildBurst}` : '⚡'}
        </button>
      </div>

      {/* Animated Topology SVG: Client -> Edge -> API -> DB */}
      <svg viewBox="0 0 320 72" fill="none" className="w-full h-16 overflow-visible" aria-hidden="true">
        {/* Static connection rails */}
        <path
          d="M 38,36 L 112,36 M 136,36 L 208,36 M 232,36 L 284,36"
          stroke="var(--color-border-strong)"
          strokeWidth="1.5"
        />
        {/* Flowing data packets */}
        <path
          d="M 38,36 L 112,36 M 136,36 L 208,36 M 232,36 L 284,36"
          stroke="var(--color-accent-azure)"
          strokeWidth="2"
          strokeDasharray="6 10"
          className={!isReduced ? 'animate-ch02-packet' : undefined}
          opacity={isHighlighted ? 1 : 0.75}
        />

        {/* Nodes */}
        {[
          { x: 26, label: 'UI' },
          { x: 124, label: 'EDGE' },
          { x: 220, label: 'API' },
          { x: 294, label: 'DB' },
        ].map((node, i) => (
          <g key={node.label} transform={`translate(${node.x}, 36)`}>
            <rect
              x="-16"
              y="-14"
              width="32"
              height="28"
              rx="6"
              fill="var(--color-cinema-surface)"
              stroke="var(--color-accent-azure)"
              strokeWidth={i === buildBurst % 4 ? '1.8' : '1.1'}
            />
            <text
              x="0"
              y="3"
              textAnchor="middle"
              fill="var(--color-cinema-text)"
              fontFamily="var(--font-mono)"
              fontSize="7.5"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>

      <div className="flex items-center justify-between font-mono text-[10px] text-cinema-muted">
        <span className="text-sunrise-azure">200 OK · {11 + (buildBurst % 4)}ms</span>
        <span>Next.js · TS · Node · Postgres</span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 02 · AI ENGINEER: Living Neural Network & Animated Synapses                */
/* -------------------------------------------------------------------------- */
export function IntelligenceStage({ isReduced, isHighlighted }: StageProps) {
  const [activeLayer, setActiveLayer] = useState(true);

  const inputNodes = [18, 38, 58];
  const hiddenNodes = [14, 38, 62];
  const outputNodes = [26, 50];

  return (
    <div
      className="rounded-xl border border-sunrise-iris/25 bg-cinema-bg/90 p-3.5 space-y-2.5"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between font-mono text-[10px]">
        <span className="flex items-center gap-1.5 text-sunrise-iris">
          <span className={cn('w-1.5 h-1.5 rounded-full bg-sunrise-iris', !isReduced && activeLayer && 'animate-ping')} />
          <span>NEURAL // INFERENCE</span>
        </span>
        <button
          type="button"
          onClick={() => setActiveLayer((v) => !v)}
          className="px-2 py-0.5 rounded border border-sunrise-iris/40 bg-sunrise-iris/10 text-sunrise-iris hover:bg-sunrise-iris/20 transition-colors cursor-pointer"
        >
          {activeLayer ? 'Streaming' : 'Paused'}
        </button>
      </div>

      {/* Animated Multi-Layer Neural Mesh */}
      <svg viewBox="0 0 320 76" fill="none" className="w-full h-16 overflow-visible" aria-hidden="true">
        {/* Input -> Hidden edges */}
        {inputNodes.map((iy, i) =>
          hiddenNodes.map((hy, h) => (
            <line
              key={`ih-${i}-${h}`}
              x1="44"
              y1={iy}
              x2="160"
              y2={hy}
              stroke="var(--color-accent-iris)"
              strokeWidth="1"
              strokeDasharray={activeLayer && !isReduced ? '4 6' : undefined}
              className={activeLayer && !isReduced ? 'animate-ch02-packet' : undefined}
              opacity={isHighlighted ? 0.65 : 0.35}
            />
          ))
        )}

        {/* Hidden -> Output edges */}
        {hiddenNodes.map((hy, h) =>
          outputNodes.map((oy, o) => (
            <line
              key={`ho-${h}-${o}`}
              x1="160"
              y1={hy}
              x2="276"
              y2={oy}
              stroke="var(--color-accent-iris)"
              strokeWidth="1.2"
              strokeDasharray={activeLayer && !isReduced ? '4 6' : undefined}
              className={activeLayer && !isReduced ? 'animate-ch02-packet' : undefined}
              opacity={isHighlighted ? 0.8 : 0.45}
            />
          ))
        )}

        {/* Nodes */}
        {inputNodes.map((y, idx) => (
          <circle key={`in-${idx}`} cx="44" cy={y} r="4.5" fill="var(--color-cinema-bg)" stroke="var(--color-accent-iris)" strokeWidth="1.5" />
        ))}
        {hiddenNodes.map((y, idx) => (
          <motion.circle
            key={`hid-${idx}`}
            cx="160"
            cy={y}
            r="5.5"
            fill="var(--color-accent-iris)"
            animate={
              activeLayer && !isReduced
                ? { scale: [1, 1.28, 1], opacity: [0.55, 1, 0.55] }
                : { scale: 1, opacity: 0.75 }
            }
            transition={{ duration: 1.8, repeat: Infinity, delay: idx * 0.35 }}
          />
        ))}
        {outputNodes.map((y, idx) => (
          <circle key={`out-${idx}`} cx="276" cy={y} r="5" fill="var(--color-cinema-bg)" stroke="var(--color-accent-iris)" strokeWidth="1.8" />
        ))}
      </svg>

      <div className="flex items-center justify-between font-mono text-[10px] text-cinema-muted">
        <span className="text-sunrise-iris">{activeLayer ? '0.96 attn · 128k ctx' : 'idle'}</span>
        <span>Agents · RAG · Fine-Tuning</span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 03 · GRAPHIC DESIGNER: Kinetic Typography & Orbiting Golden Ratio Canvas   */
/* -------------------------------------------------------------------------- */
const DESIGN_MODES = ['Editorial', 'Swiss Grid', 'Minimal'] as const;

export function VisualStage({ isReduced }: StageProps) {
  const [modeIdx, setModeIdx] = useState(0);
  const mode = DESIGN_MODES[modeIdx];

  return (
    <div
      className="rounded-xl border border-sunrise-rose/25 bg-cinema-bg/90 p-3.5 space-y-2.5"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between font-mono text-[10px]">
        <span className="flex items-center gap-1.5 text-sunrise-rose">
          <span className="w-1.5 h-1.5 rounded-full bg-sunrise-rose" />
          <span>CANVAS // {mode.toUpperCase()}</span>
        </span>
        <button
          type="button"
          onClick={() => setModeIdx((i) => (i + 1) % DESIGN_MODES.length)}
          className="px-2 py-0.5 rounded border border-sunrise-rose/40 bg-sunrise-rose/10 text-sunrise-rose hover:bg-sunrise-rose/20 transition-colors cursor-pointer"
        >
          Switch Mode
        </button>
      </div>

      {/* Kinetic Typography + Orbiting Geometry Stage */}
      <div className="relative h-16 rounded-lg border border-cinema-border/60 overflow-hidden flex items-center justify-between px-4 bg-cinema-surface/40">
        {/* Optional Swiss Grid lines */}
        {mode !== 'Minimal' && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                mode === 'Swiss Grid'
                  ? 'linear-gradient(to right, var(--color-accent-rose) 1px, transparent 1px), linear-gradient(to bottom, var(--color-accent-rose) 1px, transparent 1px)'
                  : 'linear-gradient(to right, var(--color-accent-rose) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />
        )}

        {/* Kinetic Specimen */}
        <motion.div
          key={mode}
          initial={!isReduced ? { opacity: 0, y: 6 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="relative z-10 flex items-baseline gap-2.5"
        >
          <span
            className={cn(
              'text-2xl text-cinema-text leading-none',
              mode === 'Editorial' && 'font-serif italic',
              mode === 'Swiss Grid' && 'font-sans font-black tracking-tighter uppercase',
              mode === 'Minimal' && 'font-mono font-light tracking-widest'
            )}
          >
            Aa
          </span>
          <span className="font-mono text-[10px] text-sunrise-rose">
            {mode === 'Editorial' ? 'Instrument Serif' : mode === 'Swiss Grid' ? 'Geist Heavy' : 'Geist Mono'}
          </span>
        </motion.div>

        {/* Orbiting Golden Ratio Ring */}
        <svg viewBox="0 0 60 60" fill="none" className="relative z-10 w-12 h-12" aria-hidden="true">
          <g className={!isReduced ? 'animate-ch02-orbit' : undefined}>
            <circle cx="30" cy="30" r="22" stroke="var(--color-accent-rose)" strokeWidth="1" strokeDasharray="4 4" opacity="0.7" />
            <circle cx="30" cy="8" r="2.5" fill="var(--color-accent-rose)" />
            <rect x="18" y="18" width="24" height="24" stroke="var(--color-accent-rose)" strokeWidth="0.9" opacity="0.55" />
          </g>
          <circle cx="30" cy="30" r="3" fill="var(--color-cinema-text)" />
        </svg>
      </div>

      <div className="flex items-center justify-between font-mono text-[10px] text-cinema-muted">
        <span className="text-sunrise-rose">1.618 · Golden Ratio</span>
        <span>Branding · Type · Composition</span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 04 · AI ENTHUSIAST: Live Rotating Frontier Radar & Signal Blips            */
/* -------------------------------------------------------------------------- */
const FRONTIER_TOPICS = ['WebGPU', 'Local LLM', 'Spatial UI', 'Agentic OS'] as const;

export function ExplorerStage({ isReduced }: StageProps) {
  const [focusedTopic, setFocusedTopic] = useState<string>(FRONTIER_TOPICS[0]);

  return (
    <div
      className="rounded-xl border border-sunrise-ember/25 bg-cinema-bg/90 p-3.5 space-y-2.5"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between font-mono text-[10px]">
        <span className="flex items-center gap-1.5 text-sunrise-ember">
          <span className={cn('w-1.5 h-1.5 rounded-full bg-sunrise-ember', !isReduced && 'animate-ping')} />
          <span>FRONTIER // RADAR</span>
        </span>
        <span className="text-sunrise-ember">{focusedTopic}</span>
      </div>

      <div className="flex items-center gap-4">
        {/* Rotating Radar Sweep */}
        <svg viewBox="0 0 80 80" fill="none" className="w-16 h-16 shrink-0" aria-hidden="true">
          <circle cx="40" cy="40" r="34" stroke="var(--color-accent-ember)" strokeWidth="1" opacity="0.25" />
          <circle cx="40" cy="40" r="22" stroke="var(--color-accent-ember)" strokeWidth="1" strokeDasharray="3 3" opacity="0.35" />
          <circle cx="40" cy="40" r="10" stroke="var(--color-accent-ember)" strokeWidth="1" opacity="0.45" />
          <line x1="6" y1="40" x2="74" y2="40" stroke="var(--color-accent-ember)" strokeWidth="0.7" opacity="0.2" />
          <line x1="40" y1="6" x2="40" y2="74" stroke="var(--color-accent-ember)" strokeWidth="0.7" opacity="0.2" />

          {/* Sweeping Beam Wedge */}
          <g className={!isReduced ? 'animate-ch02-radar' : undefined}>
            <path
              d="M 40,40 L 40,6 A 34 34 0 0 1 69,23 Z"
              fill="var(--color-accent-ember)"
              opacity="0.22"
            />
            <line x1="40" y1="40" x2="40" y2="6" stroke="var(--color-accent-ember)" strokeWidth="1.4" opacity="0.85" />
          </g>

          {/* Pulsing Signal Blips */}
          <circle cx="24" cy="24" r="2.5" fill="var(--color-accent-ember)" opacity="0.9" />
          <circle cx="58" cy="28" r="2.2" fill="var(--color-accent-ember)" opacity="0.7" />
          <circle cx="52" cy="58" r="2.5" fill="var(--color-accent-ember)" opacity="0.85" />
          <circle cx="40" cy="40" r="2.5" fill="var(--color-cinema-text)" />
        </svg>

        {/* Interactive Signal Tags */}
        <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
          {FRONTIER_TOPICS.map((tag) => {
            const active = focusedTopic === tag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setFocusedTopic(tag)}
                className={cn(
                  'px-2 py-1 rounded border transition-all cursor-pointer',
                  active
                    ? 'border-sunrise-ember bg-sunrise-ember/20 text-sunrise-ember'
                    : 'border-cinema-border bg-cinema-surface/60 text-cinema-muted hover:text-cinema-text hover:border-sunrise-ember/40'
                )}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between font-mono text-[10px] text-cinema-muted">
        <span className="text-sunrise-ember">Signal locked</span>
        <span>Always asking what&apos;s next</span>
      </div>
    </div>
  );
}
