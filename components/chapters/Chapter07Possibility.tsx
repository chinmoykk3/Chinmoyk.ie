'use client';

import React, { useState, useRef } from 'react';
import { Chapter } from '@/content/chapters';
import { beyond, hasBeyondContent } from '@/content/beyond';
import { useMotion } from '@/hooks/useMotion';
import { Container } from '@/components/ui/Container';
import { Content } from '@/components/content/Content';
import { isContentRenderable, getContentText } from '@/content/schema';
import {
  Camera,
  Sparkles,
  BookOpen,
  Compass,
  Heart,
  Aperture,
  ArrowLeft,
  ArrowRight,
  Sun,
  Keyboard,
  Stamp,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Chapter07PossibilityProps {
  chapter: Chapter;
}

const BACKDROP_BY_CATEGORY: Record<string, string> = {
  Photography: 'ANALOG',
  Influences: 'MONOLITH',
  Hobbies: 'TACTILE',
  Inspirations: 'PRINT',
};

const FLOATING_GLYPHS = [
  { Icon: Camera, top: '9%', left: '5%', delay: '0s', size: 'w-7 h-7' },
  { Icon: Aperture, top: '17%', right: '6%', delay: '1.1s', size: 'w-8 h-8' },
  { Icon: Compass, top: '46%', left: '4%', delay: '0.7s', size: 'w-6 h-6' },
  { Icon: BookOpen, top: '54%', right: '5%', delay: '1.9s', size: 'w-7 h-7' },
  { Icon: Sparkles, top: '80%', left: '7%', delay: '1.4s', size: 'w-6 h-6' },
];

const APERTURE_STOPS = ['f/1.4', 'f/2.0', 'f/2.8', 'f/4.0', 'f/5.6', 'f/8.0', 'f/11'] as const;
const SHUTTER_SPEEDS = ['1/1000', '1/500', '1/250', '1/125', '1/60'] as const;

type SwitchType = 'linear' | 'tactile' | 'clicky';
const SWITCH_PROFILES: Record<
  SwitchType,
  { label: string; force: string; travel: string; path: string; actuateY: number }
> = {
  linear: {
    label: 'Linear 45g',
    force: '45g Actuation',
    travel: '2.0mm / 4.0mm',
    path: 'M 10 85 L 95 52 L 190 22',
    actuateY: 52,
  },
  tactile: {
    label: 'Tactile 62g',
    force: '62g Bump',
    travel: '1.8mm / 3.8mm',
    path: 'M 10 85 Q 52 38 78 58 T 190 18',
    actuateY: 46,
  },
  clicky: {
    label: 'Clicky 55g',
    force: '55g Clickbar',
    travel: '2.2mm / 4.0mm',
    path: 'M 10 85 L 68 32 L 88 64 L 190 20',
    actuateY: 36,
  },
};

type PaperStock = 'cotton' | 'washi' | 'newsprint';
const PAPER_STOCKS: Record<PaperStock, { label: string; gsm: string; grainOpacity: number }> = {
  cotton: { label: 'Cotton Rag', gsm: '300 gsm', grainOpacity: 0.14 },
  washi: { label: 'Washi Unbleached', gsm: '180 gsm', grainOpacity: 0.2 },
  newsprint: { label: 'Newsprint', gsm: '90 gsm', grainOpacity: 0.08 },
};

export function Chapter07Possibility({ chapter }: Chapter07PossibilityProps) {
  const { motionEnabled, prefersReducedMotion } = useMotion();
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Specimen 01: 35mm SLR state
  const [apertureIdx, setApertureIdx] = useState<number>(2);
  const [shutterIdx, setShutterIdx] = useState<number>(2);
  const [frameCount, setFrameCount] = useState<number>(14);
  const [shutterFlash, setShutterFlash] = useState<boolean>(false);

  // Specimen 02: Brutalist Sun Angle state
  const [sunAngle, setSunAngle] = useState<number>(38);

  // Specimen 03: Tactile Keyboard state
  const [switchType, setSwitchType] = useState<SwitchType>('tactile');
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [keystrokeCount, setKeystrokeCount] = useState<number>(0);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Specimen 04: Letterpress state
  const [paperStock, setPaperStock] = useState<PaperStock>('cotton');
  const [debossDepth, setDebossDepth] = useState<number>(3);
  const [stamped, setStamped] = useState<boolean>(false);

  const isReduced = prefersReducedMotion || !motionEnabled;

  // Auto-hide entire chapter if beyond.ts has no renderable items
  if (!hasBeyondContent()) {
    return null;
  }

  const validItems = beyond.filter((item) => isContentRenderable(item.title));
  if (validItems.length === 0) return null;

  const safeIndex = activeIndex % validItems.length;
  const activeItem = validItems[safeIndex];
  const backdropWord = BACKDROP_BY_CATEGORY[activeItem.category] ?? 'BEYOND';

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Photography':
        return Camera;
      case 'Inspirations':
        return Sparkles;
      case 'Hobbies':
        return Heart;
      case 'Influences':
        return BookOpen;
      default:
        return Compass;
    }
  };

  const ActiveIcon = getCategoryIcon(activeItem.category);

  const handleStep = (delta: number) => {
    setActiveIndex((prev) => (prev + delta + validItems.length) % validItems.length);
  };

  const triggerShutter = () => {
    setFrameCount((f) => (f >= 36 ? 1 : f + 1));
    setShutterFlash(true);
    setTimeout(() => setShutterFlash(false), 180);
  };

  const playSwitchThock = (type: SwitchType) => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        void ctx.resume();
      }
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type === 'clicky' ? 'triangle' : 'sine';
      const baseFreq = type === 'linear' ? 145 : type === 'tactile' ? 190 : 340;
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.exponentialRampToValueAtTime(55, now + 0.055);
      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.065);
    } catch {
      // Ignore audio errors on restricted environments
    }
  };

  const handleKeyPress = (keyLabel: string) => {
    setPressedKey(keyLabel);
    setKeystrokeCount((c) => c + 1);
    playSwitchThock(switchType);
    setTimeout(() => setPressedKey((curr) => (curr === keyLabel ? null : curr)), 140);
  };

  const triggerLetterpress = () => {
    setStamped(true);
    setTimeout(() => setStamped(false), 260);
  };

  // Aperture iris radius calculation (smaller f-number = wider opening)
  const irisRadius = 34 - apertureIdx * 3.6;

  // Brutalist shadow offsets derived from sunAngle (-45 to +45)
  const shadowX = Math.round(((sunAngle - 50) / 50) * 26);
  const shadowY = Math.round(14 + Math.abs(sunAngle - 50) * 0.22);

  return (
    <article
      id={chapter.id}
      data-chapter={String(chapter.number)}
      data-accent="ember"
      aria-labelledby="chapter-07-heading"
      className="relative w-full bg-cinema-bg text-cinema-text border-t border-cinema-border/40 overflow-hidden transition-colors duration-300"
    >
      {/* Ember Radial Spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 68% 54% at 50% 35%, color-mix(in srgb, var(--color-accent-ember) 15%, transparent) 0%, transparent 74%)',
        }}
      />

      {/* Subtle Blueprint Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          opacity: 'var(--stage-grid-opacity, 0.06)',
          backgroundImage:
            'linear-gradient(to right, var(--color-accent-ember) 1px, transparent 1px), linear-gradient(to bottom, var(--color-accent-ember) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />

      {/* Giant Kinetic Outlined Bebas Neue Backdrop Word */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-x-0 top-10 sm:top-14 z-0 flex justify-center overflow-hidden"
      >
        <span
          className="text-[22vw] sm:text-[17vw] leading-none tracking-[0.04em] uppercase transition-all duration-500"
          style={{
            fontFamily: "'Bebas Neue', 'Oswald', 'Impact', sans-serif",
            WebkitTextStroke: '1.5px var(--color-accent-ember)',
            color: 'transparent',
            opacity: 'var(--stage-watermark-opacity, 0.12)',
          }}
        >
          {backdropWord}
        </span>
      </div>

      {/* Floating Analog & Craft Glyphs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {FLOATING_GLYPHS.map(({ Icon, top, left, right, delay, size }, idx) => (
          <div
            key={idx}
            className="absolute text-stage-ember/30"
            style={{
              top,
              left,
              right,
              animation: isReduced ? undefined : `floatSlow 7.5s ease-in-out ${delay} infinite`,
            }}
          >
            <Icon className={size} strokeWidth={1.35} />
          </div>
        ))}
      </div>

      {/* FOREGROUND STAGE */}
      <div className="relative z-10 w-full py-20 sm:py-28">
        <Container size="lg" className="space-y-14 sm:space-y-18">
          {/* 1. Open Editorial Header */}
          <header className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2.5 text-xs font-mono tracking-[0.2em] uppercase text-stage-ember">
                <span className="w-2 h-2 rounded-full bg-stage-ember animate-pulse" />
                <span>
                  Chapter 0{chapter.number} — {chapter.emotionalArc}
                </span>
              </div>

              <h2
                id="chapter-07-heading"
                className="font-serif font-normal text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.02] text-cinema-text"
              >
                <Content value={chapter.title} />
              </h2>

              <p className="text-sm sm:text-base text-cinema-muted font-sans leading-relaxed max-w-2xl">
                <Content value={chapter.subtitle} />
              </p>
            </div>

            {/* Frame Counter & Step Controls */}
            <div className="lg:col-span-4 flex items-center lg:justify-end gap-3">
              <span className="text-xs font-mono tracking-widest text-cinema-muted">
                INSTRUMENT 0{safeIndex + 1} / 0{validItems.length}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleStep(-1)}
                  aria-label="Previous specimen"
                  className="p-2 rounded-full border border-cinema-border text-cinema-muted hover:text-cinema-text hover:border-stage-ember transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-stage-ember"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleStep(1)}
                  aria-label="Next specimen"
                  className="p-2 rounded-full border border-cinema-border text-cinema-muted hover:text-cinema-text hover:border-stage-ember transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-stage-ember"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </header>

          {/* 2. Split Specimen Stage: Bespoke Playable Analog Instrument + Editorial Detail */}
          <section
            aria-label="Interactive analog craft instrument"
            className="border-y border-cinema-border/60 py-10 sm:py-14"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Left: Bespoke Instrument per Category */}
              <div className="lg:col-span-6">
                {activeItem.category === 'Photography' && (
                  <div className="relative aspect-[4/3] w-full rounded-2xl border border-stage-ember/45 bg-cinema-bg/80 overflow-hidden p-5 flex flex-col justify-between">
                    {/* Shutter Flash Overlay */}
                    <div
                      aria-hidden="true"
                      className={cn(
                        'pointer-events-none absolute inset-0 z-20 bg-stage-ember/30 transition-opacity duration-150',
                        shutterFlash ? 'opacity-100' : 'opacity-0'
                      )}
                    />

                    {/* Top SLR Telemetry */}
                    <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-stage-ember">
                      <span>KODAK TRI-X 400 // 35MM</span>
                      <span>
                        EXP {String(frameCount).padStart(2, '0')} / 36
                      </span>
                    </div>

                    {/* Interactive SVG Iris Diaphragm */}
                    <div className="relative z-10 my-auto flex items-center justify-center">
                      <svg
                        viewBox="0 0 120 120"
                        className="w-36 h-36 sm:w-44 sm:h-44 overflow-visible"
                        aria-hidden="true"
                      >
                        <circle
                          cx="60"
                          cy="60"
                          r="52"
                          fill="none"
                          stroke="var(--color-accent-ember)"
                          strokeWidth="1"
                          strokeDasharray="3 3"
                          opacity="0.5"
                        />
                        <circle
                          cx="60"
                          cy="60"
                          r="42"
                          fill="none"
                          stroke="var(--color-accent-ember)"
                          strokeWidth="1.25"
                          opacity="0.7"
                        />
                        <circle
                          cx="60"
                          cy="60"
                          r={irisRadius}
                          fill="color-mix(in srgb, var(--color-accent-ember) 14%, transparent)"
                          stroke="var(--color-accent-ember)"
                          strokeWidth="1.75"
                          className="transition-all duration-300"
                        />
                        <line x1="60" y1="8" x2="60" y2="20" stroke="var(--color-accent-ember)" strokeWidth="1" />
                        <line x1="60" y1="100" x2="60" y2="112" stroke="var(--color-accent-ember)" strokeWidth="1" />
                        <line x1="8" y1="60" x2="20" y2="60" stroke="var(--color-accent-ember)" strokeWidth="1" />
                        <line x1="100" y1="60" x2="112" y2="60" stroke="var(--color-accent-ember)" strokeWidth="1" />
                        <text
                          x="60"
                          y="63"
                          textAnchor="middle"
                          className="fill-current text-cinema-text font-mono text-[10px] font-semibold"
                        >
                          {APERTURE_STOPS[apertureIdx]}
                        </text>
                      </svg>
                    </div>

                    {/* SLR Controls */}
                    <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-cinema-border/50">
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() =>
                            setApertureIdx((i) => (i + 1) % APERTURE_STOPS.length)
                          }
                          className="px-2.5 py-1 rounded border border-cinema-border text-[11px] font-mono text-cinema-text hover:border-stage-ember transition-colors"
                        >
                          Aperture: {APERTURE_STOPS[apertureIdx]}
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setShutterIdx((i) => (i + 1) % SHUTTER_SPEEDS.length)
                          }
                          className="px-2.5 py-1 rounded border border-cinema-border text-[11px] font-mono text-cinema-text hover:border-stage-ember transition-colors"
                        >
                          Shutter: {SHUTTER_SPEEDS[shutterIdx]}s
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={triggerShutter}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-cinema-text text-cinema-bg text-[11px] font-mono font-semibold hover:opacity-90 transition-opacity"
                      >
                        <Camera className="w-3 h-3" />
                        <span>Snap Frame</span>
                      </button>
                    </div>
                  </div>
                )}

                {activeItem.category === 'Influences' && (
                  <div className="relative aspect-[4/3] w-full rounded-2xl border border-stage-ember/45 bg-cinema-bg/80 overflow-hidden p-5 flex flex-col justify-between">
                    <div className="flex items-center justify-between text-[11px] font-mono text-stage-ember">
                      <span className="inline-flex items-center gap-1.5">
                        <Sun className="w-3.5 h-3.5" />
                        <span>SOLAR RELIEF STUDY</span>
                      </span>
                      <span>AZIMUTH {sunAngle}°</span>
                    </div>

                    {/* Brutalist Monolith Slabs with Dynamic Solar Shadows */}
                    <div className="my-auto flex items-end justify-center gap-4 h-40 px-4">
                      {[
                        { w: 'w-14', h: 'h-28', label: 'A-01' },
                        { w: 'w-20', h: 'h-36', label: 'M-02' },
                        { w: 'w-12', h: 'h-20', label: 'C-03' },
                      ].map((slab, idx) => (
                        <div
                          key={slab.label}
                          className={cn(
                            'relative border border-stage-ember/60 bg-cinema-bg flex items-end p-2 transition-all duration-150',
                            slab.w,
                            slab.h
                          )}
                          style={{
                            boxShadow: `${shadowX * (idx % 2 === 0 ? 1 : 0.8)}px ${shadowY}px 0px color-mix(in srgb, var(--color-accent-ember) 28%, transparent)`,
                          }}
                        >
                          <span className="text-[9px] font-mono text-stage-ember/80">
                            {slab.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Solar Angle Scrubber */}
                    <div className="flex items-center gap-3 pt-3 border-t border-cinema-border/50">
                      <label
                        htmlFor="brutalist-sun-angle"
                        className="text-[10px] font-mono uppercase tracking-wider text-cinema-muted shrink-0"
                      >
                        Sun Angle
                      </label>
                      <input
                        id="brutalist-sun-angle"
                        type="range"
                        min={10}
                        max={90}
                        value={sunAngle}
                        onChange={(e) => setSunAngle(Number(e.target.value))}
                        className="w-full accent-stage-ember cursor-pointer h-1"
                      />
                      <span className="text-[10px] font-mono text-stage-ember shrink-0">
                        {sunAngle < 35 ? 'DAWN' : sunAngle > 65 ? 'DUSK' : 'ZENITH'}
                      </span>
                    </div>
                  </div>
                )}

                {activeItem.category === 'Hobbies' && (
                  <div className="relative aspect-[4/3] w-full rounded-2xl border border-stage-ember/45 bg-cinema-bg/80 overflow-hidden p-5 flex flex-col justify-between">
                    <div className="flex items-center justify-between text-[11px] font-mono text-stage-ember">
                      <span className="inline-flex items-center gap-1.5">
                        <Keyboard className="w-3.5 h-3.5" />
                        <span>SWITCH FORCE-TRAVEL LAB</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => setSoundEnabled((s) => !s)}
                        className="inline-flex items-center gap-1 text-cinema-muted hover:text-stage-ember transition-colors"
                        aria-label={soundEnabled ? 'Mute switch audio' : 'Enable switch audio'}
                      >
                        {soundEnabled ? (
                          <Volume2 className="w-3.5 h-3.5 text-stage-ember" />
                        ) : (
                          <VolumeX className="w-3.5 h-3.5" />
                        )}
                        <span>{keystrokeCount} ACTUATIONS</span>
                      </button>
                    </div>

                    {/* Live SVG Force Curve + Playable Keycaps */}
                    <div className="my-auto space-y-4">
                      <div className="flex items-center justify-between gap-4">
                        <svg
                          viewBox="0 0 200 95"
                          className="w-48 h-24 overflow-visible"
                          aria-hidden="true"
                        >
                          <line x1="10" y1="85" x2="195" y2="85" stroke="var(--color-accent-ember)" strokeOpacity="0.3" strokeWidth="1" />
                          <line x1="10" y1="10" x2="10" y2="85" stroke="var(--color-accent-ember)" strokeOpacity="0.3" strokeWidth="1" />
                          <path
                            d={SWITCH_PROFILES[switchType].path}
                            fill="none"
                            stroke="var(--color-accent-ember)"
                            strokeWidth="2.2"
                            className="transition-all duration-300"
                          />
                          <circle
                            cx="82"
                            cy={SWITCH_PROFILES[switchType].actuateY}
                            r="4"
                            fill="var(--color-accent-ember)"
                          />
                        </svg>
                        <div className="text-right space-y-1 font-mono text-[11px]">
                          <div className="text-stage-ember font-semibold">
                            {SWITCH_PROFILES[switchType].label}
                          </div>
                          <div className="text-cinema-muted">
                            {SWITCH_PROFILES[switchType].force}
                          </div>
                          <div className="text-cinema-muted">
                            {SWITCH_PROFILES[switchType].travel}
                          </div>
                        </div>
                      </div>

                      {/* 4 Playable Tactile Keycaps */}
                      <div className="grid grid-cols-4 gap-2.5">
                        {['ESC', 'FN', 'ALT', 'RET'].map((keyLabel) => {
                          const down = pressedKey === keyLabel;
                          return (
                            <button
                              key={keyLabel}
                              type="button"
                              onClick={() => handleKeyPress(keyLabel)}
                              className={cn(
                                'py-2.5 rounded-lg border font-mono text-xs font-semibold transition-all select-none',
                                down
                                  ? 'translate-y-1 border-stage-ember bg-stage-ember/20 text-stage-ember'
                                  : 'border-cinema-border bg-cinema-bg text-cinema-text shadow-[0_3px_0_0_var(--color-accent-ember)] hover:border-stage-ember/70'
                              )}
                            >
                              {keyLabel}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Switch Profile Selector */}
                    <div className="flex items-center gap-2 pt-3 border-t border-cinema-border/50">
                      {(['linear', 'tactile', 'clicky'] as SwitchType[]).map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setSwitchType(type)}
                          className={cn(
                            'px-2.5 py-1 rounded text-[11px] font-mono border transition-colors capitalize',
                            switchType === type
                              ? 'border-stage-ember bg-stage-ember/15 text-stage-ember font-semibold'
                              : 'border-cinema-border text-cinema-muted hover:text-cinema-text'
                          )}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {activeItem.category === 'Inspirations' && (
                  <div className="relative aspect-[4/3] w-full rounded-2xl border border-stage-ember/45 bg-cinema-bg/80 overflow-hidden p-5 flex flex-col justify-between">
                    <div className="flex items-center justify-between text-[11px] font-mono text-stage-ember">
                      <span className="inline-flex items-center gap-1.5">
                        <Stamp className="w-3.5 h-3.5" />
                        <span>LETTERPRESS &amp; PAPER SPECIMEN</span>
                      </span>
                      <span>
                        {PAPER_STOCKS[paperStock].label.toUpperCase()}
                        {' // '}
                        {PAPER_STOCKS[paperStock].gsm}
                      </span>
                    </div>

                    {/* Debossed Movable-Type Lockup */}
                    <div className="my-auto flex items-center justify-center">
                      <button
                        type="button"
                        onClick={triggerLetterpress}
                        className={cn(
                          'w-full max-w-xs py-6 px-4 rounded-xl border border-stage-ember/50 text-center transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-stage-ember',
                          stamped ? 'scale-[0.97]' : 'scale-100'
                        )}
                        style={{
                          background: `radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--color-accent-ember) ${Math.round(
                            PAPER_STOCKS[paperStock].grainOpacity * 100
                          )}%, transparent) 0%, transparent 90%)`,
                          boxShadow: stamped
                            ? `inset 0 ${debossDepth + 2}px 10px color-mix(in srgb, var(--color-accent-ember) 35%, transparent)`
                            : `inset 0 ${debossDepth}px 6px color-mix(in srgb, var(--color-accent-ember) 20%, transparent)`,
                        }}
                      >
                        <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-stage-ember mb-1">
                          EDITION 05 // PRESS
                        </div>
                        <div className="font-serif text-2xl sm:text-3xl tracking-tight text-cinema-text">
                          CHINMOY MONOGRAPH
                        </div>
                        <div className="text-[10px] font-mono text-cinema-muted mt-2">
                          Click to strike platen ({debossDepth}mm impression)
                        </div>
                      </button>
                    </div>

                    {/* Paper Stock & Impression Controls */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-cinema-border/50">
                      <div className="flex items-center gap-1.5">
                        {(['cotton', 'washi', 'newsprint'] as PaperStock[]).map((stock) => (
                          <button
                            key={stock}
                            type="button"
                            onClick={() => setPaperStock(stock)}
                            className={cn(
                              'px-2.5 py-1 rounded text-[11px] font-mono border transition-colors capitalize',
                              paperStock === stock
                                ? 'border-stage-ember bg-stage-ember/15 text-stage-ember font-semibold'
                                : 'border-cinema-border text-cinema-muted hover:text-cinema-text'
                            )}
                          >
                            {stock}
                          </button>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={() => setDebossDepth((d) => (d >= 6 ? 1 : d + 1))}
                        className="px-2.5 py-1 rounded border border-cinema-border text-[11px] font-mono text-cinema-text hover:border-stage-ember transition-colors"
                      >
                        Depth: {debossDepth}mm
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Right: Editorial Specimen Copy */}
              <div className="lg:col-span-6 space-y-6">
                <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.18em] text-stage-ember">
                  <ActiveIcon className="w-4 h-4" />
                  <span>0{safeIndex + 1}</span>
                  <span className="h-px w-8 bg-stage-ember/50" />
                  <span>{activeItem.category}</span>
                </div>

                <h3 className="font-serif font-normal text-3xl sm:text-4xl lg:text-5xl text-cinema-text tracking-tight leading-[1.1]">
                  <Content value={activeItem.title} />
                </h3>

                <p className="text-sm sm:text-base text-cinema-muted font-sans leading-relaxed max-w-xl">
                  <Content value={activeItem.description} />
                </p>

                {activeItem.caption && isContentRenderable(activeItem.caption) && (
                  <blockquote className="pl-4 border-l-2 border-stage-ember space-y-1 py-1">
                    <span className="block text-[10px] font-mono uppercase tracking-[0.18em] text-stage-ember">
                      Field Note
                    </span>
                    <p className="text-sm sm:text-base font-serif italic text-cinema-text leading-relaxed">
                      &ldquo;<Content value={activeItem.caption} />&rdquo;
                    </p>
                  </blockquote>
                )}
              </div>
            </div>
          </section>

          {/* 3. Open 35mm Contact Sheet Index (All 4 Specimens) */}
          <section
            aria-label="Contact sheet specimen selector"
            className="space-y-2"
          >
            {/* Subtle Film Sprocket Perforation Rail */}
            <div
              aria-hidden="true"
              className="flex justify-between px-2 opacity-35"
            >
              {Array.from({ length: 18 }).map((_, i) => (
                <span
                  key={i}
                  className="w-2.5 h-1.5 rounded-[2px] border border-stage-ember/70"
                />
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-1">
              {validItems.map((item, idx) => {
                const Icon = getCategoryIcon(item.category);
                const isSelected = idx === safeIndex;
                const titleText = getContentText(item.title);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className={cn(
                      'text-left p-4 rounded-xl border transition-all flex flex-col justify-between gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-stage-ember',
                      isSelected
                        ? 'border-stage-ember bg-stage-ember/12'
                        : 'border-cinema-border/60 bg-cinema-bg/40 hover:border-stage-ember/50'
                    )}
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="inline-flex items-center gap-1.5 text-stage-ember font-semibold uppercase tracking-wider">
                        <Icon className="w-3.5 h-3.5" />
                        <span>{item.category}</span>
                      </span>
                      <span className="text-cinema-muted">0{idx + 1}</span>
                    </div>
                    <div className="font-serif text-base text-cinema-text leading-snug line-clamp-2">
                      {titleText}
                    </div>
                  </button>
                );
              })}
            </div>

            <div
              aria-hidden="true"
              className="flex justify-between px-2 opacity-35"
            >
              {Array.from({ length: 18 }).map((_, i) => (
                <span
                  key={i}
                  className="w-2.5 h-1.5 rounded-[2px] border border-stage-ember/70"
                />
              ))}
            </div>
          </section>

          {/* 4. Narrative Bridge leading into Epilogue */}
          <div className="pt-6 border-t border-cinema-border/40">
            <p className="text-sm sm:text-base font-serif italic text-cinema-muted max-w-2xl leading-relaxed">
              &ldquo;<Content value={chapter.bridge} />&rdquo;
            </p>
          </div>
        </Container>
      </div>
    </article>
  );
}
