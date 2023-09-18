const { resolve } = require('path');
const p = require('./package.json');

module.exports = {
  target: 'node',
  externalsPresets: { node: true },
  entry: {
    plugin: ['./src/index.js'],
  },
  devtool: false,
  mode: 'production',
  resolve: {
    extensions: ['.json', '.js'],
  },
  output: {
    library: p.name,
    libraryTarget: 'umd',
    filename: '[name].js',
    path: resolve(__dirname, 'build'),
  },
};