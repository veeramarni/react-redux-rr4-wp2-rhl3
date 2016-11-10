import {Map} from 'immutable';

export class QueryEntity {
  constructor(map, state) {
    this._map = map;
    this._state = state;
  }
  get __typename() { return 'Query'; }
  get explorer() { const val = this._map.get('explorer'); return wrap('Explorer', Map.isMap(val) ? val : this._state.getIn(['Explorer', val.id]), this._state); }
  get chart() { const val = this._map.get('chart'); return Map.isMap(val) ? wrap(val.get('__typename'), val, this._state) : wrap(val.__typename, this._state.getIn([val.__typename, val.id]), this._state); }
  get dataSet() { const val = this._map.get('dataSet'); return wrap('DataSet', Map.isMap(val) ? val : this._state.getIn(['DataSet', val.id]), this._state); }
}

export class ExplorerEntity {
  constructor(map, state) {
    this._map = map;
    this._state = state;
  }
  get __typename() { return 'Explorer'; }
  get id() { return this._map.get('id'); }
  get dimensions() { return this._map.get('dimensions'); }
  get facts() { return this._map.get('facts'); }
  get filters() { return this._map.get('filters'); }
  get chart() { const val = this._map.get('chart'); return Map.isMap(val) ? wrap(val.get('__typename'), val, this._state) : wrap(val.__typename, this._state.getIn([val.__typename, val.id]), this._state); }
  get currencies() { return this._map.get('currencies'); }
  get userDefaults() { const val = this._map.get('userDefaults'); return wrap('UserDefaults', Map.isMap(val) ? val : this._state.getIn(['UserDefaults', val.id]), this._state); }
}

export class DimensionEntity {
  constructor(map, state) {
    this._map = map;
    this._state = state;
  }
  get __typename() { return 'Dimension'; }
  get key() { return this._map.get('key'); }
  get name() { return this._map.get('name'); }
  get type() { return this._map.get('type'); }
}

export class FactEntity {
  constructor(map, state) {
    this._map = map;
    this._state = state;
  }
  get __typename() { return 'Fact'; }
  get key() { return this._map.get('key'); }
  get name() { return this._map.get('name'); }
  get type() { return this._map.get('type'); }
}

export class StringFilterEntity {
  constructor(map, state) {
    this._map = map;
    this._state = state;
  }
  get __typename() { return 'StringFilter'; }
  get key() { return this._map.get('key'); }
  get name() { return this._map.get('name'); }
  get type() { return this._map.get('type'); }
  get like() { return this._map.get('like'); }
}

export class NumberFilterEntity {
  constructor(map, state) {
    this._map = map;
    this._state = state;
  }
  get __typename() { return 'NumberFilter'; }
  get key() { return this._map.get('key'); }
  get name() { return this._map.get('name'); }
  get type() { return this._map.get('type'); }
  get min() { return this._map.get('min'); }
  get max() { return this._map.get('max'); }
  get equals() { return this._map.get('equals'); }
}

export class DateTimeFilterEntity {
  constructor(map, state) {
    this._map = map;
    this._state = state;
  }
  get __typename() { return 'DateTimeFilter'; }
  get key() { return this._map.get('key'); }
  get name() { return this._map.get('name'); }
  get type() { return this._map.get('type'); }
  get start() { return this._map.get('start'); }
  get end() { return this._map.get('end'); }
}

export class DonutChartEntity {
  constructor(map, state) {
    this._map = map;
    this._state = state;
  }
  get __typename() { return 'DonutChart'; }
  get dimension() { const val = this._map.get('dimension'); return wrap('Dimension', Map.isMap(val) ? val : this._state.getIn(['Dimension', val.id]), this._state); }
  get measure() { const val = this._map.get('measure'); return wrap('Measure', Map.isMap(val) ? val : this._state.getIn(['Measure', val.id]), this._state); }
  get dataSet() { const val = this._map.get('dataSet'); return wrap('DataSet', Map.isMap(val) ? val : this._state.getIn(['DataSet', val.id]), this._state); }
}

export class MeasureEntity {
  constructor(map, state) {
    this._map = map;
    this._state = state;
  }
  get __typename() { return 'Measure'; }
  get key() { return this._map.get('key'); }
  get name() { return this._map.get('name'); }
  get type() { return this._map.get('type'); }
  get aggregation() { return this._map.get('aggregation'); }
}

export class DataSetEntity {
  constructor(map, state) {
    this._map = map;
    this._state = state;
  }
  get __typename() { return 'DataSet'; }
  get id() { return this._map.get('id'); }
  get columns() { return this._map.get('columns'); }
  get rows() { return this._map.get('rows'); }
}

export class ColumnEntity {
  constructor(map, state) {
    this._map = map;
    this._state = state;
  }
  get __typename() { return 'Column'; }
  get key() { return this._map.get('key'); }
  get name() { return this._map.get('name'); }
  get type() { return this._map.get('type'); }
}

export class BarChartEntity {
  constructor(map, state) {
    this._map = map;
    this._state = state;
  }
  get __typename() { return 'BarChart'; }
  get dimension() { const val = this._map.get('dimension'); return wrap('Dimension', Map.isMap(val) ? val : this._state.getIn(['Dimension', val.id]), this._state); }
  get measure() { const val = this._map.get('measure'); return wrap('Measure', Map.isMap(val) ? val : this._state.getIn(['Measure', val.id]), this._state); }
  get dataSet() { const val = this._map.get('dataSet'); return wrap('DataSet', Map.isMap(val) ? val : this._state.getIn(['DataSet', val.id]), this._state); }
}

export class LineChartEntity {
  constructor(map, state) {
    this._map = map;
    this._state = state;
  }
  get __typename() { return 'LineChart'; }
  get group() { const val = this._map.get('group'); return wrap('Dimension', Map.isMap(val) ? val : this._state.getIn(['Dimension', val.id]), this._state); }
  get series() { const val = this._map.get('series'); return wrap('Dimension', Map.isMap(val) ? val : this._state.getIn(['Dimension', val.id]), this._state); }
  get measure() { const val = this._map.get('measure'); return wrap('Measure', Map.isMap(val) ? val : this._state.getIn(['Measure', val.id]), this._state); }
  get dataSet() { const val = this._map.get('dataSet'); return wrap('DataSet', Map.isMap(val) ? val : this._state.getIn(['DataSet', val.id]), this._state); }
}

export class CurrencyEntity {
  constructor(map, state) {
    this._map = map;
    this._state = state;
  }
  get __typename() { return 'Currency'; }
  get key() { return this._map.get('key'); }
  get name() { return this._map.get('name'); }
}

export class UserDefaultsEntity {
  constructor(map, state) {
    this._map = map;
    this._state = state;
  }
  get __typename() { return 'UserDefaults'; }
  get companyId() { return this._map.get('companyId'); }
  get currencyId() { return this._map.get('currencyId'); }
  get currencyCode() { return this._map.get('currencyCode'); }
  get startDate() { return this._map.get('startDate'); }
  get endDate() { return this._map.get('endDate'); }
  get companyAccess() { return this._map.get('companyAccess'); }
}

export class CompanyAccessEntity {
  constructor(map, state) {
    this._map = map;
    this._state = state;
  }
  get __typename() { return 'CompanyAccess'; }
  get id() { return this._map.get('id'); }
  get name() { return this._map.get('name'); }
}

const wrap = (type, map, state) => {
  switch(type){
    case 'Query': return new QueryEntity(map, state);
    case 'Explorer': return new ExplorerEntity(map, state);
    case 'Dimension': return new DimensionEntity(map, state);
    case 'Fact': return new FactEntity(map, state);
    case 'StringFilter': return new StringFilterEntity(map, state);
    case 'NumberFilter': return new NumberFilterEntity(map, state);
    case 'DateTimeFilter': return new DateTimeFilterEntity(map, state);
    case 'DonutChart': return new DonutChartEntity(map, state);
    case 'Measure': return new MeasureEntity(map, state);
    case 'DataSet': return new DataSetEntity(map, state);
    case 'Column': return new ColumnEntity(map, state);
    case 'BarChart': return new BarChartEntity(map, state);
    case 'LineChart': return new LineChartEntity(map, state);
    case 'Currency': return new CurrencyEntity(map, state);
    case 'UserDefaults': return new UserDefaultsEntity(map, state);
    case 'CompanyAccess': return new CompanyAccessEntity(map, state);
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
