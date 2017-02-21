import React from 'react';

import ClearSearchButton from './presenter';

import { store } from '../../../../store';
import { clearSearch } from '../../actions';
import { clearRecords } from '../../../records';
import { clearFilters } from '../../../filters';

import {
  removeQuery
} from '../../../../router';

class ClearSearchButtonContainer extends React.Component {
  handleClick() {
    removeQuery('q');
    removeQuery('filter');

    store.dispatch(clearRecords())
    store.dispatch(clearFilters())
    store.dispatch(clearSearch())
  }
  render() {
    return <ClearSearchButton handleClick={this.handleClick} />
  }
}

export default ClearSearchButtonContainer;
