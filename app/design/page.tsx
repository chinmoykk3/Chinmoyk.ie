import React from 'react';
import { designWorks } from '@/content/designWork';
import { Container } from '@/components/ui/Container';
import { Tag } from '@/components/ui/Tag';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/Card';
import { Content } from '@/components/content/Content';

export const metadata = {
  title: 'Design & Systems — Chinmoy Kalita',
  description:
    'Design systems, spatial 3D interfaces, visual identity, and ergonomic interaction architecture.',
  alternates: {
    canonical: '/design',
  },
};

export default function DesignPage() {
  return (
    <Container className="py-12 sm:py-16 space-y-16">
      {/* Header */}
      <div className="border-b border-theme-border pb-8">
        <Tag variant="rose" size="sm">
          Craft &amp; Aesthetics
        </Tag>
        <h1 className="text-fluid-h1 font-serif font-black text-theme-text mt-3">
          Design Systems &amp; Spatial UI
        </h1>
        <p className="text-theme-muted text-sm sm:text-base max-w-2xl mt-3">
          Exploring typography, micro-interactions, true-neutral dark mode, warm cream light mode,
          and spatial WebGL canvases.
        </p>
      </div>

      {/* Design Works List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {designWorks.map((work) => (
          <Card key={work.id} className="flex flex-col justify-between">
            <div>
              <CardHeader>
                <Tag variant="accent" size="sm">
                  {work.category}
                </Tag>
              </CardHeader>

              <CardTitle><Content value={work.title} /></CardTitle>
              <CardDescription><Content value={work.description} /></CardDescription>

              {/* Deliverables */}
              <div className="mt-4 pt-3 border-t border-theme-border space-y-2">
                <span className="text-xs font-mono text-theme-muted uppercase tracking-wider block">
                  Deliverables &amp; Specs
                </span>
                <ul className="list-disc list-inside text-xs text-theme-muted space-y-1">
                  {work.deliverables.map((item, idx) => (
                    <li key={idx}><Content value={item} /></li>
                  ))}
                </ul>
              </div>

              {/* Tools */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {work.tools.map((tool, i) => (
                  <Tag key={i} variant="default" size="sm">
                    <Content value={tool} />
                  </Tag>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Container>
  );
}
