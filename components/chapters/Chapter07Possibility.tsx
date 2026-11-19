'use client';

import React, { useRef } from 'react';
import { Chapter } from '@/content/chapters';
import { beyond, BeyondItem, hasBeyondContent } from '@/content/beyond';
import { useMotion } from '@/hooks/useMotion';
import { Container } from '@/components/ui/Container';
import { Tag } from '@/components/ui/Tag';
import { Card } from '@/components/ui/Card';
import { ChapterTitleCard } from '@/components/motion/ChapterTitleCard';
import { Content } from '@/components/content/Content';
import { isContentRenderable } from '@/content/schema';
import { Camera, Sparkles, BookOpen, Compass, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Chapter07PossibilityProps {
  chapter: Chapter;
}

export function Chapter07Possibility({ chapter }: Chapter07PossibilityProps) {
  const { motionEnabled, prefersReducedMotion } = useMotion();
  const sceneRef = useRef<HTMLElement>(null);

  const isReduced = prefersReducedMotion || !motionEnabled;

  // Auto-hide entire chapter if beyond.ts has no renderable items
  if (!hasBeyondContent()) {
    return null;
  }

  const validItems = beyond.filter((item) => isContentRenderable(item.title));

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Photography':
        return <Camera className="w-4 h-4 text-theme-ember shrink-0" />;
      case 'Inspirations':
        return <Sparkles className="w-4 h-4 text-theme-ember shrink-0" />;
      case 'Hobbies':
        return <Heart className="w-4 h-4 text-theme-ember shrink-0" />;
      case 'Influences':
        return <BookOpen className="w-4 h-4 text-theme-ember shrink-0" />;
      default:
        return <Compass className="w-4 h-4 text-theme-ember shrink-0" />;
    }
  };

  return (
    <article
      ref={sceneRef}
      id={chapter.id}
      data-chapter="7"
      data-accent="ember"
      aria-labelledby="chapter-07-heading"
      className="relative w-full border-t border-theme-border transition-colors duration-300"
    >
      <div className="w-full py-16 sm:py-24 relative overflow-hidden min-h-screen flex flex-col justify-between">
        {/* Ambient Wash */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 bg-chapter-wash"
        />

        {/* Chapter Header (Rule 2: One label only, Instrument Serif title) */}
        <Container size="lg" className="relative z-10 w-full mb-12">
          <ChapterTitleCard
            id="chapter-07-heading"
            number={chapter.number}
            title={chapter.title}
            subtitle={chapter.subtitle}
            arc={chapter.emotionalArc}
            accentKey={chapter.accentKey}
          />
        </Container>

        {/* INTIMATE GALLERY: Photography, Inspirations, Hobbies, Influences */}
        <Container size="lg" className="relative z-10 w-full mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {validItems.map((item, index) => {
              // Gentle staggered vertical offset for intimate editorial feel (disabled under reduced motion)
              const staggerClass =
                !isReduced && index % 2 === 1 ? 'md:translate-y-8' : '';

              return (
                <div key={item.id} className={cn('transition-transform duration-300', staggerClass)}>
                  <Card
                    withWash
                    hoverEffect
                    className="p-6 sm:p-8 rounded-3xl border-theme-border/80 bg-theme-surface h-full flex flex-col justify-between space-y-6 shadow-sm hover:border-theme-ember/40 transition-all duration-300"
                  >
                    <div className="space-y-4">
                      {/* Item Header */}
                      <div className="flex items-center justify-between border-b border-theme-border pb-3 flex-wrap gap-2 text-xs font-mono">
                        <div className="flex items-center gap-2">
                          {getCategoryIcon(item.category)}
                          <span className="text-theme-ember font-semibold uppercase tracking-wider">
                            {item.category}
                          </span>
                        </div>
                        <span className="text-theme-muted tracking-widest text-[11px]">
                          0{index + 1}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl sm:text-2xl font-serif font-normal text-theme-text tracking-tight leading-snug">
                        <Content value={item.title} />
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-theme-muted font-sans leading-relaxed">
                        <Content value={item.description} />
                      </p>
                    </div>

                    {/* Reflective Caption Callout */}
                    {item.caption && isContentRenderable(item.caption) && (
                      <div className="pt-4 border-t border-theme-border/70">
                        <p className="text-xs font-serif italic text-theme-text leading-relaxed">
                          &ldquo;<Content value={item.caption} />&rdquo;
                        </p>
                      </div>
                    )}
                  </Card>
                </div>
              );
            })}
          </div>
        </Container>

        {/* Narrative Bridge leading into Epilogue (Rule 5: Quiet first-person line, unlabeled) */}
        <Container size="lg" className="relative z-10 w-full pt-16 pb-4">
          <p className="text-sm sm:text-base font-serif italic text-theme-muted text-center sm:text-left max-w-2xl leading-relaxed">
            &ldquo;<Content value={chapter.bridge} />&rdquo;
          </p>
        </Container>
      </div>
    </article>
  );
}
