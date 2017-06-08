import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
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
  componentWillMount() {
    this.handleURLState({
      query: this.props.query,
      location: this.props.location
    })
  }

  handleURLState({ datastoreUid, query, filters, location }) {
    const urlState = getStateFromURL({ location })
    let shouldRunSearch = false

    console.log('urlState', urlState)

    if (urlState) {
      if (urlState.query !== query) {
        this.props.setSearchQuery(urlState.query)
        shouldRunSearch = true
      }

      if (datastoreUid && !_.isEqual(urlState.filter, filters)) {
        this.props.setActiveFilters({
          datastoreUid,
          filters: urlState.filter
        })
        shouldRunSearch = true
      }

      if (shouldRunSearch) {
        runSearch()
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    this.handleURLState({
      query: nextProps.query,
      filters: nextProps.filters,
      location: nextProps.location,
      datastoreUid: nextProps.datastoreUid
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
    filters: state.filters.active[state.datastores.active],
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

export default connect(mapStateToProps, mapDispatchToProps)(URLSearchQueryWrapper);
