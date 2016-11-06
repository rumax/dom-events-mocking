// const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (config) => {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'specs/**/*.spec.js'
    ],
    preprocessors: {
      'src/**/*.js': ['webpack', 'sourcemap'],
      'specs/**/*.js': ['webpack', 'sourcemap']
    },
    webpack: {
      devtool: 'inline-source-map',
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
      externals: {
        // 'react/lib/ExecutionEnvironment': true,
        // 'react/lib/ReactContext': true,
        // 'react/addons': true
      },
      resolve: {
        extensions: ['', '.js']
      },
      node: {
        net: 'empty'
      }
    },
    webpackServer: {
      noInfo: true
    },
    plugins: [
      'karma-webpack',
      'karma-jasmine',
      'karma-sourcemap-loader',
      'karma-chrome-launcher',
      'karma-phantomjs-launcher',
    ],
    babelPreprocessor: {
      options: {
        presets: ['airbnb']
      }
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false,
  });
};
