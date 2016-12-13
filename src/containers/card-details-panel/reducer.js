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
import {CARD_LIST_PAGE_SELECT_COMPANY} from './actions';
import {Map, List} from 'immutable';

/**
 * Default app state.
 */
const cardDetailsPanelDefaultState = Map();

/**
 * Export the router store.
 */
export function cardDetailsPanelReducer(state = cardDetailsPanelDefaultState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
