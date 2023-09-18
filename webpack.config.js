const { resolve } = require('path');
const p = require('./package.json');

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
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.json', '.ts', '.js'],
  },
  output: {
    library: p.name,
    libraryTarget: 'umd',
    filename: '[name].js',
    path: resolve(__dirname, 'build'),
  },
  externals: ['bufferutil', 'utf-8-validate'],
};