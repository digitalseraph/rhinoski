const path = require('path');
const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');

const config = require('./webpack.dev.js');
const options = {
  contentBase: './dist',
  hot: true,
  host: 'localhost'
};

webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);

server.listen(3001, 'localhost', () => {
  console.log('\n##############################');
  console.log('##                          ##');
  console.log('##     App listening on     ##');
  console.log('##  http://localhost:3001/  ##');
  console.log('##                          ##');
  console.log('##############################\n');
});
