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
import {combineEpics} from 'redux-observable';
// import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/dom/ajax';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/retry';

/**
 * Import local dependencies.
 */
import {appEpic} from './app/epic';
import {
  ROOT_INITIALIZE_CLIENT,
  ROOT_FETCH_GRAPHQL_SCHEMA,
  ROOT_FETCH_GRAPHQL_QUERY,
  fetchGraphQLSchemaCreator,
  fetchGraphQLSchemaSucceededCreator,
  fetchGraphQLSchemaFailedCreator,
  fetchGraphQLSchemaPendingCreator,
  fetchGraphQLQuerySucceededCreator,
  fetchGraphQLQueryFailedCreator,
  fetchGraphQLQueryPendingCreator
} from './actions';

import {fetchGraphQLSchemaQuery} from './queries';

/**
 * This epic initializes the client.
 */
const initializeClientEpic = action$ =>
  action$.ofType(ROOT_INITIALIZE_CLIENT)
    .map(fetchGraphQLSchemaCreator);

/**
 * This epic fetches the graphql schema.
 */
const fetchGraphQLSchemaEpic = action$ =>
  action$.ofType(ROOT_FETCH_GRAPHQL_SCHEMA)
    .mergeMap(action =>
      Observable.ajax.post
      (
        'https://44nr8yzqx4.execute-api.us-east-1.amazonaws.com/prod/graphql',//'https://frae-local.fraedom-dev.com:8088/graphql',
        fetchGraphQLSchemaQuery(),
        {'Content-Type': 'application/json'}
      )
        .map(fetchGraphQLSchemaSucceededCreator)
        .retry(2)
        .catch(({xhr}) => Observable.of(fetchGraphQLSchemaFailedCreator(xhr)))
        .startWith(fetchGraphQLSchemaPendingCreator())
    );

/**
 * This epic fetches a graphql query.
 */
const fetchGraphQLQueryEpic = action$ =>
  action$.ofType(ROOT_FETCH_GRAPHQL_QUERY)
    .mergeMap(action =>
      Observable.ajax.post
      (
        'https://44nr8yzqx4.execute-api.us-east-1.amazonaws.com/prod/graphql',//'https://frae-local.fraedom-dev.com:8088/graphql',
        action.payload,
        {'Content-Type': 'application/json'}
      )
        .map(fetchGraphQLQuerySucceededCreator)
        .retry(2)
        .catch(({xhr}) => Observable.of(fetchGraphQLQueryFailedCreator(xhr)))
        .startWith(fetchGraphQLQueryPendingCreator())
    );

/**
 * Export the root epics.
 */
export const rootEpic = combineEpics(
  initializeClientEpic,
  fetchGraphQLSchemaEpic,
  fetchGraphQLQueryEpic,
  appEpic
);
