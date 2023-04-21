import React from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';
import { withRouter } from 'react-router-dom';

import { stringifySearchQueryForURL } from '../../../pride';

class InstitutionSelect extends React.Component {
  handleChange (event) {
    const { searchQuery, activeFilters, activeDatastore, history } = this.props;

    const queryString = stringifySearchQueryForURL({
      query: searchQuery,
      filter: activeFilters,
      library: event.target.value
    });

    history.push(`/${activeDatastore.slug}?${queryString}`);
  }

  render () {
    const { activeDatastore, type } = this.props;
    const { active, defaultInstitution, options } = this.props.institution;

    // This feature is only for Mirlyn.
    if (activeDatastore.uid !== 'mirlyn') {
      return null;
    }

    if (type === 'switch') {
      const selectedOption = active || defaultInstitution;

      return (
        <fieldset className='radio-fieldset'>
          {options.map((option, index) => {
            return (
              <span key={index}>
                <input
                  id={`library-${index}`}
                  type='radio'
                  className='radio-input'
                  checked={selectedOption === option}
                  value={option}
                  onChange={(event) => {
                    return this.handleChange(event);
                  }}
                />
                <label
                  htmlFor={`library-${index}`}
                  className={`radio-label ${
                  selectedOption === option ? 'radio-selected' : ''
                }`}
                >
                  <span className='radio-label-text'>{option}</span>
                </label>
              </span>
            );
          })}
        </fieldset>
      );
    } else {
      return (
        <fieldset className='institution-select-container'>
          <label className='institution-select-label'>
            <span className='institution-select-label-text'>Library Scope</span>
            <select
              className='dropdown'
              value={active || defaultInstitution}
              onChange={(event) => {
                return this.handleChange(event);
              }}
            >
              {options.map((option, index) => {
                return (
                  <option value={option} key={index}>
                    {option}
                  </option>
                );
              })}
            </select>
          </label>
        </fieldset>
      );
    }
  }
}

function mapStateToProps (state) {
  return {
    activeDatastore: _.findWhere(state.datastores.datastores, {
      uid: state.datastores.active
    }),
    institution: state.institution,
    activeFilters: state.filters.active[state.datastores.active],
    searchQuery: state.search.query
  };
}

export default withRouter(connect(mapStateToProps)(InstitutionSelect));
