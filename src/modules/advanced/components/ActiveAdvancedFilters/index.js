import './styles.css';
import PropTypes from 'prop-types';
import React from 'react';

const ActiveAdvancedFilters = ({ activeFilters, filters }) => {
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
  activeFilters: PropTypes.object,
  filters: PropTypes.array
};

export default ActiveAdvancedFilters;
