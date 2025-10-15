import css from '@eslint/css';
import js from '@eslint/js';
import json from '@eslint/json';
import markdown from '@eslint/markdown';
import pluginReact from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslintConfigPrettierFlat from 'eslint-config-prettier/flat';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },

  ...tseslint.configs.recommended,

  {
    files: ['**/*.{jsx,tsx}'],
    plugins: {
      react: pluginReact,
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },

  {
    files: ['**/*.json'],
    plugins: { json },
    language: 'json/json',
  },

  {
    files: ['**/*.md'],
    plugins: { markdown },
    language: 'markdown/gfm',
  },

  {
    files: ['**/*.css'],
    plugins: { css },
    language: 'css/css',
  },

  {
    ignores: [
      'node_modules/',
      'package.json',
      'package-lock.json',
      '.releaserc.json',
      'app.json',
      'CHANGELOG.md',
      '*.md',
      '**/*.md',
    ],
  },

  eslintConfigPrettierFlat,
  eslintPluginPrettierRecommended,
]);