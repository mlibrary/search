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

  const filterList = Object.entries(activeFilters).flatMap(([groupUid, filters]) => {
    const {
      name = groupUid === 'institution' ? 'Library' : groupUid.charAt(0).toUpperCase() + groupUid.slice(1).replaceAll('_', ' '),
      type = 'scope_down'
    } = filterGroup.find((group) => {
      return group.uid === groupUid;
    }) || {};
    return type === 'checkbox'
      ? []
      : filters.map((value) => {
        return { groupUid, name, type, value };
      });
  });

  const handleRemoveFilter = ({ groupUid, type, value }) => {
    const baseFilter = {
      datastoreUid,
      filterGroupUid: groupUid,
      filterType: type,
      filterValue: null,
      onlyOneFilterValue: true
    };
    const createAction = (overrides = {}) => {
      dispatch(setAdvancedFilter({ ...baseFilter, ...overrides }));
    };

    if (['institution', 'location'].includes(groupUid)) {
      createAction({ filterGroupUid: 'collection' });
    }

    if (groupUid === 'institution') {
      createAction({ filterGroupUid: 'location' });
    }

    if (['date_range_input', 'scope_down'].includes(type)) {
      createAction();
    }

    if (type === 'multiple_select') {
      createAction({ filterValue: value, onlyOneFilterValue: false });
    }
  };

  const handleClearFilters = () => {
    Object.entries(activeFilters).forEach(([groupUid, filters]) => {
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

  if (!filterList.length) {
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
        {filterList.map(({ groupUid, name, type, value }) => {
          return (
            <li key={`${groupUid}-${value}`}>
              <button
                className='padding-y__xs padding-x__s remove-filter underline__hover'
                onClick={(event) => {
                  event.preventDefault();
                  handleRemoveFilter({ groupUid, type, value });
                }}
              >
                {`${name}: ${value}`}
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
