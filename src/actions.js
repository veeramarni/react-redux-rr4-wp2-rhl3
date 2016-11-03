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
export const LOCATION_CHANGE = 'LOCATION_CHANGE';
export const ROOT_FETCH_GRAPHQL = 'ROOT_FETCH_GRAPHQL';
export const ROOT_FETCH_GRAPHQL_SUCCEEDED = 'ROOT_FETCH_GRAPHQL_SUCCEEDED';
export const ROOT_FETCH_GRAPHQL_FAILED = 'ROOT_FETCH_GRAPHQL_FAILED';
export const ROOT_FETCH_GRAPHQL_PENDING = 'ROOT_FETCH_GRAPHQL_PENDING';

/**
 * Export action creators.
 */
export const setLocationCreator = (router) => ({type: LOCATION_CHANGE, router});
export const fetchGraphQLCreator = (payload) => ({type: ROOT_FETCH_GRAPHQL, payload});
export const fetchGraphQLSucceededCreator = (payload) => ({type: ROOT_FETCH_GRAPHQL_SUCCEEDED, payload});
export const fetchGraphQLFailedCreator = (payload) => ({type: ROOT_FETCH_GRAPHQL_FAILED, payload});
export const fetchGraphQLPendingCreator = (payload) => ({type: ROOT_FETCH_GRAPHQL_PENDING, payload});
