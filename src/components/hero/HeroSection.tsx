'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, Terminal, Palette, Cpu, ArrowUpRight } from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/animations';
import { RevealText } from '@/components/shared/RevealText';
import { MagneticButton } from '@/components/shared/MagneticButton';

// Dynamic import for WebGL Canvas with fallback
const HeroSculpture = dynamic(
  () => import('./HeroSculpture').then((mod) => mod.HeroSculpture),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-36 h-36 rounded-full border border-editorial-border border-t-cobalt animate-spin" />
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
          <motion.div variants={fadeInUp} className="inline-flex items-center space-x-3">
            <span className="px-3 py-1 rounded-full text-2xs font-mono tracking-widest uppercase border border-ochre/30 bg-ochre/10 text-ochre flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" />
              <span>A Mind in Motion</span>
            </span>
            <span className="text-2xs text-paper-dim font-mono hidden sm:inline tracking-widest">
              [ 26.1445&deg; N, 91.7362&deg; E ]
            </span>
          </motion.div>

          {/* Main Statement / Headline with RevealText */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-serif font-normal tracking-tight text-paper leading-[1.04]">
              <RevealText
                text="Three disciplines. One creative universe."
                as="span"
                italicIndices={[2]}
                accentIndices={[4]}
              />
            </h1>
            <motion.p
              variants={fadeInUp}
              className="text-lg sm:text-xl text-paper-muted max-w-xl font-light leading-relaxed pt-2"
            >
              Synthesizing rigorous full-stack engineering, computational AI systems, and
              bespoke graphic art direction into cohesive interactive digital landscapes.
            </motion.p>
          </div>

          {/* Discipline Badges */}
          <motion.div variants={fadeInUp} className="flex flex-wrap gap-2.5 pt-2">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-editorial-sm border border-editorial-border bg-canvas-card text-2xs font-mono text-paper-muted">
              <Terminal className="w-3.5 h-3.5 text-cobalt" />
              <span>Full-Stack Engineering</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-editorial-sm border border-editorial-border bg-canvas-card text-2xs font-mono text-paper-muted">
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              <span>AI &amp; Neural Architectures</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-editorial-sm border border-editorial-border bg-canvas-card text-2xs font-mono text-paper-muted">
              <Palette className="w-3.5 h-3.5 text-ochre" />
              <span>Graphic Art Direction</span>
            </div>
          </motion.div>

          {/* Magnetic CTAs */}
          <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-4 pt-4">
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

        {/* Right Column: Interactive 3D Sculpture */}
        <div className="lg:col-span-5 h-[420px] sm:h-[520px] lg:h-[620px] w-full relative">
          <div className="absolute inset-0 bg-radial-gradient from-cobalt/10 via-transparent to-transparent pointer-events-none rounded-3xl" />
          <HeroSculpture />
          <div className="absolute bottom-4 right-4 text-[10px] font-mono text-paper-dim uppercase tracking-widest bg-canvas/90 px-2.5 py-1 rounded border border-editorial-border backdrop-blur-sm pointer-events-none">
            Interactive WebGL 3D &bull; Mouse Active
          </div>
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <div className="max-w-7xl mx-auto px-6 w-full mt-12 flex items-center justify-between text-2xs text-paper-dim font-mono">
        <span className="tracking-widest uppercase">Editorial Index &bull; Edition 01</span>
        <a
          href="#disciplines"
          aria-label="Scroll down to disciplines"
          className="flex items-center gap-2 hover:text-paper transition-colors group"
        >
          <span>Scroll to inspect</span>
          <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform animate-bounce" />
        </a>
      </div>
    </section>
  );
}
