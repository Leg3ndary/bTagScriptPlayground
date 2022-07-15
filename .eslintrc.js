module.exports = {
	root: true,
	extends: [
		'eslint:recommended',
	],
	rules: {
		indent: ['error', 'tab', {
			SwitchCase: 1,
			flatTernaryExpressions: true,
			offsetTernaryExpressions: true,
		}],
		'comma-dangle': ['error', 'always-multiline'],
		'func-call-spacing': ['error', 'never'],
		'keyword-spacing': ['error'],
		'no-extra-parens': ['error', 'all'],
		'no-extra-semi': ['error'],
		'object-curly-spacing': ['error', 'always'],
		semi: ['error', 'always'],
		'space-before-blocks': ['error', 'always'],
		'space-before-function-paren': ['error', {
			anonymous: 'always',
			named: 'never',
			asyncArrow: 'always',
		}],
		'no-non-null-assertion': 'off',
		quotes: ['error', 'single'],
		'no-tabs': 0,
		'max-len': ['warn', 120],
		'arrow-parens': ['error', 'as-needed'],
		'array-bracket-spacing': ['error', 'never'],
		'quote-props': ['error', 'as-needed'],
		'sort-imports': ['error', {
			allowSeparatedGroups: true,
		}],
		'max-statements-per-line': ['error', {
			max: 1,
		}],
		'object-curly-newline': ['error', {
			multiline: true,
			consistent: true,
		}],
		'object-property-newline': ['error', {
			allowAllPropertiesOnSameLine: true,
		}],
		'operator-linebreak': ['error', 'before'],
		'multiline-ternary': ['error', 'always-multiline'],
		'space-in-parens': ['error', 'never'],
		'space-infix-ops': ['error'],
		'space-unary-ops': [
			2, {
				words: true,
				nonwords: false,
			}],
		eqeqeq: ['error', 'always'],
		'no-var-requires': 'off',
		'no-empty': ['error', { allowEmptyCatch: true }],
		'prefer-const': ['error', {
			destructuring: 'all',
		}],
	},
	parserOptions: {
		ecmaVersion: 2022,
	},
	env: {
		node: true,
		commonjs: true,
		es2021: true,	
		browser: true,
	},
	globals: {
		CodeMirror: 'readonly',
		editor: 'writable',
	},

};