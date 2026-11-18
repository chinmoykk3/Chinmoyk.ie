'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Menu, X, Compass, Film } from 'lucide-react';

const NAV_ITEMS = [
  { href: '/', label: 'Story Mode', icon: Film, subtitle: 'The Documentary' },
  { href: '/explore', label: 'Explore Hub', icon: Compass, subtitle: 'Projects & Systems' },
  { href: '/design', label: 'Design' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Accessible Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-amber-400 focus:text-black focus:font-semibold focus:rounded-md focus:shadow-lg"
      >
        Skip to main content
      </a>

      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-canvas-base/80 border-b border-canvas-border transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo / Title */}
          <Link
            href="/"
            className="group flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-sm"
          >
            <span className="font-serif text-lg tracking-wider font-semibold text-foreground group-hover:text-amber-400 transition-colors">
              CHINMOY KALITA
            </span>
            <span className="text-[10px] uppercase tracking-widest text-zinc-400">
              A Story Still Unfolding
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center space-x-1 sm:space-x-2"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'relative px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400',
                    isActive
                      ? 'bg-zinc-800/90 text-amber-300 shadow-sm border border-amber-400/20'
                      : 'text-zinc-300 hover:text-white hover:bg-zinc-850/60'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {Icon && <Icon className="w-3.5 h-3.5 opacity-80" />}
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Mobile hamburger button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800/60 focus:outline-none focus:ring-2 focus:ring-amber-400"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu dropdown */}
        {mobileOpen && (
          <nav
            aria-label="Mobile Navigation"
            className="md:hidden px-4 pt-2 pb-6 bg-canvas-base border-b border-canvas-border space-y-2 animate-fade-in"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium tracking-wide transition-colors',
                    isActive
                      ? 'bg-zinc-800/90 text-amber-300 font-semibold'
                      : 'text-zinc-300 hover:bg-zinc-900 hover:text-white'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {Icon && <Icon className="w-4 h-4 text-amber-400" />}
                  <div>
                    <div>{item.label}</div>
                    {item.subtitle && (
                      <div className="text-[11px] text-zinc-400 font-normal">{item.subtitle}</div>
                    )}
                  </div>
                </Link>
              );
            })}
          </nav>
        )}
      </header>
    </>
  );
}
