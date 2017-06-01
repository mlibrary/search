import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  setSearchQuery,
  searching
} from '../../../search/actions'
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

    console.log('handleURLState')
    console.log('urlState', urlState)
    console.log('location', location)
    console.log('query', query)
    console.log('props', this.props)
    console.log(' ')

    if (urlState) {
      if (urlState.query !== query) {
        this.props.setSearchQuery(urlState.query)
        this.props.searching(true)
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
    searching
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(URLSearchQueryWrapper);
