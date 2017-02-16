import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral'

import RecordListBar from './presenter';

import {
  nextPage,
  prevPage,
} from '../../../../pride-interface';

class ReactListBarContainer extends React.Component {
  handlePreviousPage(){
    prevPage()
  }
  handleNextPage() {
    nextPage()
  }
  recordsSummary() {
    const { count, page, total_available } = this.props.search.data;
    const { records } = this.props;

    const display_total_available = numeral(total_available).format(0,0)
    const results_text = total_available === 1 ? `result` : `results`
    const records_from = (page - 1) * count + 1
    const records_to = (page - 1) * count + records.length

    return `${records_from}-${records_to} of ${display_total_available} ${results_text}`
  }
  render() {
    const { records, searching } = this.props;

    if (records.length === 0) {
      return null;
    }

    return <RecordListBar
        handlePreviousPage={this.handlePreviousPage.bind(this)}
        handleNextPage={this.handleNextPage.bind(this)}
        recordsSummary={this.recordsSummary()}
      />
  }
}

function mapStateToProps(state) {
  return {
    search: state.search,
    records: state.records.records,
  };
}

export default connect(mapStateToProps)(ReactListBarContainer);
