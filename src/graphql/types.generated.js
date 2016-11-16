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
  Query(id) {
    this.chain.push('Query');
    this.chain.push(id);
    return new Query(this.state, this.chain);
  }
  Explorer(id) {
    this.chain.push('Explorer');
    this.chain.push(id);
    return new Explorer(this.state, this.chain);
  }
  Dimension(id) {
    this.chain.push('Dimension');
    this.chain.push(id);
    return new Dimension(this.state, this.chain);
  }
  Fact(id) {
    this.chain.push('Fact');
    this.chain.push(id);
    return new Fact(this.state, this.chain);
  }
  StringFilter(id) {
    this.chain.push('StringFilter');
    this.chain.push(id);
    return new StringFilter(this.state, this.chain);
  }
  NumberFilter(id) {
    this.chain.push('NumberFilter');
    this.chain.push(id);
    return new NumberFilter(this.state, this.chain);
  }
  DateTimeFilter(id) {
    this.chain.push('DateTimeFilter');
    this.chain.push(id);
    return new DateTimeFilter(this.state, this.chain);
  }
  DonutChart(id) {
    this.chain.push('DonutChart');
    this.chain.push(id);
    return new DonutChart(this.state, this.chain);
  }
  Measure(id) {
    this.chain.push('Measure');
    this.chain.push(id);
    return new Measure(this.state, this.chain);
  }
  DataSet(id) {
    this.chain.push('DataSet');
    this.chain.push(id);
    return new DataSet(this.state, this.chain);
  }
  Column(id) {
    this.chain.push('Column');
    this.chain.push(id);
    return new Column(this.state, this.chain);
  }
  BarChart(id) {
    this.chain.push('BarChart');
    this.chain.push(id);
    return new BarChart(this.state, this.chain);
  }
  LineChart(id) {
    this.chain.push('LineChart');
    this.chain.push(id);
    return new LineChart(this.state, this.chain);
  }
  Currency(id) {
    this.chain.push('Currency');
    this.chain.push(id);
    return new Currency(this.state, this.chain);
  }
  UserDefaults(id) {
    this.chain.push('UserDefaults');
    this.chain.push(id);
    return new UserDefaults(this.state, this.chain);
  }
  CompanyAccess(id) {
    this.chain.push('CompanyAccess');
    this.chain.push(id);
    return new CompanyAccess(this.state, this.chain);
  }

}

class Query extends EntitiesBase {
  constructor(state, chain) { super(state, chain); }
  get explorer() { this.chain.push('explorer'); return new Explorer(this.state, this.chain); }
  chart(type) { this.chain.push('chart'); switch(type) {
    case 'DonutChart': return new DonutChart(this.state, this.chain);
    case 'BarChart': return new BarChart(this.state, this.chain);
    case 'LineChart': return new LineChart(this.state, this.chain);
    default: return new EntitiesBase(this.state, this.chain);
  }}
  get dataSet() { this.chain.push('dataSet'); return new DataSet(this.state, this.chain); }

}
class Explorer extends EntitiesBase {
  constructor(state, chain) { super(state, chain); }
  get id() { this.chain.push('id'); return this; }
  dimensions(index) { this.chain.push('dimensions'); if (isNaN(index)) return this; this.chain.push(index); return new Dimension(this.state, this.chain); }
  facts(index) { this.chain.push('facts'); if (isNaN(index)) return this; this.chain.push(index); return new Fact(this.state, this.chain); }
  filters(index) { this.chain.push('filters'); if (isNaN(index)) return this; this.chain.push(index); return new Filter(this.state, this.chain); }
  chart(type) { this.chain.push('chart'); switch(type) {
    case 'DonutChart': return new DonutChart(this.state, this.chain);
    case 'BarChart': return new BarChart(this.state, this.chain);
    case 'LineChart': return new LineChart(this.state, this.chain);
    default: return new EntitiesBase(this.state, this.chain);
  }}
  currencies(index) { this.chain.push('currencies'); if (isNaN(index)) return this; this.chain.push(index); return new Currency(this.state, this.chain); }
  get userDefaults() { this.chain.push('userDefaults'); return new UserDefaults(this.state, this.chain); }

}
class Dimension extends EntitiesBase {
  constructor(state, chain) { super(state, chain); }
  get key() { this.chain.push('key'); return this; }
  get name() { this.chain.push('name'); return this; }
  get type() { this.chain.push('type'); return this; }

}
class Fact extends EntitiesBase {
  constructor(state, chain) { super(state, chain); }
  get key() { this.chain.push('key'); return this; }
  get name() { this.chain.push('name'); return this; }
  get type() { this.chain.push('type'); return this; }

}
class Filter extends EntitiesBase {
  constructor(state, chain) { super(state, chain); }

}
class StringFilter extends EntitiesBase {
  constructor(state, chain) { super(state, chain); }
  get key() { this.chain.push('key'); return this; }
  get name() { this.chain.push('name'); return this; }
  get type() { this.chain.push('type'); return this; }
  get like() { this.chain.push('like'); return this; }

}
class NumberFilter extends EntitiesBase {
  constructor(state, chain) { super(state, chain); }
  get key() { this.chain.push('key'); return this; }
  get name() { this.chain.push('name'); return this; }
  get type() { this.chain.push('type'); return this; }
  get min() { this.chain.push('min'); return this; }
  get max() { this.chain.push('max'); return this; }
  get equals() { this.chain.push('equals'); return this; }

}
class DateTimeFilter extends EntitiesBase {
  constructor(state, chain) { super(state, chain); }
  get key() { this.chain.push('key'); return this; }
  get name() { this.chain.push('name'); return this; }
  get type() { this.chain.push('type'); return this; }
  get start() { this.chain.push('start'); return this; }
  get end() { this.chain.push('end'); return this; }

}
class Chart extends EntitiesBase {
  constructor(state, chain) { super(state, chain); }

}
class DonutChart extends EntitiesBase {
  constructor(state, chain) { super(state, chain); }
  get dimension() { this.chain.push('dimension'); return new Dimension(this.state, this.chain); }
  get measure() { this.chain.push('measure'); return new Measure(this.state, this.chain); }
  get dataSet() { this.chain.push('dataSet'); return new DataSet(this.state, this.chain); }

}
class Measure extends EntitiesBase {
  constructor(state, chain) { super(state, chain); }
  get key() { this.chain.push('key'); return this; }
  get name() { this.chain.push('name'); return this; }
  get type() { this.chain.push('type'); return this; }
  get aggregation() { this.chain.push('aggregation'); return this; }

}
class DataSet extends EntitiesBase {
  constructor(state, chain) { super(state, chain); }
  get id() { this.chain.push('id'); return this; }
  columns(index) { this.chain.push('columns'); if (isNaN(index)) return this; this.chain.push(index); return new Column(this.state, this.chain); }
  rows(index) { this.chain.push('rows'); if (isNaN(index)) return this; this.chain.push(index); return new (this.state, this.chain); }

}
class Column extends EntitiesBase {
  constructor(state, chain) { super(state, chain); }
  get id() { this.chain.push('id'); return this; }
  get key() { this.chain.push('key'); return this; }
  get name() { this.chain.push('name'); return this; }
  get type() { this.chain.push('type'); return this; }

}
class BarChart extends EntitiesBase {
  constructor(state, chain) { super(state, chain); }
  get dimension() { this.chain.push('dimension'); return new Dimension(this.state, this.chain); }
  get measure() { this.chain.push('measure'); return new Measure(this.state, this.chain); }
  get dataSet() { this.chain.push('dataSet'); return new DataSet(this.state, this.chain); }

}
class LineChart extends EntitiesBase {
  constructor(state, chain) { super(state, chain); }
  get group() { this.chain.push('group'); return new Dimension(this.state, this.chain); }
  get series() { this.chain.push('series'); return new Dimension(this.state, this.chain); }
  get measure() { this.chain.push('measure'); return new Measure(this.state, this.chain); }
  get dataSet() { this.chain.push('dataSet'); return new DataSet(this.state, this.chain); }

}
class Currency extends EntitiesBase {
  constructor(state, chain) { super(state, chain); }
  get key() { this.chain.push('key'); return this; }
  get name() { this.chain.push('name'); return this; }

}
class UserDefaults extends EntitiesBase {
  constructor(state, chain) { super(state, chain); }
  get companyId() { this.chain.push('companyId'); return this; }
  get currencyId() { this.chain.push('currencyId'); return this; }
  get currencyCode() { this.chain.push('currencyCode'); return this; }
  get startDate() { this.chain.push('startDate'); return this; }
  get endDate() { this.chain.push('endDate'); return this; }
  companyAccess(index) { this.chain.push('companyAccess'); if (isNaN(index)) return this; this.chain.push(index); return new CompanyAccess(this.state, this.chain); }

}
class CompanyAccess extends EntitiesBase {
  constructor(state, chain) { super(state, chain); }
  get id() { this.chain.push('id'); return this; }
  get name() { this.chain.push('name'); return this; }

}

