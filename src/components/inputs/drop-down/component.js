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
import Popover from '../../popover/component';

/**
 * Import styles.
 */
import styles from './styles.scss';

/**
 * Export the component.
 */
export default class DropDown extends Component {
  // Initialize the component.
  constructor(props) {
    super(props);
    // Initialize the local component state.
    this.state = {
      id: '' + new Date().getTime() + Math.random(),
      popover: {
        show: false,
        toggle: () => this.showPopover(false),
        attachment: 'top middle',
        reposition: true,
        withTriangle: true,
        options: {
          targetAttachment: 'bottom middle',
          offset: '-10px 0'
        },
        alignWidth: true
      }
    }
  }

  // Expected properties.
  static propTypes = {
    children: React.PropTypes.node,
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

  showPopover = show => {
    this.setState({popover: {...this.state.popover, show: show}});
  };

  togglePopover = () => {
    this.showPopover(!this.state.popover.show);
  };

  handleClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.showPopover(true);
  };

  // Render the component.
  render() {
    let {children, className} = this.props;
    let {id, popover} = this.state;
    let rootStyles = classNames('DropDown', styles.root, className);
    return (
      <div className={rootStyles} id={id} onClick={this.handleClick}>
        {children[0]}
        <Popover {...popover} target={id}>
          <div className={styles.dropdown}>
            {children[1]}
          </div>
        </Popover>
      </div>
    );
  }
}
