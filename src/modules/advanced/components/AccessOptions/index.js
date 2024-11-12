import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { setAdvancedFilter } from '../../../advanced';
import { useDispatch } from 'react-redux';

const AccessOptions = ({ datastoreUid, filters }) => {
  const dispatch = useDispatch();
  const [options, setOptions] = useState([]);

  useEffect(() => {
    setOptions(filters);
  }, [filters]);

  const handleCheckboxChange = useCallback((filterItem) => {
    const { checked, uid: filterGroupUid } = filterItem.value;

    setOptions((prevOptions) => {
      return prevOptions.map((option) => {
        if (option.value.uid === filterGroupUid) {
          return {
            ...option,
            value: {
              ...option.value,
              checked: !option.value.checked
            }
          };
        }
        return option;
      });
    }
    );

    dispatch(setAdvancedFilter({
      datastoreUid,
      filterGroupUid,
      filterValue: !checked,
      onlyOneFilterValue: true
    }));
  }, [dispatch, datastoreUid]);
  return (
    <>
      {options.map((option, index) => {
        return (
          <label key={option.value.uid} className={index > 0 ? 'margin-top__xs' : ''}>
            <input
              type='checkbox'
              checked={option.value.checked}
              onChange={() => {
                return handleCheckboxChange(option);
              }}
            />
            {option.value.name}
          </label>
        );
      })}
    </>
  );
};

AccessOptions.propTypes = {
  datastoreUid: PropTypes.string,
  filters: PropTypes.array
};

export default AccessOptions;
