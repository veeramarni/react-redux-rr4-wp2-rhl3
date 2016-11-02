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
 * Import dependencies.
 */
const express = require('express');
const historyMiddleware = require('connect-history-api-fallback');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const webpack = require('webpack');
const config = require('./webpack.config.dev.js');

/**
 * Serve the development version with hot module reloading support.
 */
// Create the express server.
const app = express();
// Create the webpack compiler.
const compiler = webpack(config);
// Middleware to proxy requests through a specified index page.
app.use(historyMiddleware());
// Middleware to serve static files.
app.use(express.static(__dirname));
// Middleware to enable hot module reloading without webpack-dev-server.
app.use(hotMiddleware(compiler));
// Middleware to serve the files emitted from webpack over a connect server.
app.use(devMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  serverSideRender: true
}));
// Start the server.
app.listen(8080);
