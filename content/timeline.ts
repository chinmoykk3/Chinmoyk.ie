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
    yearOrPeriod: '[TODO: Year / Early Period]',
    title: 'The Inquisitive Spark',
    stage: 'Curiosity',
    summary: 'First encounters with computing, disassembly, and questioning internal mechanisms.',
    details: '[TODO: Specific personal memory or early technical trigger]',
    isPlaceholder: true,
  },
  {
    id: 'timeline-first-code',
    yearOrPeriod: '[TODO: Year]',
    title: 'Writing the First Code',
    stage: 'Discovery',
    summary: 'Stepping into software engineering through foundational programming languages.',
    details: '[TODO: First program, language, or milestone project]',
    isPlaceholder: true,
  },
  {
    id: 'timeline-prototyping',
    yearOrPeriod: '[TODO: Year]',
    title: 'Rapid Prototyping & Breakdowns',
    stage: 'Experimentation',
    summary: 'Building experimental tools, hackathon participations, and learning through failure.',
    details: '[TODO: List key early hacks, prototypes, and discoveries]',
    isPlaceholder: true,
  },
  {
    id: 'timeline-fullstack-architecture',
    yearOrPeriod: '[TODO: Year]',
    title: 'Engineering Cohesive Systems',
    stage: 'Creation',
    summary: 'Developing full-stack architectures like Librarium 2.0 and structured data systems.',
    details: '[TODO: Key systems delivered, team leadership, or architectural contributions]',
    isPlaceholder: true,
  },
  {
    id: 'timeline-visual-craft',
    yearOrPeriod: '[TODO: Year]',
    title: 'Harmonizing Motion, 3D & User Interfaces',
    stage: 'Expression',
    summary: 'Refining typography, spatial interactions, Three.js canvases, and fluid transitions.',
    details: '[TODO: Design milestones, creative coding, or showcase releases]',
    isPlaceholder: true,
  },
  {
    id: 'timeline-frontiers-web3-ai',
    yearOrPeriod: '[TODO: Year]',
    title: 'Decentralized & Intelligent Systems',
    stage: 'Exploration',
    summary: 'Explorations in Sahyog Cryptos, autonomous LLM agents, and decentralized topologies.',
    details: '[TODO: Technical breakthroughs in blockchain or AI exploration]',
    isPlaceholder: true,
  },
  {
    id: 'timeline-civic-and-campus-scale',
    yearOrPeriod: '[TODO: Year]',
    title: 'Deploying for Real Organizations',
    stage: 'Growth',
    summary: 'Building GCU Campus Flow and IRDMS Assam for real community impact and resilience.',
    details: '[TODO: Real institutional metrics, user feedback, or deployment numbers]',
    isPlaceholder: true,
  },
  {
    id: 'timeline-current-horizon',
    yearOrPeriod: 'Present & Beyond',
    title: 'A Story Still Unfolding',
    stage: 'Possibility',
    summary: 'Continuing research, open-source work, and looking for transformative collaborations.',
    details: '[TODO: Current focus, target roles, or next research ventures]',
    isPlaceholder: true,
  },
];
