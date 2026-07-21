// Named .mjs (not .js) so this loads as ESM regardless of package.json's
// module type — scripts/*.js in this repo are plain CommonJS (require()),
// so package.json intentionally has no top-level "type": "module".
import js from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    files: ['src/**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11y,
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      // React 19 + the new JSX transform: components don't need `import React`
      // in scope just to use JSX.
      'react/react-in-jsx-scope': 'off',
      // No prop-types usage anywhere in this codebase; not adopting it retroactively.
      'react/prop-types': 'off',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
    settings: {
      react: { version: 'detect' },
    },
  },
  {
    // scripts/*.js are plain Node CommonJS, not part of the React/browser bundle.
    files: ['scripts/**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'commonjs',
      globals: { ...globals.node },
    },
  },
  prettierConfig,
  {
    ignores: ['build/', '.docusaurus/', 'node_modules/', 'static/'],
  },
];
