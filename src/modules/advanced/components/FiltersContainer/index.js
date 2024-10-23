import { AdvancedSearchSubmit, setAdvancedFilter } from '../../../advanced';
import { DateRangeInput, Multiselect } from '../../../core';
import { useDispatch, useSelector } from 'react-redux';
import ActiveAdvancedFilters from '../ActiveAdvancedFilters';
import AdvancedFilter from '../AdvancedFilter';
import getFilters from './getFilters';
import PropTypes from 'prop-types';
import React from 'react';

const FiltersContainer = ({ datastoreUid }) => {
  const dispatch = useDispatch();
  const { [datastoreUid]: urlFilters = {} } = useSelector((state) => {
    return state.filters.active;
  });
  const { activeFilters = {}, filters: filterGroups } = useSelector((state) => {
    return state.advanced[datastoreUid] || {};
  });
  const advancedDatastoreFilters = getFilters({ activeFilters, filterGroups });

  const changeAdvancedFilter = ({ filterGroupUid, filterType, filterValue }) => {
    switch (filterType) {
      case 'scope_down':
        // Clear active filters
        if (['institution', 'location'].includes(filterGroupUid) && filterValue) {
          dispatch(setAdvancedFilter({
            datastoreUid,
            filterGroupUid: 'collection',
            filterType,
            onlyOneFilterValue: true
          }));
          if (filterGroupUid === 'institution') {
            dispatch(setAdvancedFilter({
              datastoreUid,
              filterGroupUid: 'location',
              filterType,
              onlyOneFilterValue: true
            }));
          }
        }
        dispatch(setAdvancedFilter({
          datastoreUid,
          filterGroupUid,
          filterType,
          filterValue,
          onlyOneFilterValue: true
        }));
        break;
      case 'checkbox':
        dispatch(setAdvancedFilter({
          datastoreUid,
          filterGroupUid,
          filterValue,
          onlyOneFilterValue: true
        }));
        break;
      default:
        break;
    }
  };

  if (advancedDatastoreFilters?.length === 0) {
    return null;
  }

  const filterGroupings = Object.keys(advancedDatastoreFilters);

  return (
    <>
      {activeFilters && <ActiveAdvancedFilters {...{ activeFilters, filters: filterGroups }} />}
      <h2 className='heading-large'>Additional search options</h2>
      <div className='advanced-filters-inner-container'>
        {filterGroupings.map((filterGroup, groupIndex) => {
          return (
            <React.Fragment key={groupIndex}>
              {filterGroup === 'undefined'
                ? (
                    advancedDatastoreFilters[filterGroup].map((advancedFilter, index) => {
                      const { filters, name, type, uid } = advancedFilter;
                      const currentAdvancedFilters = activeFilters[uid] || [];
                      const currentURLFilters = urlFilters[uid] || [];
                      // Make sure the URL filters and the advanced filters match on load
                      const currentFilters = [
                        ...currentURLFilters.filter((currentURLFilter) => {
                          return !currentAdvancedFilters.includes(currentURLFilter);
                        }),
                        ...currentAdvancedFilters.filter((currentAdvancedFilter) => {
                          return !currentURLFilters.includes(currentAdvancedFilter);
                        })
                      ];
                      return (
                        <div key={index} className='advanced-filter-container'>
                          <h2 className='advanced-filter-label-text'>{name}</h2>
                          <div className='advanced-filter-inner-container'>
                            {type === 'multiple_select' && <Multiselect {...{ currentFilters, datastoreUid, filterGroupUid: uid, filters, name }} />}
                            {type === 'date_range_input' && <DateRangeInput {...{ currentFilters, datastoreUid, filterGroupUid: uid }} />}
                            {!['multiple_select', 'date_range_input'].includes(type) && <AdvancedFilter {...{ advancedFilter, changeAdvancedFilter }} />}
                          </div>
                        </div>
                      );
                    })
                  )
                : (
                    <div className='advanced-filter-container'>
                      <h2 className='advanced-filter-label-text'>{filterGroup}</h2>
                      {advancedDatastoreFilters[filterGroup].map((advancedFilter, index) => {
                        return <AdvancedFilter key={index} {...{ advancedFilter, changeAdvancedFilter }} />;
                      })}
                    </div>
                  )}
            </React.Fragment>
          );
        })}
      </div>
      <AdvancedSearchSubmit />
    </>
  );
};

FiltersContainer.propTypes = {
  datastoreUid: PropTypes.string
};

export default FiltersContainer;
