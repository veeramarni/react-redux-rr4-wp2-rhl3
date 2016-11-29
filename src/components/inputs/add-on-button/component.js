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
import classNames from 'classnames';

/**
 * Import local dependencies.
 */

/**
 * Import styles.
 */
import styles from './styles.scss';

/**
 * Export the component.
 */
export default class Button extends Component {
  // Initialize the component.
  constructor(props) {
    super(props);
    // Initialize the local component state.
    this.state = {
    };
  }

  // Expected properties.
  static propTypes = {
    children: React.PropTypes.node,
    onClick: React.PropTypes.func
  };

  // Invoked once, both on the client and server, immediately before the initial rendering occurs.
  // If you call setState within this method,
  // render() will see the updated state and will be executed only once despite the state change.
  componentWillMount() {
  }

  // Invoked when a component is receiving new props. This method is not called for the initial render.
  // Use this as an opportunity to react to a prop transition before render() is called
  // by updating the state using this.setState(). The old props can be accessed via this.props.
  // Calling this.setState() within this function will not trigger an additional render.
  componentWillReceiveProps(nextProps) {
  }

  // Render the component.
  render() {
    let {children} = this.props;
    let {input, popover} = this.state;
    return (
      <button className={styles.root} onClick={this.props.onClick}>{children}</button>
    );
  }
}
