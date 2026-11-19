'use client';

import React from 'react';
import { Chapter } from '@/content/chapters';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/Card';
import { ChapterLabel } from '@/components/ui/ChapterLabel';
import { NarrationText } from '@/components/ui/NarrationText';
import { OutlinedNumeral } from '@/components/ui/OutlinedNumeral';
import { Tag } from '@/components/ui/Tag';
import { Sparkles } from 'lucide-react';

export function ChapterCard({ chapter, index }: { chapter: Chapter; index: number }) {
  const chapterNumber = typeof chapter.number === 'number' ? chapter.number : index;

  return (
    <article
      id={chapter.id}
      data-chapter={chapterNumber}
      data-accent={chapter.accentKey}
      aria-labelledby={`heading-${chapter.id}`}
      className="relative transition-all duration-300"
    >
      <Card withWash hoverEffect className="overflow-hidden">
        {/* Chapter Header (Rule 2: One label only) */}
        <CardHeader>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-chapter-accent font-medium">
              {typeof chapter.number === 'number'
                ? chapter.number === 0
                  ? 'PROLOGUE'
                  : `CHAPTER 0${chapter.number}`
                : String(chapter.number).toUpperCase()}
            </span>
            <span className="text-theme-muted/40 font-mono text-xs" aria-hidden="true">
              ·
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-theme-muted">
              {chapter.title}
            </span>
          </div>

          {process.env.NODE_ENV !== 'production' && chapter.isPlaceholder && (
            <span className="text-[10px] font-mono text-theme-muted/60">[TODO: content]</span>
          )}
        </CardHeader>

        {/* Content & Outlined Numeral */}
        <div className="flex items-start justify-between gap-6 mt-2">
          <div className="space-y-2 flex-1">
            <h2
              id={`heading-${chapter.id}`}
              className="text-fluid-h2 font-serif font-bold text-theme-text tracking-tight hover:text-chapter-accent transition-colors"
            >
              {chapter.title}
            </h2>

            <p className="text-sm font-serif italic text-theme-muted">{chapter.subtitle}</p>

            <p className="text-fluid-body font-sans text-theme-text leading-relaxed pt-2">
              {chapter.summary}
            </p>
          </div>

          {/* Large Outlined Numeral */}
          <div className="hidden sm:block shrink-0 pt-2 opacity-50 hover:opacity-100 transition-opacity">
            <OutlinedNumeral num={chapterNumber} size="md" />
          </div>
        </div>

        {/* Narration Excerpts */}
        <div className="mt-8 pt-6 border-t border-theme-border space-y-4">
          <div className="text-xs font-mono uppercase tracking-widest text-theme-muted">
            Narration Audio & Text Excerpts
          </div>

          <div className="space-y-3">
            {chapter.narration.map((item, idx) => (
              <NarrationText
                key={idx}
                text={item.text}
                note={item.note}
                isDraft={item.text.startsWith('[TODO:')}
              />
            ))}
          </div>
        </div>

        {/* Narrative Bridge (Rule 5: Quiet first-person line, no box, no label) */}
        {chapter.bridgeToNext && (
          <CardFooter className="pt-4 border-t border-theme-border/40">
            <p className="text-xs sm:text-sm font-serif italic text-theme-muted">
              &ldquo;{chapter.bridgeToNext}&rdquo;
            </p>
          </CardFooter>
        )}
      </Card>
    </article>
  );
}
