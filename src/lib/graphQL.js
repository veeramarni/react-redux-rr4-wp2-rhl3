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
import {Explorer} from './types.generated';

/**
 *
 */
export const initializeGraphQLSchema = (state) => {
  // Create an entity store for each GraphQL entity type.
  const s = state.withMutations((state) => {
    for (let typeName in types) {
      if (types.hasOwnProperty(typeName)) {
        if (types[typeName].kind === 'OBJECT') {
          state.set(typeName, Immutable.Map({}));
        }
      }
    }
  });
  console.log('s', s.toJS());
  return s;
};

/**
 *
 */
export const normalizeGraphQLQueryResponse = (entities, response) => {
  // start processing the query response.
  const t = entities.withMutations((entities) => {
    normalizeGraphQLQueryResponseNode(entities, response, 'Query');
  });
  console.log('t', t.toJS());
  console.log('X', t.getIn(['Explorer', '0']).toJS());
  let explorer = Explorer('0', t);
  console.log('Y', explorer.chart.__typename, explorer.chart.dataSet.columns.toJS());

  // TODO t.setIn(['Explorer', '0', 'chart', 'measure'], null) Will not work!
  // BUT lets make this work:
  // explorer.chart.dataSet.columns = Immutable.List([1,2,3]);
  // hopefully easy by just adding setters in the wrapper that call this._map.set(value);

  return t;
};

// parse each node recursively.
function normalizeGraphQLQueryResponseNode(entities, node, nodeTypeName) {
  // initialize empty nodes with null.
  if (!node) {
    return null;
  }
  // get the node type either from the schema or the union type itself.
  let nodeType = node.hasOwnProperty('__typename') ? types[node.__typename] : types[nodeTypeName];
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

  //
  if (!entity.has('id')) {
    return entity;
  }

  //
  const id = entity.get('id');
  console.log(nodeType.name, id);
  console.log(entities.hasIn([nodeType.name, id]));
  entities = entities.hasIn([nodeType.name, id]) ? entities.mergeIn([nodeType.name, id], entity) : entities.setIn([nodeType.name, id], entity);
  return {id, __typename: nodeType.name};
}
