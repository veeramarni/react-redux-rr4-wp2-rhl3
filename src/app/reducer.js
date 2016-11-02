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

/**
 * Default app state.
 */
const appDefaultState = {
  isPinging: false
};

/**
 * Export the router store.
 */
export function appReducer(state = appDefaultState, action) {
  switch (action.type) {
    case PING:
      return {...state, isPinging: true};
    case PONG:
      return {...state, isPinging: false};
    default:
      return state;
  }
}
