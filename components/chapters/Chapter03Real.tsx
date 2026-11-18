'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Chapter } from '@/content/chapters';
import { projects, Project } from '@/content/projects';
import { useMotion } from '@/hooks/useMotion';
import { ChapterLabel } from '@/components/ui/ChapterLabel';
import { Container } from '@/components/ui/Container';
import { Tag } from '@/components/ui/Tag';
import { Card } from '@/components/ui/Card';
import { Sparkles, ArrowRight, ArrowDown, Layers, ArrowLeft } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

export interface Chapter03RealProps {
  chapter: Chapter;
}

export function Chapter03Real({ chapter }: Chapter03RealProps) {
  const { motionEnabled, prefersReducedMotion } = useMotion();
  const sceneRef = useRef<HTMLDivElement>(null);
  const reelRef = useRef<HTMLDivElement>(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);

  const isReduced = prefersReducedMotion || !motionEnabled;

  // Setup GSAP horizontal scroll pinning for desktop
  useEffect(() => {
    const sceneEl = sceneRef.current;
    const reelEl = reelRef.current;
    if (!sceneEl || !reelEl) return;

    // Only apply horizontal pinning on desktop (window width >= 1024)
    if (typeof window === 'undefined' || window.innerWidth < 1024 || isReduced) {
      return;
    }

    const totalScroll = reelEl.scrollWidth - window.innerWidth + 120;

    const tween = gsap.to(reelEl, {
      x: -totalScroll,
      ease: 'none',
      scrollTrigger: {
        trigger: sceneEl,
        pin: true,
        scrub: 0.6,
        start: 'top top',
        end: () => `+=${totalScroll}`,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const index = Math.min(projects.length - 1, Math.floor(self.progress * projects.length));
          setActiveProjectIndex(index);
        },
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [isReduced]);

  // Keyboard navigation for desktop reel
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveProjectIndex((prev) => Math.min(projects.length - 1, prev + 1));
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveProjectIndex((prev) => Math.max(0, prev - 1));
    }
  }, []);

  return (
    <article
      id={chapter.id}
      data-chapter="3"
      data-accent="azure"
      aria-labelledby="chapter-03-heading"
      className="relative w-full border-t border-theme-border transition-colors duration-300"
    >
      <div ref={sceneRef} className="relative w-full overflow-hidden">
        <div className="w-full min-h-screen py-16 flex flex-col justify-between bg-theme-bg/95 relative">
          {/* Azure Ambient Radial Wash */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(2,132,199,0.08)_0%,transparent_70%)]"
          />

          {/* Chapter Header */}
          <Container size="lg" className="relative z-10 w-full mb-8">
            <div className="flex items-center justify-between border-b border-theme-border pb-4 flex-wrap gap-3">
              <ChapterLabel chapter="03" timecode="00:18:00" arc={chapter.emotionalArc} />

              <div className="flex items-center gap-2">
                <Tag variant="azure" size="sm">
                  {projects.length} System Case Studies
                </Tag>
                <Tag variant="default" size="sm">
                  10-Point Engineering Framework
                </Tag>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <div>
                <h2
                  id="chapter-03-heading"
                  className="text-fluid-h1 font-serif font-black tracking-tight text-theme-text"
                >
                  {chapter.title}
                </h2>
                <p className="text-sm font-serif italic text-theme-muted mt-1">
                  {chapter.subtitle}
                </p>
              </div>

              <div className="text-xs font-mono text-theme-muted hidden lg:flex items-center gap-2">
                <span>SCENE REEL</span>
                <span className="text-theme-border-strong">·</span>
                <span>USE &larr; &rarr; TO NAVIGATE</span>
              </div>
            </div>
          </Container>

          {/* Horizontal Scene Reel (Desktop) / Vertical Stack (Mobile) */}
          <div
            tabIndex={0}
            onKeyDown={handleKeyDown}
            aria-label="Chapter 03 Project Reel. Use arrow keys to navigate projects."
            className="relative z-10 w-full focus:outline-none"
          >
            {/* Desktop Horizontal Track */}
            <div
              ref={reelRef}
              className={cn(
                'hidden lg:flex gap-8 px-12 xl:px-20 w-max items-stretch transition-transform duration-100 will-change-transform'
              )}
            >
              {projects.map((proj, idx) => (
                <ProjectSceneCard key={proj.id} project={proj} index={idx} isDesktop />
              ))}
            </div>

            {/* Mobile / Tablet Vertical Stack (No horizontal pinning) */}
            <Container size="md" className="lg:hidden space-y-8 my-6">
              {projects.map((proj, idx) => (
                <ProjectSceneCard key={proj.id} project={proj} index={idx} isDesktop={false} />
              ))}
            </Container>
          </div>

          {/* Narrative Bridge to Chapter 04 */}
          <Container size="lg" className="relative z-10 w-full pt-8">
            <div className="p-4 rounded-2xl bg-theme-surface border border-theme-border flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-chapter-accent shrink-0 mt-0.5" />
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-widest text-theme-muted">
                    Narrative Bridge &rarr; Movement IV
                  </div>
                  <p className="text-xs sm:text-sm font-serif italic text-theme-text mt-0.5">
                    &ldquo;{chapter.bridgeToNext}&rdquo;
                  </p>
                </div>
              </div>

              <a
                href="#chapter-04"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-chapter-accent hover:underline font-semibold"
              >
                <span>Continue to Chapter 04</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </a>
            </div>
          </Container>
        </div>
      </div>
    </article>
  );
}

// Subcomponent: Individual Project Scene Card
function ProjectSceneCard({
  project,
  index,
  isDesktop,
}: {
  project: Project;
  index: number;
  isDesktop: boolean;
}) {
  return (
    <Card
      withWash
      hoverEffect
      className={cn(
        'p-6 sm:p-8 flex flex-col justify-between border-theme-border/80 bg-theme-surface/90 shadow-md',
        isDesktop ? 'w-[480px] xl:w-[540px] shrink-0' : 'w-full'
      )}
    >
      <div className="space-y-4">
        {/* Card Header: Scene Code + Status Badge */}
        <div className="flex items-center justify-between border-b border-theme-border pb-3 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-theme-azure font-bold">
              SCENE 0{index + 1}
            </span>
            <span className="text-theme-border-strong select-none">/</span>
            <Tag variant="default" size="sm">
              {project.category}
            </Tag>
          </div>

          {/* Status Badge: Strictly Read From Content, Never Assumed */}
          <Tag variant="status" size="sm">
            STATUS: {project.status.toUpperCase()}
          </Tag>
        </div>

        {/* Title & Tagline */}
        <div>
          <h3 className="text-2xl font-serif font-black text-theme-text tracking-tight hover:text-theme-azure transition-colors">
            {project.title}
          </h3>
          <p className="text-xs text-theme-muted font-mono mt-1">{project.year}</p>
        </div>

        {/* One-Line Premise */}
        <div className="p-3.5 rounded-xl bg-theme-surface-elevated/70 border border-theme-border text-xs leading-relaxed space-y-1">
          <span className="font-semibold text-theme-text font-mono text-[10px] uppercase tracking-wider block">
            Core Premise
          </span>
          <p className="text-theme-muted font-serif italic">&ldquo;{project.tagline}&rdquo;</p>
        </div>

        {/* 10-Point Framework Teaser: Problem Statement */}
        <div className="space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-widest text-theme-muted">
            The Problem Tackled
          </span>
          <p className="text-xs text-theme-text line-clamp-2 leading-relaxed">
            {project.framework.problem}
          </p>
        </div>

        {/* Tech Stack Preview */}
        <div className="space-y-1.5 pt-1">
          <span className="text-[10px] font-mono uppercase tracking-widest text-theme-muted">
            Core Stack
          </span>
          <div className="flex flex-wrap gap-1.5">
            {project.framework.stack.slice(0, 4).map((tech, i) => (
              <Tag key={i} variant="default" size="sm">
                {tech}
              </Tag>
            ))}
          </div>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="mt-8 pt-4 border-t border-theme-border flex items-center justify-between flex-wrap gap-3">
        <span className="text-[11px] font-mono text-theme-muted flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-theme-azure" />
          <span>10-Point Framework</span>
        </span>

        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-semibold bg-theme-azure/10 text-theme-azure border border-theme-azure/30 hover:bg-theme-azure hover:text-white transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-azure"
        >
          <span>Read Full Case Study</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </Card>
  );
}
