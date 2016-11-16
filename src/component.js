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
import {setLocationCreator} from './actions';
import ControlledRouter from './components/controlled-router/component';
import App from './app/component';

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
  }

  // Render the component.
  render() {
    let {router, setLocation} = this.props;
    return (
      <ControlledRouter location={router} setLocation={setLocation}>
        <App/>
      </ControlledRouter>
    );
  }
}

/**
 * Map state to component properties.
 */
const stateToProps = (store) => {
  return {
    router: store.get('router').toObject()
  };
};

/**
 * Map actions to component properties.
 */
const dispatchToProps = (dispatch) => {
  return {
    setLocation: (routerState) => dispatch(setLocationCreator(routerState))
  }
};

/**
 * Export the container component.
 */
export default connect(stateToProps, dispatchToProps)(Client);
