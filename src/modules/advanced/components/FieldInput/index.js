import React from 'react';
import { MultipleChoice } from '../../../core';
import SearchByOptions from '../../../search/components/SearchByOptions';
import Icon from '../../../reusable/components/Icon';
import PropTypes from 'prop-types';

function FieldInput ({
  fieldedSearchIndex,
  fieldedSearch,
  fields,
  changeFieldedSearch,
  handleRemoveFieldedSearch,
  activeDatastore
}) {
  const notFirst = fieldedSearchIndex > 0;

  return (
    <fieldset className='y-spacing advanced-fieldset'>
      <legend className='offpage'>Search field {fieldedSearchIndex + 1}</legend>
      {notFirst && (
        <MultipleChoice
          name={`search-field-${fieldedSearchIndex}-booleans`}
          heading={`Boolean operator for field ${fieldedSearchIndex} and field ${fieldedSearchIndex + 1}`}
          options={['AND', 'OR', 'NOT']}
          selectedIndex={fieldedSearch.booleanType}
          onMultipleChoiceChange={({ index }) => {
            return changeFieldedSearch({
              fieldedSearchIndex,
              booleanType: index
            });
          }}
        />
      )}
      <div className='advanced-input-container'>
        <select
          aria-label={`Selected field ${fieldedSearchIndex + 1}`}
          className='dropdown advanced-field-select'
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
  fieldedSearchIndex: PropTypes.number,
  fieldedSearch: PropTypes.object,
  fields: PropTypes.array,
  changeFieldedSearch: PropTypes.func,
  handleRemoveFieldedSearch: PropTypes.func,
  activeDatastore: PropTypes.object
};

export default FieldInput;
