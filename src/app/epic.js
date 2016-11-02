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
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/delay';

/**
 * Import local dependencies.
 */
import {PING, pongCreator} from './actions';

/**
 * The ping epic creates a delayed pong for each ping.
 */
const pingEpic = action$ =>
  action$.filter(action => action.type === PING)
    .delay(1000) // Asynchronously wait 1000ms then continue
    .mapTo(pongCreator());

/**
 * Export the app epics.
 */
export const appEpic = combineEpics(
  pingEpic
);
