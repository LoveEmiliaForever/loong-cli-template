module.exports = {
	root: true,
	env: {
		node: true,
		browser: true,
		es6: true
	},
	ignorePatterns: ["!src/*"],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	extends: [
		//'airbnb-base',
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
	],
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
	}
}