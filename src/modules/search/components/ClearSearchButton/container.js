import React from 'react';

import ClearSearchButton from './presenter';

import { store } from '../../../../store';
import { clearSearch } from '../../actions';
import { clearRecords } from '../../../records';
import { clearFilters } from '../../../filters';

class ClearSearchButtonContainer extends React.Component {
  handleClick() {
    console.log('clear search')
    store.dispatch(clearRecords())
    store.dispatch(clearFilters())
    store.dispatch(clearSearch())
    document.getElementsByClassName('search-box-input')[0].value = '';
  }
  render() {
    return <ClearSearchButton handleClick={this.handleClick} />
  }
}

export default ClearSearchButtonContainer;
