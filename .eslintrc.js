// TODO: migrate to flat settings:
// https://eslint.org/docs/latest/use/configure/migration-guide

// in VSCode use param 'eslint.experimental.useFlatConfig':
// https://github.com/microsoft/vscode-eslint/issues/1620#issuecomment-1473305698

module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'google',
    'eslint:recommended',
    'plugin:vue/vue3-essential',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
    {
      files: ['*.html'],
      rules: {
        'vue/comment-directive': 'off'
      }
    }
  ],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest',
  },
  plugins: [
    'vue',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'max-len': ['warn', { code: 90 }],
    'vue/multi-word-component-names': ['error', {
      ignores: ['Layout']
    }],
    'no-trailing-spaces': 'off',
    // 'prettier/prettier': ['error', { 'singleQuote': true }],
    'quotes': ['error', 'single'],
    'quote-props': ['error', 'consistent-as-needed'],
    'indent': ['error', 2],
    'comma-dangle': 'off',
    'linebreak-style': ['error', 'windows'],
    'arrow-parens': 'off',
    'require-jsdoc': 'off',
    'no-sparse-arrays': 'off',
    'prefer-const': 'warn',
    'eol-last': ['error', 'never'],
    'object-curly-spacing': 'off',
    'comma-style': ['error', 'last', {exceptions: {ArrayExpression: true}}],
    'semi': ['error', 'always', {omitLastInOneLineBlock: true}],
    'brace-style': ['error', '1tbs', {allowSingleLine: true}],
    'key-spacing': ['error'],
    'no-unused-vars': 'warn',
    'no-undef': 'warn',
    'no-invalid-this': 'error',
    'no-multi-spaces': [
      'warn',
      {
        ignoreEOLComments:
        true,
        exceptions: {
          VariableDeclarator: true,
          Property: true,
          ImportDeclaration: true,
        }}],
    'vue/html-indent': ['warn', 2, {
      attribute: 1,
      baseIndent: 1,
      closeBracket: 0,
      alignAttributesVertically: false,
      ignores: []
    }],
  }
};