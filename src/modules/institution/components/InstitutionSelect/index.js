import React from "react";
import { connect } from "react-redux";
import _ from "underscore";
import { withRouter } from "react-router-dom";
import ReactGA from "react-ga";

import { stringifySearchQueryForURL } from "../../../pride";

class InstitutionSelect extends React.Component {
  handleChange(event) {
    const { searchQuery, activeFilters, activeDatastore, history } = this.props;

    const queryString = stringifySearchQueryForURL({
      query: searchQuery,
      filter: activeFilters,
      library: event.target.value,
    });

    ReactGA.event({
      action: "Select",
      category: "Filter",
      label: `Change Scope to ${event.target.value}`,
    });

    history.push(`/${activeDatastore.slug}?${queryString}`);
  }

  render() {
    const { activeDatastore, type } = this.props;
    const { active, defaultInstitution, options } = this.props.institution;

    // This feature is only for Mirlyn.
    if (activeDatastore.uid !== "mirlyn") {
      return null;
    }

    if (type === "switch") {
      const selectedOption = active ? active : defaultInstitution;

      return (
        <fieldset className="radio-fieldset">
          {options.map((option, index) => (
            <span key={index}>
              <input
                id={`library-${index}`}
                type="radio"
                className="radio-input"
                checked={selectedOption === option ? true : false}
                value={option}
                onChange={(event) => this.handleChange(event)}
              />
              <label
                htmlFor={`library-${index}`}
                className={`radio-label ${
                  selectedOption === option ? "radio-selected" : ""
                }`}
              >
                <span className="radio-label-text">{option}</span>
              </label>
            </span>
          ))}
        </fieldset>
      );
    } else {
      return (
        <fieldset className="institution-select-container">
          <label className="institution-select-label">
            <span className="institution-select-label-text">Library Scope</span>
            <select
              className="dropdown"
              value={active ? active : defaultInstitution}
              onChange={(event) => this.handleChange(event)}
            >
              {options.map((option, index) => (
                <option value={option} key={index}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </fieldset>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    activeDatastore: _.findWhere(state.datastores.datastores, {
      uid: state.datastores.active,
    }),
    institution: state.institution,
    activeFilters: state.filters.active[state.datastores.active],
    searchQuery: state.search.query,
  };
}

export default withRouter(connect(mapStateToProps)(InstitutionSelect));
