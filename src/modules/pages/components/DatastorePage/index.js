import React from 'react';
import { connect } from 'react-redux';

import { SearchBox } from '../../../search';
import { DatastoreNavigation } from '../../../datastores';
import { FilterList } from '../../../filters';
import {
  RecordList,
  RecordListBar,
} from '../../../records';

import { store } from '../../../../store';

class DatastorePage extends React.Component {
  render() {
    const { searching } = this.props;

    if (searching) {
      return (
        <div>
          <SearchBox />
          <DatastoreNavigation />
          <div className="container container-medium">
            <div className="main-container">
              <p>Loading...</p>
            </div>
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
  };
}

export default connect(mapStateToProps)(DatastorePage);
