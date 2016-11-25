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
export default class InputBox extends Component {
  // Initialize the component.
  constructor(props) {
    super(props);
    // Initialize the local component state.
    this.state = {
      // Generate a random id for the input field.
      inputId: new Date().getTime() + Math.random(),
      // Indicate if the input is focused.
      focused: false
    }
  }

  // Expected properties.
  static propTypes = {
    id: React.PropTypes.string,
    inputId: React.PropTypes.string,
    invalid: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    label: React.PropTypes.string,
    leftIcons: React.PropTypes.array,
    name: React.PropTypes.string,
    onChange: React.PropTypes.func,
    onFocusChanged: React.PropTypes.func,
    placeholder: React.PropTypes.string,
    valid: React.PropTypes.bool,
    value: React.PropTypes.string.isRequired,
    readOnly: React.PropTypes.bool,
    rightIcons: React.PropTypes.array,
    type: React.PropTypes.string.isRequired
  };

  // Invoked once, both on the client and server, immediately before the initial rendering occurs.
  // If you call setState within this method,
  // render() will see the updated state and will be executed only once despite the state change.
  componentWillMount() {
    // Set the id for the input field if given.
    if (this.props.inputId) {
      this.setState({inputId: this.props.inputId});
    }
  }

  handleFocusChange = (focused) => {
    this.setState({focused: focused});
    if (this.props.onFocusChanged) {
      this.props.onFocusChanged(focused);
    }
  };

  handleIconClick = (icon) => {
    if (icon.onClick) {
      icon.onClick(icon);
    }
  };

  // Render the component.
  render() {
    let {invalid, disabled, id, name, label, leftIcons = [], onChange, placeholder, value, valid, readOnly, rightIcons = [], type} = this.props;
    let {inputId, focused} = this.state;
    let rootStyles = classNames(styles.root, {
      [`${styles.disabled}`]: disabled,
      [`${styles.readonly}`]: readOnly,
      [`${styles.focused}`]: focused,
      [`${styles.invalid}`]: invalid,
      [`${styles.valid}`]: valid
    });
    let inputStyles = classNames({[`${styles.float}`]: value && value.length});
    return (
      <table className={rootStyles} id={id}>
        <tbody>
        <tr>
          {leftIcons.map((icon, i) => <td key={i} className={styles.left}><i className={icon.className}
                                                                             onClick={() => this.handleIconClick(icon)}/>
          </td>)}
          <td className={styles.center}>
            <div>
              <input className={inputStyles} disabled={disabled} id={inputId} name={name} onChange={onChange}
                     onFocus={() => this.handleFocusChange(true)} onBlur={() => this.handleFocusChange(false)}
                     value={value} readOnly={readOnly} type={type} placeholder={placeholder}/>
              {(() => {
                if (label) return (<label htmlFor={inputId}>{label}</label>);
              })()}
            </div>
          </td>
          {rightIcons.map((icon, i) => <td key={i} className={styles.right}><i className={icon.className}
                                                                               onClick={() => this.handleIconClick(icon)}/>
          </td>)}
        </tr>
        </tbody>
      </table>
    );
  }
}
