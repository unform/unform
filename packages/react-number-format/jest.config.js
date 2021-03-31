const { join } = require('path')

const baseConfig = require('../../jest.config')
const pkg = require('./package.json')

delete baseConfig.projects

module.exports = {
  ...baseConfig,
  displayName: pkg.name,
  testMatch: [join(__dirname, '__tests__/**/*.spec.{ts,tsx}')],
}
