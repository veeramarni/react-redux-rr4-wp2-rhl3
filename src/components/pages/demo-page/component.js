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
import {connect} from 'react-redux';
import {Match} from 'react-router';

/**
 * Import local dependencies.
 */
import {pingCreator} from './actions';
import InputBox from '../../inputs/input-box/component';

/**
 * Import styles.
 */
import styles from './styles.scss';

/**
 * Create the component.
 */
class DemoPage extends Component {
  // Initialize the component.
  constructor(props) {
    super(props);
    // Initialize the local component state. TODO: better use redux!
    this.state = {
      inputs: {
        firstName: {
          id: null,
          invalid: false,
          disabled: false,
          label: 'Vorname',
          leftIcons: [{
            className: 'icon-user'
          }],
          placeholder: 'Please be honest!',
          valid: false,
          value: '',
          readOnly: false,
          rightIcons: [{
            className: 'icon-user-plus'
          }, {
            className: 'icon-user-minus'
          }],
          type: 'text',
        },
        middleName: {
          id: null,
          invalid: false,
          disabled: true,
          label: 'Mittelnamen',
          leftIcons: [{
            className: 'icon-user-tie'
          }],
          placeholder: 'Please be honest!',
          valid: false,
          value: 'Horst Walter',
          readOnly: false,
          rightIcons: [],
          type: 'text',
        },
        lastName: {
          id: null,
          invalid: false,
          disabled: false,
          label: 'Nachname',
          valid: false,
          value: 'Windlhammelsbach',
          readOnly: false,
          type: 'text',
        }
      }
    }
  }

  handleInputChange(event) {
    console.log(event.target.value); // TODO use object assign!
    let input = this.state.inputs[event.target.name];
    switch (event.target.name) {
      case 'firstName':
      case 'lastName':
        input = {
          ...input,
          value: event.target.value,
          valid: event.target.value === 'Bumm',
          invalid: event.target.value !== 'Bumm'
        };
        this.setState({inputs: {...this.state.inputs, [`${event.target.name}`]: {...input}}});
        break;
    }
  }

  // Render the component.
  render() {
    let {ping, isPinging} = this.props;
    let {inputs} = this.state;
    let {firstName, middleName, lastName} = inputs;
    return (
      <div className={styles.root}>
        <button onClick={() => ping()}>Ping</button>
        <h1>{JSON.stringify(isPinging)}</h1>
        <InputBox name="firstName" onChange={(e) => this.handleInputChange(e)} {...firstName} type="text"/>
        <br/>
        <InputBox name="middleName" onChange={(e) => this.handleInputChange(e)} {...middleName} type="text"/>
        <br/>
        <InputBox name="lastName" onChange={(e) => this.handleInputChange(e)} {...lastName} type="text"/>
      </div>
    );
  }
}

/**
 * Map state to component properties.
 */
const stateToProps = (store) => {
  return {
    isPinging: store.getIn(['demoPage', 'isPinging'])
  };
};

/**
 * Map actions to component properties.
 */
const dispatchToProps = (dispatch) => {
  return {
    ping: () => dispatch(pingCreator())
  }
};

/**
 * Export the container component.
 */
export default connect(stateToProps, dispatchToProps)(DemoPage);
