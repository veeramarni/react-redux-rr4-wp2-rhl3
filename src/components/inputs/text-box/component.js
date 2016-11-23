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
      id: new Date().getTime() + Math.random(),
      // Indicate if the input is focused.
      active: false
    }
  }

  // Expected properties.
  static propTypes = {
    id: React.PropTypes.string,
    invalid: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    leftIcons: React.PropTypes.array,
    name: React.PropTypes.string,
    onChange: React.PropTypes.func,
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
    if (this.props.id) {
      this.setState({id: this.props.id});
    }
  }

  // Render the component.
  render() {
    let {invalid, disabled, name, leftIcons = [], onChange, placeholder, value, valid, readOnly, rightIcons = [], type} = this.props;
    let {id, active} = this.state;
    let rootStyles = classNames(styles.root, {[`${styles.active}`]: active, [`${styles.invalid}`]: invalid, [`${styles.valid}`]: valid});
    let inputStyles = classNames({[`${styles.float}`]: value && value.length});
    console.log(JSON.stringify(styles, null, 2));
    return (
      <table className={rootStyles}>
        <tbody>
        <tr>
          {leftIcons.map((icon, i) => <td key={i} className={styles.left}><i className={icon.className}/></td>)}
          <td className={styles.center}>
            <div>
              <input className={inputStyles} disabled={disabled} id={id} name={name} onChange={onChange}
                     onFocus={() => this.setState({active: true})} onBlur={() => this.setState({active: false})}
                     value={value} readOnly={readOnly} type={type} placeholder="blablabla"/>
              {(() => {
                if (placeholder) return (<label htmlFor={id}>{placeholder}</label>);
              })()}
            </div>
          </td>
          {rightIcons.map((icon, i) => <td key={i} className={styles.right}><i className={icon.className}/></td>)}
        </tr>
        </tbody>
      </table>
    );
  }
}
