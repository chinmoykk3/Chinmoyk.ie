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
    },
    rules: {
      'tokens/no-hardcoded-hex': 'error',
    },
  },
];

export default eslintConfig;

