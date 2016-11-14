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
import {
  ROOT_FETCH_GRAPHQL_QUERY_SUCCEEDED
} from '../actions';

/**
 * Default Explorer entities state.
 */
const explorerDefaultState = Immutable.Map({});

/**
 * The Explorer entities store.
 */
function explorerReducer(state = explorerDefaultState, action) {
  switch (action.type) {
    case ROOT_FETCH_GRAPHQL_QUERY_SUCCEEDED:
      return state.merge(action.payload.get('Explorer'));
    default:
      return state;
  }
}

// TODO: add reducers for each entity type. Maybe in their own files.

/**
 * Export the application store.
 */
export const entitiesReducer = combineReducers({
  Explorer: explorerReducer
});
