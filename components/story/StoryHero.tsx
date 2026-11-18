'use client';

import React from 'react';
import Link from 'next/link';
import { chapters } from '@/content/chapters';
import { ArrowDown, Compass, Play } from 'lucide-react';

export function StoryHero() {
  return (
    <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-canvas-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Accent Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-mono mb-6">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          Interactive First-Person Documentary
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-black tracking-tight text-white leading-tight">
          A STORY STILL <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent">
            UNFOLDING
          </span>
        </h1>

        <p className="mt-4 text-lg sm:text-xl font-serif text-zinc-300 max-w-2xl mx-auto italic">
          The Engineering, Design, and Research Odyssey of Chinmoy Kalita
        </p>

        {/* Narrative Arc Track */}
        <div className="mt-10 p-4 rounded-xl bg-canvas-surface/60 border border-canvas-border backdrop-blur-sm">
          <p className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 mb-3">
            Documentary Emotional Arc
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
            {chapters.map((ch, idx) => (
              <React.Fragment key={ch.id}>
                <a
                  href={`#${ch.id}`}
                  className="px-2.5 py-1 rounded-md bg-canvas-card border border-canvas-border hover:border-amber-400/50 hover:text-amber-300 transition-all font-mono text-[11px]"
                  style={{ borderLeftColor: ch.accent, borderLeftWidth: '3px' }}
                >
                  {ch.emotionalArc}
                </a>
                {idx < chapters.length - 1 && (
                  <span className="text-zinc-600 select-none">&rarr;</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Action Controls */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#prologue"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-black font-semibold text-sm transition-all shadow-lg hover:shadow-amber-400/20"
          >
            <Play className="w-4 h-4 fill-current" />
            Begin Documentary
          </a>

          <Link
            href="/explore"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-canvas-border font-medium text-sm transition-all"
          >
            <Compass className="w-4 h-4 text-amber-400" />
            Explore Projects Mode
          </Link>
        </div>
      </div>
    </section>
  );
}
