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
import {combineReducers} from 'redux';

/**
 * Import local dependencies.
 */
import {appReducer} from './app';
import {counterReducer} from './app/counter';
import {LOCATION_CHANGE} from './actions';

/**
 * Default router state.
 */
const routerDefaultState = {
  pathname: location.pathname,
  search: location.search,
  hash: location.hash
};

/**
 * The router store.
 */
function routerReducer(state = routerDefaultState, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return {...state, ...action.router};
    default:
      return state;
  }
}

/**
 * Export the application store.
 */
export const rootReducer = combineReducers({
  router: routerReducer,
  app: appReducer,
  counter: counterReducer
});
