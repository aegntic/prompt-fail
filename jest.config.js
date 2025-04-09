/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transform: {
    "^.+\.tsx?$": ["ts-jest",{}],
  },
};