import { z } from 'zod';
import { contentFieldSchema, ContentField, draft, placeholder } from './schema';

export const beyondCategorySchema = z.enum([
  'Research Bet',
  'Engineering Principle',
  'Future Frontier',
  'Open Hypothesis',
]);
export type BeyondCategory = z.infer<typeof beyondCategorySchema>;

export const beyondItemSchema = z.object({
  id: z.string(),
  title: contentFieldSchema,
  category: beyondCategorySchema,
  description: contentFieldSchema,
  currentInvestigation: contentFieldSchema,
  notes: contentFieldSchema.optional(),
});
export type BeyondItem = z.infer<typeof beyondItemSchema>;

const rawBeyond: BeyondItem[] = [
  {
    id: 'ambient-agentic-intelligence',
    title: draft('Ambient & Local-First Intelligence'),
    category: 'Future Frontier',
    description: draft(
      'Computing environments where local, private LLM agents collaborate with human operators without sending sensory or code context to central clouds.'
    ),
    currentInvestigation: placeholder('[TODO: detail current experiments in local agent orchestration, WASM inference, or tool execution]'),
  },
  {
    id: 'narrative-engineering-interfaces',
    title: draft('The Documentary Interface Paradigm'),
    category: 'Engineering Principle',
    description: draft(
      'Replacing utilitarian, lifeless dashboards with narrative-structured interfaces where data progression tells a sequential human story.'
    ),
    currentInvestigation: draft('Formulating the "Exposure" sunrise-ramp design system and adaptive scroll choreographies.'),
  },
  {
    id: 'resilient-civic-software',
    title: draft('High-Integrity Regional Resilience Systems'),
    category: 'Research Bet',
    description: draft(
      'Developing low-bandwidth, offline-first architectures capable of coordinating disaster response and civic resources during crisis disruptions in Northeast India.'
    ),
    currentInvestigation: placeholder('[TODO: add specific research notes regarding disaster protocols and regional GIS topologies]'),
  },
  {
    id: 'beyond-personal-hypothesis',
    title: placeholder('[TODO: add personal forward-looking engineering hypothesis or research question]'),
    category: 'Open Hypothesis',
    description: placeholder('[TODO: describe the open question Chinmoy is actively investigating for the coming years]'),
    currentInvestigation: placeholder('[TODO: current prototypes or literature being explored]'),
  },
];

export const beyond: BeyondItem[] = z.array(beyondItemSchema).parse(rawBeyond);
