import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import _ from 'underscore'

import {
  setSearchQuery,
  searching
} from '../../../search/actions'
import {
  loadingRecords
} from '../../../records'
import {
  setActiveFilters,
} from '../../../filters'
import {
  getStateFromURL,
  runSearch
} from '../../../pride'

class URLSearchQueryWrapper extends React.Component {
  constructor(props) {
    super(props)

    this.handleURLState = this.handleURLState.bind(this)
  }

  handleURLState({ datastoreUid, query, activeFilters, location }) {
    console.log('handleURLState')
    const urlState = getStateFromURL({ location })
    let shouldRunSearch = false

    if (urlState && datastoreUid) {
      /*
      console.log('datastoreUid', datastoreUid)
      console.log('query', query)
      console.log('filters', filters)
      console.log('location.search', location.search)
      */

      if (urlState.query !== query) {
        console.log('> SETTING SEARCH QUERY')
        this.props.setSearchQuery(urlState.query)
        shouldRunSearch = true
      }

      console.log('url filters', urlState.filter)
      console.log('active filters', activeFilters)

      if (!_.isEqual(urlState.filter, activeFilters)) {
        console.log('> SETTING ACTIVE FILTERS')
        this.props.setActiveFilters({
          datastoreUid,
          filters: urlState.filter
        })
        shouldRunSearch = true
      }

      if (shouldRunSearch) {
        console.log('> RUNNING SEARCH')
        runSearch()
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps')
    this.handleURLState({
      query: nextProps.query,
      activeFilters: nextProps.activeFilters,
      location: nextProps.location,
      datastoreUid: nextProps.datastoreUid
    })
    console.log('')
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    query: state.search.query,
    activeFilters: state.filters.active[state.datastores.active],
    location: state.router.location,
    datastoreUid: state.datastores.active
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setSearchQuery,
    setActiveFilters,
    searching,
    loadingRecords
  }, dispatch)
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(URLSearchQueryWrapper)
)
