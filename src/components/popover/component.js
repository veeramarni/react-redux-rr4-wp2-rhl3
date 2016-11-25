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
import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import Tether from 'tether';

/**
 * Import local dependencies.
 */

/**
 * Import styles.
 */
import styles from './styles.scss';

/**
 * Export the chart component.
 */
export default class extends React.Component {
  // Expected properties.
  static propTypes = {
    show: React.PropTypes.bool,
    target: React.PropTypes.string,
    toggle: React.PropTypes.func,
    options: React.PropTypes.object,
    attachment: React.PropTypes.string,
    withTriangle: React.PropTypes.bool,
    additionalClass: React.PropTypes.string,
    alignWidth: React.PropTypes.bool
  };

  // Initialize the component.
  constructor(props) {
    super(props);
  }

  // Invoked once, only on the client (not on the server), immediately after the initial rendering occurs.
  // At this point in the lifecycle, you can access any refs to your children
  // (e.g., to access the underlying DOM representation).
  // The componentDidMount() method of child components is invoked before that of parent components.
  // If you want to integrate with other JavaScript frameworks, set timers using setTimeout or setInterval,
  // or send AJAX requests, perform those operations in this method.
  componentDidMount() {
    this.element = ReactDOM.findDOMNode(this);
    this.target = document.getElementById(this.props.target);
    this.tether = new Tether(Object.assign({
      element: this.element,
      target: this.target,
      attachment: this.props.attachment || 'top left'
    }, this.props.options));

    this.handleChangeProps(this.props);
  }

  // Invoked immediately after the component's updates are flushed to the DOM.
  // This method is not called for the initial render.
  // Use this as an opportunity to operate on the DOM when the component has been updated.
  componentWillUnmount() {
    // Destroy.
    this.tether.destroy(); // TODO make sure that works!
    document.removeEventListener('click', this.handleClickDocument);
    // Remove visible element.
    document.body.removeChild(this.element);
  }

  // Invoked immediately after the component's updates are flushed to the DOM.
  // This method is not called for the initial render.
  // Use this as an opportunity to operate on the DOM when the component has been updated.
  componentDidUpdate() {
  }

  // Invoked when a component is receiving new props. This method is not called for the initial render.
  // Use this as an opportunity to react to a prop transition before render() is called by updating the state using this.setState().
  // The old props can be accessed via this.props. Calling this.setState() within this function will not trigger an additional render.
  componentWillReceiveProps(nextProps, nextContext) {
    this.handleChangeProps(nextProps);
  }

  handleChangeProps(props) {
    if (props.reposition) {
      this.tether.position();
    }
    if (props.show) {
      document.addEventListener('click', this.handleClickDocument);
    } else {
      document.removeEventListener('click', this.handleClickDocument);
    }
  }

  handleClickDocument = (e) => {
    console.log('WWWWWWWWWWWWW');
    if (e.target === this.element || !this.element.contains(e.target)) {
      if (this.props.toggle) {
        this.props.toggle();
      }
    }
  };

  // Render the component.
  render() {
    let classes = classnames(styles.root, {
      [`${styles.withTriangle}`]: this.props.withTriangle,
      [`${this.props.additionalClass}`]: this.props.additionalClass
    });
    let styles = {
      visibility: this.props.show ? '' : 'hidden',
      minWidth: this.props.alignWidth && this.target ? this.target.offsetWidth : ''
    };
    // Use visibility instead of display to avoid position calculation problems with 'center' positioning.
    return (
      <div className={classes} style={styles}>
        {this.props.children}
      </div>
    );
  }
}
