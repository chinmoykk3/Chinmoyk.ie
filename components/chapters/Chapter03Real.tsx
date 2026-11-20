'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Chapter } from '@/content/chapters';
import { projects, Project } from '@/content/projects';
import { useMotion } from '@/hooks/useMotion';
import { Container } from '@/components/ui/Container';
import { Tag } from '@/components/ui/Tag';
import { Card } from '@/components/ui/Card';
import { ChapterTitleCard } from '@/components/motion/ChapterTitleCard';
import { Content } from '@/components/content/Content';
import { isContentRenderable, getContentText } from '@/content/schema';
import { usePolish } from '@/components/polish/PolishContext';
import { ArrowUpRight, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface Chapter03RealProps {
  chapter: Chapter;
}

export function Chapter03Real({ chapter }: Chapter03RealProps) {
  const { motionEnabled, prefersReducedMotion } = useMotion();
  const { triggerLowerThird } = usePolish();
  const sceneRef = useRef<HTMLDivElement>(null);
  const reelRef = useRef<HTMLDivElement>(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);

  const isReduced = prefersReducedMotion || !motionEnabled;

  const notifyProjectChange = useCallback((index: number) => {
    setActiveProjectIndex(index);
    const p = projects[index];
    if (p) {
      const titleStr = getContentText(p.title) || '';
      const taglineStr = getContentText(p.tagline) || '';
      triggerLowerThird({
        title: titleStr,
        subtitle: taglineStr,
        category: p.category,
      });
    }
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('story:project-change', {
          detail: { index },
        })
      );
    }
  }, [triggerLowerThird]);

  useEffect(() => {
    const sceneEl = sceneRef.current;
    const reelEl = reelRef.current;
    if (!sceneEl || !reelEl) return;

    // Only apply horizontal pinning on desktop (window width >= 1024) and when motion is enabled
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
          notifyProjectChange(index);
        },
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
    };
  }, [isReduced, notifyProjectChange]);

  // Keyboard navigation for horizontal reel
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        const nextIdx = Math.min(projects.length - 1, activeProjectIndex + 1);
        notifyProjectChange(nextIdx);
      } else if (e.key === 'ArrowLeft') {
        const prevIdx = Math.max(0, activeProjectIndex - 1);
        notifyProjectChange(prevIdx);
      }
    },
    [activeProjectIndex, notifyProjectChange]
  );

  return (
    <article
      id={chapter.id}
      data-chapter="3"
      data-accent="azure"
      aria-labelledby="chapter-03-heading"
      className="relative w-full border-t border-theme-border transition-colors duration-300"
    >
      <div ref={sceneRef} className="relative w-full overflow-hidden">
        <div className="w-full min-h-[100dvh] py-16 sm:py-24 flex flex-col justify-between relative">
          {/* Chapter Ambient Wash */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 bg-chapter-wash"
          />

          {/* Chapter Header (Rule 2: One label only, Instrument Serif title) */}
          <Container size="lg" className="relative z-10 w-full mb-10">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <ChapterTitleCard
                id="chapter-03-heading"
                number={chapter.number}
                title={chapter.title}
                subtitle={chapter.subtitle}
                arc={chapter.emotionalArc}
                accentKey={chapter.accentKey}
              />

              <div className="text-xs font-mono text-theme-muted hidden lg:flex items-center gap-2 pt-2">
                <span className="text-chapter-accent font-semibold">SCENE REEL</span>
                <span className="text-theme-border-strong select-none">·</span>
                <span>USE &larr; &rarr; TO NAVIGATE</span>
              </div>
            </div>
          </Container>

          {/* Horizontal Scene Reel (Desktop) / Vertical Stack (Mobile) */}
          <div
            tabIndex={0}
            onKeyDown={handleKeyDown}
            aria-label="Chapter 03 Project Reel. Use left and right arrow keys to navigate projects."
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
                <ProjectSceneCard
                  key={proj.id}
                  project={proj}
                  index={idx}
                  isActive={idx === activeProjectIndex}
                  isDesktop
                />
              ))}
            </div>

            {/* Mobile / Tablet Vertical Stack */}
            <Container size="lg" className="flex lg:hidden flex-col gap-8">
              {projects.map((proj, idx) => (
                <ProjectSceneCard
                  key={proj.id}
                  project={proj}
                  index={idx}
                  isActive={idx === activeProjectIndex}
                  isDesktop={false}
                />
              ))}
            </Container>
          </div>

          {/* Narrative Bridge to Chapter 04 (Rule 5: Quiet first-person line, unlabeled) */}
          <Container size="lg" className="relative z-10 w-full pt-16 pb-4">
            <p className="text-sm sm:text-base font-serif italic text-theme-muted text-center sm:text-left max-w-2xl leading-relaxed">
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
  isActive,
  isDesktop,
}: {
  project: Project;
  index: number;
  isActive: boolean;
  isDesktop: boolean;
}) {
  // Status badge mapping: strictly hide when status is "unknown" or empty
  const statusLabel =
    project.status === 'completed'
      ? 'Completed'
      : project.status === 'in-progress'
      ? 'In progress'
      : project.status === 'prototype'
      ? 'Prototype'
      : null;

  // Filter confirmed/draft stack tags only (empty/placeholders render nothing in production)
  const renderableStack = project.framework.stack.filter(isContentRenderable);

  return (
    <Card
      withWash
      hoverEffect
      data-cursor="view"
      data-cursor-label="SPEC"
      className={cn(
        'p-6 sm:p-8 flex flex-col justify-between border-theme-border/80 bg-theme-surface/90 shadow-md transition-all duration-300 focus-within:ring-2 focus-within:ring-theme-azure',
        isDesktop ? 'w-[480px] xl:w-[540px] shrink-0' : 'w-full',
        isActive ? 'border-theme-azure/40' : 'border-theme-border'
      )}
    >
      <div className="space-y-5">
        {/* Card Header: Scene Code + Category + Optional Status Badge */}
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

          {/* Status Badge: strictly hidden when status is "unknown" */}
          {statusLabel && (
            <Tag variant="status" size="sm">
              {statusLabel}
            </Tag>
          )}
        </div>

        {/* Title */}
        <div>
          <h3 className="text-2xl sm:text-3xl font-serif font-normal text-theme-text tracking-tight hover:text-theme-azure transition-colors">
            <Link
              href={`/projects/${project.slug}`}
              className="focus:outline-none focus-visible:underline"
            >
              <Content value={project.title} />
            </Link>
          </h3>
        </div>

        {/* One-Line Premise from content */}
        <div className="p-4 rounded-xl bg-theme-surface-elevated/70 border border-theme-border text-xs leading-relaxed space-y-1">
          <span className="font-semibold text-theme-azure font-mono text-[10px] uppercase tracking-wider block">
            Core Premise
          </span>
          <p className="text-theme-text font-serif italic text-sm leading-relaxed">
            &ldquo;<Content value={project.tagline} />&rdquo;
          </p>
        </div>

        {/* 10-Point Framework: Problem Statement (only rendered if non-empty / renderable) */}
        {isContentRenderable(project.framework.problem) && (
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-theme-muted">
              The Problem Tackled
            </span>
            <p className="text-xs text-theme-text line-clamp-2 leading-relaxed">
              <Content value={project.framework.problem} />
            </p>
          </div>
        )}

        {/* Tech Stack Preview (only rendered if confirmed / renderable tags exist) */}
        {renderableStack.length > 0 && (
          <div className="space-y-1.5 pt-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-theme-muted">
              Core Stack
            </span>
            <div className="flex flex-wrap gap-1.5">
              {renderableStack.slice(0, 4).map((tech, i) => (
                <Tag key={i} variant="default" size="sm">
                  <Content value={tech} />
                </Tag>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Card Action Footer */}
      <div className="mt-8 pt-4 border-t border-theme-border flex items-center justify-between flex-wrap gap-3">
        <span className="text-[11px] font-mono text-theme-muted flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-theme-azure" />
          <span>{project.architectureNodes.length} TOPOLOGY NODES</span>
        </span>

        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider font-semibold text-theme-azure hover:text-theme-text transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-azure rounded px-2 py-1"
        >
          <span>Examine Architecture</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </Card>
  );
}
