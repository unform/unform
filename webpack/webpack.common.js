const { resolve } = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const commonMainConfig = {
  mode: 'development',
  entry: {
    main: './src/index.ts',
  },
  output: {
    filename: '[name].js',
    path: resolve('dist'),
  },
  target: 'node',
  node: {
    __filename: false,
    __dirname: false,
  },
  module: {
    rules: [
      {
        test: /.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: '@sucrase/webpack-loader',
            options: {
              transforms: ['jsx', 'typescript', 'imports'],
            },
          },
        ],
      },
    ],
  },
  resolve: {
    mainFields: ['main', 'browser', 'module'],
    extensions: ['.js', '.ts', '.tsx'],
    plugins: [new TsconfigPathsPlugin()]
  },
};

module.exports = {
  commonMainConfig,
};
