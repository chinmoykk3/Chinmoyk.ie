/**
 * Chapter 01: "The Lamp" — Scroll Timeline Calculations
 * 
 * Phases:
 * 0%  - 10% : Prologue thread descends & becomes light; title card & numeral 01 reveal.
 * 10% - 38% : Narration Line 1. The 4 objects open in order; question words fade in & morph to dots.
 * 38% - 50% : Narration Line 2. Objects open & running; light dims to ~40%; interiors stop; dashed gap glows.
 * 50% - 60% : Held beat. Only the gap, dim light, and dust; ThreadSpine dims to 40%.
 * 60% - 88% : Narration Line 3. Parts lift & fly along trails; assemble into lamp; spark lands & ignites;
 *             warm gold floods bench; --exposure lifts; cursor light fades out.
 * 88% - 100%: Bridge line fades in; lamp beam narrows into vertical gold ray to bottom edge for Chapter 02 handoff.
 */

export interface Chapter01Phases {
  progress: number;

  // Title Card & Numeral
  titleOpacity: number;
  numeralOpacity: number;

  // Narration Lines (0.0 to 1.0)
  line1Opacity: number;
  line2Opacity: number;
  line3Opacity: number;
  bridgeOpacity: number;

  // Objects Opening Progress (0.0 = closed shell, 1.0 = fully open x-ray)
  watchOpenProgress: number;
  radioOpenProgress: number;
  lensOpenProgress: number;
  circuitOpenProgress: number;

  // Object Interiors Movement Speed (1.0 = full ambient motion, 0.0 = stopped during beat 2)
  interiorMotionSpeed: number;

  // Question words opacity (fades in and morphs to small dot)
  questionWordsOpacity: number;

  // Center Gap Glow (38% to 60%)
  gapGlowOpacity: number;

  // Held beat indicator (50% to 60%)
  isHeldBeat: boolean;
  threadDimOpacity: number;

  // Lamp Assembly Flight Progress (60% to 85%)
  assemblyFlightProgress: number;

  // Spark Landed & Lamp Ignited (80% to 100%)
  isIgnited: boolean;
  ignitionGlow: number; // 0.0 to 1.0

  // Beam narrowing to Chapter 02 exit ray (88% to 100%)
  exitRayProgress: number;

  // Light / Darkness Veil values
  autoLightX: number; // Normalized 0 to 1
  autoLightY: number; // Normalized 0 to 1
  veilDarkness: number; // 0.94 initially, dropping to ~0.35 upon ignition
  exposureLift: number;
}

export function computeChapter01Phases(progress: number, isReducedMotion: boolean = false): Chapter01Phases {
  if (isReducedMotion) {
    return {
      progress: 1,
      titleOpacity: 1,
      numeralOpacity: 0.2,
      line1Opacity: 1,
      line2Opacity: 1,
      line3Opacity: 1,
      bridgeOpacity: 1,
      watchOpenProgress: 1,
      radioOpenProgress: 1,
      lensOpenProgress: 1,
      circuitOpenProgress: 1,
      interiorMotionSpeed: 0,
      questionWordsOpacity: 0,
      gapGlowOpacity: 1,
      isHeldBeat: false,
      threadDimOpacity: 1,
      assemblyFlightProgress: 1,
      isIgnited: true,
      ignitionGlow: 1,
      exitRayProgress: 1,
      autoLightX: 0.5,
      autoLightY: 0.5,
      veilDarkness: 0.35,
      exposureLift: 0.15,
    };
  }

  const p = Math.max(0, Math.min(1, progress));

  // 1. Title & Numeral: 0% to 10%
  const titleOpacity = p < 0.10 ? 1 : Math.max(0, 1 - (p - 0.10) / 0.06);
  const numeralOpacity = p < 0.08 ? (p / 0.08) * 0.2 : 0.2;

  // 2. Narration Line 1 ("fascinated by understanding"): 10% to 38%
  let line1Opacity = 0;
  if (p >= 0.10 && p < 0.38) {
    if (p < 0.15) line1Opacity = (p - 0.10) / 0.05;
    else if (p > 0.33) line1Opacity = 1 - (p - 0.33) / 0.05;
    else line1Opacity = 1;
  }

  // Objects open in sequence between 10% and 36%
  // 1. PocketWatch: 12% to 18%
  const watchOpenProgress = Math.max(0, Math.min(1, (p - 0.12) / 0.06));
  // 2. Radio: 18% to 24%
  const radioOpenProgress = Math.max(0, Math.min(1, (p - 0.18) / 0.06));
  // 3. CameraLens: 24% to 30%
  const lensOpenProgress = Math.max(0, Math.min(1, (p - 0.24) / 0.06));
  // 4. CircuitBoard: 30% to 36%
  const circuitOpenProgress = Math.max(0, Math.min(1, (p - 0.30) / 0.06));

  // Question words: visible during 10% to 36%
  let questionWordsOpacity = 0;
  if (p >= 0.10 && p < 0.38) {
    if (p < 0.15) questionWordsOpacity = (p - 0.10) / 0.05;
    else if (p > 0.33) questionWordsOpacity = 1 - (p - 0.33) / 0.05;
    else questionWordsOpacity = 1;
  }

  // 3. Narration Line 2 ("understanding wasn't enough"): 38% to 50%
  let line2Opacity = 0;
  if (p >= 0.38 && p < 0.52) {
    if (p < 0.42) line2Opacity = (p - 0.38) / 0.04;
    else if (p > 0.48) line2Opacity = 1 - (p - 0.48) / 0.04;
    else line2Opacity = 1;
  }

  // Interior motion quiets down during 38% to 48%
  let interiorMotionSpeed = 1.0;
  if (p >= 0.38 && p <= 0.50) {
    interiorMotionSpeed = Math.max(0, 1 - (p - 0.38) / 0.10);
  } else if (p > 0.50) {
    interiorMotionSpeed = 0;
  }

  // Dashed gap begins to glow at 38% to 60%
  let gapGlowOpacity = 0;
  if (p >= 0.38 && p <= 0.65) {
    if (p < 0.46) gapGlowOpacity = (p - 0.38) / 0.08;
    else gapGlowOpacity = 1;
  }

  // 4. Held Beat: 50% to 60%
  const isHeldBeat = p >= 0.50 && p <= 0.60;
  const threadDimOpacity = isHeldBeat ? 0.4 : 1.0;

  // 5. Narration Line 3 ("wanted to create things myself"): 60% to 88%
  let line3Opacity = 0;
  if (p >= 0.60 && p < 0.88) {
    if (p < 0.66) line3Opacity = (p - 0.60) / 0.06;
    else if (p > 0.82) line3Opacity = 1 - (p - 0.82) / 0.06;
    else line3Opacity = 1;
  }

  // Lamp Assembly Flight: 60% to 80%
  const assemblyFlightProgress = Math.max(0, Math.min(1, (p - 0.60) / 0.20));

  // Spark lands & ignition: 78% to 88%
  const isIgnited = p >= 0.78;
  const ignitionGlow = Math.max(0, Math.min(1, (p - 0.78) / 0.10));

  // Darkness veil lifts upon ignition: drops from 0.85 to ~0.25
  const veilDarkness = 0.85 - ignitionGlow * 0.60;

  // 6. Bridge Line: 88% to 100%
  const bridgeOpacity = Math.max(0, Math.min(1, (p - 0.88) / 0.08));

  // Exit Ray narrows down: 88% to 100%
  const exitRayProgress = Math.max(0, Math.min(1, (p - 0.86) / 0.14));

  // Exposure lift: 78% to 100%
  const exposureLift = Math.max(0, Math.min(1, (p - 0.78) / 0.15)) * 0.15;

  // Automated spotlight coordinates when pointer is idle
  let autoLightX = 0.5;
  let autoLightY = 0.5;
  if (p < 0.12) {
    // Center title
    autoLightX = 0.5;
    autoLightY = 0.35;
  } else if (p < 0.18) {
    // Watch
    autoLightX = 0.22;
    autoLightY = 0.60;
  } else if (p < 0.24) {
    // Radio
    autoLightX = 0.36;
    autoLightY = 0.52;
  } else if (p < 0.30) {
    // Lens
    autoLightX = 0.65;
    autoLightY = 0.55;
  } else if (p < 0.38) {
    // Circuit
    autoLightX = 0.80;
    autoLightY = 0.62;
  } else {
    // Center Lamp gap
    autoLightX = 0.50;
    autoLightY = 0.56;
  }

  return {
    progress: p,
    titleOpacity,
    numeralOpacity,
    line1Opacity,
    line2Opacity,
    line3Opacity,
    bridgeOpacity,
    watchOpenProgress,
    radioOpenProgress,
    lensOpenProgress,
    circuitOpenProgress,
    interiorMotionSpeed,
    questionWordsOpacity,
    gapGlowOpacity,
    isHeldBeat,
    threadDimOpacity,
    assemblyFlightProgress,
    isIgnited,
    ignitionGlow,
    exitRayProgress,
    autoLightX,
    autoLightY,
    veilDarkness,
    exposureLift,
  };
}
