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
import {combineReducers} from 'redux-immutable';

/**
 * Import local dependencies.
 */
import {appReducer} from './app';
import {counterReducer} from './app/counter';
import {
  LOCATION_CHANGE,
  ROOT_FETCH_GRAPHQL_SUCCEEDED,
  ROOT_FETCH_GRAPHQL_FAILED,
  ROOT_FETCH_GRAPHQL_PENDING
} from './actions';

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
    case ROOT_FETCH_GRAPHQL_SUCCEEDED:
      console.log('ROOT_FETCH_GRAPHQL_SUCCEEDED', action.payload);
      return state;
    case ROOT_FETCH_GRAPHQL_FAILED:
      console.log('ROOT_FETCH_GRAPHQL_FAILED', action.payload);
      return state;
    case ROOT_FETCH_GRAPHQL_PENDING:
      console.log('ROOT_FETCH_GRAPHQL_PENDING');
      return state;
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
