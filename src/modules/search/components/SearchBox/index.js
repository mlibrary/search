import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import qs from 'qs'
import {
  withRouter,
  Link,
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
    this.onBackButtonEvent = this.onBackButtonEvent.bind(this);
  }

  handleChange(query) {
    this.setState({ query })
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
    const { match, history, activeFilters, institution } = this.props
    const { query } = this.state

    // Query is not empty
    if (query.length > 0) {
      const queryString = qs.stringify({
        query: query,
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
    const { match, location, isAdvanced } = this.props
    const { query } = this.state

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
                value={query}
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
    activeFilters: state.filters.active[state.datastores.active],
    activeDatastoreUid: state.datastores.active,
    location: state.router.location,
    isAdvanced: state.advanced[state.datastores.active] ? true : false,
    institution: state.institution
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
