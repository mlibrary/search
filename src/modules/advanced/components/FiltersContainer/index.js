import { useDispatch, useSelector } from 'react-redux';
import AdvancedFilter from '../AdvancedFilter';
import FilterList from '../FilterList';
import getFilters from './getFilters';
import { Icon } from '../../../reusable';
import PropTypes from 'prop-types';
import React from 'react';
import { setAdvancedFilter } from '../../../advanced';

const FiltersContainer = ({ datastore }) => {
  const dispatch = useDispatch();
  const filterGroups = useSelector((state) => {
    return state.advanced[datastore.uid]?.filters;
  });
  const activeFilters = useSelector((state) => {
    return state.advanced[datastore.uid]?.activeFilters;
  });
  const filters = getFilters({ activeFilters, filterGroups });

  const changeAdvancedFilter = ({ filterGroupUid, filterType, filterValue }) => {
    const baseFilter = {
      datastoreUid: datastore.uid,
      filterGroupUid,
      filterType,
      filterValue,
      onlyOneFilterValue: true
    };
    const actions = [];
    const createAction = (overrides = {}) => {
      actions.push(setAdvancedFilter({ ...baseFilter, ...overrides }));
    };

    if (filterType === 'scope_down' && ['institution', 'location'].includes(filterGroupUid) && filterValue) {
      createAction({ filterGroupUid: 'collection', filterValue: null });
      if (filterGroupUid === 'institution') {
        createAction({ filterGroupUid: 'location', filterValue: null });
      }
    }

    if (['checkbox', 'date_range_input', 'scope_down'].includes(filterType)) {
      createAction();
    }

    if (filterType === 'multiple_select') {
      createAction({ onlyOneFilterValue: false });
    }

    actions.forEach(dispatch);
  };

  if (filters?.length === 0) {
    return null;
  }

  const filterGroupings = Object.keys(filters);

  return (
    <>
      <FilterList datastoreUid={datastore.uid} />
      <h2 className='heading-large'>Additional search options</h2>
      <div className='advanced-filters-inner-container'>
        {filterGroupings.map((filterGroup, groupIndex) => {
          return (
            <React.Fragment key={groupIndex}>
              {filterGroup === 'undefined'
                ? (
                    filters[filterGroup].map((advancedFilter, index) => {
                      return (
                        <div key={index} className='advanced-filter-container'>
                          <h2 className='advanced-filter-label-text'>{advancedFilter.name}</h2>
                          <div className='advanced-filter-inner-container'>
                            <AdvancedFilter
                              advancedFilter={advancedFilter}
                              changeAdvancedFilter={changeAdvancedFilter}
                            />
                          </div>
                        </div>
                      );
                    })
                  )
                : (
                    <div className='advanced-filter-container'>
                      <h2 className='advanced-filter-label-text'>{filterGroup}</h2>
                      {filters[filterGroup].map((advancedFilter, index) => {
                        return (
                          <AdvancedFilter
                            key={index}
                            advancedFilter={advancedFilter}
                            changeAdvancedFilter={changeAdvancedFilter}
                          />
                        );
                      })}
                    </div>
                  )}
            </React.Fragment>
          );
        })}
      </div>
      <button
        className='btn btn--primary margin-top__m'
        type='submit'
      >
        <Icon icon='search' size={24} /> Advanced Search
      </button>
    </>
  );
};

FiltersContainer.propTypes = {
  datastore: PropTypes.object
};

export default FiltersContainer;
