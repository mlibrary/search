import React from 'react';

const NarrowSearchTo = ({ handleChange, options }) => {
  return (
    <>
      {options.map((option) => {
        const { activeFilter, filters, label } = option;

        if (filters.length <= 1) {
          return null;
        }

        const slug = `narrow-search-to-${label.toLowerCase().replaceAll(' ', '-')}`;

        return (
          <fieldset className='narrow-search-to-dropdown-container' key={slug}>
            <legend className='visually-hidden'>Narrow Search Options</legend>
            <label htmlFor={slug}>
              {label}
            </label>
            <select
              className='narrow-search-to-dropdown'
              id={slug}
              onChange={(event) => {
                return handleChange({ uid: option.uid, value: event.target.value });
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

export default NarrowSearchTo;
