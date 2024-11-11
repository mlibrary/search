import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { setAdvancedFilter } from '../../../advanced';
import { useDispatch } from 'react-redux';

const AccessOptions = ({ advancedFilter, datastoreUid }) => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState(advancedFilter.filters);

  const handleCheckboxChange = (filterItem) => {
    const { checked, uid: filterGroupUid } = filterItem.value;

    setFilters(filters.map((filter) => {
      if (filter.value.uid === filterGroupUid) {
        return {
          ...filter,
          value: {
            ...filter.value,
            checked: !filter.value.checked
          }
        };
      }
      return filter;
    }));

    dispatch(setAdvancedFilter({
      datastoreUid,
      filterGroupUid,
      filterValue: !checked,
      onlyOneFilterValue: true
    }));
  };

  return (
    <>
      {filters.map((filter, index) => {
        return (
          <label key={filter.value.uid} className={index > 0 ? 'margin-top__xs' : ''}>
            <input
              type='checkbox'
              checked={filter.value.checked}
              onChange={() => {
                return handleCheckboxChange(filter);
              }}
            />
            {filter.value.name}
          </label>
        );
      })}
    </>
  );
};

AccessOptions.propTypes = {
  advancedFilter: PropTypes.object,
  datastoreUid: PropTypes.string
};

export default AccessOptions;
