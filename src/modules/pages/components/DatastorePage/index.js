import React from 'react';
import { connect } from 'react-redux';

import { SearchBox } from '../../../search';
import { DatastoreNavigation } from '../../../datastores';
import { FilterList } from '../../../filters';
import {
  RecordList,
  Pagination,
} from '../../../records';

class DatastorePage extends React.Component {
  render() {
    const { searching } = this.props;

    if (searching) {
      return (
        <div>
          <SearchBox />
          <DatastoreNavigation />
          <div className="container container-medium flex-container">
            <div className="side-container">
              <FilterList />
            </div>
            <div className="main-container">
              <RecordList />
              <Pagination />
            </div>
          </div>
        </div>
      )
    }

    return (
      <div>
        <SearchBox />
        <DatastoreNavigation />
        <div className="container container-narrow">
          <p className="alert">Begin your search. Empty state.</p>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    searching: state.search.searching
  };
}

export default connect(mapStateToProps)(DatastorePage);
