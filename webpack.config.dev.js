/**
 * Bernd Wessels (https://github.com/BerndWessels/)
 *
 * Copyright © 2016 Bernd Wessels. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/**
 * Import dependencies.
 */
const path = require('path');
const webpack = require('webpack');

/**
 * Export the webpack configuration for the development version.
 */
module.exports = {
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
    new webpack.HotModuleReplacementPlugin()
  ],
  // These options determine how the different types of modules within a project will be treated.
  module: {
    // Do not parse files matching the Regular Expression or an array of Regular Expressions.
    noParse: /\.min\.js/,
    // Conditions, Results and nested Rules.
    rules: [
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
      }
    ]
  }
};
