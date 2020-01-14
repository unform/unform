module.exports = {
  bail: true,
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    'packages/**/lib/**/*.{js,ts,tsx}',
    'packages/**/lib/*.{js,ts,tsx}',
    '!**/*-test.{js,ts,tsx}',
  ],
  coverageReporters: ['json', 'lcov'],
  projects: ['<rootDir>/packages/*/jest.config.js'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  moduleNameMapper: {
    '@unform/(.*)': '<rootDir>/packages/$1/lib',
  },
};
