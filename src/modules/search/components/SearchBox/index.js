import React from 'react';
import { connect } from 'react-redux';
import { store } from '../../../../store';

import {
  setSearchQuery
} from '../../actions'

import {
  runSearchPride,
  syncSearchURL
} from '../../../../pride-interface'

import { Icon } from '../../../core';

class SearchBox extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { isSearching } = this.props

    if (!isSearching) {
      syncSearchURL()
    }
  }

  handleChange(query) {
    store.dispatch(setSearchQuery(query))
  }

  handleSubmit(event) {
    event.preventDefault();
    runSearchPride()
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

export default connect(mapStateToProps)(SearchBox);
