/** @jsxImportSource @emotion/react */
import React from 'react';
import { MEDIA_QUERIES } from '../../../reusable/umich-lib-core-temp';
import Icon from '../../../reusable/components/Icon';
import { MultipleChoice } from '../../../core';
import styled from '@emotion/styled';
import SearchByOptions from '../../../search/components/SearchByOptions';
import PropTypes from 'prop-types';

const StyledFieldSet = styled('fieldset')({
  [MEDIA_QUERIES.LARGESCREEN]: {
    textAlign: 'center'
  }
});

function FieldInput ({
  fieldedSearchIndex,
  fieldedSearch,
  fields,
  changeFieldedSearch,
  handleRemoveFieldedSearch,
  activeDatastore
}) {
  return (
    <StyledFieldSet className='y-spacing'>
      <legend className='offpage'>Search field {fieldedSearchIndex + 1}</legend>
      {fieldedSearchIndex === 0
        ? null
        : (
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
          <div
            css={{
              width: '100%',
              boxSizing: 'border-box'
            }}
          >
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
          </div>
          {fieldedSearchIndex > 0
            ? (
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
              )
            : null}
        </div>
      </div>
    </StyledFieldSet>
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
