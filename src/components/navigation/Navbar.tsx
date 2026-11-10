'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { NAVIGATION_LINKS, SITE_IDENTITY } from '@/data/projectData';
import { MagneticButton } from '@/components/shared/MagneticButton';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timeString, setTimeString] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }) + ' IST'
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-canvas/80 border-b border-editorial-border transition-all">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand identity */}
        <Link href="/" className="group flex flex-col focus-visible:outline-2 focus-visible:outline-cobalt">
          <span className="font-serif text-xl tracking-tight text-paper group-hover:text-ochre transition-colors">
            {SITE_IDENTITY.name}
          </span>
          <span className="text-[10px] tracking-[0.2em] uppercase text-paper-dim font-mono">
            Full-Stack &bull; AI &bull; Design
          </span>
        </Link>

        {/* Studio Time & Status (Desktop Center/Left) */}
        <div className="hidden xl:flex items-center space-x-3 text-2xs font-mono text-paper-dim border-x border-editorial-border px-6 h-8">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>GUWAHATI {timeString || '20:12:00 IST'}</span>
          <span className="text-editorial-border">|</span>
          <span className="text-paper-muted">AVAILABLE FOR ROLES</span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-xs font-mono tracking-wider uppercase">
          {NAVIGATION_LINKS.map((link, idx) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-paper-muted hover:text-paper transition-colors py-1 relative group focus-visible:outline-1 focus-visible:outline-cobalt"
            >
              <span className="text-paper-dim mr-1.5 text-[10px]">0{idx + 1}.</span>
              <span>{link.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-px bg-ochre group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="hidden sm:flex items-center space-x-4">
          <MagneticButton
            href="#contact"
            variant="primary"
            size="sm"
            icon={<ArrowUpRight className="w-3.5 h-3.5" />}
          >
            Initiate Dialogue
          </MagneticButton>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          aria-label="Toggle navigation menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-editorial-sm text-paper-muted hover:text-paper border border-editorial-border"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-canvas-subtle border-b border-editorial-border px-6 py-8 space-y-6">
          <div className="flex items-center justify-between text-2xs font-mono text-paper-dim border-b border-editorial-border pb-4">
            <span>STUDIO TIME</span>
            <span>{timeString}</span>
          </div>

          <nav className="flex flex-col space-y-5">
            {NAVIGATION_LINKS.map((link, idx) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl text-paper-muted hover:text-paper font-serif transition-colors flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-2xs font-mono text-paper-dim">0{idx + 1}</span>
              </Link>
            ))}
          </nav>

          <div className="pt-4 border-t border-editorial-border">
            <Link
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center space-x-2 py-3 rounded-editorial-md bg-paper text-canvas text-xs font-mono uppercase tracking-widest font-medium hover:bg-white transition-all"
            >
              <span>Initiate Dialogue</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
