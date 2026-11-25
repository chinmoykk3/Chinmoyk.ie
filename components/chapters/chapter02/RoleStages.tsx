'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StageProps {
  isReduced: boolean;
  isHighlighted: boolean;
}

/* -------------------------------------------------------------------------- */
/* 01 · FULL-STACK DEVELOPER: Interactive Command Runner & Live Log Stream    */
/* -------------------------------------------------------------------------- */
const BUILD_COMMANDS = [
  {
    cmd: 'npm run build',
    logs: [
      '▲ Next.js 15 · Compiling app router...',
      '✓ 19 static & dynamic routes optimized',
      '✓ Bundle gzipped: 48.2 kB · 0 errors',
    ],
  },
  {
    cmd: 'git push origin main',
    logs: [
      '→ Compressing objects: 100% (24/24)',
      '→ Triggering edge deployment pipeline...',
      '✓ Live at https://chinmoyk.ie (11ms TTFB)',
    ],
  },
  {
    cmd: 'curl -s /api/health',
    logs: [
      '→ Connecting to edge-node-01...',
      '← HTTP/2 200 OK · db: connected (4ms)',
      '✓ All microservices nominal',
    ],
  },
] as const;

export function BuilderStage({ isReduced }: StageProps) {
  const [cmdIdx, setCmdIdx] = useState(0);
  const [visibleLines, setVisibleLines] = useState(3);

  const active = BUILD_COMMANDS[cmdIdx];

  useEffect(() => {
    if (isReduced) {
      setVisibleLines(3);
      return;
    }
    setVisibleLines(1);
    const t1 = setTimeout(() => setVisibleLines(2), 260);
    const t2 = setTimeout(() => setVisibleLines(3), 560);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [cmdIdx, isReduced]);

  return (
    <div
      className="w-full space-y-3 py-1"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Interactive Command Selector Tabs */}
      <div className="flex flex-wrap items-center gap-2 font-mono text-[10px]">
        {BUILD_COMMANDS.map((item, idx) => (
          <button
            key={item.cmd}
            type="button"
            onClick={() => setCmdIdx(idx)}
            className={cn(
              'px-3 py-1 rounded-full border transition-all cursor-pointer',
              idx === cmdIdx
                ? 'border-sunrise-azure bg-sunrise-azure/20 text-sunrise-azure'
                : 'border-cinema-border/80 text-cinema-muted hover:text-cinema-text hover:border-sunrise-azure/40'
            )}
          >
            $ {item.cmd}
          </button>
        ))}
      </div>

      {/* Live Streaming Log Output */}
      <div className="pl-4 border-l-2 border-sunrise-azure/50 font-mono text-xs space-y-1.5 min-h-[74px]">
        {active.logs.slice(0, visibleLines).map((line, i) => (
          <motion.div
            key={`${cmdIdx}-${i}`}
            initial={!isReduced ? { opacity: 0, x: -8 } : false}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.22 }}
            className={cn(
              'leading-relaxed',
              i === active.logs.length - 1 ? 'text-sunrise-azure font-medium' : 'text-cinema-muted'
            )}
          >
            {line}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 02 · AI ENGINEER: Interactive Prompt-to-Thought Token Synthesizer          */
/* -------------------------------------------------------------------------- */
const AI_PROMPTS = [
  {
    label: 'Design Agent',
    tokens: ['[intent]', '→', 'decompose(goal)', '→', 'tool_call(memory)', '→', 'verify()', '✓ 0.97'],
  },
  {
    label: 'Optimize RAG',
    tokens: ['[query]', '→', 'embed(1536d)', '→', 'hybrid_rerank()', '→', 'ground(ctx)', '✓ 14ms'],
  },
  {
    label: 'Align Model',
    tokens: ['[pair]', '→', 'dpo_loss()', '→', 'reward_delta(+0.42)', '→', 'converged', '✓ 99.1%'],
  },
] as const;

export function IntelligenceStage({ isReduced }: StageProps) {
  const [promptIdx, setPromptIdx] = useState(0);
  const [tokenCount, setTokenCount] = useState(8);

  const active = AI_PROMPTS[promptIdx];

  useEffect(() => {
    if (isReduced) {
      setTokenCount(active.tokens.length);
      return;
    }
    setTokenCount(1);
    const interval = setInterval(() => {
      setTokenCount((c) => {
        if (c >= active.tokens.length) {
          clearInterval(interval);
          return c;
        }
        return c + 1;
      });
    }, 150);
    return () => clearInterval(interval);
  }, [promptIdx, active.tokens.length, isReduced]);

  return (
    <div
      className="w-full flex flex-col items-center space-y-4 py-1"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Prompt Triggers */}
      <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-[10px]">
        {AI_PROMPTS.map((p, idx) => (
          <button
            key={p.label}
            type="button"
            onClick={() => setPromptIdx(idx)}
            className={cn(
              'px-3 py-1 rounded-full border transition-all cursor-pointer',
              idx === promptIdx
                ? 'border-sunrise-iris bg-sunrise-iris/20 text-sunrise-iris'
                : 'border-cinema-border/80 text-cinema-muted hover:text-cinema-text hover:border-sunrise-iris/40'
            )}
          >
            &gt; {p.label}
          </button>
        ))}
      </div>

      {/* Live Token Stream Chain */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 font-mono text-xs min-h-[44px]">
        {active.tokens.slice(0, tokenCount).map((tok, i) => {
          const isArrow = tok === '→';
          const isLast = i === active.tokens.length - 1;
          return (
            <motion.span
              key={`${promptIdx}-${i}`}
              initial={!isReduced ? { opacity: 0, scale: 0.8 } : false}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.18 }}
              className={cn(
                isArrow
                  ? 'text-sunrise-iris/60'
                  : isLast
                    ? 'px-2.5 py-1 rounded-md bg-sunrise-iris/20 border border-sunrise-iris/50 text-sunrise-iris font-semibold'
                    : 'px-2.5 py-1 rounded-md bg-cinema-bg/70 border border-cinema-border/80 text-cinema-text'
              )}
            >
              {tok}
            </motion.span>
          );
        })}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 03 · GRAPHIC DESIGNER: Interactive Kinetic Type & Contrast Sculpture       */
/* -------------------------------------------------------------------------- */
const TYPE_PRESETS = [
  { name: 'Editorial', word: 'CLARITY', tracking: '0.02em', font: 'font-serif italic' },
  { name: 'Swiss', word: 'STRUCTURE', tracking: '-0.04em', font: 'font-sans font-black uppercase' },
  { name: 'Mono', word: 'SYSTEM_03', tracking: '0.18em', font: 'font-mono font-bold uppercase' },
] as const;

export function VisualStage({ isReduced }: StageProps) {
  const [presetIdx, setPresetIdx] = useState(0);
  const [inverted, setInverted] = useState(false);

  const preset = TYPE_PRESETS[presetIdx];

  return (
    <div
      className="w-full space-y-3 py-1"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-end gap-2 font-mono text-[10px]">
        {TYPE_PRESETS.map((p, idx) => (
          <button
            key={p.name}
            type="button"
            onClick={() => setPresetIdx(idx)}
            className={cn(
              'px-3 py-1 rounded-full border transition-all cursor-pointer',
              idx === presetIdx
                ? 'border-sunrise-rose bg-sunrise-rose/20 text-sunrise-rose'
                : 'border-cinema-border/80 text-cinema-muted hover:text-cinema-text hover:border-sunrise-rose/40'
            )}
          >
            {p.name}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setInverted((v) => !v)}
          className="px-3 py-1 rounded-full border border-sunrise-rose/40 text-sunrise-rose hover:bg-sunrise-rose/15 transition-colors cursor-pointer"
        >
          {inverted ? 'Noir' : 'Flash'}
        </button>
      </div>

      {/* Live Kinetic Specimen Strip */}
      <motion.div
        key={`${preset.name}-${inverted}`}
        initial={!isReduced ? { opacity: 0.4, scale: 0.97 } : false}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        className={cn(
          'w-full py-4 px-5 rounded-xl flex items-center justify-between transition-colors duration-300',
          inverted
            ? 'bg-sunrise-rose text-cinema-bg'
            : 'bg-sunrise-rose/[0.06] border-r-2 border-sunrise-rose text-cinema-text'
        )}
      >
        <span
          className={cn('text-2xl sm:text-4xl leading-none', preset.font)}
          style={{ letterSpacing: preset.tracking }}
        >
          {preset.word}
        </span>
        <span
          className={cn(
            'font-mono text-[10px] uppercase tracking-[0.2em]',
            inverted ? 'text-cinema-bg/80' : 'text-sunrise-rose'
          )}
        >
          1.618 · TYPE
        </span>
      </motion.div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 04 · AI ENTHUSIAST: Interactive Horizon Constellation & Hypothesis Node    */
/* -------------------------------------------------------------------------- */
const CONSTELLATION_NODES = [
  { id: 'webgpu', label: 'WebGPU', x: 18, y: 28, note: 'Running local neural shaders directly in the browser.' },
  { id: 'agents', label: 'Agentic OS', x: 42, y: 68, note: 'Autonomous tool-using workflows that plan and verify.' },
  { id: 'localllm', label: 'Local LLM', x: 66, y: 26, note: 'Private, zero-latency intelligence on personal silicon.' },
  { id: 'spatial', label: 'Spatial UI', x: 85, y: 64, note: 'Interfaces that respond to depth, physics, and intent.' },
] as const;

export function ExplorerStage({ isReduced }: StageProps) {
  const [activeNodeIdx, setActiveNodeIdx] = useState(0);
  const current = CONSTELLATION_NODES[activeNodeIdx];

  return (
    <div
      className="w-full space-y-3 py-1"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Interactive Constellation Map */}
      <div className="relative w-full h-24 rounded-xl bg-cinema-bg/60 border border-sunrise-ember/25 overflow-hidden">
        {/* Vector Connections */}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full" aria-hidden="true">
          {CONSTELLATION_NODES.slice(0, -1).map((n, i) => {
            const next = CONSTELLATION_NODES[i + 1];
            return (
              <line
                key={`edge-${n.id}`}
                x1={n.x}
                y1={n.y}
                x2={next.x}
                y2={next.y}
                stroke="var(--color-accent-ember)"
                strokeWidth="0.6"
                strokeDasharray="2 2"
                opacity="0.45"
              />
            );
          })}
        </svg>

        {/* Clickable Orbiting Horizon Nodes */}
        {CONSTELLATION_NODES.map((node, idx) => {
          const isActive = idx === activeNodeIdx;
          return (
            <button
              key={node.id}
              type="button"
              onClick={() => setActiveNodeIdx(idx)}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 group cursor-pointer focus:outline-none"
            >
              <span
                className={cn(
                  'w-2.5 h-2.5 rounded-full transition-all',
                  isActive
                    ? 'bg-sunrise-ember scale-125 shadow-[0_0_12px_var(--color-accent-ember)]'
                    : 'bg-cinema-muted/50 group-hover:bg-sunrise-ember/80',
                  isActive && !isReduced && 'animate-pulse'
                )}
              />
              <span
                className={cn(
                  'font-mono text-[10px] uppercase tracking-[0.14em] px-1.5 py-0.5 rounded transition-colors',
                  isActive
                    ? 'text-sunrise-ember bg-sunrise-ember/15'
                    : 'text-cinema-muted group-hover:text-cinema-text'
                )}
              >
                {node.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Live Hypothesis Readout */}
      <div className="flex items-center justify-between gap-3 font-mono text-[11px] pl-3 border-l-2 border-sunrise-ember/60">
        <span className="text-cinema-text">{current.note}</span>
        <span className="text-sunrise-ember shrink-0 text-[10px] uppercase">0{activeNodeIdx + 1}/04</span>
      </div>
    </div>
  );
}
