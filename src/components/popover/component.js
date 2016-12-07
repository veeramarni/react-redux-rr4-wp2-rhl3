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
      attachment: this.props.attachment || 'top left',
      constraints: [
        {
          to: 'scrollParent',
          pin: true
        }
      ]
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
    if (e.target === this.element || !this.element.contains(e.target)) {
      if (this.props.toggle) {
        console.log('popover => toggle');
        this.props.toggle(); // todo maybe let the outer component decide?
      }
    }
  };

  // Render the component.
  render() {
    let {alignWidth, className, withTriangle, show} = this.props;
    let rootStyles = classnames(styles.root, className);
    let rootCalculatedStyles = {
      visibility: show ? '' : 'hidden',
      minWidth: alignWidth && this.target ? this.target.offsetWidth : ''
    };
    let left = '50%';
    let targetBounds = this.target ? this.target.getBoundingClientRect() : null;
    let elementBounds = this.element ? this.element.getBoundingClientRect() : null;
    if (targetBounds && elementBounds) {
      if (targetBounds.width < elementBounds.width) {
        left = targetBounds.left - elementBounds.left + targetBounds.width / 2;
      }
    }
    if (withTriangle) {
      return (
        <div className={rootStyles} style={rootCalculatedStyles}>
          <div className={styles.triangle1} style={{left: left}}></div>
          <div className={styles.triangle2} style={{left: left}}></div>
          {this.props.children}
        </div>
      );
    } else {
      return (
        <div className={rootStyles} style={rootCalculatedStyles}>
          {this.props.children}
        </div>
      );
    }
  }
}
