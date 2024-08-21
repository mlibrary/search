import './styles.css';
import '../../../filters/components/Filters/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import AdvancedFilter from '../AdvancedFilter';
import getFilters from './getFilters';
import { Icon } from '../../../reusable';
import PropTypes from 'prop-types';
import React from 'react';
import { setAdvancedFilter } from '../../../advanced';

const FilterList = ({ datastoreUid }) => {
  const dispatch = useDispatch();
  const { activeFilters = {}, filters: filterGroup } = useSelector((state) => {
    return state.advanced[datastoreUid] || {};
  });

  // Create filter list based on active filters
  const filterList = Object.entries(activeFilters).reduce((acc, [groupUid, filters]) => {
    if (filters) {
      const groupName = filterGroup.find((group) => {
        return group.uid === groupUid;
      });
      filters.forEach((value) => {
        acc.push({
          groupUid,
          name: groupName?.groupBy || groupName?.name,
          value
        });
      });
    }
    return acc;
  }, []);

  const handleRemoveFilter = ({ groupUid, value }) => {
    const baseFilter = {
      datastoreUid,
      filterGroupUid: groupUid,
      filterValue: value,
      onlyOneFilterValue: true
    };
    const actions = [];
    const createAction = (overrides = {}) => {
      actions.push(setAdvancedFilter({ ...baseFilter, ...overrides }));
    };

    // Example logic for removing specific filters based on type and group
    createAction();

    // Dispatch all created actions
    actions.forEach(dispatch);
  };

  const handleClearFilters = () => {
    Object.keys(activeFilters).forEach((groupUid) => {
      const filters = activeFilters[groupUid];
      filters.forEach(() => {
        dispatch(setAdvancedFilter({
          datastoreUid,
          filterGroupUid: groupUid,
          filterValue: null,
          onlyOneFilterValue: true
        }));
      });
    });
  };

  if (filterList.length === 0) {
    return null;
  }

  return (
    <section aria-label='active-filters'>
      <div className='flex flex__responsive margin-bottom__m'>
        <h2 id='active-filters' className='margin__none h4'>
          Active filters <span className='text-grey__light'>({filterList.length})</span>
        </h2>
        {filterList.length > 1 && (
          <button
            className='button-link-light'
            onClick={(event) => {
              event.preventDefault();
              handleClearFilters();
            }}
          >
            Clear all active filters
          </button>
        )}
      </div>
      <ul className='list__unstyled flex flex__responsive active-filter-list'>
        {filterList.map(({ groupUid, name, value }) => {
          return (
            <li key={`${groupUid}-${value}`}>
              <button
                className='padding-y__xs padding-x__s remove-filter underline__hover'
                onClick={(event) => {
                  event.preventDefault();
                  handleRemoveFilter({ groupUid, value });
                }}
              >
                {name}: {value}
                <Icon icon='close' />
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

FilterList.propTypes = {
  datastoreUid: PropTypes.string
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
