/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/src/**/*.test.ts'],
  modulePathIgnorePatterns: ['<rootDir>/dist/'], // Ignore built files
  setupFiles: ['<rootDir>/src/config/__mocks__/database.ts'], // Mock database connection
};