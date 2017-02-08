import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral'

import RecordListBar from './presenter';

class ReactListBarContainer extends React.Component {
  handlePreviousPage() {
    console.log('handlePreviousPage')
  }
  handleNextPage() {
    console.log('handleNextPage')
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
    const { records, search } = this.props;

    if (records.length === 0 || !search.searching) {
      return null
    }

    return <RecordListBar
        handlePreviousPage={this.handlePreviousPage}
        handleNextPage={this.handleNextPage}
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
