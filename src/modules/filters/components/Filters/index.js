import React from 'react';
import { useSelector } from 'react-redux';
import './styles.css';
import {
  Anchor,
  Expandable,
  ExpandableButton,
  ExpandableChildren,
  Icon
} from '../../../reusable';
import CheckboxFilters from '../CheckboxFilters';
import { getURLWithFiltersRemoved, newSearch } from '../../utilities';
import PropTypes from 'prop-types';

function ActiveFilters () {
  const { active: activeDatastore } = useSelector((state) => {
    return state.datastores;
  });
  const { active: activeFilters, groups } = useSelector((state) => {
    return state.filters;
  });
  const active = activeFilters[activeDatastore];

  if (!active) {
    return null;
  }

  /*
   * Input:
   * {
   *   subject: ['Birds', 'Birds North America'],
   *   format: ['Science', 'Biology']
   * }
   *
   * output:
   * [
   *   { group: 'subject', value: 'Birds' },
   *   { group: 'subject', value: 'Birds North America' },
   *   { group: 'format', value: 'Science' },
   *   { group: 'format', value: 'Biology' }
   * ]
   */
  const items = Object.keys(active).reduce((acc, group) => {
    // Just don't show the checkbox filters as active filter items.
    if (!groups[group] || groups[group].type !== 'checkbox') {
      const activeFiltersToAdd = active[group].map((value) => {
        return { group, value };
      });

      acc = acc.concat(activeFiltersToAdd);
    }

    return acc;
  }, []);

  if (!items.length) {
    return null;
  }

  return (
    <section className='padding-y__s padding-x__m active-filters'>
      <h2 className='margin-top__none margin-bottom__xs marc__heading'>
        Active filters
      </h2>

      <ul className='list__unstyled'>
        {items.map((item, i) => {
          const { group, value } = item;
          return (
            <li
              key={i + group + value}
              className='margin-bottom__xs'
            >
              <Anchor
                to={getURLWithFiltersRemoved({ group, value })}
                className='padding-y__xs padding-x__s remove-filter underline__hover'
              >
                {groups[group] ? groups[group].metadata.name : group}
                :
                {value}
                <Icon icon='close' />
              </Anchor>
            </li>
          );
        })}
      </ul>

      {
        items.length > 1 && (
          <Anchor
            to={getURLWithFiltersRemoved({ all: true })}
            className='underline underline__hover-thick text-grey'
          >
            Clear all active filters
          </Anchor>
        )
}
    </section>
  );
}

function FilterGroupContainer ({ uid }) {
  const activeDatastore = useSelector((state) => {
    return state.datastores.active;
  });
  const { groups, active: activeFilters } = useSelector((state) => {
    return state.filters;
  });
  const group = groups[uid];

  if (!group || !group.filters.length || group.type !== 'multiselect') {
    return null;
  }

  const activeDatastoreFilters = activeFilters[activeDatastore]?.[uid] ?? [];
  const filtersWithoutActive = group.filters.filter((filter) => {
    return !activeDatastoreFilters.includes(filter.value);
  });

  if (!filtersWithoutActive.length) {
    return null;
  }

  const { name } = group.metadata;

  return (
    <details
      open={group.preExpanded}
      className='filter-details'
    >
      <summary>
        <span>{name}</span>
        <Icon size={24} icon='expand_less' className='expand_less' />
        <Icon size={24} icon='expand_more' className='expand_more' />
      </summary>
      <div className='padding-x__s padding-bottom__s'>
        <Expandable>
          <ul className='list__unstyled filter-list'>
            <ExpandableChildren show={5}>
              {filtersWithoutActive.map((filter, i) => {
                const { value, count } = filter;
                const search = newSearch({ filter: { [uid]: value }, page: undefined });
                return (
                  <li key={name + value + i}>
                    <Anchor
                      to={`${document.location.pathname}?${search}`}
                      className='flex filter-option'
                    >
                      <span className='filter-name'>{value}</span>
                      <span className='filter-count'>
                        {count?.toLocaleString()}
                      </span>
                    </Anchor>
                  </li>
                );
              })}
            </ExpandableChildren>
          </ul>

          {filtersWithoutActive.length > 5 && (
            <ExpandableButton
              name={`${name} filters`}
              count={filtersWithoutActive.length}
            />
          )}
        </Expandable>
      </div>
    </details>
  );
}

FilterGroupContainer.propTypes = {
  uid: PropTypes.string
};

export default function Filters () {
  const { searching } = useSelector((state) => {
    return state.search;
  });
  const { active } = useSelector((state) => {
    return state.datastores;
  });
  const { loading } = useSelector((state) => {
    return state.records;
  });
  const { order } = useSelector((state) => {
    return state.filters;
  });

  if (!order || (searching && loading[active])) {
    return null;
  }

  return (
    <section aria-label='filters' className='filter-container'>
      <ActiveFilters />
      <CheckboxFilters />
      {order.map((uid) => {
        return (
          <FilterGroupContainer uid={uid} key={uid} />
        );
      })}
    </section>
  );
}
