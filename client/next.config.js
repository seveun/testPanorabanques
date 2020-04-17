const withImages = require('next-images');
const withCSS = require('@zeit/next-css');

module.exports = withCSS(withImages({
  webpackDevMiddleware: config => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },
}));