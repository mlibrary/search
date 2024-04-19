import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { stringifySearch } from '../../../search';
import PropTypes from 'prop-types';

const InstitutionSelect = ({ activeDatastore, institution }) => {
  const { uid, slug } = activeDatastore;
  const filter = useSelector((state) => {
    return state.filters.active[uid];
  });
  const { query } = useSelector((state) => {
    return state.search;
  });
  const navigate = useNavigate();

  if (uid !== 'mirlyn') return null;

  const { active, defaultInstitution, options } = institution;

  const handleChange = (event) => {
    const queryString = stringifySearch({
      query,
      filter,
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
