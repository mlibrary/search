import PropTypes from 'prop-types';
import React from 'react';

const NarrowSearchTo = ({ handleChange, options }) => {
  return options
    .filter(({ filters }) => {
      return filters.length > 1;
    })
    .map(({ activeFilter, filters, label, uid }, index) => {
      const slug = `narrow-search-to-${label.toLowerCase().replaceAll(' ', '-')}`;
      return (
        <fieldset className={`advanced-filter-fieldset ${index > 0 ? 'margin-top__xs' : ''}`} key={slug}>
          <legend className='visually-hidden'>Narrow Search Options</legend>
          <label htmlFor={slug}>{label}</label>
          <select
            id={slug}
            onChange={(event) => {
              return handleChange({ uid, value: event.target.value });
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
    });
};

NarrowSearchTo.propTypes = {
  handleChange: PropTypes.func,
  options: PropTypes.array
};

export default NarrowSearchTo;
