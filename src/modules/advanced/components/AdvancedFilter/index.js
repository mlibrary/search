import React from 'react';
import { Multiselect, DateRangeInput } from '../../../core';
import { Checkbox } from '../../../reusable';
import NarrowSearchTo from '../NarrowSearchTo';
import PropTypes from 'prop-types';

const getIsCheckboxFilterChecked = ({ advancedFilter }) => {
  const hasActiveFilter = advancedFilter.activeFilters && advancedFilter.activeFilters.length > 0;

  if (!hasActiveFilter && advancedFilter.conditions.default === 'checked') {
    return true;
  } else if (hasActiveFilter) {
    // Compare active filters to configured checked conditions
    if (advancedFilter.activeFilters[0] === advancedFilter.conditions.checked) {
      return true;
    }
  }

  return false;
};

const getDateRangeValue = ({ beginDateQuery, endDateQuery, selectedRange }) => {
  switch (selectedRange) {
    case 'Before':
      if (!endDateQuery) {
        return undefined;
      }
      return `before ${endDateQuery}`;
    case 'After':
      if (!beginDateQuery) {
        return undefined;
      }
      return `after ${beginDateQuery}`;
    case 'Between':
      if (!beginDateQuery || !endDateQuery) {
        return undefined;
      }
      return `${beginDateQuery} to ${endDateQuery}`;
    case 'In':
      if (!beginDateQuery) {
        return undefined;
      }
      return beginDateQuery;
    default:
      return undefined;
  }
};

const getStateDateRangeValues = ({ advancedFilter }) => {
  if (advancedFilter.activeFilters && advancedFilter.activeFilters.length > 0) {
    const filterValue = advancedFilter.activeFilters[0];

    // For splitting string into before, after, between, and in values

    // Before
    if (filterValue.indexOf('before') !== -1) {
      const values = filterValue.split('before');

      return {
        stateSelectedRangeOption: 0,
        stateEndQuery: values[1]
      };
    }

    // After
    if (filterValue.indexOf('after') !== -1) {
      const values = filterValue.split('after');

      return {
        stateSelectedRangeOption: 1,
        stateBeginQuery: values[1]
      };
    }

    // Between
    if (filterValue.indexOf('to') !== -1) {
      const values = filterValue.split('to');

      return {
        stateSelectedRangeOption: 2,
        stateBeginQuery: values[0],
        stateEndQuery: values[1]
      };
    }

    // In or other
    return {
      stateSelectedRangeOption: 3,
      stateBeginQuery: filterValue
    };
  }

  return {
    stateSelectedRangeOption: 0,
    stateBeginQuery: '',
    stateEndQuery: ''
  };
};

const AdvancedFilter = ({
  advancedFilter,
  changeAdvancedFilter
}) => {
  if (advancedFilter.type === 'scope_down') {
    return (
      <NarrowSearchTo
        handleChange={(option) => {
          return changeAdvancedFilter({
            filterType: advancedFilter.type,
            filterGroupUid: option.uid,
            filterValue: option.value
          });
        }}
        options={advancedFilter.options}
      />
    );
  }
  if (advancedFilter.type === 'checkbox') {
    const isChecked = getIsCheckboxFilterChecked({ advancedFilter });
    const value = isChecked ? advancedFilter.conditions.unchecked : advancedFilter.conditions.checked;

    return (
      <Checkbox
        handleClick={() => {
          return changeAdvancedFilter({
            filterType: advancedFilter.type,
            filterGroupUid: advancedFilter.uid,
            filterValue: value
          });
        }}
        isChecked={isChecked}
        label={advancedFilter.name}
      />
    );
  }
  if (advancedFilter.type === 'multiple_select') {
    const options = advancedFilter.filters.map((option) => {
      return {
        checked: option.isActive,
        value: option.value,
        name: option.value
      };
    });

    return (
      <Multiselect
        options={options}
        filterGroupUid={advancedFilter.uid}
        descriptionText={`Select one or more checkboxes to narrow your results to items that match all of your ${advancedFilter.name.toLowerCase()} selections.`}
        handleSelection={(index, option) => {
          return changeAdvancedFilter({
            filterType: advancedFilter.type,
            filterGroupUid: advancedFilter.uid,
            filterValue: option.value
          });
        }}
      />
    );
  }
  if (advancedFilter.type === 'date_range_input') {
    const { stateSelectedRangeOption, stateBeginQuery, stateEndQuery } = getStateDateRangeValues({ advancedFilter });

    return (
      <DateRangeInput
        selectedRangeOption={stateSelectedRangeOption}
        beginQuery={stateBeginQuery}
        endQuery={stateEndQuery}
        handleSelection={({ beginDateQuery, endDateQuery, selectedRange }) => {
          return changeAdvancedFilter({
            filterType: advancedFilter.type,
            filterGroupUid: advancedFilter.uid,
            filterValue: getDateRangeValue({ beginDateQuery, endDateQuery, selectedRange })
          });
        }}
      />
    );
  }
  return null;
};

AdvancedFilter.propTypes = {
  advancedFilter: PropTypes.object,
  changeAdvancedFilter: PropTypes.func
};

export default AdvancedFilter;
