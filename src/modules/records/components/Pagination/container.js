import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Pagination from './presenter'

import {
  stringifySearchQueryForURL
} from '../../../pride'

class PaginationContainer extends React.Component {
  prevPageURL() {
    const { search, filters, activeDatastoreUid, history, institution } = this.props
    const query = search.query
    const page = search.page[activeDatastoreUid]
    const sort = search.sort[activeDatastoreUid]
    const library = activeDatastoreUid === 'mirlyn' ? institution.active : undefined


    // Only go to prev page if you're past page 1.
    if (page > 1) {
      const queryString = stringifySearchQueryForURL({
        query,
        filter: filters,
        page: (page - 1) === 1 ? undefined : (page - 1),
        library,
        sort
      })

      if (queryString.length > 0) {
        return `${history.location.pathname}?${queryString}`
      }
    }

    return undefined
  }

  nextPageURL() {
    const { search, filters, activeDatastoreUid, history, institution } = this.props
    const query = search.query
    const page = search.page[activeDatastoreUid] ? search.page[activeDatastoreUid] : 1
    const data = search.data[activeDatastoreUid]
    const sort = search.sort[activeDatastoreUid]
    const library = activeDatastoreUid === 'mirlyn' ? institution.active : undefined

    if ((data.totalPages === 0) || (data.page === data.totalPages)) {
      return undefined
    }

    const queryString = stringifySearchQueryForURL({
      query,
      filter: filters,
      page: page + 1,
      library,
      sort,
    })

    if (queryString.length > 0) {
      return `${history.location.pathname}?${queryString}`
    }

    return undefined
  }

  scrollToTop() {
    if (window) {
      window.scrollTo(0, 0)
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
        scrollToTop={this.scrollToTop}
      />
  }
}

function mapStateToProps(state) {
  return {
    records: state.records.records[state.datastores.active],
    search: state.search,
    activeDatastoreUid: state.datastores.active,
    filters: state.filters.active[state.datastores.active],
    institution: state.institution
  };
}

export default withRouter(
  connect(mapStateToProps)(PaginationContainer)
)
