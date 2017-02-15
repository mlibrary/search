import React from 'react';
import { connect } from 'react-redux';

import RecordMedium from '../RecordMedium';

class RecordListContainer extends React.Component {
  render() {
    const { records, activeDatastore } = this.props;

    if (records.records.length === 0) {
      return <p>No records to display.</p>;
    }

    return (
      <div>
        <ul className="results-list results-list-border">
          {records.records.map((record, index) =>
            <RecordMedium
              record={record}
              activeDatastore={activeDatastore}
              key={index}
            />,
          )}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    records: state.records,
    loading: state.loading,
    search: state.search,
    activeDatastore: state.datastores.active,
  };
}

export default connect(mapStateToProps)(RecordListContainer);
