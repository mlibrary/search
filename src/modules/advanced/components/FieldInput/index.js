/** @jsx jsx */
import { jsx } from "@emotion/core";
import { MEDIA_QUERIES } from "../../../reusable/umich-lib-core-temp";
import Icon from "../../../reusable/components/Icon";
import { MultipleChoice } from "../../../core";
import styled from "@emotion/styled";
import SearchByOptions from "../../../search/components/SearchByOptions";

const StyledFieldSet = styled("fieldset")({
  [MEDIA_QUERIES.LARGESCREEN]: {
    textAlign: "center",
  },
});

const FieldInput = ({
  fieldedSearchIndex,
  fieldedSearch,
  fields,
  handleFieldedSearchChange,
  handleRemoveFieldedSearch,
  activeDatastore
}) => (
  <StyledFieldSet className="y-spacing">
    <legend className="offpage">Search field {fieldedSearchIndex + 1}</legend>
    {fieldedSearchIndex === 0 ? null : (
      <MultipleChoice
        name={`search-field-${fieldedSearchIndex}-booleans`}
        heading={`Boolean operator for field ${fieldedSearchIndex} and field ${
          fieldedSearchIndex + 1
        }`}
        options={["AND", "OR", "NOT"]}
        selectedIndex={fieldedSearch.booleanType}
        onMultipleChoiceChange={({ index }) =>
          handleFieldedSearchChange({
            fieldedSearchIndex,
            booleanType: index,
          })
        }
      />
    )}
    <div className="advanced-input-container">
      <select
        aria-label={`Selected field ${fieldedSearchIndex + 1}`}
        className="dropdown advanced-field-select"
        value={fieldedSearch.field}
        onChange={(event) =>
          handleFieldedSearchChange({
            fieldedSearchIndex,
            selectedFieldUid: event.target.value,
          })
        }
      >
        <SearchByOptions activeDatastore={activeDatastore} fields={fields} />
      </select>
      <div className="advanced-input-remove-container">
        <div
          css={{
            width: '100%',
            boxSizing: 'border-box'
          }}
        >
          <label
            htmlFor={`fielded-search-text-input-${fieldedSearchIndex + 1}`}
            className="offscreen"
          >
            Search Term {fieldedSearchIndex + 1}
          </label>
          <input
            type="text"
            id={`fielded-search-text-input-${fieldedSearchIndex + 1}`}
            placeholder={`Search Term ${fieldedSearchIndex + 1}`}
            value={fieldedSearch.query}
            data-hj-allow
            onChange={(event) =>
              handleFieldedSearchChange({
                fieldedSearchIndex,
                query: event.target.value,
              })
            }
          />
        </div>
        {fieldedSearchIndex > 0 ? (
          <button
            className="advanced-input-remove-button"
            type="button"
            onClick={handleRemoveFieldedSearch}
          >
            <Icon icon="close" size={24} />
            <span className="offpage">
              Remove Field {fieldedSearchIndex + 1}
            </span>
          </button>
        ) : null}
      </div>
    </div>
  </StyledFieldSet>
);

export default FieldInput;
