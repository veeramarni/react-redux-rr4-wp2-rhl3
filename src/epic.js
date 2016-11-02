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
import { combineEpics } from 'redux-observable';

/**
 * Import local dependencies.
 */
import {appEpic} from './app';

/**
 * Export the root epics.
 */
export const rootEpic = combineEpics(
  appEpic
);
