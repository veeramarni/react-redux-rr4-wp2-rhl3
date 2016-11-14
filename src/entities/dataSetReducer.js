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
import Immutable from 'immutable';

/**
 * Import local dependencies.
 */
import {
    ROOT_FETCH_GRAPHQL_QUERY_SUCCEEDED
} from '../actions';

/**
 * Default DataSet entities state.
 */
const dataSetDefaultState = Immutable.Map({});

/**
 * Export the DataSet entities store.
 */
export function dataSetReducer(state = dataSetDefaultState, action) {
    switch (action.type) {
        case ROOT_FETCH_GRAPHQL_QUERY_SUCCEEDED:
            return state.merge(action.payload.get('DataSet'));
        default:
            return state;
    }
}
