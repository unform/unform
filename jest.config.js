// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

const { resolve } = require("path");

module.exports = {
  bail: true,
  clearMocks: true,
  coverageDirectory: "coverage",
  coverageReporters: ["text", "clover"],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  testMatch: ["**/__tests__/*.spec.+(ts|tsx|js)"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  setupFilesAfterEnv: [resolve(__dirname, "__tests__", "setup.ts")],
  snapshotSerializers: ["enzyme-to-json/serializer"]
};
