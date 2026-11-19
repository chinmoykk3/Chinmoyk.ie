'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Chapter } from '@/content/chapters';
import { designWork, DesignWorkItem, DesignCategory } from '@/content/designWork';
import { useMotion } from '@/hooks/useMotion';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { ChapterTitleCard } from '@/components/motion/ChapterTitleCard';
import { Content } from '@/components/content/Content';
import { getContentText } from '@/content/schema';
import { Palette, Eye, Sliders, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DesignLightbox } from './DesignLightbox';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface Chapter04DesignProps {
  chapter: Chapter;
}

export function Chapter04Design({ chapter }: Chapter04DesignProps) {
  const { motionEnabled, prefersReducedMotion } = useMotion();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Floating cursor lens state (Desktop only)
  const [lensPos, setLensPos] = useState<{ x: number; y: number } | null>(null);
  const [lensText, setLensText] = useState('');

  const typoMomentRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);

  const isReduced = prefersReducedMotion || !motionEnabled;
  const showDebug =
    process.env.NODE_ENV !== 'production' &&
    process.env.NEXT_PUBLIC_DEBUG_CONTENT === '1';

  const categories = ['All', 'Posters', 'Branding', 'Typography', 'Visual experiments'];

  // Production policy: placeholder tiles are visible ONLY in development
  const baseItems: DesignWorkItem[] = designWork.filter((item) => {
    if (!item.isPlaceholder) return true;
    return showDebug;
  });

  const filteredItems =
    activeCategory === 'All'
      ? baseItems
      : baseItems.filter((item) => item.category === activeCategory);

  // 1. Kinetic Typographic Moment: Letter composition rearranges on scroll
  useEffect(() => {
    if (isReduced) return;

    const typoEl = typoMomentRef.current;
    if (!typoEl) return;

    const letters = lettersRef.current.filter(Boolean) as HTMLSpanElement[];
    if (letters.length === 0) return;

    const ctx = gsap.context(() => {
      // Letters assemble from randomized spatial offsets and slight rotations into sharp grid alignment
      gsap.fromTo(
        letters,
        {
          x: () => (Math.random() - 0.5) * 60,
          y: () => (Math.random() - 0.5) * 50,
          rotation: () => (Math.random() - 0.5) * 24,
          opacity: 0.25,
          scale: 0.9,
        },
        {
          x: 0,
          y: 0,
          rotation: 0,
          opacity: 1,
          scale: 1,
          ease: 'power2.out',
          stagger: {
            each: 0.02,
            from: 'random',
          },
          scrollTrigger: {
            trigger: typoEl,
            start: 'top 80%',
            end: 'center 45%',
            scrub: 0.4,
          },
        }
      );
    }, typoEl);

    return () => ctx.revert();
  }, [isReduced]);

  // 2. Cursor hover lens handlers
  const handleMouseEnter = useCallback(
    (title: string, e: React.MouseEvent) => {
      if (isReduced) return;
      setLensText(title);
      setLensPos({ x: e.clientX, y: e.clientY });
    },
    [isReduced]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isReduced) return;
      setLensPos({ x: e.clientX, y: e.clientY });
    },
    [isReduced]
  );

  const handleMouseLeave = useCallback(() => {
    setLensPos(null);
  }, []);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    setLensPos(null);
  };

  return (
    <article
      id={chapter.id}
      data-chapter="4"
      data-accent="rose"
      aria-labelledby="chapter-04-heading"
      className="relative w-full border-t border-theme-border transition-colors duration-300"
    >
      <div className="w-full py-16 sm:py-24 relative overflow-hidden">
        {/* Chapter Ambient Wash */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 bg-chapter-wash"
        />

        {/* Chapter Header (Rule 2: One label only, Instrument Serif title) */}
        <Container size="lg" className="relative z-10 w-full mb-12">
          <ChapterTitleCard
            id="chapter-04-heading"
            number={chapter.number}
            title={chapter.title}
            subtitle={chapter.subtitle}
            arc={chapter.emotionalArc}
            accentKey={chapter.accentKey}
          />
        </Container>

        {/* OPENING TYPOGRAPHIC MOMENT */}
        <Container size="lg" className="relative z-10 w-full mb-16">
          <div
            ref={typoMomentRef}
            className="p-8 sm:p-12 rounded-3xl bg-theme-surface border border-theme-border shadow-lg relative overflow-hidden"
          >
            <div className="flex items-center justify-between text-xs font-mono text-theme-muted mb-8 border-b border-theme-border pb-3">
              <span>EXHIBITION SPECIMEN · CH-04</span>
              <span className="text-theme-rose uppercase tracking-widest font-semibold">
                Typography as Architecture
              </span>
            </div>

            <div
              aria-label="DESIGN IS ANOTHER LANGUAGE"
              className="text-center py-6 select-none overflow-hidden"
            >
              <div className="text-fluid-display font-serif font-normal tracking-tight text-theme-text uppercase flex flex-wrap justify-center gap-x-3 sm:gap-x-5 leading-none">
                {'DESIGN IS A LANGUAGE'.split('').map((char, i) => (
                  <span
                    key={i}
                    ref={(el) => {
                      lettersRef.current[i] = el;
                    }}
                    className={cn(
                      'inline-block transition-transform duration-75',
                      char === ' ' ? 'w-4 sm:w-8' : ''
                    )}
                  >
                    {char}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-theme-border max-w-xl mx-auto text-center">
              <p className="text-xs sm:text-sm font-serif italic text-theme-muted leading-relaxed">
                &ldquo;Where code organizes logic, design organizes perception.&rdquo;
              </p>
            </div>
          </div>
        </Container>

        {/* CATEGORY FILTER CONTROLS */}
        <Container size="lg" className="relative z-10 w-full mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-theme-border pb-4">
            <div className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-theme-rose" />
              <h3 className="font-serif font-normal text-xl text-theme-text">Curated Specimen Gallery</h3>
            </div>

            {/* Filter Pills */}
            <nav
              aria-label="Design Work Categories"
              className="flex flex-wrap gap-1.5 p-1 rounded-full bg-theme-surface border border-theme-border text-xs font-mono"
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    'px-3.5 py-1 rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-rose',
                    activeCategory === cat
                      ? 'bg-theme-rose text-white font-semibold shadow-sm'
                      : 'text-theme-muted hover:text-theme-text hover:bg-theme-surface-elevated'
                  )}
                >
                  {cat}
                </button>
              ))}
            </nav>
          </div>
        </Container>

        {/* GALLERY */}
        <Container size="lg" className="relative z-10 w-full">
          {filteredItems.length === 0 ? (
            /* Graceful short note when gallery is empty in production */
            <div className="p-12 rounded-2xl border border-dashed border-theme-border bg-theme-surface text-center space-y-3 max-w-2xl mx-auto">
              <Palette className="w-8 h-8 text-theme-rose/50 mx-auto" />
              <h4 className="font-serif font-normal text-lg text-theme-text">Curated Archive in Progress</h4>
              <p className="text-xs text-theme-muted font-sans leading-relaxed">
                Visual design specimens, brand identities, and typography explorations are currently being cataloged and prepared for exhibition.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 items-start">
              {filteredItems.map((item, index) => {
                // Asymmetric editorial rhythm: alternating 7-col, 5-col, and 12-col spans
                const spanClasses =
                  index % 3 === 0
                    ? 'lg:col-span-7'
                    : index % 3 === 1
                    ? 'lg:col-span-5'
                    : 'lg:col-span-12';

                const titleText = getContentText(item.title) || '';

                return (
                  <div key={item.id} className={spanClasses}>
                    <Card
                      withWash
                      hoverEffect
                      className="group cursor-pointer overflow-hidden p-5 sm:p-6 border-theme-border/80 bg-theme-surface flex flex-col justify-between h-full transition-all duration-300 focus-within:ring-2 focus-within:ring-theme-rose"
                      onClick={() => openLightbox(index)}
                      onMouseEnter={(e) => handleMouseEnter(titleText, e)}
                      onMouseMove={handleMouseMove}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="flex items-center justify-between text-xs font-mono text-theme-muted mb-3 border-b border-theme-border pb-2.5">
                        <span className="text-theme-rose font-semibold">{item.category}</span>
                        <div className="flex items-center gap-2">
                          {item.year && <span>{item.year}</span>}
                          {showDebug && item.isPlaceholder && (
                            <span className="px-1.5 py-0.5 rounded bg-theme-surface-elevated text-[9px] text-theme-rose border border-theme-border">
                              DEV
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Image container with clip-path reveal and next/image */}
                      <div
                        className={cn(
                          'relative w-full rounded-xl overflow-hidden bg-theme-surface-elevated border border-theme-border/60 transition-transform duration-500 ease-out group-hover:scale-[1.01]',
                          item.aspectRatio === 'landscape'
                            ? 'aspect-[16/10]'
                            : item.aspectRatio === 'square'
                            ? 'aspect-square'
                            : 'aspect-[4/5]'
                        )}
                        style={
                          isReduced
                            ? undefined
                            : {
                                clipPath: 'inset(0% 0% 0% 0% round 0.75rem)',
                              }
                        }
                      >
                        <Image
                          src={item.image}
                          alt={getContentText(item.alt) || 'Design piece'}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          placeholder="blur"
                          blurDataURL={item.blurDataUrl}
                          loading="lazy"
                        />
                      </div>

                      <div className="mt-4 space-y-1.5">
                        <h4 className="font-serif font-normal text-xl sm:text-2xl text-theme-text group-hover:text-theme-rose transition-colors">
                          <Content value={item.title} />
                        </h4>
                        <p className="text-xs text-theme-muted line-clamp-2 leading-relaxed">
                          <Content value={item.description} />
                        </p>
                      </div>

                      <div className="mt-5 pt-3 border-t border-theme-border flex items-center justify-between text-[11px] font-mono text-theme-muted">
                        <div className="flex items-center gap-1.5">
                          {item.processStages && (
                            <span className="inline-flex items-center gap-1 text-theme-rose">
                              <Sliders className="w-3 h-3" />
                              <span>Process View</span>
                            </span>
                          )}
                        </div>
                        <span className="text-theme-rose font-medium group-hover:underline flex items-center gap-1">
                          <span>Inspect Specimen</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </span>
                      </div>
                    </Card>
                  </div>
                );
              })}
            </div>
          )}
        </Container>

        {/* Narrative Bridge to Chapter 05 (Rule 5: Quiet first-person line) */}
        <Container size="lg" className="relative z-10 w-full pt-16 pb-4">
          <p className="text-sm sm:text-base font-serif italic text-theme-muted text-center sm:text-left max-w-2xl leading-relaxed">
            &ldquo;<Content value={chapter.bridge} />&rdquo;
          </p>
        </Container>
      </div>

      {/* Floating cursor lens (desktop only) */}
      {lensPos && !isReduced && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed z-40 hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-theme-surface border border-theme-rose/50 text-theme-rose text-[11px] font-mono shadow-2xl backdrop-blur-md transform -translate-x-1/2 -translate-y-12 transition-transform duration-75"
          style={{
            left: `${lensPos.x}px`,
            top: `${lensPos.y}px`,
          }}
        >
          <Eye className="w-3.5 h-3.5" />
          <span className="font-medium truncate max-w-[160px]">{lensText}</span>
        </div>
      )}

      {/* Lightbox with Focus Trap, Keyboard & Swipe Navigation */}
      <DesignLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        items={filteredItems}
        initialIndex={lightboxIndex}
      />
    </article>
  );
}
