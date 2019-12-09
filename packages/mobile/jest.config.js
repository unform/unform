const { join } = require('path');

const baseConfig = require('../../jest.config');
const pkg = require('./package.json');

delete baseConfig.projects;

module.exports = {
  ...baseConfig,
  preset: '@testing-library/react-native',
  displayName: pkg.name,
  transformIgnorePatterns: ['node_modules/(?!react-native)/'],
  transform: {
    ...baseConfig.transform,
    '^.+\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js',
  },
  testMatch: [join(__dirname, '__tests__/**/*.spec.{ts,tsx}')],
};
