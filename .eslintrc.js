module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: 'standard-with-typescript',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    indent: ['error', 2],
    camelcase: 'error',
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    'no-unused-vars': 'warn',
    'space-before-function-paren': ['error', 'never']
  }
};
