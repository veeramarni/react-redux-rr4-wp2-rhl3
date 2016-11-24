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
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

/**
 * Export the webpack configuration for the development version.
 * Reference: https://webpack.js.org
 */
module.exports = function (mode) {
  // Init the build mode.
  let buildDevelopment = mode === 'development';
  let buildProduction = mode === 'production';
  // Create the config.
  let config = {
    target: 'web'
  };
  // TODO Themes
  let themePath = path.resolve(__dirname, './themes/fraedom').replace('\\', '/');
  // Choose a style of source mapping to enhance the debugging process.
  if (buildDevelopment) {
    // Each module is executed with eval and //@ sourceURL
    config.devtool = 'eval-source-map';
  } else if (buildProduction) {
    // use 'source-map' to "debug" the production version
    config.devtool = false;
  }
  // The point or points to enter the application.
  // Reference: https://babeljs.io/docs/usage/polyfill/
  if (buildDevelopment) {
    config.entry = [
      'babel-polyfill',
      'react-hot-loader/patch',
      'webpack-hot-middleware/client',
      './src/root.client.js'
    ];
  } else if (buildProduction) {
    config.entry = [
      'babel-polyfill',
      './src/root.client.js'
    ];
  }
  // Externals prevent bundling of certain imported packages and instead retrieve these external packages at runtime.
  config.externals = [
    // TODO: use react and other big libraries as externals.
  ];
  // The options instructing webpack on how and where to output your bundles, assets and anything else.
  if (buildDevelopment) {
    config.output = {
      // Absolute output directory.
      path: path.resolve('./public'),
      // Output path from the view of the page.
      // Uses webpack-dev-server in development.
      // Reference: http://stackoverflow.com/questions/34133808/webpack-ots-parsing-error-loading-fonts/34133809#34133809
      publicPath: 'http://localhost:8080/',
      // Filename for entry points.
      // Only adds hash in build mode.
      filename: '[name].js',
      // Filename for non-entry points.
      // Only adds hash in build mode.
      chunkFilename: '[name].js'
    };
  } else if (buildProduction) {
    config.output = {
      // Absolute output directory.
      path: path.resolve('./dist'),
      // Output path from the view of the page.
      // Uses webpack-dev-server in development.
      // Reference: http://stackoverflow.com/questions/34133808/webpack-ots-parsing-error-loading-fonts/34133809#34133809
      publicPath: '',
      // Filename for entry points.
      // Only adds hash in build mode.
      filename: '[name].[hash].js',
      // Filename for non-entry points.
      // Only adds hash in build mode.
      chunkFilename: '[name].[hash].js'
    }
  }
  // These options change how modules are resolved.
  config.resolve = {
    // Automatically resolve these extensions.
    extensions: ['.js', '.jsx', '.json', '.scss'],
    // Tell webpack what directories should be searched when resolving modules.
    modules: ['node_modules']
  }
  // A list of webpack plugins.
  config.plugins = [
    // Reference: https://github.com/ampedandwired/html-webpack-plugin
    // Render index.html
    new HtmlWebpackPlugin({
      template: './src/index.ejs',
      inject: false,
      baseurl: '/'
    }),
    // Reference: https://github.com/kevlened/copy-webpack-plugin
    // Copy the public folder to the dist folder
    new CopyWebpackPlugin([
      {from: 'public'}
    ])
    // // Reference: http://mts.io/2015/04/08/webpack-shims-polyfills
    // // Inject a polyfill for the given key words
    // new webpack.ProvidePlugin({
    //   'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    // })
  ];
  if (buildDevelopment) {
    // Reference: https://webpack.github.io/docs/hot-module-replacement-with-webpack.html
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
    // Reference: TODO
    config.plugins.push(new webpack.DefinePlugin({
      // NOTE: The NODE_ENV key is especially important for production
      // builds as React relies on process.env.NODE_ENV for optimizations.
      'process.env.NODE_ENV': JSON.stringify('development')
    }));
  } else if (buildProduction) {
    // Reference: TODO
    config.plugins.push(new webpack.DefinePlugin({
      // NOTE: The NODE_ENV key is especially important for production
      // builds as React relies on process.env.NODE_ENV for optimizations.
      'process.env.NODE_ENV': JSON.stringify('production')
    }));
    // Reference: https://github.com/webpack/extract-text-webpack-plugin
    // Extract css files into a single file.
    config.plugins.push(new ExtractTextPlugin({filename: '[name].[hash].css'}));
    // Reference: https://github.com/johnagan/clean-webpack-plugin
    // Clean the output folders before building
    config.plugins.push(new CleanWebpackPlugin(['dist', 'build'], __dirname));
    // Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
    // Minify all javascript, switch loaders to minimizing mode
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        // sourceMap: true,
        compress: {
          screw_ie8: true,
          warnings: false,
        },
        mangle: {
          screw_ie8: true,
        },
        output: {
          comments: false,
          screw_ie8: true,
        },
      })
    );
    // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
    // Only emit files when there are no errors
    config.plugins.push(new webpack.NoErrorsPlugin());
  }
  // These options determine how the different types of modules within a project will be treated.
  config.module = {};
  // Do not parse files matching the Regular Expression or an array of Regular Expressions.
  config.module.noParse = /\.min\.js/;
  // Conditions, Results and nested Rules.
  config.module.rules = [
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
      loader: 'file-loader?name=assets/fonts/[name].[hash].[ext]'
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
      loader: 'file-loader?name=assets/images/[name].[hash].[ext]'
    },
    // HTML LOADER
    // Reference: https://github.com/webpack/raw-loader
    // Allow loading html through js
    {
      // Apply rule to files matching the Regular Expression or an array of Regular Expressions.
      test: /\.html$/,
      // The loader to be used by this rule.
      loader: 'html-loader'
    },
    // JSON LOADER
    // Reference: https://github.com/webpack/json-loader
    // Allow loading JSNO
    {
      // Apply rule to files matching the Regular Expression or an array of Regular Expressions.
      test: /\.json$/,
      // The loader to be used by this rule.
      loader: 'json-loader'
    }
  ];
  if (buildDevelopment) {
    // JS LOADER
    // Reference: https://github.com/babel/babel-loader
    // Transpile .js files using babel-loader
    // Compiles ES6 and ES7 to ES5 code
    config.module.rules.push(
      {
        // Apply rule to files matching the Regular Expression or an array of Regular Expressions.
        test: /\.jsx?$/,
        include: path.resolve('./src'),
        exclude: /node_modules/,
        // The loader to be used by this rule.
        loader: 'babel-loader',
        // The loader options to be used by this rule.
        query: {
          presets: [
            // TODO: investigate why 'latest' instead of 'es2015' will break hot reloading!
            ['es2015', {modules: false}], 'react'
          ],
          plugins: [
            'react-hot-loader/babel',
            'transform-object-rest-spread',
            'transform-class-properties'
          ]
        }
      }
    );
    // SASS LOADER
    // Reference: https://github.com/jtangelder/sass-loader
    // Allow loading sass/css through js
    config.module.rules.push(
      {
        test: /(\.scss|\.css)$/,
        exclude: [/node_modules/, /normalize.css/, /icomoon/],
        // Reference: https://github.com/webpack/style-loader
        // Use style-loader in development for hot-loading
        // Reference: https://github.com/webpack/css-loader
        // Reference: https://github.com/postcss/postcss-loader
        // Reference: https://github.com/jtangelder/sass-loader
        loader: `style-loader!css-loader?{"sourceMap":true,"modules":true, "importLoaders":2, "localIdentName": "[path]---[name]---[local]---[hash:base64:5]"}!postcss-loader!resolve-url-loader!sass-loader?{"sourceMap":true,"includePaths":["${themePath}"]}`
        // use: [
        //   'style-loader',
        //   {
        //     loader: 'css-loader',
        //     options: {
        //       sourceMap: true,
        //       modules: true,
        //       importLoaders: 2
        //     }
        //   },
        //   'postcss-loader',
        //   'resolve-url-loader',
        //   {
        //     loader: 'sass-loader',
        //     options: {
        //       sourceMap: true
        //     }
        //   }
        // ]
      }
    );
    // GLOBAL SASS LOADER
    // Reference: https://github.com/jtangelder/sass-loader
    // Allow loading sass/css through js
    config.module.rules.push(
      {
        test: /(\.scss|\.css)$/,
        include: [/normalize.css/, /icomoon/],
        // Reference: https://github.com/webpack/style-loader
        // Use style-loader in development for hot-loading
        // Reference: https://github.com/webpack/css-loader
        // Reference: https://github.com/postcss/postcss-loader
        // Reference: https://github.com/jtangelder/sass-loader
        loader: `style-loader!css-loader?{"sourceMap":true,"modules":false, "localIdentName": "[path]---[name]---[local]---[hash:base64:5]"}!postcss-loader!resolve-url-loader!sass-loader?{"sourceMap":true,"includePaths":["${themePath}"]}`
        //   use: [
        //     'style-loader',
        //     {
        //       loader: 'css-loader',
        //       options: {
        //         sourceMap: true,
        //         modules: false
        //       }
        //     },
        //     'postcss-loader',
        //     'resolve-url-loader',
        //     {
        //       loader: 'sass-loader',
        //       options: {
        //         sourceMap: true
        //       }
        //     }
        //   ]
      }
    );
  } else if (buildProduction) {
    // JS LOADER
    // Reference: https://github.com/babel/babel-loader
    // Transpile .js files using babel-loader
    // Compiles ES6 and ES7 to ES5 code
    config.module.rules.push(
      {
        // Apply rule to files matching the Regular Expression or an array of Regular Expressions.
        test: /\.jsx?$/,
        include: path.resolve('./src'),
        exclude: /node_modules/,
        // The loader to be used by this rule.
        loader: 'babel-loader',
        // The loader options to be used by this rule.
        query: {
          presets: [
            // TODO: investigate why 'latest' instead of 'es2015' will break hot reloading!
            ['es2015', {modules: false}], 'react'
          ],
          plugins: [
            'transform-object-rest-spread',
            'transform-class-properties'
          ]
        }
      }
    );
    // SASS LOADER
    // Reference: https://github.com/jtangelder/sass-loader
    // Allow loading sass/css through js
    config.module.rules.push({
      test: /(\.scss|\.css)$/,
      exclude: [/node_modules/, /normalize.css/, /icomoon/],
      // Reference: https://github.com/webpack/style-loader
      // Use style-loader in development for hot-loading
      // Reference: https://github.com/webpack/css-loader
      // Reference: https://github.com/postcss/postcss-loader
      // Reference: https://github.com/jtangelder/sass-loader
      // Reference: https://github.com/webpack/extract-text-webpack-plugin
      // Extract sass/css files in production builds
      loader: ExtractTextPlugin.extract(`css-loader?{"sourceMap":true,"modules":true, "importLoaders":2}!postcss-loader!resolve-url-loader!sass-loader?sourceMap&includePaths[]=${themePath}`)
    });
    // GLOBAL SASS LOADER
    // Reference: https://github.com/jtangelder/sass-loader
    // Allow loading sass/css through js
    config.module.rules.push({
      test: /(\.scss|\.css)$/,
      include: [/normalize.css/, /icomoon/],
      // Reference: https://github.com/webpack/style-loader
      // Use style-loader in development for hot-loading
      // Reference: https://github.com/webpack/css-loader
      // Reference: https://github.com/postcss/postcss-loader
      // Reference: https://github.com/jtangelder/sass-loader
      // Reference: https://github.com/webpack/extract-text-webpack-plugin
      // Extract sass/css files in production builds
      loader: ExtractTextPlugin.extract(`css-loader?{"sourceMap":true,"modules":false}!postcss-loader!resolve-url-loader!sass-loader?sourceMap&includePaths[]=${themePath}`)
    });
  }

  // Return the config.
  return config;
};
