import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import qs from 'qs'
import {
  withRouter,
  Route,
  Link
} from 'react-router-dom'

import {
  setSearchQuery,
  searching
} from '../../actions'
import {
  Icon
} from '../../../core';
import {
  AdvancedSearch
} from '../../../search'
import {
  isDatastoreAdvanced
} from '../../../pride'

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
    const { match, history, activeFilters } = this.props
    const { query } = this.state

    // Query is not empty
    if (query.length > 0) {
      const queryString = qs.stringify({
        query: query,
        filter: activeFilters
      }, {
        arrayFormat: 'repeat',
        encodeValuesOnly: true,
        allowDots: true,
        format : 'RFC1738'
      })

      const url = `/${match.params.datastoreSlug}?${queryString}`

      history.push(url)
    }
  }

  render() {
    const { match, activeDatastoreUid, location } = this.props
    const { query } = this.state

    const isAdvanced = isDatastoreAdvanced(activeDatastoreUid)

    return (
      <div className="search-box-container-full">
        <div className="container search-box-container" role="search">
          <form className="search-box-form" onSubmit={this.handleSubmit}>
            <div className="search-box">
              <label htmlFor="search-query" className="offpage">Search query</label>
              <input
                id="search-query"
                className="search-box-input"
                type="text"
                value={query}
                autoComplete="off"
                onChange={event => this.handleChange(event.target.value)}
              />
            {isAdvanced && (
              <Link to={`${match.url}/advanced${location.search}`} className="search-box-advanced-link"><Icon name="chevron-down" /></Link>
            )}
            </div>

            <button className="button search-box-button" type="submit"><Icon name="search"/>Search</button>
          </form>

          <Route path={`${match.url}/advanced`} exact render={() => (
            <AdvancedSearch
              handleBasicSearchQueryChange={this.handleChange}
              searchQueryFromURL={location.search}
            />
          )}/>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isSearching: state.search.searching,
    query: state.search.query,
    activeFilters: state.filters.active[state.datastores.active],
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
