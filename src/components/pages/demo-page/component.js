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
import classNames from 'classnames';

/**
 * Import local dependencies.
 */
import {pingCreator} from './actions';
import InputBox from '../../inputs/input-box/component';
import SimpleSelectBox from '../../inputs/simple-select-box/component';
import Button from '../../inputs/button/component';
import AddOnButton from '../../inputs/add-on-button/component';
import ButtonGroup from '../../inputs/button-group/component';

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
      popoverTargetId: '' + new Date().getTime() + Math.random(),
      inputs: {
        firstName: {
          id: null,
          invalid: false,
          disabled: false,
          label: 'Vorname',
          leftAddOns: [<i className="icon-user"/>],
          placeholder: 'Type "Bumm" to validate!',
          valid: false,
          value: '',
          readOnly: false,
          rightAddOns: [<AddOnButton><i className="icon-user-plus"/></AddOnButton>, <i className="icon-user-minus"/>],
          type: 'text',
        },
        middleName: {
          id: null,
          invalid: false,
          disabled: true,
          label: 'Mittelnamen',
          leftAddOns: [<i className="icon-user-tie"/>],
          placeholder: 'Please be honest!',
          valid: false,
          value: 'Horst Walter',
          readOnly: false,
          rightAddOns: [],
          type: 'text',
        },
        nickName: {
          id: null,
          invalid: false,
          disabled: false,
          label: 'Spitzname',
          leftAddOns: [],
          placeholder: 'Please be honest!',
          valid: false,
          value: 'Horst Walter',
          readOnly: true,
          rightAddOns: [<i className="icon-user-check"/>],
          type: 'text',
        },
        lastName: {
          id: null,
          invalid: false,
          disabled: false,
          label: (
            <div>
              <span>Lastname</span>
              &nbsp;
              <i style={{color: 'red'}} className="icon-bubble"/>
              &nbsp;
              <span>What the</span>
              &nbsp;
              <i style={{color: 'green'}} className="icon-users"/>
            </div>
          ),
          valid: false,
          value: 'Windlhammelsbach',
          readOnly: false,
          type: 'text',
        },
        country: {
          options: ['Germany', 'France', 'New Zealand'],
          value: null
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

  handleSelectionChange = (selection) => {
    this.setState({inputs: {...this.state.inputs, country: {...this.state.inputs.country, value: selection}}});
  };

  // Render the component.
  render() {
    let {ping, isPinging} = this.props;
    let {inputs} = this.state;
    let {firstName, middleName, nickName, lastName} = inputs;
    return (
      <div className={styles.root}>
        <button onClick={() => ping()}>Ping</button>
        <h1>{JSON.stringify(isPinging)}</h1>
        <InputBox name="firstName" onChange={this.handleInputChange} {...firstName} type="text"/>
        &nbsp;
        <ButtonGroup>
          <Button onClick={() => ping()}>Ping</Button>
          <Button>Blob</Button>
          <Button>Blub</Button>
        </ButtonGroup>
        <br/>
        <br/>
        <InputBox name="middleName" onChange={this.handleInputChange} {...middleName} type="text"/>
        <br/>
        <br/>
        <InputBox name="nickName" onChange={this.handleInputChange} {...nickName} type="text"/>
        <br/>
        <br/>
        <InputBox name="lastName" onChange={this.handleInputChange} {...lastName} type="text"/>
        <br/>
        <br/>
        <SimpleSelectBox name="country" options={inputs.country.options} value={inputs.country.value}
                         onSelect={this.handleSelectionChange}/>
        <br/>
        <br/>
        <select>
          <option>A Option</option>
          <option>Another Option</option>
          <option>B Option</option>
        </select>
        <br/>
        <br/>
        <button>Bla</button>
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
