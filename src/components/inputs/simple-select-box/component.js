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
import Icon from '../icon/component';
import Input from '../input/component';
import InputGroup from '../input-group/component';
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
        leftAddOns: [],
        placeholder: 'Type or select something',
        valid: false,
        value: '',
        readOnly: true,
        rightAddOns: [<i className="icon-chevron-down" onMouseDown={this.handleMouseDown}/>],
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
    className: React.PropTypes.string,
    name: React.PropTypes.string,
    onSelect: React.PropTypes.func,
    options: React.PropTypes.array,
    value: React.PropTypes.string
  };

  // Invoked once, both on the client and server, immediately before the initial rendering occurs.
  // If you call setState within this method,
  // render() will see the updated state and will be executed only once despite the state change.
  componentWillMount() {
  }

  // Invoked when a component is receiving new props. This method is not called for the initial render.
  // Use this as an opportunity to react to a prop transition before render() is called
  // by updating the state using this.setState(). The old props can be accessed via this.props.
  // Calling this.setState() within this function will not trigger an additional render.
  componentWillReceiveProps(nextProps) {
    this.setState({input: {...this.state.input, value: nextProps.value ? nextProps.value : ''}});
  }

  getSelectedIndex = () => {
    return this.props.options.indexOf(this.props.value);
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

  handleMouseDown = (event, icon) => {
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

  handleOptionClick = (event, option, index) => {
    event.preventDefault();
    event.stopPropagation();
    this.showPopover(false);
    if (this.props.onSelect) {
      this.props.onSelect(option, index, this.props.name);
    }
  };

  handleInputKeyDown = event => {
    switch (event.keyCode) {
      // enter
      case 13:
        this.showPopover(false);
        break;
      // space
      case 32:
        this.showPopover(true);
        break;
      // escape
      case 27:
        this.showPopover(false);
        break;
      // up
      case 38: {
        let nextIndex = this.getSelectedIndex() - 1;
        if (nextIndex < 0 || !this.props.onSelect) {
          break;
        }
        this.props.onSelect(this.props.options[nextIndex], nextIndex, this.props.name);
        break;
      }
      // down
      case 40: {
        let nextIndex = this.getSelectedIndex() + 1;
        if (nextIndex >= this.props.options.length || !this.props.onSelect) {
          break;
        }
        this.props.onSelect(this.props.options[nextIndex], nextIndex, this.props.name);
        break;
      }
    }
  };

  // Render the component.
  render() {
    let {className, options} = this.props;
    let {input, popover} = this.state;
    let rootStyles = classNames('SimpleSelectBox', styles.root, className);
    return (
      <div className={rootStyles} onMouseDown={this.handleMouseDown}>
        <InputGroup {...input}>
          <Input onChange={this.handleInputChange}
                 onFocusChanged={this.handleInputFocusChange}
                 onKeyDown={this.handleInputKeyDown}
                 onClick={this.handleInputClick}
                 {...input}
          />
          <Icon iconClassName="icon-chevron-down"/>
        </InputGroup>
        <Popover {...popover} target={input.id}>
          <div className={styles.options}>
            {options.map((option, i) => (
              <div key={i}
                   className={classNames(styles.option, {[`${styles.selected}`]: this.getSelectedIndex() === i})}
                   onMouseDown={(e) => this.handleOptionClick(e, option, i)}
                   tabIndex="0">{option}</div>))}
          </div>
        </Popover>
      </div>
    );
  }
}
