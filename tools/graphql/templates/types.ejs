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
import {List} from 'immutable';

/**
 * Import local dependencies.
 */
import types from './types.generated.json';

/**
 * Factory to create easy entity access.
 */
export function entities(state) {
  return new Entities(state);
}

/**
 * Helper class for easy entity access.
 */
class EntitiesBase {
  constructor(state, chain) {
    this.state = state;
    this.chain = chain;
  }

  __value(undefinedValue) {
    return resolve(this.state, this.chain, undefinedValue).value;
  }

  __type(undefinedValue) {
    return resolve(this.state, this.chain, undefinedValue).type;
  }
}

function resolve(state, chain, undefinedValue) {
  // Chain iterator.
  let i = 0;
  // Get the initial entity type.
  let entityType = types[chain[i++]];
  // Get the initial entity id.
  let entityId = chain[i++];
  // Make sure the requested entity exists.
  if (!state.hasIn([entityType.name, entityId])) {
    console.warn(`Entity of type ${entityType.name} with id ${entityId} does not exist!`);
    return {value: undefinedValue, type: entityType.name};
  }
  // Get the initial entity value.
  let entityValue = state.getIn([entityType.name, entityId]);
  // Now follow along the chain to resolve the requested property path.
  while (i < chain.length) {
    // Get the name of the current property.
    let propName = chain[i++];
    console.log(propName);
    // Get the type of the current property.
    let propType = entityType.fields[propName].type;
    // Get the value of the current property.
    let propValue = entityValue.get(propName);
    // Handle the property based on its type.
    switch (propType.kind) {
      case 'OBJECT':
      case 'UNION':
        // Get the entity type of the property.
        entityType = types[propValue.__typename];
        // Get the entity id of the property.
        entityId = propValue.id;
        // Make sure the requested entity exists.
        if (!state.hasIn([entityType.name, entityId])) {
          console.warn(`Entity of type ${entityType.name} with id ${entityId} does not exist!`);
          return {value: undefinedValue, type: entityType.name};
        }
        // Get the properties entity value.
        entityValue = state.getIn([entityType.name, entityId]);
        break;
      case 'LIST':
        // Make sure the property value is a List.
        if (!List.isList(propValue)) {
          return {value: undefinedValue, type: propType.ofType.name};
        }
        // Handle indexed access to the List.
        if (i < chain.length) {
          if (isNaN(chain[i])) {
            console.warn(`Indexer must be an int at index ${i}: ${chain.join(', ')}!`);
            return {value: undefinedValue, type: propType.ofType.name};
          }
          // Get the item at the requested index.
          let itemValue = propValue.get(chain[i++]);
          // Make sure it is valid.
          if (!itemValue) {
            return {value: undefinedValue, type: propType.ofType.name};
          }
          // Handle scalar List items.
          switch (propType.ofType.kind) {
            case 'OBJECT':
            case 'UNION':
              // Get the entity type of the property.
              entityType = types[itemValue.__typename];
              // Get the entity id of the property.
              entityId = itemValue.id;
              // Make sure the requested entity exists.
              if (!state.hasIn([entityType.name, entityId])) {
                console.warn(`Entity of type ${entityType.name} with id ${entityId} does not exist!`);
                return {value: undefinedValue, type: itemValue.__typename};
              }
              // Get the properties entity value.
              entityValue = state.getIn([entityType.name, entityId]);
              break;
            case 'SCALAR':
            case 'LIST':
              // Warn if the chain has not ended yet.
              if (i < chain.length) {
                console.warn(`Requested entity chain is invalid at index ${i}: ${chain.join(', ')}!`);
              }
              return {value: itemValue, type: propType.ofType.kind};
          }
        } else {
          // Warn if the chain has not ended yet.
          if (i < chain.length) {
            console.warn(`Requested entity chain is invalid at index ${i}: ${chain.join(', ')}!`);
          }
          return {value: propValue, type: propType.ofType.name};
        }
        break;
      case 'SCALAR':
        // Warn if the chain has not ended yet.
        if (i < chain.length) {
          console.warn(`Requested entity chain is invalid at index ${i}: ${chain.join(', ')}!`);
        }
        return {value: propValue, type: propType.name};
      default:
        // Impossible.
        console.warn(`Unknown property type ${propType.kind}!`);
        return {value: undefinedValue, type: undefinedValue};
    }
  }
  return {value: entityValue, type: entityType.name};
}

class Entities extends EntitiesBase {
  constructor(state) {
    super(state.get('entities'), []);
  }
<% for(var i=0; i<types.length; i++) {
     if(types[i].kind === 'OBJECT'){%>  <%= types[i].Name %>(id) {
    this.chain.push('<%= types[i].Name %>');
    this.chain.push(id);
    return new <%= types[i].Name %>(this.state, this.chain);
  }
<% }} %>
}

<% for(var i=0; i<types.length; i++) {%>class <%= types[i].Name %> extends EntitiesBase {
  constructor(state, chain) { super(state, chain); }
<%   for(var fieldName in types[i].fields) {
       field = types[i].fields[fieldName];
       switch(field.type.kind) {
         case 'SCALAR':%>  get <%= fieldName %>() { this.chain.push('<%= fieldName %>'); return this; }
<%       break;
         case 'LIST':%>  <%= fieldName %>(index) { this.chain.push('<%= fieldName %>'); if (isNaN(index)) return this; this.chain.push(index); return new <%= field.type.ofType.name %>(this.state, this.chain); }
<%       break;
         case 'OBJECT':%>  get <%= fieldName %>() { this.chain.push('<%= fieldName %>'); return new <%= field.type.name %>(this.state, this.chain); }
<%       break;
         case 'UNION':%>  <%= fieldName %>(type) { this.chain.push('<%= fieldName %>'); switch(type) {
<%       for(var j=0; j<field.type.possibleTypes.length; j++){%>    case '<%= field.type.possibleTypes[j].name %>': return new <%= field.type.possibleTypes[j].name %>(this.state, this.chain);
<%       }%>  default: return new EntitiesBase(this.state, this.chain);
  }}
<%       break;
       }
     }%>
}
<% }%>
