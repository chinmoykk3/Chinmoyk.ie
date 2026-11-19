'use client';

import { useEffect, useRef } from 'react';

export function ConsoleCredits() {
  const loggedRef = useRef(false);

  useEffect(() => {
    if (loggedRef.current || typeof window === 'undefined') return;
    loggedRef.current = true;

    const titleStyle =
      'color: rgb(251, 191, 36); font-family: Georgia, serif; font-size: 16px; font-weight: bold; background: rgb(0, 0, 0); padding: 4px 8px; border-radius: 4px;';
    const subStyle =
      'color: rgb(163, 163, 163); font-family: monospace; font-size: 11px; line-height: 1.6;';
    const linkStyle =
      'color: rgb(56, 189, 248); font-family: monospace; font-size: 11px; text-decoration: underline;';

    console.log('%c🎬 A STORY STILL UNFOLDING · Chinmoy Kalita', titleStyle);
    console.log(
      '%cWelcome to the source inspection of an interactive documentary portfolio.\n' +
        'Engineered with Next.js App Router, TypeScript, Tailwind, GSAP, Lenis & Canvas2D.\n' +
        'Arc: Curiosity → Creation → Expression → Intelligence → Possibility.\n' +
        'Designed with zero template dependencies and pure neutral blacks.',
      subStyle
    );
    console.log('%chttps://chinmoyk-ie.vercel.app/contact', linkStyle);
  }, []);

  return null;
}
