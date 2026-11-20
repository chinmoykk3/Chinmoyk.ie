/**
 * Chapter 02: "The Prism" — Scroll Timeline Calculations
 * 
 * Phases:
 * 0%  - 10% : Thread enters prism 1; Chapter Title Card visible.
 * 10% - 25% : Refraction: 4 beams fan out.
 * 25% - 65% : 4 Worlds (~10% each: Builder 25-35%, Intelligence 35-45%, Visual 45-55%, Explorer 55-65%).
 * 65% - 80% : Beams bend & cross; intersection flares; "feeds the others" annotations appear.
 * 80% - 92% : Inverted prism rises; beams recombine; single gold beam exits; convergence narration plays.
 * 92% - 100%: Gold beam extends to bottom into Chapter 03 Thread; bridge line fades in.
 */

export interface Chapter02Phases {
  progress: number;

  // Title Card (0 - 12%)
  titleOpacity: number;
  numeralOpacity: number;

  // Input gold beam (0 - 25%)
  inputBeamProgress: number;

  // Refraction / fanning out (10 - 25%)
  fanProgress: number;

  // 4 Worlds active progress (0.0 to 1.0 each)
  builderProgress: number;
  intelligenceProgress: number;
  visualProgress: number;
  explorerProgress: number;
  activeWorldIndex: number; // 0: Builder, 1: Intelligence, 2: Visual, 3: Explorer, -1: none

  // Crossing & Feeds Others (65 - 80%)
  crossingProgress: number;
  feedsOthersOpacity: number;

  // Inverted Prism & Recombination (80 - 92%)
  invertedPrismOpacity: number;
  convergenceProgress: number;
  recombinedBeamProgress: number;
  narrationOpacity: number;

  // Bridge Line & Exposure Lift (92 - 100%)
  bridgeOpacity: number;
  exposureLift: number;
}

export function computeChapter02Phases(progress: number, isReducedMotion: boolean = false): Chapter02Phases {
  if (isReducedMotion) {
    return {
      progress: 1,
      titleOpacity: 1,
      numeralOpacity: 0.2,
      inputBeamProgress: 1,
      fanProgress: 1,
      builderProgress: 1,
      intelligenceProgress: 1,
      visualProgress: 1,
      explorerProgress: 1,
      activeWorldIndex: -1,
      crossingProgress: 1,
      feedsOthersOpacity: 1,
      invertedPrismOpacity: 1,
      convergenceProgress: 1,
      recombinedBeamProgress: 1,
      narrationOpacity: 1,
      bridgeOpacity: 1,
      exposureLift: 0.15,
    };
  }

  const p = Math.max(0, Math.min(1, progress));

  // 1. Title & Numeral: 0% to 12%
  const titleOpacity = p < 0.10 ? 1 : Math.max(0, 1 - (p - 0.10) / 0.05);
  const numeralOpacity = p < 0.08 ? (p / 0.08) * 0.2 : 0.2;

  // 2. Input Beam: descends 0% to 10%
  const inputBeamProgress = Math.max(0, Math.min(1, p / 0.10));

  // 3. Fanning Beams: 10% to 25%
  const fanProgress = Math.max(0, Math.min(1, (p - 0.10) / 0.15));

  // 4. Four Worlds: 25% to 65% (10% each)
  // Builder: 25% to 35%
  let builderProgress = 0;
  if (p >= 0.24 && p < 0.36) {
    if (p < 0.27) builderProgress = (p - 0.24) / 0.03;
    else if (p > 0.33) builderProgress = 1 - (p - 0.33) / 0.03;
    else builderProgress = 1;
  }

  // Intelligence: 35% to 45%
  let intelligenceProgress = 0;
  if (p >= 0.34 && p < 0.46) {
    if (p < 0.37) intelligenceProgress = (p - 0.34) / 0.03;
    else if (p > 0.43) intelligenceProgress = 1 - (p - 0.43) / 0.03;
    else intelligenceProgress = 1;
  }

  // Visual: 45% to 55%
  let visualProgress = 0;
  if (p >= 0.44 && p < 0.56) {
    if (p < 0.47) visualProgress = (p - 0.44) / 0.03;
    else if (p > 0.53) visualProgress = 1 - (p - 0.53) / 0.03;
    else visualProgress = 1;
  }

  // Explorer: 55% to 65%
  let explorerProgress = 0;
  if (p >= 0.54 && p < 0.66) {
    if (p < 0.57) explorerProgress = (p - 0.54) / 0.03;
    else if (p > 0.63) explorerProgress = 1 - (p - 0.63) / 0.03;
    else explorerProgress = 1;
  }

  let activeWorldIndex = -1;
  if (builderProgress > 0) activeWorldIndex = 0;
  else if (intelligenceProgress > 0) activeWorldIndex = 1;
  else if (visualProgress > 0) activeWorldIndex = 2;
  else if (explorerProgress > 0) activeWorldIndex = 3;

  // 5. Beams Bending & Crossing: 65% to 80%
  const crossingProgress = Math.max(0, Math.min(1, (p - 0.65) / 0.15));
  let feedsOthersOpacity = 0;
  if (p >= 0.68 && p <= 0.80) {
    if (p < 0.72) feedsOthersOpacity = (p - 0.68) / 0.04;
    else if (p > 0.77) feedsOthersOpacity = 1 - (p - 0.77) / 0.03;
    else feedsOthersOpacity = 1;
  }

  // 6. Inverted Prism & Recombination: 80% to 92%
  const invertedPrismOpacity = Math.max(0, Math.min(1, (p - 0.78) / 0.06));
  const convergenceProgress = Math.max(0, Math.min(1, (p - 0.80) / 0.12));
  const recombinedBeamProgress = Math.max(0, Math.min(1, (p - 0.84) / 0.08));

  let narrationOpacity = 0;
  if (p >= 0.81 && p <= 0.94) {
    if (p < 0.85) narrationOpacity = (p - 0.81) / 0.04;
    else if (p > 0.91) narrationOpacity = 1 - (p - 0.91) / 0.03;
    else narrationOpacity = 1;
  }

  // 7. Bridge & Exposure: 92% to 100%
  const bridgeOpacity = Math.max(0, Math.min(1, (p - 0.92) / 0.07));
  const exposureLift = Math.max(0, Math.min(1, (p - 0.85) / 0.15)) * 0.15;

  return {
    progress: p,
    titleOpacity,
    numeralOpacity,
    inputBeamProgress,
    fanProgress,
    builderProgress,
    intelligenceProgress,
    visualProgress,
    explorerProgress,
    activeWorldIndex,
    crossingProgress,
    feedsOthersOpacity,
    invertedPrismOpacity,
    convergenceProgress,
    recombinedBeamProgress,
    narrationOpacity,
    bridgeOpacity,
    exposureLift,
  };
}
