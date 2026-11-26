'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Chapter } from '@/content/chapters';
import { contactData } from '@/content/contact';
import { useMotion } from '@/hooks/useMotion';
import { Container } from '@/components/ui/Container';
import { Content } from '@/components/content/Content';
import { isContentRenderable } from '@/content/schema';
import { ContactForm } from '@/components/ui/ContactForm';
import { Magnetic } from '@/components/polish/Magnetic';
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
  Copy,
  Check,
  Terminal,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface EpilogueSectionProps {
  chapter: Chapter;
}

const FLOATING_GLYPHS = [
  { Icon: Sparkles, top: '8%', left: '6%', delay: '0s', size: 'w-7 h-7' },
  { Icon: Compass, top: '14%', right: '7%', delay: '1.1s', size: 'w-8 h-8' },
  { Icon: Code, top: '42%', left: '4%', delay: '0.6s', size: 'w-6 h-6' },
  { Icon: Terminal, top: '56%', right: '5%', delay: '1.8s', size: 'w-7 h-7' },
  { Icon: Rocket, top: '78%', left: '7%', delay: '1.3s', size: 'w-6 h-6' },
];

export function EpilogueSection({ chapter }: EpilogueSectionProps) {
  const { motionEnabled, prefersReducedMotion } = useMotion();
  const [threadPulsed, setThreadPulsed] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const isReduced = prefersReducedMotion || !motionEnabled;

  const replayStory = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.pushState(null, '', '#');
    }
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactData.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 1800);
    } catch {
      // Ignore clipboard errors in restricted contexts
    }
  };

  const triggerThreadPulse = () => {
    setThreadPulsed(true);
    setTimeout(() => setThreadPulsed(false), 600);
  };

  const renderableTech = contactData.technologiesToExplore.filter((t) =>
    isContentRenderable(t)
  );
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
      className="relative w-full bg-cinema-bg text-cinema-text border-t border-cinema-border/40 overflow-hidden transition-colors duration-300 min-h-[100dvh]"
    >
      {/* Warm Sunrise Horizon Wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 74% 56% at 50% 62%, color-mix(in srgb, var(--color-accent-gold) 16%, transparent) 0%, color-mix(in srgb, var(--color-accent-ember) 8%, transparent) 46%, transparent 78%)',
        }}
      />

      {/* Subtle Blueprint Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          opacity: 'var(--stage-grid-opacity, 0.06)',
          backgroundImage:
            'linear-gradient(to right, var(--color-accent-gold) 1px, transparent 1px), linear-gradient(to bottom, var(--color-accent-gold) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />

      {/* Giant Kinetic Outlined Bebas Neue Backdrop Word */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-x-0 top-10 sm:top-14 z-0 flex justify-center overflow-hidden"
      >
        <span
          className="text-[20vw] sm:text-[15vw] leading-none tracking-[0.04em] uppercase"
          style={{
            fontFamily: "'Bebas Neue', 'Oswald', 'Impact', sans-serif",
            WebkitTextStroke: '1.5px var(--color-accent-gold)',
            color: 'transparent',
            opacity: 'var(--stage-watermark-opacity, 0.12)',
          }}
        >
          UNFINISHED
        </span>
      </div>

      {/* Floating Sunrise Glyphs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {FLOATING_GLYPHS.map(({ Icon, top, left, right, delay, size }, idx) => (
          <div
            key={idx}
            className="absolute text-stage-gold/30"
            style={{
              top,
              left,
              right,
              animation: isReduced ? undefined : `floatSlow 8s ease-in-out ${delay} infinite`,
            }}
          >
            <Icon className={size} strokeWidth={1.35} />
          </div>
        ))}
      </div>

      {/* FOREGROUND STAGE */}
      <div className="relative z-10 w-full py-20 lg:py-28 flex flex-col justify-between">
        <Container size="lg" className="space-y-16 sm:space-y-20">
          {/* 1. Open Editorial Epilogue Header */}
          <header className="space-y-6 text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2.5 text-xs font-mono tracking-[0.22em] uppercase text-stage-gold">
              <span className="w-2 h-2 rounded-full bg-stage-gold animate-pulse" />
              <span>Epilogue — Sunrise</span>
            </div>

            <h2
              id="epilogue-heading"
              className="font-serif font-normal text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.03] text-cinema-text"
            >
              <Content value={chapter.title} />
            </h2>

            {chapter.subtitle && (
              <p className="text-base sm:text-xl font-serif italic text-cinema-muted max-w-2xl mx-auto leading-relaxed">
                <Content value={chapter.subtitle} />
              </p>
            )}

            {chapter.narration[0] && (
              <blockquote className="pt-4 text-sm sm:text-lg font-serif italic text-cinema-text/90 leading-relaxed max-w-2xl mx-auto">
                &ldquo;<Content value={chapter.narration[0]} />&rdquo;
              </blockquote>
            )}

            {/* Interactive Unfinished Thread */}
            <div className="pt-6 flex flex-col items-center justify-center select-none">
              <button
                type="button"
                onClick={triggerThreadPulse}
                aria-label="Pulse the unfinished golden thread"
                className="group flex flex-col items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-stage-gold rounded-lg px-4 py-2"
              >
                <div
                  className={cn(
                    'w-[2px] h-16 rounded-t-full transition-all duration-500',
                    threadPulsed ? 'bg-stage-gold scale-y-110' : 'bg-stage-gold/75'
                  )}
                />
                <span
                  className={cn(
                    'w-2.5 h-4 bg-stage-gold rounded-sm mt-1 transition-transform duration-300',
                    threadPulsed ? 'scale-150' : 'animate-pulse'
                  )}
                />
                <span className="text-[11px] font-mono text-stage-gold tracking-[0.2em] uppercase mt-3 group-hover:underline">
                  The line continues into the future
                </span>
              </button>
            </div>
          </header>

          {/* 2. Open Horizons & Collaboration Matrix (Zero-Box Editorial) */}
          {hasAnyHorizons && (
            <section
              aria-label="Horizons and active convictions"
              className="border-y border-cinema-border/60 py-10 sm:py-12 space-y-10"
            >
              {(isContentRenderable(contactData.whatIWantToBecome) ||
                isContentRenderable(contactData.whatIWantToBuild) ||
                isContentRenderable(contactData.ambitions)) && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {isContentRenderable(contactData.whatIWantToBecome) && (
                    <div className="space-y-2 border-l-2 border-stage-gold pl-4">
                      <div className="flex items-center gap-2 text-xs font-mono text-stage-gold uppercase tracking-wider">
                        <Target className="w-3.5 h-3.5" />
                        <span>What I Want to Become</span>
                      </div>
                      <p className="text-sm text-cinema-text leading-relaxed font-sans">
                        <Content value={contactData.whatIWantToBecome} />
                      </p>
                    </div>
                  )}

                  {isContentRenderable(contactData.whatIWantToBuild) && (
                    <div className="space-y-2 border-l-2 border-stage-azure pl-4">
                      <div className="flex items-center gap-2 text-xs font-mono text-stage-azure uppercase tracking-wider">
                        <Rocket className="w-3.5 h-3.5" />
                        <span>What I Want to Build</span>
                      </div>
                      <p className="text-sm text-cinema-text leading-relaxed font-sans">
                        <Content value={contactData.whatIWantToBuild} />
                      </p>
                    </div>
                  )}

                  {isContentRenderable(contactData.ambitions) && (
                    <div className="space-y-2 border-l-2 border-stage-rose pl-4">
                      <div className="flex items-center gap-2 text-xs font-mono text-stage-rose uppercase tracking-wider">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Core Ambition</span>
                      </div>
                      <p className="text-sm text-cinema-text leading-relaxed font-sans">
                        <Content value={contactData.ambitions} />
                      </p>
                    </div>
                  )}
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                {renderableTech.length > 0 && (
                  <div className="lg:col-span-6 space-y-4">
                    <div className="flex items-center gap-2 text-xs font-mono text-stage-iris uppercase tracking-[0.16em]">
                      <Code className="w-3.5 h-3.5" />
                      <span>Technologies to Explore</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {renderableTech.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 rounded-lg border border-cinema-border/70 bg-cinema-bg/60 text-xs font-mono text-cinema-text"
                        >
                          <Content value={tech} />
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {renderableCollab.length > 0 && (
                  <div className="lg:col-span-6 space-y-4">
                    <div className="flex items-center gap-2 text-xs font-mono text-stage-ember uppercase tracking-[0.16em]">
                      <Users2 className="w-3.5 h-3.5" />
                      <span>Collaboration Opportunities</span>
                    </div>
                    <ul className="space-y-2.5 text-sm text-cinema-muted font-sans">
                      {renderableCollab.map((collab, i) => (
                        <li key={i} className="flex items-start gap-2.5 leading-snug">
                          <span className="text-stage-ember font-mono text-xs pt-0.5">
                            0{i + 1}
                          </span>
                          <span className="text-cinema-text">
                            <Content value={collab} />
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* 3. Direct Ingress & Interactive Contact Form */}
          <section
            aria-label="Direct contact and dialogue"
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start"
          >
            {/* Left Column: Availability, Copy Email, Social Anchors */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-[0.18em] text-stage-gold block">
                  Direct Ingress
                </span>
                <h3 className="font-serif font-normal text-3xl sm:text-4xl text-cinema-text">
                  Initiate a Dialogue
                </h3>
                <p className="text-sm text-cinema-muted leading-relaxed font-sans">
                  <Content value={contactData.availability} />
                </p>
              </div>

              {/* Direct Details + One-Click Copy */}
              <div className="space-y-3 py-4 border-y border-cinema-border/50 text-xs">
                {isContentRenderable(contactData.location) && (
                  <div className="flex items-center gap-2.5 text-cinema-muted">
                    <MapPin className="w-4 h-4 text-stage-gold shrink-0" />
                    <span>
                      <Content value={contactData.location} />
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Mail className="w-4 h-4 text-stage-gold shrink-0" />
                    <a
                      href={`mailto:${contactData.email}`}
                      className="text-cinema-text hover:text-stage-gold transition-colors truncate font-mono font-medium"
                    >
                      {contactData.email}
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded border border-cinema-border text-[11px] font-mono text-cinema-muted hover:text-cinema-text hover:border-stage-gold transition-colors shrink-0"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3 h-3 text-stage-gold" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Network Anchors */}
              <div className="space-y-2.5">
                <span className="text-[11px] font-mono text-cinema-muted uppercase tracking-[0.16em] block">
                  Network Anchors
                </span>
                <div className="flex flex-wrap gap-2">
                  {contactData.socials.map((s) => (
                    <a
                      key={s.platform}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-full border border-cinema-border/80 bg-cinema-bg/60 hover:border-stage-gold text-xs font-mono text-cinema-text transition-colors inline-flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-stage-gold"
                    >
                      <span>{s.platform}</span>
                      <ExternalLink className="w-3 h-3 text-cinema-muted" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form in Open Hairline Frame */}
            <div className="lg:col-span-7">
              <div className="p-6 sm:p-8 rounded-2xl border border-cinema-border/70 bg-cinema-bg/75 backdrop-blur-sm">
                <ContactForm />
              </div>
            </div>
          </section>

          {/* 4. Closing Bridge & Action Bar */}
          <div className="pt-8 border-t border-cinema-border/40 space-y-8">
            <p className="text-sm sm:text-base font-serif italic text-cinema-muted text-center sm:text-left max-w-2xl leading-relaxed">
              &ldquo;<Content value={chapter.bridge} />&rdquo;
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <Magnetic maxPull={6}>
                <button
                  type="button"
                  onClick={replayStory}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-cinema-border bg-cinema-bg/70 hover:border-stage-gold text-xs font-mono text-cinema-text transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-stage-gold"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-stage-gold" />
                  <span>Replay the story</span>
                </button>
              </Magnetic>

              <Magnetic maxPull={6}>
                <Link
                  href="/explore"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-cinema-border bg-cinema-bg/70 hover:border-stage-azure text-xs font-mono text-cinema-text transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-stage-azure"
                >
                  <Compass className="w-3.5 h-3.5 text-stage-azure" />
                  <span>Back to Explore Mode &rarr;</span>
                </Link>
              </Magnetic>
            </div>
          </div>
        </Container>
      </div>
    </article>
  );
}
