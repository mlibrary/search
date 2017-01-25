import React from 'react';
import { connect } from 'react-redux';

import RecordMedium from '../RecordMedium';

class RecordListContainer extends React.Component {
  render() {
    const { records, loading, search } = this.props;

    if (loading.datastores) {
      return null;
    }

    if (!search.searching) {
      return <p>Empty state. Enter search for results.</p>;
    }

    if (loading.records) {
      return <p>Loading results...</p>;
    }

    if (records.records.length === 0) {
      return <p>No results.</p>;
    }

    return (
      <ul className="results-list results-list-border">
        {records.map((record, index) =>
          <RecordMedium
            name={record.name[0]}
            fields={record.fields}
            key={index}
          />,
        )}
      </ul>
    );
  }
}

RecordListContainer.propTypes = {
  records: React.PropTypes.string.isRequired,
  loading: React.PropTypes.shape({
    datastore: React.PropType.boolean,
    records: React.PropType.boolean,
    facets: React.PropType.boolean,
  }).isRequired,
  search: React.PropTypes.shape({
    searching: React.PropType.boolean,
    search_query: React.PropType.string,
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    records: state.records,
    loading: state.loading,
    search: state.search,
  };
}

export default connect(mapStateToProps)(RecordListContainer);
