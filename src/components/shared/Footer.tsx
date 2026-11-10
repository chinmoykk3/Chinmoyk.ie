'use client';

import { ArrowUpRight } from 'lucide-react';
import { SITE_IDENTITY } from '@/data/projectData';
import { MagneticButton } from './MagneticButton';
import { ChapterLabel } from './ChapterLabel';

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
    <footer id="contact" className="py-24 bg-canvas-deep border-t border-editorial-border relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-radial-gradient from-cobalt/10 via-transparent to-transparent pointer-events-none rounded-full translate-x-1/3 translate-y-1/3" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <ChapterLabel
          number="COLOPHON"
          label="Dialogue &amp; Coordinates"
          metadata="Guwahati &bull; Remote"
          accent="ochre"
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-20 border-b border-editorial-border">
          {/* Main Statement */}
          <div className="md:col-span-7 space-y-6">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-paper font-normal leading-[1.08] tracking-tight">
              Have an architectural challenge or creative vision?
            </h2>
            <p className="text-paper-muted font-light max-w-xl text-base sm:text-lg leading-relaxed">
              Available for full-stack system architecture, AI research and integration, and bespoke digital creative direction.
            </p>
            <div className="pt-4">
              <MagneticButton
                href={`mailto:${SITE_IDENTITY.contact.email}`}
                variant="primary"
                size="lg"
                icon={<ArrowUpRight className="w-4 h-4" />}
              >
                {SITE_IDENTITY.contact.email}
              </MagneticButton>
            </div>
          </div>

          {/* Coordinates & Index */}
          <div className="md:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <div className="text-2xs font-mono uppercase tracking-[0.2em] text-paper-dim">
                Direct Channels
              </div>
              <ul className="space-y-3 text-sm">
                <li>
                  <a
                    href={SITE_IDENTITY.contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-editorial-md bg-canvas-card border border-editorial-border text-paper-muted hover:text-paper hover:border-editorial-border-hover transition-all group"
                  >
                    <span className="flex items-center gap-2.5">
                      <GithubIcon className="w-4 h-4" />
                      <span>GitHub</span>
                    </span>
                    <span className="text-2xs font-mono text-paper-dim group-hover:text-cobalt">
                      @chinmoykk3 &rarr;
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={SITE_IDENTITY.contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-editorial-md bg-canvas-card border border-editorial-border text-paper-muted hover:text-paper hover:border-editorial-border-hover transition-all group"
                  >
                    <span className="flex items-center gap-2.5">
                      <LinkedinIcon className="w-4 h-4" />
                      <span>LinkedIn</span>
                    </span>
                    <span className="text-2xs font-mono text-paper-dim group-hover:text-cobalt">
                      /in/chinmoykalita &rarr;
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={SITE_IDENTITY.contact.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-editorial-md bg-canvas-card border border-editorial-border text-paper-muted hover:text-paper hover:border-editorial-border-hover transition-all group"
                  >
                    <span className="flex items-center gap-2.5">
                      <TwitterXIcon className="w-4 h-4" />
                      <span>Twitter / X</span>
                    </span>
                    <span className="text-2xs font-mono text-paper-dim group-hover:text-cobalt">
                      @chinmoykalita &rarr;
                    </span>
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-1 text-2xs font-mono text-paper-dim">
              <div>ENGINEERED WITH NEXT.JS 15 &bull; R3F &bull; GSAP</div>
              <div>HOSTED WITH PRODUCTION STATIC OPTIMIZATION</div>
            </div>
          </div>
        </div>

        {/* Bottom Colophon Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-2xs font-mono text-paper-dim gap-4">
          <div className="flex items-center space-x-2">
            <span>&copy; {new Date().getFullYear()} {SITE_IDENTITY.name}.</span>
            <span className="text-editorial-border">/</span>
            <span>ALL RIGHTS RESERVED.</span>
          </div>
          <div>
            A MIND IN MOTION &bull; THREE DISCIPLINES &bull; ONE CREATIVE UNIVERSE
          </div>
        </div>
      </div>
    </footer>
  );
}
