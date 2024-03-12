import React from 'react';
import { useParams } from 'react-router-dom';
import { findWhere } from '../../../reusable/underscore';
import config from '../../../../config';
import { stringifySearchQueryForURL } from '../../../pride';
import PropTypes from 'prop-types';

const Sorts = ({ activeFilters, activeDatastore, history, institution, search }) => {
  const { datastoreSlug } = useParams();
  const sorts = (config.sorts[activeDatastore]?.sorts || [])
    .map((uid) => {
      return findWhere(search.data[activeDatastore].sorts, { uid });
    }).filter((sort) => {
      return sort !== undefined;
    });

  const handleOnChange = (event) => {
    window.dataLayer.push({
      event: 'sortBySelection',
      sortByElement: event.target.options[event.target.selectedIndex]
    });

    const queryString = stringifySearchQueryForURL({
      query: search.query,
      filter: activeFilters,
      library: activeDatastore === 'mirlyn' ? institution.active : undefined,
      sort: event.target.value
    });

    history.push(`/${datastoreSlug}?${queryString}`);
  };

  if (!sorts.length) return null;

  return (
    <div>
      <label className='sorts-label sorts-label-text' htmlFor='sort-by' style={{ display: 'inline-block' }}>
        Sort by
      </label>
      <select
        id='sort-by'
        className='dropdown sorts-select'
        value={search.sort[activeDatastore] || sorts[0].uid}
        onChange={handleOnChange}
        autoComplete='off'
      >
        {sorts.map(({ uid, metadata: { name } }) => {
          return (
            <option key={uid} value={uid}>
              {name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

Sorts.propTypes = {
  activeFilters: PropTypes.object,
  activeDatastore: PropTypes.string,
  history: PropTypes.object,
  institution: PropTypes.object,
  search: PropTypes.object
};

export default Sorts;
