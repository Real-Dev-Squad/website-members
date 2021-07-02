module.exports = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '\\.(css|scss|sass|less)$': 'identity-obj-proxy',
    '^@components(.*)$': '<rootDir>/components$1'
  }
};
