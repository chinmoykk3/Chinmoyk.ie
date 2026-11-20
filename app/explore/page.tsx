import React from 'react';
import Link from 'next/link';
import { chapters } from '@/content/chapters';
import { projects } from '@/content/projects';
import { designWork, designWorks } from '@/content/designWork';
import { aiWork } from '@/content/aiWork';
import { contactData } from '@/content/contact';
import { timeline } from '@/content/timeline';
import { beyond, hasBeyondContent } from '@/content/beyond';
import { Container } from '@/components/ui/Container';
import { Tag } from '@/components/ui/Tag';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/Card';
import { Content } from '@/components/content/Content';
import { isContentRenderable } from '@/content/schema';
import {
  ArrowRight,
  Layers,
  Cpu,
  Clock,
  Compass,
  Palette,
  Mail,
  ExternalLink,
  MapPin,
  CheckCircle2,
} from 'lucide-react';

export const metadata = {
  title: 'Explore Hub — Chinmoy Kalita',
  description:
    'Non-linear exploration hub across documentary chapters, 10-point engineering projects, design systems, AI research, and contact information.',
  alternates: {
    canonical: '/explore',
  },
};

export default function ExplorePage() {
  const visibleChapters = chapters.visible ? chapters.visible() : chapters;

  return (
    <Container className="py-12 sm:py-16 space-y-16">
      {/* Hub Hero Header */}
      <div className="border-b border-theme-border pb-8">
        <div className="flex items-center gap-2 mb-3">
          <Tag variant="gold" size="sm">
            Non-Linear Hub
          </Tag>
          <Tag variant="default" size="sm">
            Static & Accessible
          </Tag>
        </div>
        <h1 className="text-fluid-h1 font-serif font-black text-theme-text tracking-tight">
          Explore Mode Hub
        </h1>
        <p className="text-theme-muted text-sm sm:text-base max-w-3xl mt-3 leading-relaxed">
          The full portfolio landscape without scroll constraints. Browse movements, inspect
          10-point systems architecture specs, explore design systems, review AI research tracks,
          and connect directly.
        </p>

        {/* Quick Nav Anchors */}
        <div className="mt-8 flex flex-wrap gap-2 text-xs font-mono">
          <a
            href="#explore-chapters"
            className="px-3 py-1.5 rounded-full bg-theme-surface border border-theme-border hover:border-theme-border-strong hover:bg-theme-surface-elevated text-theme-text transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-chapter-accent"
          >
            01. Chapters ({visibleChapters.length})
          </a>
          <a
            href="#explore-projects"
            className="px-3 py-1.5 rounded-full bg-theme-surface border border-theme-border hover:border-theme-border-strong hover:bg-theme-surface-elevated text-theme-text transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-chapter-accent"
          >
            02. Projects ({projects.length})
          </a>
          <a
            href="#explore-design"
            className="px-3 py-1.5 rounded-full bg-theme-surface border border-theme-border hover:border-theme-border-strong hover:bg-theme-surface-elevated text-theme-text transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-chapter-accent"
          >
            03. Design Work ({designWorks.length})
          </a>
          <a
            href="#explore-ai"
            className="px-3 py-1.5 rounded-full bg-theme-surface border border-theme-border hover:border-theme-border-strong hover:bg-theme-surface-elevated text-theme-text transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-chapter-accent"
          >
            04. AI Work (
            {aiWork.completed.length +
              aiWork.experiments.length +
              aiWork.learning.length +
              aiWork.future.length}
            )
          </a>
          <a
            href="#explore-contact"
            className="px-3 py-1.5 rounded-full bg-theme-surface border border-theme-border hover:border-theme-border-strong hover:bg-theme-surface-elevated text-theme-text transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-chapter-accent"
          >
            05. Contact
          </a>
        </div>
      </div>

      {/* 1. CHAPTERS SECTION */}
      <section id="explore-chapters" className="space-y-6 scroll-mt-24">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-theme-border pb-4">
          <div className="flex items-center gap-2.5">
            <Compass className="w-5 h-5 text-theme-gold" />
            <h2 className="text-2xl font-serif font-bold text-theme-text">Documentary Movements</h2>
          </div>
          <span className="text-xs font-mono text-theme-muted">
            {visibleChapters.length} Verified Chapters
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {visibleChapters.map((ch, idx) => {
            const formattedNum =
              typeof ch.number === 'number'
                ? ch.number === 0
                  ? 'Prologue'
                  : `0${ch.number}`
                : ch.number;

            return (
              <Card
                key={ch.id}
                data-accent={ch.accentKey}
                withWash
                className="flex flex-col justify-between p-5"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="font-semibold text-chapter-accent">{formattedNum}</span>
                    <Tag variant="accent" size="sm">
                      {ch.emotionalArc}
                    </Tag>
                  </div>

                  <h3 className="font-serif font-bold text-base text-theme-text mt-1">
                    <Content value={ch.title} />
                  </h3>
                  {ch.subtitle && (
                    <p className="text-xs font-serif italic text-theme-muted mt-0.5">
                      <Content value={ch.subtitle} />
                    </p>
                  )}
                  {ch.bridge && (
                    <p className="text-xs text-theme-muted mt-2 line-clamp-3 leading-relaxed">
                      &ldquo;<Content value={ch.bridge} />&rdquo;
                    </p>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-theme-border flex items-center justify-end">
                  <Link
                    href={`/#${ch.id}`}
                    className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-chapter-accent hover:underline"
                  >
                    Watch In Story &rarr;
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* 2. SEEDED PROJECTS (10-Point Framework) */}
      <section
        id="explore-projects"
        className="space-y-6 pt-12 border-t border-theme-border scroll-mt-24"
      >
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-theme-border pb-4">
          <div className="flex items-center gap-2.5">
            <Layers className="w-5 h-5 text-theme-gold" />
            <h2 className="text-2xl font-serif font-bold text-theme-text">
              Projects (10-Point Engineering Framework)
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/projects"
              className="text-xs font-mono text-theme-azure hover:underline inline-flex items-center gap-1"
            >
              <span>View Full /projects Index</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
            <span className="text-xs font-mono text-theme-muted">
              ({projects.length} System Architectures)
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="flex flex-col justify-between">
              <div>
                <CardHeader>
                  <Tag variant="default" size="sm">
                    {project.category}
                  </Tag>
                  {project.status !== 'unknown' && (
                    <Tag variant="status" size="sm">
                      STATUS: {project.status.toUpperCase()}
                    </Tag>
                  )}
                </CardHeader>

                <CardTitle className="text-xl">
                  <Content value={project.title} />
                </CardTitle>
                <p className="text-xs text-theme-muted italic mt-0.5">
                  <Content value={project.tagline} />
                </p>

                {/* 10-point framework preview: Problem & Idea */}
                <div className="mt-4 space-y-2 text-xs">
                  <div className="p-3 rounded-lg bg-theme-surface-elevated border border-theme-border">
                    <span className="font-semibold text-theme-text font-mono text-[11px] uppercase tracking-wider block mb-1">
                      The Idea
                    </span>
                    <span className="text-theme-muted leading-relaxed">
                      <Content value={project.framework.idea} />
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-theme-surface-elevated border border-theme-border">
                    <span className="font-semibold text-theme-text font-mono text-[11px] uppercase tracking-wider block mb-1">
                      The Problem
                    </span>
                    <span className="text-theme-muted leading-relaxed">
                      <Content value={project.framework.problem} />
                    </span>
                  </div>
                </div>

                {/* Stack Tags */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.framework.stack.map((tech, i) => (
                    <Tag key={i} variant="default" size="sm">
                      <Content value={tech} />
                    </Tag>
                  ))}
                </div>
              </div>

              <CardFooter>
                <div />
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

      {/* 3. DESIGN WORK SECTION */}
      <section
        id="explore-design"
        className="space-y-6 pt-12 border-t border-theme-border scroll-mt-24"
      >
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-theme-border pb-4">
          <div className="flex items-center gap-2.5">
            <Palette className="w-5 h-5 text-theme-rose" />
            <h2 className="text-2xl font-serif font-bold text-theme-text">Design Systems &amp; Work</h2>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/design"
              className="text-xs font-mono font-semibold text-theme-rose hover:underline"
            >
              View Full /design Archive &rarr;
            </Link>
            <span className="text-theme-border font-mono text-xs">|</span>
            <Link
              href="/styleguide"
              className="text-xs font-mono font-semibold text-theme-gold hover:underline"
            >
              Live Styleguide &rarr;
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {designWorks.map((work) => (
            <Card key={work.id} className="flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-3">
                  <Tag variant="rose" size="sm">
                    {work.category}
                  </Tag>
                </div>

                <CardTitle className="text-lg">
                  <Content value={work.title} />
                </CardTitle>
                <CardDescription className="mt-2 text-xs leading-relaxed">
                  <Content value={work.description} />
                </CardDescription>

                {/* Deliverables */}
                <div className="mt-4 space-y-1.5">
                  <div className="text-[11px] font-mono uppercase tracking-widest text-theme-muted">
                    Deliverables
                  </div>
                  <ul className="text-xs text-theme-muted space-y-1">
                    {work.deliverables.map((deliv, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-theme-rose shrink-0 mt-0.5" />
                        <span><Content value={deliv} /></span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tools */}
                <div className="mt-4 flex flex-wrap gap-1">
                  {work.tools.map((tool, i) => (
                    <Tag key={i} variant="default" size="sm">
                      <Content value={tool} />
                    </Tag>
                  ))}
                </div>
              </div>

              <CardFooter>
                <span className="text-[11px] font-mono text-theme-muted ml-auto">
                  Design Artifact
                </span>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* 4. AI SYSTEMS & RESEARCH SECTION */}
      <section
        id="explore-ai"
        className="space-y-6 pt-12 border-t border-theme-border scroll-mt-24"
      >
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-theme-border pb-4">
          <div className="flex items-center gap-2.5">
            <Cpu className="w-5 h-5 text-theme-iris" />
            <h2 className="text-2xl font-serif font-bold text-theme-text">
              AI Work &amp; Research Tracks
            </h2>
          </div>
          <span className="text-xs font-mono text-theme-muted">
            Separated Arrays: Completed / Experiments / Learning / Future
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {(['completed', 'experiments', 'learning', 'future'] as const).map((track) => (
            <Card key={track} className="p-5 flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-mono uppercase tracking-widest text-theme-iris font-semibold mb-3">
                  {track} ({aiWork[track].filter((i) => isContentRenderable(i.title)).length})
                </h3>
                <div className="space-y-3">
                  {aiWork[track]
                    .filter((item) => isContentRenderable(item.title))
                    .map((item) => (
                      <div
                        key={item.id}
                        className="p-3 rounded-lg bg-theme-surface-elevated border border-theme-border text-xs"
                      >
                        <div className="font-semibold text-theme-text">
                          <Content value={item.title} />
                        </div>
                        <div className="text-theme-muted text-[11px] mt-1">
                          <Content value={item.focusArea} />
                        </div>
                        {item.dateOrQuarter && (
                          <div className="text-theme-muted text-[10px] mt-2 font-mono">
                            <Content value={item.dateOrQuarter} />
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 5. CONTACT & COLLABORATION SECTION */}
      <section
        id="explore-contact"
        className="space-y-6 pt-12 border-t border-theme-border scroll-mt-24"
      >
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-theme-border pb-4">
          <div className="flex items-center gap-2.5">
            <Mail className="w-5 h-5 text-theme-gold" />
            <h2 className="text-2xl font-serif font-bold text-theme-text">
              Contact &amp; Collaboration
            </h2>
          </div>
          <Link
            href="/contact"
            className="text-xs font-mono font-semibold text-theme-gold hover:underline"
          >
            Direct Contact Page &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 md:col-span-2 space-y-4">
            <div>
              <Tag variant="gold" size="sm">
                Get In Touch
              </Tag>
              <h3 className="text-xl font-serif font-bold text-theme-text mt-2">
                <Content value={contactData.name} />
              </h3>
              {isContentRenderable(contactData.currentRoleOrStatus) && (
                <p className="text-xs text-theme-muted font-mono mt-0.5">
                  <Content value={contactData.currentRoleOrStatus} />
                </p>
              )}
            </div>

            <p className="text-sm text-theme-muted leading-relaxed">
              <Content value={contactData.bioSnippet} />
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              {isContentRenderable(contactData.location) && (
                <div className="p-3 rounded-lg bg-theme-surface-elevated border border-theme-border flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-theme-gold shrink-0" />
                  <span className="text-theme-muted"><Content value={contactData.location} /></span>
                </div>
              )}
              <div className="p-3 rounded-lg bg-theme-surface-elevated border border-theme-border flex items-center gap-2">
                <Mail className="w-4 h-4 text-theme-gold shrink-0" />
                <a
                  href={`mailto:${contactData.email}`}
                  className="text-theme-text hover:underline truncate"
                >
                  {contactData.email}
                </a>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-theme-surface-elevated border border-theme-border text-xs">
              <span className="font-semibold text-theme-text">Availability: </span>
              <span className="text-theme-muted"><Content value={contactData.availability} /></span>
            </div>
          </Card>

          <Card className="p-6 flex flex-col justify-between space-y-4">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-theme-muted mb-3">
                Verified Socials &amp; Links
              </div>
              <div className="space-y-2">
                {contactData.socials.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-theme-surface-elevated border border-theme-border hover:border-theme-border-strong flex items-center justify-between text-xs transition-colors group"
                  >
                    <div>
                      <span className="font-semibold text-theme-text group-hover:text-theme-gold transition-colors block">
                        {social.platform}
                      </span>
                      <span className="text-[11px] font-mono text-theme-muted">
                        {social.handle}
                      </span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-theme-muted group-hover:text-theme-gold transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            <div className="text-[11px] font-mono text-theme-muted">
              Response SLA: within 24-48 hours.
            </div>
          </Card>
        </div>
      </section>

      {/* Beyond & Future Horizons Section (Hidden if empty) */}
      {hasBeyondContent() && (
        <section className="space-y-6 pt-12 border-t border-theme-border">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-theme-ember" />
            <h2 className="text-2xl font-serif font-bold text-theme-text">
              Beyond the Work: Influences &amp; Craft
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {beyond
              .filter((item) => isContentRenderable(item.title))
              .map((item) => (
                <Card key={item.id} className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <Tag variant="ember" size="sm">
                      {item.category}
                    </Tag>
                  </div>
                  <CardTitle className="text-lg">
                    <Content value={item.title} />
                  </CardTitle>
                  <CardDescription>
                    <Content value={item.description} />
                  </CardDescription>
                  {item.caption && isContentRenderable(item.caption) && (
                    <div className="p-3 rounded-lg bg-theme-surface-elevated border border-theme-border text-xs text-theme-muted">
                      <Content value={item.caption} />
                    </div>
                  )}
                </Card>
              ))}
          </div>
        </section>
      )}

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
                <span><Content value={item.yearOrPeriod} /></span>
                <span className="uppercase">{item.stage}</span>
              </div>
              <h4 className="font-serif font-semibold text-theme-text text-sm">
                <Content value={item.title} />
              </h4>
              <p className="text-theme-muted leading-relaxed">
                <Content value={item.summary} />
              </p>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}
