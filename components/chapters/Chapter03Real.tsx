'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { Chapter } from '@/content/chapters';
import {
  FALLBACK_GITHUB_REPOS,
  fetchGitHubRepos,
  GITHUB_PROFILE_URL,
  GITHUB_USERNAME,
  GitHubRepo,
} from '@/lib/github';
import { Container } from '@/components/ui/Container';
import { ChapterTitleCard } from '@/components/motion/ChapterTitleCard';
import { Content } from '@/components/content/Content';
import { usePolish } from '@/components/polish/PolishContext';
import {
  ArrowUpRight,
  ExternalLink,
  FolderGit2,
  GitFork,
  RefreshCw,
  Star,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Chapter03RealProps {
  chapter: Chapter;
}

const LANG_DOT_CLASS: Record<string, string> = {
  TypeScript: 'bg-sunrise-azure',
  JavaScript: 'bg-sunrise-gold',
  Python: 'bg-sunrise-iris',
  CSS: 'bg-sunrise-rose',
  HTML: 'bg-sunrise-ember',
};

export function Chapter03Real({ chapter }: Chapter03RealProps) {
  const { triggerLowerThird } = usePolish();

  const [repos, setRepos] = useState<GitHubRepo[]>(FALLBACK_GITHUB_REPOS);
  const [isLiveSynced, setIsLiveSynced] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [selectedLang, setSelectedLang] = useState<string>('All');

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

  const totalStars = useMemo(
    () => repos.reduce((sum, r) => sum + r.stargazers_count, 0),
    [repos]
  );

  return (
    <article
      id={chapter.id}
      data-chapter="3"
      data-accent="azure"
      aria-labelledby="chapter-03-heading"
      className="relative w-full border-t border-theme-border transition-colors duration-300"
    >
      <div className="w-full min-h-[100dvh] py-16 sm:py-24 flex flex-col justify-between relative">
        {/* Chapter Ambient Wash */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 bg-chapter-wash"
        />

        {/* Chapter Header + Live GitHub Status Bar */}
        <Container size="lg" className="relative z-10 w-full mb-10 space-y-6">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <ChapterTitleCard
              id="chapter-03-heading"
              number={chapter.number}
              title={chapter.title}
              subtitle={chapter.subtitle}
              arc={chapter.emotionalArc}
              accentKey={chapter.accentKey}
            />

            {/* Live GitHub Source Badge + Sync Button */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <a
                href={GITHUB_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-theme-border bg-theme-surface/80 font-mono text-[11px] text-theme-text hover:border-theme-azure/60 transition-colors"
              >
                <span
                  className={cn(
                    'w-2 h-2 rounded-full',
                    isLiveSynced ? 'bg-sunrise-azure animate-pulse' : 'bg-theme-muted'
                  )}
                />
                <span>github.com/{GITHUB_USERNAME}</span>
                <ArrowUpRight className="w-3 h-3 text-theme-azure" />
              </a>

              <button
                type="button"
                onClick={syncFromGitHub}
                disabled={isSyncing}
                aria-label="Refresh repositories from GitHub"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-theme-border bg-theme-surface/80 font-mono text-[11px] text-theme-muted hover:text-theme-azure hover:border-theme-azure/50 transition-colors cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={cn('w-3 h-3', isSyncing && 'animate-spin')} />
                <span>{isSyncing ? 'Syncing' : 'Sync'}</span>
              </button>
            </div>
          </div>

          {/* Language Filter Pills + Repo Telemetry */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-theme-border/60">
            <div
              className="flex flex-wrap items-center gap-1.5"
              role="group"
              aria-label="Filter GitHub repositories by language"
            >
              {languages.map((lang) => {
                const active = selectedLang === lang;
                return (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setSelectedLang(lang)}
                    className={cn(
                      'px-3 py-1 rounded-full border font-mono text-[11px] transition-all cursor-pointer',
                      active
                        ? 'border-theme-azure bg-theme-azure/15 text-theme-azure font-medium'
                        : 'border-theme-border bg-theme-surface/60 text-theme-muted hover:text-theme-text hover:border-theme-azure/40'
                    )}
                  >
                    {lang}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-4 font-mono text-[11px] text-theme-muted">
              <span>
                REPOS: <strong className="text-theme-text">{filteredRepos.length}</strong>
              </span>
              <span>
                STARS: <strong className="text-theme-azure">{totalStars}</strong>
              </span>
            </div>
          </div>
        </Container>

        {/* GitHub Projects Grid */}
        <Container size="lg" className="relative z-10 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {filteredRepos.map((repo, idx) => {
              const langDot =
                (repo.language && LANG_DOT_CLASS[repo.language]) || 'bg-theme-azure';

              return (
                <div
                  key={repo.id}
                  onMouseEnter={() =>
                    triggerLowerThird({
                      title: repo.name,
                      subtitle: repo.description || `GitHub · ${repo.language || 'Repository'}`,
                      category: repo.language || 'GitHub',
                    })
                  }
                  className="group relative rounded-2xl border border-theme-border bg-theme-surface/85 backdrop-blur-sm p-6 flex flex-col justify-between transition-all duration-300 hover:border-theme-azure/60 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <div className="space-y-4">
                    {/* Top Row: Index + Language + Stars/Forks */}
                    <div className="flex items-center justify-between gap-2 pb-3 border-b border-theme-border/70">
                      <div className="flex items-center gap-2 font-mono text-[11px]">
                        <span className="text-theme-azure font-bold">
                          0{idx + 1}
                        </span>
                        <span className="text-theme-border-strong">/</span>
                        {repo.language && (
                          <span className="inline-flex items-center gap-1.5 text-theme-muted">
                            <span className={cn('w-2 h-2 rounded-full', langDot)} />
                            <span>{repo.language}</span>
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3 font-mono text-[11px] text-theme-muted">
                        <span className="inline-flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-theme-azure" />
                          <span>{repo.stargazers_count}</span>
                        </span>
                        {repo.forks_count > 0 && (
                          <span className="inline-flex items-center gap-1">
                            <GitFork className="w-3.5 h-3.5" />
                            <span>{repo.forks_count}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Repo Name */}
                    <div className="flex items-center gap-2.5">
                      <FolderGit2 className="w-5 h-5 text-theme-azure shrink-0" />
                      <h3 className="text-xl sm:text-2xl font-serif font-normal text-theme-text tracking-tight group-hover:text-theme-azure transition-colors truncate">
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="focus:outline-none focus-visible:underline"
                        >
                          {repo.name}
                        </a>
                      </h3>
                    </div>

                    {/* Repo Description */}
                    <p className="text-sm text-theme-muted leading-relaxed line-clamp-2 min-h-[2.5rem]">
                      {repo.description ||
                        `${repo.language || 'Software'} project hosted on GitHub under @${GITHUB_USERNAME}.`}
                    </p>
                  </div>

                  {/* Footer Actions: Source Code + Live Demo */}
                  <div className="mt-6 pt-3.5 border-t border-theme-border/60 flex items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-wider">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-theme-azure hover:text-theme-text transition-colors font-semibold"
                    >
                      <span>Source Code</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>

                    {repo.homepage ? (
                      <a
                        href={repo.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-theme-text hover:text-theme-azure transition-colors"
                      >
                        <span>Live Demo</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="text-theme-muted/60 text-[10px]">
                        @{GITHUB_USERNAME}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Link to full 10-point Case Studies Hub */}
          <div className="mt-8 flex justify-end">
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.18em] text-theme-azure hover:text-theme-text transition-colors"
            >
              <span>Deep-Dive Architecture Case Studies</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </Container>

        {/* Narrative Bridge to Chapter 04 */}
        <Container size="lg" className="relative z-10 w-full pt-12 pb-4">
          <p className="text-sm sm:text-base font-serif italic text-theme-muted text-center sm:text-left max-w-2xl leading-relaxed">
            &ldquo;<Content value={chapter.bridge} />&rdquo;
          </p>
        </Container>
      </div>
    </article>
  );
}
