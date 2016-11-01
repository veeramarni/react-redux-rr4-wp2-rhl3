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
import BrowserHistory from 'react-history/BrowserHistory';
import {Push} from 'react-history';
import {StaticRouter} from 'react-router';

/**
 * Create the wrapper component.
 */
class RouterWrapper extends Component {
  // Initialize the component.
  constructor(props) {
    super(props);
  }

  // Invoked when a component is receiving new props. This method is not called for the initial render.
  // Use this as an opportunity to react to a prop transition before render() is called
  // by updating the state using this.setState(). The old props can be accessed via this.props.
  // Calling this.setState() within this function will not trigger an additional render.
  componentWillReceiveProps(nextProps) {
    const {setLocation, historyLocation, update} = nextProps;
    if (update) {
      setLocation(historyLocation);
    }
  }

  // Render the component.
  render() {
    return this.props.children;
  }
}

/**
 * Create the component.
 */
export default class ControlledRouter extends Component {
  // Initialize the component.
  constructor(props) {
    super(props);
    // Temporary local storage for comparison.
    this.prevPathname = '';
  }

  // Invoked before rendering when new props or state are being received.
  // This method is not called for the initial render or when forceUpdate is used.
  // Use this as an opportunity to return false
  // when you're certain that the transition to the new props and state will not require a component update.
  // If shouldComponentUpdate returns false, then render() will be completely skipped until the next state change.
  // In addition, componentWillUpdate and componentDidUpdate will not be called.
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.location.pathname !== this.props.location.pathname;
  }

  // Invoked immediately after the component's updates are flushed to the DOM.
  // This method is not called for the initial render.
  // Use this as an opportunity to operate on the DOM when the component has been updated.
  componentDidUpdate() {
    // Scroll to the top left on page changes
    if (window && window.scrollY) {
      window.scroll(0, 0);
    }
  }

  // Render the component.
  render() {
    const {location, setLocation, children} = this.props;
    return (
      <BrowserHistory>
        {({history, action, location: historyLocation}) => {
          const historyPathname = historyLocation.pathname;
          const controlledPathname = location.pathname;
          const pathChanged = historyPathname !== controlledPathname;
          const shouldUpdateState = pathChanged && historyPathname !== this.prevPathname;
          const shouldUpdateHistory = pathChanged && !shouldUpdateState;

          // Keep track of previous pathname
          this.prevPathname = historyLocation.pathname;

          return (
            <RouterWrapper setLocation={setLocation} historyLocation={historyLocation} update={shouldUpdateState}>
              <StaticRouter action={action}
                            location={historyLocation}
                            onPush={history.push}
                            onReplace={history.replace}
                            blockTransitions={history.block}>
                { shouldUpdateHistory ? <Push path={location.pathname}/> : children }
              </StaticRouter>
            </RouterWrapper>
          );
        }}
      </BrowserHistory>
    )
  }
}
