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
import InputBox from '../input-box/component';
import Popover from '../../popover/component';

/**
 * Import styles.
 */
import styles from './styles.scss';

/**
 * Export the component.
 */
export default class SimpleSelectBox extends Component {
  // Initialize the component.
  constructor(props) {
    super(props);
    // Initialize the local component state.
    this.state = {
      input: {
        id: '' + new Date().getTime() + Math.random(),
        inputId: '' + new Date().getTime() + Math.random(),
        invalid: false,
        disabled: false,
        label: 'Country',
        leftIcons: [],
        placeholder: 'Type or select something',
        valid: false,
        value: '',
        readOnly: false,
        rightIcons: [{
          className: 'icon-chevron-down',
          onClick: this.handleIconClick
        }],
        type: 'text',
      },
      popover: {
        show: false,
        attachment: 'top left',
        reposition: true,
        withTriangle: false,
        options: {
          targetAttachment: 'bottom left',
          offset: '-4px 0'
        },
        alignWidth: true
      }
    }
  }

  // Expected properties.
  static propTypes = {
    options: React.PropTypes.array
  };

  // Invoked once, both on the client and server, immediately before the initial rendering occurs.
  // If you call setState within this method,
  // render() will see the updated state and will be executed only once despite the state change.
  componentWillMount() {
    // Update the default props.
    // if (this.props.inputId) {
    //   this.setState({inputId: this.props.inputId});
    // }
  }

  handleIconClick = (icon) => {
    document.getElementById(this.state.input.inputId).focus();
  };

  handleInputFocusChange = (focused) => {
    console.log('rrrrrrrrrrrrr');
    setTimeout(this.setState({popover: {...this.state.popover, show: focused}}),1000);
  };

  // Render the component.
  render() {
    let {options} = this.props;
    let {input, popover} = this.state;
    return (
      <div className={styles.root}>
        <InputBox onChange={this.handleInputChange} onFocusChanged={this.handleInputFocusChange} {...input}/>
        <Popover {...popover} target={input.id}>
          <div className={styles.options}>
            {options.map((option, i) => (<div key={i} className={styles.option} onClick={()=>console.log('XXXXXXXXXX')}>{option}</div>))}
          </div>
        </Popover>
      </div>
    );
  }
}
