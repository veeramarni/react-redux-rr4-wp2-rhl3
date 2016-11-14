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
import {combineReducers} from 'redux-immutable';

/**
 * Import local dependencies.
 */
import {explorerReducer} from './explorerReducer';
import {dimensionReducer} from './dimensionReducer';
import {factReducer} from './factReducer';
import {stringFilterReducer} from './stringFilterReducer';
import {numberFilterReducer} from './numberFilterReducer';
import {dateTimeFilterReducer} from './dateTimeFilterReducer';
import {donutChartReducer} from './donutChartReducer';
import {measureReducer} from './measureReducer';
import {dataSetReducer} from './dataSetReducer';
import {columnReducer} from './columnReducer';
import {barChartReducer} from './barChartReducer';
import {lineChartReducer} from './lineChartReducer';
import {currencyReducer} from './currencyReducer';
import {userDefaultsReducer} from './userDefaultsReducer';
import {companyAccessReducer} from './companyAccessReducer';


/**
 * Export the application store.
 */
export const entitiesReducer = combineReducers({
  Explorer: explorerReducer,
  Dimension: dimensionReducer,
  Fact: factReducer,
  StringFilter: stringFilterReducer,
  NumberFilter: numberFilterReducer,
  DateTimeFilter: dateTimeFilterReducer,
  DonutChart: donutChartReducer,
  Measure: measureReducer,
  DataSet: dataSetReducer,
  Column: columnReducer,
  BarChart: barChartReducer,
  LineChart: lineChartReducer,
  Currency: currencyReducer,
  UserDefaults: userDefaultsReducer,
  CompanyAccess: companyAccessReducer
});
