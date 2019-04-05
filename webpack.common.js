const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv').config({ path: __dirname + '/.env' });
const dotEnv = dotenv.parsed;

const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

let config = {
  stats: {
    colors: true
  },
  entry: {
    app: [
      './src/index.js',
      // './src/assets/scss/styles.scss',
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'assets/js/[name].[hash].bundle.js',
    publicPath: '/'
  },
  resolve: { extensions: ['.js', '.ts'] },
  devServer: {
    compress: true,
    contentBase: path.join(__dirname, 'dist'),
    host: dotEnv.PROD_SERVER_HOSTNAME,
    port: dotEnv.PROD_SERVER_PORT,
    hot: true,
    https: false,
  },
  plugins: [
    new ManifestPlugin(),
    new HtmlWebpackPlugin(
      {
        alwaysWriteToDisk: true
      },
      {
        inject: false,
        hash: true,
        title: dotEnv.TEMPLATE_TITLE,
        myPageHeader: dotEnv.TEMPLATE_PAGE_HEADER,
        template: __dirname + dotEnv.TEMPLATE_PATH + dotEnv.TEMPLATE_FILENAME,
        filename: './'+dotEnv.TEMPLATE_FILENAME
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
    new Dotenv({
      path: './.env',
      safe: false, // load '.env.example' to verify the '.env' variables are all set.
      systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
      silent: false, // hide any errors
      defaults: false // load '.env.defaults' as the default values if empty.
    })
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

module.exports = config;
