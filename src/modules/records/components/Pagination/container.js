import React from 'react';
import { connect } from 'react-redux';

import Pagination from './presenter';

import {
  nextPage,
  prevPage,
} from '../../../../pride-interface';

class PaginationContainer extends React.Component {
  handlePreviousPage() {
    prevPage();
  }
  handleNextPage() {
    nextPage();
  }
  render() {
    const { records } = this.props;

    if (!records) {
      return null;
    }

    return <Pagination
        handlePreviousPage={this.handlePreviousPage.bind(this)}
        handleNextPage={this.handleNextPage.bind(this)}
      />
  }
}

function mapStateToProps(state) {
  return {
    records: state.records.records[state.datastores.active],
  };
}

export default connect(mapStateToProps)(PaginationContainer);
