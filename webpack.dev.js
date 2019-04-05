const path = require('path');
const dotenv = require('dotenv').config({ path: __dirname + '/.env' });
const dotEnv = dotenv.parsed;

const webpack = require('webpack');
const merge = require('webpack-merge');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const DashboardPlugin = require("webpack-dashboard/plugin");
const Jarvis = require("webpack-jarvis");
const Dotenv = require('dotenv-webpack');

const common = require('./webpack.common.js');

let config = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    compress: false,
    host: dotEnv.DEV_SERVER_HOSTNAME,
    port: dotEnv.DEV_SERVER_PORT,
    open: true,
    noInfo: false,
    quiet: false,
    overlay: {
      warnings: true,
      errors: true,
      info: true
    },
    watchContentBase: true,
    watchOptions: {
      poll: true
    }

  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new DashboardPlugin(),
    new Jarvis({
      port: dotEnv.DEV_JARVIS_PORT,
      host: dotEnv.DEV_SERVER_HOSTNAME,
      watchOnly: true
    }),
    // new OpenBrowserPlugin({
    //   url: 'http://' + dotEnv.DEV_SERVER_HOSTNAME + ':' + dotEnv.DEV_JARVIS_PORT,
    //   delay: 1000
    // }),
    // new OpenBrowserPlugin({
    //   url: 'http://' + dotEnv.DEV_SERVER_HOSTNAME + ':' + dotEnv.DEV_SERVER_PORT,
    //   delay: 1500
    // }),
  ],
  optimization: {
    usedExports: true
  }
};

module.exports = merge(common, config);
