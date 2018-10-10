module.exports = {
  bail: true,
  rootDir: '../',
  setupTestFrameworkScriptFile: '<rootDir>/jest-config/setupTests.js',
  transformIgnorePatterns: [
    'node_modules/(?!jest|react)'
  ],
  moduleFileExtensions: [
    'js',
    'jsx',
    'json'
  ],
  setupFiles: ['jest-canvas-mock'],
  moduleDirectories: [
    'node_modules'
  ],
  transform: {
    '^.+\\.js?$': 'babel-jest',
    '^.+\\.jsx?$': 'babel-jest'
  },
  globals: {
    window: true
  },
  moduleNameMapper: {
    '^App(.*)$': '<rootDir>/src$1',
    '^.+\\.css$': 'jest-css-modules'
  }
};

