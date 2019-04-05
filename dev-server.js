const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv').config({ path: __dirname + '/.env' });
const dotEnv = dotenv.parsed;

const WebpackDevServer = require('webpack-dev-server');
const DashboardPlugin = require("webpack-dashboard/plugin");

const config = require('./webpack.dev.js');
const compiler = webpack(config);

const options = {
  contentBase: './dist',
  hot: true,
  host: dotEnv.DEV_SERVER_HOST
};

const server = new WebpackDevServer(compiler, options);
WebpackDevServer.addDevServerEntrypoints(config, options);
compiler.apply(new DashboardPlugin());

// Serve the files
server.listen(dotEnv.DEV_SERVER_PORT, dotEnv.DEV_SERVER_HOSTNAME, () => {
  var msg = 'App listening on: http://' + dotEnv.DEV_SERVER_HOSTNAME + ':' + dotEnv.DEV_SERVER_PORT
  console.log(msg)
});
