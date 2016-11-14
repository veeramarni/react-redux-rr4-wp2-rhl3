import {Map, List} from 'immutable';

export class QueryEntity {
  constructor(map, state, path) {
    this._map = map;
    this._state = state;
    this._path = path ? path : List(['Query', this._map.get('id')]);
  }
  get __typename() { return 'Query'; }
  get __path() { return this._path; }
  get explorer() { console.log('explorer', this._path.toJS()); const val = this._map.get('explorer'); if(!val) return wrap('Explorer', Map(), this._state, this._path.push('!explorer!')); return Map.isMap(val) ? wrap('Explorer', val, this._state, this._path.push('explorer')) : wrap('Explorer', this._state.getIn(['Explorer', val.id]), this._state); }
  get chart() { console.log('chart', this._path.toJS()); const val = this._map.get('chart'); if(!val) return wrap('Chart', Map(), this._state, this._path.push('!chart!')); return Map.isMap(val) ? wrap(val.get('__typename'), val, this._state, this._path.push('chart')) : wrap(val.__typename, this._state.getIn([val.__typename, val.id]), this._state); }
  get dataSet() { console.log('dataSet', this._path.toJS()); const val = this._map.get('dataSet'); if(!val) return wrap('DataSet', Map(), this._state, this._path.push('!dataSet!')); return Map.isMap(val) ? wrap('DataSet', val, this._state, this._path.push('dataSet')) : wrap('DataSet', this._state.getIn(['DataSet', val.id]), this._state); }
}

export class ExplorerEntity {
  constructor(map, state, path) {
    this._map = map;
    this._state = state;
    this._path = path ? path : List(['Explorer', this._map.get('id')]);
  }
  get __typename() { return 'Explorer'; }
  get __path() { return this._path; }
  get id() { console.log('id', this._path.toJS()); return new EntityLeaf(this._map.get('id'), this._path.push('id')); }
  get dimensions() { console.log('dimensions', this._path.toJS()); return new EntityLeaf(this._map.get('dimensions'), this._path.push('dimensions')); }
  get facts() { console.log('facts', this._path.toJS()); return new EntityLeaf(this._map.get('facts'), this._path.push('facts')); }
  get filters() { console.log('filters', this._path.toJS()); return new EntityLeaf(this._map.get('filters'), this._path.push('filters')); }
  get chart() { console.log('chart', this._path.toJS()); const val = this._map.get('chart'); if(!val) return wrap('Chart', Map(), this._state, this._path.push('!chart!')); return Map.isMap(val) ? wrap(val.get('__typename'), val, this._state, this._path.push('chart')) : wrap(val.__typename, this._state.getIn([val.__typename, val.id]), this._state); }
  get currencies() { console.log('currencies', this._path.toJS()); return new EntityLeaf(this._map.get('currencies'), this._path.push('currencies')); }
  get userDefaults() { console.log('userDefaults', this._path.toJS()); const val = this._map.get('userDefaults'); if(!val) return wrap('UserDefaults', Map(), this._state, this._path.push('!userDefaults!')); return Map.isMap(val) ? wrap('UserDefaults', val, this._state, this._path.push('userDefaults')) : wrap('UserDefaults', this._state.getIn(['UserDefaults', val.id]), this._state); }
}

export class DimensionEntity {
  constructor(map, state, path) {
    this._map = map;
    this._state = state;
    this._path = path ? path : List(['Dimension', this._map.get('id')]);
  }
  get __typename() { return 'Dimension'; }
  get __path() { return this._path; }
  get key() { console.log('key', this._path.toJS()); return new EntityLeaf(this._map.get('key'), this._path.push('key')); }
  get name() { console.log('name', this._path.toJS()); return new EntityLeaf(this._map.get('name'), this._path.push('name')); }
  get type() { console.log('type', this._path.toJS()); return new EntityLeaf(this._map.get('type'), this._path.push('type')); }
}

export class FactEntity {
  constructor(map, state, path) {
    this._map = map;
    this._state = state;
    this._path = path ? path : List(['Fact', this._map.get('id')]);
  }
  get __typename() { return 'Fact'; }
  get __path() { return this._path; }
  get key() { console.log('key', this._path.toJS()); return new EntityLeaf(this._map.get('key'), this._path.push('key')); }
  get name() { console.log('name', this._path.toJS()); return new EntityLeaf(this._map.get('name'), this._path.push('name')); }
  get type() { console.log('type', this._path.toJS()); return new EntityLeaf(this._map.get('type'), this._path.push('type')); }
}

export class StringFilterEntity {
  constructor(map, state, path) {
    this._map = map;
    this._state = state;
    this._path = path ? path : List(['StringFilter', this._map.get('id')]);
  }
  get __typename() { return 'StringFilter'; }
  get __path() { return this._path; }
  get key() { console.log('key', this._path.toJS()); return new EntityLeaf(this._map.get('key'), this._path.push('key')); }
  get name() { console.log('name', this._path.toJS()); return new EntityLeaf(this._map.get('name'), this._path.push('name')); }
  get type() { console.log('type', this._path.toJS()); return new EntityLeaf(this._map.get('type'), this._path.push('type')); }
  get like() { console.log('like', this._path.toJS()); return new EntityLeaf(this._map.get('like'), this._path.push('like')); }
}

export class NumberFilterEntity {
  constructor(map, state, path) {
    this._map = map;
    this._state = state;
    this._path = path ? path : List(['NumberFilter', this._map.get('id')]);
  }
  get __typename() { return 'NumberFilter'; }
  get __path() { return this._path; }
  get key() { console.log('key', this._path.toJS()); return new EntityLeaf(this._map.get('key'), this._path.push('key')); }
  get name() { console.log('name', this._path.toJS()); return new EntityLeaf(this._map.get('name'), this._path.push('name')); }
  get type() { console.log('type', this._path.toJS()); return new EntityLeaf(this._map.get('type'), this._path.push('type')); }
  get min() { console.log('min', this._path.toJS()); return new EntityLeaf(this._map.get('min'), this._path.push('min')); }
  get max() { console.log('max', this._path.toJS()); return new EntityLeaf(this._map.get('max'), this._path.push('max')); }
  get equals() { console.log('equals', this._path.toJS()); return new EntityLeaf(this._map.get('equals'), this._path.push('equals')); }
}

export class DateTimeFilterEntity {
  constructor(map, state, path) {
    this._map = map;
    this._state = state;
    this._path = path ? path : List(['DateTimeFilter', this._map.get('id')]);
  }
  get __typename() { return 'DateTimeFilter'; }
  get __path() { return this._path; }
  get key() { console.log('key', this._path.toJS()); return new EntityLeaf(this._map.get('key'), this._path.push('key')); }
  get name() { console.log('name', this._path.toJS()); return new EntityLeaf(this._map.get('name'), this._path.push('name')); }
  get type() { console.log('type', this._path.toJS()); return new EntityLeaf(this._map.get('type'), this._path.push('type')); }
  get start() { console.log('start', this._path.toJS()); return new EntityLeaf(this._map.get('start'), this._path.push('start')); }
  get end() { console.log('end', this._path.toJS()); return new EntityLeaf(this._map.get('end'), this._path.push('end')); }
}

export class DonutChartEntity {
  constructor(map, state, path) {
    this._map = map;
    this._state = state;
    this._path = path ? path : List(['DonutChart', this._map.get('id')]);
  }
  get __typename() { return 'DonutChart'; }
  get __path() { return this._path; }
  get dimension() { console.log('dimension', this._path.toJS()); const val = this._map.get('dimension'); if(!val) return wrap('Dimension', Map(), this._state, this._path.push('!dimension!')); return Map.isMap(val) ? wrap('Dimension', val, this._state, this._path.push('dimension')) : wrap('Dimension', this._state.getIn(['Dimension', val.id]), this._state); }
  get measure() { console.log('measure', this._path.toJS()); const val = this._map.get('measure'); if(!val) return wrap('Measure', Map(), this._state, this._path.push('!measure!')); return Map.isMap(val) ? wrap('Measure', val, this._state, this._path.push('measure')) : wrap('Measure', this._state.getIn(['Measure', val.id]), this._state); }
  get dataSet() { console.log('dataSet', this._path.toJS()); const val = this._map.get('dataSet'); if(!val) return wrap('DataSet', Map(), this._state, this._path.push('!dataSet!')); return Map.isMap(val) ? wrap('DataSet', val, this._state, this._path.push('dataSet')) : wrap('DataSet', this._state.getIn(['DataSet', val.id]), this._state); }
}

export class MeasureEntity {
  constructor(map, state, path) {
    this._map = map;
    this._state = state;
    this._path = path ? path : List(['Measure', this._map.get('id')]);
  }
  get __typename() { return 'Measure'; }
  get __path() { return this._path; }
  get key() { console.log('key', this._path.toJS()); return new EntityLeaf(this._map.get('key'), this._path.push('key')); }
  get name() { console.log('name', this._path.toJS()); return new EntityLeaf(this._map.get('name'), this._path.push('name')); }
  get type() { console.log('type', this._path.toJS()); return new EntityLeaf(this._map.get('type'), this._path.push('type')); }
  get aggregation() { console.log('aggregation', this._path.toJS()); return new EntityLeaf(this._map.get('aggregation'), this._path.push('aggregation')); }
}

export class DataSetEntity {
  constructor(map, state, path) {
    this._map = map;
    this._state = state;
    this._path = path ? path : List(['DataSet', this._map.get('id')]);
  }
  get __typename() { return 'DataSet'; }
  get __path() { return this._path; }
  get id() { console.log('id', this._path.toJS()); return new EntityLeaf(this._map.get('id'), this._path.push('id')); }
  get columns() { console.log('columns', this._path.toJS()); return new EntityLeaf(this._map.get('columns'), this._path.push('columns')); }
  get rows() { console.log('rows', this._path.toJS()); return new EntityLeaf(this._map.get('rows'), this._path.push('rows')); }
}

export class ColumnEntity {
  constructor(map, state, path) {
    this._map = map;
    this._state = state;
    this._path = path ? path : List(['Column', this._map.get('id')]);
  }
  get __typename() { return 'Column'; }
  get __path() { return this._path; }
  get id() { console.log('id', this._path.toJS()); return new EntityLeaf(this._map.get('id'), this._path.push('id')); }
  get key() { console.log('key', this._path.toJS()); return new EntityLeaf(this._map.get('key'), this._path.push('key')); }
  get name() { console.log('name', this._path.toJS()); return new EntityLeaf(this._map.get('name'), this._path.push('name')); }
  get type() { console.log('type', this._path.toJS()); return new EntityLeaf(this._map.get('type'), this._path.push('type')); }
}

export class BarChartEntity {
  constructor(map, state, path) {
    this._map = map;
    this._state = state;
    this._path = path ? path : List(['BarChart', this._map.get('id')]);
  }
  get __typename() { return 'BarChart'; }
  get __path() { return this._path; }
  get dimension() { console.log('dimension', this._path.toJS()); const val = this._map.get('dimension'); if(!val) return wrap('Dimension', Map(), this._state, this._path.push('!dimension!')); return Map.isMap(val) ? wrap('Dimension', val, this._state, this._path.push('dimension')) : wrap('Dimension', this._state.getIn(['Dimension', val.id]), this._state); }
  get measure() { console.log('measure', this._path.toJS()); const val = this._map.get('measure'); if(!val) return wrap('Measure', Map(), this._state, this._path.push('!measure!')); return Map.isMap(val) ? wrap('Measure', val, this._state, this._path.push('measure')) : wrap('Measure', this._state.getIn(['Measure', val.id]), this._state); }
  get dataSet() { console.log('dataSet', this._path.toJS()); const val = this._map.get('dataSet'); if(!val) return wrap('DataSet', Map(), this._state, this._path.push('!dataSet!')); return Map.isMap(val) ? wrap('DataSet', val, this._state, this._path.push('dataSet')) : wrap('DataSet', this._state.getIn(['DataSet', val.id]), this._state); }
}

export class LineChartEntity {
  constructor(map, state, path) {
    this._map = map;
    this._state = state;
    this._path = path ? path : List(['LineChart', this._map.get('id')]);
  }
  get __typename() { return 'LineChart'; }
  get __path() { return this._path; }
  get group() { console.log('group', this._path.toJS()); const val = this._map.get('group'); if(!val) return wrap('Dimension', Map(), this._state, this._path.push('!group!')); return Map.isMap(val) ? wrap('Dimension', val, this._state, this._path.push('group')) : wrap('Dimension', this._state.getIn(['Dimension', val.id]), this._state); }
  get series() { console.log('series', this._path.toJS()); const val = this._map.get('series'); if(!val) return wrap('Dimension', Map(), this._state, this._path.push('!series!')); return Map.isMap(val) ? wrap('Dimension', val, this._state, this._path.push('series')) : wrap('Dimension', this._state.getIn(['Dimension', val.id]), this._state); }
  get measure() { console.log('measure', this._path.toJS()); const val = this._map.get('measure'); if(!val) return wrap('Measure', Map(), this._state, this._path.push('!measure!')); return Map.isMap(val) ? wrap('Measure', val, this._state, this._path.push('measure')) : wrap('Measure', this._state.getIn(['Measure', val.id]), this._state); }
  get dataSet() { console.log('dataSet', this._path.toJS()); const val = this._map.get('dataSet'); if(!val) return wrap('DataSet', Map(), this._state, this._path.push('!dataSet!')); return Map.isMap(val) ? wrap('DataSet', val, this._state, this._path.push('dataSet')) : wrap('DataSet', this._state.getIn(['DataSet', val.id]), this._state); }
}

export class CurrencyEntity {
  constructor(map, state, path) {
    this._map = map;
    this._state = state;
    this._path = path ? path : List(['Currency', this._map.get('id')]);
  }
  get __typename() { return 'Currency'; }
  get __path() { return this._path; }
  get key() { console.log('key', this._path.toJS()); return new EntityLeaf(this._map.get('key'), this._path.push('key')); }
  get name() { console.log('name', this._path.toJS()); return new EntityLeaf(this._map.get('name'), this._path.push('name')); }
}

export class UserDefaultsEntity {
  constructor(map, state, path) {
    this._map = map;
    this._state = state;
    this._path = path ? path : List(['UserDefaults', this._map.get('id')]);
  }
  get __typename() { return 'UserDefaults'; }
  get __path() { return this._path; }
  get companyId() { console.log('companyId', this._path.toJS()); return new EntityLeaf(this._map.get('companyId'), this._path.push('companyId')); }
  get currencyId() { console.log('currencyId', this._path.toJS()); return new EntityLeaf(this._map.get('currencyId'), this._path.push('currencyId')); }
  get currencyCode() { console.log('currencyCode', this._path.toJS()); return new EntityLeaf(this._map.get('currencyCode'), this._path.push('currencyCode')); }
  get startDate() { console.log('startDate', this._path.toJS()); return new EntityLeaf(this._map.get('startDate'), this._path.push('startDate')); }
  get endDate() { console.log('endDate', this._path.toJS()); return new EntityLeaf(this._map.get('endDate'), this._path.push('endDate')); }
  get companyAccess() { console.log('companyAccess', this._path.toJS()); return new EntityLeaf(this._map.get('companyAccess'), this._path.push('companyAccess')); }
}

export class CompanyAccessEntity {
  constructor(map, state, path) {
    this._map = map;
    this._state = state;
    this._path = path ? path : List(['CompanyAccess', this._map.get('id')]);
  }
  get __typename() { return 'CompanyAccess'; }
  get __path() { return this._path; }
  get id() { console.log('id', this._path.toJS()); return new EntityLeaf(this._map.get('id'), this._path.push('id')); }
  get name() { console.log('name', this._path.toJS()); return new EntityLeaf(this._map.get('name'), this._path.push('name')); }
}

class EntityLeaf {
  constructor(value, path){
    this._value = value;
    this._path = path;
  }
  get __value() { return this._value; }
  get __path () { return this._path; }
}

const wrap = (type, map, state, path) => {
  switch(type){
    case 'Query': return new QueryEntity(map, state, path);
    case 'Explorer': return new ExplorerEntity(map, state, path);
    case 'Dimension': return new DimensionEntity(map, state, path);
    case 'Fact': return new FactEntity(map, state, path);
    case 'StringFilter': return new StringFilterEntity(map, state, path);
    case 'NumberFilter': return new NumberFilterEntity(map, state, path);
    case 'DateTimeFilter': return new DateTimeFilterEntity(map, state, path);
    case 'DonutChart': return new DonutChartEntity(map, state, path);
    case 'Measure': return new MeasureEntity(map, state, path);
    case 'DataSet': return new DataSetEntity(map, state, path);
    case 'Column': return new ColumnEntity(map, state, path);
    case 'BarChart': return new BarChartEntity(map, state, path);
    case 'LineChart': return new LineChartEntity(map, state, path);
    case 'Currency': return new CurrencyEntity(map, state, path);
    case 'UserDefaults': return new UserDefaultsEntity(map, state, path);
    case 'CompanyAccess': return new CompanyAccessEntity(map, state, path);
  }
};

export const Query = (id, state) => new QueryEntity(state.getIn(['Query', id]), state);
export const Explorer = (id, state) => new ExplorerEntity(state.getIn(['Explorer', id]), state);
export const Dimension = (id, state) => new DimensionEntity(state.getIn(['Dimension', id]), state);
export const Fact = (id, state) => new FactEntity(state.getIn(['Fact', id]), state);
export const StringFilter = (id, state) => new StringFilterEntity(state.getIn(['StringFilter', id]), state);
export const NumberFilter = (id, state) => new NumberFilterEntity(state.getIn(['NumberFilter', id]), state);
export const DateTimeFilter = (id, state) => new DateTimeFilterEntity(state.getIn(['DateTimeFilter', id]), state);
export const DonutChart = (id, state) => new DonutChartEntity(state.getIn(['DonutChart', id]), state);
export const Measure = (id, state) => new MeasureEntity(state.getIn(['Measure', id]), state);
export const DataSet = (id, state) => new DataSetEntity(state.getIn(['DataSet', id]), state);
export const Column = (id, state) => new ColumnEntity(state.getIn(['Column', id]), state);
export const BarChart = (id, state) => new BarChartEntity(state.getIn(['BarChart', id]), state);
export const LineChart = (id, state) => new LineChartEntity(state.getIn(['LineChart', id]), state);
export const Currency = (id, state) => new CurrencyEntity(state.getIn(['Currency', id]), state);
export const UserDefaults = (id, state) => new UserDefaultsEntity(state.getIn(['UserDefaults', id]), state);
export const CompanyAccess = (id, state) => new CompanyAccessEntity(state.getIn(['CompanyAccess', id]), state);
