const webpack = require('./webpack');

module.exports = (env) => {
  const config = webpack[env.mode];

  return config;
};
