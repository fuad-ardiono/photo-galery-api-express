/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    "@gallery/(.*)": "<rootDir>/src/$1"
  },
  testMatch: ["**/*.test.ts"],
  "coveragePathIgnorePatterns": [
    "/node_modules/",
    "/dist",
    "/coverage"
  ]
};
