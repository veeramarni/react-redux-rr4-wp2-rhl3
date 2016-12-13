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
import {connect} from 'react-redux';
import {Match} from 'react-router';
import classNames from 'classnames';

/**
 * Import local dependencies.
 */
import {changeSelectedCardIndexCreator} from '../card-list-page/actions';
import Button from '../../components/button/component';
import ButtonGroup from '../../components/button-group/component';
import {
  big as btnBig,
  primary as btnPrimary,
  flat as btnFlat,
  link as btnLink,
  inverse as btnInverse
} from '../../components/button/styles.scss';
import Checkbox from '../../components/checkbox/component';
import {
  tiny as cbSmall
} from '../../components/checkbox/styles.scss';
import Icon from '../../components/icon/component';
import Input from '../../components/input/component';
import InputGroup from '../../components/input-group/component';
import SimpleDropDownList from '../../components/simple-drop-down-list/component';
import ToolBar from '../../components/tool-bar/component';
import ToolBarItem from '../../components/tool-bar-item/component';

/**
 * Import styles.
 */
import styles from './styles.scss';

/**
 * Create the component.
 */
class CardListPage extends Component {
  // Initialize the component.
  constructor(props) {
    super(props);
  }

  handleButtonUpClick = () => {
    if (this.props.selectedCardIndex > 0) {
      this.props.changeSelectedCardIndex(this.props.selectedCardIndex - 1);
    }
  };
  handleButtonDownClick = () => {
    if (this.props.selectedCardIndex + 1 < this.props.numberOfCards) {
      this.props.changeSelectedCardIndex(this.props.selectedCardIndex + 1);
    }
  };
  handleButtonCloseClick = () => {
    this.props.changeSelectedCardIndex(-1);
  };

  // Render the component.
  render() {
    let {selectedCard} = this.props;
    return (
      <div className={classNames(styles.root, this.props.className)}>
        <div className={styles.panelHeader}>
          <div className={styles.headerButtons}>
            <Button className={classNames(btnBig, btnFlat, btnInverse)} onClick={this.handleButtonUpClick}><i
              className="icon-chevron-up"/></Button>
            <Button className={classNames(btnBig, btnFlat, btnInverse)} onClick={this.handleButtonDownClick}><i
              className="icon-chevron-down"/></Button>
            <Button className={classNames(btnBig, btnFlat, btnInverse)} onClick={this.handleButtonCloseClick}><i
              className="icon-cross"/></Button>
          </div>
          <div className={styles.title}><div>Title</div><div>1234567890</div></div>
          <table>
            <tbody>
            <tr>
              <td className={styles.active}>INSIGHTS & ACTIONS</td>
              <td>DETAILS</td>
            </tr>
            </tbody>
          </table>
        </div>
        <table className={styles.summaryTable}>
          <thead>
          <tr>
            <th>Name & Account No.</th>
            <th>Company ID</th>
            <th>Current Spend</th>
            <th>Credit Limit</th>
            <th>Issuer</th>
            <th>Account Type</th>
            <th>Card Type</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>{selectedCard.get('name')}</td>
            <td>{selectedCard.get('company')}</td>
            <td>{selectedCard.get('spend')}</td>
            <td>{selectedCard.get('limit')}</td>
            <td>{selectedCard.get('issuer')}</td>
            <td>{selectedCard.get('accountType')}</td>
            <td>{selectedCard.get('cardType')}</td>
          </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

/**
 * Map state to component properties.
 */
const stateToProps = (store) => {
  let selectedCardIndex = store.getIn(['cardListPage', 'selectedCardIndex']);
  let cardList = store.getIn(['cardListPage', 'cardList']);
  return {
    numberOfCards: cardList.size,
    selectedCardIndex: selectedCardIndex,
    selectedCard: cardList.get(selectedCardIndex)
  };
};

/**
 * Map actions to component properties.
 */
const dispatchToProps = (dispatch) => {
  return {
    changeSelectedCardIndex: (index) => dispatch(changeSelectedCardIndexCreator(index))
  }
};

/**
 * Export the container component.
 */
export default connect(stateToProps, dispatchToProps)(CardListPage);
