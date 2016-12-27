const path = require('path');

const production = 'production' === process.env.NODE_ENV;

// Production config is default. Development is below.
const config = {
  devtool: 'source-map',

  entry: {
    index: path.resolve(__dirname, 'src', 'index.js'),
  },

  output: {
    path: path.resolve(__dirname, 'lib'),
    publicPath: '/',
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'dom-events-mocking',
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

  resolve: {
    extensions: ['', '.js']
  },
};

if (true !== production) {
  console.log('* Using development config');
  config.entry = {
    bundle: [
      'webpack-dev-server/client',
      path.resolve(__dirname, 'demo', 'index.js'),
    ]
  };

  config.output.path = path.resolve(__dirname, 'demo');

  config.devServer = {
    port: 3001,
    contentBase: path.resolve(__dirname, 'demo'),
  };
}

module.exports = config;
