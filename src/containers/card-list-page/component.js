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
import classNames from 'classnames';
import Link from 'react-router/Link';

/**
 * Import local dependencies.
 */
import {changeSelectedCardIndexCreator, selectCompanyCreator} from './actions';
import {fetchGraphQLQueryCreator} from '../../actions';
import Button from '../../components/button/component';
import ButtonGroup from '../../components/button-group/component';
import CardDetailsPanel from '../card-details-panel/component';
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

  fetchStuffExample = () => {
    fetchGraphQLQueryCreator({
      query: `{
                explorer(id:"0") {
                   id
                   dimensions {
                     key
                   }
                   chart {
                    __typename
                    ... on DonutChart {
                      dataSet {
                        columns {
                          id
                          key
                        }
                      }
                    }
                  }
                }
              }`
    });
  };

  entityAccessExample = () => {
    console.log('Bla', entities(state).Explorer('0').chart('DonutChart').dataSet.columns().__type());
    console.log('Blu', entities(state).Explorer('0').chart('DonutChart').dataSet.columns().key.__value(/*Immutable.Map()*/));
  };

  handleSelectionChange = (value, index, name) => {
    switch (name) {
      case 'companies':
        this.props.selectCompany(value);
        break;
    }
  };

  handleClickCard = (index) => {
    this.props.changeSelectedCardIndex(index);
  };

  // Render the component.
  render() {
    let {companiesFilter, selectedCardIndex, cardList} = this.props;
    let companies = {
      inputId: 'city',
      label: 'City',
      options: companiesFilter.get('options').toArray(),
      readOnly: true,
      suppressReadOnlyStyle: true,
      type: 'text',
      value: companiesFilter.get('value'),
      display: () => 'Companies'
    };
    return (
      <div className={styles.root}>
        <ToolBar className={styles.filterBar}>
          <ToolBarItem>
            <Link to="/demo">Demo</Link>
          </ToolBarItem>
          <ToolBarItem>
            <SimpleDropDownList name="companies" options={companies.options} value={companies.value}
                                onSelect={this.handleSelectionChange}>
              <Button styleFlat>
                <span>{companies.display()}&nbsp;&nbsp;</span>
                <i className="icon-chevron-down"/>
              </Button>
            </SimpleDropDownList>
          </ToolBarItem>
          <ToolBarItem flex={1}>
          </ToolBarItem>
          <ToolBarItem>
            <i className="icon-bubble"/>
          </ToolBarItem>
        </ToolBar>
        <ToolBar className={styles.toolBar}>
          <ToolBarItem>
            <Checkbox className={cbSmall}/>
          </ToolBarItem>
          <ToolBarItem>
            <Button stylePrimary>Complete</Button>
          </ToolBarItem>
          <ToolBarItem>
            <Button disabled>Apply Expense Template</Button>
          </ToolBarItem>
        </ToolBar>
        <table className={styles.table}>
          <thead>
          <tr>
            <th></th>
            <th colSpan="2">Name & Account No.</th>
            <th>Company ID</th>
            <th>Current Spend</th>
            <th>Credit Limit</th>
            <th>Issuer</th>
            <th>Account Type</th>
            <th>Card Type</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          {cardList.map((card, i) =>
            <tr key={i} className={selectedCardIndex === i ? styles.selected : null}
                onClick={() => this.handleClickCard(i)}>
              <td><Checkbox className={cbSmall} checked={true} onChange={(e) => console.log(e)}/></td>
              <td>
                <div className={styles.circle}><span>{card.get('name').charAt(0)}</span></div>
              </td>
              <td>
                <div><b>{card.get('name')}</b></div>
                <div>{card.get('accountNumber')}</div>
              </td>
              <td>
                <div>{card.get('company')}</div>
              </td>
              <td>
                <div>{card.get('spend')}</div>
              </td>
              <td>
                <div>{card.get('limit')}</div>
              </td>
              <td>
                <div>{card.get('issuer')}</div>
              </td>
              <td>
                <div>{card.get('accountType')}</div>
              </td>
              <td>
                <div>{card.get('cardType')}</div>
              </td>
              <td></td>
            </tr>)}
          </tbody>
        </table>
        {(() => {
          if (selectedCardIndex !== -1) {
            return <CardDetailsPanel className={styles.cardDetailsPanel}/>;
          }
        })()}
      </div>
    );
  }
}

/**
 * Map state to component properties.
 */
const stateToProps = (store) => {
  return {
    companiesFilter: store.getIn(['cardListPage', 'companiesFilter']),
    selectedCardIndex: store.getIn(['cardListPage', 'selectedCardIndex']),
    cardList: store.getIn(['cardListPage', 'cardList'])
  };
};

/**
 * Map actions to component properties.
 */
const dispatchToProps = (dispatch) => {
  return {
    selectCompany: (name) => dispatch(selectCompanyCreator(name)),
    changeSelectedCardIndex: (index) => dispatch(changeSelectedCardIndexCreator(index))
  }
};

/**
 * Export the container component.
 */
export default connect(stateToProps, dispatchToProps)(CardListPage);
