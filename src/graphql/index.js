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
import types from './types.generated.json';

/**
 * Export the GraphQL response normalizer helper function.
 */
export const normalizeGraphQLQueryResponse = (response) => {
  // start processing the query response.
  return Immutable.Map().withMutations((entities) => {
    normalizeGraphQLQueryResponseNode(entities, response, 'Query', 'Query');
  });
};

// parse each node recursively.
function normalizeGraphQLQueryResponseNode(entities, node, path, nodeTypeName) {
  // initialize empty nodes with null.
  if (!node) {
    return null;
  }
  // get the node type either from the schema or the union type itself.
  let nodeType = node.hasOwnProperty('__typename') ? types[node.__typename] : types[nodeTypeName];
  // start building the entity for the node.
  let entity = Immutable.Map().withMutations(entity => {
    // Compute identifier for nodes without id.
    if (node.hasOwnProperty('id') && node.id !== null) {
      // Apply the valid id to the entity.
      entity.set('id', node.id);
      // Calculate the base path for the child properties.
      path = nodeType.name + '.' + node.id;
    }
    else {
      // Apply the path as the identifier for this entity.
      entity.set('id', path);
    }
    // iterate through each property of the node.
    for (let nodePropName in node) {
      // Be nice.
      if (node.hasOwnProperty(nodePropName)) {
        // id is handled already.
        if (nodePropName === 'id') {
          continue;
        }
        // simply copy the __typename property if available.
        if (nodePropName === '__typename') {
          entity.set(nodePropName, node[nodePropName]);
          continue;
        }
        // get the properties type and value.
        let nodePropType = nodeType.fields[nodePropName].type;
        let nodePropValue = node[nodePropName];
        // process the property based on its type.
        switch (nodePropType.kind) {
          case 'SCALAR':
          case 'ENUM':
            entity.set(nodePropName, nodePropValue);
            break;
          case 'OBJECT':
            entity.set(nodePropName, normalizeGraphQLQueryResponseNode(entities, nodePropValue, `${path}.${nodePropName}`, nodePropType.name));
            break;
          case 'UNION':
            // TODO make sure there is a __typename and handle more than just UNIONs of OBJECTs here
            entity.set(nodePropName, normalizeGraphQLQueryResponseNode(entities, nodePropValue, `${path}.${nodePropName}`));
            break;
          case 'LIST':
            switch (nodePropType.ofType.kind) {
              case 'SCALAR':
              case 'ENUM':
                entity.set(nodePropName, Immutable.List(nodePropValue));
                break;
              case 'OBJECT': {
                let list = Immutable.List().withMutations(list => {
                  nodePropValue.forEach((listItem, i) => {
                    list.push(normalizeGraphQLQueryResponseNode(entities, listItem, `${path}.${nodePropName}.${i}`, nodePropType.ofType.name));
                  });
                });
                entity.set(nodePropName, list);
                break;
              }
              case 'UNION': {
                let list = Immutable.List().withMutations(list => {
                  nodePropValue.forEach(listItem => {
                    // TODO include the type here, id is not enough
                    list.push(normalizeGraphQLQueryResponseNode(entities, listItem, `${path}.${nodePropName}`));
                  });
                });
                entity.set(nodePropName, list);
                break;
              }
              case 'LIST': {
                switch (nodePropType.ofType.ofType.kind) {
                  case 'SCALAR':
                  case 'ENUM':
                    let list = Immutable.List().withMutations(list => {
                      nodePropValue.forEach(listItem => {
                        list.push(Immutable.List(listItem));
                      });
                    });
                    entity.set(nodePropName, list);
                    break;
                  // TODO support more than just SCALARs in LIST of LISTs
                }
                break;
              }
            }
            break;
        }
      }
    }
  });
  // Entities always have to have an id, even if they are local properties only.
  if (!entity.has('id')) {
    throw `Entity of type ${nodeType.name} has neither a natural nor a computed id! This should never happen!`;
  }
  // Create the entity type store if it doesn't exist yet.
  if (!entities.has(nodeType.name)) {
    entities.set(nodeType.name, Immutable.Map());
  }
  // Get the entity's id.
  const id = entity.get('id');
  // Add the entity to the response store. Note: entities is processed "withMutations".
  entities.setIn([nodeType.name, id], entity);
  // Return a reference to the entity.
  return {id, __typename: nodeType.name};
}
