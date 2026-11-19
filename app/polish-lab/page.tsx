'use client';

import React, { useState } from 'react';
import { usePolish } from '@/components/polish/PolishContext';
import { useMotion } from '@/hooks/useMotion';
import { DirectorsCommentary } from '@/components/polish/DirectorsCommentary';
import { Magnetic } from '@/components/polish/Magnetic';
import { Container } from '@/components/ui/Container';
import { Tag } from '@/components/ui/Tag';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  Film,
  Sparkles,
  Sliders,
  Play,
  Volume2,
  MousePointer,
  Clock,
  Eye,
  CheckCircle2,
  Tv,
} from 'lucide-react';

export default function PolishLabPage() {
  const {
    triggerLowerThird,
    commentaryEnabled,
    toggleCommentary,
    soundEnabled,
    toggleSound,
    reduceEffects,
    toggleReduceEffects,
    useDefaultCursor,
    toggleUseDefaultCursor,
  } = usePolish();

  const { prefersReducedMotion } = useMotion();
  const [testInput, setTestInput] = useState('');

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 space-y-12">
      <Container size="lg" className="space-y-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-theme-border gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Tag variant="gold" size="sm">
                LAB ROUTE
              </Tag>
              <span className="text-xs font-mono text-theme-muted uppercase tracking-widest">
                CINEMATIC POLISH LAYER
              </span>
            </div>
            <h1 className="text-fluid-h1 font-serif font-black text-theme-text">
              Cinematic Polish Lab
            </h1>
            <p className="text-sm font-sans text-theme-muted mt-1 max-w-xl">
              Inspect and verify the documentary polish layer: lower-thirds, viewfinder cursor,
              director commentary cards, procedural ambient bed, film-leader preloader, and magnetic
              physics.
            </p>
          </div>

          {/* Quick Directing Toggles */}
          <div className="flex flex-wrap items-center gap-2 p-3 rounded-2xl bg-theme-surface/90 border border-theme-border shadow-sm">
            <button
              onClick={toggleReduceEffects}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono border transition-all ${
                reduceEffects
                  ? 'bg-theme-gold/20 border-theme-gold text-theme-gold font-bold'
                  : 'bg-theme-surface border-theme-border text-theme-muted'
              }`}
            >
              Reduce Effects: {reduceEffects ? 'ON' : 'OFF'}
            </button>
            <button
              onClick={toggleUseDefaultCursor}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono border transition-all ${
                useDefaultCursor
                  ? 'bg-theme-azure/20 border-theme-azure text-theme-azure font-bold'
                  : 'bg-theme-surface border-theme-border text-theme-muted'
              }`}
            >
              Default Cursor: {useDefaultCursor ? 'YES' : 'NO'}
            </button>
          </div>
        </div>

        {/* Feature 1: Lower-Thirds Dispatcher */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Tv className="w-4 h-4 text-theme-gold" />
            <h2 className="font-serif font-bold text-lg text-theme-text">
              1. Lower-Thirds Cinematic Slates
            </h2>
          </div>
          <p className="text-xs text-theme-muted max-w-2xl leading-relaxed">
            Trigger documentary lower-thirds. Slides in smoothly from bottom-left with gold accent
            bar, auto-hiding after 4.2 seconds. Statically rendered when reduced motion or reduced
            effects is enabled.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() =>
                triggerLowerThird({
                  category: 'CHAPTER MOVEMENT 03',
                  title: 'Chapter 03: I Wanted To Build Something Real',
                  subtitle: 'From exploratory scripts to concrete, deployed systems',
                })
              }
            >
              Trigger Chapter 03 Slate
            </Button>

            <Button
              variant="secondary"
              size="sm"
              onClick={() =>
                triggerLowerThird({
                  category: 'ENGINEERING ARTIFACT',
                  title: 'Sahyog Cryptos · Peer-to-Peer Escrow Protocol',
                  subtitle: 'Decentralized lending contract deployed on Polygon',
                })
              }
            >
              Trigger Project Slate
            </Button>

            <Button
              variant="secondary"
              size="sm"
              onClick={() =>
                triggerLowerThird({
                  category: 'SPATIAL DESIGN',
                  title: 'Visual Voice & Tactile Typography',
                  subtitle: 'Instrument Serif editorial layout and fluid motion physics',
                })
              }
            >
              Trigger Design Slate
            </Button>
          </div>
        </Card>

        {/* Feature 2: Viewfinder Cursor Playground */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2">
            <MousePointer className="w-4 h-4 text-theme-azure" />
            <h2 className="font-serif font-bold text-lg text-theme-text">
              2. Viewfinder Cursor Interactive Targets
            </h2>
          </div>
          <p className="text-xs text-theme-muted max-w-2xl leading-relaxed">
            Hover over different elements below on desktop with a fine pointer. Over projects/media
            it morphs into a camera viewfinder reticle; over inputs and links it restores the native
            cursor.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {/* View Target */}
            <div
              data-cursor="view"
              data-cursor-label="VIEW"
              className="p-6 rounded-xl border border-theme-border bg-theme-surface flex flex-col items-center justify-center text-center cursor-none transition-colors hover:border-theme-gold"
            >
              <Eye className="w-6 h-6 text-theme-gold mb-2" />
              <span className="font-serif font-bold text-sm text-theme-text">Viewfinder: VIEW</span>
              <span className="text-[10px] font-mono text-theme-muted mt-1">Hover over me</span>
            </div>

            {/* Play Target */}
            <div
              data-cursor="play"
              data-cursor-label="PLAY"
              className="p-6 rounded-xl border border-theme-border bg-theme-surface flex flex-col items-center justify-center text-center cursor-none transition-colors hover:border-theme-iris"
            >
              <Play className="w-6 h-6 text-theme-iris mb-2" />
              <span className="font-serif font-bold text-sm text-theme-text">Viewfinder: PLAY</span>
              <span className="text-[10px] font-mono text-theme-muted mt-1">Hover over me</span>
            </div>

            {/* Native Input Target */}
            <div className="p-4 rounded-xl border border-theme-border bg-theme-surface flex flex-col justify-center space-y-2">
              <label htmlFor="test-field" className="text-xs font-mono text-theme-muted">
                Native Cursor Restoration:
              </label>
              <input
                id="test-field"
                type="text"
                placeholder="Type here (native text cursor)..."
                value={testInput}
                onChange={(e) => setTestInput(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-theme-border bg-theme-surface-elevated text-xs font-sans text-theme-text focus:outline-none focus:ring-1 focus:ring-theme-gold"
              />
            </div>
          </div>
        </Card>

        {/* Feature 3: Director's Commentary Annotations */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Film className="w-4 h-4 text-theme-gold" />
              <h2 className="font-serif font-bold text-lg text-theme-text">
                3. Director&apos;s Commentary Notes
              </h2>
            </div>
            <Button
              variant={commentaryEnabled ? 'primary' : 'outline'}
              size="sm"
              onClick={toggleCommentary}
            >
              {commentaryEnabled ? 'Commentary Active' : 'Enable Commentary'}
            </Button>
          </div>
          <p className="text-xs text-theme-muted max-w-2xl leading-relaxed">
            When toggled, behind-the-scenes reflections appear beside chapters and project case
            studies, rendered with a thin gold connector and clear author notes.
          </p>

          <div className="pt-2 space-y-3">
            <DirectorsCommentary id="chapter-01" />
            <DirectorsCommentary id="sahyog-cryptos" />
            <DirectorsCommentary id="epilogue" />
          </div>
        </Card>

        {/* Feature 4: Magnetic Button Physics */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-theme-rose" />
            <h2 className="font-serif font-bold text-lg text-theme-text">
              4. Magnetic Button Micro-Interactions
            </h2>
          </div>
          <p className="text-xs text-theme-muted max-w-2xl leading-relaxed">
            Desktop buttons gently pull toward the cursor ($\le 8$px) within their proximity radius
            without altering focus rings or affecting keyboard accessibility.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Magnetic maxPull={8}>
              <button className="px-5 py-2.5 rounded-full bg-theme-text text-theme-bg font-sans font-semibold text-xs tracking-wide shadow-md hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-chapter-accent">
                Magnetic Primary Button
              </button>
            </Magnetic>

            <Magnetic maxPull={6}>
              <button className="px-5 py-2.5 rounded-full bg-theme-surface border border-theme-border text-theme-text font-sans font-medium text-xs shadow-sm hover:bg-theme-surface-elevated focus:outline-none focus-visible:ring-2 focus-visible:ring-chapter-accent">
                Magnetic Secondary Button
              </button>
            </Magnetic>
          </div>
        </Card>

        {/* Feature 5: Ambient Soundscape */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-theme-iris" />
              <h2 className="font-serif font-bold text-lg text-theme-text">
                5. Quiet Ambient Audio Bed
              </h2>
            </div>
            <Button variant={soundEnabled ? 'primary' : 'outline'} size="sm" onClick={toggleSound}>
              {soundEnabled ? 'Sound Enabled' : 'Enable Ambient Sound'}
            </Button>
          </div>
          <p className="text-xs text-theme-muted max-w-2xl leading-relaxed">
            Synthesizes a quiet harmonic bed using Web Audio API twin detuned sines with a resonant
            lowpass filter (capped volume $\le 0.05$). Crossfades frequencies per chapter. Off by
            default with visible mute indicator.
          </p>
        </Card>
      </Container>
    </div>
  );
}
