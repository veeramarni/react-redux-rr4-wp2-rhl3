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

/**
 * Import local dependencies.
 */

/**
 * Import styles.
 */
import styles from './styles.scss';

/**
 * Export the component.
 */
export default class extends Component {
  // Initialize the component.
  constructor(props) {
    super(props);
  }

  // Render the component.
  render() {
    let {ping, isPinging} = this.props;
    return (
      <div className={styles.root}>
        <input id="bla" type="text"/>
        <label htmlFor="bla">Label</label>
        <i className="icon-bubble2"></i>
      </div>
    );
  }
}
