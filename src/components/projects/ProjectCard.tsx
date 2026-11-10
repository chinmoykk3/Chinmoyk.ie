'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Code, Database, Sparkles, CheckCircle2 } from 'lucide-react';
import type { ProjectItem } from '@/types';
import { cardHover, fadeInUp } from '@/animations';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  className?: string;
  onOpenDetails?: (project: ProjectItem) => void;
}

const DISCIPLINE_COLORS = {
  engineering: 'text-cobalt border-cobalt/30 bg-cobalt/10',
  ai: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
  design: 'text-ochre border-ochre/30 bg-ochre/10',
};

const PROJECT_ICONS = {
  sahyog: Code,
  librarium: Database,
  shutterscape: Sparkles,
};

export function ProjectCard({
  project,
  index,
  className,
  onOpenDetails,
}: ProjectCardProps) {
  const Icon = PROJECT_ICONS[project.id as keyof typeof PROJECT_ICONS] || Code;

  return (
    <motion.article
      variants={fadeInUp}
      custom={index * 0.12}
      whileHover="hover"
      initial="initial"
      className={cn(
        'group relative rounded-editorial-xl border border-editorial-border bg-canvas-card/80 backdrop-blur-md p-8 sm:p-10 transition-all duration-500 hover:border-editorial-border-hover overflow-hidden shadow-editorial-sm hover:shadow-editorial-md',
        className
      )}
      data-cursor="view"
    >
      {/* Background radial highlight */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-radial-gradient from-cobalt/5 via-transparent to-transparent pointer-events-none -mr-20 -mt-20 group-hover:from-cobalt/10 transition-all duration-700" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Number, Title, Discipline chips */}
        <div className="lg:col-span-5 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 text-2xs font-mono tracking-widest uppercase">
              <span className="text-ochre font-bold">PROJECT // 0{index + 1}</span>
              <span className="text-paper-dim">&bull;</span>
              <span className="text-paper-dim">{project.year}</span>
            </div>
            <div className="p-2 rounded-editorial-sm border border-editorial-border bg-canvas-subtle text-paper-muted group-hover:text-cobalt transition-colors">
              <Icon className="w-4 h-4" />
            </div>
          </div>

          <div className="space-y-1.5">
            <h3 className="text-3xl sm:text-4xl font-serif text-paper group-hover:text-white transition-colors flex items-center justify-between">
              <span>{project.title}</span>
              <span className="inline-flex p-1.5 rounded-full border border-editorial-border bg-canvas-subtle group-hover:border-cobalt group-hover:bg-cobalt group-hover:text-white text-paper-muted transition-all duration-300">
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </h3>
            <p className="text-sm font-medium text-ochre/90 tracking-wide">
              {project.subtitle}
            </p>
          </div>

          {/* Discipline Badges */}
          <div className="flex flex-wrap gap-2 pt-1">
            {project.disciplines.map((d) => (
              <span
                key={d}
                className={cn(
                  'px-2.5 py-1 text-2xs font-mono uppercase tracking-wider rounded-editorial-sm border',
                  DISCIPLINE_COLORS[d]
                )}
              >
                {d}
              </span>
            ))}
          </div>

          {/* Technologies */}
          <div className="pt-2">
            <div className="text-2xs font-mono uppercase tracking-wider text-paper-dim mb-2">
              System Tech
            </div>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 text-2xs font-mono rounded bg-canvas-subtle border border-editorial-border text-paper-muted"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Editorial Description & Architectural Highlights */}
        <div className="lg:col-span-7 space-y-6 lg:border-l lg:border-editorial-border lg:pl-8">
          <p className="text-base text-paper-muted leading-relaxed font-light">
            {project.description}
          </p>

          <div className="space-y-3 pt-2">
            <div className="text-2xs font-mono uppercase tracking-widest text-paper-dim">
              Key Engineering Milestones
            </div>
            <ul className="space-y-2.5">
              {project.highlights.map((highlight, hIdx) => (
                <li
                  key={hIdx}
                  className="text-sm text-paper-muted/90 flex items-start gap-3 font-light"
                >
                  <CheckCircle2 className="w-4 h-4 text-cobalt shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {onOpenDetails && (
            <div className="pt-4">
              <button
                type="button"
                onClick={() => onOpenDetails(project)}
                className="text-xs font-mono text-paper hover:text-ochre uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Read Full Case Study</span>
                <span className="text-paper-dim">&rarr;</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}
