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
export default class TextBox extends Component {
  // Initialize the component.
  constructor(props) {
    super(props);
    // Initialize the local component state.
    this.state = {
      // Generate a random id for the input field.
      id: new Date().getTime() + Math.random()
    }
  }

  // Expected properties.
  static propTypes = {
    id: React.PropTypes.string,
    invalid: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    name: React.PropTypes.string,
    onChange: React.PropTypes.func,
    placeholder: React.PropTypes.string,
    valid: React.PropTypes.bool,
    value: React.PropTypes.string.isRequired,
    readOnly: React.PropTypes.bool,
    type: React.PropTypes.string.isRequired
  };

  // Invoked once, both on the client and server, immediately before the initial rendering occurs.
  // If you call setState within this method,
  // render() will see the updated state and will be executed only once despite the state change.
  componentWillMount() {
    // Set the id for the input field if given.
    if (this.props.id) {
      this.setState({id: this.props.id});
    }
  }

  // Render the component.
  render() {
    let {invalid, disabled, name, onChange, placeholder, value, valid, readOnly, type} = this.props;
    let {id} = this.state;
    let rootStyles = classNames(styles.root, {[`${styles.invalid}`]: invalid, [`${styles.valid}`]: valid});
    let inputStyles = classNames({[`${styles.canFloat}`]: placeholder, [`${styles.float}`]: value && value.length});
    return (
      <div className={rootStyles}>
        <input className={inputStyles} disabled={disabled} id={id} name={name} onChange={onChange} value={value}
               readOnly={readOnly} type={type}/>
        {(() => {
          if (placeholder) return (<label htmlFor={id}>{placeholder}</label>);
        })()}
        <i className="icon-bubble2"/>
      </div>
    );
  }
}
