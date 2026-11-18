import React from 'react';
import Link from 'next/link';
import { projects } from '@/content/projects';
import { aiWork } from '@/content/aiWork';
import { timeline } from '@/content/timeline';
import { beyond } from '@/content/beyond';
import { Container } from '@/components/ui/Container';
import { Tag } from '@/components/ui/Tag';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/Card';
import { ArrowRight, Layers, Cpu, Clock, Compass, AlertCircle } from 'lucide-react';

export const metadata = {
  title: 'Explore Hub — Chinmoy Kalita',
  description: 'Structured index of engineering projects, AI research initiatives, and milestones.',
};

export default function ExplorePage() {
  return (
    <Container className="py-12 sm:py-16 space-y-16">
      {/* Header */}
      <div className="border-b border-theme-border pb-8">
        <Tag variant="gold" size="sm">
          Directory & Framework
        </Tag>
        <h1 className="text-fluid-h1 font-serif font-black text-theme-text mt-3">
          Explore Mode Hub
        </h1>
        <p className="text-theme-muted text-sm sm:text-base max-w-2xl mt-3">
          Deep dive into the 10-point engineering frameworks, systems architecture, AI research
          tracts, beyond horizons, and chronological milestones.
        </p>
      </div>

      {/* Projects Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-theme-gold" />
            <h2 className="text-2xl font-serif font-bold text-theme-text">
              Seeded Projects (10-Point Framework)
            </h2>
          </div>
          <span className="text-xs font-mono text-theme-muted">
            {projects.length} System Architectures
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="flex flex-col justify-between">
              <div>
                <CardHeader>
                  <Tag variant="default" size="sm">
                    {project.category}
                  </Tag>
                  <Tag variant="status" size="sm">
                    STATUS: {project.status}
                  </Tag>
                </CardHeader>

                <CardTitle>{project.title}</CardTitle>
                <p className="text-xs text-theme-muted italic mt-0.5">{project.tagline}</p>

                {/* 10-point framework preview: Problem & Idea */}
                <div className="mt-4 space-y-2 text-xs">
                  <div className="p-3 rounded-lg bg-theme-surface-elevated border border-theme-border">
                    <span className="font-semibold text-theme-text">The Idea: </span>
                    <span className="text-theme-muted">{project.framework.idea}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-theme-surface-elevated border border-theme-border">
                    <span className="font-semibold text-theme-text">The Problem: </span>
                    <span className="text-theme-muted">{project.framework.problem}</span>
                  </div>
                </div>

                {/* Stack Tags */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.framework.stack.map((tech, i) => (
                    <Tag key={i} variant="default" size="sm">
                      {tech}
                    </Tag>
                  ))}
                </div>
              </div>

              <CardFooter>
                {project.isPlaceholder ? (
                  <span className="text-[11px] font-mono text-theme-ember flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Placeholders marked in /content
                  </span>
                ) : (
                  <span />
                )}
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-theme-gold hover:underline ml-auto"
                >
                  Read 10-Point Spec <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Beyond & Future Horizons Section */}
      <section className="space-y-6 pt-12 border-t border-theme-border">
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-theme-azure" />
          <h2 className="text-2xl font-serif font-bold text-theme-text">
            Beyond: Active Investigations & Principles
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {beyond.map((item) => (
            <Card key={item.id} className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <Tag variant="azure" size="sm">
                  {item.category}
                </Tag>
                {item.isPlaceholder && (
                  <span className="text-theme-ember text-[10px]">Placeholder Marked</span>
                )}
              </div>
              <CardTitle className="text-lg">{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
              <div className="p-3 rounded-lg bg-theme-surface-elevated border border-theme-border text-xs text-theme-muted">
                <span className="font-semibold text-theme-text">Investigation: </span>
                {item.currentInvestigation}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* AI Systems & Research Section */}
      <section className="space-y-6 pt-12 border-t border-theme-border">
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-theme-iris" />
          <h2 className="text-2xl font-serif font-bold text-theme-text">
            AI Work & Research Tracks
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {(['completed', 'experiments', 'learning', 'future'] as const).map((track) => (
            <Card key={track} className="p-5">
              <h3 className="text-xs font-mono uppercase tracking-widest text-theme-iris font-semibold mb-3">
                {track} ({aiWork[track].length})
              </h3>
              <div className="space-y-3">
                {aiWork[track].map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-lg bg-theme-surface-elevated border border-theme-border text-xs"
                  >
                    <div className="font-semibold text-theme-text">{item.title}</div>
                    <div className="text-theme-muted text-[11px] mt-1">{item.focusArea}</div>
                    <div className="text-theme-muted text-[10px] mt-2 font-mono">
                      {item.dateOrQuarter}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Timeline Section */}
      <section className="space-y-6 pt-12 border-t border-theme-border">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-theme-gold" />
          <h2 className="text-2xl font-serif font-bold text-theme-text">Chronological Journey</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {timeline.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-theme-surface border border-theme-border text-xs space-y-2"
            >
              <div className="flex items-center justify-between font-mono text-[11px] text-theme-gold">
                <span>{item.yearOrPeriod}</span>
                <span className="uppercase">{item.stage}</span>
              </div>
              <h4 className="font-serif font-semibold text-theme-text text-sm">{item.title}</h4>
              <p className="text-theme-muted leading-relaxed">{item.summary}</p>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}
