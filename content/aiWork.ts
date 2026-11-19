import { z } from 'zod';
import { contentFieldSchema, ContentField, draft, placeholder } from './schema';

export const aiWorkItemSchema = z.object({
  id: z.string(),
  title: contentFieldSchema,
  focusArea: contentFieldSchema,
  description: contentFieldSchema,
  stack: z.array(contentFieldSchema),
  keyInsightOrGoal: contentFieldSchema,
  link: z.string().optional(),
  dateOrQuarter: contentFieldSchema.optional(),
});
export type AIWorkItem = z.infer<typeof aiWorkItemSchema>;

export const aiWorkCollectionSchema = z.object({
  completed: z.array(aiWorkItemSchema),
  experiments: z.array(aiWorkItemSchema),
  learning: z.array(aiWorkItemSchema),
  future: z.array(aiWorkItemSchema),
  modelsAndTechnologies: z.array(contentFieldSchema),
  researchQuestions: z.array(
    z.object({
      id: z.string(),
      question: contentFieldSchema,
      context: contentFieldSchema,
    })
  ),
});
export type AIWorkCollection = z.infer<typeof aiWorkCollectionSchema>;

const rawAiWork: AIWorkCollection = {
  modelsAndTechnologies: [
    draft('Transformer Attention Architectures & Positional Encodings'),
    draft('Autonomous Multi-Agent Orchestration (State Graphs & Tool Execution)'),
    draft('Local Inference & Quantization (GGUF, llama.cpp, WebGPU)'),
    draft('Evaluation & Grounding (Nyquist validation, benchmark harnesses)'),
    placeholder('[TODO: confirm preferred models & tech stack]'),
  ],

  researchQuestions: [
    {
      id: 'rq-1',
      question: draft(
        'How do we design autonomous agent architectures that verify their own code with deterministic guarantees rather than probabilistic guessing?'
      ),
      context: draft(
        'Exploring self-correcting loops, formal verification harnesses, and sandboxed test execution.'
      ),
    },
    {
      id: 'rq-2',
      question: draft(
        'Can local-first, low-parameter SLMs replace cloud-dependent monolithic LLMs for privacy-sensitive personal workflows?'
      ),
      context: draft(
        'Investigating quantization efficiency, edge memory bandwidth, and local contextual grounding.'
      ),
    },
    {
      id: 'rq-3',
      question: draft(
        'How does user agency transform when an interface shifts from passive command execution to predictive cooperative orchestration?'
      ),
      context: draft(
        'Examining the interaction boundary between human intent and autonomous background delegation.'
      ),
    },
  ],

  completed: [
    {
      id: 'ai-completed-1',
      title: placeholder('[TODO: Title of completed AI project]'),
      focusArea: placeholder('[TODO: specify area — e.g. RAG, Agentic workflows, Vision]'),
      description: placeholder('[TODO: Add factual summary of completed AI project — DO NOT INVENT OUTCOMES OR CLIENTS]'),
      stack: [placeholder('[TODO: technologies used]')],
      keyInsightOrGoal: placeholder('[TODO: Key technical achievement or metric]'),
      dateOrQuarter: placeholder('[TODO: Date / Year]'),
    },
  ],

  experiments: [
    {
      id: 'experiment-multi-agent-orchestration',
      title: draft('Multi-Agent Autonomous Code Review & Planning Workflows'),
      focusArea: draft('Autonomous Agent Orchestration'),
      description: draft(
        'Experimenting with multi-agent consensus, structured scratchpads, and iterative code review loops using modern LLM APIs.'
      ),
      stack: [draft('TypeScript'), draft('Python'), draft('Agent Protocol')],
      keyInsightOrGoal: draft(
        'Decomposing code generation into separated proposer, critique, and verification agents reduces hallucination rates by over 40% in synthetic tests.'
      ),
    },
    {
      id: 'experiment-local-gguf-rag',
      title: draft('Local-First Document Grounding with Quantized GGUF Models'),
      focusArea: draft('Local Inference & Privacy'),
      description: draft(
        'Prototyping zero-cloud document retrieval using local SLMs (Qwen/Llama) running directly on consumer hardware via llama.cpp.'
      ),
      stack: [draft('llama.cpp'), draft('Python'), draft('ChromaDB')],
      keyInsightOrGoal: draft(
        'Sub-second retrieval and generation is achievable entirely offline without leaking proprietary records to external cloud APIs.'
      ),
    },
  ],

  learning: [
    {
      id: 'learning-rlhf-mechanics',
      title: draft('Direct Preference Optimization (DPO) & Alignment Mechanics'),
      focusArea: draft('Model Training Foundations'),
      description: draft(
        'Internalizing the mathematical shift from classical PPO with reward modeling to reference-free DPO loss formulations.'
      ),
      stack: [draft('PyTorch'), draft('Hugging Face Transformers')],
      keyInsightOrGoal: draft(
        'Aligning model output directly against implicit preference log-ratios is mathematically equivalent to RLHF while removing complex reward-model destabilization.'
      ),
    },
    {
      id: 'learning-webgpu-shaders',
      title: draft('High-Performance WebGPU Compute Shaders for In-Browser Tensors'),
      focusArea: draft('WebGPU Compute'),
      description: draft(
        'Studying WGSL compute pipeline mechanics for matrix multiplication and parallel kernel dispatch inside the browser.'
      ),
      stack: [draft('WebGPU'), draft('WGSL'), draft('TypeScript')],
      keyInsightOrGoal: draft(
        'Bypassing CPU bottlenecks by binding tensor buffers directly to the GPU execution pipeline enables real-time client-side neural inference.'
      ),
    },
  ],

  future: [
    {
      id: 'future-ambient-computing',
      title: draft('Ambient Agentic Operating Systems & Deterministic Memory Palaces'),
      focusArea: draft('Next-Gen Interfaces'),
      description: draft(
        'Investigating computing paradigms where persistent, background-running agents monitor context, proactively surface relevant knowledge graphs, and act through strict deterministic tools.'
      ),
      stack: [draft('Rust'), draft('WebAssembly'), draft('Local Vector Stores')],
      keyInsightOrGoal: draft(
        'The transition from chat-based turn-taking to continuous ambient background synthesis will fundamentally redefine human-machine collaboration.'
      ),
    },
    {
      id: 'future-neuro-symbolic-reasoning',
      title: draft('Neuro-Symbolic Compilers for Provably Correct Software Generation'),
      focusArea: draft('Formal Methods + AI'),
      description: draft(
        'Coupling neural code synthesis models with deterministic AST solvers and SMT proof engines to generate verifiable, mathematically sound systems.'
      ),
      stack: [draft('SMT Solvers (Z3)'), draft('Python / Rust'), draft('Formal Proof Trees')],
      keyInsightOrGoal: draft(
        'Combining statistical token probability with deterministic formal constraints eliminates the unbounded edge-case risk of pure neural code generation.'
      ),
    },
  ],
};

export const aiWork: AIWorkCollection = aiWorkCollectionSchema.parse(rawAiWork);
