/**
 * Bernd Wessels (https://github.com/BerndWessels/)
 *
 * Copyright © 2016 Bernd Wessels. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/**
 * Export action types.
 */
export const CARD_LIST_PAGE_SELECT_COMPANY = 'CARD_LIST_PAGE_SELECT_COMPANY';
export const CARD_LIST_PAGE_CHANGE_SELECTED_CARD_INDEX = 'CARD_LIST_PAGE_CHANGE_SELECTED_CARD_INDEX';

/**
 * Export action creators.
 */
export const selectCompanyCreator = (name) => ({type: CARD_LIST_PAGE_SELECT_COMPANY, payload: name});
export const changeSelectedCardIndexCreator = (index) => ({type: CARD_LIST_PAGE_CHANGE_SELECTED_CARD_INDEX, payload: index});
