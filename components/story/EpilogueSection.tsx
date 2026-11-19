'use client';

import React, { useState } from 'react';
import { Chapter } from '@/content/chapters';
import { contactData } from '@/content/contact';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Tag } from '@/components/ui/Tag';
import { Button } from '@/components/ui/Button';
import { Content } from '@/components/content/Content';
import { isContentRenderable } from '@/content/schema';
import {
  Mail,
  MapPin,
  Send,
  Sparkles,
  Rocket,
  Code,
  Users2,
  CheckCircle,
  AlertCircle,
  Target,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface EpilogueSectionProps {
  chapter: Chapter;
}

export function EpilogueSection({ chapter }: EpilogueSectionProps) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage('Please fill out all fields.');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Failed to send message. Please try again.');
      }

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (err: unknown) {
      setStatus('error');
      setErrorMessage(
        err instanceof Error ? err.message : 'Something went wrong. Please email directly.'
      );
    }
  };

  return (
    <article
      id={chapter.id}
      data-chapter="epilogue"
      data-accent="sunrise"
      aria-labelledby="epilogue-heading"
      className="relative w-full border-t border-theme-border/60 transition-colors duration-300 min-h-screen"
    >
      {/* Ambient Wash */}
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
          </div>

          <div className="mt-6">
            <h2
              id="epilogue-heading"
              className="text-fluid-h1 font-serif font-normal tracking-tight text-theme-text leading-[1.08]"
            >
              <Content value={chapter.title} />
            </h2>
            {chapter.subtitle && (
              <p className="text-fluid-narration font-serif italic text-theme-muted mt-2 max-w-[32ch] leading-[1.35]">
                <Content value={chapter.subtitle} />
              </p>
            )}
          </div>
        </Container>

        {/* Central Narration Statement */}
        <Container size="md" className="w-full text-center space-y-6 my-8">
          {chapter.narration[0] && (
            <blockquote className="text-fluid-narration sm:text-2xl font-serif italic text-theme-text leading-[1.35] max-w-2xl mx-auto">
              &ldquo;<Content value={chapter.narration[0]} />&rdquo;
            </blockquote>
          )}

          {/* Unfinished Thread: stops mid-line in gold */}
          <div
            aria-label="The ThreadSpine ends unfinished: a gold line stopping mid-way"
            className="pt-8 pb-4 flex flex-col items-center justify-center select-none"
          >
            <div className="w-[2px] h-16 bg-theme-gold/80 rounded-t-full" />
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-4 bg-theme-gold rounded-sm animate-pulse shadow-[0_0_12px_var(--color-gold)]" />
            </div>
          </div>
        </Container>

        {/* Aspirations & Horizons (Rendered only when content is verified/draft) */}
        {(isContentRenderable(contactData.whatIWantToBecome) ||
          isContentRenderable(contactData.whatIWantToBuild) ||
          isContentRenderable(contactData.ambitions)) && (
          <Container size="lg" className="w-full my-12 space-y-8">
            <div className="flex items-center justify-between border-b border-theme-border pb-3 flex-wrap gap-2">
              <h3 className="font-serif font-bold text-xl text-theme-text">
                Horizons & Active Convictions
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
                    <span><Content value={contactData.location} /></span>
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
                      className="px-3 py-1.5 rounded-lg border border-theme-border bg-theme-surface hover:bg-theme-surface-elevated text-xs font-mono text-theme-text transition-colors flex items-center gap-2"
                    >
                      <span>{s.platform}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column (7 cols): Contact Form */}
            <div className="lg:col-span-7">
              <Card className="p-6 sm:p-8 border-theme-border bg-theme-surface shadow-xl">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="text-xs font-mono text-theme-muted block">
                        YOUR NAME
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-theme-surface-elevated border border-theme-border text-xs text-theme-text focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-gold"
                        placeholder="Ada Lovelace"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-xs font-mono text-theme-muted block">
                        EMAIL ADDRESS
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-theme-surface-elevated border border-theme-border text-xs text-theme-text focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-gold"
                        placeholder="ada@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-xs font-mono text-theme-muted block">
                      MESSAGE &amp; PROPOSAL
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-theme-surface-elevated border border-theme-border text-xs text-theme-text focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-gold resize-none"
                      placeholder="Share a vision, question, or project inquiry..."
                    />
                  </div>

                  {status === 'error' && (
                    <div className="p-3 rounded-lg bg-theme-rose/10 border border-theme-rose/30 text-theme-rose text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {status === 'success' && (
                    <div className="p-3 rounded-lg bg-theme-azure/10 border border-theme-azure/30 text-theme-azure text-xs flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 shrink-0" />
                      <span>Message received. I will reply to your transmission promptly.</span>
                    </div>
                  )}

                  <Button
                    type="submit"
                    variant="accent"
                    size="md"
                    disabled={status === 'submitting'}
                    className="w-full sm:w-auto"
                  >
                    <Send className="w-4 h-4" />
                    <span>{status === 'submitting' ? 'Transmitting...' : 'Send Message'}</span>
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </Container>

        {/* Narrative Bridge (Closing) */}
        <Container size="lg" className="w-full pt-16 pb-4">
          <p className="text-sm sm:text-base font-serif italic text-theme-muted text-center sm:text-left">
            &ldquo;<Content value={chapter.bridge} />&rdquo;
          </p>
        </Container>
      </div>
    </article>
  );
}
