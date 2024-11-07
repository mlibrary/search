import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { setAdvancedFilter } from '../../../advanced';
import { useDispatch } from 'react-redux';

const AccessOptions = ({ advancedFilter, datastoreUid, filterGroupUid }) => {
  const dispatch = useDispatch();

  const isChecked = useMemo(() => {
    return (!advancedFilter.activeFilters?.length && advancedFilter.conditions.default === 'checked')
      || (advancedFilter.activeFilters?.[0] === advancedFilter.conditions.checked);
  }, [advancedFilter]);

  const value = isChecked ? advancedFilter.conditions.unchecked : advancedFilter.conditions.checked;

  const changeAdvancedFilter = useCallback(() => {
    dispatch(setAdvancedFilter({
      datastoreUid,
      filterGroupUid,
      filterValue: value,
      onlyOneFilterValue: true
    }));
  }, [dispatch, datastoreUid, filterGroupUid, value]);

  return (
    <label>
      <input
        type='checkbox'
        checked={isChecked}
        onChange={changeAdvancedFilter}
      />
      <span>{advancedFilter.name}</span>
    </label>
  );
};

AccessOptions.propTypes = {
  advancedFilter: PropTypes.object.isRequired,
  datastoreUid: PropTypes.string.isRequired,
  filterGroupUid: PropTypes.string.isRequired
};

export default AccessOptions;
