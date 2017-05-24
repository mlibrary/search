import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import qs from 'qs'

import {
  setSearchQuery
} from '../../actions'
import {
  runSearch
} from '../../../pride'
import {
  Icon
} from '../../../core';

class SearchBox extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // TODO: search box check to see if a search should be submitted on load
  }

  handleChange(query) {
    this.props.setSearchQuery(query)
  }

  handleSubmit(event) {
    event.preventDefault();

    runSearch()
  }

  render() {
    const { query } = this.props;

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
    setSearchQuery
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
