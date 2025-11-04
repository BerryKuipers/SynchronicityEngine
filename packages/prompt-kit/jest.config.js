module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.spec.ts', '**/tests/**/*.test.ts'],
  moduleDirectories: ['node_modules', 'src'],
};
