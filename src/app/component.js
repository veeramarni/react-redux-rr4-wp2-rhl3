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
import {Match} from 'react-router';

/**
 * Import local dependencies.
 */
import {pingCreator} from './actions';
import {fetchGraphQLQueryCreator} from '../actions';
import Home from './home/component';
import Counter from './counter/component';

import styles from './styles.scss';

/**
 * Create the component.
 */
class App extends Component {
  // Initialize the component.
  constructor(props) {
    super(props);
  }

  // Render the component.
  render() {
    let {ping, isPinging, fetchGraphQLQuery} = this.props;
    return (
      <div className={styles.root}>
        <button onClick={() => ping()}>Ping</button>
        <button onClick={() => fetchGraphQLQuery({query: `{ dataSet { id stuff params { key value } } }`})}>Fetch
        </button>
        <h1>{JSON.stringify(isPinging)}</h1>
        <Match exactly pattern="/" component={Home}/>
        <Match exactly pattern="/counter" component={Counter}/>
      </div>
    );
  }
}
// `{ explorer(id: "0") { id dimensions { key } } }`

/**
 * Map state to component properties.
 */
const stateToProps = (store) => {
  return {
    isPinging: store.getIn(['app', 'isPinging'])
  };
};

/**
 * Map actions to component properties.
 */
const dispatchToProps = (dispatch) => {
  return {
    ping: () => dispatch(pingCreator()),
    fetchGraphQLQuery: (payload) => dispatch(fetchGraphQLQueryCreator(payload))
  }
};

/**
 * Export the container component.
 */
export default connect(stateToProps, dispatchToProps)(App);
