import React from 'react';
import Link from 'next/link';
import { projects } from '@/content/projects';
import { aiWork } from '@/content/aiWork';
import { timeline } from '@/content/timeline';
import { ArrowRight, Layers, Cpu, Clock, AlertCircle } from 'lucide-react';

export const metadata = {
  title: 'Explore Hub — Chinmoy Kalita',
  description: 'Structured index of engineering projects, AI research initiatives, and milestones.',
};

export default function ExplorePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Header */}
      <div className="border-b border-canvas-border pb-8">
        <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
          Directory & Framework
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-black text-white mt-2">
          Explore Mode Hub
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mt-3">
          Deep dive into the 10-point engineering frameworks, systems architecture, AI research
          tracts, and chronological milestones.
        </p>
      </div>

      {/* Projects Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-400" />
            <h2 className="text-2xl font-serif font-bold text-white">
              Seeded Projects (10-Point Framework)
            </h2>
          </div>
          <span className="text-xs font-mono text-zinc-400">
            {projects.length} System Architectures
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <article
              key={project.id}
              className="p-6 rounded-2xl bg-canvas-surface border border-canvas-border hover:border-amber-400/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-300">
                    {project.category}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 uppercase text-[10px]">
                    Status: {project.status}
                  </span>
                </div>

                <h3 className="text-xl font-serif font-bold text-white">{project.title}</h3>
                <p className="text-xs text-zinc-400 italic mt-0.5">{project.tagline}</p>

                {/* 10-point framework preview: Problem & Idea */}
                <div className="mt-4 space-y-2 text-xs">
                  <div className="p-3 rounded-lg bg-canvas-card border border-canvas-border">
                    <span className="font-semibold text-zinc-200">The Idea: </span>
                    <span className="text-zinc-400">{project.framework.idea}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-canvas-card border border-canvas-border">
                    <span className="font-semibold text-zinc-200">The Problem: </span>
                    <span className="text-zinc-400">{project.framework.problem}</span>
                  </div>
                </div>

                {/* Stack Tags */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.framework.stack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-zinc-800/80 text-[11px] font-mono text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-canvas-border flex items-center justify-between">
                {project.isPlaceholder && (
                  <span className="text-[11px] font-mono text-amber-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    Placeholders marked in /content
                  </span>
                )}
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-300 hover:text-amber-200 ml-auto"
                >
                  Read 10-Point Spec <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* AI Systems & Research Section */}
      <section className="space-y-6 pt-12 border-t border-canvas-border">
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-indigo-400" />
          <h2 className="text-2xl font-serif font-bold text-white">AI Work & Research Tracks</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {(['completed', 'experiments', 'learning', 'future'] as const).map((track) => (
            <div
              key={track}
              className="p-5 rounded-xl bg-canvas-surface border border-canvas-border"
            >
              <h3 className="text-sm font-mono uppercase tracking-widest text-indigo-300 font-semibold mb-3">
                {track} ({aiWork[track].length})
              </h3>
              <div className="space-y-3">
                {aiWork[track].map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-lg bg-canvas-card border border-canvas-border text-xs"
                  >
                    <div className="font-semibold text-zinc-200">{item.title}</div>
                    <div className="text-zinc-400 text-[11px] mt-1">{item.focusArea}</div>
                    <div className="text-zinc-400 text-[10px] mt-2 font-mono">
                      {item.dateOrQuarter}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline Section */}
      <section className="space-y-6 pt-12 border-t border-canvas-border">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-amber-400" />
          <h2 className="text-2xl font-serif font-bold text-white">Chronological Journey</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {timeline.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-canvas-surface border border-canvas-border text-xs space-y-2"
            >
              <div className="flex items-center justify-between font-mono text-[11px] text-amber-400">
                <span>{item.yearOrPeriod}</span>
                <span className="uppercase">{item.stage}</span>
              </div>
              <h4 className="font-serif font-semibold text-zinc-200 text-sm">{item.title}</h4>
              <p className="text-zinc-400 leading-relaxed">{item.summary}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
