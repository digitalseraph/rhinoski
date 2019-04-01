const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  devServer: {
    contentBase: './dist',
    hot: true
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
        dry: false,
        exclude: [
          'dist/assets',
          'dist/assets/css',
          'dist/assets/img',
          'dist/assets/js'
        ]
      }
    ),
  ]
});
