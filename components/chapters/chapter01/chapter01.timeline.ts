/**
 * Chapter 01 "The Mechanism" — GSAP Scroll Timeline Definitions
 * 
 * Timeline Phases:
 * 0%  – 12% : Title card, outlined numeral "01", prologue thread descent.
 * 12% – 30% : Mechanism draws in (SvgDraw part by part), "?" curiosity glyphs fade in, Narration Line 1.
 * 30% – 50% : Exploded view, "?" glyphs morph into dots, dashed assembly lines draw, Narration Line 2.
 * 50% – 60% : Held hanging beat. Parts hang slightly dim, thread brightness drops to 40%, dots slow down, no new text.
 * 60% – 85% : Rebuilding into new synthesis with easing, pulse runs along circuit trace, terminal node lights, Narration Line 3.
 * 85% – 100%: Bridge line fades in quietly beneath, lit node stretches into ThreadSpine, exposure lifts slightly.
 */

export interface Chapter01ProgressPhases {
  // 0.0 to 1.0 overall scrub progress
  progress: number;

  // Title card opacity / reveal (0 to 12%)
  titleCardOpacity: number;
  numeralOpacity: number;

  // Narration lines opacity (0.0 to 1.0)
  line1Opacity: number;
  line2Opacity: number;
  line3Opacity: number;
  bridgeOpacity: number;

  // Mechanism illustration phase progress (0.0 to 1.0)
  mechanismProgress: number;

  // Held beat indicator
  isHeldBeat: boolean;
  threadDimOpacity: number;

  // Exposure lift (0.0 to 1.0)
  exposureLift: number;
}

export function computeChapter01Phases(progress: number, isReducedMotion: boolean = false): Chapter01ProgressPhases {
  if (isReducedMotion) {
    return {
      progress: 1,
      titleCardOpacity: 1,
      numeralOpacity: 0.2,
      line1Opacity: 1,
      line2Opacity: 1,
      line3Opacity: 1,
      bridgeOpacity: 1,
      mechanismProgress: 1,
      isHeldBeat: false,
      threadDimOpacity: 1,
      exposureLift: 0.15,
    };
  }

  const p = Math.max(0, Math.min(1, progress));

  // 1. Title card & Outlined "01" Numeral: 0% to 12% (peaks, then subtly recedes to let mechanism take focus)
  const titleCardOpacity = p < 0.12 ? 1 : Math.max(0, 1 - (p - 0.12) / 0.12);
  const numeralOpacity = p < 0.08 ? p / 0.08 * 0.2 : 0.2;

  // 2. Narration Line 1 ("fascinated by understanding"): active 12% to 30%, dissolves as line 2 emerges
  let line1Opacity = 0;
  if (p >= 0.10 && p < 0.32) {
    if (p < 0.16) {
      line1Opacity = (p - 0.10) / 0.06;
    } else if (p > 0.28) {
      line1Opacity = 1 - (p - 0.28) / 0.04;
    } else {
      line1Opacity = 1;
    }
  }

  // 3. Narration Line 2 ("understanding wasn't enough"): active 30% to 52%
  let line2Opacity = 0;
  if (p >= 0.30 && p < 0.58) {
    if (p < 0.36) {
      line2Opacity = (p - 0.30) / 0.06;
    } else if (p > 0.50) {
      line2Opacity = 1 - (p - 0.50) / 0.08;
    } else {
      line2Opacity = 1;
    }
  }

  // 4. Held Beat: 50% to 60%
  const isHeldBeat = p >= 0.48 && p <= 0.62;
  const threadDimOpacity = isHeldBeat ? 0.4 : 1.0;

  // 5. Narration Line 3 ("wanted to create things myself"): active 60% to 88%
  let line3Opacity = 0;
  if (p >= 0.60 && p < 0.90) {
    if (p < 0.68) {
      line3Opacity = (p - 0.60) / 0.08;
    } else if (p > 0.82) {
      line3Opacity = 1 - (p - 0.82) / 0.08;
    } else {
      line3Opacity = 1;
    }
  }

  // 6. Bridge Line: fades in 85% to 100%
  const bridgeOpacity = Math.max(0, Math.min(1, (p - 0.85) / 0.12));

  // 7. Exposure Lift: 85% to 100%
  const exposureLift = Math.max(0, Math.min(1, (p - 0.85) / 0.15)) * 0.18;

  return {
    progress: p,
    titleCardOpacity,
    numeralOpacity,
    line1Opacity,
    line2Opacity,
    line3Opacity,
    bridgeOpacity,
    mechanismProgress: p,
    isHeldBeat,
    threadDimOpacity,
    exposureLift,
  };
}
