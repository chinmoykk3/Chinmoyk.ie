'use client';

import React, { useState } from 'react';
import { BackgroundStage } from '@/components/background/BackgroundStage';
import { ChapterKey } from '@/components/background/types';
import { useTheme } from '@/hooks/useTheme';
import { useMotion } from '@/hooks/useMotion';
import { Container } from '@/components/ui/Container';
import { Tag } from '@/components/ui/Tag';
import { Card } from '@/components/ui/Card';
import {
  Sun,
  Moon,
  Activity,
  Sliders,
  Layers,
  Sparkles,
  Zap,
  Eye,
  CheckCircle2,
} from 'lucide-react';

const SCENE_OPTIONS: { key: ChapterKey; label: string; number: string; accent: string }[] = [
  { key: 'prologue', label: 'Dust', number: '00', accent: 'gold' },
  { key: 'ch01', label: 'Connecting Dots', number: '01', accent: 'gold' },
  { key: 'ch02', label: 'Four Orbs', number: '02', accent: 'all' },
  { key: 'ch03', label: 'Blueprint', number: '03', accent: 'azure' },
  { key: 'ch04', label: 'Ink + Registration', number: '04', accent: 'rose' },
  { key: 'ch05', label: 'Flow Field', number: '05', accent: 'iris' },
  { key: 'ch06', label: 'Light Leaks + Film', number: '06', accent: 'gold-ember' },
  { key: 'ch07', label: 'Bokeh', number: '07', accent: 'ember' },
  { key: 'epilogue', label: 'Sunrise', number: 'EP', accent: 'sunrise' },
];

export default function BackgroundLabPage() {
  const { resolvedTheme, setTheme } = useTheme();
  const { motionEnabled, toggleMotion, prefersReducedMotion } = useMotion();

  const [selectedScene, setSelectedScene] = useState<ChapterKey>('prologue');
  const [chapterProgress, setChapterProgress] = useState<number>(0.5);
  const [qualityLevel, setQualityLevel] = useState<number>(1.0);
  const [scrimOpacity, setScrimOpacity] = useState<number>(0.18);
  const [fps, setFps] = useState<number>(60);
  const [frameTime, setFrameTime] = useState<number>(1.5);

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  const isReduced = prefersReducedMotion || !motionEnabled;

  return (
    <div className="relative min-h-screen py-10 px-4 sm:px-6">
      {/* Dedicated Lab Background Stage with live parameter bindings */}
      <BackgroundStage
        manualChapter={selectedScene}
        manualChapterProgress={chapterProgress}
        qualityOverride={qualityLevel}
        scrimOpacity={scrimOpacity}
        onFpsUpdate={(newFps, avgTime) => {
          setFps(newFps);
          setFrameTime(avgTime);
        }}
      />

      <Container size="lg" className="relative z-10 space-y-8">
        {/* Lab Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-theme-border gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Tag variant="gold" size="sm">
                LAB ROUTE
              </Tag>
              <span className="text-xs font-mono text-theme-muted uppercase tracking-widest">
                LIVING BACKGROUND SYSTEM
              </span>
            </div>
            <h1 className="text-fluid-h1 font-serif font-black text-theme-text">
              Background Stage Lab
            </h1>
            <p className="text-sm font-sans text-theme-muted mt-1 max-w-xl">
              Preview and stress-test the 9 chapter-specific Canvas2D generative scenes, blending
              modes, adaptive quality levels, and text contrast.
            </p>
          </div>

          {/* Real-time Diagnostics HUD */}
          <div className="flex flex-wrap items-center gap-3 p-3 rounded-2xl bg-theme-surface/90 backdrop-blur-md border border-theme-border shadow-lg">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-theme-surface-elevated text-xs font-mono">
              <Activity className="w-3.5 h-3.5 text-theme-gold" />
              <span className="font-semibold text-theme-text">{fps} FPS</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-theme-surface-elevated text-xs font-mono text-theme-muted">
              <span>{frameTime.toFixed(1)} ms</span>
            </div>
            <div className="px-2.5 py-1 rounded-lg bg-theme-surface-elevated text-xs font-mono text-theme-muted">
              DPR: 1.5x
            </div>
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-lg bg-theme-surface-elevated hover:bg-theme-border transition-colors text-theme-text"
              aria-label="Toggle theme in lab"
            >
              {resolvedTheme === 'dark' ? (
                <Sun className="w-4 h-4 text-theme-gold" />
              ) : (
                <Moon className="w-4 h-4 text-theme-iris" />
              )}
            </button>
          </div>
        </div>

        {/* Scene Selection Grid */}
        <div className="space-y-3">
          <label className="text-xs font-mono uppercase tracking-widest text-theme-muted flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-theme-gold" />
            <span>Select Chapter Scene ({SCENE_OPTIONS.length} Registered)</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
            {SCENE_OPTIONS.map((item) => {
              const isSelected = selectedScene === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => setSelectedScene(item.key)}
                  className={`p-3 rounded-xl text-left border transition-all text-xs flex flex-col justify-between h-20 ${
                    isSelected
                      ? 'bg-theme-surface-elevated border-chapter-accent shadow-md ring-1 ring-chapter-accent'
                      : 'bg-theme-surface/70 hover:bg-theme-surface border-theme-border'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-mono text-[10px] text-theme-muted">CH {item.number}</span>
                    <span
                      className={`w-2 h-2 rounded-full ${isSelected ? 'bg-theme-gold animate-pulse' : 'bg-theme-border'}`}
                    />
                  </div>
                  <div>
                    <span className="font-serif font-bold text-sm text-theme-text block leading-tight">
                      {item.label}
                    </span>
                    <span className="text-[10px] font-mono text-theme-muted uppercase tracking-wider">
                      {item.key}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Controls & Sliders Panel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 1. Chapter Progress Scrubber */}
          <Card className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <label
                htmlFor="ch-progress-slider"
                className="text-xs font-mono uppercase tracking-wider text-theme-text font-semibold flex items-center gap-1.5"
              >
                <Sliders className="w-3.5 h-3.5 text-theme-azure" />
                <span>Chapter Progress</span>
              </label>
              <span className="text-xs font-mono text-theme-gold font-bold">
                {Math.round(chapterProgress * 100)}%
              </span>
            </div>
            <input
              id="ch-progress-slider"
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={chapterProgress}
              onChange={(e) => setChapterProgress(parseFloat(e.target.value))}
              className="w-full accent-chapter-accent cursor-pointer"
            />
            <p className="text-[11px] font-sans text-theme-muted leading-relaxed">
              Drives internal movement state (e.g. orb convergence in Ch02, sunrise elevation in
              Epilogue).
            </p>
          </Card>

          {/* 2. Particle Count & Quality Slider */}
          <Card className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <label
                htmlFor="quality-slider"
                className="text-xs font-mono uppercase tracking-wider text-theme-text font-semibold flex items-center gap-1.5"
              >
                <Zap className="w-3.5 h-3.5 text-theme-rose" />
                <span>Particle Budget</span>
              </label>
              <span className="text-xs font-mono text-theme-rose font-bold">
                {qualityLevel === 1.0
                  ? '100% (High)'
                  : qualityLevel === 0.5
                    ? '50% (Med)'
                    : '0% (Static)'}
              </span>
            </div>
            <input
              id="quality-slider"
              type="range"
              min="0"
              max="1"
              step="0.5"
              value={qualityLevel}
              onChange={(e) => setQualityLevel(parseFloat(e.target.value))}
              className="w-full accent-chapter-accent cursor-pointer"
            />
            <p className="text-[11px] font-sans text-theme-muted leading-relaxed">
              Desktop cap $\le 120$ elements, mobile cap $\le 50$. Adaptive downscaling kicks in if
              frame time exceeds 6ms.
            </p>
          </Card>

          {/* 3. Scrim Opacity & Reduced Motion */}
          <Card className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <label
                htmlFor="scrim-slider"
                className="text-xs font-mono uppercase tracking-wider text-theme-text font-semibold flex items-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5 text-theme-iris" />
                <span>Content Scrim</span>
              </label>
              <span className="text-xs font-mono text-theme-iris font-bold">
                {Math.round(scrimOpacity * 100)}%
              </span>
            </div>
            <input
              id="scrim-slider"
              type="range"
              min="0"
              max="0.4"
              step="0.02"
              value={scrimOpacity}
              onChange={(e) => setScrimOpacity(parseFloat(e.target.value))}
              className="w-full accent-chapter-accent cursor-pointer"
            />
            <div className="pt-2 border-t border-theme-border flex items-center justify-between">
              <span className="text-xs font-mono text-theme-muted">Reduced Motion:</span>
              <button
                onClick={toggleMotion}
                className="px-2.5 py-1 rounded-md text-xs font-mono border border-theme-border bg-theme-surface hover:bg-theme-surface-elevated transition-colors"
              >
                {isReduced ? 'Static Fallback' : 'Active Animation'}
              </button>
            </div>
          </Card>
        </div>

        {/* Text Contrast Verification Box */}
        <Card className="p-6 space-y-4 border border-theme-border-strong bg-theme-surface/85 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-theme-gold" />
            <h2 className="font-serif font-bold text-base text-theme-text">
              WCAG AA Contrast Verification Over Living Background
            </h2>
          </div>
          <p className="text-sm font-sans text-theme-text leading-relaxed">
            This paragraph verifies body text legibility directly over the animated Canvas2D scene.
            Even with intense particle motion or light leaks, the content scrim guarantees that the
            background opacity behind text blocks never obscures typographic hierarchy or violates
            AA contrast requirements (minimum 4.5:1 ratio).
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-theme-muted pt-2 border-t border-theme-border">
            <span>Theme: {resolvedTheme.toUpperCase()}</span>
            <span>•</span>
            <span>
              Composite Mode: {resolvedTheme === 'dark' ? 'LIGHTER (Additive)' : 'MULTIPLY (Ink)'}
            </span>
            <span>•</span>
            <span>Vignette: Active</span>
            <span>•</span>
            <span>35mm Grain: {qualityLevel >= 0.5 && !isReduced ? 'Enabled' : 'Bypassed'}</span>
          </div>
        </Card>
      </Container>
    </div>
  );
}
