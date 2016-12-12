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
import {selectCompanyCreator} from './actions';
import Button from '../../components/button/component';
import ButtonGroup from '../../components/button-group/component';
import {
  big as btnBig,
  primary as btnPrimary,
  flat as btnFlat,
  link as btnLink
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

  handleSelectionChange = (value, index, name) => {
    switch (name) {
      case 'companies':
        this.props.selectCompany(value);
        break;
    }
  };

  // Render the component.
  render() {
    let {companiesFilter, columns, rows} = this.props;
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
            <span>Show</span>
          </ToolBarItem>
          <ToolBarItem>
            <SimpleDropDownList name="companies" options={companies.options} value={companies.value}
                                onSelect={this.handleSelectionChange}>
              <Button className={classNames(btnBig, btnFlat, btnLink)}>
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
            <Button className={classNames(btnBig, btnPrimary)}>Complete</Button>
          </ToolBarItem>
          <ToolBarItem>
            <Button className={btnBig} disabled={true}>Apply Expense Template</Button>
          </ToolBarItem>
        </ToolBar>
        <table className={styles.table}>
          <thead>
          <tr>
            <th></th>
            <th colSpan="2">{columns.get(0)}</th>
            <th>{columns.get(1)}</th>
            <th>{columns.get(2)}</th>
            <th>{columns.get(3)}</th>
            <th>{columns.get(4)}</th>
            <th>{columns.get(5)}</th>
            <th>{columns.get(6)}</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          {rows.map((row, i) =>
            <tr key={i}>
              <td><Checkbox className={cbSmall} checked={true} onChange={(e) => console.log(e)}/></td>
              <td>
                <div className={styles.circle}><span>{row.get('name').charAt(0)}</span></div>
              </td>
              <td>
                <div><b>{row.get('name')}</b></div>
                <div>{row.get('accountNumber')}</div>
              </td>
              <td>
                <div>{row.get('company')}</div>
              </td>
              <td>
                <div>{row.get('spend')}</div>
              </td>
              <td>
                <div>{row.get('limit')}</div>
              </td>
              <td>
                <div>{row.get('issuer')}</div>
              </td>
              <td>
                <div>{row.get('accountType')}</div>
              </td>
              <td>
                <div>{row.get('cardType')}</div>
              </td>
              <td></td>
            </tr>)}
          </tbody>
        </table>
        <div className={styles.circle}></div>
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
    columns: store.getIn(['cardListPage', 'columns']),
    rows: store.getIn(['cardListPage', 'rows'])
  };
};

/**
 * Map actions to component properties.
 */
const dispatchToProps = (dispatch) => {
  return {
    selectCompany: (name) => dispatch(selectCompanyCreator(name))
  }
};

/**
 * Export the container component.
 */
export default connect(stateToProps, dispatchToProps)(CardListPage);
