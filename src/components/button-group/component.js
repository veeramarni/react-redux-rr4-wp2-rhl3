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
export default class ButtonGroup extends Component {
  // Initialize the component.
  constructor(props) {
    super(props);
  }

  // Expected properties.
  static propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    styleForm: React.PropTypes.bool
  };

  // Render the component.
  render() {
    let {children, className, styleForm} = this.props;
    let rootStyles = classNames('ButtonGroup', styles.root, className, {[`${styles.form}`]: styleForm});
    return (
      <div className={rootStyles}>{children}</div>
    );
  }
}
