'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Film, Compass } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ModeSwitch({ className }: { className?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  const isStory = pathname === '/';
  const isExplore = pathname.startsWith('/explore') || pathname.startsWith('/projects');

  useEffect(() => {
    setMounted(true);
    // Persist current mode choice to localStorage (SSR-safe)
    if (typeof window !== 'undefined') {
      if (pathname === '/') {
        localStorage.setItem('portfolio_mode', 'story');
      } else if (pathname.startsWith('/explore')) {
        localStorage.setItem('portfolio_mode', 'explore');
      }
    }
  }, [pathname]);

  if (!mounted) {
    return (
      <div
        className={cn(
          'w-36 h-8 rounded-full bg-theme-surface border border-theme-border animate-pulse',
          className
        )}
      />
    );
  }

  return (
    <nav
      aria-label="Experience Mode Switcher"
      className={cn(
        'inline-flex items-center p-1 rounded-full bg-theme-surface border border-theme-border shadow-sm text-xs font-mono',
        className
      )}
    >
      {/* Story Mode Button */}
      <Link
        href="/"
        aria-current={isStory ? 'page' : undefined}
        className={cn(
          'flex items-center gap-1.5 px-3 py-1 rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-chapter-accent',
          isStory
            ? 'bg-theme-text text-theme-bg font-semibold shadow-sm'
            : 'text-theme-muted hover:text-theme-text'
        )}
      >
        <Film className="w-3.5 h-3.5" />
        <span>Story</span>
      </Link>

      {/* Explore Mode Button */}
      <Link
        href="/explore"
        aria-current={isExplore ? 'page' : undefined}
        className={cn(
          'flex items-center gap-1.5 px-3 py-1 rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-chapter-accent',
          isExplore
            ? 'bg-theme-text text-theme-bg font-semibold shadow-sm'
            : 'text-theme-muted hover:text-theme-text'
        )}
      >
        <Compass className="w-3.5 h-3.5" />
        <span>Explore</span>
      </Link>
    </nav>
  );
}
