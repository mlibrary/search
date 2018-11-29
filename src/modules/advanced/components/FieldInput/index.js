import React from 'react'
import Icon from '@umich-lib/icon'
import {
  MultipleChoice
} from '../../../core'
import {
  MEDIA_QUERIES
} from '@umich-lib/styles'
import styled from 'react-emotion'
import TextInput from '@umich-lib/text-input'

const StyledFieldSet = styled('fieldset')({
  [MEDIA_QUERIES.LARGESCREEN]: {
    textAlign: 'center'
  }
})

const Dropdown = ({
  labelText,
  fieldedSearchIndex,
  options,
  selectedOption,
  handleOnFieldChange,
  multiple
}) => (
  <select
    aria-label={labelText ? labelText : 'dropdown'}
    className="dropdown advanced-field-select"
    value={selectedOption}
    multiple={multiple ? multiple : false}
    onChange={(event) => handleOnFieldChange({
      fieldedSearchIndex,
      selectedFieldUid: event.target.value,
    })}
  >
    {options.map((option, index) =>
      <option value={option.uid} key={index}>{option.name}</option>
    )}
  </select>
)

const FieldInput = ({
  fieldedSearchIndex,
  fieldedSearch,
  fields,
  handleFieldedSearchChange,
  handleRemoveFieldedSearch,
}) => (
  <StyledFieldSet className="y-spacing">
    <legend className="offpage">Search field {fieldedSearchIndex + 1}</legend>
    {fieldedSearchIndex === 0 ? null : (
      <MultipleChoice
        name={`search-field-${fieldedSearchIndex}-booleans`}
        heading={`Boolean operator for field ${fieldedSearchIndex} and field ${fieldedSearchIndex + 1}`}
        options={['AND', 'OR', 'NOT']}
        selectedIndex={fieldedSearch.booleanType}
        onMultipleChoiceChange={({ index }) => handleFieldedSearchChange({
          fieldedSearchIndex,
          booleanType: index
        })}
      />
    )}
    <div className="advanced-input-container">
      <Dropdown
        labelText={`Selected field ${fieldedSearchIndex + 1}`}
        options={fields}
        selectedOption={fieldedSearch.field}
        fieldedSearchIndex={fieldedSearchIndex}
        handleOnFieldChange={handleFieldedSearchChange}
      />
      <div className="advanced-input-remove-container">
        <TextInput
          id={`fielded-search-text-input-${fieldedSearchIndex + 1}`}
          placeholder={`Search Term ${fieldedSearchIndex + 1}`}
          value={fieldedSearch.query}
          labelText={`Search Term ${fieldedSearchIndex + 1}`}
          hideLabel
          onChange={(event) => handleFieldedSearchChange({
            fieldedSearchIndex,
            query: event.target.value
          })}
        />
        {fieldedSearchIndex > 0 ? (
          <button
            className="advanced-input-remove-button"
            type="button"
            onClick={handleRemoveFieldedSearch}>
              <Icon icon="close" size={24} /><span className="offpage">Remove Field {fieldedSearchIndex + 1}</span>
          </button>
        ) : null}
      </div>
    </div>
  </StyledFieldSet>
)

export default FieldInput