import { useNavigate, useParams } from 'react-router-dom';
import config from '../../../../config';
import { findWhere } from '../../../reusable/underscore';
import PropTypes from 'prop-types';
import React from 'react';
import { stringifySearch } from '../../../search';
import { useSelector } from 'react-redux';

const Sorts = ({ activeDatastore }) => {
  const { data, query, sort } = useSelector((state) => {
    return state.search;
  });
  const filter = useSelector((state) => {
    return state.filters.active[activeDatastore];
  });
  const institution = useSelector((state) => {
    return state.institution.active;
  });
  const { datastoreSlug } = useParams();
  const navigate = useNavigate();
  const sorts = (config.sorts[activeDatastore]?.sorts || [])
    .map((uid) => {
      return findWhere(data[activeDatastore].sorts, { uid });
    }).filter((sortType) => {
      return typeof sortType !== 'undefined';
    });

  const handleOnChange = (event) => {
    window.dataLayer.push({
      event: 'sortBySelection',
      sortByElement: event.target.options[event.target.selectedIndex]
    });

    const queryString = stringifySearch({
      filter,
      library: activeDatastore === 'mirlyn' ? institution : null,
      query,
      sort: event.target.value
    });

    navigate(`/${datastoreSlug}?${queryString}`);
  };

  if (!sorts.length) {
    return null;
  }

  return (
    <div>
      <label className='sorts-label sorts-label-text' htmlFor='sort-by'>
        Sort by
      </label>
      <select
        id='sort-by'
        className='dropdown sorts-select'
        value={sort[activeDatastore] || sorts[0].uid}
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
  activeDatastore: PropTypes.string
};

export default Sorts;
