'use client';

import React from 'react';
import { Chapter } from '@/content/chapters';
import { Sparkles, ArrowRight, BookOpen } from 'lucide-react';
import Link from 'next/link';

export function ChapterCard({ chapter, index }: { chapter: Chapter; index: number }) {
  const isNumbered = typeof chapter.number === 'number';

  return (
    <article
      id={chapter.id}
      aria-labelledby={`heading-${chapter.id}`}
      className="relative group p-6 sm:p-8 rounded-2xl bg-canvas-surface/90 border border-canvas-border hover:border-canvas-border-strong transition-all duration-300 shadow-lg backdrop-blur-sm"
    >
      {/* Chapter header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <span
            className="px-3 py-1 text-xs font-mono font-medium rounded-full border"
            style={{
              borderColor: `${chapter.accent}40`,
              color: chapter.accent,
              backgroundColor: `${chapter.accent}12`,
            }}
          >
            {isNumbered
              ? chapter.number === 0
                ? 'PROLOGUE'
                : `CHAPTER 0${chapter.number}`
              : chapter.number.toString().toUpperCase()}
          </span>

          <span className="text-xs uppercase tracking-widest text-zinc-400 flex items-center gap-1.5 font-medium">
            <span
              className="w-2 h-2 rounded-full inline-block"
              style={{ backgroundColor: chapter.accent }}
            />
            {chapter.emotionalArc}
          </span>
        </div>

        {chapter.isPlaceholder && (
          <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
            Draft Content
          </span>
        )}
      </div>

      {/* Chapter Title & Subtitle */}
      <h2
        id={`heading-${chapter.id}`}
        className="text-2xl sm:text-3xl font-serif font-bold text-zinc-100 tracking-tight group-hover:text-amber-200 transition-colors"
      >
        {chapter.title}
      </h2>

      <p className="text-sm font-medium text-zinc-400 mt-1 italic">
        {chapter.subtitle}
      </p>

      {/* Summary */}
      <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mt-4">
        {chapter.summary}
      </p>

      {/* Narration Excerpts */}
      <div className="mt-6 pt-5 border-t border-canvas-border space-y-3">
        <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-amber-400" />
          Narration Excerpt
        </h3>
        <div className="space-y-2">
          {chapter.narration.map((item, idx) => {
            const isTodo = item.text.startsWith('[TODO:');
            return (
              <blockquote
                key={idx}
                className={`text-sm pl-4 border-l-2 ${
                  isTodo
                    ? 'border-amber-400/60 bg-amber-950/20 text-amber-200 py-1 pr-2 rounded-r font-mono text-xs'
                    : 'border-zinc-600 text-zinc-300 italic'
                }`}
              >
                &ldquo;{item.text}&rdquo;
                {item.note && (
                  <span className="block text-[10px] text-zinc-400 mt-0.5 not-italic font-sans">
                    — {item.note}
                  </span>
                )}
              </blockquote>
            );
          })}
        </div>
      </div>

      {/* Bridge to next */}
      {chapter.bridgeToNext && (
        <div className="mt-6 pt-4 border-t border-canvas-border/60 flex items-start gap-2 text-xs text-zinc-400">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
          <p>
            <span className="font-semibold text-zinc-300">Narrative Bridge: </span>
            {chapter.bridgeToNext}
          </p>
        </div>
      )}
    </article>
  );
}
