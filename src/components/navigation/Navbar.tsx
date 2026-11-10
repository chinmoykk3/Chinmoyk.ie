'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { NAVIGATION_LINKS, SITE_IDENTITY } from '@/data/projectData';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/70 border-b border-editorial-border">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand identity */}
        <Link href="/" className="group flex flex-col">
          <span className="font-serif text-xl tracking-tight text-foreground group-hover:text-accent-blue transition-colors">
            {SITE_IDENTITY.name}
          </span>
          <span className="text-[11px] tracking-widest uppercase text-foreground-dim font-mono">
            Portfolio &bull; 2025
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-sm">
          {NAVIGATION_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-foreground-muted hover:text-foreground transition-colors tracking-wide"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right CTA / Status */}
        <div className="hidden lg:flex items-center space-x-4">
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full border border-editorial-border bg-background-subtle/50 text-xs text-foreground-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Open for AI &amp; Architecture Roles</span>
          </div>
          <Link
            href="#contact"
            className="flex items-center space-x-1.5 px-4 py-2 rounded-md bg-foreground text-background text-xs font-medium hover:bg-white transition-all shadow-sm"
          >
            <span>Let&apos;s Connect</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          aria-label="Toggle navigation menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-foreground-muted hover:text-foreground border border-editorial-border"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background-subtle border-b border-editorial-border px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-4">
            {NAVIGATION_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg text-foreground-muted hover:text-foreground font-serif transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="pt-4 border-t border-editorial-border">
            <Link
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center space-x-2 text-sm font-medium text-accent-blue"
            >
              <span>Initiate Conversation</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
