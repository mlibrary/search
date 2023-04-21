import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';

import ResultsSummary from './presenter';

import {
  getDatastoreName
} from '../../../pride';

class ResultsSummaryContainer extends React.Component {
  recordsSummary () {
    const { activeDatastoreUid, search } = this.props;
    const { page, totalAvailable, totalPages } = this.props.search.data[activeDatastoreUid];

    const displayTotalAvailable = numeral(totalAvailable).format(0, 0);
    const resultsText = totalAvailable === 1 ? 'result' : 'results';
    const startRange = `${numeral((page * 10 - 9)).format(0, 0)} `;
    const endRange = () => {
      // On first page
      if (totalAvailable <= 10) {
        return `${numeral(totalAvailable).format(0, 0)}`;
      }

      // On last page
      if (page === totalPages) {
        return `${numeral(totalAvailable).format(0, 0)}`;
      }

      // Every other page
      return `${(numeral(page * 10).format(0, 0))}`;
    };
    const showingRange = `${startRange} to ${endRange()}`;
    const datastoreName = getDatastoreName(activeDatastoreUid);

    return {
      showingRange: `${showingRange}`,
      total: `${displayTotalAvailable}`,
      resultsText: `${resultsText}`,
      from: `${datastoreName}`,
      resultsFor: search.query ? (<span>for <b>{search.query}</b></span>) : null
    };
  }

  render () {
    const { records } = this.props;

    if (!records) {
      return null;
    }

    const summary = this.recordsSummary();

    return (
      <ResultsSummary
        showingRange={summary.showingRange}
        recordsTotal={summary.total}
        recordsResultsText={summary.resultsText}
        resultsFrom={summary.from}
        resultsFor={summary.resultsFor}
      />
    );
  }
}

function mapStateToProps (state) {
  return {
    search: state.search,
    records: state.records.records[state.datastores.active],
    activeDatastoreUid: state.datastores.active
  };
}

export default connect(mapStateToProps)(ResultsSummaryContainer);
