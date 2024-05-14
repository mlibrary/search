import globals from 'globals';
import { fixupConfigRules } from '@eslint/compat';
import pluginJs from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';

export default [
  {
    settings: {
      react: {
        version: 'detect'
      }
    }
  },
  {
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
        document: 'readonly',
        navigator: 'readonly',
        window: 'readonly'
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    }
  },
  {
    plugins: {
      '@stylistic': stylistic
    }
  },
  ...fixupConfigRules(pluginReactConfig),
  stylistic.configs['recommended-flat'],
  {
    rules: {
      ...pluginJs.configs.all.rules,

      'arrow-body-style': ['error', 'always'],
      'no-ternary': 'off',
      'one-var': ['error', { initialized: 'never' }],

      '@stylistic/brace-style': ['error', '1tbs'],
      '@stylistic/comma-dangle': ['error', 'never'],
      '@stylistic/spaced-comment': ['error', 'always', { 'block': { 'balanced': true } }],
      '@stylistic/jsx-quotes': ['error', 'prefer-single'],
      '@stylistic/jsx-one-expression-per-line': ['error', { allow: 'single-line' }],
      '@stylistic/operator-linebreak': ['error', 'before'],
      '@stylistic/quote-props': ['error', 'as-needed'],
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/space-before-function-paren': ['error', 'always']
    }
  }
];
