import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import qs from 'qs'
import {
  withRouter
} from 'react-router-dom'

import {
  setSearchQuery,
  searching
} from '../../actions'
import {
  Icon
} from '../../../core';

class SearchBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: this.props.query || ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(query) {
    this.setState({ query })
  }

  handleSubmit(event) {
    event.preventDefault();
    const { match, history } = this.props
    const { query } = this.state

    // Query is not empty
    if (query.length > 0) {
      const url = `${match.url}?${qs.stringify({query: query})}`

      history.push(url)
    }
  }

  render() {
    const { query } = this.state;

    return (
      <div className="search-box-container-full">
        <div className="container search-box-container" role="search">
          <form className="search-box" onSubmit={this.handleSubmit}>
            <label htmlFor="search-query" className="offpage">Search query</label>
            <input
              id="search-query"
              className="no-margin search-box-input"
              type="text"
              value={query}
              autoComplete="off"
              onChange={event => this.handleChange(event.target.value)}
            />
            <button className="button search-box-button" type="submit"><Icon name="search"/>Search</button>
          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isSearching: state.search.searching,
    query: state.search.query,
    activeDatastoreUid: state.datastores.active
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setSearchQuery,
    searching
  }, dispatch)
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SearchBox)
);
