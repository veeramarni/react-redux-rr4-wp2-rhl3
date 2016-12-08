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
import ReactDOM from 'react-dom';
import classNames from 'classnames';

/**
 * Import local dependencies.
 */
import DropDown from '../drop-down/component';

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
      show: false
    }
  }

  // Expected properties.
  static propTypes = {
    children: React.PropTypes.element,
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

  // Invoked once, only on the client (not on the server), immediately after the initial rendering occurs.
  // At this point in the lifecycle, you can access any refs to your children
  // (e.g., to access the underlying DOM representation).
  // The componentDidMount() method of child components is invoked before that of parent components.
  // If you want to integrate with other JavaScript frameworks, set timers using setTimeout or setInterval,
  // or send AJAX requests, perform those operations in this method.
  componentDidMount() {
    this.element = ReactDOM.findDOMNode(this);
    this.element.addEventListener('keydown', this.handleKeyDown);
    this.element.addEventListener('keyup', this.handleKeyUp);
  }

  // Invoked immediately after the component's updates are flushed to the DOM.
  // This method is not called for the initial render.
  // Use this as an opportunity to operate on the DOM when the component has been updated.
  componentWillUnmount() {
    this.element.removeEventListener('keydown', this.handleKeyDown);
    this.element.removeEventListener('keyup', this.handleKeyUp);
  }

  // Invoked when a component is receiving new props. This method is not called for the initial render.
  // Use this as an opportunity to react to a prop transition before render() is called
  // by updating the state using this.setState(). The old props can be accessed via this.props.
  // Calling this.setState() within this function will not trigger an additional render.
  componentWillReceiveProps(nextProps) {
  }

  getSelectedIndex = () => {
    return this.props.options.indexOf(this.props.value);
  };

  handleKeyDown = event => {
    switch (event.keyCode) {
      // enter
      case 13:
        event.preventDefault();
        event.stopPropagation();
        this.setState({show: false});
        break;
      // space
      case 32:
        event.preventDefault();
        event.stopPropagation();
        this.setState({show: true});
        break;
      // escape
      case 27:
        this.setState({show: false});
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

  handleKeyUp = event => {
    switch (event.keyCode) {
      // enter
      case 13:
        event.preventDefault();
        event.stopPropagation();
        return false;
        break;
      // space
      case 32:
        event.preventDefault();
        event.stopPropagation();
        return false;
        break;
    }
  };

  handleOptionClick = (event, option, index) => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({show: false});
    if (this.props.onSelect) {
      this.props.onSelect(option, index, this.props.name);
    }
  };

  handleClick = e => {
    this.setState({show: true});
  };

  handleBlur = e => {
    this.setState({show: false});
  };

  // Render the component.
  render() {
    let {children, className, options} = this.props;
    let {show} = this.state;
    let rootStyles = classNames('SimpleDropDownList', styles.root, className);
    return (
      // keydown and keyup event are attached as native events already to fix firefox behaviour.
      <DropDown className={rootStyles} onClick={this.handleClick} onBlur={this.handleBlur} show={show}>
        {children}
        <ul className={styles.options}>
          {options.map((option, i) => (
            <li key={i}
                className={classNames(styles.option, {[`${styles.selected}`]: this.getSelectedIndex() === i})}
                onMouseDown={(e) => this.handleOptionClick(e, option, i)}
                tabIndex="0">{option}</li>))}
        </ul>
      </DropDown>
    );
  }
}
