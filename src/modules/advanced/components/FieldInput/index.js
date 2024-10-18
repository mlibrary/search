import React, { memo, useCallback } from 'react';
import Icon from '../../../reusable/components/Icon';
import PropTypes from 'prop-types';
import SearchByOptions from '../../../search/components/SearchByOptions';
import { setFieldedSearch } from '../../../advanced';
import { useDispatch } from 'react-redux';

const FieldInput = ({
  activeDatastore,
  booleanTypes,
  fieldedSearch,
  fieldedSearchIndex,
  fields,
  handleRemoveFieldedSearch
}) => {
  const dispatch = useDispatch();

  const notFirst = fieldedSearchIndex > 0;

  const changeFieldedSearch = useCallback(
    ({ booleanType, query, selectedFieldUid }) => {
      dispatch(setFieldedSearch({
        booleanType,
        datastoreUid: activeDatastore.uid,
        fieldedSearchIndex,
        query,
        selectedFieldUid
      }));
    },
    [dispatch, activeDatastore.uid, fieldedSearchIndex]
  );

  const handleBooleanTypeChange = useCallback((index) => {
    changeFieldedSearch({ booleanType: index });
  }, [changeFieldedSearch]);

  const handleFieldChange = useCallback((event) => {
    changeFieldedSearch({ selectedFieldUid: event.target.value });
  }, [changeFieldedSearch]);

  const handleQueryChange = useCallback((event) => {
    changeFieldedSearch({ query: event.target.value });
  }, [changeFieldedSearch]);

  return (
    <fieldset className='y-spacing advanced-fieldset'>
      <legend className='visually-hidden'>Search field {fieldedSearchIndex + 1}</legend>
      {notFirst && (
        <fieldset className='flex__responsive'>
          <legend className='visually-hidden'>Boolean operator for field {fieldedSearchIndex} and field {fieldedSearchIndex + 1}</legend>
          {booleanTypes.map((option, index) => {
            return (
              <label key={index}>
                <input
                  type='radio'
                  name={`search-field-${fieldedSearchIndex}-booleans`}
                  value={option}
                  checked={fieldedSearch.booleanType === index}
                  onChange={() => {
                    return handleBooleanTypeChange(index);
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
          onChange={handleFieldChange}
          autoComplete='off'
        >
          <SearchByOptions activeDatastore={activeDatastore} fields={fields} />
        </select>
        <div className='advanced-input-remove-container'>
          <input
            type='text'
            value={fieldedSearch.query}
            data-hj-allow
            onChange={handleQueryChange}
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
  booleanTypes: PropTypes.array,
  fieldedSearch: PropTypes.object,
  fieldedSearchIndex: PropTypes.number,
  fields: PropTypes.array,
  handleRemoveFieldedSearch: PropTypes.func
};

export default memo(FieldInput);
