'use client';

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { chapters } from '@/content/chapters';
import { Button } from '@/components/ui/Button';
import { Content } from '@/components/content/Content';
import { useMotion } from '@/hooks/useMotion';
import { Play, Compass, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export function StoryHero() {
  const [indexOpen, setIndexOpen] = useState(false);
  const { lenis, motionEnabled } = useMotion();

  const prologue = chapters.find((c) => c.id === 'prologue') || chapters[0];
  const visibleChapters = chapters.visible ? chapters.visible() : chapters;

  const scrollToSection = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (el) {
        if (lenis && motionEnabled) {
          lenis.scrollTo(el, { offset: -40, duration: 1.2 });
        } else {
          el.scrollIntoView({ behavior: motionEnabled ? 'smooth' : 'auto' });
        }
      }
    },
    [lenis, motionEnabled]
  );

  return (
    <section
      id="prologue"
      data-chapter="0"
      data-accent="gold"
      className="relative w-full min-h-[90svh] flex flex-col justify-center items-center px-6 sm:px-12 py-24 text-center"
    >
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Single minimal chapter identifier (Rule 2: One label) */}
        <div className="flex items-center justify-center gap-3">
          <span className="font-mono text-xs uppercase tracking-widest text-chapter-accent font-medium">
            PROLOGUE
          </span>
          <span className="text-theme-muted/40 font-mono text-xs" aria-hidden="true">
            ·
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-theme-muted">
            <Content value={prologue.title} />
          </span>
        </div>

        {/* Cinematic Main Title */}
        <h1 className="text-fluid-display font-serif font-normal tracking-tight text-theme-text leading-[1.05]">
          A Story Still <br className="hidden sm:inline" />
          <span className="italic text-chapter-accent font-normal">Unfolding</span>
        </h1>

        {/* Verified Draft Narration Line (Rule 3: Exact brief text only) */}
        {prologue.narration[0] && (
          <p className="text-fluid-narration font-serif italic text-theme-muted max-w-2xl mx-auto leading-[1.35]">
            &ldquo;<Content value={prologue.narration[0]} />&rdquo;
          </p>
        )}

        {/* Primary Story Actions */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <Button
            size="lg"
            variant="accent"
            onClick={() => scrollToSection('chapter-01')}
            className="shadow-lg"
          >
            <Play className="w-4 h-4 fill-current" />
            Begin Documentary
          </Button>

          <Link href="/explore">
            <Button size="lg" variant="secondary">
              <Compass className="w-4 h-4 text-chapter-accent" />
              Explore Projects Mode
            </Button>
          </Link>
        </div>

        {/* Collapsed-by-default real chapter index */}
        <div className="pt-10 max-w-xl mx-auto">
          <button
            type="button"
            onClick={() => setIndexOpen(!indexOpen)}
            aria-expanded={indexOpen}
            className="inline-flex items-center gap-2 font-mono text-xs text-theme-muted hover:text-theme-text transition-colors"
          >
            <span>Movement Index ({visibleChapters.length} Chapters)</span>
            <ChevronDown
              className={cn(
                'w-3.5 h-3.5 transition-transform duration-200',
                indexOpen && 'rotate-180'
              )}
            />
          </button>

          {indexOpen && (
            <nav
              aria-label="Story chapter index"
              className="mt-6 text-left border-t border-theme-border/60 pt-4 divide-y divide-theme-border/40"
            >
              {visibleChapters.map((ch, idx) => (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => {
                    setIndexOpen(false);
                    scrollToSection(ch.id);
                  }}
                  className="w-full flex items-baseline justify-between py-2.5 text-xs font-mono group hover:text-chapter-accent transition-colors text-left"
                >
                  <span className="text-theme-muted group-hover:text-chapter-accent flex items-center gap-1.5">
                    <span>
                      {idx === 0
                        ? '00'
                        : idx === visibleChapters.length - 1
                          ? 'EP'
                          : `0${idx}`}
                      {' · '}
                    </span>
                    <Content value={ch.title} />
                  </span>
                  <span className="text-theme-muted/50 font-serif italic text-[11px]">
                    {ch.emotionalArc}
                  </span>
                </button>
              ))}
            </nav>
          )}
        </div>
      </div>
    </section>
  );
}
