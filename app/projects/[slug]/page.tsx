import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { projects } from '@/content/projects';
import { ArrowLeft, ExternalLink, GitBranch, AlertTriangle, CheckCircle2 } from 'lucide-react';

export function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const { framework } = project;

  const frameworkPoints = [
    { num: '01', key: 'idea', label: 'The Idea', val: framework.idea },
    { num: '02', key: 'problem', label: 'The Problem Statement', val: framework.problem },
    { num: '03', key: 'motivation', label: 'Motivation & Catalyst', val: framework.motivation },
    { num: '04', key: 'vision', label: 'The Vision & End State', val: framework.vision },
    {
      num: '05',
      key: 'contribution',
      label: 'Chinmoy’s Contribution & Authorship',
      val: framework.contribution,
    },
    { num: '06', key: 'process', label: 'Engineering & Research Process', val: framework.process },
    {
      num: '07',
      key: 'challenges',
      label: 'Roadblocks & Technical Challenges',
      val: framework.challenges,
    },
    { num: '08', key: 'outcomes', label: 'Verifiable Outcomes & Metrics', val: framework.outcomes },
    {
      num: '09',
      key: 'lessons',
      label: 'Takeaways & Architectural Lessons',
      val: framework.lessons,
    },
  ];

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Back button */}
      <div>
        <Link
          href="/explore"
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-amber-300 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Explore Hub
        </Link>
      </div>

      {/* Project Header */}
      <header className="border-b border-canvas-border pb-8 space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 rounded-full text-xs font-mono bg-zinc-800 text-zinc-300">
            {project.category}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-mono uppercase bg-amber-500/10 text-amber-300 border border-amber-500/20">
            Status: {project.status}
          </span>
          <span className="text-xs font-mono text-zinc-400">{project.year}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-serif font-black text-white tracking-tight">
          {project.title}
        </h1>

        <p className="text-base sm:text-lg font-serif italic text-zinc-300">{project.tagline}</p>

        {project.isPlaceholder && (
          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 flex items-start gap-3 text-amber-200 text-xs">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">Placeholder Content Notice: </span>
              In accordance with project integrity rules, unverified details are marked with{' '}
              <code className="bg-amber-900/40 px-1 py-0.5 rounded font-mono">[TODO: ...]</code> and
              await author verification in <code className="font-mono">/content/projects.ts</code>.
            </div>
          </div>
        )}
      </header>

      {/* Stack summary */}
      <section className="p-6 rounded-2xl bg-canvas-surface border border-canvas-border space-y-3">
        <h2 className="text-xs font-mono uppercase tracking-widest text-amber-400">
          Technology Stack
        </h2>
        <div className="flex flex-wrap gap-2">
          {framework.stack.map((item, idx) => (
            <span
              key={idx}
              className="px-3 py-1 rounded-lg bg-canvas-card border border-canvas-border text-xs font-mono text-zinc-200"
            >
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* 10-Point Framework Breakdown */}
      <section className="space-y-8">
        <div className="border-b border-canvas-border pb-3">
          <h2 className="text-2xl font-serif font-bold text-white">
            10-Point Engineering Framework
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Systematic retrospective dissecting problem framing, engineering decisions, and
            outcomes.
          </p>
        </div>

        <div className="space-y-6">
          {frameworkPoints.map((pt) => {
            const isTodo = pt.val.startsWith('[TODO:');

            return (
              <div
                key={pt.key}
                className="p-6 rounded-xl bg-canvas-surface border border-canvas-border space-y-2"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-amber-400 font-bold">{pt.num}</span>
                  <h3 className="font-serif font-bold text-base text-zinc-100">{pt.label}</h3>
                </div>

                <div
                  className={`text-sm leading-relaxed ${
                    isTodo
                      ? 'p-3 rounded-lg bg-amber-950/20 border border-amber-500/20 text-amber-200 font-mono text-xs'
                      : 'text-zinc-300'
                  }`}
                >
                  {pt.val}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Links & Repository */}
      {project.links && (
        <section className="p-6 rounded-2xl bg-canvas-card border border-canvas-border flex flex-wrap gap-4 items-center justify-between text-xs">
          <div className="text-zinc-400 font-mono">Project Repositories & Demos</div>
          <div className="flex gap-4">
            {project.links.github && (
              <span className="font-mono text-zinc-400">GitHub: {project.links.github}</span>
            )}
            {project.links.demo && (
              <span className="font-mono text-zinc-400">Demo: {project.links.demo}</span>
            )}
          </div>
        </section>
      )}
    </article>
  );
}
