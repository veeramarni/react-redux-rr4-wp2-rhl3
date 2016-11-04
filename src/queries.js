/**
 * Bernd Wessels (https://github.com/BerndWessels/)
 *
 * Copyright © 2016 Bernd Wessels. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/**
 * This query is used to fetch the GraphQL schema.
 */
export const fetchGraphQLSchemaQuery = () => {
  return {
    query: `
      {
        __schema {
          types {
            name
            kind
            ofType {
              name
              kind
            }
            fields {
              name
              type {
                name
                kind
                ofType {
                  name
                  kind
                  ofType {
                    name
                    kind
                  }
                }
              }
            }
          }
        }
      }`
  };
};
