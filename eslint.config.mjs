import globals from 'globals';
import { fixupPluginRules, fixupConfigRules } from '@eslint/compat';
import pluginJs from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import * as pluginImport from 'eslint-plugin-import';
import pluginN from 'eslint-plugin-n';
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
      '@stylistic': stylistic,
      'import': fixupPluginRules(pluginImport),
      'n': pluginN
    }
  },
  ...fixupConfigRules(pluginReactConfig),
  stylistic.configs['recommended-flat'],
  {
    rules: {
      ...pluginJs.configs.recommended.rules,

      'import/export': 'error',
      'import/first': 'error',
      'import/no-absolute-path': ['error', { esmodule: true, commonjs: true, amd: false }],
      'import/no-duplicates': 'error',
      'import/no-named-default': 'error',
      'import/no-webpack-loader-syntax': 'error',

      'n/handle-callback-err': ['error', '^(err|error)$'],
      'n/no-callback-literal': 'error',
      'n/no-deprecated-api': 'error',
      'n/no-exports-assign': 'error',
      'n/no-new-require': 'error',
      'n/no-path-concat': 'error',
      'n/process-exit-as-throw': 'error',

      '@stylistic/brace-style': ['error', '1tbs'],
      '@stylistic/comma-dangle': ['error', 'never'],
      '@stylistic/jsx-quotes': ['error', 'prefer-single'],
      '@stylistic/jsx-one-expression-per-line': ['error', { allow: 'single-line' }],
      '@stylistic/operator-linebreak': ['error', 'after'],
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/space-before-function-paren': ['error', 'always']
    }
  }
];
