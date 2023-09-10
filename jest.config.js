module.exports = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '\\.(css|scss|sass|less)$': 'identity-obj-proxy',
    '^@components(.*)$': '<rootDir>/src/components$1',
    '^@pages(.*)$': '<rootDir>/src/pages$1',
    '^@styles(.*)$': '<rootDir>/src/styles$1',
    '^@store(.*)$': '<rootDir>/src/store$1',
    '^@helper-functions(.*)$': '<rootDir>/src/helper-functions$1',
    '^@constants(.*)$': '<rootDir>/src/constants$1',
    '^@custom-hooks(.*)$': '<rootDir>/src/custom-hooks$1',
  },
};
