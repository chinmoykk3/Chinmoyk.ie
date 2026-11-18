export interface BeyondItem {
  id: string;
  title: string;
  category: 'Research Bet' | 'Engineering Principle' | 'Future Frontier' | 'Open Hypothesis';
  description: string;
  currentInvestigation: string;
  isPlaceholder: boolean;
  notes?: string;
}

export const beyond: BeyondItem[] = [
  {
    id: 'ambient-agentic-intelligence',
    title: 'Ambient & Local-First Intelligence',
    category: 'Future Frontier',
    description:
      'Computing environments where local, private LLM agents collaborate with human operators without sending sensory or code context to central clouds.',
    currentInvestigation:
      '[TODO: Detail current experiments in local agent orchestration, WASM inference, or tool usage]',
    isPlaceholder: true,
  },
  {
    id: 'narrative-engineering-interfaces',
    title: 'The Documentary Interface Paradigm',
    category: 'Engineering Principle',
    description:
      'Replacing utilitarian, lifeless dashboards with narrative-structured interfaces where data progression tells a sequential human story.',
    currentInvestigation:
      'Formulating the "Exposure" sunrise-ramp design system and adaptive scroll choreographies.',
    isPlaceholder: false,
  },
  {
    id: 'resilient-civic-software',
    title: 'High-Integrity Regional Resilience Systems',
    category: 'Research Bet',
    description:
      'Developing low-bandwidth, offline-first architectures capable of coordinating disaster response and civic resources during crisis disruptions in Northeast India.',
    currentInvestigation:
      '[TODO: Add specific research notes regarding disaster protocols and regional GIS topologies]',
    isPlaceholder: true,
  },
  {
    id: 'beyond-personal-hypothesis',
    title: '[TODO: Add personal forward-looking engineering hypothesis or research question]',
    category: 'Open Hypothesis',
    description:
      '[TODO: Describe the open question Chinmoy is actively investigating for the coming years]',
    currentInvestigation: '[TODO: Current prototypes or literature being explored]',
    isPlaceholder: true,
  },
];
