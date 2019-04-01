const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  stats: {
    colors: true
  },
  entry: {
    app: [
      './src/index.js',
      './src/assets/scss/styles.scss',
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'assets/js/[name].[hash].bundle.js',
    publicPath: '/'
  },
  resolve: { extensions: ['.js', '.ts'] },
  plugins: [
    new ManifestPlugin(),
    new HtmlWebpackPlugin(
      {
        alwaysWriteToDisk: true
      },
      {
        inject: false,
        hash: true,
        title: 'digitalseraph.com',
        myPageHeader: 'Hello World',
        template: './src/assets/templates/index.html',
        filename: 'index.html',
        alwaysWriteToDisk: true
      }
    ),
    new HtmlWebpackHarddiskPlugin(),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true
    }),
    new webpack.HashedModuleIdsPlugin(),
    new ExtractTextPlugin({
      filename: 'assets/css/[chunkhash].css',
      disable: false,
      allChunks: true
    }),
    new CopyWebpackPlugin([
      { from: 'src/assets/img', to: 'assets/img' }
    ]),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            "css-loader",
            "sass-loader"
          ]
        })
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'assets/img',
              name(file) {
                if (process.env.NODE_ENV === 'development') {
                  return '[path][name].[ext]';
                }

                return 'assets/img/[name].[ext]?[hash]';
              },
            },
          },
        ],
      },
    ]
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
};
