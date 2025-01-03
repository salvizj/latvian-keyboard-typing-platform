import globals from 'globals';
import tseslint from '@typescript-eslint/eslint-plugin';
import pluginReact from 'eslint-plugin-react';
import parser from '@typescript-eslint/parser';

/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        files: ['**/*.{js,mjs,cjs,ts,tsx,jsx}'],
        ignores: ['dist/**/*'],
        languageOptions: {
            parser,
            globals: globals.browser,
        },
        plugins: {
            '@typescript-eslint': tseslint,
            react: pluginReact,
        },
        rules: {
            'no-console': ['warn', { allow: ['warn', 'error'] }], // allow console.error and console.warn
            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    argsIgnorePattern: '^(set|value)$', // ignore setter functions like set(value => void)
                    varsIgnorePattern: '^_', // ignore variables starting with '_'
                    caughtErrors: 'none', // don't warn about unused caught errors
                },
            ],

            'react/react-in-jsx-scope': 'off',

            '@typescript-eslint/no-unused-vars': ['warn'], // warn on unused TypeScript variables

            // allow exported functions to not trigger unused variable warnings
            '@typescript-eslint/explicit-module-boundary-types': 'off', // Allows functions without explicit return types
        },
        settings: {
            react: {
                version: 'detect', // automatically detect the React version
            },
        },
    },
];
