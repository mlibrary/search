import { Anchor } from '../../../reusable';
import React from 'react';
import { stringifySearch } from '../../../search';
import { useParams } from 'react-router-dom';

const NestedList = ({ browserFilterTo, filter }) => {
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
            <h3>{filter.name}</h3>
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
};

const BrowseByFilters = ({ filters }) => {
  const { datastoreSlug } = useParams();

  const browserFilterTo = (uid) => {
    return (value) => {
      const queryString = stringifySearch({
        filter: { [uid]: value },
        sort: 'title_asc'
      });
      return `/${datastoreSlug}?${queryString}`;
    };
  };

  return (
    <>
      {Object.keys(filters).map((uid) => {
        return (
          <section key={uid} className='browse margin-top__m'>
            <h2 className='margin-y__none'>{filters[uid].name}</h2>
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
};

export default BrowseByFilters;
