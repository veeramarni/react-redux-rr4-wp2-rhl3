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
    this.state = {};
  }

  // Expected properties.
  static propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    id: React.PropTypes.string,
    onClick: React.PropTypes.func,
    suppressDisabledStyle: React.PropTypes.bool,
    styleFlat: React.PropTypes.bool,
    styleForm: React.PropTypes.bool,
    styleLink: React.PropTypes.bool,
    stylePrimary: React.PropTypes.bool,
    styleRaised: React.PropTypes.bool,
    styleSecondary: React.PropTypes.bool,
    styleInverse: React.PropTypes.bool,
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
    let {children, className, disabled, id, onClick, suppressDisabledStyle, styleFlat, styleForm, styleLink, stylePrimary, styleRaised, styleSecondary, styleInverse} = this.props;
    let rootStyles = classNames('Button', styles.root, className, {
      [`${styles.disabled}`]: disabled && !suppressDisabledStyle,
      [`${styles.flat}`]: styleFlat,
      [`${styles.form}`]: styleForm,
      [`${styles.primary}`]: stylePrimary,
      [`${styles.link}`]: styleLink,
      [`${styles.raised}`]: styleRaised || !styleFlat,
      [`${styles.secondary}`]: styleSecondary || (!stylePrimary && !styleLink),
      [`${styles.inverse}`]: styleInverse,
    });
    return (
      <button className={rootStyles} disabled={disabled} id={id} onClick={onClick}>{children}</button>
    );
  }
}
