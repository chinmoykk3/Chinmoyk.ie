'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StageProps {
  isReduced: boolean;
  isHighlighted: boolean;
}

/* -------------------------------------------------------------------------- */
/* 01 · THE BUILDER: Interactive Live Node-Patcher (Click nodes to rewire)    */
/* -------------------------------------------------------------------------- */
const PATCH_INPUTS = [
  { id: 'auth', label: 'AUTH_JWT', y: 20, throughput: 42 },
  { id: 'cache', label: 'EDGE_KV', y: 60, throughput: 128 },
  { id: 'stream', label: 'WS_STREAM', y: 100, throughput: 84 },
] as const;

export function BuilderStage({ isReduced }: StageProps) {
  const [activeInputs, setActiveInputs] = useState<Record<string, boolean>>({
    auth: true,
    cache: true,
    stream: false,
  });

  const toggleNode = (id: string) => {
    setActiveInputs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const totalThroughput = PATCH_INPUTS.reduce(
    (sum, item) => sum + (activeInputs[item.id] ? item.throughput : 0),
    0
  );
  const activeCount = Object.values(activeInputs).filter(Boolean).length;

  return (
    <div className="w-full space-y-2 py-1" onClick={(e) => e.stopPropagation()}>
      <div className="flex items-center justify-between font-mono text-[10px] text-cinema-muted">
        <span className="text-sunrise-azure">CLICK NODES TO PATCH CIRCUIT</span>
        <span>
          THROUGHPUT: <strong className="text-sunrise-azure">{totalThroughput}k req/s</strong>
        </span>
      </div>

      <svg viewBox="0 0 420 120" fill="none" className="w-full h-28 overflow-visible" aria-hidden="true">
        {/* Patch Cables: Inputs -> Core */}
        {PATCH_INPUTS.map((node) => {
          const on = activeInputs[node.id];
          return (
            <g key={`cable-${node.id}`}>
              <path
                d={`M 96,${node.y} C 155,${node.y} 165,60 215,60`}
                stroke={on ? 'var(--color-accent-azure)' : 'var(--color-border-strong)'}
                strokeWidth={on ? '2' : '1'}
                strokeDasharray={on && !isReduced ? '6 8' : undefined}
                className={on && !isReduced ? 'animate-ch02-packet' : undefined}
                opacity={on ? 0.95 : 0.35}
              />
            </g>
          );
        })}

        {/* Output Cables: Core -> Edge UI & DB */}
        {[32, 88].map((outY, idx) => {
          const on = activeCount > 0;
          return (
            <path
              key={`out-cable-${idx}`}
              d={`M 255,60 C 295,60 300,${outY} 340,${outY}`}
              stroke={on ? 'var(--color-accent-azure)' : 'var(--color-border-strong)'}
              strokeWidth={on ? '2' : '1'}
              strokeDasharray={on && !isReduced ? '6 8' : undefined}
              className={on && !isReduced ? 'animate-ch02-packet' : undefined}
              opacity={on ? 0.9 : 0.3}
            />
          );
        })}

        {/* Clickable Input Nodes */}
        {PATCH_INPUTS.map((node) => {
          const on = activeInputs[node.id];
          return (
            <g
              key={node.id}
              transform={`translate(52, ${node.y})`}
              onClick={() => toggleNode(node.id)}
              className="cursor-pointer"
            >
              <rect
                x="-44"
                y="-12"
                width="88"
                height="24"
                rx="12"
                fill={on ? 'var(--color-cinema-surface)' : 'var(--color-cinema-bg)'}
                stroke={on ? 'var(--color-accent-azure)' : 'var(--color-border-strong)'}
                strokeWidth={on ? '1.6' : '1'}
              />
              <circle
                cx="-30"
                cy="0"
                r="3"
                fill={on ? 'var(--color-accent-azure)' : 'var(--color-border-strong)'}
              />
              <text
                x="6"
                y="3.5"
                textAnchor="middle"
                fill={on ? 'var(--color-cinema-text)' : 'var(--color-cinema-muted)'}
                fontFamily="var(--font-mono)"
                fontSize="8"
              >
                {node.label}
              </text>
            </g>
          );
        })}

        {/* Central Core Router */}
        <g transform="translate(235, 60)">
          <polygon
            points="0,-24 22,0 0,24 -22,0"
            fill="var(--color-cinema-bg)"
            stroke="var(--color-accent-azure)"
            strokeWidth={activeCount > 0 ? '2' : '1'}
          />
          <text
            x="0"
            y="3"
            textAnchor="middle"
            fill="var(--color-accent-azure)"
            fontFamily="var(--font-mono)"
            fontSize="7.5"
          >
            {activeCount}/3
          </text>
        </g>

        {/* Output Targets */}
        {[
          { y: 32, label: 'EDGE_UI' },
          { y: 88, label: 'DB_SYNC' },
        ].map((out) => (
          <g key={out.label} transform={`translate(376, ${out.y})`}>
            <rect
              x="-36"
              y="-12"
              width="72"
              height="24"
              rx="6"
              fill="var(--color-cinema-bg)"
              stroke={activeCount > 0 ? 'var(--color-accent-azure)' : 'var(--color-border-strong)'}
              strokeWidth="1.2"
              opacity={activeCount > 0 ? 1 : 0.45}
            />
            <text
              x="0"
              y="3.5"
              textAnchor="middle"
              fill="var(--color-cinema-text)"
              fontFamily="var(--font-mono)"
              fontSize="8"
            >
              {out.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 02 · AI ENGINEER: Interactive 5x5 Attention Matrix & Next-Token Predictor  */
/* -------------------------------------------------------------------------- */
const MATRIX_LABELS = ['CURIOSITY', 'SYSTEMS', 'CONTEXT', 'REASON', 'CREATE'] as const;
const PREDICTIONS = [
  { token: 'architect()', score: 94 },
  { token: 'synthesize()', score: 87 },
  { token: 'adapt()', score: 79 },
  { token: 'ship()', score: 91 },
  { token: 'evolve()', score: 98 },
] as const;

export function IntelligenceStage({ isReduced }: StageProps) {
  const [focusCell, setFocusCell] = useState<{ r: number; c: number }>({ r: 2, c: 4 });

  const activePred = PREDICTIONS[(focusCell.r + focusCell.c) % PREDICTIONS.length];

  return (
    <div
      className="w-full flex flex-col sm:flex-row items-center justify-center gap-6 py-1"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Left: Interactive 5x5 Attention Heatmap */}
      <div className="space-y-1.5">
        <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-sunrise-iris text-center">
          TOUCH ATTENTION MATRIX
        </div>
        <div className="grid grid-cols-5 gap-1.5">
          {Array.from({ length: 5 }).map((_, r) =>
            Array.from({ length: 5 }).map((__, c) => {
              const isExact = focusCell.r === r && focusCell.c === c;
              const isCross = focusCell.r === r || focusCell.c === c;
              return (
                <button
                  key={`cell-${r}-${c}`}
                  type="button"
                  onMouseEnter={() => setFocusCell({ r, c })}
                  onClick={() => setFocusCell({ r, c })}
                  aria-label={`Attention cell ${r + 1},${c + 1}`}
                  className={cn(
                    'w-6 h-6 sm:w-7 sm:h-7 rounded-md border transition-all duration-200 cursor-pointer focus:outline-none',
                    isExact
                      ? 'bg-sunrise-iris border-sunrise-iris scale-110 shadow-[0_0_16px_var(--color-accent-iris)]'
                      : isCross
                        ? 'bg-sunrise-iris/30 border-sunrise-iris/60'
                        : 'bg-cinema-bg/70 border-cinema-border/70 hover:border-sunrise-iris/50'
                  )}
                />
              );
            })
          )}
        </div>
      </div>

      {/* Right: Live Attention Readout & Predicted Token */}
      <div className="w-full sm:w-56 space-y-2.5 font-mono text-xs">
        <div className="flex items-center justify-between text-[10px] text-cinema-muted">
          <span>HEAD [{MATRIX_LABELS[focusCell.r]}]</span>
          <span className="text-sunrise-iris">× {MATRIX_LABELS[focusCell.c]}</span>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-[11px]">
            <span className="text-cinema-text">next_token:</span>
            <span className="text-sunrise-iris font-semibold">{activePred.token}</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-cinema-bg overflow-hidden">
            <motion.div
              className="h-full bg-sunrise-iris rounded-full"
              animate={{ width: `${activePred.score}%` }}
              transition={{ duration: isReduced ? 0 : 0.3 }}
            />
          </div>
          <div className="text-right text-[10px] text-sunrise-iris/85">
            {activePred.score}% confidence
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 03 · VISUAL THINKER: Cursor-Warped Kinetic Type & Geometric Stamp Canvas   */
/* -------------------------------------------------------------------------- */
const GEOMETRY_SHAPES = ['circle', 'diamond', 'crosshair'] as const;

export function VisualStage({ isReduced }: StageProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [cursorX, setCursorX] = useState(0.5);
  const [shapeIdx, setShapeIdx] = useState(0);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isReduced || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    setCursorX(Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)));
  };

  const trackingEm = (-0.04 + cursorX * 0.24).toFixed(3);
  const skewDeg = ((cursorX - 0.5) * -14).toFixed(1);
  const shape = GEOMETRY_SHAPES[shapeIdx];

  return (
    <div
      ref={stageRef}
      onMouseMove={handleMove}
      onClick={(e) => {
        e.stopPropagation();
        setShapeIdx((s) => (s + 1) % GEOMETRY_SHAPES.length);
      }}
      className="relative w-full py-5 px-4 overflow-hidden cursor-crosshair select-none border-y border-sunrise-rose/25"
    >
      {/* Interactive Rose Spotlight following cursor */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-35 transition-opacity"
        style={{
          background: `radial-gradient(circle 140px at ${Math.round(cursorX * 100)}% 50%, var(--color-accent-rose), transparent 75%)`,
        }}
      />

      <div className="relative z-10 flex items-center justify-between gap-4">
        <div
          className="font-serif italic text-3xl sm:text-5xl text-cinema-text leading-none transition-transform duration-150"
          style={{
            letterSpacing: `${trackingEm}em`,
            transform: isReduced ? 'none' : `skewX(${skewDeg}deg)`,
          }}
        >
          FORM × FLOW
        </div>

        {/* Click-to-Morph Bauhaus Geometry */}
        <svg viewBox="0 0 48 48" fill="none" className="w-11 h-11 shrink-0" aria-hidden="true">
          {shape === 'circle' && (
            <circle cx="24" cy="24" r="16" stroke="var(--color-accent-rose)" strokeWidth="1.8" />
          )}
          {shape === 'diamond' && (
            <polygon points="24,6 42,24 24,42 6,24" stroke="var(--color-accent-rose)" strokeWidth="1.8" />
          )}
          {shape === 'crosshair' && (
            <g stroke="var(--color-accent-rose)" strokeWidth="1.6">
              <circle cx="24" cy="24" r="14" strokeDasharray="3 3" />
              <line x1="4" y1="24" x2="44" y2="24" />
              <line x1="24" y1="4" x2="24" y2="44" />
            </g>
          )}
        </svg>
      </div>

      <div className="relative z-10 flex justify-between font-mono text-[9px] uppercase tracking-[0.2em] text-sunrise-rose/85 mt-3">
        <span>SWIPE TO WARP TYPE · CLICK TO MORPH</span>
        <span>TRACKING: {trackingEm}EM</span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 04 · THE EXPLORER: Interactive Magnetic Gravity Field                      */
/* -------------------------------------------------------------------------- */
const SATELLITES = [
  { id: 'webgpu', label: 'WebGPU', bx: 20, by: 30 },
  { id: 'agents', label: 'Agents', bx: 45, by: 72 },
  { id: 'localllm', label: 'Local AI', bx: 70, by: 28 },
  { id: 'spatial', label: 'Spatial', bx: 84, by: 68 },
] as const;

export function ExplorerStage({ isReduced }: StageProps) {
  const fieldRef = useRef<HTMLDivElement>(null);
  const [pointer, setPointer] = useState<{ x: number; y: number; active: boolean }>({
    x: 50,
    y: 50,
    active: false,
  });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isReduced || !fieldRef.current) return;
    const rect = fieldRef.current.getBoundingClientRect();
    setPointer({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      active: true,
    });
  };

  return (
    <div
      ref={fieldRef}
      onMouseMove={handleMove}
      onMouseLeave={() => setPointer((p) => ({ ...p, active: false }))}
      onClick={(e) => e.stopPropagation()}
      className="relative w-full h-28 border-y border-sunrise-ember/25 overflow-hidden cursor-crosshair"
    >
      {/* Dynamic Tether Lines from Cursor Gravity Well to Satellites */}
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full" aria-hidden="true">
        {pointer.active &&
          SATELLITES.map((sat) => (
            <line
              key={`tether-${sat.id}`}
              x1={pointer.x}
              y1={pointer.y}
              x2={sat.bx}
              y2={sat.by}
              stroke="var(--color-accent-ember)"
              strokeWidth="0.5"
              strokeDasharray="2 2"
              opacity="0.65"
            />
          ))}
      </svg>

      {/* Satellites that bend toward pointer */}
      {SATELLITES.map((sat) => {
        const dx = pointer.active && !isReduced ? (pointer.x - sat.bx) * 0.16 : 0;
        const dy = pointer.active && !isReduced ? (pointer.y - sat.by) * 0.16 : 0;
        return (
          <div
            key={sat.id}
            style={{
              left: `${sat.bx + dx}%`,
              top: `${sat.by + dy}%`,
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 transition-all duration-200 ease-out pointer-events-none"
          >
            <span className="w-2 h-2 rounded-full bg-sunrise-ember shadow-[0_0_10px_var(--color-accent-ember)]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-cinema-text">
              {sat.label}
            </span>
          </div>
        );
      })}

      <div className="absolute bottom-1.5 left-0 right-0 text-center font-mono text-[9px] uppercase tracking-[0.22em] text-sunrise-ember/80 pointer-events-none">
        {pointer.active ? 'GRAVITY WELL ENGAGED' : 'MOVE CURSOR TO BEND HORIZON'}
      </div>
    </div>
  );
}
