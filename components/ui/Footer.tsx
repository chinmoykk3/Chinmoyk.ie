import React from 'react';
import Link from 'next/link';
import { contactData } from '@/content/contact';

export function Footer() {
  return (
    <footer className="w-full border-t border-theme-border bg-theme-surface text-theme-muted py-12 px-4 sm:px-6 lg:px-8 mt-24 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="font-serif text-sm text-theme-text">
            A Story Still Unfolding — The Portfolio of Chinmoy Kalita
          </p>
          <p className="text-xs text-theme-muted mt-1">
            Built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, GSAP, and
            Three.js.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs text-theme-muted">
          {contactData.socials.map((social) => (
            <a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-theme-text transition-colors underline-offset-4 hover:underline"
            >
              {social.platform}
            </a>
          ))}
          <Link href="/contact" className="hover:text-theme-text transition-colors font-medium">
            Get in touch &rarr;
          </Link>
        </div>
      </div>
    </footer>
  );
}
