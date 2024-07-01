import { useDispatch, useSelector } from 'react-redux';
import AdvancedFilter from '../AdvancedFilter';
import getFilters from './getFilters';
import { Icon } from '../../../reusable';
import PropTypes from 'prop-types';
import React from 'react';
import { setAdvancedFilter } from '../../../advanced';

const ActiveAdvancedFilters = (datastore) => {
  const currentDatastore = datastore.datastore.uid;
  const { advanced } = useSelector((state) => {
    return state;
  });
  const activeAdditionalSearchOptions = advanced[currentDatastore].activeFilters;
  // Check if object exists
  if (!activeAdditionalSearchOptions) {
    return null;
  }
  // Remove properties that have undefined values
  Object.keys(activeAdditionalSearchOptions).forEach((option) => {
    if (!activeAdditionalSearchOptions[option]) {
      delete activeAdditionalSearchOptions[option];
    }
  });

  const filterGroups = {};
  advanced[currentDatastore].filters.forEach((filterGroup) => {
    filterGroups[filterGroup.uid] = { ...filterGroup };
  });

  const items = Object.keys(activeAdditionalSearchOptions).reduce((acc, group) => {
    // Just don't show the checkbox filters as active filter items.
    if (!filterGroups[group] || filterGroups[group].type !== 'checkbox') {
      const activeFiltersToAdd = activeAdditionalSearchOptions[group].map((value) => {
        return { group, value };
      });
      return [...acc, ...activeFiltersToAdd];
    }
    return acc;
  }, []);

  if (!items.length) {
    return null;
  }

  const titleCase = (string) => {
    return string.toLowerCase().split('_').map((word) => {
      return word.replace(word[0], word[0].toUpperCase());
    }).join(' ');
  };

  return (
    <section aria-label='active-filters'>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.25em'
        }}
      >
        <h2
          id='active-filters'
          className='u-margin-top-none margin-bottom__xs'
          style={{ fontSize: '1rem' }}
        >
          Active filters
        </h2>
        <span className='text-grey__light padding-right__xs'>
          ({items.length})
        </span>
      </div>

      <p className='font-small u-margin-top-none'>
        Unselect active filters through the options below.
      </p>

      <ul
        style={{
          fontSize: '0.9rem',
          marginLeft: '2.5rem',
          marginTop: '0'
        }}
      >
        {items.map((item, index) => {
          return (
            <li key={index + item.group + item.value}>
              <span className='strong'>{filterGroups[item.group]?.name || titleCase(item.group)}:</span> {item.value}
            </li>
          );
        })}
      </ul>
    </section>
  );
};

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
    switch (filterType) {
      case 'scope_down':
        // Clear active filters
        if (['institution', 'location'].includes(filterGroupUid) && filterValue) {
          dispatch(setAdvancedFilter({
            datastoreUid: datastore.uid,
            filterGroupUid: 'collection',
            filterType,
            onlyOneFilterValue: true
          }));
          if (filterGroupUid === 'institution') {
            dispatch(setAdvancedFilter({
              datastoreUid: datastore.uid,
              filterGroupUid: 'location',
              filterType,
              onlyOneFilterValue: true
            }));
          }
        }
        dispatch(setAdvancedFilter({
          datastoreUid: datastore.uid,
          filterGroupUid,
          filterType,
          filterValue,
          onlyOneFilterValue: true
        }));
        break;
      case 'checkbox':
      case 'date_range_input':
        dispatch(setAdvancedFilter({
          datastoreUid: datastore.uid,
          filterGroupUid,
          filterValue,
          onlyOneFilterValue: true
        }));
        break;
      case 'multiple_select':
        dispatch(setAdvancedFilter({
          datastoreUid: datastore.uid,
          filterGroupUid,
          filterValue
        }));
        break;
      default:
        break;
    }
  };

  if (filters?.length === 0) {
    return null;
  }

  const filterGroupings = Object.keys(filters);

  return (
    <>
      <ActiveAdvancedFilters datastore={datastore} />
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
        style={{ marginTop: '1rem' }}
        className='btn btn--primary'
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
