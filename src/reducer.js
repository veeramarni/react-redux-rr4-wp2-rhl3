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
import {combineReducers} from 'redux';

/**
 * Import local dependencies.
 */
import {store as routerStore} from './app';
import {store as counterStore} from './app/counter';

/**
 * Export the application store.
 */
export default combineReducers({
  router: routerStore,
  counter: counterStore
});
