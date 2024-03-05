import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { findWhere } from 'underscore';
import { stringifySearchQueryForURL } from '../../../pride';
import PropTypes from 'prop-types';

const InstitutionSelect = ({ type }) => {
  const history = useHistory();
  const {
    activeDatastore,
    activeFilters,
    institution,
    searchQuery
  } = useSelector((state) => {
    return {
      activeDatastore: findWhere(state.datastores.datastores, {
        uid: state.datastores.active
      }),
      activeFilters: state.filters.active[state.datastores.active],
      institution: state.institution,
      searchQuery: state.search.query
    };
  });

  if (activeDatastore.uid !== 'mirlyn') {
    return null;
  }

  const { active, defaultInstitution, options } = institution;

  const handleChange = (event) => {
    const queryString = stringifySearchQueryForURL({
      query: searchQuery,
      filter: activeFilters,
      library: event.target.value
    });

    history.push(`/${activeDatastore.slug}?${queryString}`);
  };

  if (type === 'switch') {
    const selectedOption = active || defaultInstitution;

    return (
      <fieldset className='radio-fieldset'>
        <legend className='visually-hidden'>Institutions</legend>
        {options.map((option, index) => {
          return (
            <span key={index}>
              <input
                id={`library-${index}`}
                type='radio'
                className='radio-input'
                checked={selectedOption === option}
                value={option}
                onChange={handleChange}
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
  }

  return (
    <fieldset className='institution-select-container'>
      <legend className='visually-hidden'>Institutions</legend>
      <label
        className='institution-select-label institution-select-label-text'
        htmlFor='library-scope'
      >
        Library Scope
      </label>
      <select
        className='dropdown'
        value={active || defaultInstitution}
        onChange={handleChange}
        id='library-scope'
        autoComplete='off'
      >
        {options.map((option, index) => {
          return (
            <option value={option} key={index}>
              {option}
            </option>
          );
        })}
      </select>
    </fieldset>
  );
};

InstitutionSelect.propTypes = {
  type: PropTypes.string
};

export default InstitutionSelect;
