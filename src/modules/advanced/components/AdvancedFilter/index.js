import NarrowSearchTo from '../NarrowSearchTo';
import PropTypes from 'prop-types';
import React from 'react';

const AdvancedFilter = ({ advancedFilter, changeAdvancedFilter }) => {
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
};

AdvancedFilter.propTypes = {
  advancedFilter: PropTypes.object,
  changeAdvancedFilter: PropTypes.func
};

export default AdvancedFilter;
