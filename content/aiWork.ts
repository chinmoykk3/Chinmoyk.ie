export interface AIWorkItem {
  id: string;
  title: string;
  focusArea: string; // e.g. 'LLM Agents', 'Computer Vision', 'RAG', 'Generative UI', 'Evaluations'
  description: string;
  stack: string[];
  keyInsightOrGoal: string;
  isPlaceholder: boolean;
  link?: string;
  dateOrQuarter?: string;
}

export interface AIWorkCollection {
  completed: AIWorkItem[];
  experiments: AIWorkItem[];
  learning: AIWorkItem[];
  future: AIWorkItem[];
}

export const aiWork: AIWorkCollection = {
  completed: [
    {
      id: 'ai-doc-portfolio-copilot',
      title: 'Context-Aware Narrative Portfolio Engine',
      focusArea: 'Generative UI & Story Orchestration',
      description:
        'Architecting structured content schemas with adaptive narrative pacing and accessible motion fallbacks.',
      stack: ['Next.js 15', 'TypeScript', 'Framer Motion', 'Tailwind CSS'],
      keyInsightOrGoal:
        'Digital portfolios can transcend static CVs by structuring engineering careers into dramatic narrative arcs.',
      isPlaceholder: true,
      dateOrQuarter: 'Q4 2026',
    },
    {
      id: 'completed-ai-placeholder-1',
      title: '[TODO: Title of completed AI project / system / client work]',
      focusArea: '[TODO: specify area — e.g. RAG, Agentic workflows, Vision]',
      description:
        '[TODO: Add factual summary of completed AI project — DO NOT INVENT OUTCOMES OR CLIENTS]',
      stack: ['[TODO: technologies used, e.g. Python, PyTorch, LangChain, Gemini API]'],
      keyInsightOrGoal: '[TODO: Key technical achievement or metric]',
      isPlaceholder: true,
      dateOrQuarter: '[TODO: Date / Year]',
    },
  ],

  experiments: [
    {
      id: 'experiment-multi-agent-orchestration',
      title: 'Multi-Agent Autonomous Code Review & Planning Workflows',
      focusArea: 'Autonomous Agent Orchestration',
      description:
        'Experimenting with multi-agent consensus, structured scratchpads, and iterative code review loops using modern LLM APIs.',
      stack: ['TypeScript', 'Python', 'Agent Protocol', 'Gemini / Claude APIs [TODO: verify]'],
      keyInsightOrGoal:
        'Investigating error mitigation and hallucination boundaries in agentic coding loops.',
      isPlaceholder: true,
      dateOrQuarter: '2026',
    },
    {
      id: 'experiment-ai-placeholder-2',
      title: '[TODO: Add title of active AI experiment / prototype]',
      focusArea: '[TODO: specify research direction]',
      description: '[TODO: Add experiment hypothesis and current prototype state]',
      stack: ['[TODO: models / libraries]'],
      keyInsightOrGoal: '[TODO: Emerging hypothesis or initial finding]',
      isPlaceholder: true,
      dateOrQuarter: '[TODO: Date / Year]',
    },
  ],

  learning: [
    {
      id: 'learning-deep-learning-foundations',
      title: 'Deep Learning & Neural Network Architectures',
      focusArea: 'Foundational Models & Transformers',
      description:
        'Deepening mathematical foundations of attention mechanisms, token embeddings, and fine-tuning methodologies.',
      stack: ['PyTorch', 'NumPy', 'Python', 'Jupyter'],
      keyInsightOrGoal:
        'Mastering mechanics under the hood rather than treating modern models purely as black-box APIs.',
      isPlaceholder: true,
      dateOrQuarter: 'Active Study',
    },
    {
      id: 'learning-ai-placeholder-3',
      title: '[TODO: Add active course, textbook, or certification study topic]',
      focusArea: '[TODO: Area of study]',
      description: '[TODO: Specific topics covered in current learning roadmap]',
      stack: ['[TODO: Study resources / frameworks]'],
      keyInsightOrGoal: '[TODO: Primary concept being mastered]',
      isPlaceholder: true,
      dateOrQuarter: '[TODO: Ongoing]',
    },
  ],

  future: [
    {
      id: 'future-local-agentic-os',
      title: 'Ambient & Local-First Intelligence Systems',
      focusArea: 'Edge AI & Personal Cognitive Augmentation',
      description:
        'Envisioning private, edge-computed AI assistants integrated deeply into OS workflows with zero data leakage.',
      stack: ['Local LLMs / GGUF', 'WebAssembly', 'WebGPU', 'Rust / TypeScript'],
      keyInsightOrGoal:
        'Exploring computing paradigms where user agency and data privacy are architecturally guaranteed.',
      isPlaceholder: true,
      dateOrQuarter: 'Next Frontier',
    },
    {
      id: 'future-ai-placeholder-4',
      title: '[TODO: Add next speculative or planned AI research frontier]',
      focusArea: '[TODO: Area of interest]',
      description: '[TODO: Aspirations and roadmap ideas for future AI initiatives]',
      stack: ['[TODO: Envisioned stack]'],
      keyInsightOrGoal: '[TODO: Ultimate question or problem to unlock]',
      isPlaceholder: true,
      dateOrQuarter: '[TODO: Horizon date]',
    },
  ],
};
