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
import React, {Component} from 'react';
import {connect} from 'react-redux';
import { createSelector } from 'reselect';
import Immutable from 'immutable';

/**
 * Import local dependencies.
 */
import {nextStepCreator, prevStepCreator} from './actions';
import {setLocationCreator} from '../../actions';
import {entities} from '../../graphql/types.generated';

/**
 * Create the component.
 */
class Counter extends Component {
  // Initialize the component.
  constructor(props) {
    super(props);
  }

  // Render the component.
  render() {
    let {counter, explorer, dispatch} = this.props;
    return (
      <div>
        <h1>Counter</h1>
        {/*<pre>-{JSON.stringify(explorer.toJS())}-</pre>*/}
        {/*<ul>*/}
          {/*{dimensions.map(dimension => <li key={dimension.get('key')}>{dimension.get('key')}</li>)}*/}
        {/*</ul>*/}
        {counter}
        <hr />

        <button onClick={() => dispatch(nextStepCreator())}>next</button>
        <button onClick={() => dispatch(prevStepCreator())}>prev</button>
        <hr />

        <a href="javascript:;" onClick={() => dispatch(setLocationCreator({
          pathname: '/'
        }))}>
          Link back home using a Redux action
        </a>
      </div>
    );
  }
}

/**
 * Map state to component properties.
 */
const stateToProps = (state) => {
  return {
    counter: state.get('counter'),
    explorer: test(state)//getSelectedDimensions(state, '0')//state.hasIn(['entities', 'Explorer', '0']) ? state.getIn(['entities', 'Explorer', '0']) : Immutable.Map()
  };
};

const test = (state) => {
  console.log('WOW', entities(state).Explorer('0').chart.dataSet.__value('nothing').toJS());
  //debugger;
  //var path = Explorer('0', state.get('entities')).chart;//.dataSet.columns.__path;
  return Immutable.Map();
}
// const getDimensions = (state, explorerId) => {
//   console.log(Explorer('0', state.get('entities')));
//   return Immutable.Map();// state.hasIn(['entities', 'Explorer', explorerId, 'dimensions']) ? state.getIn(['entities', 'Explorer', explorerId, 'dimensions']) : Immutable.List();
// };
// const getSelectedDimensionIds = (state, explorerId) => Immutable.List(['transaction_date', 'merchant_category']);
// const getSelectedDimensions = createSelector([getDimensions, getSelectedDimensionIds],(dimensions, selectedDimensionIds) => {
//   return dimensions;
//   // console.log(dimensions.toJS(), selectedDimensionIds.toJS());
//   // return dimensions.filter(x => selectedDimensionIds.includes(x.key));
// });

/**
 * Export the container component.
 */
export default connect(stateToProps)(Counter);
