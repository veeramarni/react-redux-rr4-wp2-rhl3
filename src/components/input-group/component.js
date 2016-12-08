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
import ReactDOM from 'react-dom';
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
export default class InputGroup extends Component {
  // Initialize the component.
  constructor(props) {
    super(props);
    // Initialize the local component state.
    this.state = {
      // Indicate if the input is focused.
      focused: false
    };
  }

  // Expected properties.
  static propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    id: React.PropTypes.string,
    invalid: React.PropTypes.bool,
    valid: React.PropTypes.bool,
    readOnly: React.PropTypes.bool,
    suppressReadOnlyStyle: React.PropTypes.bool
  };

  handleFocus = (e) => {
    this.setState({focused: true});
  };

  handleBlur = (e) => {
    this.setState({focused: false});
  };

  // Render the component.
  render() {
    let {} = this.props;
    let {children, className, disabled, invalid, id, valid, readOnly, suppressReadOnlyStyle} = this.props;
    let {focused} = this.state;
    let rootStyles = classNames(styles.root, className, {
      [`${styles.disabled}`]: disabled,
      [`${styles.readonly}`]: readOnly && !suppressReadOnlyStyle,
      [`${styles.focused}`]: focused,
      [`${styles.invalid}`]: invalid,
      [`${styles.valid}`]: valid
    });
    return (
      <div id={id} className={rootStyles} onFocus={this.handleFocus} onBlur={this.handleBlur}>{children}</div>
    );
  }
}
