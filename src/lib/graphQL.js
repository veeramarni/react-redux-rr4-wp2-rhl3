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

/**
 * A map of GraphQL schema types.
 */
let _types;

/**
 *
 */
export const initializeGraphQLSchema = (state, schema) => {
  // Create an object with all GraphQL entity types.
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
  // Create an entity store for each GraphQL entity type.
  const s = state.withMutations((state) => {
    for (let typeName in _types) {
      if (_types[typeName].kind === 'OBJECT') {
        state.set(typeName, Immutable.Map({}));
      }
    }
  });
  console.log('s', s.toJS());
  return s;
};

/**
 * An identifier counter for 'local' identities.
 */
let _id = 10;

/**
 *
 */
export const normalizeGraphQLQueryResponse = (entities, response) => {
  // start processing the query response.
  const t = entities.withMutations((entities) => {
    normalizeGraphQLQueryResponseNode(entities, response, 'Query');
  });
  console.log('t', t.toJS());
  return t;
};

// parse each node recursively.
function normalizeGraphQLQueryResponseNode(entities, node, nodeTypeName) {
  // initialize empty nodes with null.
  if (!node) {
    return null;
  }
  // get the node type either from the schema or the union type itself.
  let nodeType = node.hasOwnProperty('__typename') ? _types[node.__typename] : _types[nodeTypeName];
  // start building the entity for the node.
  let entity = Immutable.Map().withMutations(entity => {
    // iterate through each property of the node.
    for (let nodePropName in node) {
      // Be nice.
      if (node.hasOwnProperty(nodePropName)) {
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
            entity.set(nodePropName, normalizeGraphQLQueryResponseNode(entities, nodePropValue, nodePropType.name));
            break;
          case 'UNION':
            // TODO make sure there is a __typename and handle more than just UNIONs of OBJECTs here
            entity.set(nodePropName, normalizeGraphQLQueryResponseNode(entities, nodePropValue));
            break;
          case 'LIST':
            switch (nodePropType.ofType.kind) {
              case 'SCALAR':
              case 'ENUM':
                entity.set(nodePropName, Immutable.List(nodePropValue));
                break;
              case 'OBJECT': {
                let list = Immutable.List().withMutations(list => {
                  nodePropValue.forEach(listItem => {
                    list.push(normalizeGraphQLQueryResponseNode(entities, listItem, nodePropType.ofType.name));
                  });
                });
                entity.set(nodePropName, list);
                break;
              }
              case 'UNION': {
                let list = Immutable.List().withMutations(list => {
                  nodePropValue.forEach(listItem => {
                    // TODO include the type here, id is not enough
                    list.push(normalizeGraphQLQueryResponseNode(entities, listItem));
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
  // No need to store the Query response object itself.
  if (nodeType.name === 'Query') {
    return;
  }
  // TODO: _id needs to be part of the store to be serializable.
  const id = entity.has('id') ? entity.get('id') : `_${_id++}`;
  // TODO: delete abandoned local ids when updates occur.
  // for each prop to be merged that has no id in entities.hasIn([nodeType.name, id]) -> entities.getIn([nodeType.name, id]) delete from store ?!
  console.log(nodeType.name, id, entity.toJS());
  entities = entities.hasIn([nodeType.name, id]) ? entities.mergeIn([nodeType.name, id], entity) : entities.setIn([nodeType.name, id], entity);
  return Immutable.Map({__typename: nodeType.name, id: id});
}
