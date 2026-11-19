'use client';

import React from 'react';
import { ProjectEvidence } from '@/content/projects';
import { Card } from '@/components/ui/Card';
import { Image as ImageIcon, Video, GitBranch, Globe, ExternalLink, FileCheck2 } from 'lucide-react';

export interface ProjectEvidenceSectionProps {
  evidence?: ProjectEvidence | null;
  links?: {
    demo?: string;
    github?: string;
    caseStudy?: string;
  };
  projectTitle: string;
}

export function ProjectEvidenceSection({
  evidence,
  links,
  projectTitle,
}: ProjectEvidenceSectionProps) {
  const showDebug =
    process.env.NODE_ENV !== 'production' &&
    process.env.NEXT_PUBLIC_DEBUG_CONTENT === '1';

  // Check which concrete evidence items are actually populated with real URLs
  const validScreenshots = (evidence?.screenshots || []).filter(
    (s) => s.url && s.url.trim().length > 0
  );
  const hasDemoVideo = Boolean(evidence?.demoVideo?.url && evidence.demoVideo.url.trim().length > 0);
  const repoUrl = links?.github || evidence?.repoLink?.url;
  const hasRepo = Boolean(repoUrl && repoUrl.trim().length > 0);
  const liveUrl = links?.demo || evidence?.liveLink?.url;
  const hasLive = Boolean(liveUrl && liveUrl.trim().length > 0);

  const hasAnyConcreteEvidence =
    validScreenshots.length > 0 || hasDemoVideo || hasRepo || hasLive;

  // In production: if all evidence slots are empty, omit the entire section
  if (!hasAnyConcreteEvidence) {
    if (!showDebug) return null;

    return (
      <section className="p-4 rounded-xl border border-dashed border-theme-border bg-theme-surface/50 text-xs font-mono text-theme-muted flex items-center justify-between">
        <span>TODO: Evidence slots pending for &ldquo;{projectTitle}&rdquo; (screenshots, video, repo, deployment)</span>
        <span className="px-2 py-0.5 rounded bg-theme-surface-elevated text-[10px] text-theme-muted">
          DEV ONLY
        </span>
      </section>
    );
  }

  return (
    <section className="space-y-6 scroll-mt-24" id="section-evidence">
      <div className="flex items-center justify-between flex-wrap gap-2 border-b border-theme-border pb-3">
        <div className="flex items-center gap-2">
          <FileCheck2 className="w-5 h-5 text-theme-azure" />
          <h2 className="text-xl sm:text-2xl font-serif font-normal text-theme-text">
            Empirical Evidence
          </h2>
        </div>
        <span className="text-[11px] font-mono uppercase text-theme-muted tracking-wider">
          Verified Deliverables
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Slot 1: Screenshots Evidence (only rendered if URLs exist) */}
        {validScreenshots.length > 0 && (
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-theme-border pb-3">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-theme-azure" />
                <h3 className="font-serif font-normal text-base text-theme-text">Visual Captures</h3>
              </div>
              <span className="text-[10px] font-mono uppercase text-theme-muted">
                {validScreenshots.length} Captures
              </span>
            </div>

            <div className="space-y-3">
              {validScreenshots.map((s, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl border border-theme-border bg-theme-surface-elevated text-xs space-y-1"
                >
                  <div className="font-medium text-theme-text">{s.caption}</div>
                  {s.url && (
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-theme-azure hover:underline inline-flex items-center gap-1 font-mono text-[11px]"
                    >
                      <span>View screenshot</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Slot 2: Demo Video Evidence (only rendered if URL exists) */}
        {hasDemoVideo && (
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-theme-border pb-3">
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-theme-azure" />
                <h3 className="font-serif font-normal text-base text-theme-text">Walkthrough Recording</h3>
              </div>
              <span className="text-[10px] font-mono uppercase text-theme-muted">Video</span>
            </div>

            <div className="p-4 rounded-xl border border-theme-border bg-theme-surface-elevated text-xs space-y-2">
              <div className="font-medium text-theme-text">
                {evidence?.demoVideo?.caption || 'Walkthrough demo'}
              </div>
              <a
                href={evidence?.demoVideo?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-theme-azure hover:underline"
              >
                <span>Watch video recording</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </Card>
        )}

        {/* Slot 3: Code Repository Evidence (only rendered if URL exists) */}
        {hasRepo && (
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-theme-border pb-3">
              <div className="flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-theme-azure" />
                <h3 className="font-serif font-normal text-base text-theme-text">Source Code</h3>
              </div>
              <span className="text-[10px] font-mono uppercase text-theme-muted">VCS Repository</span>
            </div>

            <div className="p-4 rounded-xl border border-theme-border bg-theme-surface-elevated text-xs space-y-2">
              <div className="text-theme-muted">
                Repository for &ldquo;{projectTitle}&rdquo;
              </div>
              <a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-theme-azure hover:underline"
              >
                <span>Explore repository on GitHub</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </Card>
        )}

        {/* Slot 4: Live Deployment Evidence (only rendered if URL exists) */}
        {hasLive && (
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-theme-border pb-3">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-theme-azure" />
                <h3 className="font-serif font-normal text-base text-theme-text">Production Ingress</h3>
              </div>
              <span className="text-[10px] font-mono uppercase text-theme-muted">Deployment</span>
            </div>

            <div className="p-4 rounded-xl border border-theme-border bg-theme-surface-elevated text-xs space-y-2">
              <div className="text-theme-muted">
                Verified live application deployment
              </div>
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-theme-azure hover:underline"
              >
                <span>Launch live instance</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </Card>
        )}
      </div>
    </section>
  );
}
