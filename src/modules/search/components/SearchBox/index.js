/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import qs from 'qs'
import {
  withRouter,
  Link,
} from 'react-router-dom'
import _ from 'underscore'

import {
  Button,
  Icon,
  TextInput,
  Margins,
  SPACING
} from '@umich-lib/core'

import {
  setSearchQueryInput,
  searching
} from '../../actions'
import ReactGA from 'react-ga'

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
    const {
      match,
      history,
      queryInput,
      activeFilters,
      institution,
      sort,
      activeDatastore
    } = this.props

    ReactGA.event({
      action: 'Click',
      category: 'Search Button',
      label: `Search ${activeDatastore.name}`
    })

    const library = activeDatastore.uid === 'mirlyn' ? institution.active : undefined

    // Query is not empty
    if (queryInput.length > 0) {
      const queryString = qs.stringify({
        query: queryInput,
        filter: activeFilters,
        library,
        sort
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
    const { match, location, queryInput, isAdvanced, activeDatastore } = this.props

    return (
      <div css={{
        padding: `${SPACING['S']} 0`
      }}>
        <Margins>
          <form
            onSubmit={this.handleSubmit}
            role="search"
            css={{
              display: 'flex',
              maxWidth: '42rem',
              margin: '0 auto'
            }}
          >
            <TextInput
              id="search-box"
              label="query"
              hideLabel
              value={queryInput}
              spellCheck="false"
              onChange={event => this.handleChange(event.target.value)}
            />
            <Button kind="primary" css={{
              whiteSpace: 'nowrap',
              marginLeft: SPACING['XS']
            }}><Icon icon="search" size={20} /> Search</Button>
          </form>
        </Margins>
      </div>
    )

    return (
      <div className="search-box-container-full">
        <div className="search-box-container">
          <form className="search-box-form" onSubmit={this.handleSubmit} role="search" id="search-box">
            <div className="search-box">
              <input
                id="search-query"
                className="search-box-input"
                type="search"
                aria-label="search text"
                value={queryInput}
                spellCheck="false"
                onChange={event => this.handleChange(event.target.value)}
              />
              <Button><Icon icon="search" />Search</Button>
            </div>

            {isAdvanced && (
              <div className="search-box-advanced">
                <Link to={`/${match.params.datastoreSlug}/advanced${location.search}`} className="search-box-advanced-link">
                  <span className="offpage">{activeDatastore.name}</span>
                  <span>Advanced</span>
                  <span className="offpage">Search</span>
                </Link>
              </div>
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
    activeDatastore: _.findWhere(state.datastores.datastores, { uid: state.datastores.active }),
    location: state.router.location,
    isAdvanced: state.advanced[state.datastores.active] ? true : false,
    institution: state.institution,
    datastores: state.datastores,
    sort: state.search.sort[state.datastores.active]
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
