/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import qs from "qs";
import { withRouter, Link } from "react-router-dom";
import _ from "underscore";
import VisuallyHidden from '@reach/visually-hidden';
import { Button } from "@umich-lib/core";
import { COLORS, SPACING } from "../../../reusable/umich-lib-core-temp";

import { setSearchQueryInput, searching } from "../../actions";
import { Icon } from "../../../core";
import ReactGA from "react-ga";

/**
 * 
 * Browse developer comments
 * =====
 * 
 * Plan:
 * (1) make it work, even if it's ugly
 *     [ ] Add active field to SearchBox state, so that it can be
 *         included in the URL with `qs.stringify`.
 *         Ignore `all_fields`.
 * (2) clean it up
 *     [ ] Convert to a function (not a class)
 *     [ ] Remove sass (class names) and use Emotion
 *         with design tokens.
 * (3) Get feedback from team.
 *     [ ] Share with team for feedback.
 * 
 * This component will be rewritten without classes and without
 * `bindActionCreators`, since that is an older pattern not recommened
 * anymore for new development. So now is the chance to update
 * this one.
 * 
 * We need to redesign the Search Box to match the new Browse designs.
 * 
 * And add conditionals to what datastore is active so that this
 * search box can change accordingly.
 * 
 * 
 */

class SearchBox extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onBackButtonEvent = this.onBackButtonEvent.bind(this);
  }

  handleChange(query) {
    this.props.setSearchQueryInput(query);
  }

  onBackButtonEvent(e) {
    const { query } = this.props;
    this.handleChange(query);
  }

  componentDidMount() {
    window.onpopstate = this.onBackButtonEvent;
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
      activeDatastore,
    } = this.props;

    ReactGA.event({
      action: "Click",
      category: "Search Button",
      label: `Search ${activeDatastore.name}`,
    });

    const library =
      activeDatastore.uid === "mirlyn" ? institution.active : undefined;

    // Query is not empty
    if (queryInput.length > 0) {
      const queryString = qs.stringify(
        {
          query: queryInput,
          filter: activeFilters,
          library,
          sort
        },
        {
          arrayFormat: "repeat",
          encodeValuesOnly: true,
          allowDots: true,
          format: "RFC1738",
        }
      );

      const url = `/${match.params.datastoreSlug}?${queryString}`;

      history.push(url);
    }
  }

  render() {
    const {
      match,
      location,
      queryInput,
      isAdvanced,
      activeDatastore,
      fields
    } = this.props;

    return (
      <div className="search-box-container-full">
        <div className="search-box-container">
          <form
            className="search-box-form"
            onSubmit={this.handleSubmit}
            role="search"
            id="search-box"
          >
            <div className="search-box">
              {activeDatastore.uid === 'mirlyn' && (
                <select css={{
                  fontFamily: '"OpenSans", "Source Sans Pro"',
                  backgroundColor: "#F7F8F9",
                  border: "1px solid rgba(18,109,193,0.4)",
                  fontSize: "1em",
                  borderRadius: "4px",
                  paddingLeft: ".5em",
                  margin: "0"
                }}>
                  <optgroup label="Fields">
                    {fields.map(field => <option value={field.uid}>{field.name}</option>)}
                  </optgroup>

                  <optgroup label="Browse">
                    <option value="lc-call-number">Browse by LC call number</option>
                  </optgroup>
                </select>
              )}
              
              <input
                id="search-query"
                css={{
                  margin: '0 ' + SPACING['XS'] + "!important"
                }}
                type="search"
                aria-label="search text"
                value={queryInput}
                spellCheck="false"
                data-hj-allow
                onChange={(event) => this.handleChange(event.target.value)}
              />
              <Button
                type="submit"
                css={{
                  margin: 0,
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Icon name="search" />
                <VisuallyHidden>
                  <span className="search-box-button-text">Search</span>
                </VisuallyHidden>
              </Button>
            </div>
            
            {isAdvanced && (
              <div className="search-box-advanced">
                <Link
                  to={`/${match.params.datastoreSlug}/advanced${location.search}`}
                  className="search-box-advanced-link"
                >
                  <span className="offpage">{activeDatastore.name}</span>
                  <span>Advanced</span>
                  <span className="offpage">Search</span>
                </Link>
              </div>
            )}
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isSearching: state.search.searching,
    query: state.search.query,
    queryInput: state.search.queryInput,
    activeFilters: state.filters.active[state.datastores.active],
    activeDatastore: _.findWhere(state.datastores.datastores, {
      uid: state.datastores.active,
    }),
    location: state.router.location,
    isAdvanced: state.advanced[state.datastores.active] ? true : false,
    institution: state.institution,
    datastores: state.datastores,
    sort: state.search.sort[state.datastores.active],
    fields: state.advanced[state.datastores.active].fields,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setSearchQueryInput,
      searching,
    },
    dispatch
  );
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SearchBox)
);
