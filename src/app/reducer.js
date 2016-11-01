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

/**
 * Default router state.
 */
const routerDefaultState = {
  pathname: location.pathname,
  search: location.search,
  hash: location.hash
};

/**
 * Export the router store.
 */
export function store(state = routerDefaultState, action) {
  switch (action.type) {
    case 'LOCATION_CHANGE':
      return {...state, ...action.router};
    default:
      return state;
  }
}
