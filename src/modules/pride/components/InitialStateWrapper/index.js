import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  withRouter
} from 'react-router-dom'

import {
  setSearchQuery,
  searching
} from '../../../search/actions'
import {
  getStateFromURL,
  runSearch
} from '../../../pride'

class InitialStateWrapper extends React.Component {
  componentDidMount() {
    /*
      When mounted this component will
      check for state in URL.
    */
    const urlState = getStateFromURL({ location: this.props.location })

    if (urlState && urlState.query) {
      this.props.setSearchQuery(urlState.query)
      this.props.searching(true)
      runSearch()
    }
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
    query: state.search.query
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setSearchQuery,
    searching
  }, dispatch)
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(InitialStateWrapper)
);
