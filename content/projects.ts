export type ProjectStatus = 'completed' | 'in-progress' | 'prototype';

export interface ProjectTenPointFramework {
  /** 1. Core premise and concept */
  idea: string;
  /** 2. Specific friction, inefficiency, or pain point */
  problem: string;
  /** 3. Catalyst and personal motivation */
  motivation: string;
  /** 4. The ideal end-state or long-term aspiration */
  vision: string;
  /** 5. Chinmoy's individual engineering and architectural authorship */
  contribution: string;
  /** 6. Research, prototyping, testing, and implementation process */
  process: string;
  /** 7. Technologies, libraries, infra, and tools */
  stack: string[];
  /** 8. Roadblocks and technical obstacles */
  challenges: string;
  /** 9. Measurable results, verified benchmarks, or delivery milestones */
  outcomes: string;
  /** 10. Core takeaways and engineering lessons */
  lessons: string;
}

export interface ProjectEvidence {
  screenshots: { caption: string; url?: string; placeholder: string }[];
  demoVideo: { caption: string; url?: string; placeholder: string };
  repoLink: { url?: string; placeholder: string };
  liveLink: { url?: string; placeholder: string };
}

export interface ArchitectureNode {
  id: string;
  label: string;
  sublabel: string;
  type: 'client' | 'gateway' | 'service' | 'db' | 'ledger' | 'ai';
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  year?: string;
  status: ProjectStatus;
  isPlaceholder: boolean;
  category:
    'Full-Stack & Systems' | 'Decentralized / Web3' | 'Civic Tech & Gov' | 'Educational & Campus';
  featured: boolean;
  framework: ProjectTenPointFramework;
  architectureNodes: ArchitectureNode[];
  evidence: ProjectEvidence;
  links?: {
    demo?: string;
    github?: string;
    caseStudy?: string;
  };
}

export const projects: Project[] = [
  {
    id: 'sahyog-cryptos',
    slug: 'sahyog-cryptos',
    title: 'Sahyog Cryptos',
    tagline: 'Collaborative crypto-asset management and decentralized transaction framework',
    year: '[TODO: Add project year/dates]',
    status: 'prototype',
    isPlaceholder: true,
    category: 'Decentralized / Web3',
    featured: true,
    framework: {
      idea: '[TODO: Define core idea for Sahyog Cryptos — e.g. cooperative crypto-asset custody or micro-community staking]',
      problem:
        '[TODO: Specify problem statement — friction in group management, transparency, or trust in decentralized crypto transactions]',
      motivation: '[TODO: Add personal motivation for building Sahyog Cryptos]',
      vision:
        '[TODO: Add vision for decentralized collective finance or community trust protocols]',
      contribution:
        '[TODO: Detail Chinmoy’s specific technical role — smart contracts, frontend, state management, or architecture]',
      process: '[TODO: Document the technical process, prototyping phase, and testing setup]',
      stack: [
        'Web3 / Smart Contracts [TODO: verify chain / Solidity]',
        'TypeScript',
        'Next.js / React',
        'Tailwind CSS',
        '[TODO: Add real node/indexer/wallet provider]',
      ],
      challenges:
        '[TODO: Document key technical roadblocks — e.g. gas optimization, multi-sig consensus, or state synchronization]',
      outcomes:
        '[TODO: Add real verified metrics, testing outcomes, or deployment milestones — DO NOT INVENT]',
      lessons:
        '[TODO: Key lessons learned about blockchain mechanics, trustless systems, or UX friction]',
    },
    links: {
      github: '[TODO: add repo URL if public]',
      demo: '[TODO: add live demo URL if deployed]',
    },
    architectureNodes: [
      { id: 'n1', label: 'Client Interface', sublabel: 'React / Web3 Provider', type: 'client' },
      { id: 'n2', label: 'RPC Router', sublabel: 'EIP-1193 Gateway', type: 'gateway' },
      { id: 'n3', label: 'Multi-Sig Engine', sublabel: 'Consensus Coordinator', type: 'service' },
      { id: 'n4', label: 'On-Chain Ledger', sublabel: 'EVM Contract State', type: 'ledger' },
    ],
    evidence: {
      screenshots: [
        {
          caption: 'Transaction Reconciliation & Custody Dashboard',
          placeholder: '[TODO: Add verified dashboard screenshot / wireframe]',
        },
        {
          caption: 'Smart Contract Interaction Matrix',
          placeholder: '[TODO: Add verified interaction screenshot]',
        },
      ],
      demoVideo: {
        caption: 'Interactive Walkthrough of Asset Flow',
        placeholder: '[TODO: Add Loom or MP4 demo link when recorded]',
      },
      repoLink: {
        placeholder: '[TODO: Add public GitHub link or request access]',
      },
      liveLink: {
        placeholder: '[TODO: Add testnet or production deployment link]',
      },
    },
  },
  {
    id: 'librarium-2-0',
    slug: 'librarium-2-0',
    title: 'Librarium 2.0',
    tagline: 'Next-generation intelligent library information and resource orchestration platform',
    year: '[TODO: Add project year/dates]',
    status: 'prototype',
    isPlaceholder: true,
    category: 'Full-Stack & Systems',
    featured: true,
    framework: {
      idea: '[TODO: Define core premise of Librarium 2.0 — e.g. modern digital cataloging, intelligent indexing, and physical resource tracking]',
      problem:
        '[TODO: Specific pain point in legacy library systems — search latency, manual checkout overhead, fragmented indexes]',
      motivation:
        '[TODO: Motivation for re-engineering the library experience into a 2.0 architecture]',
      vision: '[TODO: Vision for seamless knowledge discovery and open resource access]',
      contribution:
        '[TODO: Detail Chinmoy’s individual engineering contributions — DB schema, full-stack API, client UI]',
      process: '[TODO: Step-by-step development process, user research, schema normalization]',
      stack: [
        'TypeScript',
        'Next.js / React',
        'Database [TODO: PostgreSQL / MongoDB / Supabase]',
        'Search / Query Indexing [TODO: specify]',
        'Tailwind CSS',
      ],
      challenges:
        '[TODO: Real challenges faced — e.g. catalog search latency, concurrency handling, or asset tagging]',
      outcomes:
        '[TODO: Real metrics or project outcome — e.g. number of cataloged items, adoption status — DO NOT INVENT]',
      lessons:
        '[TODO: Engineering insights gained regarding data relational integrity and search ergonomics]',
    },
    links: {
      github: '[TODO: add repo URL if public]',
      demo: '[TODO: add live demo URL if deployed]',
    },
    architectureNodes: [
      { id: 'n1', label: 'Catalog Portal', sublabel: 'Next.js App Client', type: 'client' },
      { id: 'n2', label: 'Edge Gateway', sublabel: 'REST & Search Edge', type: 'gateway' },
      { id: 'n3', label: 'Indexing Engine', sublabel: 'Faceted Search Core', type: 'service' },
      { id: 'n4', label: 'Relational Store', sublabel: 'Normalized Catalog DB', type: 'db' },
    ],
    evidence: {
      screenshots: [
        {
          caption: 'Resource Search & Filtering Interface',
          placeholder: '[TODO: Add screenshot of search results and filters]',
        },
        {
          caption: 'Administrative Asset Tracking Portal',
          placeholder: '[TODO: Add screenshot of checkout & asset management]',
        },
      ],
      demoVideo: {
        caption: 'End-to-End Search & Checkout Demo',
        placeholder: '[TODO: Add video walkthrough link]',
      },
      repoLink: {
        placeholder: '[TODO: Add repository URL if public]',
      },
      liveLink: {
        placeholder: '[TODO: Add deployed URL if available]',
      },
    },
  },
  {
    id: 'gcu-campus-flow',
    slug: 'gcu-campus-flow',
    title: 'GCU Campus Flow',
    tagline: 'Unified campus workflow management and digital operational hub for university life',
    year: '[TODO: Add project year/dates]',
    status: 'prototype',
    isPlaceholder: true,
    category: 'Educational & Campus',
    featured: true,
    framework: {
      idea: '[TODO: Define core premise of GCU Campus Flow — centralized digital operations, attendance, event flow, or admin workflows]',
      problem:
        '[TODO: Disjointed university administration, paper trails, or siloed departmental portals at Girijananda Chowdhury University (GCU)]',
      motivation: '[TODO: Motivation for tackling university operational friction]',
      vision: '[TODO: Vision for a frictionless, unified digital campus ecosystem]',
      contribution:
        '[TODO: Chinmoy’s specific engineering scope — full-stack architecture, role-based auth, dashboard design]',
      process:
        '[TODO: Stakeholder consultation, workflow mapping, rapid prototyping, campus iteration]',
      stack: [
        'TypeScript',
        'React / Next.js',
        'Node.js / Express or Next.js App Router API',
        'Database [TODO: specify SQL / NoSQL]',
        'Tailwind CSS',
        'Auth [TODO: specify auth provider or JWT setup]',
      ],
      challenges:
        '[TODO: Real challenges — role permissions hierarchy, peak traffic loads, or user onboarding]',
      outcomes:
        '[TODO: Real verified outcome — pilot user count, admin adoption, or status — DO NOT INVENT]',
      lessons:
        '[TODO: Architectural lessons learned when building for diverse non-technical institutional users]',
    },
    links: {
      github: '[TODO: add repo URL if public]',
      demo: '[TODO: add live demo URL if deployed]',
    },
    architectureNodes: [
      { id: 'n1', label: 'Campus Web Portal', sublabel: 'Role-Based Dashboard', type: 'client' },
      { id: 'n2', label: 'Auth Gateway', sublabel: 'RBAC & Session Broker', type: 'gateway' },
      { id: 'n3', label: 'Workflow Engine', sublabel: 'Departmental Routing', type: 'service' },
      { id: 'n4', label: 'Institutional DB', sublabel: 'Secure Academic Store', type: 'db' },
    ],
    evidence: {
      screenshots: [
        {
          caption: 'Student & Faculty Operations Hub',
          placeholder: '[TODO: Add screenshot of role-based campus overview]',
        },
        {
          caption: 'Departmental Approval Pipeline View',
          placeholder: '[TODO: Add screenshot of approval queues]',
        },
      ],
      demoVideo: {
        caption: 'Campus Workflow Demonstration',
        placeholder: '[TODO: Add demo screen recording link]',
      },
      repoLink: {
        placeholder: '[TODO: Add institutional repository link if public]',
      },
      liveLink: {
        placeholder: '[TODO: Add live staging or campus domain URL]',
      },
    },
  },
  {
    id: 'irdms-assam',
    slug: 'irdms-assam',
    title: 'IRDMS Assam',
    tagline: 'Integrated Resource and Disaster Management System for regional resilience',
    year: '[TODO: Add project year/dates]',
    status: 'prototype',
    isPlaceholder: true,
    category: 'Civic Tech & Gov',
    featured: true,
    framework: {
      idea: '[TODO: Define core premise of IRDMS Assam — regional resource allocation, disaster reporting, geospatial or relief coordination for Assam]',
      problem:
        '[TODO: Emergency communication breakdowns, flood response delays, or fragmented resource inventories in regional crisis management]',
      motivation: '[TODO: Motivation for building civic resilience technology for Assam]',
      vision:
        '[TODO: Long-term vision for data-driven, rapid emergency mobilization in vulnerable regions]',
      contribution:
        '[TODO: Chinmoy’s specific contribution — GIS mapping integration, alert dispatch system, or incident reporting interface]',
      process:
        '[TODO: Research on regional crisis response workflows, mock incident drills, API integration]',
      stack: [
        'TypeScript',
        'Next.js / React',
        'Mapping / Geospatial [TODO: Leaflet / Mapbox / OpenStreetMap]',
        'Backend / Real-time updates [TODO: specify WebSockets / Server-Sent Events]',
        'Tailwind CSS',
      ],
      challenges:
        '[TODO: Critical challenges — low-bandwidth offline resilience, data verification in high-stress scenarios]',
      outcomes:
        '[TODO: Real project outcomes — deployment status, demo presentation, institutional review — DO NOT INVENT]',
      lessons:
        '[TODO: Fundamental takeaways on high-reliability, mission-critical public infrastructure design]',
    },
    links: {
      github: '[TODO: add repo URL if public]',
      demo: '[TODO: add live demo URL if deployed]',
    },
    architectureNodes: [
      { id: 'n1', label: 'Field Responder App', sublabel: 'Offline-First Client', type: 'client' },
      { id: 'n2', label: 'Crisis Dispatch', sublabel: 'Realtime WebSocket Edge', type: 'gateway' },
      { id: 'n3', label: 'Geospatial Service', sublabel: 'Regional GIS Engine', type: 'service' },
      { id: 'n4', label: 'Incident State DB', sublabel: 'Sync Queue & History', type: 'db' },
    ],
    evidence: {
      screenshots: [
        {
          caption: 'Assam Regional Crisis Mapping View',
          placeholder: '[TODO: Add screenshot of live incident heatmaps and relief zones]',
        },
        {
          caption: 'Resource Inventory & Dispatch Table',
          placeholder: '[TODO: Add screenshot of dispatch coordination]',
        },
      ],
      demoVideo: {
        caption: 'Disaster Simulation & Dispatch Runthrough',
        placeholder: '[TODO: Add simulation walkthrough link]',
      },
      repoLink: {
        placeholder: '[TODO: Add repository URL if open-sourced]',
      },
      liveLink: {
        placeholder: '[TODO: Add deployment or regional demo URL]',
      },
    },
  },
];
