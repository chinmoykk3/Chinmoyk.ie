'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { SITE_IDENTITY } from '@/data/projectData';

function GithubIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

function LinkedinIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function TwitterXIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer id="contact" className="py-20 bg-background-subtle border-t border-editorial-border relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-editorial-border">
          {/* Main Inquiry Column */}
          <div className="md:col-span-7 space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-accent-blue">
              Initiate Dialogue &bull; Available 2025–2026
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif text-foreground font-normal leading-tight">
              Have a visionary project or architectural challenge?
            </h2>
            <p className="text-foreground-muted font-light max-w-xl">
              Currently open to strategic engineering roles, AI product advisory, and bespoke creative development collaborations.
            </p>
            <div className="pt-2">
              <a
                href={`mailto:${SITE_IDENTITY.contact.email}`}
                className="inline-flex items-center gap-3 px-6 py-3.5 rounded-lg bg-foreground text-background font-medium text-sm hover:bg-white transition-all shadow-md group"
              >
                <span>{SITE_IDENTITY.contact.email}</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Social and Navigation Links */}
          <div className="md:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-foreground-dim">
                Public Coordinates
              </div>
              <ul className="space-y-3 text-sm">
                <li>
                  <a
                    href={SITE_IDENTITY.contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-foreground-muted hover:text-foreground transition-colors group"
                  >
                    <span className="flex items-center gap-2">
                      <GithubIcon className="w-4 h-4" />
                      <span>GitHub</span>
                    </span>
                    <span className="text-xs font-mono text-foreground-dim group-hover:text-accent-blue">
                      @chinmoykk3
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={SITE_IDENTITY.contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-foreground-muted hover:text-foreground transition-colors group"
                  >
                    <span className="flex items-center gap-2">
                      <LinkedinIcon className="w-4 h-4" />
                      <span>LinkedIn</span>
                    </span>
                    <span className="text-xs font-mono text-foreground-dim group-hover:text-accent-blue">
                      /in/chinmoykalita
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={SITE_IDENTITY.contact.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-foreground-muted hover:text-foreground transition-colors group"
                  >
                    <span className="flex items-center gap-2">
                      <TwitterXIcon className="w-4 h-4" />
                      <span>Twitter / X</span>
                    </span>
                    <span className="text-xs font-mono text-foreground-dim group-hover:text-accent-blue">
                      @chinmoykalita
                    </span>
                  </a>
                </li>
              </ul>
            </div>

            <div className="text-xs font-mono text-foreground-dim">
              <span>Stack: Next.js App Router &bull; R3F &bull; GSAP &bull; Tailwind</span>
            </div>
          </div>
        </div>

        {/* Colophon & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-foreground-dim gap-4">
          <div>
            &copy; {new Date().getFullYear()} {SITE_IDENTITY.name}. All rights reserved.
          </div>
          <div>
            A Mind in Motion &bull; Three disciplines. One creative universe.
          </div>
        </div>
      </div>
    </footer>
  );
}
