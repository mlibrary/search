import { DateRangeInput, Multiselect } from '../../../core';
import { Checkbox } from '../../../reusable';
import NarrowSearchTo from '../NarrowSearchTo';
import PropTypes from 'prop-types';
import React from 'react';

const getIsCheckboxFilterChecked = ({ advancedFilter }) => {
  const hasActiveFilter = advancedFilter.activeFilters?.length > 0;

  if (!hasActiveFilter && advancedFilter.conditions.default === 'checked') {
    return true;
  }

  if (hasActiveFilter && advancedFilter.activeFilters[0] === advancedFilter.conditions.checked) {
    return true;
  }

  return false;
};

const getDateRangeValue = ({ beginDateQuery, endDateQuery, selectedRange }) => {
  switch (selectedRange) {
    case 'Before':
      if (endDateQuery) {
        return `before ${endDateQuery}`;
      }
      return null;
    case 'After':
      if (beginDateQuery) {
        return `after ${beginDateQuery}`;
      }
      return null;
    case 'Between':
      if (beginDateQuery && endDateQuery) {
        return `${beginDateQuery} to ${endDateQuery}`;
      }
      return null;
    case 'In':
      if (beginDateQuery) {
        return beginDateQuery;
      }
      return null;
    default:
      return null;
  }
};

const getStateDateRangeValues = ({ advancedFilter }) => {
  if (advancedFilter.activeFilters?.length > 0) {
    const [filterValue] = advancedFilter.activeFilters;

    // Before
    if (filterValue.indexOf('before') !== -1) {
      const values = filterValue.split('before');

      return {
        stateEndQuery: values[1],
        stateSelectedRangeOption: 0
      };
    }

    // After
    if (filterValue.indexOf('after') !== -1) {
      const values = filterValue.split('after');

      return {
        stateBeginQuery: values[1],
        stateSelectedRangeOption: 1
      };
    }

    // Between
    if (filterValue.indexOf('to') !== -1) {
      const values = filterValue.split('to');

      return {
        stateBeginQuery: values[0],
        stateEndQuery: values[1],
        stateSelectedRangeOption: 2
      };
    }

    // In or other
    return {
      stateBeginQuery: filterValue,
      stateSelectedRangeOption: 3
    };
  }

  return {
    stateBeginQuery: '',
    stateEndQuery: '',
    stateSelectedRangeOption: 0
  };
};

const AdvancedFilter = ({ advancedFilter, changeAdvancedFilter }) => {
  if (advancedFilter.type === 'scope_down') {
    return (
      <NarrowSearchTo
        handleChange={(option) => {
          return changeAdvancedFilter({
            filterGroupUid: option.uid,
            filterType: advancedFilter.type,
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
            filterGroupUid: advancedFilter.uid,
            filterType: advancedFilter.type,
            filterValue: value
          });
        }}
        isChecked={isChecked}
        label={advancedFilter.name}
      />
    );
  }
  if (advancedFilter.type === 'multiple_select') {
    return (
      <Multiselect
        advancedFilter={advancedFilter}
        handleSelection={(index, option) => {
          return changeAdvancedFilter({
            filterGroupUid: advancedFilter.uid,
            filterType: advancedFilter.type,
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
            filterGroupUid: advancedFilter.uid,
            filterType: advancedFilter.type,
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
