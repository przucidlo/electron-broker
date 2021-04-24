module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./test/unit/jest-setup.ts'],
  moduleNameMapper: {
    'electron': '<rootDir>/test/unit/__mocks__/electron-mock.ts',
  }
};