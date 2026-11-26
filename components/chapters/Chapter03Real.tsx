'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Chapter } from '@/content/chapters';
import {
  FALLBACK_GITHUB_REPOS,
  fetchGitHubRepos,
  GITHUB_PROFILE_URL,
  GITHUB_USERNAME,
  GitHubRepo,
} from '@/lib/github';
import { useMotion } from '@/hooks/useMotion';
import { Content } from '@/components/content/Content';
import { usePolish } from '@/components/polish/PolishContext';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  Copy,
  ExternalLink,
  FolderGit2,
  GitBranch,
  GitCommitHorizontal,
  GitFork,
  RefreshCw,
  Rocket,
  Star,
  Terminal,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Chapter03RealProps {
  chapter: Chapter;
}

const LANG_DOT_CLASS: Record<string, string> = {
  TypeScript: 'bg-stage-azure',
  JavaScript: 'bg-cinema-gold',
  Python: 'bg-stage-iris',
  CSS: 'bg-stage-rose',
  HTML: 'bg-stage-ember',
};

const FLOATING_DEV_GLYPHS = [
  { id: 'g-1', pos: 'top-[12%] left-[5%]', anim: 'animate-ch02-vibe-1', delay: '0s', tag: 'GIT', icon: <GitBranch className="w-4 h-4" /> },
  { id: 'g-2', pos: 'top-[16%] right-[6%]', anim: 'animate-ch02-vibe-2', delay: '-1.4s', tag: 'SHIP', icon: <Rocket className="w-4 h-4" /> },
  { id: 'g-3', pos: 'top-[48%] left-[3%]', anim: 'animate-ch02-vibe-3', delay: '-2.8s', tag: 'CODE', icon: <Code2 className="w-4 h-4" /> },
  { id: 'g-4', pos: 'top-[52%] right-[4%]', anim: 'animate-ch02-vibe-1', delay: '-0.9s', tag: 'MAIN', icon: <GitCommitHorizontal className="w-4 h-4" /> },
  { id: 'g-5', pos: 'bottom-[16%] left-[7%]', anim: 'animate-ch02-vibe-2', delay: '-3.4s', tag: 'CLI', icon: <Terminal className="w-4 h-4" /> },
  { id: 'g-6', pos: 'bottom-[14%] right-[8%]', anim: 'animate-ch02-vibe-3', delay: '-2.1s', tag: 'REPO', icon: <FolderGit2 className="w-4 h-4" /> },
];

export function Chapter03Real({ chapter }: Chapter03RealProps) {
  const { motionEnabled, prefersReducedMotion } = useMotion();
  const { triggerLowerThird } = usePolish();
  const isReduced = prefersReducedMotion || !motionEnabled;

  const [repos, setRepos] = useState<GitHubRepo[]>(FALLBACK_GITHUB_REPOS);
  const [isLiveSynced, setIsLiveSynced] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [selectedLang, setSelectedLang] = useState<string>('All');
  const [activeIndex, setActiveIndex] = useState(0);
  const [copiedClone, setCopiedClone] = useState(false);

  const syncFromGitHub = useCallback(async () => {
    setIsSyncing(true);
    const { repos: fetched, live } = await fetchGitHubRepos();
    setRepos(fetched);
    setIsLiveSynced(live);
    setIsSyncing(false);
  }, []);

  useEffect(() => {
    syncFromGitHub();
  }, [syncFromGitHub]);

  const languages = useMemo(() => {
    const langs = Array.from(
      new Set(repos.map((r) => r.language).filter((l): l is string => Boolean(l)))
    );
    return ['All', ...langs];
  }, [repos]);

  const filteredRepos = useMemo(() => {
    if (selectedLang === 'All') return repos;
    return repos.filter((r) => r.language === selectedLang);
  }, [repos, selectedLang]);

  // Clamp activeIndex if filter changes
  const safeIndex = Math.min(activeIndex, Math.max(0, filteredRepos.length - 1));
  const activeRepo = filteredRepos[safeIndex] || filteredRepos[0];

  const selectRepo = useCallback(
    (idx: number) => {
      const clamped = (idx + filteredRepos.length) % filteredRepos.length;
      setActiveIndex(clamped);
      setCopiedClone(false);
      const r = filteredRepos[clamped];
      if (r) {
        triggerLowerThird({
          title: r.name,
          subtitle: r.description || `github.com/${GITHUB_USERNAME}`,
          category: r.language || 'GitHub',
        });
      }
    },
    [filteredRepos, triggerLowerThird]
  );

  const handleCopyClone = () => {
    if (!activeRepo || typeof navigator === 'undefined') return;
    navigator.clipboard?.writeText(`git clone ${activeRepo.html_url}.git`).catch(() => {});
    setCopiedClone(true);
    setTimeout(() => setCopiedClone(false), 1800);
  };

  const totalStars = useMemo(
    () => repos.reduce((sum, r) => sum + r.stargazers_count, 0),
    [repos]
  );

  const backdropWord = activeRepo?.language?.toUpperCase() || 'SHIPPED';

  return (
    <article
      id={chapter.id}
      data-chapter="3"
      data-accent="azure"
      aria-labelledby="chapter-03-heading"
      className="relative w-full min-h-[100dvh] bg-cinema-bg text-cinema-text py-20 sm:py-28 px-5 sm:px-10 lg:px-16 overflow-hidden border-t border-cinema-border/40 select-none"
    >
      {/* Dynamic Azure Spotlight Wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 65% 55% at 62% 50%, color-mix(in srgb, var(--color-accent-azure) 14%, transparent) 0%, transparent 75%)',
        }}
      />

      {/* Subtle Engineering Blueprint Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          opacity: 'var(--stage-grid-opacity, 0.06)',
          backgroundImage:
            'linear-gradient(to right, var(--color-accent-azure) 1px, transparent 1px), linear-gradient(to bottom, var(--color-accent-azure) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />

      {/* Giant Kinetic Outlined Backdrop Typography */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-word-${backdropWord}`}
          aria-hidden="true"
          initial={!isReduced ? { opacity: 0, scale: 1.06 } : false}
          animate={{ opacity: 1, scale: 1 }}
          exit={!isReduced ? { opacity: 0 } : undefined}
          transition={{ duration: 0.5 }}
          className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden"
        >
          <span
            className="font-display font-bold uppercase tracking-tight leading-none whitespace-nowrap"
            style={{
              fontFamily: "'Bebas Neue', 'Oswald', 'Impact', sans-serif",
              fontSize: 'clamp(5.5rem, 22vw, 22rem)',
              WebkitTextStroke: '1.5px var(--color-accent-azure)',
              color: 'transparent',
              opacity: 'var(--stage-watermark-opacity, 0.12)',
            }}
          >
            {backdropWord}
          </span>
        </motion.div>
      </AnimatePresence>

      {/* Outlined "03" Watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-6 left-6 sm:top-10 sm:left-12 z-0 opacity-20"
      >
        <span
          className="font-serif font-normal block"
          style={{
            fontSize: 'clamp(4.5rem, 11vw, 9.5rem)',
            lineHeight: 0.9,
            fontVariantNumeric: 'lining-nums',
            WebkitTextStroke: '1px var(--color-accent-azure)',
            color: 'transparent',
          }}
        >
          03
        </span>
      </div>

      {/* Floating GitHub & Engineering Glyphs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 overflow-hidden hidden lg:block">
        {FLOATING_DEV_GLYPHS.map((g) => (
          <div key={g.id} className={cn('absolute', g.pos)}>
            <div
              className={cn(
                'flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-stage-azure/25 bg-stage-azure/10 text-stage-azure/80 backdrop-blur-sm opacity-65',
                !isReduced && g.anim
              )}
              style={!isReduced ? { animationDelay: g.delay } : undefined}
            >
              {g.icon}
              <span className="font-mono text-[9px] font-semibold tracking-[0.18em]">
                {g.tag}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* MAIN CONTENT CONTAINER */}
      <div className="relative z-20 max-w-6xl mx-auto flex flex-col justify-between space-y-12">
        {/* TOP HEADER + LIVE GITHUB STATUS */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2.5">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-stage-azure">
                CHAPTER 03
              </span>
              <span className="h-px w-8 bg-cinema-border" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cinema-muted">
                LIVE GITHUB REPOSITORIES
              </span>
            </div>

            <h2
              id="chapter-03-heading"
              className="text-fluid-h1 font-serif font-normal tracking-tight text-cinema-text leading-[1.06]"
            >
              <Content value={chapter.title} />
            </h2>
          </div>

          {/* GitHub Live Sync & Stats */}
          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href={GITHUB_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cinema-border bg-cinema-surface/70 backdrop-blur-sm font-mono text-[11px] text-cinema-text hover:border-stage-azure/60 transition-colors"
            >
              <span
                className={cn(
                  'w-2 h-2 rounded-full',
                  isLiveSynced ? 'bg-stage-azure animate-pulse' : 'bg-cinema-muted'
                )}
              />
              <span>@{GITHUB_USERNAME}</span>
              <span className="text-cinema-muted">·</span>
              <span className="text-stage-azure">{repos.length} repos</span>
              <span className="text-cinema-muted">·</span>
              <span className="text-cinema-gold">{totalStars}★</span>
            </a>

            <button
              type="button"
              onClick={syncFromGitHub}
              disabled={isSyncing}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-cinema-border bg-cinema-surface/70 font-mono text-[11px] text-cinema-muted hover:text-stage-azure hover:border-stage-azure/50 transition-colors cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={cn('w-3 h-3', isSyncing && 'animate-spin')} />
              <span>{isSyncing ? 'Syncing' : 'Sync'}</span>
            </button>
          </div>
        </header>

        {/* LANGUAGE FILTER BAR */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-cinema-border/60">
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by language">
            {languages.map((lang) => {
              const active = selectedLang === lang;
              return (
                <button
                  key={lang}
                  type="button"
                  onClick={() => {
                    setSelectedLang(lang);
                    setActiveIndex(0);
                  }}
                  className={cn(
                    'px-3 py-1 rounded-full border font-mono text-[11px] transition-all cursor-pointer',
                    active
                      ? 'border-stage-azure bg-stage-azure/15 text-stage-azure'
                      : 'border-cinema-border/70 bg-cinema-surface/40 text-cinema-muted hover:text-cinema-text hover:border-stage-azure/40'
                  )}
                >
                  {lang}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px] text-cinema-muted">
            <button
              type="button"
              onClick={() => selectRepo(safeIndex - 1)}
              aria-label="Previous repository"
              className="p-1.5 rounded-full border border-cinema-border hover:border-stage-azure/60 hover:text-stage-azure transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 text-cinema-text">
              0{safeIndex + 1} / 0{filteredRepos.length}
            </span>
            <button
              type="button"
              onClick={() => selectRepo(safeIndex + 1)}
              aria-label="Next repository"
              className="p-1.5 rounded-full border border-cinema-border hover:border-stage-azure/60 hover:text-stage-azure transition-colors cursor-pointer"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* ASYMMETRIC SPLIT SPOTLIGHT STAGE (Left Rail + Open Cinematic Showcase) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT RAIL: Repository Index List */}
          <nav
            aria-label="GitHub Repositories"
            className="lg:col-span-4 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0"
          >
            {filteredRepos.map((repo, idx) => {
              const isSelected = idx === safeIndex;
              const dotClass =
                (repo.language && LANG_DOT_CLASS[repo.language]) || 'bg-stage-azure';

              return (
                <button
                  key={repo.id}
                  type="button"
                  onClick={() => selectRepo(idx)}
                  className={cn(
                    'shrink-0 lg:w-full text-left px-4 py-3 rounded-xl border transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer',
                    isSelected
                      ? 'border-stage-azure/70 bg-stage-azure/10 text-cinema-text shadow-[0_0_24px_rgba(76,141,255,0.12)]'
                      : 'border-cinema-border/50 bg-cinema-surface/30 text-cinema-muted hover:text-cinema-text hover:border-cinema-border'
                  )}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className={cn('font-mono text-[10px]', isSelected ? 'text-stage-azure font-bold' : 'text-cinema-muted/60')}>
                      0{idx + 1}
                    </span>
                    <span className="font-sans text-sm font-medium truncate">
                      {repo.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 font-mono text-[10px]">
                    {repo.language && (
                      <span className={cn('w-2 h-2 rounded-full', dotClass)} title={repo.language} />
                    )}
                    {repo.stargazers_count > 0 && (
                      <span className="text-cinema-gold">{repo.stargazers_count}★</span>
                    )}
                  </div>
                </button>
              );
            })}
          </nav>

          {/* RIGHT MAIN STAGE: Open Borderless Cinematic Spotlight */}
          <div className="lg:col-span-8 min-h-[320px] flex flex-col justify-center">
            {activeRepo && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeRepo.id}
                  initial={!isReduced ? { opacity: 0, y: 20, filter: 'brightness(1.4)' } : false}
                  animate={{ opacity: 1, y: 0, filter: 'brightness(1)' }}
                  exit={!isReduced ? { opacity: 0, y: -14 } : undefined}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-6"
                >
                  {/* Open Editorial Title Block with Vertical Azure Rule */}
                  <div className="border-l-2 border-stage-azure pl-5 sm:pl-7 space-y-3">
                    <div className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-[0.2em]">
                      <span className="text-stage-azure">
                        REPO 0{safeIndex + 1}
                      </span>
                      {activeRepo.language && (
                        <>
                          <span className="text-cinema-border-strong">/</span>
                          <span className="inline-flex items-center gap-1.5 text-cinema-text">
                            <span
                              className={cn(
                                'w-2 h-2 rounded-full',
                                LANG_DOT_CLASS[activeRepo.language] || 'bg-stage-azure'
                              )}
                            />
                            {activeRepo.language}
                          </span>
                        </>
                      )}
                      <span className="text-cinema-border-strong">/</span>
                      <span className="inline-flex items-center gap-1 text-cinema-gold">
                        <Star className="w-3.5 h-3.5" />
                        {activeRepo.stargazers_count}
                      </span>
                      {activeRepo.forks_count > 0 && (
                        <span className="inline-flex items-center gap-1 text-cinema-muted">
                          <GitFork className="w-3.5 h-3.5" />
                          {activeRepo.forks_count}
                        </span>
                      )}
                    </div>

                    <h3
                      className="font-serif text-cinema-text tracking-tight leading-[1.02] break-words"
                      style={{ fontSize: 'clamp(2.4rem, 5vw, 4.25rem)' }}
                    >
                      {activeRepo.name}
                    </h3>

                    <p className="font-sans text-sm sm:text-base text-cinema-muted max-w-2xl leading-relaxed">
                      {activeRepo.description ||
                        `Open-source ${activeRepo.language || 'software'} repository engineered by Chinmoy Kalita on GitHub.`}
                    </p>
                  </div>

                  {/* Interactive Clone CLI Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 rounded-xl border border-stage-azure/30 bg-cinema-surface/70 backdrop-blur-md font-mono text-xs">
                    <div className="flex items-center gap-2.5 text-cinema-muted truncate">
                      <Terminal className="w-4 h-4 text-stage-azure shrink-0" />
                      <span className="truncate">
                        <span className="text-stage-azure">$</span> git clone {activeRepo.html_url}.git
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyClone}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-cinema-border bg-cinema-bg/70 text-[10px] uppercase tracking-wider text-cinema-text hover:border-stage-azure/60 hover:text-stage-azure transition-colors cursor-pointer shrink-0"
                    >
                      {copiedClone ? (
                        <>
                          <Check className="w-3 h-3 text-stage-azure" />
                          <span className="text-stage-azure">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Prominent Direct CTAs */}
                  <div className="flex flex-wrap items-center gap-4 pt-1">
                    <a
                      href={activeRepo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stage-azure text-cinema-bg font-mono text-xs font-semibold uppercase tracking-[0.16em] hover:opacity-90 transition-opacity"
                    >
                      <span>View on GitHub</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>

                    {activeRepo.homepage && (
                      <a
                        href={activeRepo.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-stage-azure/50 bg-stage-azure/10 text-stage-azure font-mono text-xs font-semibold uppercase tracking-[0.16em] hover:bg-stage-azure/20 transition-colors"
                      >
                        <span>Launch Live App</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}

                    <Link
                      href="/projects"
                      className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.16em] text-cinema-muted hover:text-cinema-text transition-colors ml-auto"
                    >
                      <span>Case Studies</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>

        {/* Narrative Bridge to Chapter 04 */}
        <footer className="pt-8 border-t border-cinema-border/40">
          <p className="text-sm sm:text-base font-serif italic text-cinema-muted max-w-2xl leading-relaxed">
            &ldquo;<Content value={chapter.bridge} />&rdquo;
          </p>
        </footer>
      </div>
    </article>
  );
}
