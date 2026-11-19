import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const hexRule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow hardcoded hex color values in component files',
    },
    schema: [],
    messages: {
      noHex: 'Hard-coded hex color "{{hex}}" is not allowed in components. Use design tokens instead.',
    },
  },
  create(context) {
    const hexRegex = /#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/;
    return {
      Literal(node) {
        if (typeof node.value === 'string' && hexRegex.test(node.value)) {
          // Allow anchor links like href="#chapter-01" or ID selectors
          if (/^#[a-zA-Z]/.test(node.value) || node.value.startsWith('#/')) return;
          const match = node.value.match(hexRegex);
          context.report({
            node,
            messageId: 'noHex',
            data: { hex: match[0] },
          });
        }
      },
      TemplateElement(node) {
        if (node.value && node.value.raw && hexRegex.test(node.value.raw)) {
          if (/^#[a-zA-Z]/.test(node.value.raw)) return;
          const match = node.value.raw.match(hexRegex);
          context.report({
            node,
            messageId: 'noHex',
            data: { hex: match[0] },
          });
        }
      },
    };
  },
};

const rawNarrationRule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow raw narration strings and invented text in components',
    },
    schema: [],
    messages: {
      noRawNarration:
        'Raw narration string detected: "{{snippet}}". Narration and personal claims must come from /content schemas and be rendered via <Content>.',
    },
  },
  create(context) {
    const inventedSnippets = [
      'Before systems, code, and architectures',
      'Everything started not with an answer',
      'The engineering, design, and research odyssey',
      'A documentary portfolio is never an obituary',
      'It is neither decoration nor an afterthought',
      'Code instructs machines what to do',
      'Design is another language of thought',
    ];

    return {
      JSXAttribute(node) {
        // Disallow passing raw string literals to NarrationText text attribute
        if (
          node.name &&
          node.name.name === 'text' &&
          node.parent &&
          node.parent.name &&
          node.parent.name.name === 'NarrationText' &&
          node.value &&
          node.value.type === 'Literal' &&
          typeof node.value.value === 'string'
        ) {
          context.report({
            node,
            messageId: 'noRawNarration',
            data: { snippet: node.value.value.substring(0, 40) + '...' },
          });
        }
      },
      Literal(node) {
        if (typeof node.value === 'string') {
          for (const phrase of inventedSnippets) {
            if (node.value.includes(phrase)) {
              context.report({
                node,
                messageId: 'noRawNarration',
                data: { snippet: phrase },
              });
            }
          }
        }
      },
      JSXText(node) {
        if (typeof node.value === 'string') {
          for (const phrase of inventedSnippets) {
            if (node.value.includes(phrase)) {
              context.report({
                node,
                messageId: 'noRawNarration',
                data: { snippet: phrase },
              });
            }
          }
        }
      },
    };
  },
};

const eslintConfig = [
  {
    ignores: ['.next/**', 'node_modules/**', 'dist/**', 'out/**'],
  },
  ...compat.extends('next/core-web-vitals'),
  {
    files: ['components/**/*.{ts,tsx}'],
    plugins: {
      tokens: {
        rules: {
          'no-hardcoded-hex': hexRule,
        },
      },
      content: {
        rules: {
          'no-raw-narration': rawNarrationRule,
        },
      },
    },
    rules: {
      'tokens/no-hardcoded-hex': 'error',
      'content/no-raw-narration': 'error',
    },
  },
];

export default eslintConfig;
