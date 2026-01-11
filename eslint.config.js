import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist', 'node_modules'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // Blue Lamp 品質基準
      'max-len': ['warn', { code: 120, ignoreUrls: true, ignoreStrings: true }],
      'max-lines-per-function': ['warn', { max: 100, skipBlankLines: true, skipComments: true }],
      'max-lines': ['warn', { max: 700, skipBlankLines: true, skipComments: true }],
      'complexity': ['warn', 10],
      // 未使用変数
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      // console.log禁止（本番）
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  }
);
