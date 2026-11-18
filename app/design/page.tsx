import React from 'react';
import { designWorks } from '@/content/designWork';
import { Palette, Box, Layers, AlertCircle } from 'lucide-react';

export const metadata = {
  title: 'Design & Systems — Chinmoy Kalita',
  description:
    'Design systems, spatial 3D interfaces, visual identity, and ergonomic interaction architecture.',
};

export default function DesignPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Header */}
      <div className="border-b border-canvas-border pb-8">
        <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
          Craft & Aesthetics
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-black text-white mt-2">
          Design Systems & Spatial UI
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mt-3">
          Exploring typography, micro-interactions, dark-mode ergonomics, spatial WebGL canvases,
          and institutional interface systems.
        </p>
      </div>

      {/* Design Works List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {designWorks.map((work) => (
          <article
            key={work.id}
            className="p-6 rounded-2xl bg-canvas-surface border border-canvas-border space-y-4 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-zinc-800 text-amber-300">
                  {work.category}
                </span>
                <span className="text-zinc-400">{work.year}</span>
              </div>

              <h2 className="text-xl font-serif font-bold text-white">{work.title}</h2>

              <p className="text-sm text-zinc-300 leading-relaxed mt-2">{work.description}</p>

              {/* Deliverables */}
              <div className="mt-4 pt-3 border-t border-canvas-border space-y-2">
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                  Deliverables & Specs
                </span>
                <ul className="list-disc list-inside text-xs text-zinc-400 space-y-1">
                  {work.deliverables.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Tools */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {work.tools.map((tool, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded bg-zinc-850 text-[11px] font-mono text-zinc-300 border border-canvas-border"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {work.isPlaceholder && (
              <div className="mt-4 pt-3 border-t border-canvas-border text-[11px] font-mono text-amber-400 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Placeholders marked in /content/designWork.ts</span>
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
