import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import qs from 'qs'
import {
  withRouter,
  Link,
} from 'react-router-dom'
import _ from 'underscore'

import history from '../../../../history'
import {
  setSearchQuery,
  setSearchQueryInput,
  searching
} from '../../actions'
import {
  Icon
} from '../../../core';

class SearchBox extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onBackButtonEvent = this.onBackButtonEvent.bind(this);
  }

  handleChange(query) {
    this.props.setSearchQueryInput(query)
  }

  onBackButtonEvent(e) {
    const { query } = this.props
    this.handleChange(query)
  }

  componentDidMount() {
    window.onpopstate = this.onBackButtonEvent
  }

  handleSubmit(event) {
    event.preventDefault();
    const { match, history, queryInput, activeFilters, institution } = this.props

    // Query is not empty
    if (queryInput.length > 0) {
      const queryString = qs.stringify({
        query: queryInput,
        filter: activeFilters,
        library: institution.active
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
    const { match, location, query, queryInput, isAdvanced, datastores } = this.props
    const activeDatastore = _.findWhere(datastores.datastores, { uid: datastores.active })

    if (this.props.query) {
      document.title = `${this.props.query} · ${activeDatastore.name} · Library Search`
    } else {
      document.title = `${activeDatastore.name} · Library Search`
    }

    return (
      <div className="search-box-container-full">
        <div className="search-box-container" role="search">
          <form className="search-box-form" onSubmit={this.handleSubmit}>
            <div className="search-box">
              <label htmlFor="search-query" className="offpage">Search query</label>
              <input
                id="search-query"
                className="search-box-input"
                type="text"
                value={queryInput}
                autoComplete="off"
                onChange={event => this.handleChange(event.target.value)}
              />
            </div>

            <button className="button search-box-button" type="submit"><Icon name="search"/><span className="search-box-button-text">Search</span></button>

            {isAdvanced && (
              <Link to={`/${match.params.datastoreSlug}/advanced${location.search}`} className="search-box-advanced-link">
                Advanced<span className="offpage">Search Options</span>
              </Link>
            )}
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
    queryInput: state.search.queryInput,
    activeFilters: state.filters.active[state.datastores.active],
    activeDatastoreUid: state.datastores.active,
    location: state.router.location,
    isAdvanced: state.advanced[state.datastores.active] ? true : false,
    institution: state.institution,
    datastores: state.datastores
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setSearchQueryInput,
    searching
  }, dispatch)
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SearchBox)
);
