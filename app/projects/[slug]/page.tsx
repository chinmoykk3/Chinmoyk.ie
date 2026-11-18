import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { projects } from '@/content/projects';
import { Container } from '@/components/ui/Container';
import { Tag } from '@/components/ui/Tag';
import { Card } from '@/components/ui/Card';
import { ArchitectureDiagram } from '@/components/projects/ArchitectureDiagram';
import { ProjectEvidenceSection } from '@/components/projects/ProjectEvidenceSection';
import {
  ArrowLeft,
  AlertTriangle,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Layers,
  Sparkles,
} from 'lucide-react';

export function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: 'Project Not Found — Chinmoy Kalita',
    };
  }

  return {
    title: `${project.title} — 10-Point Engineering Case Study | Chinmoy Kalita`,
    description: project.tagline,
    openGraph: {
      title: `${project.title} — Architecture & Systems Case Study`,
      description: project.tagline,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} — Chinmoy Kalita`,
      description: project.tagline,
    },
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const projectIndex = projects.findIndex((p) => p.slug === slug);

  if (projectIndex === -1) {
    notFound();
  }

  const project = projects[projectIndex];
  const { framework } = project;

  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const nextProject = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  const sections = [
    { id: 'section-idea', num: '01', title: 'The Original Idea', val: framework.idea },
    {
      id: 'section-problem',
      num: '02',
      title: 'Problem Statement & Friction',
      val: framework.problem,
    },
    {
      id: 'section-motivation',
      num: '03',
      title: 'Motivation & Catalyst',
      val: framework.motivation,
    },
    { id: 'section-vision', num: '04', title: 'Aspirational Vision', val: framework.vision },
    {
      id: 'section-contribution',
      num: '05',
      title: 'Chinmoy’s Engineering Contribution',
      val: framework.contribution,
    },
    {
      id: 'section-process',
      num: '06',
      title: 'Engineering & Prototyping Process',
      val: framework.process,
    },
    { id: 'section-architecture', num: '07', title: 'Technologies & Architecture', val: '' },
    {
      id: 'section-challenges',
      num: '08',
      title: 'Challenges & Technical Solutions',
      val: framework.challenges,
    },
    {
      id: 'section-outcomes',
      num: '09',
      title: 'Demonstrable Outcomes & Metrics',
      val: framework.outcomes,
    },
    {
      id: 'section-lessons',
      num: '10',
      title: 'Architectural Lessons Learned',
      val: framework.lessons,
    },
    { id: 'section-evidence', num: '11', title: 'Empirical Evidence & Artifacts', val: '' },
  ];

  return (
    <article className="w-full py-12 sm:py-16">
      <Container size="lg" className="space-y-12">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-theme-border pb-4">
          <Link
            href="/#chapter-03"
            className="inline-flex items-center gap-2 text-xs font-mono text-theme-muted hover:text-theme-azure transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Chapter 03 Reel</span>
          </Link>

          <div className="flex items-center gap-2 text-xs font-mono text-theme-muted">
            <Link href="/explore" className="hover:text-theme-text transition-colors">
              Explore Hub
            </Link>
            <span className="text-theme-border-strong">/</span>
            <span>Case Study</span>
            <span className="text-theme-border-strong">/</span>
            <span className="text-theme-azure font-semibold">{project.title}</span>
          </div>
        </div>

        {/* Project Header */}
        <header className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <Tag variant="azure" size="sm">
              {project.category}
            </Tag>
            <Tag variant="status" size="sm">
              STATUS: {project.status.toUpperCase()}
            </Tag>
            <span className="text-xs font-mono text-theme-muted">{project.year}</span>
          </div>

          <h1 className="text-fluid-h1 font-serif font-black text-theme-text tracking-tight leading-tight">
            {project.title}
          </h1>

          <p className="text-fluid-narration font-serif italic text-theme-muted max-w-3xl leading-relaxed">
            &ldquo;{project.tagline}&rdquo;
          </p>

          {/* Placeholder Banner */}
          {project.isPlaceholder && (
            <div className="p-4 rounded-xl bg-theme-ember/10 border border-theme-ember/30 flex items-start gap-3 text-theme-text text-xs">
              <AlertTriangle className="w-4 h-4 text-theme-ember shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-theme-ember">Integrity Notice: </span>
                In accordance with project rules, all unverified metrics, dates, and client results
                are clearly marked as{' '}
                <code className="bg-theme-surface px-1.5 py-0.5 rounded font-mono text-[11px]">
                  [TODO: ...]
                </code>{' '}
                and stored in <code className="font-mono">/content/projects.ts</code>. No metrics
                are fabricated.
              </div>
            </div>
          )}
        </header>

        {/* Two-Column Grid: Sticky Section Index (3 cols) + 10-Point Framework (9 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sticky Section Index Sidebar */}
          <aside className="lg:col-span-4 sticky top-24 hidden lg:block p-5 rounded-2xl bg-theme-surface border border-theme-border shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-theme-azure font-bold border-b border-theme-border pb-3">
              <Layers className="w-4 h-4" />
              <span>10-Point Index</span>
            </div>

            <nav className="space-y-1 text-xs font-mono">
              {sections.map((sec) => (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-theme-muted hover:text-theme-text hover:bg-theme-surface-elevated transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-azure"
                >
                  <span className="text-[10px] text-theme-azure/70 group-hover:text-theme-azure font-bold">
                    {sec.num}
                  </span>
                  <span className="truncate">{sec.title}</span>
                </a>
              ))}
            </nav>

            <div className="pt-3 border-t border-theme-border text-[10px] font-mono text-theme-muted">
              Click to jump to section
            </div>
          </aside>

          {/* Main Case Study Content Area */}
          <div className="lg:col-span-8 space-y-12">
            {/* Sections 01 - 06 */}
            <div className="space-y-6">
              {sections.slice(0, 6).map((sec) => {
                const isTodo = sec.val.startsWith('[TODO:');

                return (
                  <section
                    key={sec.id}
                    id={sec.id}
                    className="p-6 sm:p-8 rounded-2xl bg-theme-surface border border-theme-border shadow-sm scroll-mt-24 space-y-3"
                  >
                    <div className="flex items-center justify-between border-b border-theme-border pb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono font-bold text-theme-azure">
                          {sec.num}
                        </span>
                        <h2 className="font-serif font-bold text-lg sm:text-xl text-theme-text">
                          {sec.title}
                        </h2>
                      </div>
                      <Tag variant="default" size="sm">
                        POINT {sec.num}
                      </Tag>
                    </div>

                    <div
                      className={
                        isTodo
                          ? 'p-4 rounded-xl bg-theme-ember/10 border border-theme-ember/20 font-mono text-xs text-theme-text leading-relaxed'
                          : 'text-sm text-theme-muted leading-relaxed font-sans'
                      }
                    >
                      {sec.val}
                    </div>
                  </section>
                );
              })}
            </div>

            {/* Section 07: Technology Stack & Self-Drawing Architecture Diagram */}
            <section id="section-architecture" className="space-y-6 scroll-mt-24">
              <Card className="p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between border-b border-theme-border pb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-theme-azure">07</span>
                    <h2 className="font-serif font-bold text-lg sm:text-xl text-theme-text">
                      Technologies & Stack Components
                    </h2>
                  </div>
                  <Tag variant="default" size="sm">
                    POINT 07
                  </Tag>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {framework.stack.map((tech, idx) => (
                    <Tag key={idx} variant="default" size="md">
                      {tech}
                    </Tag>
                  ))}
                </div>
              </Card>

              {/* Self-Drawing Architecture Diagram with [Diagram placeholder] */}
              <ArchitectureDiagram nodes={project.architectureNodes} projectTitle={project.title} />
            </section>

            {/* Sections 08 - 10 */}
            <div className="space-y-6">
              {sections.slice(7, 10).map((sec) => {
                const isTodo = sec.val.startsWith('[TODO:');

                return (
                  <section
                    key={sec.id}
                    id={sec.id}
                    className="p-6 sm:p-8 rounded-2xl bg-theme-surface border border-theme-border shadow-sm scroll-mt-24 space-y-3"
                  >
                    <div className="flex items-center justify-between border-b border-theme-border pb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono font-bold text-theme-azure">
                          {sec.num}
                        </span>
                        <h2 className="font-serif font-bold text-lg sm:text-xl text-theme-text">
                          {sec.title}
                        </h2>
                      </div>
                      <Tag variant="default" size="sm">
                        POINT {sec.num}
                      </Tag>
                    </div>

                    <div
                      className={
                        isTodo
                          ? 'p-4 rounded-xl bg-theme-ember/10 border border-theme-ember/20 font-mono text-xs text-theme-text leading-relaxed'
                          : 'text-sm text-theme-muted leading-relaxed font-sans'
                      }
                    >
                      {sec.val}
                    </div>
                  </section>
                );
              })}
            </div>

            {/* Section 11: Empirical Evidence & Artifacts */}
            <div id="section-evidence" className="scroll-mt-24">
              <ProjectEvidenceSection evidence={project.evidence} projectTitle={project.title} />
            </div>

            {/* Next / Previous Project Navigation */}
            <nav
              aria-label="Previous and Next Case Studies"
              className="pt-12 border-t border-theme-border grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {prevProject ? (
                <Link
                  href={`/projects/${prevProject.slug}`}
                  className="p-5 rounded-2xl bg-theme-surface border border-theme-border hover:border-theme-azure/40 transition-all flex flex-col justify-between group"
                >
                  <span className="text-[10px] font-mono uppercase tracking-widest text-theme-muted flex items-center gap-1">
                    <ChevronLeft className="w-3.5 h-3.5" /> Previous Project
                  </span>
                  <div className="mt-2">
                    <div className="font-serif font-bold text-base text-theme-text group-hover:text-theme-azure transition-colors">
                      {prevProject.title}
                    </div>
                    <div className="text-xs text-theme-muted truncate mt-0.5">
                      {prevProject.tagline}
                    </div>
                  </div>
                </Link>
              ) : (
                <div />
              )}

              {nextProject && (
                <Link
                  href={`/projects/${nextProject.slug}`}
                  className="p-5 rounded-2xl bg-theme-surface border border-theme-border hover:border-theme-azure/40 transition-all flex flex-col justify-between items-end text-right group ml-auto w-full"
                >
                  <span className="text-[10px] font-mono uppercase tracking-widest text-theme-muted flex items-center gap-1">
                    Next Project <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                  <div className="mt-2">
                    <div className="font-serif font-bold text-base text-theme-text group-hover:text-theme-azure transition-colors">
                      {nextProject.title}
                    </div>
                    <div className="text-xs text-theme-muted truncate mt-0.5">
                      {nextProject.tagline}
                    </div>
                  </div>
                </Link>
              )}
            </nav>
          </div>
        </div>
      </Container>
    </article>
  );
}
