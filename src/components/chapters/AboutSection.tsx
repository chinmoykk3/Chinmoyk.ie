'use client';

import { motion } from 'framer-motion';
import { Camera, UserCheck } from 'lucide-react';
import { fadeInUp } from '@/animations';
import { ChapterLabel } from '@/components/shared/ChapterLabel';

export function AboutSection() {
  return (
    <section id="about" className="py-28 border-b border-editorial-border relative">
      <div className="max-w-7xl mx-auto px-6">
        <ChapterLabel
          number="03"
          label="Narrative &amp; Philosophy"
          metadata="Identity Frame"
          accent="ochre"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Portrait Container with Strict Owner Photo Protocol */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-5 relative"
          >
            <div className="aspect-[4/5] rounded-editorial-xl border border-editorial-border bg-canvas-card/75 backdrop-blur-md overflow-hidden relative flex flex-col items-center justify-center p-8 text-center group shadow-editorial-md">
              {/* Subtle radial aura */}
              <div className="absolute inset-0 bg-radial-gradient from-cobalt/10 via-transparent to-transparent pointer-events-none" />

              <div className="relative z-10 space-y-4 max-w-xs">
                <div className="w-16 h-16 rounded-full border border-editorial-border bg-canvas flex items-center justify-center mx-auto text-ochre shadow-inner">
                  <Camera className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-paper">
                    Authentic Portrait Reserved
                  </div>
                  <p className="text-2xs text-paper-dim font-mono leading-relaxed">
                    Reserved for high-resolution authentic photograph of Chinmoy Kalita. Synthetic avatars strictly prohibited by project protocol.
                  </p>
                </div>
                <div className="pt-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-canvas text-2xs font-mono text-emerald-400 border border-emerald-950">
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Identity Verified</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-3 flex justify-between items-center text-2xs font-mono text-paper-dim">
              <span>FIG 01. IDENTITY FRAME</span>
              <span>CHINMOY KALITA</span>
            </div>
          </motion.div>

          {/* Editorial Biography */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-normal text-paper leading-[1.08] tracking-tight">
                Architecting intelligent systems through{' '}
                <span className="italic font-light text-paper-muted">graphic precision.</span>
              </h2>
            </div>

            <div className="space-y-5 text-base sm:text-lg text-paper-muted font-light leading-relaxed">
              <p>
                I operate at the convergence of software engineering, artificial intelligence, and visual design.
                Throughout my work, code is treated not merely as execution, but as an editorial medium—crafted
                to communicate intent, maintain architectural durability, and evoke genuine delight.
              </p>
              <p>
                From constructing distributed full-stack ecosystems like{' '}
                <strong className="text-paper font-medium">SAHYOG</strong> to training and orchestrating
                knowledge models in <strong className="text-paper font-medium">LIBRARIUM</strong>, and
                exploring real-time shader aesthetics in{' '}
                <strong className="text-paper font-medium">SHUTTERSCAPE</strong>, my conviction remains:
                the highest form of technology is indistinguishable from thoughtful craft.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-editorial-border">
              <div>
                <div className="text-3xl sm:text-4xl font-serif text-paper">3+</div>
                <div className="text-2xs font-mono text-paper-dim uppercase tracking-wider mt-1">Disciplines Unified</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-serif text-paper">100%</div>
                <div className="text-2xs font-mono text-paper-dim uppercase tracking-wider mt-1">TypeScript Strict</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-serif text-paper">60 FPS</div>
                <div className="text-2xs font-mono text-paper-dim uppercase tracking-wider mt-1">Canvas Budget</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
