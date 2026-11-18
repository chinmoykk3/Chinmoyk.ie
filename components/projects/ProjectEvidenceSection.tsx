'use client';

import React from 'react';
import { ProjectEvidence } from '@/content/projects';
import { Card } from '@/components/ui/Card';
import { Tag } from '@/components/ui/Tag';
import { Image as ImageIcon, Video, GitBranch, Globe, AlertCircle, FileCheck2 } from 'lucide-react';

export interface ProjectEvidenceSectionProps {
  evidence: ProjectEvidence;
  projectTitle: string;
}

export function ProjectEvidenceSection({ evidence, projectTitle }: ProjectEvidenceSectionProps) {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-2 border-b border-theme-border pb-3">
        <div>
          <div className="flex items-center gap-2">
            <FileCheck2 className="w-5 h-5 text-theme-azure" />
            <h2 className="text-2xl font-serif font-bold text-theme-text">Empirical Evidence</h2>
          </div>
          <p className="text-xs text-theme-muted mt-1">
            Verified artifacts, repositories, demonstration recordings, and deployment evidence.
            Zero fabricated metrics.
          </p>
        </div>

        <Tag variant="azure" size="sm">
          AWAITING ARTIFACT UPLOADS
        </Tag>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Slot 1: Screenshots Evidence */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-theme-border pb-3">
            <div className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-theme-azure" />
              <h3 className="font-serif font-bold text-base text-theme-text">Visual Screenshots</h3>
            </div>
            <span className="text-[10px] font-mono uppercase text-theme-muted">
              {evidence.screenshots.length} Slots
            </span>
          </div>

          <div className="space-y-3">
            {evidence.screenshots.map((s, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-dashed border-theme-border bg-theme-surface-elevated/40 text-xs space-y-1.5"
              >
                <div className="font-semibold text-theme-text font-serif">{s.caption}</div>
                <div className="text-[11px] font-mono text-theme-ember flex items-start gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <span>Empty State: {s.placeholder}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Slot 2: Demo Video Evidence */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-theme-border pb-3">
            <div className="flex items-center gap-2">
              <Video className="w-4 h-4 text-theme-azure" />
              <h3 className="font-serif font-bold text-base text-theme-text">Demo Walkthrough</h3>
            </div>
            <span className="text-[10px] font-mono uppercase text-theme-muted">
              Video Recording
            </span>
          </div>

          <div className="p-5 rounded-xl border border-dashed border-theme-border bg-theme-surface-elevated/40 text-xs space-y-2 flex flex-col justify-center min-h-[120px]">
            <div className="font-semibold text-theme-text font-serif">
              {evidence.demoVideo.caption}
            </div>
            <div className="text-[11px] font-mono text-theme-ember flex items-start gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              <span>Empty State: {evidence.demoVideo.placeholder}</span>
            </div>
          </div>
        </Card>

        {/* Slot 3: Code Repository Evidence */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-theme-border pb-3">
            <div className="flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-theme-azure" />
              <h3 className="font-serif font-bold text-base text-theme-text">Source Code</h3>
            </div>
            <span className="text-[10px] font-mono uppercase text-theme-muted">VCS Repository</span>
          </div>

          <div className="p-4 rounded-xl border border-dashed border-theme-border bg-theme-surface-elevated/40 text-xs space-y-2">
            <div className="text-theme-muted leading-relaxed">
              Target repository for &ldquo;{projectTitle}&rdquo;
            </div>
            <div className="text-[11px] font-mono text-theme-ember flex items-start gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              <span>Empty State: {evidence.repoLink.placeholder}</span>
            </div>
          </div>
        </Card>

        {/* Slot 4: Live Deployment Evidence */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-theme-border pb-3">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-theme-azure" />
              <h3 className="font-serif font-bold text-base text-theme-text">Production Ingress</h3>
            </div>
            <span className="text-[10px] font-mono uppercase text-theme-muted">Deployment</span>
          </div>

          <div className="p-4 rounded-xl border border-dashed border-theme-border bg-theme-surface-elevated/40 text-xs space-y-2">
            <div className="text-theme-muted leading-relaxed">
              Public URL and host verification for live instances
            </div>
            <div className="text-[11px] font-mono text-theme-ember flex items-start gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              <span>Empty State: {evidence.liveLink.placeholder}</span>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
