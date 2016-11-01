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
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

/**
 * Import local dependencies.
 */
import Client from './component';
import reducer from './reducer';

/**
 * Create the store. TODO: switch between dev and prod.
 */
const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

/**
 * Render the application.
 */
const rootEl = document.getElementById('root');
const renderApp = () => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Client />
      </Provider>
    </AppContainer>,
    rootEl
  );
};

/**
 * Enable hot module reloading in development mode.
 */
if (module.hot) {
  // Handle updates to the reducer.
  module.hot.accept('./reducer', () => {
    store.replaceReducer(reducer);
  });
  // Handle updates to the app.
  module.hot.accept('./component', renderApp);
}

/**
 * Start the application.
 */
renderApp();
