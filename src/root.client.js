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
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import {createEpicMiddleware} from 'redux-observable';

/**
 * Import local dependencies.
 */
import Client from './component';
import {rootReducer} from './reducer';
import {rootEpic} from './epic';

/**
 * Create the epic middleware.
 */
const epicMiddleware = createEpicMiddleware(rootEpic);

/**
 * Create the store. TODO: switch between dev and prod.
 */
let store;
if (process.env.NODE_ENV === 'development') {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(epicMiddleware)
  ));
} else {
  store = createStore(rootReducer, applyMiddleware(epicMiddleware));
}

/**
 * Render the application.
 */
const rootElement = document.getElementById('root');
const renderApp = () => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Client />
      </Provider>
    </AppContainer>,
    rootElement
  );
};

/**
 * Enable hot module reloading in development mode.
 */
if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    // Handle updates to the reducer.
    module.hot.accept('./reducer', () => {
      store.replaceReducer(rootReducer);
    });
    // Handle updates to the app.
    module.hot.accept('./component', renderApp);
    // Handle updates to the epic.
    module.hot.accept('./epic', () => {
      epicMiddleware.replaceEpic(rootEpic);
    });
  }
}

/**
 * Start the application.
 */
renderApp();
