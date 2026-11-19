'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { CKWordmark } from '@/components/ui/CKWordmark';
import { ModeSwitch } from '@/components/ui/ModeSwitch';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { PolishControls } from '@/components/polish/PolishControls';
import { MobileNavMenu } from '@/components/ui/MobileNavMenu';
import { cn } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Accessible Skip-to-Content Link for Screen Readers and Keyboard Navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-theme-text focus:text-theme-bg focus:font-semibold focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-chapter-accent"
      >
        Skip to main content
      </a>

      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-theme-bg/85 border-b border-theme-border transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Left: Minimal Custom Typographic Wordmark */}
          <div className="flex items-center gap-3">
            <CKWordmark />
          </div>

          {/* Center: Story / Explore Mode Switch */}
          <div className="hidden sm:flex items-center justify-center">
            <ModeSwitch />
          </div>

          {/* Right: Quick Links, Theme Toggle & Mobile Menu Trigger */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Desktop secondary links */}
            <nav
              aria-label="Secondary Navigation"
              className="hidden md:flex items-center space-x-1 text-xs font-mono"
            >
              <Link
                href="/design"
                className={cn(
                  'px-3 py-1.5 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-chapter-accent',
                  pathname === '/design'
                    ? 'bg-theme-surface-elevated text-theme-text font-semibold'
                    : 'text-theme-muted hover:text-theme-text'
                )}
              >
                Design
              </Link>
              <Link
                href="/contact"
                className={cn(
                  'px-3 py-1.5 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-chapter-accent',
                  pathname === '/contact'
                    ? 'bg-theme-surface-elevated text-theme-text font-semibold'
                    : 'text-theme-muted hover:text-theme-text'
                )}
              >
                Contact
              </Link>
            </nav>

            <PolishControls />
            <ThemeToggle />

            {/* Mobile Hamburger Trigger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-expanded={mobileMenuOpen}
              aria-label="Open full-screen navigation menu"
              className="md:hidden p-2 rounded-full bg-theme-surface border border-theme-border text-theme-muted hover:text-theme-text hover:bg-theme-surface-elevated focus:outline-none focus-visible:ring-2 focus-visible:ring-chapter-accent"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Safe-Area Aware Full-Screen Mobile Navigation Overlay */}
      <MobileNavMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}
