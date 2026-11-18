export type ProjectStatus = 'completed' | 'in-progress' | 'prototype';

export interface ProjectTenPointFramework {
  /** 1. The core premise and one-sentence concept */
  idea: string;
  /** 2. The concrete friction, inefficiency, or pain point addressed */
  problem: string;
  /** 3. Why this mattered to build — the catalyst */
  motivation: string;
  /** 4. The ideal end-state or long-term aspiration */
  vision: string;
  /** 5. Chinmoy's specific role, architecture decisions, and individual authorship */
  contribution: string;
  /** 6. How it was researched, designed, prototyped, and built */
  process: string;
  /** 7. Technologies, libraries, infra, and tools leveraged */
  stack: string[];
  /** 8. The hard technical or design roadblocks encountered */
  challenges: string;
  /** 9. Measurable results, user reception, benchmarks, or delivery milestones */
  outcomes: string;
  /** 10. Core engineering, architectural, or human takeaways */
  lessons: string;
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
    status: 'prototype', // Marked placeholder status per strict rule
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
  },
];
