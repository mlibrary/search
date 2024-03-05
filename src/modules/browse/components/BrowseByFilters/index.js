import React from 'react';
import { Anchor } from '../../../reusable';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import qs from 'qs';

function NestedList ({ filter, browserFilterTo }) {
  return (
    <li>
      {filter.value
        ? (
          <Anchor to={browserFilterTo(filter.value)} className='browse-filter-link'>
            <span className='browse-filter-link__text'>{filter.name}</span>
            <span className='browse-filter-link__count'>({filter.count})</span>
          </Anchor>
          )
        : (
          <h3 className='heading-medium'>{filter.name}</h3>
          )}
      {filter.children && (
        <ul>
          {filter.children.map((child) => {
            return (
              <NestedList
                key={child.name}
                filter={child}
                browserFilterTo={browserFilterTo}
              />
            );
          })}
        </ul>
      )}
    </li>
  );
}

NestedList.propTypes = {
  browserFilterTo: PropTypes.func.isRequired,
  filter: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    count: PropTypes.number,
    children: PropTypes.array
  }).isRequired
};

function BrowseByFilters ({ filters }) {
  const { datastoreSlug } = useParams();

  const browserFilterTo = (uid) => {
    return (value) => {
      const queryString = qs.stringify({
        filter: { [uid]: value },
        sort: 'title_asc'
      }, {
        arrayFormat: 'repeat',
        encodeValuesOnly: true,
        allowDots: true,
        format: 'RFC1738'
      });
      return `/${datastoreSlug}?${queryString}`;
    };
  };

  return (
    <>
      {Object.keys(filters).map((uid) => {
        return (
          <section key={uid} className='browse u-margin-top-1'>
            <h2 className='heading-large u-margin-top-none'>{filters[uid].name}</h2>
            <ul className='nested-list'>
              {filters[uid].filters.map((filter) => {
                return (
                  <NestedList
                    key={filter.name}
                    filter={filter}
                    browserFilterTo={browserFilterTo(uid)}
                  />
                );
              })}
            </ul>
          </section>
        );
      })}
    </>
  );
}

BrowseByFilters.propTypes = {
  filters: PropTypes.objectOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    filters: PropTypes.array.isRequired
  })).isRequired
};

export default BrowseByFilters;
