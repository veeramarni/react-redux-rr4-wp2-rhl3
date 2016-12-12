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

/**
 * Export action creators.
 */
export const selectCompanyCreator = (name) => ({type: CARD_LIST_PAGE_SELECT_COMPANY, payload: name});
