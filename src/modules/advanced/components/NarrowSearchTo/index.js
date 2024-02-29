import React from 'react';
import PropTypes from 'prop-types';

const NarrowSearchTo = ({ options, handleChange }) => {
  return (
    <>
      {options.map((option) => {
        const { filters, label, activeFilter } = option;

        if (filters.length <= 1) return null;

        const slug = `narrow-search-to-${label.toLowerCase().replaceAll(' ', '-')}`;

        return (
          <fieldset className='narrow-search-to-dropdown-container' key={slug}>
            <legend className='visually-hidden'>Narrow Search Options</legend>
            <label htmlFor={slug}>
              {label}
            </label>
            <select
              className='dropdown narrow-search-to-dropdown'
              id={slug}
              onChange={(e) => {
                return handleChange({ uid: option.uid, value: e.target.value });
              }}
              value={activeFilter}
              autoComplete='off'
            >
              {filters.map((opt, index) => {
                return (
                  <option key={`${slug}-${index}`} value={opt}>
                    {opt}
                  </option>
                );
              })}
            </select>
          </fieldset>
        );
      })}
    </>
  );
};

NarrowSearchTo.propTypes = {
  options: PropTypes.array,
  handleChange: PropTypes.func
};

export default NarrowSearchTo;
