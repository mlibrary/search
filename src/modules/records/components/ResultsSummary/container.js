import React from 'react';
import { connect } from 'react-redux';
import ResultsSummary from './presenter';
import { getDatastoreName } from '../../../pride';
import PropTypes from 'prop-types';

class ResultsSummaryContainer extends React.Component {
  recordsSummary () {
    const { activeDatastoreUid } = this.props;
    const { page, totalAvailable, totalPages } = this.props.search.data[activeDatastoreUid];
    const displayTotalAvailable = totalAvailable?.toLocaleString();
    const startRange = (page * 10 - 9)?.toLocaleString();
    const endRange =
      // Check if on first page or last page
      totalAvailable <= 10 || page === totalPages
        ? displayTotalAvailable
        : (page * 10).toLocaleString();

    return {
      showingRange: `${startRange} to ${endRange}`,
      total: `${displayTotalAvailable}`,
      resultsText: `result${totalAvailable !== 1 ? 's' : ''}`,
      from: getDatastoreName(activeDatastoreUid)
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
      />
    );
  }
}

ResultsSummaryContainer.propTypes = {
  activeDatastoreUid: PropTypes.string,
  search: PropTypes.object,
  records: PropTypes.array
};

function mapStateToProps (state) {
  return {
    search: state.search,
    records: state.records.records[state.datastores.active],
    activeDatastoreUid: state.datastores.active
  };
}

export default connect(mapStateToProps)(ResultsSummaryContainer);
