import React from 'react';
import { connect } from 'react-redux';
import { _ } from 'underscore';

import { SearchBox } from '../../../search';
import {
  DatastoreNavigation,
  DatastoreInfo,
} from '../../../datastores';
import { Filters } from '../../../filters';
import {
  RecordList,
  Pagination,
  BentoboxList,
} from '../../../records';

class DatastorePage extends React.Component {
  render() {
    const { searching, datastores } = this.props;
    const activeDatastore = _.findWhere(datastores.datastores, { uid: datastores.active })

    if (activeDatastore.isMultisearch && searching) {
      return (
        <div>
          <SearchBox />
          <DatastoreNavigation />
          <DatastoreInfo activeDatastore={activeDatastore} />
          <div className="container container-large flex-container">
            <div className="main-container">
              <BentoboxList />
            </div>
          </div>
        </div>
      )
    }

    if (searching) {
      return (
        <div>
          <SearchBox />
          <DatastoreNavigation />
          <DatastoreInfo activeDatastore={activeDatastore} />
          <div className="container container-medium flex-container">
            <div className="side-container">
              <Filters />
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
        <DatastoreInfo activeDatastore={activeDatastore} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    searching: state.search.searching,
    datastores: state.datastores,
  };
}

export default connect(mapStateToProps)(DatastorePage);
