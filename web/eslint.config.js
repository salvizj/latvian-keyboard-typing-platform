import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';

/** @type {import('eslint').Linter.Config[]} */
export default [
    { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    {
        plugins: ['react'],
        ...pluginReact.configs.flat.recommended,
        settings: {
            react: {
                version: '18.0',
            },
        },
        rules: {
            'react/jsx-uses-react': 'off', // JSX doesn't require React import (React 17+)
            'react/jsx-uses-vars': 'error', // ensures variables declared in JSX are used
            '@typescript-eslint/no-unused-expressions': ['error', { allowTernary: true }], // allow ternary operators
        },
    },
];
