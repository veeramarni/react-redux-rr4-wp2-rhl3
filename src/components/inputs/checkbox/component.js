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
    checked: React.PropTypes.bool,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    id: React.PropTypes.string,
    indeterminate: React.PropTypes.bool,
    inputId: React.PropTypes.string,
    invalid: React.PropTypes.bool,
    label: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element]),
    name: React.PropTypes.string,
    onChange: React.PropTypes.func,
    onClick: React.PropTypes.func,
    onFocusChanged: React.PropTypes.func,
    valid: React.PropTypes.bool
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

  // Invoked once, only on the client (not on the server), immediately after the initial rendering occurs.
  // At this point in the lifecycle, you can access any refs to your children
  // (e.g., to access the underlying DOM representation).
  // The componentDidMount() method of child components is invoked before that of parent components.
  // If you want to integrate with other JavaScript frameworks, set timers using setTimeout or setInterval,
  // or send AJAX requests, perform those operations in this method.
  componentDidMount() {
    document.getElementById(this.state.inputId).indeterminate = this.props.indeterminate;
  }

  // Invoked when a component is receiving new props. This method is not called for the initial render.
  // Use this as an opportunity to react to a prop transition before render() is called
  // by updating the state using this.setState(). The old props can be accessed via this.props.
  // Calling this.setState() within this function will not trigger an additional render.
  componentWillReceiveProps(nextProps) {
    document.getElementById(this.state.inputId).indeterminate = nextProps.indeterminate;
  }

  handleInputMouseDown = event => {
    event.preventDefault();
    event.stopPropagation();
    let inputElement = document.getElementById(this.state.inputId);
    if (document.activeElement !== inputElement) {
      this.mouseDown = true;
      inputElement.focus();
    }
    if (this.props.onClick) {
      this.props.onClick();
    }
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
    let {checked, className, disabled, id, indeterminate, invalid, name, label, onChange, value, valid} = this.props;
    let {inputId, focused} = this.state;
    let rootStyles = classNames('Checkbox', styles.root, className, {
      [`${styles.disabled}`]: disabled,
      [`${styles.focused}`]: focused,
      [`${styles.invalid}`]: invalid,
      [`${styles.valid}`]: valid
    });
    let iconClassName = checked ? 'icon-checkmark' : indeterminate ? 'icon-minus' : '';
    console.log(checked, indeterminate);
    return (
      <label className={rootStyles} htmlFor={inputId} id={id} onMouseDown={this.handleInputMouseDown}>
        <input checked={checked}
               className={styles.input}
               disabled={disabled}
               id={inputId}
               name={name}
               onChange={onChange}
               onFocus={e => this.handleFocusChange(e, true)}
               onBlur={e => this.handleFocusChange(e, false)}
               value={value}
               type="checkbox"/>
        <i className={iconClassName}/>
        {(() => {
          if (label) {
            return (<span>{label}</span>);
          }
        })()}
      </label>
    );
  }
}
