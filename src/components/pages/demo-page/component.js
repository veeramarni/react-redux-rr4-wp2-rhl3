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
import Popover from '../../popover/component';

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
      popoverOpen: false,
      popoverTargetId: 'xxxxx',// + new Date().getTime() + Math.random(),
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

  handleInputChange = (event) => {
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
  };

  togglePopover = () => {
    this.setState({popoverOpen: !this.state.popoverOpen});
  };

  // Render the component.
  render() {
    let {ping, isPinging} = this.props;
    let {inputs} = this.state;
    let {firstName, middleName, lastName} = inputs;
    return (
      <div className={styles.root}>
        <button onClick={() => ping()}>Ping</button>
        <h1 onClick={this.togglePopover}>{JSON.stringify(isPinging)}++{JSON.stringify(this.state.popoverOpen)}</h1>
        <InputBox name="firstName" onChange={this.handleInputChange} {...firstName} type="text"/>
        <br/>
        <InputBox name="middleName" onChange={this.handleInputChange} {...middleName} type="text"/>
        <br/>
        <InputBox name="lastName" onChange={this.handleInputChange} {...lastName} type="text"
                  id={this.state.popoverTargetId}/>
        <br/>
        <Popover show={this.state.popoverOpen}
                 target={this.state.popoverTargetId}
                 toggle={this.togglePopover}
                 attachment='top center'
                 reposition={true}
                 withTriangle={true}
                 options={{
                   targetAttachment: 'bottom center',
                   offset: '-10px 0'
                 }}>
          <span style={{backgroundColor: "white", border: "1px solid black"}}>Bla Bla Bla</span>
        </Popover>
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
