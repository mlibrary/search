import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral'
import { _ } from 'underscore';

import ResultsSummary from './presenter';

class ResultsSummaryContainer extends React.Component {
  recordsSummary() {
    const { records, activeDatastore } = this.props;
    const { count, page, totalAvailable } = this.props.search.data[activeDatastore];

    const displayTotalAvailable = numeral(totalAvailable).format(0,0)
    const resultsText = totalAvailable === 1 ? `Result` : `Results`
    const recordsFrom = (page - 1) * count + 1
    const recordsTo = (page - 1) * count + _.values(records).length;

    return {
      range: `${recordsFrom}-${recordsTo}`,
      total: `${displayTotalAvailable}`,
      resultsText: `${resultsText}`
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
      />
  }
}

function mapStateToProps(state) {
  return {
    search: state.search,
    records: state.records.records[state.datastores.active],
    activeDatastore: state.datastores.active,
  };
}

export default connect(mapStateToProps)(ResultsSummaryContainer);
