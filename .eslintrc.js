const { resolve } = require('path');

module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true,
      tsx: true,
    },
    sourceType: 'module',
    project: resolve(__dirname, 'tsconfig.json'),
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import', 'import-helpers', 'react-hooks', 'jest', 'prettier'],
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
  ],
  rules: {
    'class-methods-use-this': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: ['.jsx', '.tsx'],
      },
    ],
    'import-helpers/order-imports': [
      'warn',
      {
        'newlines-between': 'always',
        groups: [
          ['builtin', 'external', 'internal'],
          ['parent', 'sibling', 'index'],
        ],
        alphabetize: { order: 'asc', ignoreCase: true },
      },
    ],
    'no-param-reassign': 'off',
    'react/prop-types': 'off',
    'jsx-a11y/label-has-for': 'off',
    'import/prefer-default-export': 'off',
    'react-hooks/rules-of-hooks': 'error',
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true}]
  },
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {}
    },
  },
};
