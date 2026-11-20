'use client';

import React from 'react';
import Link from 'next/link';
import { Chapter } from '@/content/chapters';
import { contactData } from '@/content/contact';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Tag } from '@/components/ui/Tag';
import { Button } from '@/components/ui/Button';
import { Content } from '@/components/content/Content';
import { isContentRenderable } from '@/content/schema';
import { ContactForm } from '@/components/ui/ContactForm';
import {
  Mail,
  MapPin,
  Sparkles,
  Rocket,
  Code,
  Users2,
  Target,
  RotateCcw,
  Compass,
  ExternalLink,
} from 'lucide-react';

export interface EpilogueSectionProps {
  chapter: Chapter;
}

export function EpilogueSection({ chapter }: EpilogueSectionProps) {
  const replayStory = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.pushState(null, '', '#');
    }
  };

  const renderableTech = contactData.technologiesToExplore.filter((t) => isContentRenderable(t));
  const renderableCollab = contactData.collaborationOpportunities.filter((c) =>
    isContentRenderable(c)
  );

  const hasAnyHorizons =
    isContentRenderable(contactData.whatIWantToBecome) ||
    isContentRenderable(contactData.whatIWantToBuild) ||
    isContentRenderable(contactData.ambitions) ||
    renderableTech.length > 0 ||
    renderableCollab.length > 0;

  return (
    <article
      id={chapter.id}
      data-chapter="epilogue"
      data-accent="sunrise"
      aria-labelledby="epilogue-heading"
      className="relative w-full border-t border-theme-border/60 transition-colors duration-300 min-h-screen"
    >
      {/* Ambient Wash with sunrise gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-chapter-wash"
      />

      <div className="relative z-10 w-full py-20 lg:py-28 flex flex-col justify-between">
        {/* Top Movement Metadata (Rule 2: One label only) */}
        <Container size="lg" className="w-full mb-12">
          <div className="flex items-center justify-between border-b border-theme-border/60 pb-4 flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-widest text-chapter-accent font-medium">
                EPILOGUE
              </span>
              <span className="text-theme-muted/40 font-mono text-xs" aria-hidden="true">
                ·
              </span>
              <span className="font-mono text-xs uppercase tracking-widest text-theme-muted">
                <Content value={chapter.title} />
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Tag variant="gold" size="sm">
                Sunrise
              </Tag>
            </div>
          </div>

          <div className="mt-8">
            <h2
              id="epilogue-heading"
              className="text-fluid-h1 font-serif font-normal tracking-tight text-theme-text leading-[1.08]"
            >
              <Content value={chapter.title} />
            </h2>
            {chapter.subtitle && (
              <p className="text-fluid-narration font-serif italic text-theme-muted mt-3 max-w-[32ch] leading-[1.35]">
                <Content value={chapter.subtitle} />
              </p>
            )}
          </div>
        </Container>

        {/* Central Narration Statement */}
        <Container size="md" className="w-full text-center space-y-6 my-10">
          {chapter.narration[0] && (
            <blockquote className="text-fluid-narration sm:text-2xl font-serif italic text-theme-text leading-[1.35] max-w-2xl mx-auto">
              &ldquo;<Content value={chapter.narration[0]} />&rdquo;
            </blockquote>
          )}

          {/* Unfinished Thread: stops mid-line in gold with softly blinking cursor */}
          <div
            aria-label="The ThreadSpine ends unfinished: a gold line stopping mid-way with a softly blinking cursor"
            className="pt-10 pb-6 flex flex-col items-center justify-center select-none"
          >
            <div className="w-[2px] h-20 bg-theme-gold/80 rounded-t-full" />
            <div className="flex items-center gap-2 mt-1">
              <span
                className="w-2.5 h-4 bg-theme-gold rounded-sm animate-pulse"
                style={{ filter: 'drop-shadow(0 0 8px var(--color-gold))' }}
              />
            </div>
            <span className="text-[11px] font-mono text-theme-gold/70 tracking-widest uppercase mt-3">
              The line continues into the future
            </span>
          </div>
        </Container>

        {/* Aspirations & Horizons (Rendered only when content is confirmed/draft, hidden when empty) */}
        {hasAnyHorizons && (
          <Container size="lg" className="w-full my-12 space-y-8">
            <div className="flex items-center justify-between border-b border-theme-border pb-3 flex-wrap gap-2">
              <h3 className="font-serif font-bold text-xl text-theme-text">
                Horizons &amp; Active Convictions
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isContentRenderable(contactData.whatIWantToBecome) && (
                <Card className="p-6 space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-theme-gold font-semibold uppercase tracking-wider mb-2">
                      <Target className="w-4 h-4" />
                      <span>What I Want to Become</span>
                    </div>
                    <p className="text-xs text-theme-text leading-relaxed font-sans">
                      <Content value={contactData.whatIWantToBecome} />
                    </p>
                  </div>
                </Card>
              )}

              {isContentRenderable(contactData.whatIWantToBuild) && (
                <Card className="p-6 space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-theme-azure font-semibold uppercase tracking-wider mb-2">
                      <Rocket className="w-4 h-4" />
                      <span>What I Want to Build</span>
                    </div>
                    <p className="text-xs text-theme-text leading-relaxed font-sans">
                      <Content value={contactData.whatIWantToBuild} />
                    </p>
                  </div>
                </Card>
              )}

              {isContentRenderable(contactData.ambitions) && (
                <Card className="p-6 space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-theme-rose font-semibold uppercase tracking-wider mb-2">
                      <Sparkles className="w-4 h-4" />
                      <span>Core Ambition</span>
                    </div>
                    <p className="text-xs text-theme-text leading-relaxed font-sans">
                      <Content value={contactData.ambitions} />
                    </p>
                  </div>
                </Card>
              )}

              {renderableTech.length > 0 && (
                <Card className="p-6 space-y-3 md:col-span-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-theme-iris font-semibold uppercase tracking-wider mb-2">
                    <Code className="w-4 h-4" />
                    <span>Technologies to Explore</span>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {renderableTech.map((tech, i) => (
                      <Tag key={i} variant="default" size="sm">
                        <Content value={tech} />
                      </Tag>
                    ))}
                  </div>
                </Card>
              )}

              {renderableCollab.length > 0 && (
                <Card className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-theme-ember font-semibold uppercase tracking-wider mb-2">
                    <Users2 className="w-4 h-4" />
                    <span>Collaboration Opportunities</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-theme-muted">
                    {renderableCollab.map((collab, i) => (
                      <li key={i} className="flex items-start gap-1.5 leading-snug">
                        <span className="text-theme-ember select-none">&bull;</span>
                        <span>
                          <Content value={collab} />
                        </span>
                      </li>
                    ))}
                  </ul>
                </Card>
              )}
            </div>
          </Container>
        )}

        {/* Contact Experience */}
        <Container size="lg" className="w-full my-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column (5 cols): Direct Channels & Availability */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-theme-gold font-semibold block mb-1">
                  Direct Ingress
                </span>
                <h3 className="font-serif font-bold text-2xl text-theme-text">
                  Initiate a Dialogue
                </h3>
                <p className="text-xs text-theme-muted mt-2 leading-relaxed font-sans">
                  <Content value={contactData.availability} />
                </p>
              </div>

              {/* Direct Details */}
              <div className="p-4 rounded-xl bg-theme-surface border border-theme-border space-y-3 text-xs">
                {isContentRenderable(contactData.location) && (
                  <div className="flex items-center gap-2 text-theme-muted">
                    <MapPin className="w-4 h-4 text-theme-gold shrink-0" />
                    <span>
                      <Content value={contactData.location} />
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-theme-muted">
                  <Mail className="w-4 h-4 text-theme-gold shrink-0" />
                  <a
                    href={`mailto:${contactData.email}`}
                    className="text-theme-text hover:underline truncate font-mono font-medium"
                  >
                    {contactData.email}
                  </a>
                </div>
              </div>

              {/* Verified Social Channels */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono text-theme-muted uppercase tracking-wider block">
                  Network Anchors
                </span>
                <div className="flex flex-wrap gap-2">
                  {contactData.socials.map((s) => (
                    <a
                      key={s.platform}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg border border-theme-border bg-theme-surface hover:bg-theme-surface-elevated text-xs font-mono text-theme-text transition-colors flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-gold"
                    >
                      <span>{s.platform}</span>
                      <ExternalLink className="w-3 h-3 text-theme-muted" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column (7 cols): Accessible Contact Form */}
            <div className="lg:col-span-7">
              <Card className="p-6 sm:p-8 border-theme-border bg-theme-surface shadow-xl">
                <ContactForm />
              </Card>
            </div>
          </div>
        </Container>

        {/* Narrative Bridge & Replay / Explore Navigation Actions */}
        <Container size="lg" className="w-full pt-16 pb-8 space-y-8">
          <p className="text-sm sm:text-base font-serif italic text-theme-muted text-center sm:text-left">
            &ldquo;<Content value={chapter.bridge} />&rdquo;
          </p>

          {/* Action Bar: Replay the Story & Back to Explore Mode */}
          <div className="pt-6 border-t border-theme-border/60 flex flex-wrap items-center justify-between gap-4">
            <button
              type="button"
              onClick={replayStory}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-theme-border bg-theme-surface hover:bg-theme-surface-elevated hover:border-theme-gold/50 text-xs font-mono text-theme-text transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-gold shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5 text-theme-gold" />
              <span>Replay the story</span>
            </button>

            <Link
              href="/explore"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-theme-border bg-theme-surface hover:bg-theme-surface-elevated hover:border-theme-azure/50 text-xs font-mono text-theme-text transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-azure shadow-sm"
            >
              <Compass className="w-3.5 h-3.5 text-theme-azure" />
              <span>Back to Explore Mode &rarr;</span>
            </Link>
          </div>
        </Container>
      </div>
    </article>
  );
}
