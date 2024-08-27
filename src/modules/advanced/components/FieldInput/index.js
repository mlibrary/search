import Icon from '../../../reusable/components/Icon';
import PropTypes from 'prop-types';
import React from 'react';
import SearchByOptions from '../../../search/components/SearchByOptions';

const FieldInput = ({
  activeDatastore,
  changeFieldedSearch,
  fieldedSearch,
  fieldedSearchIndex,
  fields,
  handleRemoveFieldedSearch
}) => {
  const notFirst = fieldedSearchIndex > 0;

  return (
    <fieldset className='y-spacing advanced-fieldset'>
      <legend className='visually-hidden'>Search field {fieldedSearchIndex + 1}</legend>
      {notFirst && (
        <fieldset className='flex__responsive'>
          <legend className='visually-hidden'>Boolean operator for field {fieldedSearchIndex} and field {fieldedSearchIndex + 1}</legend>
          {['AND', 'OR', 'NOT'].map((option, index) => {
            return (
              <label key={index}>
                <input
                  type='radio'
                  name={`search-field-${fieldedSearchIndex}-booleans`}
                  value={option}
                  checked={fieldedSearch.booleanType === index}
                  onChange={() => {
                    return changeFieldedSearch({
                      booleanType: index,
                      fieldedSearchIndex
                    });
                  }}
                />
                {option}
              </label>
            );
          })}
        </fieldset>
      )}
      <div className='advanced-input-container'>
        <select
          aria-label={`Selected field ${fieldedSearchIndex + 1}`}
          className='advanced-field-select'
          value={fieldedSearch.field}
          onChange={(event) => {
            return changeFieldedSearch({
              fieldedSearchIndex,
              selectedFieldUid: event.target.value
            });
          }}
          autoComplete='off'
        >
          <SearchByOptions activeDatastore={activeDatastore} fields={fields} />
        </select>
        <div className='advanced-input-remove-container'>
          <input
            type='text'
            value={fieldedSearch.query}
            data-hj-allow
            onChange={(event) => {
              return changeFieldedSearch({
                fieldedSearchIndex,
                query: event.target.value
              });
            }}
            autoComplete='on'
            aria-label={`Search Term ${fieldedSearchIndex + 1}`}
          />
          {notFirst && (
            <button
              className='advanced-input-remove-button'
              type='button'
              onClick={handleRemoveFieldedSearch}
            >
              <Icon icon='close' size={24} />
              <span className='offpage'>
                Remove Field {fieldedSearchIndex + 1}
              </span>
            </button>
          )}
        </div>
      </div>
    </fieldset>
  );
};

FieldInput.propTypes = {
  activeDatastore: PropTypes.object,
  changeFieldedSearch: PropTypes.func,
  fieldedSearch: PropTypes.object,
  fieldedSearchIndex: PropTypes.number,
  fields: PropTypes.array,
  handleRemoveFieldedSearch: PropTypes.func
};

export default FieldInput;
