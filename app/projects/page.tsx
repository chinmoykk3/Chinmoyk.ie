import React from 'react';
import Link from 'next/link';
import { projects, ProjectStatus } from '@/content/projects';
import { Container } from '@/components/ui/Container';
import { Tag } from '@/components/ui/Tag';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/Card';
import { Content } from '@/components/content/Content';
import { ArrowRight, Cpu, Layers, ExternalLink, Code2 } from 'lucide-react';

export const metadata = {
  title: 'Engineering Projects & Systems — Chinmoy Kalita',
  description:
    '10-point systems architecture case studies, distributed systems, institutional platforms, and civic technologies by Chinmoy Kalita.',
  alternates: {
    canonical: '/projects',
  },
};

function getStatusBadge(status: ProjectStatus) {
  switch (status) {
    case 'completed':
      return (
        <Tag variant="azure" size="sm">
          Completed
        </Tag>
      );
    case 'in-progress':
      return (
        <Tag variant="gold" size="sm">
          In Progress
        </Tag>
      );
    case 'prototype':
      return (
        <Tag variant="rose" size="sm">
          Prototype
        </Tag>
      );
    case 'unknown':
    default:
      return null; // Requirement 6: status badge hidden when unknown
  }
}

export default function ProjectsPage() {
  return (
    <Container className="py-12 sm:py-16 space-y-16">
      {/* Header */}
      <div className="border-b border-theme-border pb-8">
        <div className="flex items-center gap-2 mb-3">
          <Tag variant="azure" size="sm">
            Engineering &amp; Architecture
          </Tag>
          <Tag variant="default" size="sm">
            10-Point Case Studies
          </Tag>
        </div>
        <h1 className="text-fluid-h1 font-serif font-black text-theme-text tracking-tight">
          Systems &amp; Architecture
        </h1>
        <p className="text-theme-muted text-sm sm:text-base max-w-2xl mt-3 leading-relaxed">
          Full-stack architectures, institutional platforms, distributed ledgers, and emergency
          civic software engineered for resilience, transparency, and real adoption.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => {
          const statusBadge = getStatusBadge(project.status);

          return (
            <Card
              key={project.id}
              className="flex flex-col justify-between hover:border-theme-azure/40 transition-all p-6 sm:p-8 space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <span className="text-xs font-mono text-theme-muted uppercase tracking-wider">
                    {project.category}
                  </span>
                  {statusBadge}
                </div>

                <div>
                  <h2 className="text-2xl font-serif font-bold text-theme-text group-hover:text-theme-azure transition-colors">
                    <Content value={project.title} />
                  </h2>
                  <p className="text-xs sm:text-sm text-theme-muted mt-2 leading-relaxed font-sans">
                    <Content value={project.tagline} />
                  </p>
                </div>

                {/* Architecture Nodes Mini-Summary */}
                <div className="p-3.5 rounded-lg bg-theme-surface-elevated border border-theme-border/70 space-y-2">
                  <span className="text-[11px] font-mono text-theme-muted uppercase tracking-wider flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-theme-azure" />
                    <span>System Nodes ({project.architectureNodes.length})</span>
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.architectureNodes.map((node) => (
                      <span
                        key={node.id}
                        className="px-2 py-0.5 rounded text-[11px] font-mono bg-theme-surface border border-theme-border text-theme-text"
                      >
                        {node.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer: Action Links */}
              <div className="pt-4 border-t border-theme-border/60 flex items-center justify-between flex-wrap gap-3">
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-2 text-xs font-mono font-medium text-theme-azure hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-azure rounded"
                >
                  <span>Read 10-Point Spec</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <div className="flex items-center gap-3">
                  {project.links?.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-theme-muted hover:text-theme-text transition-colors p-1"
                      aria-label={`${project.id} GitHub Repository`}
                    >
                      <Code2 className="w-4 h-4" />
                    </a>
                  )}
                  {project.links?.demo && (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-theme-muted hover:text-theme-azure transition-colors p-1"
                      aria-label={`${project.id} Live System`}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </Container>
  );
}
