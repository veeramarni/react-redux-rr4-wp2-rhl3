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
export const ROOT_INITIALIZE_CLIENT = 'ROOT_INITIALIZE_CLIENT';
export const ROOT_FETCH_GRAPHQL_SCHEMA = 'ROOT_FETCH_GRAPHQL_SCHEMA';
export const ROOT_FETCH_GRAPHQL_SCHEMA_SUCCEEDED = 'ROOT_FETCH_GRAPHQL_SCHEMA_SUCCEEDED';
export const ROOT_FETCH_GRAPHQL_SCHEMA_FAILED = 'ROOT_FETCH_GRAPHQL_SCHEMA_FAILED';
export const ROOT_FETCH_GRAPHQL_SCHEMA_PENDING = 'ROOT_FETCH_GRAPHQL_SCHEMA_PENDING';
export const ROOT_FETCH_GRAPHQL_QUERY = 'ROOT_FETCH_GRAPHQL_QUERY';
export const ROOT_FETCH_GRAPHQL_QUERY_SUCCEEDED = 'ROOT_FETCH_GRAPHQL_QUERY_SUCCEEDED';
export const ROOT_FETCH_GRAPHQL_QUERY_FAILED = 'ROOT_FETCH_GRAPHQL_QUERY_FAILED';
export const ROOT_FETCH_GRAPHQL_QUERY_PENDING = 'ROOT_FETCH_GRAPHQL_QUERY_PENDING';

/**
 * Export action creators.
 */
export const setLocationCreator = (router) => ({type: LOCATION_CHANGE, router});
export const initializeClientCreator = () => ({type: ROOT_INITIALIZE_CLIENT});
export const fetchGraphQLSchemaCreator = () => ({type: ROOT_FETCH_GRAPHQL_SCHEMA});
export const fetchGraphQLSchemaSucceededCreator = (payload) => ({type: ROOT_FETCH_GRAPHQL_SCHEMA_SUCCEEDED, payload});
export const fetchGraphQLSchemaFailedCreator = (payload) => ({type: ROOT_FETCH_GRAPHQL_SCHEMA_FAILED, payload});
export const fetchGraphQLSchemaPendingCreator = (payload) => ({type: ROOT_FETCH_GRAPHQL_SCHEMA_PENDING});
export const fetchGraphQLQueryCreator = (payload) => ({type: ROOT_FETCH_GRAPHQL_QUERY, payload});
export const fetchGraphQLQuerySucceededCreator = (payload) => ({type: ROOT_FETCH_GRAPHQL_QUERY_SUCCEEDED, payload});
export const fetchGraphQLQueryFailedCreator = (payload) => ({type: ROOT_FETCH_GRAPHQL_QUERY_FAILED, payload});
export const fetchGraphQLQueryPendingCreator = (payload) => ({type: ROOT_FETCH_GRAPHQL_QUERY_PENDING});
