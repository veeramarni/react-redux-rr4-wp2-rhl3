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
import Button from '../../components/button/component';
import ButtonGroup from '../../components/button-group/component';
import {big as btnBig, primary as btnPrimary, flat as btnFlat, link as btnLink} from '../../components/button/styles.scss';
import Checkbox from '../../components/checkbox/component';
import Icon from '../../components/icon/component';
import Input from '../../components/input/component';
import InputGroup from '../../components/input-group/component';
import SimpleDropDownList from '../../components/simple-drop-down-list/component';
import ToolBar from '../../components/tool-bar/component';
import ToolBarItem from '../../components/tool-bar-item/component';

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
          inputId: 'firstName',
          invalid: false,
          disabled: false,
          label: 'Vorname',
          placeholder: 'Type "Bumm" to validate!',
          valid: false,
          value: '',
          readOnly: false,
          type: 'text',
        },
        middleName: {
          id: null,
          invalid: false,
          disabled: true,
          label: 'Mittelnamen',
          placeholder: 'Please be honest!',
          valid: false,
          value: 'Horst Walter',
          readOnly: false,
          type: 'text',
        },
        nickName: {
          id: null,
          invalid: false,
          disabled: false,
          label: 'Spitzname',
          placeholder: 'Please be honest!',
          valid: false,
          value: 'Horst Walter',
          readOnly: true,
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
        city: {
          inputId: 'city',
          label: 'City',
          options: ['Bremen', 'Paris', 'Auckland'],
          placeholder: '',
          readOnly: true,
          suppressReadOnlyStyle: true,
          type: 'text',
          value: ''
        },
        married: {
          checked: false,
          disabled: false,
          indeterminate: false,
          label: (
            <span><span>I have</span><span style={{color: 'red'}}>&nbsp;three&nbsp;</span><span>states</span></span>),
          onChange: () => {
            let {checked, indeterminate} = this.state.inputs.married;
            if (!checked && !indeterminate) {
              checked = true;
            } else if (checked && !indeterminate) {
              checked = false;
              indeterminate = true;
            } else if (!checked && indeterminate) {
              checked = false;
              indeterminate = false;
            }
            this.setState({
              inputs: {
                ...this.state.inputs,
                married: {...this.state.inputs.married, checked: checked, indeterminate: indeterminate}
              }
            })
          }
        },
        happy: {
          checked: true,
          disabled: true,
          indeterminate: false,
          label: 'Check me out'
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

  handleSelectionChange = (value, index, name) => {
    this.setState({inputs: {...this.state.inputs, [`${name}`]: {...this.state.inputs[name], value: value}}});
  };

  // Render the component.
  render() {
    let {ping, isPinging} = this.props;
    let {inputs} = this.state;
    let {firstName, middleName, nickName, lastName, married, happy} = inputs;
    return (
      <div className={styles.root}>
        <ToolBar className={styles.filterBar}>
          <ToolBarItem>
            <span>Show</span>
          </ToolBarItem>
          <ToolBarItem>
            <SimpleDropDownList name="city" options={inputs.city.options} value={inputs.city.value}
                                onSelect={this.handleSelectionChange}>
              <Button className={classNames(btnBig, btnFlat, btnLink)}>
                <span>Your Expenses&nbsp;&nbsp;</span>
                <i className="icon-chevron-down"/>
              </Button>
            </SimpleDropDownList>
          </ToolBarItem>
          <ToolBarItem flex={1}>
            <div style={{fontSize: 24}}>Welcome</div>
          </ToolBarItem>
          <ToolBarItem>
            <i className="icon-bubble"/>
          </ToolBarItem>
        </ToolBar>
        <ToolBar className={styles.toolBar}>
          <ToolBarItem>
            <Button className={classNames(btnBig, btnPrimary)}>Complete</Button>
          </ToolBarItem>
          <ToolBarItem>
            <Button className={btnBig} disabled={true}>Apply Expense Template</Button>
          </ToolBarItem>
          <ToolBarItem>
            <Button className={classNames(btnBig, btnFlat)}>Flattering</Button>
          </ToolBarItem>
        </ToolBar>
        <div className={styles.form}>
          <InputGroup {...firstName} className={styles.bernd}>
            <Icon iconClassName="icon-user-tie" focusId={firstName.inputId}/>
            <Button><i className="icon-user-check"/></Button>
            <Input name="firstName" onChange={this.handleInputChange} {...firstName} type="text"/>
            <Button><i className="icon-user-plus"/></Button>
            <Button><i className="icon-user-minus"/></Button>
          </InputGroup>
          &nbsp;
          <Checkbox name="happy" {...happy}/>
          &nbsp;
          <ButtonGroup>
            <Button onClick={() => ping()}>Ping</Button>
            <Button><i className="icon-users"/><span>&nbsp;Blob</span></Button>
            <Button>Blub</Button>
          </ButtonGroup>
          &nbsp;
          <Checkbox name="married" {...married}/>
          <br/>
          <br/>
          <InputGroup {...middleName}>
            <Button disabled={true} suppressDisabledStyle={true}><i className="icon-user-tie"/></Button>
            <Input name="middleName" onChange={this.handleInputChange} {...middleName} type="text"/>
          </InputGroup>
          <br/>
          <br/>
          <InputGroup {...nickName}>
            <Input name="nickName" onChange={this.handleInputChange} {...nickName} type="text"/>
            <Button disabled={true} suppressDisabledStyle={true}><i className="icon-user-check"/></Button>
          </InputGroup>
          <br/>
          <br/>
          <InputGroup {...lastName}>
            <Input name="lastName" onChange={this.handleInputChange} {...lastName} type="text"/>
          </InputGroup>
          <br/>
          <br/>
          <SimpleDropDownList name="city" options={inputs.city.options} value={inputs.city.value}
                              onSelect={this.handleSelectionChange}>
            <InputGroup {...inputs.city}>
              <Input {...inputs.city}/>
              <Icon iconClassName="icon-chevron-down" focusId={inputs.city.inputId}/>
            </InputGroup>
          </SimpleDropDownList>
          <br/>
          <br/>
          {(() => {
            if (isPinging) {
              return (
                <h1>I am pinging!</h1>
              );
            }
          })()}
        </div>
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
