'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Binary,
  Bot,
  Braces,
  Code2,
  Compass,
  Cpu,
  Database,
  Eye,
  Flame,
  GitBranch,
  Globe,
  Layers,
  Lightbulb,
  Network,
  Orbit,
  Palette,
  PenTool,
  Radar,
  Rocket,
  Server,
  Sparkles,
  Terminal,
  Workflow,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface RoleBackdropVibeProps {
  activeStage: number; // -1 = Intro, 0..3 = Roles, 4 = Unified
  isReduced: boolean;
}

interface VibeIcon {
  id: string;
  pos: string;
  anim: string;
  delay: string;
  size?: 'sm' | 'md' | 'lg';
  tag?: string;
  render: () => React.ReactNode;
}

const BUILDER_ICONS: VibeIcon[] = [
  { id: 'b-1', pos: 'top-[10%] left-[5%]', anim: 'animate-ch02-vibe-1', delay: '0s', size: 'lg', tag: 'CLI', render: () => <Terminal className="w-5 h-5" /> },
  { id: 'b-2', pos: 'top-[14%] left-[22%]', anim: 'animate-ch02-vibe-2', delay: '-0.8s', size: 'sm', tag: '200 OK', render: () => <span className="w-1.5 h-1.5 rounded-full bg-sunrise-azure" /> },
  { id: 'b-3', pos: 'top-[12%] right-[24%]', anim: 'animate-ch02-vibe-3', delay: '-1.6s', size: 'md', tag: 'TS', render: () => <Code2 className="w-4 h-4" /> },
  { id: 'b-4', pos: 'top-[16%] right-[6%]', anim: 'animate-ch02-vibe-1', delay: '-2.2s', size: 'lg', tag: 'API', render: () => <Server className="w-5 h-5" /> },
  { id: 'b-5', pos: 'top-[34%] left-[4%]', anim: 'animate-ch02-vibe-2', delay: '-1.1s', size: 'md', render: () => <Braces className="w-5 h-5" /> },
  { id: 'b-6', pos: 'top-[36%] right-[4%]', anim: 'animate-ch02-vibe-3', delay: '-2.9s', size: 'md', tag: 'EDGE', render: () => <Zap className="w-4 h-4" /> },
  { id: 'b-7', pos: 'top-[54%] left-[3%]', anim: 'animate-ch02-vibe-1', delay: '-3.5s', size: 'lg', tag: 'SQL', render: () => <Database className="w-5 h-5" /> },
  { id: 'b-8', pos: 'top-[56%] right-[5%]', anim: 'animate-ch02-vibe-2', delay: '-0.4s', size: 'lg', tag: 'GIT', render: () => <GitBranch className="w-5 h-5" /> },
  { id: 'b-9', pos: 'bottom-[24%] left-[8%]', anim: 'animate-ch02-vibe-3', delay: '-2.0s', size: 'sm', tag: 'POST', render: () => <Terminal className="w-3.5 h-3.5" /> },
  { id: 'b-10', pos: 'bottom-[22%] right-[9%]', anim: 'animate-ch02-vibe-1', delay: '-4.1s', size: 'sm', tag: 'BUILD', render: () => <Braces className="w-3.5 h-3.5" /> },
  { id: 'b-11', pos: 'bottom-[11%] left-[19%]', anim: 'animate-ch02-vibe-2', delay: '-1.4s', size: 'md', tag: 'NEXT', render: () => <Code2 className="w-4 h-4" /> },
  { id: 'b-12', pos: 'bottom-[10%] right-[21%]', anim: 'animate-ch02-vibe-3', delay: '-3.8s', size: 'md', tag: 'DEPLOY', render: () => <Server className="w-4 h-4" /> },
  { id: 'b-13', pos: 'top-[24%] left-[13%]', anim: 'animate-ch02-vibe-3', delay: '-4.7s', size: 'sm', render: () => <Database className="w-4 h-4" /> },
  { id: 'b-14', pos: 'bottom-[34%] right-[12%]', anim: 'animate-ch02-vibe-2', delay: '-2.6s', size: 'sm', render: () => <GitBranch className="w-4 h-4" /> },
];

const AI_ICONS: VibeIcon[] = [
  { id: 'a-1', pos: 'top-[10%] left-[6%]', anim: 'animate-ch02-vibe-2', delay: '0s', size: 'lg', tag: 'LLM', render: () => <Cpu className="w-5 h-5" /> },
  { id: 'a-2', pos: 'top-[15%] left-[24%]', anim: 'animate-ch02-vibe-1', delay: '-1.2s', size: 'sm', tag: '∑ W·X', render: () => <span className="w-1.5 h-1.5 rounded-full bg-sunrise-iris" /> },
  { id: 'a-3', pos: 'top-[12%] right-[25%]', anim: 'animate-ch02-vibe-3', delay: '-2.4s', size: 'md', tag: 'ATTN', render: () => <Sparkles className="w-4 h-4" /> },
  { id: 'a-4', pos: 'top-[15%] right-[6%]', anim: 'animate-ch02-vibe-2', delay: '-0.7s', size: 'lg', tag: 'RAG', render: () => <Network className="w-5 h-5" /> },
  { id: 'a-5', pos: 'top-[33%] left-[4%]', anim: 'animate-ch02-vibe-3', delay: '-3.1s', size: 'md', render: () => <Workflow className="w-5 h-5" /> },
  { id: 'a-6', pos: 'top-[35%] right-[4%]', anim: 'animate-ch02-vibe-1', delay: '-1.9s', size: 'md', tag: '0.96', render: () => <Binary className="w-4 h-4" /> },
  { id: 'a-7', pos: 'top-[54%] left-[4%]', anim: 'animate-ch02-vibe-2', delay: '-4.2s', size: 'lg', tag: 'AGENT', render: () => <Bot className="w-5 h-5" /> },
  { id: 'a-8', pos: 'top-[55%] right-[5%]', anim: 'animate-ch02-vibe-3', delay: '-2.5s', size: 'lg', tag: 'TENSOR', render: () => <Cpu className="w-5 h-5" /> },
  { id: 'a-9', pos: 'bottom-[24%] left-[8%]', anim: 'animate-ch02-vibe-1', delay: '-0.9s', size: 'sm', tag: 'TOKEN', render: () => <Binary className="w-3.5 h-3.5" /> },
  { id: 'a-10', pos: 'bottom-[22%] right-[9%]', anim: 'animate-ch02-vibe-2', delay: '-3.4s', size: 'sm', tag: 'EVAL', render: () => <Zap className="w-3.5 h-3.5" /> },
  { id: 'a-11', pos: 'bottom-[11%] left-[19%]', anim: 'animate-ch02-vibe-3', delay: '-1.8s', size: 'md', tag: 'VECTOR', render: () => <Network className="w-4 h-4" /> },
  { id: 'a-12', pos: 'bottom-[10%] right-[21%]', anim: 'animate-ch02-vibe-1', delay: '-4.5s', size: 'md', tag: 'INFER', render: () => <Sparkles className="w-4 h-4" /> },
  { id: 'a-13', pos: 'top-[24%] left-[13%]', anim: 'animate-ch02-vibe-1', delay: '-2.1s', size: 'sm', render: () => <Bot className="w-4 h-4" /> },
  { id: 'a-14', pos: 'bottom-[34%] right-[12%]', anim: 'animate-ch02-vibe-3', delay: '-3.9s', size: 'sm', render: () => <Workflow className="w-4 h-4" /> },
];

const VISUAL_ICONS: VibeIcon[] = [
  { id: 'v-1', pos: 'top-[10%] left-[6%]', anim: 'animate-ch02-vibe-1', delay: '0s', size: 'lg', tag: 'BEZIER', render: () => <PenTool className="w-5 h-5" /> },
  { id: 'v-2', pos: 'top-[14%] left-[23%]', anim: 'animate-ch02-vibe-3', delay: '-1.5s', size: 'sm', tag: '1.618', render: () => <span className="w-1.5 h-1.5 rounded-full bg-sunrise-rose" /> },
  { id: 'v-3', pos: 'top-[12%] right-[24%]', anim: 'animate-ch02-vibe-2', delay: '-2.6s', size: 'md', tag: 'TYPE', render: () => <span className="font-serif italic text-base leading-none">Aa</span> },
  { id: 'v-4', pos: 'top-[16%] right-[6%]', anim: 'animate-ch02-vibe-1', delay: '-0.8s', size: 'lg', tag: 'COLOR', render: () => <Palette className="w-5 h-5" /> },
  { id: 'v-5', pos: 'top-[33%] left-[4%]', anim: 'animate-ch02-vibe-2', delay: '-3.2s', size: 'md', render: () => <Compass className="w-5 h-5" /> },
  { id: 'v-6', pos: 'top-[36%] right-[4%]', anim: 'animate-ch02-vibe-3', delay: '-1.9s', size: 'md', tag: 'SVG', render: () => <Layers className="w-4 h-4" /> },
  { id: 'v-7', pos: 'top-[54%] left-[4%]', anim: 'animate-ch02-vibe-1', delay: '-4.0s', size: 'lg', tag: 'GRID', render: () => <Layers className="w-5 h-5" /> },
  { id: 'v-8', pos: 'top-[56%] right-[5%]', anim: 'animate-ch02-vibe-2', delay: '-2.3s', size: 'lg', tag: 'FOCUS', render: () => <Eye className="w-5 h-5" /> },
  { id: 'v-9', pos: 'bottom-[24%] left-[8%]', anim: 'animate-ch02-vibe-3', delay: '-1.1s', size: 'sm', tag: 'KERNING', render: () => <PenTool className="w-3.5 h-3.5" /> },
  { id: 'v-10', pos: 'bottom-[22%] right-[9%]', anim: 'animate-ch02-vibe-1', delay: '-3.6s', size: 'sm', tag: 'BRAND', render: () => <Sparkles className="w-3.5 h-3.5" /> },
  { id: 'v-11', pos: 'bottom-[11%] left-[19%]', anim: 'animate-ch02-vibe-2', delay: '-2.0s', size: 'md', tag: 'SERIF', render: () => <span className="font-serif italic text-sm leading-none">Bb</span> },
  { id: 'v-12', pos: 'bottom-[10%] right-[21%]', anim: 'animate-ch02-vibe-3', delay: '-4.4s', size: 'md', tag: 'MOTION', render: () => <Palette className="w-4 h-4" /> },
  { id: 'v-13', pos: 'top-[24%] left-[13%]', anim: 'animate-ch02-vibe-2', delay: '-2.8s', size: 'sm', render: () => <Eye className="w-4 h-4" /> },
  { id: 'v-14', pos: 'bottom-[34%] right-[12%]', anim: 'animate-ch02-vibe-1', delay: '-1.4s', size: 'sm', render: () => <Compass className="w-4 h-4" /> },
];

const EXPLORER_ICONS: VibeIcon[] = [
  { id: 'e-1', pos: 'top-[10%] left-[6%]', anim: 'animate-ch02-vibe-3', delay: '0s', size: 'lg', tag: '0 → 1', render: () => <Rocket className="w-5 h-5" /> },
  { id: 'e-2', pos: 'top-[15%] left-[24%]', anim: 'animate-ch02-vibe-1', delay: '-1.4s', size: 'sm', tag: 'NEXT?', render: () => <span className="w-1.5 h-1.5 rounded-full bg-sunrise-ember" /> },
  { id: 'e-3', pos: 'top-[12%] right-[25%]', anim: 'animate-ch02-vibe-2', delay: '-2.5s', size: 'md', tag: 'WEBGPU', render: () => <Zap className="w-4 h-4" /> },
  { id: 'e-4', pos: 'top-[15%] right-[6%]', anim: 'animate-ch02-vibe-3', delay: '-0.9s', size: 'lg', tag: 'RADAR', render: () => <Radar className="w-5 h-5" /> },
  { id: 'e-5', pos: 'top-[33%] left-[4%]', anim: 'animate-ch02-vibe-1', delay: '-3.3s', size: 'md', render: () => <Globe className="w-5 h-5" /> },
  { id: 'e-6', pos: 'top-[35%] right-[4%]', anim: 'animate-ch02-vibe-2', delay: '-1.7s', size: 'md', tag: 'LAB', render: () => <Lightbulb className="w-4 h-4" /> },
  { id: 'e-7', pos: 'top-[54%] left-[4%]', anim: 'animate-ch02-vibe-3', delay: '-4.1s', size: 'lg', tag: 'ORBIT', render: () => <Orbit className="w-5 h-5" /> },
  { id: 'e-8', pos: 'top-[56%] right-[5%]', anim: 'animate-ch02-vibe-1', delay: '-2.2s', size: 'lg', tag: 'SPARK', render: () => <Flame className="w-5 h-5" /> },
  { id: 'e-9', pos: 'bottom-[24%] left-[8%]', anim: 'animate-ch02-vibe-2', delay: '-1.0s', size: 'sm', tag: 'LOCAL', render: () => <Cpu className="w-3.5 h-3.5" /> },
  { id: 'e-10', pos: 'bottom-[22%] right-[9%]', anim: 'animate-ch02-vibe-3', delay: '-3.7s', size: 'sm', tag: 'FUTURE', render: () => <Rocket className="w-3.5 h-3.5" /> },
  { id: 'e-11', pos: 'bottom-[11%] left-[19%]', anim: 'animate-ch02-vibe-1', delay: '-2.4s', size: 'md', tag: 'SPATIAL', render: () => <Orbit className="w-4 h-4" /> },
  { id: 'e-12', pos: 'bottom-[10%] right-[21%]', anim: 'animate-ch02-vibe-2', delay: '-4.6s', size: 'md', tag: 'IDEA', render: () => <Lightbulb className="w-4 h-4" /> },
  { id: 'e-13', pos: 'top-[24%] left-[13%]', anim: 'animate-ch02-vibe-2', delay: '-2.9s', size: 'sm', render: () => <Flame className="w-4 h-4" /> },
  { id: 'e-14', pos: 'bottom-[34%] right-[12%]', anim: 'animate-ch02-vibe-3', delay: '-1.3s', size: 'sm', render: () => <Radar className="w-4 h-4" /> },
];

const UNIFIED_ICONS: VibeIcon[] = [
  { id: 'u-1', pos: 'top-[13%] left-[9%]', anim: 'animate-ch02-vibe-1', delay: '0s', size: 'lg', tag: 'BUILD', render: () => <Code2 className="w-5 h-5 text-sunrise-azure" /> },
  { id: 'u-2', pos: 'top-[13%] right-[9%]', anim: 'animate-ch02-vibe-2', delay: '-1.2s', size: 'lg', tag: 'THINK', render: () => <Cpu className="w-5 h-5 text-sunrise-iris" /> },
  { id: 'u-3', pos: 'bottom-[16%] left-[9%]', anim: 'animate-ch02-vibe-3', delay: '-2.4s', size: 'lg', tag: 'CRAFT', render: () => <PenTool className="w-5 h-5 text-sunrise-rose" /> },
  { id: 'u-4', pos: 'bottom-[16%] right-[9%]', anim: 'animate-ch02-vibe-1', delay: '-3.6s', size: 'lg', tag: 'EXPLORE', render: () => <Rocket className="w-5 h-5 text-sunrise-ember" /> },
  { id: 'u-5', pos: 'top-[46%] left-[4%]', anim: 'animate-ch02-vibe-2', delay: '-1.8s', size: 'md', render: () => <Terminal className="w-4 h-4 text-sunrise-azure" /> },
  { id: 'u-6', pos: 'top-[46%] right-[4%]', anim: 'animate-ch02-vibe-3', delay: '-2.9s', size: 'md', render: () => <Sparkles className="w-4 h-4 text-cinema-gold" /> },
];

export function RoleBackdropVibe({ activeStage, isReduced }: RoleBackdropVibeProps) {
  if (activeStage < 0) return null;

  const icons =
    activeStage === 0
      ? BUILDER_ICONS
      : activeStage === 1
        ? AI_ICONS
        : activeStage === 2
          ? VISUAL_ICONS
          : activeStage === 3
            ? EXPLORER_ICONS
            : UNIFIED_ICONS;

  const vibeTheme =
    activeStage === 0
      ? 'text-sunrise-azure border-sunrise-azure/30 bg-sunrise-azure/10 shadow-[0_0_24px_rgba(76,141,255,0.2)]'
      : activeStage === 1
        ? 'text-sunrise-iris border-sunrise-iris/30 bg-sunrise-iris/10 shadow-[0_0_24px_rgba(155,123,255,0.2)]'
        : activeStage === 2
          ? 'text-sunrise-rose border-sunrise-rose/30 bg-sunrise-rose/10 shadow-[0_0_24px_rgba(255,92,138,0.2)]'
          : activeStage === 3
            ? 'text-sunrise-ember border-sunrise-ember/30 bg-sunrise-ember/10 shadow-[0_0_24px_rgba(255,138,76,0.2)]'
            : 'text-cinema-gold border-cinema-gold/30 bg-cinema-gold/10 shadow-[0_0_24px_rgba(255,200,87,0.2)]';

  const ringColor =
    activeStage === 0
      ? 'border-sunrise-azure/45'
      : activeStage === 1
        ? 'border-sunrise-iris/45'
        : activeStage === 2
          ? 'border-sunrise-rose/45'
          : activeStage === 3
            ? 'border-sunrise-ember/45'
            : 'border-cinema-gold/45';

  const backdropWord =
    activeStage === 0
      ? 'ARCHITECT'
      : activeStage === 1
        ? 'SYNAPSE'
        : activeStage === 2
          ? 'AESTHETIC'
          : activeStage === 3
            ? 'FRONTIER'
            : 'CONVERGE';

  const wordStrokeColor =
    activeStage === 0
      ? 'var(--color-accent-azure)'
      : activeStage === 1
        ? 'var(--color-accent-iris)'
        : activeStage === 2
          ? 'var(--color-accent-rose)'
          : activeStage === 3
            ? 'var(--color-accent-ember)'
            : 'var(--color-accent-gold)';

  const streakBg =
    activeStage === 0
      ? 'from-transparent via-sunrise-azure/60 to-transparent'
      : activeStage === 1
        ? 'from-transparent via-sunrise-iris/60 to-transparent'
        : activeStage === 2
          ? 'from-transparent via-sunrise-rose/60 to-transparent'
          : activeStage === 3
            ? 'from-transparent via-sunrise-ember/60 to-transparent'
            : 'from-transparent via-cinema-gold/60 to-transparent';

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`vibe-${activeStage}`}
        aria-hidden="true"
        initial={!isReduced ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        exit={!isReduced ? { opacity: 0 } : undefined}
        transition={{ duration: 0.3 }}
        className="pointer-events-none absolute inset-0 z-10 overflow-hidden select-none"
      >
        {/* 0. Giant Kinetic Outlined Backdrop Typography */}
        <motion.div
          initial={!isReduced ? { opacity: 0, scale: 1.08 } : false}
          animate={{ opacity: 0.14, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <span
            className="font-display font-bold uppercase tracking-tight leading-none whitespace-nowrap"
            style={{
              fontFamily: "'Bebas Neue', 'Oswald', 'Impact', sans-serif",
              fontSize: 'clamp(5.5rem, 22vw, 22rem)',
              WebkitTextStroke: `1.5px ${wordStrokeColor}`,
              color: 'transparent',
            }}
          >
            {backdropWord}
          </span>
        </motion.div>

        {/* Shooting Horizontal Data Streaks */}
        {!isReduced && (
          <>
            <div
              className={cn('absolute top-[22%] left-0 w-48 h-px bg-gradient-to-r animate-ch02-streak', streakBg)}
            />
            <div
              className={cn('absolute bottom-[26%] left-0 w-64 h-px bg-gradient-to-r animate-ch02-streak', streakBg)}
              style={{ animationDelay: '-2.2s', animationDuration: '5.5s' }}
            />
          </>
        )}
        {/* 1. Role-Specific Architectural Background Pattern */}
        {activeStage === 0 && (
          <div
            className="absolute inset-0 opacity-[0.09]"
            style={{
              backgroundImage:
                'linear-gradient(to right, var(--color-accent-azure) 1px, transparent 1px), linear-gradient(to bottom, var(--color-accent-azure) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />
        )}

        {activeStage === 1 && (
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <div className="w-[460px] h-[460px] sm:w-[680px] sm:h-[680px] rounded-full border border-dashed border-sunrise-iris/50 animate-ch02-orbit" />
            <div className="absolute w-[320px] h-[320px] sm:w-[500px] sm:h-[500px] rounded-full border border-sunrise-iris/30" />
          </div>
        )}

        {activeStage === 2 && (
          <div className="absolute inset-0 opacity-20">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(-35deg, var(--color-accent-rose) 0px, var(--color-accent-rose) 1px, transparent 1px, transparent 84px)',
                opacity: 0.25,
              }}
            />
          </div>
        )}

        {activeStage === 3 && (
          <div className="absolute inset-0 flex items-center justify-center opacity-25">
            <div className="w-[420px] h-[420px] sm:w-[660px] sm:h-[660px] rounded-full border border-sunrise-ember/30" />
            <div className="absolute w-[620px] h-[620px] sm:w-[920px] sm:h-[920px] rounded-full border border-dashed border-sunrise-ember/20 animate-ch02-radar" />
          </div>
        )}

        {/* 2. Dramatic Arrival Shockwave Ring */}
        {!isReduced && (
          <motion.div
            initial={{ scale: 0.35, opacity: 0.8 }}
            animate={{ scale: 2.3, opacity: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full border-2',
              ringColor
            )}
          />
        )}

        {/* 3. High-Frequency Floating Role-Specific Icons */}
        {icons.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={!isReduced ? { opacity: 0, scale: 0.5 } : false}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.35,
              delay: isReduced ? 0 : idx * 0.025,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={cn('absolute', item.pos, item.size === 'sm' && 'hidden md:block')}
          >
            <div
              className={cn(
                'flex items-center gap-2 rounded-xl border backdrop-blur-sm',
                item.size === 'lg'
                  ? 'px-3.5 py-2.5 opacity-85'
                  : item.size === 'md'
                    ? 'px-2.5 py-2 opacity-70'
                    : 'px-2 py-1.5 opacity-60',
                vibeTheme,
                !isReduced && item.anim
              )}
              style={!isReduced ? { animationDelay: item.delay } : undefined}
            >
              {item.render()}
              {item.tag && (
                <span className="font-mono text-[10px] font-semibold tracking-[0.18em] uppercase leading-none">
                  {item.tag}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
