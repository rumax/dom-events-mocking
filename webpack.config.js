const path = require('path');

const buildDir = path.resolve(__dirname, 'demo');


module.exports = {
  devtool: 'source-map',
  entry: path.resolve(__dirname, 'demo', 'demo.js'),
  output: {
    path: buildDir,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  plugins: [],
  resolve: {
    extensions: ['', '.js']
  },
  node: {
    net: 'empty'
  }
};
