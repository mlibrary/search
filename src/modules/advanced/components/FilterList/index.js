import './styles.css';
import '../../../filters/components/Filters/styles.css';
import { useDispatch, useSelector } from 'react-redux';
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
      <div className='flex margin-bottom__m active-filters-header'>
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
      <ul className='list__unstyled active-filter-list'>
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

export default FilterList;
