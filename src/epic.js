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
import {appEpic} from './app';
import {
  ROOT_FETCH_GRAPHQL,
  fetchGraphQLSucceededCreator,
  fetchGraphQLFailedCreator,
  fetchGraphQLPendingCreator
} from './actions';

/**
 * This epic fetches the graphql schema.
 */
const fetchGraphQLEpic = action$ =>
  action$.ofType(ROOT_FETCH_GRAPHQL)
    .mergeMap(action =>
      Observable.ajax.post('https://frae-local.fraedom-dev.com:8088/graphql', action.payload, {'Content-Type': 'application/json'})
        .map(fetchGraphQLSucceededCreator)
        .retry(2)
        .catch(({xhr}) => Observable.of(fetchGraphQLFailedCreator(xhr)))
        .startWith(fetchGraphQLPendingCreator())
    );

/**
 * Export the root epics.
 */
export const rootEpic = combineEpics(
  appEpic,
  fetchGraphQLEpic
);
