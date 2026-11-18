import React from 'react';
import { chapters } from '@/content/chapters';
import { projects } from '@/content/projects';
import { StoryHero } from '@/components/story/StoryHero';
import { ChapterCard } from '@/components/chapters/ChapterCard';
import Link from 'next/link';
import { ArrowRight, Layers, FileText } from 'lucide-react';

export default function StoryModePage() {
  return (
    <div className="w-full">
      {/* Narrative Hero */}
      <StoryHero />

      {/* Chapters Container */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-12">
        <div className="flex items-center justify-between border-b border-canvas-border pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
              The Chapters
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              8 chronological movements from initial curiosity to future possibilities
            </p>
          </div>
          <span className="text-xs font-mono text-amber-400 px-2.5 py-1 rounded bg-amber-400/10 border border-amber-400/20">
            {chapters.length} Chapters Indexed
          </span>
        </div>

        {/* Chapter List */}
        <div className="space-y-10">
          {chapters.map((chapter, index) => (
            <ChapterCard key={chapter.id} chapter={chapter} index={index} />
          ))}
        </div>

        {/* Projects Bridge Preview */}
        <div className="mt-20 p-8 rounded-2xl bg-canvas-card border border-canvas-border space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
                Connected Artifacts
              </span>
              <h3 className="text-2xl font-serif font-bold text-white mt-1">
                Featured Projects in this Story
              </h3>
            </div>
            <Link
              href="/explore"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-300 hover:text-amber-200 transition-colors"
            >
              View all {projects.length} projects in Explore Hub &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {projects.map((proj) => (
              <Link
                key={proj.id}
                href={`/projects/${proj.slug}`}
                className="p-4 rounded-xl bg-canvas-surface border border-canvas-border hover:border-amber-400/40 transition-all group"
              >
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
                  <span className="text-zinc-400">{proj.category}</span>
                  <span className="px-2 py-0.5 rounded bg-zinc-800 text-[10px] text-amber-300 uppercase">
                    {proj.status}
                  </span>
                </div>
                <h4 className="text-base font-serif font-semibold text-white group-hover:text-amber-300 transition-colors">
                  {proj.title}
                </h4>
                <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                  {proj.tagline}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
