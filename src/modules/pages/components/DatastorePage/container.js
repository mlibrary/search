import React from 'react'
import { connect } from 'react-redux'
import { _ } from 'underscore'

import {
  SearchBox
} from '../../../search'
import {
  DatastoreNavigation,
  DatastoreInfo,
} from '../../../datastores'
import {
  Filters
} from '../../../filters'
import {
  RecordList,
  Pagination,
  BentoboxList,
} from '../../../records'
import {
  switchPrideToDatastore
} from '../../../pride'
import {
  Main
} from '../../../core'

class DatastorePageContainer extends React.Component {
  componentWillMount() {
    // Switch Pride to the appropriate datastore
    const { datastoreSlug } = this.props.match.params
    switchPrideToDatastore(datastoreSlug)
  }

  render() {
    const { searching, datastores } = this.props;
    const activeDatastore = _.findWhere(datastores.datastores, { uid: datastores.active })

    if (activeDatastore === undefined) {
      return null // LOADING TODO: Fade IN?
    }

    if (activeDatastore.isMultisearch && searching) {
      return <MultisearchSearching activeDatastore={activeDatastore}/>
    }

    if (searching) {
      return <SingleResultSearching activeDatastore={activeDatastore}/>
    }

    return <NotSearching activeDatastore={activeDatastore}/>
  }
}

const MultisearchSearching = ({ activeDatastore }) => (
  <Main>
    <SearchBox />
    <DatastoreNavigation />
    <DatastoreInfo activeDatastore={activeDatastore} />
    <div className="container container-large flex-container">
      <div className="main-container">
        <BentoboxList />
      </div>
    </div>
  </Main>
)

const SingleResultSearching = ({ activeDatastore }) => (
  <Main>
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
  </Main>
)

const NotSearching = ({ activeDatastore }) => (
  <Main>
    <SearchBox />
    <DatastoreNavigation />
    <DatastoreInfo activeDatastore={activeDatastore} />
  </Main>
)

function mapStateToProps(state) {
  return {
    searching: state.search.searching,
    datastores: state.datastores,
  };
}

export default connect(mapStateToProps)(DatastorePageContainer);
