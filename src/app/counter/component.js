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
import Immutable from 'immutable';

/**
 * Import local dependencies.
 */
import {nextStepCreator, prevStepCreator} from './actions';
import {setLocationCreator} from '../../actions';

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
        <pre>-{JSON.stringify(explorer.toJS())}-</pre>
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
  console.log('XXXXXXXY', state.toJS());
  return {
    counter: state.get('counter'),
    explorer: state.hasIn(['entities', 'Explorer', '0']) ? state.getIn(['entities', 'Explorer', '0']) : Immutable.Map()
  };
};

/**
 * Export the container component.
 */
export default connect(stateToProps)(Counter);
