'use client';

import React, { useRef, useState, useEffect } from 'react';
import { ArchitectureNode } from '@/content/projects';
import { useMotion } from '@/hooks/useMotion';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

export interface ArchitectureDiagramProps {
  nodes: ArchitectureNode[];
  projectTitle: string;
  className?: string;
}

export function ArchitectureDiagram({ nodes, projectTitle, className }: ArchitectureDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { motionEnabled, prefersReducedMotion } = useMotion();
  const [progress, setProgress] = useState(0);

  const isReduced = prefersReducedMotion || !motionEnabled;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (isReduced) {
      setProgress(1);
      return;
    }

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      end: 'bottom 40%',
      scrub: 0.5,
      onUpdate: (self) => {
        setProgress(self.progress);
      },
    });

    return () => {
      trigger.kill();
    };
  }, [isReduced]);

  const p = isReduced ? 1 : progress;

  // Nodes render in order 0 -> 4
  // Phase 1 (p: 0 -> 0.4): Nodes illuminate
  // Phase 2 (p: 0.4 -> 1.0): Interconnecting bus paths draw from node to node

  const connectionProgress = Math.max(0, Math.min(1, (p - 0.3) / 0.7));

  return (
    <div
      ref={containerRef}
      className={cn(
        'w-full p-6 sm:p-8 rounded-2xl bg-theme-surface border border-theme-border shadow-sm space-y-6 relative overflow-hidden',
        className
      )}
    >
      {/* Top Banner: Explicitly Labelled Placeholder */}
      <div className="flex items-center justify-between flex-wrap gap-3 border-b border-theme-border pb-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-theme-azure font-semibold block">
            System Topology Architecture
          </span>
          <h3 className="font-serif font-bold text-lg text-theme-text mt-0.5">
            {projectTitle} · Data & Execution Flow
          </h3>
        </div>

        {/* Mandatory Label: [Diagram placeholder] */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-theme-ember/10 border border-theme-ember/30 text-theme-ember text-xs font-mono font-semibold">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>[Diagram placeholder]</span>
        </div>
      </div>

      {/* Interactive Self-Drawing SVG Architectural Canvas */}
      <div className="relative w-full py-4 flex flex-col items-center">
        {/* Horizontal Node Flow for Desktop, Staggered Flow for Mobile */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
          {nodes.map((node, index) => {
            const nodeThreshold = index * 0.12;
            const isNodeActive = isReduced || p >= nodeThreshold;

            return (
              <div
                key={node.id}
                className={cn(
                  'p-4 rounded-xl border transition-all duration-500 relative flex flex-col justify-between',
                  isNodeActive
                    ? 'bg-theme-surface-elevated border-theme-azure/40 shadow-sm opacity-100 translate-y-0'
                    : 'bg-theme-surface/40 border-theme-border/40 opacity-30 translate-y-2'
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-theme-azure font-bold">
                    Node 0{index + 1}
                  </span>
                  <span className="text-[9px] font-mono uppercase text-theme-muted px-1.5 py-0.5 rounded bg-theme-surface border border-theme-border">
                    {node.type}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="font-serif font-bold text-sm text-theme-text">{node.label}</div>
                  <div className="text-[11px] font-mono text-theme-muted">{node.sublabel}</div>
                </div>

                <div className="mt-3 pt-2 border-t border-theme-border/60 flex items-center justify-between text-[10px] font-mono text-theme-muted">
                  <span>State: Synchronized</span>
                  <CheckCircle2
                    className={cn(
                      'w-3 h-3 transition-colors',
                      isNodeActive ? 'text-theme-azure' : 'text-theme-border'
                    )}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Interconnection Vector Line (Desktop Connecting Pipe) */}
        <div aria-hidden="true" className="w-full my-4 hidden lg:block relative h-6">
          <svg viewBox="0 0 800 24" className="w-full h-full overflow-visible">
            {/* Background connection route */}
            <line
              x1="50"
              y1="12"
              x2="750"
              y2="12"
              stroke="var(--color-border)"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            {/* Animated drawing connection */}
            <line
              x1="50"
              y1="12"
              x2="750"
              y2="12"
              stroke="var(--color-azure)"
              strokeWidth="2.5"
              strokeDasharray="700"
              strokeDashoffset={isReduced ? 0 : Math.max(0, 700 * (1 - connectionProgress))}
              strokeLinecap="round"
            />
            {/* Pulse packets */}
            {connectionProgress > 0.1 && (
              <circle
                cx={50 + 700 * connectionProgress}
                cy="12"
                r="4"
                fill="var(--color-azure)"
                className="animate-ping"
              />
            )}
          </svg>
        </div>

        {/* Narrative Flow Description */}
        <p className="text-xs text-theme-muted text-center max-w-xl mx-auto pt-2 leading-relaxed">
          The diagram illustrates the linear and bidirectional flow from the client ingress tier
          through the verification and routing gateway, executing state transitions on the
          underlying store.
        </p>
      </div>
    </div>
  );
}
