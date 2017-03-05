import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral'
import { _ } from 'underscore';

import ResultsSummary from './presenter';

class ResultsSummaryContainer extends React.Component {
  recordsSummary() {
    const { records, activeDatastore } = this.props;
    const { count, page, total_available } = this.props.search.data[activeDatastore];

    const display_total_available = numeral(total_available).format(0,0)
    const results_text = total_available === 1 ? `Result` : `Results`
    const records_from = (page - 1) * count + 1
    const records_to = (page - 1) * count + _.values(records).length;

    return {
      range: `${records_from}-${records_to}`,
      total: `${display_total_available}`,
      resultsText: `${results_text}`
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
