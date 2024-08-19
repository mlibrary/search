import { DateRangeInput, Multiselect } from '../../../core';
import { Checkbox } from '../../../reusable';
import NarrowSearchTo from '../NarrowSearchTo';
import PropTypes from 'prop-types';
import React from 'react';

const getIsCheckboxFilterChecked = ({ advancedFilter }) => {
  const { activeFilters, conditions } = advancedFilter;
  const hasActiveFilters = activeFilters?.length > 0;

  return (!hasActiveFilters && conditions.default === 'checked')
    || (hasActiveFilters && activeFilters[0] === conditions.checked);
};

const getDateRangeValue = ({ beginDateQuery, endDateQuery, selectedRange }) => {
  const dateRanges = {
    After: beginDateQuery && `after ${beginDateQuery}`,
    Before: endDateQuery && `before ${endDateQuery}`,
    Between: (beginDateQuery && endDateQuery) && `${beginDateQuery} to ${endDateQuery}`,
    In: beginDateQuery
  };

  return dateRanges[selectedRange] || null;
};

const getStateDateRangeValues = ({ advancedFilter }) => {
  const rangeValues = {
    stateSelectedRangeOption: 0
  };
  const dates = [null, null];

  if (advancedFilter?.activeFilters?.length) {
    const ranges = ['before', 'after', 'to'];
    rangeValues.stateSelectedRangeOption = ranges.length;
    const [filterValue] = advancedFilter.activeFilters;
    dates.unshift(...filterValue.match(/\d+/gu));
    ranges.forEach((range, index) => {
      if (filterValue.includes(range)) {
        rangeValues.stateSelectedRangeOption = index;
        if (range === ranges[0]) {
          dates.unshift(null);
        }
      }
    });
  }

  [rangeValues.stateBeginQuery, rangeValues.stateEndQuery] = dates;

  return rangeValues;
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
    const options = advancedFilter.filters.map((option) => {
      return {
        checked: option.isActive,
        name: option.value,
        value: option.value
      };
    });

    return (
      <Multiselect
        options={options}
        filterGroupUid={advancedFilter.uid}
        descriptionText={`Select one or more checkboxes to narrow your results to items that match all of your ${advancedFilter.name.toLowerCase()} selections.`}
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
