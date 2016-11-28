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
        readOnly: true,
        rightIcons: [{
          className: 'icon-chevron-down',
          onClick: this.handleIconClick
        }],
        suppressReadOnlyStyle: true,
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
    onSelect: React.PropTypes.func,
    options: React.PropTypes.array,
    selectedOption: React.PropTypes.string
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

  // Invoked when a component is receiving new props. This method is not called for the initial render.
  // Use this as an opportunity to react to a prop transition before render() is called
  // by updating the state using this.setState(). The old props can be accessed via this.props.
  // Calling this.setState() within this function will not trigger an additional render.
  componentWillReceiveProps(nextProps) {
    this.setState({input: {...this.state.input, value: nextProps.value ? nextProps.value : ''}});
  }

  targetIsDescendant = (target, parent) => {
    let node = target;
    while (node !== null) {
      if (node === parent) return true;
      node = node.parentNode;
    }
    return false;
  };

  showPopover = show => {
    this.setState({popover: {...this.state.popover, show: show}});
  };

  togglePopover = () => {
    this.showPopover(!this.state.popover.show);
  };

  handleInputFocusChange = (event, focused, clicked) => {
    if (!focused) {
      this.showPopover(false);
    }
  };

  handleInputClick = () => {
    this.togglePopover();
  };

  handleIconClick = (event, icon) => {
    event.preventDefault();
    event.stopPropagation();
    let inputElement = document.getElementById(this.state.input.inputId);
    console.log(document.activeElement === inputElement);
    if (document.activeElement !== inputElement) {
      inputElement.focus();
      this.showPopover(true);
    } else {
      this.togglePopover();
    }
  };

  handleOptionClick = (event, option) => {
    event.preventDefault();
    event.stopPropagation();
    this.showPopover(false);
    if (this.props.onSelect) {
      this.props.onSelect(option);
    }
  };

  handleInputKeyDown = event => {
    switch (event.keyCode) {
      case 32:
        this.showPopover(true);
        break;
      case 27:
        this.showPopover(false);
        break;
    }
  };

  // Render the component.
  render() {
    let {options} = this.props;
    let {input, popover} = this.state;
    return (
      <div className={styles.root}>
        <InputBox onChange={this.handleInputChange}
                  onFocusChanged={this.handleInputFocusChange}
                  onKeyDown={this.handleInputKeyDown}
                  onClick={this.handleInputClick}
                  {...input}/>
        <Popover {...popover} target={input.id}>
          <div className={styles.options}>
            {options.map((option, i) => (
              <div key={i} className={styles.option} onMouseDown={(e) => this.handleOptionClick(e, option)}
                   tabIndex="0">{option}</div>))}
          </div>
        </Popover>
      </div>
    );
  }
}
