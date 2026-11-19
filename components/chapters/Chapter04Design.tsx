'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Chapter } from '@/content/chapters';
import { designWork, DesignWorkItem, DesignCategory } from '@/content/designWork';
import { useMotion } from '@/hooks/useMotion';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Content } from '@/components/content/Content';
import { NarrationText } from '@/components/ui/NarrationText';
import { getContentText } from '@/content/schema';
import { Palette, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DesignLightbox } from './DesignLightbox';

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
  const galleryRef = useRef<HTMLDivElement>(null);

  const isReduced = prefersReducedMotion || !motionEnabled;

  const categories = ['All', 'Posters', 'Branding', 'Typography', 'Visual experiments'];

  const filteredItems =
    activeCategory === 'All'
      ? designWork
      : designWork.filter((item) => item.category === activeCategory);

  // 1. Dynamic rearranging letter composition (Scroll-triggered kinetic typography)
  useEffect(() => {
    if (isReduced) return;

    const typoEl = typoMomentRef.current;
    if (!typoEl) return;

    const letters = lettersRef.current.filter(Boolean) as HTMLSpanElement[];
    if (letters.length === 0) return;

    const ctx = gsap.context(() => {
      // Letters assemble from slight random offsets and rotations into sharp grid alignment
      gsap.fromTo(
        letters,
        {
          x: () => (Math.random() - 0.5) * 80,
          y: () => (Math.random() - 0.5) * 80,
          rotation: () => (Math.random() - 0.5) * 35,
          opacity: 0.2,
          scale: 0.85,
        },
        {
          x: 0,
          y: 0,
          rotation: 0,
          opacity: 1,
          scale: 1,
          ease: 'power3.out',
          stagger: {
            each: 0.03,
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
      <div className="w-full py-16 relative overflow-hidden">
        {/* Chapter Ambient Wash */}
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
                <Content value={chapter.title} />
              </span>
            </div>
          </div>

          <div className="mt-6">
            <h2
              id="chapter-04-heading"
              className="text-fluid-h1 font-serif font-normal tracking-tight text-theme-text leading-[1.08]"
            >
              <Content value={chapter.title} />
            </h2>
            {chapter.subtitle && (
              <p className="text-fluid-narration font-serif italic text-theme-muted mt-2 max-w-[32ch] leading-[1.35]">
                <Content value={chapter.subtitle} />
              </p>
            )}
          </div>
        </Container>

        {/* TYPOGRAPHIC MOMENT */}
        <Container size="lg" className="relative z-10 w-full mb-16">
          <div
            ref={typoMomentRef}
            className="p-8 sm:p-12 rounded-3xl bg-theme-surface border border-theme-border shadow-lg relative overflow-hidden"
          >
            <div className="flex items-center justify-between text-xs font-mono text-theme-muted mb-8 border-b border-theme-border pb-3">
              <span>EXHIBITION REFLECTION · OP-04</span>
              <span className="text-theme-rose uppercase tracking-widest font-semibold">
                Typography as Architecture
              </span>
            </div>

            <div
              aria-label="DESIGN AS ANOTHER LANGUAGE"
              className="text-center py-4 select-none overflow-hidden"
            >
              <div className="text-fluid-display font-serif font-bold tracking-tight text-theme-text uppercase flex flex-wrap justify-center gap-x-3 sm:gap-x-5 leading-none">
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

            {/* Verified Narration or Quiet dev placeholder */}
            {chapter.narration[0] && (
              <div className="mt-8 pt-6 border-t border-theme-border max-w-2xl mx-auto text-center">
                <NarrationText value={chapter.narration[0]} />
              </div>
            )}
          </div>
        </Container>

        {/* CATEGORY FILTER CONTROLS */}
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

        {/* GALLERY */}
        <Container size="lg" className="relative z-10 w-full">
          <div
            ref={galleryRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 items-start"
          >
            {filteredItems.map((item, index) => {
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
                    className="group cursor-pointer overflow-hidden p-4 sm:p-5 border-theme-border/80 bg-theme-surface flex flex-col justify-between h-full"
                    onClick={() => openLightbox(index)}
                    onMouseEnter={(e) => handleMouseEnter(titleText, e)}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="flex items-center justify-between text-xs font-mono text-theme-muted mb-3 border-b border-theme-border pb-2">
                      <span className="text-theme-rose font-semibold">{item.category}</span>
                      <span>PIECE 0{index + 1}</span>
                    </div>

                    <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-theme-surface-elevated border border-theme-border/60">
                      <Image
                        src={item.image}
                        alt={getContentText(item.alt) || 'Design piece'}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    </div>

                    <div className="mt-4 space-y-1">
                      <h4 className="font-serif font-bold text-xl text-theme-text group-hover:text-theme-rose transition-colors">
                        <Content value={item.title} />
                      </h4>
                      <p className="text-xs text-theme-muted line-clamp-2 leading-relaxed">
                        <Content value={item.description} />
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-theme-border flex items-center justify-between text-[11px] font-mono text-theme-muted">
                      <span>{getContentText(item.tools[0]) || ''}</span>
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

        {/* Narrative Bridge to Chapter 05 (Rule 5: Quiet first-person line) */}
        <Container size="lg" className="relative z-10 w-full pt-16 pb-4">
          <p className="text-sm sm:text-base font-serif italic text-theme-muted text-center sm:text-left">
            &ldquo;<Content value={chapter.bridge} />&rdquo;
          </p>
        </Container>
      </div>

      {/* Floating cursor lens */}
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

      {/* Lightbox */}
      <DesignLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        items={filteredItems}
        initialIndex={lightboxIndex}
      />
    </article>
  );
}
