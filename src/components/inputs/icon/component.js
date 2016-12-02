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
export default class Icon extends Component {
  // Initialize the component.
  constructor(props) {
    super(props);
  }

  // Expected properties.
  static propTypes = {
    className: React.PropTypes.string,
    iconClassName: React.PropTypes.string.isRequired,
    id: React.PropTypes.string,
    onClick: React.PropTypes.func
  };

  // Render the component.
  render() {
    let {className, iconClassName, id, onClick} = this.props;
    let rootStyles = classNames('Icon', styles.root, className);
    return (
      <div className={rootStyles}>
        <i className={iconClassName} id={id} onClick={onClick}/>
      </div>
    );
  }
}
