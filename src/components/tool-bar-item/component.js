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
export default class ToolBarItem extends Component {
  // Initialize the component.
  constructor(props) {
    super(props);
  }

  // Expected properties.
  static propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    flex: React.PropTypes.number
  };

  // Render the component.
  render() {
    let {children, className, flex} = this.props;
    let rootStyles = classNames('ToolBarItem', styles.root, className);
    let rootLayoutStyles = flex ? {flex: flex} : null;
    return (
      <div className={rootStyles} style={rootLayoutStyles}>{children}</div>
    );
  }
}
