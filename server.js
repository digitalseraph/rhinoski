const express = require('express');
const webpack = require('webpack');
const dotenv = require('dotenv').config({ path: __dirname + '/.env' });
const dotEnv = dotenv.parsed;

const WebpackDevMiddleware = require('webpack-dev-middleware');
const DashboardPlugin = require("webpack-dashboard/plugin");

const app = express();
const config = require('./webpack.prod.js');
const compiler = webpack(config);

compiler.apply(new DashboardPlugin());

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(new WebpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

// Serve the files on port 8080.
app.listen(dotEnv.PROD_SERVER_PORT, function() {
  var msg = 'App listening on: http://' + dotEnv.PROD_SERVER_HOSTNAME + ':' + dotEnv.PROD_SERVER_PORT
  console.log(msg)
});
