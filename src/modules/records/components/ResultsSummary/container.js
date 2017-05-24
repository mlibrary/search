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
    const { records, activeDatastoreUid } = this.props;
    const { count, page, totalAvailable } = this.props.search.data[activeDatastoreUid];

    const displayTotalAvailable = numeral(totalAvailable).format(0,0)
    const resultsText = totalAvailable === 1 ? `result` : `results`
    const recordsFrom = (page - 1) * count + 1
    const recordsTo = (page - 1) * count + _.values(records).length;
    const datastoreName = getDatastoreName(activeDatastoreUid);

    return {
      range: `${recordsFrom}-${recordsTo}`,
      total: `${displayTotalAvailable}`,
      resultsText: `${resultsText}`,
      from: `from ${datastoreName}`,
    }
  }
  render() {
    const { records } = this.props;

    if (!records) {
      return null;
    }

    const summary = this.recordsSummary();

    return <ResultsSummary
        recordsRange={summary.range}
        recordsTotal={summary.total}
        recordsResultsText={summary.resultsText}
        resultsFrom={summary.from}
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
