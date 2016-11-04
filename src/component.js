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

/**
 * Import local dependencies.
 */
import {initializeClientCreator, setLocationCreator} from './actions';
import ControlledRouter from './components/controlled-router';
import App from './app';

/**
 * Import the icomoon icon font.
 */
import '../public/assets/fonts/icomoon/style.css';

/**
 * Create the component.
 */
class Client extends Component {
  // Initialize the component.
  constructor(props) {
    super(props);
    // Initialize the client.
    this.props.initializeClient();
  }

  // Render the component.
  render() {
    let {router, isSchemaLoaded, setLocation} = this.props;
    if (isSchemaLoaded === true) {
      return (
        <ControlledRouter location={router} setLocation={setLocation}>
          <App/>
        </ControlledRouter>
      );
    } else {
      return (
        <h1>LOADING SCHEMA</h1>
      )
    }
  }
}

/**
 * Map state to component properties.
 */
const stateToProps = (store) => {
  return {
    router: store.get('router').toObject(),
    isSchemaLoaded: store.getIn(['client', 'isSchemaLoaded'])
  };
};

/**
 * Map actions to component properties.
 */
const dispatchToProps = (dispatch) => {
  return {
    initializeClient: () => dispatch(initializeClientCreator()),
    setLocation: (routerState) => dispatch(setLocationCreator(routerState))
  }
};

/**
 * Export the container component.
 */
export default connect(stateToProps, dispatchToProps)(Client);
