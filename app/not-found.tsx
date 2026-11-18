import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Tag } from '@/components/ui/Tag';
import { Button } from '@/components/ui/Button';
import { Film, Compass, ArrowLeft, Home } from 'lucide-react';

export const metadata = {
  title: 'Scene Not Found — 404 | Chinmoy Kalita',
  description:
    'This scene has not been shot or indexed. Return to the continuous story or explore the portfolio hub.',
};

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-20">
      <Container size="sm" className="text-center space-y-8">
        {/* Film-slate marker */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-theme-border bg-theme-surface text-xs font-mono text-theme-muted uppercase tracking-widest">
          <Film className="w-3.5 h-3.5 text-theme-gold" />
          <span>OUT OF SEQUENCE · SCENE 404</span>
        </div>

        {/* Typographic numeral */}
        <div className="relative">
          <h1 className="text-8xl sm:text-9xl font-serif font-black tracking-tighter text-theme-text opacity-15 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-fluid-h2 font-serif font-bold text-theme-text">
              An Unwritten Chapter
            </span>
          </div>
        </div>

        {/* Narrative reflection */}
        <p className="text-fluid-narration font-serif italic text-theme-muted max-w-lg mx-auto leading-relaxed">
          &ldquo;Not every path leads to a documented chapter. Some threads wander into unexplored
          territory, waiting for an idea to give them form.&rdquo;
        </p>

        <p className="text-xs font-mono text-theme-muted max-w-md mx-auto leading-relaxed">
          The coordinate you requested does not correspond to an indexed movement, case study, or
          visual artifact.
        </p>

        {/* Actions */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold bg-theme-text text-theme-bg hover:opacity-90 transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-chapter-accent"
          >
            <Home className="w-4 h-4" />
            Return to Story Mode
          </Link>

          <Link
            href="/explore"
            className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium bg-theme-surface hover:bg-theme-surface-elevated text-theme-text border border-theme-border transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-chapter-accent"
          >
            <Compass className="w-4 h-4" />
            Explore Hub
          </Link>
        </div>
      </Container>
    </div>
  );
}
