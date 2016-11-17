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
import TextBox from '../../inputs/text-box/component';

/**
 * Import styles.
 */
import styles from './styles.scss';

/**
 * Map state to component properties.
 */
const stateToProps = (store) => {
  return {
    isPinging: store.getIn(['demoPage', 'isPinging'])
  };
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
export default connect(stateToProps, dispatchToProps)(
  class extends Component {
    // Initialize the component.
    constructor(props) {
      super(props);
    }

    // Render the component.
    render() {
      let {ping, isPinging} = this.props;
      return (
        <div className={styles.root}>
          <button onClick={() => ping()}>Ping</button>
          <h1>{JSON.stringify(isPinging)}</h1>
          <TextBox></TextBox>
          {/*<span className="icon-bubble2"></span>*/}
          <h1>bla</h1>
        </div>
      );
    }
  }
);
