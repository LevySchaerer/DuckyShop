// eslint.config.js
import js from '@eslint/js';
import react from 'eslint-plugin-react';
import prettier from 'eslint-config-prettier';

export default [
	{
		ignores: ['node_modules/**', '.next/**', 'out/**'],
	},
	js.configs.recommended,
	{
		files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
		plugins: {
			react: react,
		},
		languageOptions: {
			parserOptions: {
				ecmaVersion: 2021,
				sourceType: 'module',
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
		rules: {
			'react/react-in-jsx-scope': 'off',
			'no-unused-vars': 'warn',
		},
	},
	prettier,
];
