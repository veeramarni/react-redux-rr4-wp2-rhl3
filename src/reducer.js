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
import Immutable from 'immutable';

/**
 * Import local dependencies.
 */
import {entitiesReducer} from './entities/reducer';
import {appReducer} from './app/reducer';
import {counterReducer} from './app/counter/reducer';
import {
  LOCATION_CHANGE
} from './actions';

/**
 * Default router state.
 */
const routerDefaultState = Immutable.Map({
  pathname: location.pathname,
  search: location.search,
  hash: location.hash
});

/**
 * The router store.
 */
function routerReducer(state = routerDefaultState, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return state.merge(action.router);
    default:
      return state;
  }
}

/**
 * Default client state.
 */
const clientDefaultState = Immutable.Map({});

/**
 * The client store.
 */
function clientReducer(state = clientDefaultState, action) {
  console.log(action.type, action.payload);
  switch (action.type) {
    default:
      return state;
  }
}

/**
 * Export the application store.
 */
export const rootReducer = combineReducers({
  router: routerReducer,
  client: clientReducer,
  entities: entitiesReducer,
  app: appReducer,
  counter: counterReducer
});
