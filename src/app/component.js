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
import Home from './home';
import Counter from './counter';

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
    return (
      <div className={styles.root}>
        <button onClick={() => this.props.ping()}>Helloo</button>
        <h1>{JSON.stringify(this.props.app.isPinging)}</h1>
        <Match exactly pattern="/" component={Home}/>
        <Match exactly pattern="/counter" component={Counter}/>
      </div>
    );
  }
}

/**
 * Map state to component properties.
 */
const stateToProps = ({app}) => {
  return {app};
};

/**
 * Map actions to component properties.
 */
const dispatchToProps = (dispatch) => {
  return {
    ping: () => dispatch(pingCreator())
  }
};

/**
 * Export the container component.
 */
export default connect(stateToProps, dispatchToProps)(App);
