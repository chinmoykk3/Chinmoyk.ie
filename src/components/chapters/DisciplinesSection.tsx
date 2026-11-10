'use client';

import { motion } from 'framer-motion';
import { DISCIPLINES } from '@/data/projectData';
import { fadeInUp, staggerContainer } from '@/animations';
import { Layers, Sparkles, Wand2 } from 'lucide-react';

const ICONS = {
  engineering: Layers,
  ai: Sparkles,
  design: Wand2,
};

export function DisciplinesSection() {
  return (
    <section id="disciplines" className="py-28 border-b border-editorial-border relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16 space-y-4 max-w-2xl">
          <div className="text-xs font-mono tracking-widest uppercase text-accent-blue">
            Chapter 01 &bull; The Pillars
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-normal text-foreground">
            A confluence of three distinct craft domains.
          </h2>
          <p className="text-foreground-muted font-light leading-relaxed">
            True digital innovation occurs at the intersections. Rather than operating in silos, each
            discipline reinforces and elevates the others.
          </p>
        </div>

        {/* 3 Disciplines Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {DISCIPLINES.map((discipline, idx) => {
            const Icon = ICONS[discipline.id] || Layers;
            return (
              <motion.div
                key={discipline.id}
                variants={fadeInUp}
                custom={idx * 0.15}
                className="group p-8 rounded-2xl border border-editorial-border bg-editorial-card backdrop-blur-sm hover:border-editorial-border-hover transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-foreground-dim uppercase">
                      Pillar 0{idx + 1}
                    </span>
                    <div className="p-2.5 rounded-lg border border-editorial-border bg-background-subtle text-foreground-muted group-hover:text-accent-blue transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-serif text-foreground group-hover:text-accent-blue transition-colors">
                      {discipline.title}
                    </h3>
                    <p className="text-sm font-medium text-accent-indigo">
                      {discipline.tagline}
                    </p>
                  </div>

                  <p className="text-sm text-foreground-muted leading-relaxed font-light">
                    {discipline.description}
                  </p>
                </div>

                <div className="pt-8 mt-6 border-t border-editorial-border">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-foreground-dim mb-3">
                    Core Arsenal
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {discipline.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded bg-background text-[11px] font-mono text-foreground-muted border border-editorial-border"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
