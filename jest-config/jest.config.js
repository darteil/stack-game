module.exports = {
  preset: 'ts-jest',
  bail: true,
  rootDir: '../',
  setupFilesAfterEnv: ['<rootDir>/jest-config/setupTests.ts'],
  transformIgnorePatterns: ['node_modules/(?!jest|react)'],
  moduleFileExtensions: ['js', 'ts', 'tsx', 'jsx', 'json', 'node'],
  moduleDirectories: ['node_modules'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  globals: {
    window: true,
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.json'
    }
  },
  moduleNameMapper: {
    '^.+\\.css$': 'jest-css-modules'
  }
};
