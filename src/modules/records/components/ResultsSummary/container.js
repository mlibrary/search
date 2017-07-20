import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral'
import { _ } from 'underscore';

import ResultsSummary from './presenter';

import {
  getDatastoreName,
} from '../../../pride';


class ResultsSummaryContainer extends React.Component {
  recordsSummary() {
    const { records, activeDatastoreUid, search } = this.props;
    const { count, page, totalAvailable } = this.props.search.data[activeDatastoreUid];

    const displayTotalAvailable = numeral(totalAvailable).format(0,0)
    const resultsText = totalAvailable === 1 ? `result` : `results`
    const pageNum = page
    const datastoreName = getDatastoreName(activeDatastoreUid);

    return {
      pageNum: `${pageNum}`,
      total: `${displayTotalAvailable}`,
      resultsText: `${resultsText}`,
      from: `from ${datastoreName}`,
      resultsFor: search.query ? (<span>for <b>{search.query}</b></span>) : null
    }
  }
  render() {
    const { records } = this.props;

    if (!records) {
      return null;
    }

    const summary = this.recordsSummary();

    return <ResultsSummary
        pageNum={summary.pageNum}
        recordsTotal={summary.total}
        recordsResultsText={summary.resultsText}
        resultsFrom={summary.from}
        resultsFor={summary.resultsFor}
      />
  }
}

function mapStateToProps(state) {
  return {
    search: state.search,
    records: state.records.records[state.datastores.active],
    activeDatastoreUid: state.datastores.active,
  };
}

export default connect(mapStateToProps)(ResultsSummaryContainer);
