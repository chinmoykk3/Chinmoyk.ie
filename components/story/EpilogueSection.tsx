'use client';

import React from 'react';
import Link from 'next/link';
import { Chapter } from '@/content/chapters';
import { contactData } from '@/content/contact';
import { ChapterLabel } from '@/components/ui/ChapterLabel';
import { Container } from '@/components/ui/Container';
import { Tag } from '@/components/ui/Tag';
import { Card } from '@/components/ui/Card';
import { ContactForm } from '@/components/ui/ContactForm';
import { Button } from '@/components/ui/Button';
import {
  Sparkles,
  RotateCcw,
  Compass,
  Mail,
  MapPin,
  ExternalLink,
  Target,
  Rocket,
  Code,
  Users2,
  HelpCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface EpilogueSectionProps {
  chapter: Chapter;
}

export function EpilogueSection({ chapter }: EpilogueSectionProps) {
  const handleReplay = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('ck_intro_viewed');
      window.dispatchEvent(new Event('ck_replay_intro'));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section
      id={chapter.id}
      data-chapter="epilogue"
      data-accent="sunrise"
      aria-labelledby="epilogue-heading"
      className="relative w-full border-t border-theme-border transition-colors duration-300"
    >
      {/* ===================================================================
          SUNRISE HORIZON GRADIENT:
          azure -> iris -> rose -> ember -> gold rising from pure black bottom
          (Dark mode: zero navy/indigo tint, true neutral black horizon)
          =================================================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-90 bg-[linear-gradient(to_top,var(--color-bg)_0%,rgba(251,191,36,0.12)_25%,rgba(251,146,60,0.09)_45%,rgba(251,113,133,0.07)_65%,rgba(167,139,250,0.05)_85%,rgba(56,189,248,0.03)_100%)]"
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
                {chapter.title}
              </span>
            </div>
          </div>

          <div className="mt-6">
            <h2
              id="epilogue-heading"
              className="text-fluid-h1 font-serif font-normal tracking-tight text-theme-text leading-[1.08]"
            >
              {chapter.title}
            </h2>
            {chapter.subtitle && (
              <p className="text-fluid-narration font-serif italic text-theme-muted mt-2 max-w-[32ch] leading-[1.35]">
                {chapter.subtitle}
              </p>
            )}
          </div>
        </Container>

        {/* Central Narration Statement */}
        <Container size="md" className="w-full text-center space-y-6 my-8">
          <blockquote className="text-fluid-narration sm:text-2xl font-serif italic text-theme-text leading-[1.35] max-w-2xl mx-auto">
            &ldquo;I don&apos;t know exactly where this journey will lead me. And perhaps
            that&apos;s what makes it interesting. There are still ideas to explore, problems to
            solve and things to create.&rdquo;
          </blockquote>

          <p className="text-xs sm:text-sm text-theme-muted font-sans leading-relaxed max-w-xl mx-auto">
            A documentary portfolio is never an obituary of finished accomplishments. It is a living
            reflection of trajectory, curiosity, and the unfinished craft ahead.
          </p>

          {/* =================================================================
              UNFINISHED THREADSPINE: Stops mid-line in gold with blinking cursor
              ================================================================= */}
          <div
            aria-label="The ThreadSpine ends unfinished: a gold line stopping mid-way with a softly blinking cursor"
            className="pt-8 pb-4 flex flex-col items-center justify-center select-none"
          >
            {/* Upper vertical line coming down */}
            <div className="w-[2px] h-16 bg-theme-gold/80 rounded-t-full" />

            {/* Abrupt terminus with blinking gold cursor block */}
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-4 bg-theme-gold rounded-sm animate-pulse shadow-[0_0_12px_var(--color-gold)]" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-theme-gold font-semibold">
                [THREAD UNFINISHED · ACTIVELY BEING WRITTEN]
              </span>
            </div>
          </div>
        </Container>

        {/* ===================================================================
            CONTENT BLOCKS FROM /content/contact.ts (Aspirations & Future)
            =================================================================== */}
        <Container size="lg" className="w-full my-12 space-y-8">
          <div className="flex items-center justify-between border-b border-theme-border pb-3 flex-wrap gap-2">
            <h3 className="font-serif font-bold text-xl text-theme-text">
              Horizons & Active Convictions
            </h3>
            <span className="text-xs font-mono text-theme-muted">
              Structured Aspirations from /content/contact.ts
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Block 1: What I Want to Become */}
            <Card className="p-6 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-theme-gold font-semibold uppercase tracking-wider mb-2">
                  <Target className="w-4 h-4" />
                  <span>What I Want to Become</span>
                </div>
                <p className="text-xs text-theme-text leading-relaxed font-sans">
                  {contactData.whatIWantToBecome}
                </p>
              </div>
              <div className="text-[10px] font-mono text-theme-ember flex items-center gap-1">
                <HelpCircle className="w-3 h-3" />
                <span>[Placeholder: Chinmoy to supply]</span>
              </div>
            </Card>

            {/* Block 2: What I Want to Build */}
            <Card className="p-6 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-theme-azure font-semibold uppercase tracking-wider mb-2">
                  <Rocket className="w-4 h-4" />
                  <span>What I Want to Build</span>
                </div>
                <p className="text-xs text-theme-text leading-relaxed font-sans">
                  {contactData.whatIWantToBuild}
                </p>
              </div>
              <div className="text-[10px] font-mono text-theme-ember flex items-center gap-1">
                <HelpCircle className="w-3 h-3" />
                <span>[Placeholder: Chinmoy to supply]</span>
              </div>
            </Card>

            {/* Block 3: Ambitions */}
            <Card className="p-6 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-theme-rose font-semibold uppercase tracking-wider mb-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Core Ambition</span>
                </div>
                <p className="text-xs text-theme-text leading-relaxed font-sans">
                  {contactData.ambitions}
                </p>
              </div>
              <div className="text-[10px] font-mono text-theme-ember flex items-center gap-1">
                <HelpCircle className="w-3 h-3" />
                <span>[Placeholder: Chinmoy to supply]</span>
              </div>
            </Card>

            {/* Block 4: Technologies to Explore */}
            <Card className="p-6 space-y-3 md:col-span-2 lg:col-span-2">
              <div className="flex items-center gap-2 text-xs font-mono text-theme-iris font-semibold uppercase tracking-wider mb-2">
                <Code className="w-4 h-4" />
                <span>Technologies to Explore</span>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {contactData.technologiesToExplore.map((tech, i) => (
                  <Tag key={i} variant="default" size="sm">
                    {tech}
                  </Tag>
                ))}
              </div>
            </Card>

            {/* Block 5: Collaboration Opportunities */}
            <Card className="p-6 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-theme-ember font-semibold uppercase tracking-wider mb-2">
                <Users2 className="w-4 h-4" />
                <span>Collaboration Opportunities</span>
              </div>
              <ul className="space-y-1.5 text-xs text-theme-muted">
                {contactData.collaborationOpportunities.map((collab, i) => (
                  <li key={i} className="flex items-start gap-1.5 leading-snug">
                    <span className="text-theme-ember select-none">&bull;</span>
                    <span>{collab}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </Container>

        {/* ===================================================================
            CONTACT EXPERIENCE: Accessible Form + Direct Verified Channels
            =================================================================== */}
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
                  {contactData.availability}
                </p>
              </div>

              {/* Direct Details */}
              <div className="p-4 rounded-xl bg-theme-surface border border-theme-border space-y-3 text-xs">
                <div className="flex items-center gap-2 text-theme-muted">
                  <MapPin className="w-4 h-4 text-theme-gold shrink-0" />
                  <span>{contactData.location}</span>
                </div>
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

              {/* Verified Social Networks */}
              <div className="space-y-2">
                <div className="text-[11px] font-mono uppercase tracking-widest text-theme-muted">
                  Verified Networks
                </div>
                <div className="space-y-2">
                  {contactData.socials.map((social) => (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-theme-surface border border-theme-border hover:border-theme-border-strong flex items-center justify-between text-xs transition-colors group"
                    >
                      <div>
                        <div className="font-semibold text-theme-text group-hover:text-theme-gold transition-colors">
                          {social.platform}
                        </div>
                        <div className="text-[11px] font-mono text-theme-muted">
                          {social.handle}
                        </div>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-theme-muted group-hover:text-theme-gold transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column (7 cols): Full Accessible Contact Form */}
            <div className="lg:col-span-7">
              <Card className="p-6 sm:p-8 space-y-6">
                <div>
                  <h4 className="font-serif font-bold text-xl text-theme-text">
                    Send a Direct Dispatch
                  </h4>
                  <p className="text-xs text-theme-muted mt-1 leading-relaxed">
                    Client and server validated with anti-spam honeypot and mailto fallback.
                  </p>
                </div>

                <ContactForm />
              </Card>
            </div>
          </div>
        </Container>

        {/* ===================================================================
            EXPERIENCE ACTION CONTROLS: "Replay the story" & "Back to Explore Mode"
            =================================================================== */}
        <Container size="md" className="w-full pt-16 text-center space-y-6">
          <div className="p-8 rounded-3xl bg-theme-surface border border-theme-border shadow-lg flex flex-col items-center justify-center space-y-6">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-theme-muted block mb-1">
                Documentary Journey Controls
              </span>
              <h4 className="font-serif font-bold text-xl text-theme-text">
                Continue Exploring Chinmoy Kalita&apos;s Work
              </h4>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              {/* Replay the story button */}
              <Button
                type="button"
                variant="accent"
                size="lg"
                onClick={handleReplay}
                className="shadow-md"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Replay the Story</span>
              </Button>

              {/* Back to Explore Mode button */}
              <Link href="/explore">
                <Button type="button" variant="secondary" size="lg">
                  <Compass className="w-4 h-4 text-theme-azure" />
                  <span>Back to Explore Mode</span>
                </Button>
              </Link>
            </div>

            <p className="text-[11px] font-mono text-theme-muted">
              A STORY STILL UNFOLDING · CHINMOY KALITA · 2026
            </p>
          </div>
        </Container>
      </div>
    </section>
  );
}
