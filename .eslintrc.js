module.exports = {
  root: true,
  plugins: ['jest', 'react'],
  env: {
    es2020: true,
    'jest/globals': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  rules: {},
  parserOptions: {
    project: './tsconfig.json',
  },
  parser: '@typescript-eslint/parser',
}
