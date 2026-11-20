'use client';

import React, { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { ChapterLabel } from '@/components/ui/ChapterLabel';
import { NarrationText } from '@/components/ui/NarrationText';
import { Button } from '@/components/ui/Button';
import { Tag } from '@/components/ui/Tag';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Content } from '@/components/content/Content';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useTheme } from '@/hooks/useTheme';
import { chapters } from '@/content/chapters';
import { Sun, Moon, CheckCircle2, ShieldCheck, Sparkles, Sliders } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function StyleguidePage() {
  const { resolvedTheme } = useTheme();
  const [testExposure, setTestExposure] = useState<number>(0);

  const handleExposureChange = (val: number) => {
    setTestExposure(val);
    document.documentElement.style.setProperty('--exposure', val.toFixed(3));
  };

  const neutralsDark = [
    { name: 'bg', token: 'bg-theme-bg', hex: '#000000', note: 'True neutral black' },
    { name: 'surface', token: 'bg-theme-surface', hex: '#0D0D0D', note: 'Base cards & containers' },
    { name: 'raised', token: 'bg-theme-surface-elevated', hex: '#171717', note: 'Elevated layers / hover' },
    { name: 'border', token: 'bg-theme-border', hex: '#262626', note: 'True neutral boundary' },
    { name: 'text', token: 'bg-theme-text', hex: '#F5F5F5', note: 'Primary text (19:1 contrast)' },
    { name: 'muted', token: 'bg-theme-muted', hex: '#A3A3A3', note: 'Secondary text (8.5:1 contrast)' },
    { name: 'thread gold', token: 'bg-theme-thread', hex: '#FFC857', note: 'Continuous spine cursor' },
  ];

  const neutralsLight = [
    { name: 'bg', token: 'bg-theme-bg', hex: '#FFF8EC', note: 'Warm daylight cream' },
    { name: 'surface', token: 'bg-theme-surface', hex: '#FFFFFF', note: 'Clean card surface' },
    { name: 'sand', token: 'bg-theme-sand', hex: '#F3ECDD', note: 'Raised layer / subtle contrast' },
    { name: 'border', token: 'bg-theme-border', hex: '#E8DCC4', note: 'Warm border tone' },
    { name: 'text', token: 'bg-theme-text', hex: '#14121F', note: 'Primary text (17.5:1 contrast)' },
    { name: 'muted', token: 'bg-theme-muted', hex: '#5E5A70', note: 'Secondary text (5.3:1 contrast)' },
    { name: 'thread gold', token: 'bg-theme-thread', hex: '#FFB000', note: 'Continuous spine cursor' },
  ];

  const sunriseAccents = [
    {
      name: 'Azure',
      chapter: 'Chapter 03',
      darkGlow: '#4C8DFF',
      lightFill: '#2E6BFF',
      lightTextSafe: '#1B4FD6',
      lightWash: '#E7EEFF',
      darkToken: 'theme-azure',
      accentKey: 'azure',
    },
    {
      name: 'Iris',
      chapter: 'Chapter 05',
      darkGlow: '#9B7BFF',
      lightFill: '#7B4DFF',
      lightTextSafe: '#5B35D8',
      lightWash: '#EFE8FF',
      darkToken: 'theme-iris',
      accentKey: 'iris',
    },
    {
      name: 'Rose',
      chapter: 'Chapter 04',
      darkGlow: '#FF5C8A',
      lightFill: '#F43F7A',
      lightTextSafe: '#C81E5B',
      lightWash: '#FFE6EE',
      darkToken: 'theme-rose',
      accentKey: 'rose',
    },
    {
      name: 'Ember',
      chapter: 'Chapter 07',
      darkGlow: '#FF8A4C',
      lightFill: '#FF6A1F',
      lightTextSafe: '#C2410C',
      lightWash: '#FFEBDD',
      darkToken: 'theme-ember',
      accentKey: 'ember',
    },
    {
      name: 'Gold',
      chapter: 'Prologue & Ch 01',
      darkGlow: '#FFC857',
      lightFill: '#FFB000',
      lightTextSafe: '#8A5A00',
      lightWash: '#FFF0CC',
      darkToken: 'theme-gold',
      accentKey: 'gold',
    },
  ];

  return (
    <div className="w-full min-h-screen py-16 transition-colors duration-300">
      <Container size="lg" className="space-y-16">
        {/* Styleguide Header */}
        <header className="border-b border-theme-border pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-chapter-accent font-semibold">
              Design System · Single Source of Truth
            </span>
            <h1 className="text-fluid-h1 font-serif font-normal text-theme-text tracking-[-0.01em]">
              The Exposure System
            </h1>
            <p className="text-sm font-sans text-theme-muted max-w-xl leading-relaxed">
              Tokens, typography, sunrise-ramp accents, and base components for &ldquo;A STORY STILL UNFOLDING&rdquo;.
            </p>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            {/* Live Theme Toggle */}
            <div className="flex items-center gap-2 p-2 rounded-xl bg-theme-surface border border-theme-border text-xs font-mono">
              <span className="text-theme-muted">Theme:</span>
              <ThemeToggle />
              <span className="font-semibold text-theme-text capitalize">{resolvedTheme}</span>
            </div>

            {/* Exposure Slider (Dark Mode Only) */}
            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-theme-surface border border-theme-border text-xs font-mono">
              <Sliders className="w-3.5 h-3.5 text-chapter-accent" />
              <span className="text-theme-muted">--exposure:</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={testExposure}
                onChange={(e) => handleExposureChange(parseFloat(e.target.value))}
                className="w-24 accent-chapter-accent cursor-pointer"
                aria-label="Exposure test slider"
              />
              <span className="w-10 tabular-nums text-theme-text font-semibold">
                {testExposure.toFixed(2)}
              </span>
            </div>
          </div>
        </header>

        {/* ===================================================================
            SECTION 1: 70 / 20 / 8 / 2 RATIO & NEUTRALS
            =================================================================== */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-theme-border pb-3 flex-wrap gap-2">
            <div>
              <h2 className="text-xl font-serif font-bold text-theme-text">1. Theme Neutrals & Hierarchy Ratios</h2>
              <p className="text-xs text-theme-muted">
                ~70% Neutrals · 20% Surfaces · 8% Chapter Accent · 2% Gold Thread
              </p>
            </div>
            <Tag variant="default" size="sm">
              Strictly R = G = B in Dark Mode
            </Tag>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {(resolvedTheme === 'dark' ? neutralsDark : neutralsLight).map((c) => (
              <div
                key={c.name}
                className="p-3 rounded-xl bg-theme-surface border border-theme-border space-y-2 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-theme-text capitalize">{c.name}</span>
                </div>
                <div
                  className={cn('w-full h-12 rounded-lg border border-theme-border shadow-xs', c.token)}
                  aria-label={`${c.name} color swatch`}
                />
                <div className="text-[10px] font-mono space-y-0.5">
                  <div className="text-theme-text font-semibold">{c.hex}</div>
                  <div className="text-theme-muted leading-tight">{c.note}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===================================================================
            SECTION 2: SUNRISE RAMP ACCENTS
            =================================================================== */}
        <section className="space-y-6">
          <div className="border-b border-theme-border pb-3 flex items-center justify-between flex-wrap gap-2">
            <div>
              <h2 className="text-xl font-serif font-bold text-theme-text">2. Sunrise Ramp Accents</h2>
              <p className="text-xs text-theme-muted">
                Azure → Iris → Rose → Ember → Gold
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-mono text-theme-muted">
              <ShieldCheck className="w-4 h-4 text-theme-gold" />
              <span>WCAG AA Contrast Verified</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {sunriseAccents.map((acc) => (
              <div
                key={acc.name}
                data-accent={acc.accentKey}
                className="p-4 rounded-2xl bg-theme-surface border border-theme-border space-y-3 shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-serif font-bold text-lg text-theme-text">{acc.name}</h3>
                  <Tag variant={acc.accentKey as 'gold' | 'rose' | 'azure' | 'iris' | 'ember'} size="sm">
                    {acc.name} Accent
                  </Tag>
                </div>
                <p className="text-[11px] font-mono text-theme-muted">{acc.chapter}</p>

                {/* Swatch Previews */}
                <div className="space-y-2 pt-1 text-xs font-mono">
                  <div className="p-2 rounded-lg bg-theme-surface-elevated border border-theme-border flex items-center justify-between">
                    <span className="text-[10px] text-theme-muted">Dark Glow:</span>
                    <span className="font-semibold text-chapter-accent">{acc.darkGlow}</span>
                  </div>

                  <div className="p-2 rounded-lg bg-theme-surface-elevated border border-theme-border flex items-center justify-between">
                    <span className="text-[10px] text-theme-muted">Text-Safe:</span>
                    <span className="font-semibold text-chapter-accent-text">{acc.lightTextSafe}</span>
                  </div>

                  <div className="p-2 rounded-lg bg-theme-surface-elevated border border-theme-border flex items-center justify-between">
                    <span className="text-[10px] text-theme-muted">Light Fill:</span>
                    <span className="font-semibold text-theme-text">{acc.lightFill}</span>
                  </div>

                  <div className="p-2 rounded-lg border border-theme-border bg-chapter-wash flex items-center justify-between">
                    <span className="text-[10px] text-theme-muted">Wash:</span>
                    <span className="text-[10px] text-theme-text font-semibold">{acc.lightWash}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===================================================================
            SECTION 3: CHAPTER MAPPING MATRIX
            =================================================================== */}
        <section className="space-y-6">
          <div className="border-b border-theme-border pb-3">
            <h2 className="text-xl font-serif font-bold text-theme-text">3. Chapter Theming Matrix</h2>
            <p className="text-xs text-theme-muted">
              [data-chapter] drives --accent, --accent-text, and --wash dynamically
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-theme-border bg-theme-surface">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-theme-surface-elevated text-theme-muted border-b border-theme-border">
                <tr>
                  <th className="p-3">Chapter</th>
                  <th className="p-3">Movement Title</th>
                  <th className="p-3">Accent Key</th>
                  <th className="p-3">Arc</th>
                  <th className="p-3">Preview</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-theme-border text-theme-text">
                {chapters.map((ch) => (
                  <tr key={ch.id} data-chapter={ch.id} data-accent={ch.accentKey} className="hover:bg-theme-surface-elevated/50">
                    <td className="p-3 font-semibold text-chapter-accent">
                      {ch.number === 0 ? 'Prologue' : typeof ch.number === 'number' ? `Chapter 0${ch.number}` : ch.number}
                    </td>
                    <td className="p-3 font-serif font-medium text-sm text-theme-text"><Content value={ch.title} /></td>
                    <td className="p-3 text-chapter-accent font-semibold">{ch.accentKey}</td>
                    <td className="p-3 text-theme-muted">{ch.emotionalArc}</td>
                    <td className="p-3">
                      <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md border border-theme-border bg-chapter-wash text-chapter-accent font-bold">
                        <span className="w-2 h-2 rounded-full bg-chapter-accent" />
                        <span>--accent</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ===================================================================
            SECTION 4: TYPOGRAPHY & TABULAR NUMERALS
            =================================================================== */}
        <section className="space-y-6">
          <div className="border-b border-theme-border pb-3 flex items-center justify-between flex-wrap gap-2">
            <div>
              <h2 className="text-xl font-serif font-bold text-theme-text">4. Typography & Numerals</h2>
              <p className="text-xs text-theme-muted">
                Instrument Serif (titles & narration) · Geist Sans (UI) · Geist Mono (data)
              </p>
            </div>
            <Tag variant="default" size="sm">
              font-feature-settings: &quot;zero&quot; 0, &quot;tnum&quot; 1, &quot;lnum&quot; 1
            </Tag>
          </div>

          <div className="p-6 rounded-2xl bg-theme-surface border border-theme-border space-y-6">
            <div>
              <span className="text-[10px] font-mono text-theme-muted uppercase tracking-wider block mb-1">
                Display Title (Fluid Display: 1.05–1.15 line-height, tracking -0.01em)
              </span>
              <h1 className="text-fluid-display font-serif font-normal text-theme-text">
                A Story Still <span className="italic text-chapter-accent">Unfolding</span>
              </h1>
            </div>

            <div>
              <span className="text-[10px] font-mono text-theme-muted uppercase tracking-wider block mb-1">
                Narration Voice (Fluid Narration: 1.35 line-height, real italics)
              </span>
              <blockquote className="text-fluid-narration font-serif italic text-theme-text max-w-3xl leading-[1.35]">
                &ldquo;Growth does not happen in isolation. It happens when software encounters real people, real friction, and real accountability.&rdquo;
              </blockquote>
            </div>

            <div>
              <span className="text-[10px] font-mono text-theme-muted uppercase tracking-wider block mb-2">
                Tabular Lining Numerals (Strictly NO slashed zeros, lining baseline, tabular alignment)
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm font-mono tabular-nums">
                <div className="p-3 rounded-lg bg-theme-surface-elevated border border-theme-border">
                  <span className="text-theme-muted block text-[10px]">TIME HUD:</span>
                  <span className="text-theme-text font-bold text-base">00:08:42:19</span>
                </div>
                <div className="p-3 rounded-lg bg-theme-surface-elevated border border-theme-border">
                  <span className="text-theme-muted block text-[10px]">CHAPTER:</span>
                  <span className="text-theme-text font-bold text-base">01 / 02 / 07</span>
                </div>
                <div className="p-3 rounded-lg bg-theme-surface-elevated border border-theme-border">
                  <span className="text-theme-muted block text-[10px]">ZERO TEST:</span>
                  <span className="text-theme-text font-bold text-base">0000 1000 2030</span>
                </div>
                <div className="p-3 rounded-lg bg-theme-surface-elevated border border-theme-border">
                  <span className="text-theme-muted block text-[10px]">YEAR METRICS:</span>
                  <span className="text-theme-text font-bold text-base">2024–2026</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 5: BASE COMPONENTS
            =================================================================== */}
        <section className="space-y-6">
          <div className="border-b border-theme-border pb-3">
            <h2 className="text-xl font-serif font-bold text-theme-text">5. Base Components Showcase</h2>
            <p className="text-xs text-theme-muted">
              ChapterLabel · NarrationText · Button · Tag · Card · Container · SectionWrapper
            </p>
          </div>

          <div className="space-y-6">
            {/* ChapterLabel & Tag */}
            <div className="p-6 rounded-2xl bg-theme-surface border border-theme-border space-y-4">
              <h3 className="text-sm font-mono uppercase tracking-wider text-theme-muted">ChapterLabel Variants</h3>
              <div className="flex flex-wrap items-center gap-4">
                <ChapterLabel chapter={1} timecode="00:04:12" arc="Curiosity" variant="badge" />
                <ChapterLabel chapter={2} timecode="00:08:30" arc="Convergence" variant="subtle" />
                <ChapterLabel chapter={3} timecode="00:14:00" arc="Creation" variant="line" />
              </div>

              <h3 className="text-sm font-mono uppercase tracking-wider text-theme-muted pt-4">Tag Variants</h3>
              <div className="flex flex-wrap gap-2">
                <Tag variant="default">DEFAULT</Tag>
                <Tag variant="accent">ACCENT</Tag>
                <Tag variant="gold">Gold Token</Tag>
                <Tag variant="rose">ROSE</Tag>
                <Tag variant="azure">AZURE</Tag>
                <Tag variant="iris">IRIS</Tag>
                <Tag variant="ember">EMBER</Tag>
                <Tag variant="outline">OUTLINE</Tag>
                <Tag variant="status">STATUS</Tag>
              </div>
            </div>

            {/* Buttons with visible focus rings */}
            <div className="p-6 rounded-2xl bg-theme-surface border border-theme-border space-y-4">
              <h3 className="text-sm font-mono uppercase tracking-wider text-theme-muted">
                Button Variants (Tokens Only · Visible Focus Ring)
              </h3>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary" size="md">Primary Button</Button>
                <Button variant="secondary" size="md">Secondary Button</Button>
                <Button variant="outline" size="md">Outline Button</Button>
                <Button variant="accent" size="md">Accent Button</Button>
                <Button variant="ghost" size="md">Ghost Button</Button>
              </div>
            </div>

            {/* Genuine Item Cards (Not Chapter Cards!) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card hoverEffect withWash>
                <CardHeader>
                  <Tag variant="azure" size="sm">ENGINEERING SPEC</Tag>
                  <span className="text-xs font-mono text-theme-muted">Point 01/10</span>
                </CardHeader>
                <CardTitle>Genuine Item Card (Standard)</CardTitle>
                <CardDescription>
                  Used exclusively for bona fide project case studies, design artifacts, and engineering specs. Never wrapped around an entire chapter scene.
                </CardDescription>
                <CardFooter>
                  <span className="text-xs font-mono text-theme-muted">Border + Surface Step</span>
                  <Button variant="outline" size="sm">Inspect &rarr;</Button>
                </CardFooter>
              </Card>

              <Card elevated hoverEffect>
                <CardHeader>
                  <Tag variant="ember" size="sm">RESEARCH BET</Tag>
                  <span className="text-xs font-mono text-theme-muted">Horizon Track</span>
                </CardHeader>
                <CardTitle>Genuine Item Card (Elevated)</CardTitle>
                <CardDescription>
                  In dark mode, elevated cards use the raised neutral surface (#171717) and strong border (#383838) so they distinctly separate without relying on invisible shadows.
                </CardDescription>
                <CardFooter>
                  <span className="text-xs font-mono text-theme-muted">Raised Step (#171717)</span>
                  <Button variant="accent" size="sm">Explore &rarr;</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}
