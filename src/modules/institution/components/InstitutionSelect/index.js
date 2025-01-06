import './styles.css';
import React from 'react';
import { stringifySearch } from '../../../search';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const InstitutionSelect = ({ activeDatastore }) => {
  const { slug, uid } = activeDatastore;
  const filter = useSelector((state) => {
    return state.filters.active[uid];
  });
  const { active, defaultInstitution, options } = useSelector((state) => {
    return state.institution;
  });
  const { query } = useSelector((state) => {
    return state.search;
  });
  const navigate = useNavigate();

  if (uid !== 'mirlyn') {
    return null;
  }

  const handleChange = (event) => {
    const queryString = stringifySearch({
      filter,
      library: event.target.value,
      query
    });

    navigate(`/${slug}?${queryString}`);
  };

  return (
    <fieldset className='institution-select-container margin-bottom__m padding-y__s padding-x__m'>
      <legend className='visually-hidden'>Institutions</legend>
      <label
        className='institution-select-label-text'
        htmlFor='library-scope'
      >
        Library Scope
      </label>
      <select
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

export default InstitutionSelect;
