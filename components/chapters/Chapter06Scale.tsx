'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Chapter } from '@/content/chapters';
import { timeline, TimelineMilestone } from '@/content/timeline';
import { hasBeyondContent } from '@/content/beyond';
import { useMotion } from '@/hooks/useMotion';
import { Container } from '@/components/ui/Container';
import { ChapterTitleCard } from '@/components/motion/ChapterTitleCard';
import { Content } from '@/components/content/Content';
import { isContentRenderable, draft } from '@/content/schema';
import { Sparkles, Film, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface Chapter06ScaleProps {
  chapter: Chapter;
}

export function Chapter06Scale({ chapter }: Chapter06ScaleProps) {
  const { motionEnabled, prefersReducedMotion } = useMotion();
  const sceneRef = useRef<HTMLElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const [activeFrameIndex, setActiveFrameIndex] = useState(0);

  const isReduced = prefersReducedMotion || !motionEnabled;

  // Filter frames: frames with no confirmed/draft text are skipped
  const validFrames = timeline.filter(
    (item) => isContentRenderable(item.title) && isContentRenderable(item.summary)
  );

  // Desktop Pinned Contact-Sheet Film Strip
  useEffect(() => {
    const sceneEl = sceneRef.current;
    const stripEl = stripRef.current;
    if (!sceneEl || !stripEl || isReduced || typeof window === 'undefined') return;

    if (window.innerWidth < 1024) return;

    const totalDistance = stripEl.scrollHeight - window.innerHeight + 240;
    if (totalDistance <= 0) return;

    const tween = gsap.to(stripEl, {
      y: -totalDistance,
      ease: 'none',
      scrollTrigger: {
        trigger: sceneEl,
        pin: true,
        scrub: 0.5,
        start: 'top top',
        end: () => `+=${totalDistance}`,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const idx = Math.min(
            validFrames.length - 1,
            Math.floor(self.progress * validFrames.length)
          );
          setActiveFrameIndex(idx);
        },
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
    };
  }, [isReduced, validFrames.length]);

  return (
    <article
      ref={sceneRef}
      id={chapter.id}
      data-chapter="6"
      data-accent="gold-ember"
      aria-labelledby="chapter-06-heading"
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
          <div className="flex items-start justify-between flex-wrap gap-4">
            <ChapterTitleCard
              id="chapter-06-heading"
              number={chapter.number}
              title={chapter.title}
              subtitle={chapter.subtitle}
              arc={chapter.emotionalArc}
              accentKey={chapter.accentKey}
            />

            <div className="text-xs font-mono text-theme-muted hidden lg:flex items-center gap-2 pt-2">
              <Film className="w-3.5 h-3.5 text-theme-gold" />
              <span className="text-theme-gold uppercase tracking-widest font-semibold">
                35MM CONTACT SHEET
              </span>
              <span className="text-theme-border-strong select-none">·</span>
              <span className="tabular-nums">
                FRAME 0{activeFrameIndex + 1} OF 0{validFrames.length}
              </span>
            </div>
          </div>
        </Container>

        {/* CONTACT-SHEET FILM STRIP (Pinned on Desktop, Stacked on Mobile) */}
        <Container size="lg" className="relative z-10 w-full">
          {/* Desktop Pinned Film Strip Viewport */}
          <div className="hidden lg:block relative w-full h-[70vh] overflow-hidden rounded-3xl border border-theme-border bg-theme-surface/90 shadow-2xl">
            {/* Film Sprocket Perforations Header */}
            <div
              aria-hidden="true"
              className="w-full h-8 bg-theme-surface-elevated border-b border-theme-border flex items-center justify-between px-6 select-none"
            >
              <div className="flex items-center gap-4 text-[10px] font-mono text-theme-muted tracking-widest">
                <span>KODAK TRI-X 400</span>
                <span>EMULSION BEAT</span>
              </div>
              <div className="flex items-center gap-3">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-3 h-4 rounded-sm border border-theme-border/80 bg-theme-bg"
                  />
                ))}
              </div>
            </div>

            {/* Scrolling Film Strip Inner Container */}
            <div ref={stripRef} className="p-8 sm:p-12 space-y-12 will-change-transform">
              {validFrames.map((frame, idx) => (
                <FilmFrameCard
                  key={frame.id}
                  frame={frame}
                  index={idx}
                  isActive={idx === activeFrameIndex}
                />
              ))}
            </div>

            {/* Film Sprocket Perforations Footer */}
            <div
              aria-hidden="true"
              className="absolute bottom-0 inset-x-0 w-full h-8 bg-theme-surface-elevated border-t border-theme-border flex items-center justify-between px-6 select-none z-10"
            >
              <div className="flex items-center gap-3">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-3 h-4 rounded-sm border border-theme-border/80 bg-theme-bg"
                  />
                ))}
              </div>
              <span className="text-[10px] font-mono text-theme-gold tracking-widest">
                CONTINUOUS EXPOSURE
              </span>
            </div>
          </div>

          {/* Mobile / Tablet Vertical Stacked Frames */}
          <div className="flex lg:hidden flex-col gap-6">
            {validFrames.map((frame, idx) => (
              <FilmFrameCard
                key={frame.id}
                frame={frame}
                index={idx}
                isActive={idx === activeFrameIndex}
              />
            ))}
          </div>
        </Container>

        {/* Narrative Bridge (Rule 5: Quiet first-person line, unlabeled) */}
        <Container size="lg" className="relative z-10 w-full pt-16 pb-4">
          <p className="text-sm sm:text-base font-serif italic text-theme-muted text-center sm:text-left max-w-2xl leading-relaxed">
            &ldquo;
            <Content
              value={
                hasBeyondContent()
                  ? chapter.bridge
                  : draft('Every milestone behind me is only preparation for what comes next.')
              }
            />
            &rdquo;
          </p>
        </Container>
      </div>
    </article>
  );
}

// Subcomponent: Individual Contact-Sheet Film Frame
function FilmFrameCard({
  frame,
  index,
  isActive,
}: {
  frame: TimelineMilestone;
  index: number;
  isActive: boolean;
}) {
  const frameCode = `0${frame.frameNumber || index + 1}A`;

  return (
    <div
      className={cn(
        'p-6 sm:p-8 rounded-2xl border transition-all duration-300 relative bg-theme-surface shadow-sm',
        isActive ? 'border-theme-gold/50 shadow-md ring-1 ring-theme-gold/20' : 'border-theme-border'
      )}
    >
      {/* Frame Slate Meta */}
      <div className="flex items-center justify-between border-b border-theme-border pb-3 flex-wrap gap-2 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="text-theme-gold font-bold uppercase tracking-widest">
            FRAME {frameCode}
          </span>
          <span className="text-theme-border-strong select-none">·</span>
          <span className="text-theme-muted uppercase tracking-wider">{frame.stage}</span>
        </div>

        {frame.yearOrPeriod && (
          <span className="text-theme-muted px-2 py-0.5 rounded bg-theme-surface-elevated border border-theme-border text-[11px]">
            <Content value={frame.yearOrPeriod} />
          </span>
        )}
      </div>

      {/* Frame Narrative */}
      <div className="mt-4 space-y-3">
        <h3 className="text-xl sm:text-2xl font-serif font-normal text-theme-text tracking-tight">
          <Content value={frame.title} />
        </h3>

        <p className="text-xs sm:text-sm text-theme-muted font-sans leading-relaxed">
          <Content value={frame.summary} />
        </p>

        {/* "What it changed in me" Callout */}
        {frame.whatItChanged && isContentRenderable(frame.whatItChanged) && (
          <div className="mt-4 p-4 rounded-xl bg-theme-surface-elevated/80 border border-theme-border space-y-1.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-theme-gold font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-theme-gold" />
              <span>What It Changed In Me</span>
            </span>
            <p className="text-theme-text font-serif italic text-xs sm:text-sm leading-relaxed">
              &ldquo;<Content value={frame.whatItChanged} />&rdquo;
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
