import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createSelector } from '@reduxjs/toolkit';
import { stringifySearchQueryForURL } from '../../../pride';
import PropTypes from 'prop-types';

const InstitutionSelect = ({ activeDatastore, institution }) => {
  const { uid, slug } = activeDatastore;
  const { activeFilters, searchQuery } = useSelector(createSelector(
    (state) => {
      return state.filters.active[uid];
    },
    (state) => {
      return state.search.query;
    },
    (activeFilters, searchQuery) => {
      return { activeFilters, searchQuery };
    }
  ));
  const navigate = useNavigate();

  if (uid !== 'mirlyn') {
    return null;
  }

  const { active, defaultInstitution, options } = institution;

  const handleChange = (event) => {
    const queryString = stringifySearchQueryForURL({
      query: searchQuery,
      filter: activeFilters,
      library: event.target.value
    });

    navigate(`/${slug}?${queryString}`);
  };

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
  activeDatastore: PropTypes.object,
  institution: PropTypes.object
};

export default InstitutionSelect;
