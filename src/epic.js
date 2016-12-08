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
import {demoPageEpic} from './containers/demo-page/epic';
import {
  ROOT_FETCH_GRAPHQL_QUERY,
  fetchGraphQLQuerySucceededCreator,
  fetchGraphQLQueryFailedCreator,
  fetchGraphQLQueryPendingCreator
} from './actions';
import {normalizeGraphQLQueryResponse} from './graphql';

/**
 * This epic fetches a GraphQL query.
 */
const fetchGraphQLQueryEpic = action$ =>
  action$.ofType(ROOT_FETCH_GRAPHQL_QUERY)
    .mergeMap(action =>
      Observable.ajax.post
      (
        'https://frae-local.fraedom-dev.com:8088/graphql',
        action.payload,
        {'Content-Type': 'application/json'}
      )
        .map((payload)=> normalizeGraphQLQueryResponse(payload.response.data))
        .map(fetchGraphQLQuerySucceededCreator)
        .retry(2)
        .catch(({xhr}) => Observable.of(fetchGraphQLQueryFailedCreator(xhr)))
        .startWith(fetchGraphQLQueryPendingCreator())
    );

/**
 * Export the root epics.
 */
export const rootEpic = combineEpics(
  fetchGraphQLQueryEpic,
  demoPageEpic
);
