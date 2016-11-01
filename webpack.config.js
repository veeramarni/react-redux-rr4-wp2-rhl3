/**
 * Bernd Wessels (https://github.com/BerndWessels/)
 *
 * Copyright © 2016 Bernd Wessels. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

/**
 * Webpack config
 */
const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
//const CleanWebpackPlugin = require('clean-webpack-plugin');
//const CopyWebpackPlugin = require('copy-webpack-plugin');

/**
 * Export the webpack configuration for the development version.
 */
module.exports = function(mode) {
  // Init the build mode.
  let buildDevelopment = mode === 'development';
  let buildProduction = mode === 'production';
  // Create the config.
  let config = {
    // Each module is executed with eval and //@ sourceURL
    devtool: 'eval',
    // The point or points to enter the application.
    entry: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client',
      './src/client.js'
    ],
    // The options instructing webpack on how and where to output your bundles, assets and anything else.
    output: {
      filename: 'client.js',
      path: path.resolve('./dist'),
      publicPath: '/',
    },
    //
    resolve: {
      extensions: ['.jsx', '.scss', '.js', '.json'],
      modules: ['node_modules']
    },
    // A list of webpack plugins.
    plugins: [
      // Reference: https://webpack.github.io/docs/hot-module-replacement-with-webpack.html
      new webpack.HotModuleReplacementPlugin(),
      // Reference: https://github.com/webpack/extract-text-webpack-plugin
      // Extract css files
      // Disabled when in test mode or not in build mode
      new ExtractTextPlugin({filename: '[name].[hash].css', disable: buildDevelopment}),
      // Reference: https://github.com/ampedandwired/html-webpack-plugin
      // Render index.html
      new HtmlWebpackPlugin({
        template: './src/index.ejs',
        inject: false,
        baseurl: '/'
      })
    ],
    // These options determine how the different types of modules within a project will be treated.
    module: {
      // Do not parse files matching the Regular Expression or an array of Regular Expressions.
      noParse: /\.min\.js/,
      // Conditions, Results and nested Rules.
      rules: [
        // JS LOADER
        // Reference: https://github.com/babel/babel-loader
        // Transpile .js files using babel-loader
        // Compiles ES6 and ES7 into ES5 code
        {
          // Apply rule to files matching the Regular Expression or an array of Regular Expressions.
          test: /\.js$/,
          // The loader to be used by this rule.
          loader: 'babel',
          // The loader options to be used by this rule.
          query: {
            presets: [
              'react'
            ],
            plugins: [
              'react-hot-loader/babel',
              'transform-object-rest-spread'
            ]
          },
          // Apply rule to files within the given path or array of paths.
          include: path.resolve('./src')
        },
        // ASSET FONT LOADER
        // Reference: https://github.com/webpack/file-loader
        // Copy png, jpg, jpeg, gif, svg, woff, woff2, ttf, eot files to output
        // Rename the file using the asset hash
        // Pass along the updated reference to your code
        // You can add here any file extension you want to get copied to your output
        {
          // Apply rule to files matching the Regular Expression or an array of Regular Expressions.
          test: /\.(svg|woff|woff2|ttf|eot)$/,
          // The loader to be used by this rule.
          loader: 'file?name=assets/fonts/[name].[hash].[ext]'
        },
        // ASSET IMAGE LOADER
        // Reference: https://github.com/webpack/file-loader
        // Copy png, jpg, jpeg, gif, svg, woff, woff2, ttf, eot files to output
        // Rename the file using the asset hash
        // Pass along the updated reference to your code
        // You can add here any file extension you want to get copied to your output
        {
          // Apply rule to files matching the Regular Expression or an array of Regular Expressions.
          test: /\.(png|jpg|jpeg|gif)$/,
          // The loader to be used by this rule.
          loader: 'file?name=assets/images/[name].[hash].[ext]'
        },
        // HTML LOADER
        // Reference: https://github.com/webpack/raw-loader
        // Allow loading html through js
        {
          // Apply rule to files matching the Regular Expression or an array of Regular Expressions.
          test: /\.html$/,
          // The loader to be used by this rule.
          loader: 'html'
        },
        // JSON LOADER
        // Reference: https://github.com/webpack/json-loader
        // Allow loading JSNO
        {
          // Apply rule to files matching the Regular Expression or an array of Regular Expressions.
          test: /\.json$/,
          // The loader to be used by this rule.
          loader: 'json'
        },
        // SASS LOADER
        // Reference: https://github.com/jtangelder/sass-loader
        // Allow loading sass/css through js
        {
          test: /(\.scss|\.css)$/,
          exclude: [/node_modules/, /bootstrap/, /icomoon/, /awesome-bootstrap-checkbox/],
          // Reference: https://github.com/webpack/style-loader
          // Use style-loader in development for hot-loading
          // Reference: https://github.com/webpack/css-loader
          // Reference: https://github.com/postcss/postcss-loader
          // Reference: https://github.com/jtangelder/sass-loader
          loader: (buildDevelopment || buildTest) ? 'style!css?sourceMap&modules&importLoaders=2!postcss!resolve-url!sass?sourceMap' :
            // Reference: https://github.com/webpack/extract-text-webpack-plugin
            // Extract sass/css files in production builds
            ExtractTextPlugin.extract('css?sourceMap&modules&importLoaders=2!postcss!resolve-url!sass?sourceMap')
        }
      ]
    }
  };
  // Return the config.
  return config;
};
