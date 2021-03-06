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
export default class Input extends Component {
  // Initialize the component.
  constructor(props) {
    super(props);
    // Initialize the local component state.
    this.state = {
      // Generate a random id for the input field.
      inputId: new Date().getTime() + Math.random(),
      // Indicate if the input is focused.
      focused: false
    };
    // Initialize internal state.
    this.mouseDown = false;
  }

  // Expected properties.
  static propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    id: React.PropTypes.string,
    inputId: React.PropTypes.string,
    invalid: React.PropTypes.bool,
    label: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element]),
    name: React.PropTypes.string,
    onChange: React.PropTypes.func,
    onClick: React.PropTypes.func,
    onFocusChanged: React.PropTypes.func,
    onKeyDown: React.PropTypes.func,
    placeholder: React.PropTypes.string,
    valid: React.PropTypes.bool,
    value: React.PropTypes.string.isRequired,
    readOnly: React.PropTypes.bool,
    suppressReadOnlyStyle: React.PropTypes.bool,
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

  handleInputMouseDown = event => {
    // event.preventDefault();
    // event.stopPropagation();
    let inputElement = document.getElementById(this.state.inputId);
    if (document.activeElement !== inputElement) {
      this.mouseDown = true;
      setTimeout(() => inputElement.focus(), 0);
    } else {
      event.preventDefault();
      event.stopPropagation();
    }
    // if (this.props.onClick) {
    //   this.props.onClick();
    // }
  };

  handleFocusChange = (event, focused) => {
    let clicked = this.mouseDown;
    this.mouseDown = false;
    this.setState({focused: focused});
    if (this.props.onFocusChanged) {
      this.props.onFocusChanged(event, focused, clicked);
    }
  };

  // Render the component.
  render() {
    let {className, disabled, invalid, id, name, label, onChange, onKeyDown, placeholder, value, valid, readOnly, suppressReadOnlyStyle, type} = this.props;
    let {inputId, focused} = this.state;
    let rootStyles = classNames('Input', styles.root, className, {
      [`${styles.disabled}`]: disabled,
      [`${styles.readonly}`]: readOnly && !suppressReadOnlyStyle,
      [`${styles.focused}`]: focused,
      [`${styles.invalid}`]: invalid,
      [`${styles.valid}`]: valid
    });
    let inputStyles = classNames({[`${styles.float}`]: value && value.length});
    return (
      <div className={rootStyles} id={id} onMouseDown={this.handleInputMouseDown}>
        <input className={inputStyles}
               disabled={disabled}
               id={inputId}
               name={name}
               onChange={onChange}
               onKeyDown={onKeyDown}
               onFocus={e => this.handleFocusChange(e, true)}
               onBlur={e => this.handleFocusChange(e, false)}
               value={value}
               readOnly={readOnly}
               type={type}
               placeholder={placeholder}/>
        {(() => {
          if (label) {
            return (<label id={`${inputId}-label`}>{label}</label>);
          }
        })()}
      </div>
    );
  }
}
