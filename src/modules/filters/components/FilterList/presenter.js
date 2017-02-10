import React from 'react';
import { _ } from 'underscore';

const FilterList = ({ group }) => {
  return (
    <div>
      {group.name}
      {_.map(group.filters, (filter) => {
        return (
          <li>
            {filter.value}({filter.count})
          </li>
        )
      })}
    </div>
  )
};

export default FilterList;
