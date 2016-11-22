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
import {applyMiddleware, createStore, compose} from 'redux';
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
  // Development mode with Redux DevTools support enabled.
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Prevents Redux DevTools from re-dispatching all previous actions.
      shouldHotReload: false
  }) : compose;
  // Create the redux store.
  store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(epicMiddleware)
  ));
} else {
  // Production mode.
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
    // Handle updates to the components.
    module.hot.accept('./component', () => {
      console.log('Updated components');
      renderApp();
    });
    // Handle updates to the reducers.
    module.hot.accept('./reducer', () => {
      console.log('Updated reducers');
      store.replaceReducer(rootReducer);
    });
    // Handle updates to the epics.
    module.hot.accept('./epic', () => {
      console.log('Updated epics');
      epicMiddleware.replaceEpic(rootEpic);
    });
  }
}

/**
 * Start the application.
 */
renderApp();
