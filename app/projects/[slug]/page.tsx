import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { projects } from '@/content/projects';
import { Container } from '@/components/ui/Container';
import { Tag } from '@/components/ui/Tag';
import { Card } from '@/components/ui/Card';
import { ArrowLeft, AlertTriangle } from 'lucide-react';

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
    <article className="w-full">
      <Container size="md" className="py-12 sm:py-16 space-y-12">
        {/* Back button */}
        <div>
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 text-xs font-mono text-theme-muted hover:text-theme-gold transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Explore Hub
          </Link>
        </div>

        {/* Project Header */}
        <header className="border-b border-theme-border pb-8 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <Tag variant="default" size="sm">
              {project.category}
            </Tag>
            <Tag variant="status" size="sm">
              STATUS: {project.status}
            </Tag>
            <span className="text-xs font-mono text-theme-muted">{project.year}</span>
          </div>

          <h1 className="text-fluid-h1 font-serif font-black text-theme-text tracking-tight">
            {project.title}
          </h1>

          <p className="text-fluid-narration font-serif italic text-theme-muted">
            {project.tagline}
          </p>

          {project.isPlaceholder && (
            <div className="p-4 rounded-xl bg-theme-ember/10 border border-theme-ember/30 flex items-start gap-3 text-theme-text text-xs">
              <AlertTriangle className="w-4 h-4 text-theme-ember shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-theme-ember">Placeholder Notice: </span>
                In accordance with project integrity rules, unverified details are marked with{' '}
                <code className="bg-theme-surface-elevated px-1 py-0.5 rounded font-mono">
                  [TODO: ...]
                </code>{' '}
                and await author verification in{' '}
                <code className="font-mono">/content/projects.ts</code>.
              </div>
            </div>
          )}
        </header>

        {/* Stack summary */}
        <Card className="space-y-3">
          <h2 className="text-xs font-mono uppercase tracking-widest text-theme-gold">
            Technology Stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {framework.stack.map((item, idx) => (
              <Tag key={idx} variant="default" size="md">
                {item}
              </Tag>
            ))}
          </div>
        </Card>

        {/* 10-Point Framework Breakdown */}
        <section className="space-y-8">
          <div className="border-b border-theme-border pb-3">
            <h2 className="text-2xl font-serif font-bold text-theme-text">
              10-Point Engineering Framework
            </h2>
            <p className="text-xs text-theme-muted mt-1">
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
                  className="p-6 rounded-xl bg-theme-surface border border-theme-border space-y-2"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-theme-gold font-bold">{pt.num}</span>
                    <h3 className="font-serif font-bold text-base text-theme-text">{pt.label}</h3>
                  </div>

                  <div
                    className={`text-sm leading-relaxed ${
                      isTodo
                        ? 'p-3 rounded-lg bg-theme-ember/10 border border-theme-ember/20 text-theme-text font-mono text-xs'
                        : 'text-theme-muted'
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
          <div className="p-6 rounded-2xl bg-theme-surface-elevated border border-theme-border flex flex-wrap gap-4 items-center justify-between text-xs">
            <div className="text-theme-muted font-mono">Project Repositories & Demos</div>
            <div className="flex gap-4">
              {project.links.github && (
                <span className="font-mono text-theme-muted">GitHub: {project.links.github}</span>
              )}
              {project.links.demo && (
                <span className="font-mono text-theme-muted">Demo: {project.links.demo}</span>
              )}
            </div>
          </div>
        )}
      </Container>
    </article>
  );
}
