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
  clearActiveFilters
} from '../../../filters'
import {
  getStateFromURL,
  runSearch,
  switchPrideToDatastore,
  getDatastoreUidBySlug
} from '../../../pride'

class URLSearchQueryWrapper extends React.Component {
  constructor(props) {
    super(props)

    this.handleURLState = this.handleURLState.bind(this)
  }

  handleURLState({ datastoreUid, query, activeFilters, location }) {
    const urlState = getStateFromURL({ location })
    let shouldRunSearch = false

    if ((Object.keys(urlState).length > 0) && datastoreUid) {
      if (urlState.query !== query) {
        this.props.setSearchQuery(urlState.query)
        shouldRunSearch = true
      }

      if (!_.isEqual(urlState.filter, activeFilters)) {
        if (urlState.filter) {
          this.props.setActiveFilters({
            datastoreUid,
            filters: urlState.filter
          })
        } else {
          this.props.clearActiveFilters({
            datastoreUid
          })
        }
        shouldRunSearch = true
      }

      if (shouldRunSearch) {
        runSearch()
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const datastoreUid = getDatastoreUidBySlug(nextProps.match.params.datastoreSlug)

    if (this.props.datastoreUid !== datastoreUid) {
      switchPrideToDatastore(datastoreUid)
    }

    this.handleURLState({
      query: nextProps.query,
      activeFilters: nextProps.activeFilters[datastoreUid],
      location: nextProps.location,
      datastoreUid: datastoreUid
    })
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
    f: state.filters.active,
    activeFilters: state.filters.active,
    location: state.router.location,
    datastoreUid: state.datastores.active
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setSearchQuery,
    setActiveFilters,
    clearActiveFilters,
    searching,
    loadingRecords
  }, dispatch)
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(URLSearchQueryWrapper)
)
