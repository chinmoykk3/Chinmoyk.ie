'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Code, Database, Sparkles } from 'lucide-react';
import { FEATURED_PROJECTS } from '@/data/projectData';
import { fadeInUp, staggerContainer } from '@/animations';

const PROJECT_ICONS = {
  sahyog: Code,
  librarium: Database,
  shutterscape: Sparkles,
};

export function ProjectsPreview() {
  return (
    <section id="projects" className="py-28 border-b border-editorial-border relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="text-xs font-mono tracking-widest uppercase text-accent-indigo">
              Chapter 02 &bull; Selected Works
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-normal text-foreground">
              Manifestations of theory into operational code.
            </h2>
          </div>
          <div className="text-xs font-mono text-foreground-dim uppercase">
            3 Systems Documented &bull; 2024–2025
          </div>
        </div>

        {/* Project Cards List */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="space-y-8"
        >
          {FEATURED_PROJECTS.map((project, index) => {
            const Icon = PROJECT_ICONS[project.id as keyof typeof PROJECT_ICONS] || Code;
            return (
              <motion.article
                key={project.id}
                variants={fadeInUp}
                className="group relative p-8 sm:p-10 rounded-2xl border border-editorial-border bg-editorial-card hover:border-editorial-border-hover transition-all duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Number and Title */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-accent-blue uppercase tracking-widest">
                        0{index + 1} // {project.category}
                      </span>
                      <span className="text-xs font-mono text-foreground-dim">&bull; {project.year}</span>
                    </div>

                    <h3 className="text-3xl sm:text-4xl font-serif text-foreground group-hover:text-accent-blue transition-colors flex items-center gap-2">
                      <span>{project.title}</span>
                      <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all text-accent-blue" />
                    </h3>

                    <p className="text-sm font-medium text-foreground-muted">
                      {project.subtitle}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-xs font-mono rounded bg-background-subtle border border-editorial-border text-foreground-dim"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Description & Highlights */}
                  <div className="lg:col-span-7 space-y-6">
                    <p className="text-base text-foreground-muted leading-relaxed font-light">
                      {project.description}
                    </p>

                    <div className="space-y-2.5">
                      <div className="text-xs font-mono uppercase tracking-wider text-foreground-dim">
                        Architectural Milestones
                      </div>
                      <ul className="space-y-2">
                        {project.highlights.map((highlight, hIdx) => (
                          <li
                            key={hIdx}
                            className="text-sm text-foreground-muted flex items-start gap-2.5 font-light"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-accent-blue mt-2 shrink-0" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
