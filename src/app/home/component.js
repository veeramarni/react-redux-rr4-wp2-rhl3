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
import {Link} from 'react-router'

/**
 * Create the component.
 */
class Home extends Component {
  // Initialize the component.
  constructor(props) {
    super(props);
  }

  // Render the component.
  render() {
    let {counter, dispatch} = this.props;
    return (
      <div>
        <h1>Home</h1>

        <p>Link to a route using the &lt;Link ha ha ha ha&gt; component:</p>

        <Link to="/counter">
          Go to Counter
        </Link>
      </div>
    );
  }
}

/**
 * Export the component.
 */
export default Home;
