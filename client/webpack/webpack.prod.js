const Path = require('path');
const Webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  stats: 'errors-only',
  optimization: {
    minimize: true,
    splitChunks: {
      cacheGroups: {
        default: false,
        commons: {
          test: /react/,
          name: 'vendor',
          chunks: 'initial',
          minSize: 1,
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins: [
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: './index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new Webpack.optimize.ModuleConcatenationPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /(node_modules|bower_components)/,
        use: 'babel-loader',
      },
      {
        test: /(\.less)$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
        ],
      },
    ],
  },
});
