'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { ArrowDown, MoveRight } from 'lucide-react';
import { useMotion } from '@/hooks/useMotion';
import { cn } from '@/lib/utils';
import { FloatingHeroIcons } from './FloatingHeroIcons';

interface EditorialPosterHeroProps {
  firstName?: string;
  fullName?: string;
  role?: string;
  website?: string;
  nextSectionId?: string;
}

export function EditorialPosterHero({
  firstName = 'CHINMOY',
  fullName = 'Chinmoy Kalita',
  role = 'Creative Technologist',
  website = 'chinmoyk.ie',
  nextSectionId = 'chapter-01',
}: EditorialPosterHeroProps) {
  const { motionEnabled, prefersReducedMotion, lenis } = useMotion();
  const heroRef = useRef<HTMLDivElement>(null);

  // Mouse parallax offset (-1 to 1)
  const [mouseOffset, setMouseOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const isReduced = prefersReducedMotion || !motionEnabled;

  // Smooth mouse movement for 3D parallax depth
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isReduced || !heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMouseOffset({ x, y });
    },
    [isReduced]
  );

  const handleMouseLeave = useCallback(() => {
    setMouseOffset({ x: 0, y: 0 });
  }, []);

  // Smooth scroll handler to the first story chapter
  const handleScrollToNext = useCallback(
    (e?: React.MouseEvent) => {
      if (e) e.preventDefault();
      try {
        sessionStorage.setItem('story_intro_seen', 'true');
      } catch {}

      const el = document.getElementById(nextSectionId);
      if (el) {
        if (lenis && motionEnabled) {
          lenis.scrollTo(el, { duration: 1.2, offset: -40 });
        } else {
          el.scrollIntoView({ behavior: motionEnabled ? 'smooth' : 'auto' });
        }
        if (typeof window !== 'undefined') {
          window.history.pushState(null, '', `#${nextSectionId}`);
        }
      }
    },
    [lenis, motionEnabled, nextSectionId]
  );

  const typographyStyle: React.CSSProperties = {
    fontFamily: "'Bebas Neue', 'Oswald', 'Impact', sans-serif",
    letterSpacing: '0.02em',
    lineHeight: 0.9,
  };

  return (
    <section
      ref={heroRef}
      id="prologue"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-chapter="0"
      aria-label={`${fullName} — Editorial Hero`}
      className={cn(
        'relative w-full h-[calc(100dvh-4rem)] min-h-[580px] max-h-[1440px] flex flex-col justify-between items-center select-none overflow-hidden bg-poster-bg text-poster-cream'
      )}
    >
      {/* Subtle Studio Spotlight Glow behind subject */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-60"
        style={{
          background: 'var(--color-poster-spotlight)',
        }}
      />

      {/* 35mm Procedural Film Grain Overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-20 mix-blend-screen bg-repeat"
        style={{
          backgroundImage:
            'radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* ---------------------------------------------------------------------- */}
      {/* LAYER 0.5: Floating Background Icons (Languages, Social, Motivation)   */}
      {/* ---------------------------------------------------------------------- */}
      <FloatingHeroIcons mouseOffset={mouseOffset} isReduced={isReduced} />

      {/* ---------------------------------------------------------------------- */}
      {/* LAYER 1: Background Solid Typography ("CHINMOY")                        */}
      {/* ---------------------------------------------------------------------- */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center transition-transform duration-300 ease-out"
        style={{
          transform: !isReduced
            ? `translate3d(${-mouseOffset.x * 6}px, ${-mouseOffset.y * 4}px, 0)`
            : 'none',
        }}
      >
        <h1
          className="font-display font-bold uppercase tracking-tight text-poster-cream leading-none whitespace-nowrap select-none text-[clamp(4.25rem,20.5vw,23rem)]"
          style={typographyStyle}
        >
          {firstName}
        </h1>
      </div>

      {/* ---------------------------------------------------------------------- */}
      {/* LAYER 2: Middle Cutout Portrait (Chinmoy)                              */}
      {/* ---------------------------------------------------------------------- */}
      <div
        className="pointer-events-none absolute inset-0 z-20 flex items-end justify-center overflow-hidden transition-transform duration-300 ease-out"
        style={{
          transform: !isReduced
            ? `translate3d(${mouseOffset.x * 8}px, ${mouseOffset.y * 6}px, 0)`
            : 'none',
        }}
      >
        <div className="relative flex items-end justify-center max-h-full">
          {/* Robust direct image rendering ensuring zero layout collapse */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/media/chinmoy-portrait-tight.png"
            alt={fullName}
            className="h-[68vh] sm:h-[75vh] md:h-[80vh] max-h-[860px] w-auto max-w-full object-contain object-bottom select-none block"
          />

          {/* Smooth bottom edge fade so blazer blends flawlessly into pure black */}
          <div
            aria-hidden="true"
            className="absolute bottom-0 inset-x-0 h-16 sm:h-24 bg-gradient-to-t from-poster-bg via-poster-bg/70 to-transparent pointer-events-none"
          />
        </div>
      </div>

      {/* ---------------------------------------------------------------------- */}
      {/* LAYER 3: Foreground Outlined Typography (Text Stroke on top of person) */}
      {/* ---------------------------------------------------------------------- */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center transition-transform duration-300 ease-out"
        style={{
          transform: !isReduced
            ? `translate3d(${-mouseOffset.x * 6}px, ${-mouseOffset.y * 4}px, 0)`
            : 'none',
        }}
      >
        <span
          className="font-display font-bold uppercase tracking-tight poster-text-stroke leading-none whitespace-nowrap select-none text-[clamp(4.25rem,20.5vw,23rem)]"
          style={typographyStyle}
        >
          {firstName}
        </span>
      </div>

      {/* ---------------------------------------------------------------------- */}
      {/* LAYER 4: Interactive UI Overlay (4 Editorial Corners)                  */}
      {/* ---------------------------------------------------------------------- */}
      <div className="relative z-40 w-full h-full flex flex-col justify-between p-6 sm:p-8 md:p-10 pointer-events-none">
        {/* TOP ROW */}
        <div className="w-full flex items-center justify-between pointer-events-auto">
          {/* Top-Left: Role / Specialization */}
          <div className="flex flex-col">
            <span className="font-sans text-xs sm:text-sm font-medium tracking-[0.22em] uppercase text-poster-muted">
              {role}
            </span>
          </div>

          {/* Top-Right: Editorial Arrow CTA */}
          <a
            href={`#${nextSectionId}`}
            onClick={handleScrollToNext}
            aria-label="Explore Chinmoy's documentary portfolio"
            className="group inline-flex items-center gap-2.5 text-poster-cream hover:opacity-80 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-gold rounded-sm py-1 px-1.5"
          >
            <span className="hidden sm:inline-block font-mono text-[11px] tracking-[0.25em] uppercase text-poster-muted group-hover:text-poster-cream transition-colors">
              Explore
            </span>
            <div className="relative w-8 sm:w-10 h-5 flex items-center">
              <MoveRight className="w-6 sm:w-8 h-4 sm:h-5 transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
            </div>
          </a>
        </div>

        {/* BOTTOM ROW */}
        <div className="w-full flex items-end justify-between pointer-events-auto">
          {/* Bottom-Left: Full Name */}
          <div className="flex flex-col">
            <span className="font-sans text-xs sm:text-sm font-medium tracking-[0.16em] text-poster-muted">
              {fullName}
            </span>
          </div>

          {/* Center Discreet Story Cue */}
          <div className="hidden md:flex flex-col items-center">
            <button
              type="button"
              onClick={handleScrollToNext}
              aria-label="Scroll to begin story"
              className="group flex flex-col items-center gap-1.5 text-xs font-mono uppercase tracking-[0.2em] text-poster-muted hover:text-poster-cream transition-colors py-2"
            >
              <span className="text-[10px] tracking-[0.25em] opacity-60 group-hover:opacity-100 transition-opacity">
                Begin Story
              </span>
              <ArrowDown className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-y-0.5 transition-all" />
            </button>
          </div>

          {/* Bottom-Right: Website Domain / Link */}
          <div>
            <Link
              href="/contact"
              className="font-mono text-xs sm:text-sm tracking-[0.14em] text-poster-muted hover:text-poster-cream transition-colors"
            >
              {website}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
