const { resolve } = require('path');
const p = require('./package.json');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  target: 'node',
  externalsPresets: { node: true },
  entry: {
    plugin: ['./src/index.ts'],
  },
  devtool: false,
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: { allowTsInNodeModules: true }
      },
    ],
  },
  resolve: {
    extensions: ['.json', '.ts', '.js'],
    plugins: [
      new TsconfigPathsPlugin({}),
    ],
  },
  output: {
    library: p.name,
    libraryTarget: 'umd',
    filename: '[name].js',
    path: resolve(__dirname, 'build'),
  },
  externals: ['bufferutil', 'utf-8-validate'],
};