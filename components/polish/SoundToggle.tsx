'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import { usePolish } from './PolishContext';
import { soundManifest } from '@/content/sound';
import { Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';

export function SoundToggle({ className }: { className?: string }) {
  const { soundEnabled, toggleSound, activeChapterKey, reduceEffects } = usePolish();

  // Lazy Web Audio API references
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);

  // Initialize or resume audio only on explicit user engagement
  const handleToggle = useCallback(() => {
    // If turning on and AudioContext not yet created, instantiate now
    if (!soundEnabled) {
      if (!audioCtxRef.current) {
        try {
          const AudioContextClass =
            window.AudioContext ||
            (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
          const ctx = new AudioContextClass();
          audioCtxRef.current = ctx;

          // Master volume cap (ultra-quiet ambient bed: 0.05 max)
          const masterGain = ctx.createGain();
          masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
          masterGain.connect(ctx.destination);
          masterGainRef.current = masterGain;

          // Warm lowpass filter to produce deep soft cinematic tone
          const filter = ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(140, ctx.currentTime);
          filter.Q.setValueAtTime(1.5, ctx.currentTime);
          filter.connect(masterGain);
          filterRef.current = filter;

          // Oscillator 1: fundamental warm drone
          const osc1 = ctx.createOscillator();
          osc1.type = 'sine';
          osc1.frequency.setValueAtTime(55, ctx.currentTime); // A1 base
          osc1.connect(filter);
          osc1.start();
          osc1Ref.current = osc1;

          // Oscillator 2: harmonic subtle shimmer (detuned by +1.5Hz)
          const osc2 = ctx.createOscillator();
          osc2.type = 'sine';
          osc2.frequency.setValueAtTime(110.5, ctx.currentTime); // A2 harmonic
          osc2.connect(filter);
          osc2.start();
          osc2Ref.current = osc2;
        } catch {
          // Graceful fallback if Web Audio is unsupported
        }
      }

      if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      // Smooth ramp up
      if (masterGainRef.current && audioCtxRef.current) {
        masterGainRef.current.gain.linearRampToValueAtTime(
          0.045,
          audioCtxRef.current.currentTime + 1.2
        );
      }
    } else {
      // Smooth ramp down and suspend
      if (masterGainRef.current && audioCtxRef.current) {
        masterGainRef.current.gain.linearRampToValueAtTime(
          0.0001,
          audioCtxRef.current.currentTime + 0.4
        );
        setTimeout(() => {
          if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
            audioCtxRef.current.suspend();
          }
        }, 450);
      }
    }

    toggleSound();
  }, [soundEnabled, toggleSound]);

  // Harmonically crossfade fundamental frequency as chapters advance
  useEffect(() => {
    if (!soundEnabled || !audioCtxRef.current || !osc1Ref.current || !osc2Ref.current) return;

    const track = soundManifest.find((t) => t.chapterKey === activeChapterKey) || soundManifest[0];
    const baseFreq = track.frequencyHz || 55;
    const now = audioCtxRef.current.currentTime;

    osc1Ref.current.frequency.exponentialRampToValueAtTime(baseFreq, now + 1.8);
    osc2Ref.current.frequency.exponentialRampToValueAtTime(baseFreq * 2 + 0.8, now + 1.8);
  }, [activeChapterKey, soundEnabled]);

  // If reduce effects is activated, mute sound automatically
  useEffect(() => {
    if (reduceEffects && soundEnabled) {
      handleToggle();
    }
  }, [reduceEffects, soundEnabled, handleToggle]);

  // Teardown
  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-pressed={soundEnabled}
      aria-label={soundEnabled ? 'Mute ambient soundscape' : 'Enable quiet ambient soundscape'}
      title={soundEnabled ? 'Mute Ambient Sound' : 'Play Ambient Sound (Off by default)'}
      className={cn(
        'relative inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-mono transition-all',
        'border focus:outline-none focus-visible:ring-2 focus-visible:ring-chapter-accent',
        soundEnabled
          ? 'bg-theme-gold/15 border-theme-gold text-theme-gold font-semibold shadow-xs'
          : 'bg-theme-surface border-theme-border text-theme-muted hover:text-theme-text hover:bg-theme-surface-elevated',
        className
      )}
    >
      {soundEnabled ? (
        <>
          <Volume2 className="w-3.5 h-3.5 text-theme-gold animate-pulse" />
          <span className="hidden sm:inline">Audio On</span>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5 text-theme-muted" />
          <span className="hidden sm:inline">Sound</span>
        </>
      )}
    </button>
  );
}
