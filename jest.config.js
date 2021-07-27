/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    "@galery/(.*)": "<rootDir>/src/$1"
  },
  "coveragePathIgnorePatterns": [
    "/node_modules/"
  ]
};
