export interface TimelineMilestone {
  id: string;
  yearOrPeriod: string;
  title: string;
  stage:
    | 'Curiosity'
    | 'Discovery'
    | 'Experimentation'
    | 'Creation'
    | 'Expression'
    | 'Exploration'
    | 'Growth'
    | 'Possibility';
  summary: string;
  details?: string;
  isPlaceholder: boolean;
}

export const timeline: TimelineMilestone[] = [
  {
    id: 'timeline-early-spark',
    yearOrPeriod: 'Origins',
    title: 'The Inquisitive Spark',
    stage: 'Curiosity',
    summary: 'First encounters with computing, disassembly, and questioning internal mechanisms.',
    isPlaceholder: true,
  },
  {
    id: 'timeline-first-code',
    yearOrPeriod: 'Foundations',
    title: 'Writing the First Code',
    stage: 'Discovery',
    summary: 'Stepping into software engineering through foundational programming languages.',
    isPlaceholder: true,
  },
  {
    id: 'timeline-prototyping',
    yearOrPeriod: 'Prototypes',
    title: 'Rapid Prototyping & Breakdowns',
    stage: 'Experimentation',
    summary: 'Building experimental tools, hackathon participations, and learning through failure.',
    isPlaceholder: true,
  },
  {
    id: 'timeline-fullstack-architecture',
    yearOrPeriod: 'Architecture',
    title: 'Engineering Cohesive Systems',
    stage: 'Creation',
    summary: 'Developing full-stack architectures like Librarium 2.0 and structured data systems.',
    isPlaceholder: true,
  },
  {
    id: 'timeline-visual-craft',
    yearOrPeriod: 'Craft',
    title: 'Harmonizing Motion, 3D & User Interfaces',
    stage: 'Expression',
    summary: 'Refining typography, spatial interactions, Three.js canvases, and fluid transitions.',
    isPlaceholder: true,
  },
  {
    id: 'timeline-frontiers-web3-ai',
    yearOrPeriod: 'Frontiers',
    title: 'Decentralized & Intelligent Systems',
    stage: 'Exploration',
    summary: 'Explorations in Sahyog Cryptos, autonomous LLM agents, and decentralized topologies.',
    isPlaceholder: true,
  },
  {
    id: 'timeline-civic-and-campus-scale',
    yearOrPeriod: 'Production',
    title: 'Deploying for Real Organizations',
    stage: 'Growth',
    summary: 'Building GCU Campus Flow and IRDMS Assam for real community impact and resilience.',
    isPlaceholder: true,
  },
  {
    id: 'timeline-current-horizon',
    yearOrPeriod: 'Present & Beyond',
    title: 'A Story Still Unfolding',
    stage: 'Possibility',
    summary:
      'Continuing research, open-source work, and looking for transformative collaborations.',
    isPlaceholder: true,
  },
];
