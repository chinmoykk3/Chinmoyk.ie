export interface SocialLink {
  platform: string;
  url: string;
  handle: string;
  isPlaceholder: boolean;
}

export interface ContactInfo {
  name: string;
  email: string;
  location: string;
  currentRoleOrStatus: string;
  availability: string;
  bioSnippet: string;
  socials: SocialLink[];
  isPlaceholder: boolean;
  // Specific Epilogue Horizons & Aspirations
  whatIWantToBecome: string;
  whatIWantToBuild: string;
  technologiesToExplore: string[];
  ambitions: string;
  collaborationOpportunities: string[];
}

export const contactData: ContactInfo = {
  name: 'Chinmoy Kalita',
  email: 'chinmoykk3@gmail.com', // derived from git author
  location: 'Assam, India [TODO: confirm exact city/region]',
  currentRoleOrStatus: '[TODO: Add current role/student status/independent engineer title]',
  availability: 'Open for high-impact engineering roles, research collaborations & creative builds',
  bioSnippet:
    'Creative technologist and full-stack software engineer crafting narrative-rich interactive systems, resilient public platforms, and AI frontiers.',
  isPlaceholder: true,
  whatIWantToBecome:
    '[TODO: Chinmoy to supply: What I want to become — e.g. A foundational systems architect bridging autonomous intelligence, spatial media, and public infrastructure]',
  whatIWantToBuild:
    '[TODO: Chinmoy to supply: What I want to build — e.g. Resilient decentralized platforms, agentic computing operating environments, and sensory interfaces that dignify human agency]',
  technologiesToExplore: [
    'Local Small Language Models (SLMs) & WebGPU Shaders',
    'Distributed Consensus & Zero-Knowledge Cryptography',
    'Spatial Typography & WebGL Real-Time Graphics',
    'Deterministic Agentic Evaluation Systems',
    '[TODO: Chinmoy to confirm additional technologies to explore]',
  ],
  ambitions:
    '[TODO: Chinmoy to supply: Ambitions — e.g. To engineer mission-critical systems that outlast ephemeral hype cycles and empower vulnerable civic communities]',
  collaborationOpportunities: [
    'Founding / Core Full-Stack & AI Engineering Roles',
    'Open-Source Decentralized & Civic Tech Initiatives',
    'Interactive 3D / Creative Technology Experiments',
    'Applied AI & Autonomous Agent Architecture Research',
    '[TODO: Chinmoy to add specific collaboration targets]',
  ],
  socials: [
    {
      platform: 'GitHub',
      url: 'https://github.com/chinmoyk [TODO: verify GitHub handle]',
      handle: '@chinmoyk [TODO: verify]',
      isPlaceholder: true,
    },
    {
      platform: 'LinkedIn',
      url: 'https://linkedin.com/in/[TODO: add-linkedin-slug]',
      handle: 'Chinmoy Kalita [TODO: verify]',
      isPlaceholder: true,
    },
    {
      platform: 'X (Twitter)',
      url: 'https://x.com/[TODO: add-x-handle]',
      handle: '@[TODO: handle]',
      isPlaceholder: true,
    },
    {
      platform: 'Email',
      url: 'mailto:chinmoykk3@gmail.com',
      handle: 'chinmoykk3@gmail.com',
      isPlaceholder: false,
    },
  ],
};
