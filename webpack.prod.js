const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv').config({ path: __dirname + '/.env' });
const dotEnv = dotenv.parsed;

const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const common = require('./webpack.common.js');

let config = {
  mode: 'production',
  devtool: 'source-map',
  devServer: {
    compress: true,
    host: dotEnv.PROD_SERVER_HOSTNAME,
    port: dotEnv.PROD_SERVER_PORT,
    open: true,
    hot: true,
    overlay: {
      warnings: true,
      errors: true,
      info: true
    },
    contentBase: path.join(__dirname, 'dist'),
    watchContentBase: true,
    watchOptions: {
      poll: true
    },
  },
  plugins: [
    new CleanWebpackPlugin(
      [
        'dist/*.*',
        'dist/assets/*.*',
        'dist/assets/css/*.*',
        'dist/assets/img/*.*',
        'dist/assets/js/*.*',
      ], {
        root: __dirname,
        verbose: true,
        dry: true,
        exclude: [
          'dist/assets',
          'dist/assets/css',
          'dist/assets/img',
          'dist/assets/js'
        ]
      }
    ),
    // new OpenBrowserPlugin({
    //   url: 'http://' + dotEnv.PROD_SERVER_HOSTNAME + ':' + dotEnv.PROD_JARVIS_PORT,
    //   delay: 1000
    // }),
    // new OpenBrowserPlugin({
    //   url: 'http://' + dotEnv.PROD_SERVER_HOSTNAME + ':' + dotEnv.PROD_SERVER_PORT,
    //   delay: 1500
    // }),
  ]
}

module.exports = merge(common, config);
