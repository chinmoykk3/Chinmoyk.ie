'use client';

import { motion } from 'framer-motion';
import { Camera, Sparkles, UserCheck } from 'lucide-react';
import { SITE_IDENTITY } from '@/data/projectData';
import { fadeInUp } from '@/animations';

export function AboutSection() {
  return (
    <section id="about" className="py-28 border-b border-editorial-border relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Portrait Container with Strict Owner Photo Protocol */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-5 relative"
          >
            <div className="aspect-[4/5] rounded-2xl border border-editorial-border bg-background-subtle/80 overflow-hidden relative flex flex-col items-center justify-center p-8 text-center group">
              {/* Subtle grid backdrop */}
              <div className="absolute inset-0 bg-radial-gradient from-accent-blue/10 via-transparent to-transparent pointer-events-none" />

              <div className="relative z-10 space-y-4 max-w-xs">
                <div className="w-16 h-16 rounded-full border border-editorial-border bg-background flex items-center justify-center mx-auto text-accent-blue shadow-inner">
                  <Camera className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-foreground">
                    Authentic Portrait Reserved
                  </div>
                  <p className="text-xs text-foreground-dim font-mono leading-relaxed">
                    Reserved for high-resolution authentic photograph of Chinmoy Kalita. Synthetic avatars strictly prohibited by project protocol.
                  </p>
                </div>
                <div className="pt-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-background text-[11px] font-mono text-emerald-400 border border-emerald-950">
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Identity Verified</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-3 flex justify-between items-center text-[11px] font-mono text-foreground-dim">
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
              <div className="text-xs font-mono tracking-widest uppercase text-accent-amber">
                Chapter 03 &bull; Narrative
              </div>
              <h2 className="text-3xl sm:text-5xl font-serif font-normal text-foreground leading-tight">
                Architecting intelligent systems through graphic precision.
              </h2>
            </div>

            <div className="space-y-4 text-base sm:text-lg text-foreground-muted font-light leading-relaxed">
              <p>
                I operate at the convergence of software engineering, artificial intelligence, and visual design.
                Throughout my work, code is treated not merely as execution, but as an editorial medium—crafted
                to communicate intent, maintain architectural durability, and evoke genuine delight.
              </p>
              <p>
                From constructing distributed full-stack ecosystems like{' '}
                <strong className="text-foreground font-medium">SAHYOG</strong> to training and orchestrating
                knowledge models in <strong className="text-foreground font-medium">LIBRARIUM</strong>, and
                exploring real-time shader aesthetics in{' '}
                <strong className="text-foreground font-medium">SHUTTERSCAPE</strong>, my conviction remains:
                the highest form of technology is indistinguishable from thoughtful craft.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-4 border-t border-editorial-border">
              <div>
                <div className="text-2xl sm:text-3xl font-serif text-foreground">3+</div>
                <div className="text-xs font-mono text-foreground-dim uppercase mt-1">Disciplines Unified</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-serif text-foreground">100%</div>
                <div className="text-xs font-mono text-foreground-dim uppercase mt-1">TypeScript Strict</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-serif text-foreground">60 FPS</div>
                <div className="text-xs font-mono text-foreground-dim uppercase mt-1">Canvas Performance</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
