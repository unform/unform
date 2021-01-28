const { join } = require('path')

const baseConfig = require('../../jest.config')
const pkg = require('./package.json')

delete baseConfig.projects

module.exports = {
  ...baseConfig,
  preset: 'react-native',
  displayName: pkg.name,
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!(@react-native|react-native)/)'],
  testMatch: [join(__dirname, '__tests__/**/*.spec.{ts,tsx}')],
}
