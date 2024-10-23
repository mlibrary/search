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
  return null;
};

AdvancedFilter.propTypes = {
  advancedFilter: PropTypes.object,
  changeAdvancedFilter: PropTypes.func
};

export default AdvancedFilter;
