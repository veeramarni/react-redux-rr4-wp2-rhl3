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
import {PING, PONG} from './actions';
import {Map} from 'immutable';

/**
 * Default app state.
 */
const demoPageDefaultState = Map({
  isPinging: false
});

/**
 * Export the router store.
 */
export function demoPageReducer(state = demoPageDefaultState, action) {
  switch (action.type) {
    case PING:
      return state.set('isPinging', true);
    case PONG:
      return state.set('isPinging', false);
    default:
      return state;
  }
}
