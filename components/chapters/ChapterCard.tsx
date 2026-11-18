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
      aria-labelledby={`heading-${chapter.id}`}
      className="relative transition-all duration-300"
    >
      <Card withWash hoverEffect className="overflow-hidden">
        {/* Chapter Header */}
        <CardHeader>
          <div className="flex items-center gap-3">
            <ChapterLabel
              chapter={chapter.number}
              timecode={`00:${String((index + 1) * 6).padStart(2, '0')}:00`}
              arc={chapter.emotionalArc}
            />
          </div>

          <div className="flex items-center gap-2">
            {chapter.isPlaceholder && (
              <Tag variant="amber" size="sm">
                Draft Content
              </Tag>
            )}
            <Tag variant="outline" size="sm">
              {chapter.emotionalArc}
            </Tag>
          </div>
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

        {/* Narrative Bridge */}
        {chapter.bridgeToNext && (
          <CardFooter>
            <div className="flex items-start gap-2.5 text-xs text-theme-muted">
              <Sparkles className="w-4 h-4 text-chapter-accent shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-theme-text font-mono uppercase tracking-wider text-[11px]">
                  Narrative Bridge &rarr;{' '}
                </span>
                <span className="italic">{chapter.bridgeToNext}</span>
              </div>
            </div>
          </CardFooter>
        )}
      </Card>
    </article>
  );
}
