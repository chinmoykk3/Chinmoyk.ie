'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Chapter } from '@/content/chapters';
import { projects, Project } from '@/content/projects';
import { useMotion } from '@/hooks/useMotion';
import { Container } from '@/components/ui/Container';
import { Tag } from '@/components/ui/Tag';
import { Card } from '@/components/ui/Card';
import { Content } from '@/components/content/Content';
import { ArrowUpRight, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export interface Chapter03RealProps {
  chapter: Chapter;
}

export function Chapter03Real({ chapter }: Chapter03RealProps) {
  const { motionEnabled, prefersReducedMotion } = useMotion();
  const sceneRef = useRef<HTMLDivElement>(null);
  const reelRef = useRef<HTMLDivElement>(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);

  const isReduced = prefersReducedMotion || !motionEnabled;

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
    };
  }, [isReduced]);

  // Keyboard navigation for horizontal reel
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      setActiveProjectIndex((prev) => Math.min(projects.length - 1, prev + 1));
    } else if (e.key === 'ArrowLeft') {
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
        <div className="w-full min-h-screen py-16 flex flex-col justify-between relative">
          {/* Chapter Ambient Wash */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 bg-chapter-wash"
          />

          {/* Chapter Header (Rule 2: One label only) */}
          <Container size="lg" className="relative z-10 w-full mb-8">
            <div className="flex items-center justify-between border-b border-theme-border/60 pb-4 flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs uppercase tracking-widest text-chapter-accent font-medium">
                  CHAPTER 03
                </span>
                <span className="text-theme-muted/40 font-mono text-xs" aria-hidden="true">
                  ·
                </span>
                <span className="font-mono text-xs uppercase tracking-widest text-theme-muted">
                  <Content value={chapter.title} />
                </span>
              </div>

              <div className="text-xs font-mono text-theme-muted hidden lg:flex items-center gap-2">
                <span>SCENE REEL</span>
                <span className="text-theme-border-strong">·</span>
                <span>USE &larr; &rarr; TO NAVIGATE</span>
              </div>
            </div>

            <div className="mt-6">
              <h2
                id="chapter-03-heading"
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

            {/* Mobile / Tablet Vertical Stack */}
            <Container size="lg" className="flex lg:hidden flex-col gap-8">
              {projects.map((proj, idx) => (
                <ProjectSceneCard key={proj.id} project={proj} index={idx} isDesktop={false} />
              ))}
            </Container>
          </div>

          {/* Narrative Bridge to Chapter 04 (Rule 5: Quiet first-person line) */}
          <Container size="lg" className="relative z-10 w-full pt-12 pb-4">
            <p className="text-sm sm:text-base font-serif italic text-theme-muted text-center sm:text-left">
              &ldquo;<Content value={chapter.bridge} />&rdquo;
            </p>
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

          {/* Status Badge: Strictly Read From Content */}
          <Tag variant="status" size="sm">
            STATUS: {project.status.toUpperCase()}
          </Tag>
        </div>

        {/* Title */}
        <div>
          <h3 className="text-2xl font-serif font-black text-theme-text tracking-tight hover:text-theme-azure transition-colors">
            <Content value={project.title} />
          </h3>
        </div>

        {/* One-Line Premise */}
        <div className="p-3.5 rounded-xl bg-theme-surface-elevated/70 border border-theme-border text-xs leading-relaxed space-y-1">
          <span className="font-semibold text-theme-text font-mono text-[10px] uppercase tracking-wider block">
            Core Premise
          </span>
          <p className="text-theme-muted font-serif italic">
            &ldquo;<Content value={project.tagline} />&rdquo;
          </p>
        </div>

        {/* 10-Point Framework: Problem Statement */}
        <div className="space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-widest text-theme-muted">
            The Problem Tackled
          </span>
          <p className="text-xs text-theme-text line-clamp-2 leading-relaxed">
            <Content value={project.framework.problem} />
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
                <Content value={tech} />
              </Tag>
            ))}
          </div>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="mt-8 pt-4 border-t border-theme-border flex items-center justify-between flex-wrap gap-3">
        <span className="text-[11px] font-mono text-theme-muted flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-theme-azure" />
          <span>{project.architectureNodes.length} NODES</span>
        </span>

        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-wider font-semibold text-theme-azure hover:text-theme-text transition-colors group"
        >
          <span>Examine Architecture</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </Card>
  );
}
