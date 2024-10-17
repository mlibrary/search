import './styles.css';
import { useDispatch, useSelector } from 'react-redux';
import AdvancedFilter from '../AdvancedFilter';
import getFilters from './getFilters';
import { Icon } from '../../../reusable';
import PropTypes from 'prop-types';
import React from 'react';
import { setAdvancedFilter } from '../../../advanced';

const ActiveAdvancedFilters = ({ datastoreUid }) => {
  const { activeFilters, filters } = useSelector((state) => {
    return state.advanced[datastoreUid] || {};
  });
  // Check if object exists
  if (!activeFilters) {
    return null;
  }
  // Remove properties that have undefined values
  Object.keys(activeFilters).forEach((option) => {
    if (!activeFilters[option]) {
      delete activeFilters[option];
    }
  });

  const filterGroups = {};
  filters.forEach((filterGroup) => {
    filterGroups[filterGroup.uid] = { ...filterGroup };
  });

  const items = Object.keys(activeFilters).reduce((acc, group) => {
    // Just don't show the checkbox filters as active filter items.
    if (!filterGroups[group] || filterGroups[group].type !== 'checkbox') {
      const activeFiltersToAdd = activeFilters[group].map((value) => {
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
      <h2
        id='active-filters'
        className='u-margin-top-none margin-bottom__xs h4'
      >
        Active filters
        {' '}
        <span className='text-grey__light padding-right__xs'>
          ({items.length})
        </span>
      </h2>

      <p className='font-small u-margin-top-none'>
        Unselect active filters through the options below.
      </p>

      <ul className='margin-top__none active-filter-list'>
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

ActiveAdvancedFilters.propTypes = {
  datastoreUid: PropTypes.string
};

const FiltersContainer = ({ datastoreUid }) => {
  const dispatch = useDispatch();
  const { activeFilters, filters: filterGroups } = useSelector((state) => {
    return state.advanced[datastoreUid] || {};
  });
  const filters = getFilters({ activeFilters, filterGroups });

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
      case 'date_range_input':
        dispatch(setAdvancedFilter({
          datastoreUid,
          filterGroupUid,
          filterValue,
          onlyOneFilterValue: true
        }));
        break;
      case 'multiple_select':
        dispatch(setAdvancedFilter({
          datastoreUid,
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
      <ActiveAdvancedFilters datastoreUid={datastoreUid} />
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
  datastoreUid: PropTypes.string
};

export default FiltersContainer;
