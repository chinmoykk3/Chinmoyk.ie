'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Chapter } from '@/content/chapters';
import { designWorks, DesignWorkItem, DesignCategory } from '@/content/designWork';
import { useMotion } from '@/hooks/useMotion';
import { ChapterLabel } from '@/components/ui/ChapterLabel';
import { Container } from '@/components/ui/Container';
import { Tag } from '@/components/ui/Tag';
import { Card } from '@/components/ui/Card';
import { DesignLightbox } from '@/components/chapters/DesignLightbox';
import { Sparkles, ArrowDown, Palette, Eye, Sliders, Maximize2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

export interface Chapter04DesignProps {
  chapter: Chapter;
}

export function Chapter04Design({ chapter }: Chapter04DesignProps) {
  const { motionEnabled, prefersReducedMotion } = useMotion();
  const typoMomentRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Desktop Cursor Lens state
  const [lensPos, setLensPos] = useState<{ x: number; y: number } | null>(null);
  const [lensText, setLensText] = useState<string>('');

  const isReduced = prefersReducedMotion || !motionEnabled;

  const categories: (DesignCategory | 'All')[] = [
    'All',
    'Posters',
    'Branding',
    'Typography',
    'Visual experiments',
  ];

  const filteredItems =
    activeCategory === 'All'
      ? designWorks
      : designWorks.filter((item) => item.category === activeCategory);

  // 1. Typographic Moment Animation via GSAP ScrollTrigger
  useEffect(() => {
    const el = typoMomentRef.current;
    if (!el || isReduced) return;

    const letters = el.querySelectorAll('.typo-letter');
    if (!letters.length) return;

    gsap.set(letters, {
      y: (i) => (i % 2 === 0 ? -30 : 30),
      opacity: 0.2,
      letterSpacing: '0.3em',
    });

    const tween = gsap.to(letters, {
      y: 0,
      opacity: 1,
      letterSpacing: '0.05em',
      stagger: 0.04,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 75%',
        end: 'bottom 45%',
        scrub: 0.6,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [isReduced]);

  // 2. Cursor Lens mouse move handler
  const handleMouseMove = useCallback(
    (e: React.MouseEvent, title: string) => {
      if (isReduced) return;
      setLensPos({ x: e.clientX, y: e.clientY });
      setLensText(title);
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
      <div className="w-full py-16 relative overflow-hidden">
        {/* Chapter Ambient Wash (Token-based) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 bg-chapter-wash"
        />

        {/* Chapter Metadata Header (Rule 2: One label only) */}
        <Container size="lg" className="relative z-10 w-full mb-12">
          <div className="flex items-center justify-between border-b border-theme-border/60 pb-4 flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-widest text-chapter-accent font-medium">
                CHAPTER 04
              </span>
              <span className="text-theme-muted/40 font-mono text-xs" aria-hidden="true">
                ·
              </span>
              <span className="font-mono text-xs uppercase tracking-widest text-theme-muted">
                {chapter.title}
              </span>
            </div>
          </div>

          <div className="mt-6">
            <h2
              id="chapter-04-heading"
              className="text-fluid-h1 font-serif font-normal tracking-tight text-theme-text leading-[1.08]"
            >
              {chapter.title}
            </h2>
            {chapter.subtitle && (
              <p className="text-fluid-narration font-serif italic text-theme-muted mt-2 max-w-[32ch] leading-[1.35]">
                {chapter.subtitle}
              </p>
            )}
          </div>
        </Container>

        {/* ===================================================================
            TYPOGRAPHIC MOMENT: Dynamic rearranging letter composition
            =================================================================== */}
        <Container size="lg" className="relative z-10 w-full mb-16">
          <div
            ref={typoMomentRef}
            className="p-8 sm:p-12 rounded-3xl bg-theme-surface border border-theme-border shadow-lg relative overflow-hidden"
          >
            {/* Top Minimal Slate */}
            <div className="flex items-center justify-between text-xs font-mono text-theme-muted mb-8 border-b border-theme-border pb-3">
              <span>EXHIBITION REFLECTION · OP-04</span>
              <span className="text-theme-rose uppercase tracking-widest font-semibold">
                Typography as Architecture
              </span>
            </div>

            {/* Large Dynamic Rearranging Typographic Lockup */}
            <div
              aria-label="DESIGN AS ANOTHER LANGUAGE"
              className="text-center py-4 select-none overflow-hidden"
            >
              <div className="text-[clamp(2.5rem,8vw+0.5rem,7rem)] font-serif font-black tracking-tight leading-none text-theme-text flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-6">
                {'DESIGN'.split('').map((char, i) => (
                  <span
                    key={`d-${i}`}
                    className="typo-letter inline-block transition-transform duration-300 hover:text-theme-rose"
                  >
                    {char}
                  </span>
                ))}
              </div>

              <div className="text-[clamp(1.25rem,4vw,3.5rem)] font-mono uppercase tracking-[0.2em] text-theme-rose font-light mt-2 flex flex-wrap items-center justify-center gap-x-2">
                {'ANOTHER LANGUAGE'.split('').map((char, i) => (
                  <span
                    key={`l-${i}`}
                    className="typo-letter inline-block transition-transform duration-300"
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </div>
            </div>

            {/* Narration Thesis */}
            <div className="mt-8 pt-6 border-t border-theme-border max-w-2xl mx-auto text-center space-y-3">
              <blockquote className="text-fluid-narration font-serif italic text-theme-text leading-snug">
                &ldquo;Code instructs machines what to do. Design explains to humans why it matters.
                Design is another language of thought.&rdquo;
              </blockquote>
              <p className="text-xs text-theme-muted leading-relaxed font-sans">
                It is neither decoration nor an afterthought. In this documentary, visual form,
                editorial rhythm, and typography stand shoulder-to-shoulder with backend systems.
              </p>
            </div>
          </div>
        </Container>

        {/* ===================================================================
            CATEGORY FILTER CONTROLS
            =================================================================== */}
        <Container size="lg" className="relative z-10 w-full mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-theme-border pb-4">
            <div className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-theme-rose" />
              <h3 className="font-serif font-bold text-xl text-theme-text">Curated Gallery</h3>
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

        {/* ===================================================================
            ASYMMETRIC EDITORIAL / MASONRY GALLERY WITH CLIP-PATH REVEALS
            =================================================================== */}
        <Container size="lg" className="relative z-10 w-full">
          <div
            ref={galleryRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 items-start"
          >
            {filteredItems.map((item, index) => {
              // Asymmetric span allocation across 12-col grid
              const spanClasses =
                index % 3 === 0
                  ? 'lg:col-span-7' // wide editorial lead
                  : index % 3 === 1
                    ? 'lg:col-span-5' // compact portrait complement
                    : 'lg:col-span-6'; // balanced split

              const heightClasses =
                item.aspectRatio === 'portrait'
                  ? 'h-[380px] sm:h-[440px]'
                  : item.aspectRatio === 'landscape'
                    ? 'h-[260px] sm:h-[320px]'
                    : 'h-[320px] sm:h-[380px]';

              return (
                <div
                  key={item.id}
                  className={cn('w-full group cursor-pointer focus:outline-none', spanClasses)}
                  onClick={() => openLightbox(index)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openLightbox(index);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`View design artifact: ${item.title}`}
                  onMouseMove={(e) => handleMouseMove(e, item.title)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Card
                    withWash
                    hoverEffect
                    className="p-5 flex flex-col justify-between overflow-hidden relative border-theme-border group-hover:border-theme-rose/50 transition-all duration-300"
                  >
                    {/* Media Container with Next/Image and Clip-Path styling */}
                    <div
                      className={cn(
                        'relative w-full rounded-xl overflow-hidden bg-black/40 border border-theme-border/60 mb-4',
                        heightClasses,
                        !isReduced &&
                          'transition-all duration-500 ease-out group-hover:scale-[1.01]'
                      )}
                    >
                      <Image
                        src={item.image}
                        alt={item.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        placeholder="blur"
                        blurDataURL={item.blurDataUrl}
                        loading="lazy"
                      />

                      {/* Top Corner Badge: Process View Indicator */}
                      {item.processStages && (
                        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-[10px] font-mono text-white/90 flex items-center gap-1">
                          <Sliders className="w-3 h-3 text-theme-rose" />
                          <span>Process View</span>
                        </div>
                      )}

                      {/* Category Pill Over Image */}
                      <div className="absolute top-3 left-3">
                        <Tag variant="rose" size="sm">
                          {item.category}
                        </Tag>
                      </div>

                      {/* Hover Action Cue */}
                      <div className="absolute inset-0 bg-theme-rose/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                        <div className="px-3.5 py-1.5 rounded-full bg-theme-surface/90 backdrop-blur-md border border-theme-border text-xs font-mono font-semibold text-theme-text flex items-center gap-1.5 shadow-lg">
                          <Maximize2 className="w-3.5 h-3.5 text-theme-rose" />
                          <span>Inspect Specimen</span>
                        </div>
                      </div>
                    </div>

                    {/* Metadata & Title */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-mono text-theme-muted">
                        <span>{item.year || '2025–2026'}</span>
                        {item.isPlaceholder && (
                          <span className="text-[10px] text-theme-ember font-semibold">
                            [Placeholder Tile]
                          </span>
                        )}
                      </div>

                      <h4 className="font-serif font-bold text-lg sm:text-xl text-theme-text group-hover:text-theme-rose transition-colors">
                        {item.title}
                      </h4>

                      <p className="text-xs text-theme-muted line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Footer Deliverable Pills */}
                    <div className="mt-4 pt-3 border-t border-theme-border flex items-center justify-between text-[11px] font-mono text-theme-muted">
                      <span>{item.tools[0]}</span>
                      <span className="text-theme-rose font-semibold group-hover:underline flex items-center gap-1">
                        <span>View Piece</span> &rarr;
                      </span>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </Container>

        {/* Narrative Bridge to Chapter 05 (Rule 5: Quiet first-person line, no box, no label) */}
        <Container size="lg" className="relative z-10 w-full pt-16 pb-4">
          <p className="text-sm sm:text-base font-serif italic text-theme-muted text-center sm:text-left">
            &ldquo;{chapter.bridgeToNext}&rdquo;
          </p>
        </Container>
      </div>

      {/* ===================================================================
          DESKTOP FLOATING CURSOR LENS
          =================================================================== */}
      {lensPos && !isReduced && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed z-40 hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-theme-rose text-white text-[11px] font-mono shadow-2xl backdrop-blur-md border border-white/20 transform -translate-x-1/2 -translate-y-12 transition-transform duration-75"
          style={{
            left: `${lensPos.x}px`,
            top: `${lensPos.y}px`,
          }}
        >
          <Eye className="w-3.5 h-3.5" />
          <span className="font-semibold truncate max-w-[160px]">{lensText}</span>
        </div>
      )}

      {/* ===================================================================
          ACCESSIBLE LIGHTBOX DIALOG
          =================================================================== */}
      <DesignLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        items={filteredItems}
        initialIndex={lightboxIndex}
      />
    </article>
  );
}
