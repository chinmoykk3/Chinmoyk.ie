'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, Terminal, Palette, Cpu } from 'lucide-react';
import { SITE_IDENTITY } from '@/data/projectData';
import { fadeInUp, staggerContainer } from '@/animations';

// Dynamic import for WebGL Canvas with fallback
const HeroSculpture = dynamic(
  () => import('./HeroSculpture').then((mod) => mod.HeroSculpture),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-48 h-48 rounded-full border border-editorial-border border-t-accent-blue animate-spin" />
      </div>
    ),
  }
);

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen pt-32 pb-20 flex flex-col justify-center overflow-hidden border-b border-editorial-border"
    >
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Column: Editorial Storytelling & Positioning */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col space-y-8"
        >
          {/* Eyebrow badge */}
          <motion.div variants={fadeInUp} className="inline-flex items-center space-x-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono tracking-wider uppercase border border-accent-indigo/40 bg-accent-indigo/10 text-accent-indigo flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" />
              <span>A Mind in Motion</span>
            </span>
            <span className="text-xs text-foreground-dim font-mono hidden sm:inline">
              [ 26.1445&deg; N, 91.7362&deg; E ]
            </span>
          </motion.div>

          {/* Main Statement / Headline */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-serif font-normal tracking-tight text-foreground leading-[1.08]">
              Three disciplines. <br />
              <span className="italic font-light text-foreground-muted">One creative</span>{' '}
              <span className="bg-gradient-to-r from-accent-blue via-accent-indigo to-accent-amber bg-clip-text text-transparent">
                universe.
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-foreground-muted max-w-xl font-light leading-relaxed">
              Synthesizing rigorous full-stack engineering, computational AI systems, and
              bespoke graphic art direction into cohesive interactive digital landscapes.
            </p>
          </motion.div>

          {/* Discipline Badges */}
          <motion.div variants={fadeInUp} className="flex flex-wrap gap-3 pt-2">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-editorial-border bg-background-subtle/60 text-xs font-medium text-foreground-muted">
              <Terminal className="w-4 h-4 text-accent-blue" />
              <span>Full-Stack Engineering</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-editorial-border bg-background-subtle/60 text-xs font-medium text-foreground-muted">
              <Cpu className="w-4 h-4 text-accent-indigo" />
              <span>AI &amp; Neural Architectures</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-editorial-border bg-background-subtle/60 text-xs font-medium text-foreground-muted">
              <Palette className="w-4 h-4 text-accent-amber" />
              <span>Graphic Art Direction</span>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-4 pt-4">
            <Link
              href="#projects"
              className="px-6 py-3.5 rounded-lg bg-foreground text-background font-medium text-sm hover:bg-white transition-all shadow-lg hover:shadow-accent-blue/10 flex items-center gap-2"
            >
              <span>Explore Selected Works</span>
            </Link>
            <Link
              href="#disciplines"
              className="px-6 py-3.5 rounded-lg border border-editorial-border hover:border-editorial-border-hover bg-background-subtle text-foreground font-medium text-sm transition-all"
            >
              <span>Read Philosophy</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Column: Interactive 3D Sculpture */}
        <div className="lg:col-span-5 h-[420px] sm:h-[520px] lg:h-[620px] w-full relative">
          <div className="absolute inset-0 bg-radial-gradient from-accent-indigo/15 via-transparent to-transparent pointer-events-none rounded-3xl" />
          <HeroSculpture />
          <div className="absolute bottom-4 right-4 text-[10px] font-mono text-foreground-dim uppercase tracking-widest bg-background/80 px-2 py-1 rounded border border-editorial-border backdrop-blur-sm pointer-events-none">
            Interactive WebGL 3D &bull; Mouse Active
          </div>
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <div className="max-w-7xl mx-auto px-6 w-full mt-12 flex items-center justify-between text-xs text-foreground-dim font-mono">
        <span className="tracking-widest uppercase">Editorial Index &bull; Edition 01</span>
        <a
          href="#disciplines"
          aria-label="Scroll down to disciplines"
          className="flex items-center gap-2 hover:text-foreground transition-colors"
        >
          <span>Scroll to inspect</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
