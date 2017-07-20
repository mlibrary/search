import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Pagination from './presenter'

import {
  stringifySearchQueryForURL
} from '../../../pride'

class PaginationContainer extends React.Component {
  prevPageURL() {
    const { search, filters, activeDatastoreUid, history } = this.props
    const query = search.query
    const page = search.page[activeDatastoreUid]

    // Only go to prev page if you're past page 1.
    if (page > 1) {
      const queryString = stringifySearchQueryForURL({
        query,
        filters,
        page: (page - 1) === 1 ? undefined : (page - 1)
      })

      if (queryString.length > 0) {
        return `${history.location.pathname}?${queryString}`
      }
    }

    return undefined
  }
  nextPageURL() {
    const { search, filters, activeDatastoreUid, history } = this.props
    const query = search.query
    const page = search.page[activeDatastoreUid]

    const queryString = stringifySearchQueryForURL({
      query,
      filters,
      page: !page ? 2 : page + 1
    })

    if (queryString.length > 0) {
      return `${history.location.pathname}?${queryString}`
    }
  }
  render() {
    const { records } = this.props;

    if (!records) {
      return null
    }

    return <Pagination
        prevPageURL={this.prevPageURL()}
        nextPageURL={this.nextPageURL()}
      />
  }
}

function mapStateToProps(state) {
  return {
    records: state.records.records[state.datastores.active],
    search: state.search,
    activeDatastoreUid: state.datastores.active,
    filters: state.filters.active[state.datastores.active],
  };
}

export default withRouter(
  connect(mapStateToProps)(PaginationContainer)
)
