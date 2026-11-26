import React from 'react';
import Link from 'next/link';
import { contactData } from '@/content/contact';

export function Footer() {
  return (
    <footer className="relative z-10 w-full border-t border-cinema-border/60 bg-cinema-bg text-cinema-muted py-10 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="font-serif text-sm text-cinema-text">
            A Story Still Unfolding — The Portfolio of Chinmoy Kalita
          </p>
          <p className="text-xs text-cinema-muted mt-1 font-mono">
            Next.js App Router · TypeScript · Tailwind CSS · Framer Motion · GSAP · Lenis · Three.js
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-cinema-muted">
          {contactData.socials.map((social) => (
            <a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-stage-gold transition-colors underline-offset-4 hover:underline"
            >
              {social.platform}
            </a>
          ))}
          <Link href="/contact" className="hover:text-stage-gold text-cinema-text transition-colors font-medium">
            Get in touch &rarr;
          </Link>
        </div>
      </div>
    </footer>
  );
}
