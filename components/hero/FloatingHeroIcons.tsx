'use client';

import React from 'react';
import {
  Coffee,
  Flame,
  GitBranch,
  Lightbulb,
  Rocket,
  Sparkles,
  Terminal,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface FloatingHeroIconsProps {
  mouseOffset: { x: number; y: number };
  isReduced: boolean;
}

type DepthTier = 'far' | 'mid' | 'near';

interface FloatingItem {
  id: string;
  label: string;
  category: 'lang' | 'social' | 'motivation';
  depth: DepthTier;
  className: string;
  animClass: string;
  delay: string;
  depthFactor: number;
  hideOnMobile?: boolean;
  pillText?: string;
  render: () => React.ReactNode;
}

/* -------------------------------------------------------------------------- */
/* Custom Minimalist Brand & Language SVGs                                    */
/* -------------------------------------------------------------------------- */

function TypeScriptIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect
        x="2.5"
        y="2.5"
        width="19"
        height="19"
        rx="3.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M7.5 11.5h5M10 11.5v6.5M14.5 16.8c.5.7 1.3 1.1 2.2 1.1 1.2 0 2-.6 2-1.5 0-1-.8-1.3-1.9-1.7l-.5-.2c-.9-.3-1.5-.7-1.5-1.5 0-.9.8-1.5 1.9-1.5.8 0 1.5.3 1.9.9"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PythonIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M11.9 3C8.8 3 9 4.4 9 4.4v1.9h3v.7H6.8S4 6.7 4 9.9c0 3.2 2.4 3.1 2.4 3.1h1.4v-1.7s-.1-2.4 2.4-2.4h3.9s2.2 0 2.2-2.1V4.8S16.6 3 11.9 3Zm-1.4 1.3a.65.65 0 1 1 0 1.3.65.65 0 0 1 0-1.3Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.1 21c3.1 0 2.9-1.4 2.9-1.4v-1.9h-3v-.7h5.2s2.8.3 2.8-2.9c0-3.2-2.4-3.1-2.4-3.1h-1.4v1.7s.1 2.4-2.4 2.4H9.9s-2.2 0-2.2 2.1v2S7.4 21 12.1 21Zm1.4-1.3a.65.65 0 1 1 0-1.3.65.65 0 0 1 0 1.3Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ReactAtomIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="1.8" fill="currentColor" />
      <ellipse cx="12" cy="12" rx="10" ry="3.8" />
      <ellipse cx="12" cy="12" rx="10" ry="3.8" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="3.8" transform="rotate(120 12 12)" />
    </svg>
  );
}

function NextJsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M8.5 16V8.5l8.2 10.6M15.5 8.5v4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function XBrandIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M4.5 4.5l15 15" />
      <path d="M19.5 4.5l-15 15" />
    </svg>
  );
}

function GithubBrandIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinBrandIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function InstagramBrandIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Curated Spatial Constellation (Framing CHINMOY & Portrait without clutter) */
/* -------------------------------------------------------------------------- */

const FLOATING_ITEMS: FloatingItem[] = [
  // --- Upper Sky (Above CHINMOY headline, keeping corners clear) ---
  {
    id: 'lang-ts',
    label: 'TypeScript',
    category: 'lang',
    depth: 'near',
    className: 'top-[13%] left-[9%] sm:left-[12%]',
    animClass: 'animate-hero-float-a',
    delay: '0s',
    depthFactor: 14,
    render: () => <TypeScriptIcon className="w-4 h-4 sm:w-5 sm:h-5" />,
  },
  {
    id: 'lang-py',
    label: 'Python',
    category: 'lang',
    depth: 'mid',
    className: 'top-[17%] left-[25%]',
    animClass: 'animate-hero-float-c',
    delay: '-3.5s',
    depthFactor: 9,
    hideOnMobile: true,
    render: () => <PythonIcon className="w-4 h-4 sm:w-5 sm:h-5" />,
  },
  {
    id: 'motiv-spark',
    label: 'Craft',
    category: 'motivation',
    depth: 'far',
    className: 'top-[10%] left-[38%]',
    animClass: 'animate-hero-float-b',
    delay: '-6s',
    depthFactor: 6,
    hideOnMobile: true,
    render: () => <Sparkles className="w-4 h-4" />,
  },
  {
    id: 'motiv-rocket',
    label: 'Ship',
    category: 'motivation',
    depth: 'near',
    pillText: 'SHIP',
    className: 'top-[12%] right-[31%]',
    animClass: 'animate-hero-float-a',
    delay: '-2.2s',
    depthFactor: 13,
    hideOnMobile: true,
    render: () => <Rocket className="w-3.5 h-3.5 sm:w-4 sm:h-4" />,
  },
  {
    id: 'lang-react',
    label: 'React',
    category: 'lang',
    depth: 'near',
    className: 'top-[15%] right-[11%] sm:right-[15%]',
    animClass: 'animate-hero-float-b',
    delay: '-4.8s',
    depthFactor: 15,
    render: () => <ReactAtomIcon className="w-4 h-4 sm:w-5 sm:h-5" />,
  },
  {
    id: 'social-github',
    label: 'GitHub',
    category: 'social',
    depth: 'mid',
    className: 'top-[24%] right-[23%]',
    animClass: 'animate-hero-float-c',
    delay: '-1.5s',
    depthFactor: 10,
    hideOnMobile: true,
    render: () => <GithubBrandIcon className="w-4 h-4 sm:w-5 sm:h-5" />,
  },

  // --- Left & Right Outer Flanks (Clear of CHINMOY & Portrait) ---
  {
    id: 'motiv-coffee',
    label: 'Caffeine & Code',
    category: 'motivation',
    depth: 'mid',
    className: 'top-[27%] left-[6%] sm:left-[8%]',
    animClass: 'animate-hero-float-b',
    delay: '-1.1s',
    depthFactor: 11,
    hideOnMobile: true,
    render: () => <Coffee className="w-4 h-4 sm:w-5 sm:h-5" />,
  },
  {
    id: 'lang-nextjs',
    label: 'Next.js',
    category: 'lang',
    depth: 'far',
    className: 'top-[26%] right-[5%] sm:right-[7%]',
    animClass: 'animate-hero-float-a',
    delay: '-5.2s',
    depthFactor: 7,
    render: () => <NextJsIcon className="w-4 h-4 sm:w-5 sm:h-5" />,
  },

  // --- Lower Flanks (Framing shoulders, clear of bottom corners) ---
  {
    id: 'lang-terminal',
    label: 'Terminal',
    category: 'lang',
    depth: 'near',
    pillText: 'BUILD',
    className: 'bottom-[26%] left-[5%] sm:left-[8%]',
    animClass: 'animate-hero-float-c',
    delay: '-2.7s',
    depthFactor: 14,
    render: () => <Terminal className="w-3.5 h-3.5 sm:w-4 sm:h-4" />,
  },
  {
    id: 'social-linkedin',
    label: 'LinkedIn',
    category: 'social',
    depth: 'mid',
    className: 'bottom-[15%] left-[14%] sm:left-[18%]',
    animClass: 'animate-hero-float-a',
    delay: '-4.4s',
    depthFactor: 10,
    render: () => <LinkedinBrandIcon className="w-4 h-4 sm:w-5 sm:h-5" />,
  },
  {
    id: 'motiv-flame',
    label: 'Relentless',
    category: 'motivation',
    depth: 'far',
    className: 'bottom-[22%] left-[25%]',
    animClass: 'animate-hero-float-b',
    delay: '-7.3s',
    depthFactor: 6,
    hideOnMobile: true,
    render: () => <Flame className="w-4 h-4" />,
  },
  {
    id: 'social-x',
    label: 'X',
    category: 'social',
    depth: 'mid',
    className: 'bottom-[28%] right-[6%] sm:right-[8%]',
    animClass: 'animate-hero-float-b',
    delay: '-3.1s',
    depthFactor: 11,
    render: () => <XBrandIcon className="w-4 h-4 sm:w-5 sm:h-5" />,
  },
  {
    id: 'lang-git',
    label: 'Git',
    category: 'lang',
    depth: 'far',
    className: 'bottom-[18%] right-[16%]',
    animClass: 'animate-hero-float-c',
    delay: '-5.8s',
    depthFactor: 7,
    hideOnMobile: true,
    render: () => <GitBranch className="w-4 h-4" />,
  },
  {
    id: 'social-instagram',
    label: 'Instagram',
    category: 'social',
    depth: 'near',
    className: 'bottom-[13%] right-[24%]',
    animClass: 'animate-hero-float-a',
    delay: '-0.9s',
    depthFactor: 13,
    hideOnMobile: true,
    render: () => <InstagramBrandIcon className="w-4 h-4 sm:w-5 sm:h-5" />,
  },
  {
    id: 'motiv-zap',
    label: 'Velocity',
    category: 'motivation',
    depth: 'far',
    className: 'bottom-[34%] right-[15%]',
    animClass: 'animate-hero-float-c',
    delay: '-6.5s',
    depthFactor: 6,
    hideOnMobile: true,
    render: () => <Zap className="w-4 h-4" />,
  },
  {
    id: 'motiv-lightbulb',
    label: 'Curiosity',
    category: 'motivation',
    depth: 'mid',
    className: 'top-[22%] left-[17%]',
    animClass: 'animate-hero-float-a',
    delay: '-8.1s',
    depthFactor: 9,
    hideOnMobile: true,
    render: () => <Lightbulb className="w-4 h-4" />,
  },
];

const DEPTH_STYLES: Record<DepthTier, string> = {
  far: 'scale-90 p-1.5 border-transparent bg-transparent',
  mid: 'scale-100 rounded-xl border border-poster-cream/15 bg-poster-cream/[0.03] p-2.5 sm:p-3 backdrop-blur-[1px]',
  near: 'scale-105 rounded-xl border border-poster-cream/20 bg-poster-cream/[0.045] p-2.5 sm:p-3 backdrop-blur-[2px]',
};

const DEPTH_OPACITY_VAR: Record<DepthTier, string> = {
  far: 'var(--poster-icon-far, 0.25)',
  mid: 'var(--poster-icon-mid, 0.40)',
  near: 'var(--poster-icon-near, 0.50)',
};

export function FloatingHeroIcons({ mouseOffset, isReduced }: FloatingHeroIconsProps) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[5] overflow-hidden select-none"
    >
      {FLOATING_ITEMS.map((item) => (
        <div
          key={item.id}
          className={cn(
            'absolute transition-transform duration-500 ease-out',
            item.className,
            item.hideOnMobile && 'hidden md:block'
          )}
          style={{
            transform: !isReduced
              ? `translate3d(${mouseOffset.x * item.depthFactor}px, ${
                  mouseOffset.y * item.depthFactor
                }px, 0)`
              : 'none',
          }}
        >
          <div
            className={cn(
              'flex items-center justify-center gap-1.5',
              DEPTH_STYLES[item.depth],
              item.category === 'motivation'
                ? 'text-stage-gold/85 border-stage-gold/25'
                : 'text-poster-cream/85',
              !isReduced && item.animClass
            )}
            style={{
              opacity: DEPTH_OPACITY_VAR[item.depth],
              ...(!isReduced ? { animationDelay: item.delay } : {}),
            }}
            title={item.label}
          >
            {item.render()}
            {item.pillText && (
              <span className="font-mono text-[9px] font-semibold tracking-[0.2em] uppercase leading-none opacity-85">
                {item.pillText}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
