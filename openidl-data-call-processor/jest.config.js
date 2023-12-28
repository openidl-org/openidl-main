/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
    preset: '@shelf/jest-mongodb',
    // The glob patterns Jest uses to detect test files
    testMatch: [
      "**/?(*.)+(spec).js?(x)"
    ],
  
    // Automatically clear mock calls, instances and results before every test
    clearMocks: true,
  
    // Indicates whether the coverage information should be collected while executing the test
    collectCoverage: true,
  
    // An array of glob patterns indicating a set of files for which coverage information should be collected
    // collectCoverageFrom: undefined,
  
    // The directory where Jest should output its coverage files
    coverageDirectory: "coverage",
  
    // An array of regexp pattern strings used to skip coverage collection
    coveragePathIgnorePatterns: [
      "\\\\node_modules\\\\"
    ],
  
    // Indicates which provider should be used to instrument code for coverage
    coverageProvider: "v8",
  
  };
  