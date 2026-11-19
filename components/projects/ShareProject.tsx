'use client';

import React, { useState } from 'react';
import { Share2, Check, Copy } from 'lucide-react';

export interface ShareProjectProps {
  title: string;
  tagline: string;
  slug: string;
}

export function ShareProject({ title, tagline, slug }: ShareProjectProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? `${window.location.origin}/projects/${slug}` : '';

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `${title} — Chinmoy Kalita`,
          text: tagline,
          url,
        });
        return;
      } catch (err) {
        // User cancelled or share failed, fallback to copy
        if ((err as Error).name === 'AbortError') return;
      }
    }

    // Fallback: Copy to clipboard
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2400);
      } catch {
        // Ignore clipboard failure
      }
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-theme-border bg-theme-surface hover:bg-theme-surface-elevated text-xs font-mono text-theme-muted hover:text-theme-text transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-azure"
      aria-label="Share this case study"
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-theme-azure" />
          <span className="text-theme-azure font-medium">Link Copied</span>
        </>
      ) : (
        <>
          <Share2 className="w-3.5 h-3.5" />
          <span>Share Case Study</span>
        </>
      )}
    </button>
  );
}
