import React from 'react';
import { _ } from 'underscore';
import numeral from 'numeral'

const FilterList = ({ group, handleFilter, active}) => {
  const filters = _.sortBy(group.filters, 'count').reverse();

  return (
    <div>
      <h3 className="filter-list-heading">{group.name}</h3>
      <ul className="filter-list">
      {_.map(filters, (filter) => {
        let isActive = false;

        if (active) {
          if (active !== filter.value) {
            return null;
          }
          isActive = true;
        }

        return (
          <li
            className={'filter-item ' + (isActive ? 'filter-active' : '')}
            key={filter.value}>
            <button
              className="filter-button"
              data-value={filter.value}
              data-group={group.uid}
              onClick={handleFilter}>
              <span
                className="filter-value underline"
                data-value={filter.value}
                data-group={group.uid}>
                {filter.value}
              </span>
              <span
                className="filter-count"
                data-value={filter.value}
                data-group={group.uid}>
                {numeral(filter.count).format(0,0)}
              </span>
            </button>
          </li>
        )
      })}
      </ul>
    </div>
  )
};

export default FilterList;
