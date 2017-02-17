import React from 'react';
import { connect } from 'react-redux';

import { SearchBox } from '../../../search';
import { DatastoreNavigation } from '../../../datastores';
import { FilterList } from '../../../filters';
import {
  RecordList,
  RecordListBar,
} from '../../../records';

class DatastorePage extends React.Component {
  render() {
    const { searching, records } = this.props;

    if (!searching && records.records.length === 0) {
      return (
        <div>
          <SearchBox />
          <DatastoreNavigation />
          <div className="container container-narrow">
            <p>Empty state. Begin your search.</p>
          </div>
        </div>
      )
    }

    return (
      <div>
        <SearchBox />
        <DatastoreNavigation />
        <div className="container container-medium flex-container">
          <div className="side-container">
            <FilterList />
          </div>
          <div className="main-container">
            <RecordListBar />
            <RecordList />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    searching: state.search.searching,
    records: state.records
  };
}

export default connect(mapStateToProps)(DatastorePage);
