import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Pagination from './presenter'

import {
  stringifySearchQueryForURL
} from '../../../pride'

class PaginationContainer extends React.Component {
  handlePreviousPage() {
    console.log('handlePreviousPage')
    console.log('this.props', this.props)
  }
  handleNextPage() {
    const queryString = stringifySearchQueryForURL({
      query: this.props.search.query,
      filters: this.props.filters,
      page: this.props.search.page + 1
    })
    console.log('handleNextPage')
    console.log('redirecting w/ new queryString', queryString)
  }
  render() {
    const { records } = this.props;

    if (!records) {
      return null
    }

    return <Pagination
        handlePreviousPage={this.handlePreviousPage.bind(this)}
        handleNextPage={this.handleNextPage.bind(this)}
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
