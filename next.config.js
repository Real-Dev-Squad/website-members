const withSass = require('@zeit/next-sass');
const path = require('path');

module.exports = withSass({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: '[name]__[local]___[hash:base64:5]'
  },
  webpack: (config) => {
    config.resolve.alias['public'] = path.resolve(__dirname, 'public/');
    config.resolve.alias['elements'] = path.resolve(__dirname, 'elements/');
    config.resolve.alias['components'] = path.resolve(__dirname, 'components/');
    config.resolve.alias['styles'] = path.resolve(__dirname, 'styles/');
    return config;
  }
});
