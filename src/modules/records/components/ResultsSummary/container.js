import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import ResultsSummary from './presenter';
import { getDatastoreName } from '../../../pride';
import PropTypes from 'prop-types';

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
      resultsFor: search.query ? (<span>for <span className='strong'>{search.query}</span></span>) : null
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
