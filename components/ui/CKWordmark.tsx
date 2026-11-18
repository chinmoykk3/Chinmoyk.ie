'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function CKWordmark({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Chinmoy Kalita — Home"
      className={cn(
        'group inline-flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-chapter-accent rounded-sm py-1 select-none',
        className
      )}
    >
      {/* Monogram Box */}
      <span className="flex items-center tracking-tight font-serif text-xl sm:text-2xl font-black text-theme-text group-hover:text-chapter-accent transition-colors">
        <span>C</span>
        <span className="text-theme-muted font-sans font-light text-lg -mx-0.5">/</span>
        <span>K</span>
      </span>

      {/* Decorative Gold Pulse Accent Dot */}
      <span className="w-1.5 h-1.5 rounded-full bg-theme-gold group-hover:scale-125 transition-transform" />
    </Link>
  );
}
