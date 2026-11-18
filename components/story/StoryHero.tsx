'use client';

import React from 'react';
import Link from 'next/link';
import { chapters } from '@/content/chapters';
import { Button } from '@/components/ui/Button';
import { ChapterLabel } from '@/components/ui/ChapterLabel';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { Container } from '@/components/ui/Container';
import { Compass, Play, Film } from 'lucide-react';

export function StoryHero() {
  return (
    <SectionWrapper
      chapter="prologue"
      accent="gold"
      withWash
      padding="lg"
      className="border-b border-theme-border"
    >
      <Container size="md" className="text-center">
        {/* Accent Tag */}
        <div className="flex justify-center mb-6">
          <ChapterLabel chapter="00" timecode="00:00:00" arc="Curiosity" variant="badge" />
        </div>

        {/* Main Title */}
        <h1 className="text-fluid-display font-serif font-black tracking-tight text-theme-text leading-tight">
          A STORY STILL <br className="hidden sm:inline" />
          <span className="text-chapter-accent">UNFOLDING</span>
        </h1>

        <p className="mt-4 text-fluid-narration font-serif text-theme-muted max-w-2xl mx-auto italic">
          The Engineering, Design, and Research Odyssey of Chinmoy Kalita
        </p>

        {/* Narrative Arc Track */}
        <div className="mt-10 p-5 rounded-2xl bg-theme-surface border border-theme-border shadow-sm backdrop-blur-sm">
          <p className="text-[11px] font-mono uppercase tracking-widest text-theme-muted mb-3">
            The Exposure Sunrise Arc · Curiosity to Possibility
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
            {chapters.map((ch, idx) => (
              <React.Fragment key={ch.id}>
                <a
                  href={`#${ch.id}`}
                  data-accent={ch.accentKey}
                  className="px-2.5 py-1 rounded-md bg-theme-surface-elevated border border-theme-border hover:border-theme-border-strong hover:text-chapter-accent transition-all font-mono text-[11px]"
                >
                  {ch.emotionalArc} ({ch.accentKey})
                </a>
                {idx < chapters.length - 1 && (
                  <span className="text-theme-border-strong select-none">&rarr;</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Action Controls */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a href="#prologue">
            <Button size="lg" variant="accent" className="shadow-lg">
              <Play className="w-4 h-4 fill-current" />
              Begin Documentary
            </Button>
          </a>

          <Link href="/explore">
            <Button size="lg" variant="secondary">
              <Compass className="w-4 h-4 text-chapter-accent" />
              Explore Projects Mode
            </Button>
          </Link>

          <Button
            size="lg"
            variant="ghost"
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.dispatchEvent(new Event('ck_replay_intro'));
              }
            }}
            className="text-theme-muted hover:text-theme-text"
          >
            <Film className="w-4 h-4 text-theme-gold" />
            Replay Intro
          </Button>
        </div>
      </Container>
    </SectionWrapper>
  );
}
