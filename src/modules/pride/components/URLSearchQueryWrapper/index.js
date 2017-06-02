import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  setSearchQuery,
  searching
} from '../../../search/actions'
import {
  loadingRecords
} from '../../../records'
import {
  getStateFromURL,
  runSearch
} from '../../../pride'

class URLSearchQueryWrapper extends React.Component {
  componentWillMount() {
    this.handleURLState({
      query: this.props.query,
      location: this.props.location
    })
  }

  handleURLState({ query, location }) {
    const urlState = getStateFromURL({ location })

    if (urlState) {
      if (urlState.query !== query) {
        this.props.setSearchQuery(urlState.query)
        this.props.searching(true)
        this.props.loadingRecords(true)
        runSearch()
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    this.handleURLState({
      query: nextProps.query,
      location: nextProps.location
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
    location: state.router.location
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setSearchQuery,
    searching,
    loadingRecords
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(URLSearchQueryWrapper);
