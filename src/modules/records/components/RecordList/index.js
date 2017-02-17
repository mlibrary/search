import React from 'react';
import { connect } from 'react-redux';

import RecordMedium from '../RecordMedium';

class RecordListContainer extends React.Component {
  render() {
    const { records, activeDatastore, searching } = this.props;

    console.log('searching', searching)

    if (searching) {
      return <p>Loading results...</p>
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
    searching: state.search.searching,
    activeDatastore: state.datastores.active,
  };
}

export default connect(mapStateToProps)(RecordListContainer);
