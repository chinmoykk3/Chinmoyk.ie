'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Terminal, Palette, Cpu, Compass } from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/animations';
import { AnimatedName } from './AnimatedName';
import { RevealText } from '@/components/shared/RevealText';
import { MagneticButton } from '@/components/shared/MagneticButton';

// Dynamic import for WebGL Canvas with high-end fallback
const HeroSculpture = dynamic(
  () => import('./HeroSculpture').then((mod) => mod.HeroSculpture),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="relative flex items-center justify-center">
          <div className="w-36 h-36 rounded-full border border-editorial-border border-t-cobalt animate-spin" />
          <span className="absolute text-2xs font-mono text-paper-dim uppercase tracking-widest">
            3D Engine
          </span>
        </div>
      </div>
    ),
  }
);

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 sm:pt-36 pb-20 flex flex-col justify-center overflow-hidden border-b border-editorial-border"
    >
      {/* Background architectural grid accent lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        {/* Top Editorial Metadata Bar */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap items-center justify-between pb-6 mb-8 border-b border-editorial-border text-2xs font-mono uppercase tracking-[0.2em] text-paper-dim gap-4"
        >
          <div className="flex items-center space-x-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-paper-muted">ARCHIVE // EDITION 2025–2026</span>
            <span className="text-editorial-border">/</span>
            <span>INDIA [ 26.14° N, 91.73° E ]</span>
          </div>

          <div className="flex items-center space-x-3 hidden sm:flex">
            <Compass className="w-3.5 h-3.5 text-ochre" />
            <span>INTERACTIVE PIECE // WEBGL 60FPS</span>
          </div>
        </motion.div>

        {/* Main Grid: Editorial Typography & 3D Artwork */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Dramatic Editorial Typography & Narrative */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col space-y-6 sm:space-y-8 select-text"
          >
            {/* Introductory Headline */}
            <div className="space-y-1">
              <div className="text-xs sm:text-sm font-mono tracking-[0.25em] uppercase text-ochre font-medium flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-ochre" />
                <RevealText
                  text="A CURIOUS MIND. AN ENDLESS CANVAS."
                  as="span"
                  delay={0.1}
                />
              </div>
            </div>

            {/* Oversized Animated Name Typography */}
            <div className="pt-1 pb-2">
              <AnimatedName firstName="CHINMOY" lastName="KALITA" />
            </div>

            {/* Professional Identity Descriptor */}
            <motion.div variants={fadeInUp} className="space-y-3">
              <div className="inline-flex items-center space-x-3 px-3 py-1.5 rounded-editorial-sm bg-canvas-card border border-editorial-border text-2xs font-mono uppercase tracking-[0.18em] text-paper-muted">
                <span className="text-cobalt font-bold">&bull;</span>
                <span>FULL-STACK DEVELOPER / AI ENGINEER / GRAPHIC DESIGNER</span>
              </div>

              {/* Supporting Copy */}
              <p className="text-lg sm:text-xl md:text-2xl font-serif font-light text-paper-muted leading-relaxed max-w-xl">
                I build digital experiences where{' '}
                <span className="text-paper font-normal">engineering</span> meets{' '}
                <span className="italic text-ochre">intelligence</span> and{' '}
                <span className="text-cobalt font-normal">creativity</span>.
              </p>
            </motion.div>

            {/* Disciplines Chips */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-2 pt-1">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-editorial-sm border border-editorial-border bg-canvas-card/60 text-2xs font-mono text-paper-muted">
                <Terminal className="w-3.5 h-3.5 text-cobalt" />
                <span>Next.js &bull; Distributed Systems</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-editorial-sm border border-editorial-border bg-canvas-card/60 text-2xs font-mono text-paper-muted">
                <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                <span>Agentic AI &bull; LLM Workflows</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-editorial-sm border border-editorial-border bg-canvas-card/60 text-2xs font-mono text-paper-muted">
                <Palette className="w-3.5 h-3.5 text-ochre" />
                <span>Three.js &bull; Visual Direction</span>
              </div>
            </motion.div>

            {/* Magnetic CTAs */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center gap-4 pt-4"
            >
              <MagneticButton
                href="#projects"
                variant="primary"
                size="lg"
                icon={<ArrowUpRight className="w-4 h-4" />}
              >
                Explore Selected Works
              </MagneticButton>
              <MagneticButton
                href="#disciplines"
                variant="outline"
                size="lg"
              >
                Read Philosophy
              </MagneticButton>
            </motion.div>
          </motion.div>

          {/* Right Column: Original Interactive 3D Sculpture */}
          <div className="lg:col-span-5 h-[460px] sm:h-[560px] lg:h-[680px] w-full relative flex items-center justify-center">
            {/* Ambient Lighting Gradient Backdrop */}
            <div className="absolute inset-0 bg-radial-gradient from-cobalt/15 via-ochre/5 to-transparent pointer-events-none rounded-full blur-2xl" />

            {/* Interactive Canvas */}
            <div className="w-full h-full relative z-10">
              <HeroSculpture />
            </div>

            {/* Subtle Interactive Instruction Pill */}
            <div className="absolute bottom-3 right-3 text-[10px] font-mono text-paper-dim uppercase tracking-widest bg-canvas/80 backdrop-blur-md px-3 py-1.5 rounded-editorial-sm border border-editorial-border pointer-events-none flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-ochre animate-ping" />
              <span>Click &amp; Drag 3D Sculpture</span>
            </div>
          </div>
        </div>

        {/* Scroll Invitation & Index Indicator */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="mt-16 sm:mt-24 pt-6 border-t border-editorial-border flex items-center justify-between text-2xs font-mono uppercase tracking-[0.2em] text-paper-dim"
        >
          <div className="flex items-center space-x-4">
            <span className="text-paper-muted">CHAPTER 00</span>
            <span className="text-editorial-border">/</span>
            <span>PROLOGUE &bull; THE UNIVERSE</span>
          </div>

          <a
            href="#disciplines"
            aria-label="Scroll down to chapter 01"
            className="flex items-center space-x-2 text-paper-muted hover:text-ochre transition-colors group"
          >
            <span className="tracking-widest">Scroll to explore</span>
            <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform animate-bounce text-ochre" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
