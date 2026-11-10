'use client';

import { motion } from 'framer-motion';
import { DISCIPLINES } from '@/data/projectData';
import { fadeInUp, staggerContainer } from '@/animations';
import { Layers, Sparkles, Wand2 } from 'lucide-react';
import { SectionHeading } from '@/components/shared/SectionHeading';

const ICONS = {
  engineering: Layers,
  ai: Sparkles,
  design: Wand2,
};

const ACCENT_COLORS = {
  engineering: 'text-cobalt border-cobalt/30 bg-cobalt/10',
  ai: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
  design: 'text-ochre border-ochre/30 bg-ochre/10',
};

export function DisciplinesSection() {
  return (
    <section id="disciplines" className="py-28 border-b border-editorial-border relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Editorial Section Heading */}
        <SectionHeading
          chapterNumber="01"
          chapterTitle="The Pillars"
          metadata="Core Disciplines"
          title="A confluence of three distinct"
          italicWord="craft domains."
          description="True digital innovation occurs at the intersections. Rather than operating in isolated silos, each discipline reinforces, stress-tests, and elevates the others."
          accent="cobalt"
        />

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
                className="group p-8 sm:p-9 rounded-editorial-xl border border-editorial-border bg-canvas-card/75 backdrop-blur-md hover:border-editorial-border-hover transition-all duration-500 flex flex-col justify-between shadow-editorial-sm hover:shadow-editorial-md"
                data-cursor="view"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-2xs font-mono text-paper-dim uppercase tracking-widest">
                      PILLAR // 0{idx + 1}
                    </span>
                    <div className="p-2.5 rounded-editorial-sm border border-editorial-border bg-canvas-subtle text-paper-muted group-hover:text-cobalt transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl sm:text-3xl font-serif text-paper group-hover:text-white transition-colors">
                      {discipline.title}
                    </h3>
                    <p className="text-xs font-mono text-ochre tracking-wider uppercase">
                      {discipline.tagline}
                    </p>
                  </div>

                  <p className="text-sm text-paper-muted leading-relaxed font-light">
                    {discipline.description}
                  </p>
                </div>

                <div className="pt-8 mt-6 border-t border-editorial-border">
                  <div className="text-2xs font-mono uppercase tracking-widest text-paper-dim mb-3">
                    Technical Arsenal
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {discipline.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded bg-canvas-subtle text-2xs font-mono text-paper-muted border border-editorial-border"
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
