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
const cardListPageDefaultState = Map({
  companiesFilter: Map({
    options: List(['Bremen', 'Paris', 'Auckland']),
    value: ''
  }),
  columns: List(['Name & Account No.', 'Company ID', 'Current Spend', 'Credit Limit', 'Issuer', 'Account Type', 'Card Type']),
  rows: List([
    Map({
      name: 'Sindhu Ready',
      accountNumber: '12345****67890',
      company: 'Cola Company',
      spend: 22.99,
      limit: 2000,
      issuer: 'uvb',
      accountType: 'Fleet Card',
      cardType: 'Plastic'
    }),
    Map({
      name: 'John Smith',
      accountNumber: '12345****67890',
      company: 'Cola Company',
      spend: 156.33,
      limit: 2000,
      issuer: 'uvb',
      accountType: 'Fleet Card',
      cardType: 'Plastic'
    }),
    Map({
      name: 'Henry Adamns',
      accountNumber: '12345****67890',
      company: 'Cola Company',
      spend: 2.99,
      limit: 1500,
      issuer: 'uvb',
      accountType: 'Fleet Card',
      cardType: 'Plastic'
    }),
    Map({
      name: 'Ann Smith',
      accountNumber: '12345****67890',
      company: 'Cola Company',
      spend: 88.22,
      limit: 2000,
      issuer: 'uvb',
      accountType: 'Fleet Card',
      cardType: 'Virtual'
    }),
    Map({
      name: 'Lee Jones',
      accountNumber: '12345****67890',
      company: 'Cola Company',
      spend: 12.99,
      limit: 2000,
      issuer: 'uvb',
      accountType: 'Fleet Card',
      cardType: 'Plastic'
    }),
    Map({
      name: 'Hana Leed',
      accountNumber: '12345****67890',
      company: 'Cola Company',
      spend: 896.12,
      limit: 2000,
      issuer: 'uvb',
      accountType: 'Fleet Card',
      cardType: 'Plastic'
    }),
    Map({
      name: 'Vikcy Nolan',
      accountNumber: '12345****67890',
      company: 'Cola Company',
      spend: 1500,
      limit: 2000,
      issuer: 'uvb',
      accountType: 'Fleet Card',
      cardType: 'Plastic'
    })
  ])
});

/**
 * Export the router store.
 */
export function cardListPageReducer(state = cardListPageDefaultState, action) {
  switch (action.type) {
    case CARD_LIST_PAGE_SELECT_COMPANY:
      return state.setIn(['companiesFilter', 'value'], action.payload);
    default:
      return state;
  }
}
