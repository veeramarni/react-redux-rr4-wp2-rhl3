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
import {NEXT, PREVIOUS} from './actions';

/**
 * Export the counter store.
 */
export function counterReducer(state = 1, action) {
  switch (action.type) {
    case NEXT:
      return state + 2;
    case PREVIOUS:
      return state - 2;
    default:
      return state;
  }
}
