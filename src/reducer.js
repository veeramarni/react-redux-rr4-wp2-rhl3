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
import {appReducer} from './app/reducer';
import {counterReducer} from './app/counter/reducer';
import {
  LOCATION_CHANGE,
  ROOT_FETCH_GRAPHQL_SCHEMA,
  ROOT_FETCH_GRAPHQL_SCHEMA_SUCCEEDED,
  ROOT_FETCH_GRAPHQL_SCHEMA_FAILED,
  ROOT_FETCH_GRAPHQL_SCHEMA_PENDING,
  ROOT_FETCH_GRAPHQL_QUERY_SUCCEEDED
} from './actions';

import {initializeGraphQLSchema, normalizeGraphQLQueryResponse} from './lib/graphQL';

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
const clientDefaultState = Immutable.Map({
  isSchemaLoaded: false
});

/**
 * The client store.
 */
function clientReducer(state = clientDefaultState, action) {
  console.log(action.type);
  switch (action.type) {
    case ROOT_FETCH_GRAPHQL_SCHEMA:
      //console.log('ROOT_FETCH_GRAPHQL_SCHEMA');
      return state;
    case ROOT_FETCH_GRAPHQL_SCHEMA_PENDING:
      //console.log('ROOT_FETCH_GRAPHQL_SCHEMA_PENDING');
      return state;
    case ROOT_FETCH_GRAPHQL_SCHEMA_SUCCEEDED:
      //console.log('ROOT_FETCH_GRAPHQL_SCHEMA_SUCCEEDED', action.payload);
      initializeGraphQLSchema(action.payload.response.data.__schema.types);
      return state.set('isSchemaLoaded', true);
    case ROOT_FETCH_GRAPHQL_SCHEMA_FAILED:
      //console.log('ROOT_FETCH_GRAPHQL_SCHEMA_FAILED', action.payload);
      return state;
    case ROOT_FETCH_GRAPHQL_QUERY_SUCCEEDED:
      //console.log('ROOT_FETCH_GRAPHQL_QUERY_SUCCEEDED', action.payload);
      normalizeGraphQLQueryResponse(action.payload.response.data);
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
  client: clientReducer,
  app: appReducer,
  counter: counterReducer
});
