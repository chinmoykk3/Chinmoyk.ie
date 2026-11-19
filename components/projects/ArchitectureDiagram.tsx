'use client';

import React, { useRef, useState, useEffect } from 'react';
import { ArchitectureNode } from '@/content/projects';
import { useMotion } from '@/hooks/useMotion';
import { CheckCircle2, Cpu } from 'lucide-react';
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
  const showDebugLabel =
    process.env.NODE_ENV !== 'production' &&
    process.env.NEXT_PUBLIC_DEBUG_CONTENT === '1';

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

  // Phase 1 (p: 0 -> 0.35): Nodes illuminate sequentially
  // Phase 2 (p: 0.35 -> 1.0): Interconnecting bus draws from node to node
  const connectionProgress = Math.max(0, Math.min(1, (p - 0.35) / 0.65));

  return (
    <div
      ref={containerRef}
      className={cn(
        'w-full p-6 sm:p-8 rounded-2xl bg-theme-surface border border-theme-border shadow-sm space-y-6 relative overflow-hidden',
        className
      )}
    >
      {/* Top Banner */}
      <div className="flex items-center justify-between flex-wrap gap-3 border-b border-theme-border pb-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-theme-azure font-semibold block">
            System Topology Architecture
          </span>
          <h3 className="font-serif font-normal text-lg sm:text-xl text-theme-text mt-0.5">
            {projectTitle} · Data &amp; Execution Topology
          </h3>
        </div>

        {/* Dev-only placeholder label: only visible when NEXT_PUBLIC_DEBUG_CONTENT=1 */}
        {showDebugLabel && (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-theme-surface-elevated border border-theme-border text-theme-muted text-[11px] font-mono">
            <Cpu className="w-3 h-3 text-theme-azure shrink-0" />
            <span>TODO: Architecture topology diagram</span>
          </div>
        )}
      </div>

      {/* Interactive Self-Drawing Architectural Canvas */}
      <div className="relative w-full py-2 flex flex-col items-center">
        {/* Responsive Node Cards */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
          {nodes.map((node, index) => {
            const nodeThreshold = index * 0.1;
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
                  <div className="font-serif font-normal text-sm sm:text-base text-theme-text">
                    {node.label}
                  </div>
                  <div className="text-[11px] font-mono text-theme-muted">{node.sublabel}</div>
                </div>

                <div className="mt-3 pt-2 border-t border-theme-border/60 flex items-center justify-between text-[10px] font-mono text-theme-muted">
                  <span>State: Active</span>
                  <CheckCircle2
                    className={cn(
                      'w-3.5 h-3.5 transition-colors duration-300',
                      isNodeActive ? 'text-theme-azure' : 'text-theme-border'
                    )}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Interconnection Vector Line (Desktop Connecting Bus) */}
        <div aria-hidden="true" className="w-full my-4 hidden lg:block relative h-6">
          <svg viewBox="0 0 800 24" className="w-full h-full overflow-visible">
            {/* Background dashed route */}
            <line
              x1="60"
              y1="12"
              x2="740"
              y2="12"
              stroke="var(--color-border)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            {/* Animated drawing connection line */}
            <line
              x1="60"
              y1="12"
              x2="740"
              y2="12"
              stroke="var(--color-azure)"
              strokeWidth="2"
              strokeDasharray="680"
              strokeDashoffset={isReduced ? 0 : Math.max(0, 680 * (1 - connectionProgress))}
              strokeLinecap="round"
            />
            {/* Pulse packet travelling along connection */}
            {connectionProgress > 0.05 && connectionProgress < 0.98 && (
              <circle
                cx={60 + 680 * connectionProgress}
                cy="12"
                r="3.5"
                fill="var(--color-azure)"
              />
            )}
          </svg>
        </div>

        {/* Descriptive Architecture Summary */}
        <p className="text-xs text-theme-muted text-center max-w-xl mx-auto pt-2 leading-relaxed">
          The topology demonstrates client ingress through the service gateway, executing
          deterministic state synchronization against the verified data store.
        </p>
      </div>
    </div>
  );
}
