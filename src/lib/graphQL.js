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

/**
 * Import local dependencies.
 */

/**
 * A map of GraphQL schema types.
 */
let _types;

/**
 *
 */
export const initializeGraphQLSchema = (schema) => {

  return;

  _types = schema.reduce((prev, curr) => {
    if (curr.kind === 'OBJECT') {
      curr.fields = curr.fields.reduce((prev, curr) => {
        prev[curr.name] = curr;
        return prev;
      }, {});
    }
    prev[curr.name] = curr;
    return prev;
  }, {});
  console.log(_types);
};

/**
 *
 */
export const normalizeGraphQLQueryResponse = (response) => {

  return;

  // parse each node recursively.
  function processNode(entities, node, nodeTypeName) {
    // initialize empty nodes with null.
    if (!node) {
      return null;
    }
    // get the node type either from the schema or the union type itself.
    let nodeType = node.hasOwnProperty('__typename') ? _types[node.__typename] : _types[nodeTypeName];
    // start building the entity for the node.
    let entity = {};
    // iterate through each property of the node.
    for (let nodePropName in node) {
      // simply copy the __typename property if available.
      if (nodePropName === '__typename') {
        entity[nodePropName] = node[nodePropName];
        continue;
      }
      // get the properties type and value.
      let nodePropType = nodeType.fields[nodePropName].type;
      let nodePropValue = node[nodePropName];
      // process the property based on its type.
      switch (nodePropType.kind) {
        case 'SCALAR':
        case 'ENUM':
          entity[nodePropName] = nodePropValue;
          break;
        case 'OBJECT':
          entity[nodePropName] = processNode(entities, nodePropValue, nodePropType.name);
          break;
        case 'UNION':
          // TODO make sure there is a __typename and handle more than just UNIONs of OBJECTs here
          entity[nodePropName] = processNode(entities, nodePropValue);
          break;
        case 'LIST':
          switch (nodePropType.ofType.kind) {
            case 'SCALAR':
            case 'ENUM':
              entity[nodePropName] = nodePropValue;
              break;
            case 'OBJECT':
              entity[nodePropName] = [];
              nodePropValue.forEach(listItem => {
                entity[nodePropName].push(processNode(entities, listItem, nodePropType.ofType.name));
              });
              break;
            case 'UNION':
              entity[nodePropName] = [];
              nodePropValue.forEach(listItem => {
                // TODO include the type here, id is not enough
                entity[nodePropName].push(processNode(entities, listItem));
              });
              break;
            case 'LIST':
              switch (nodePropType.ofType.ofType.kind) {
                case 'SCALAR':
                case 'ENUM':
                  entity[nodePropName] = nodePropValue;
                  break;
                // TODO support more than just SCALARs in LIST of LISTs
              }
              break;
          }
          break;
      }
    }
    // do not store the entities without ids.
    if (!entity.hasOwnProperty('id')) {
      return entity;
    }
    // make sure the entity cache for the node type exists.
    if (!entities.hasOwnProperty(nodeType.name)) {
      entities[nodeType.name] = {};
    }
    // copy or merge the entity into the cache.
    if (entities[nodeType.name].hasOwnProperty(entity.id)) {
      Object.assign(entities[nodeType.name][entity.id], entity);
    } else {
      entities[nodeType.name][entity.id] = entity;
    }
    // return the entity.
    return entities[nodeType.name][entity.id];
  }

  // start processing the query response.
  let entities = {};
  console.log(processNode(entities, response, 'Query'), entities);
};
