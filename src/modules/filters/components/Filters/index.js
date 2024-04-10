/** @jsxImportSource @emotion/react */
import React from 'react';
import { useSelector } from 'react-redux';
import './styles.css';
import {
  Anchor,
  Expandable,
  ExpandableChildren,
  ExpandableButton,
  Icon
} from '../../../reusable';
import CheckboxFilters from '../CheckboxFilters';
import {
  getURLWithoutFilters,
  getURLWithFilterRemoved,
  filterOutActiveFilters,
  newSearch
} from '../../utilities';
import PropTypes from 'prop-types';

function ActiveFilters () {
  const { active: activeDatastore } = useSelector((state) => {
    return state.datastores;
  });
  const { active: activeFilters, groups } = useSelector((state) => {
    return state.filters;
  });
  const active = activeFilters[activeDatastore];

  if (!active) return null;

  /*
    input:
    {
      subject: ['Birds', 'Birds North America'],
      format: ['Science', 'Biology']
    }

    output:
    [
      { group: 'subject', value: 'Birds' },
      { group: 'subject', value: 'Birds North America' },
      { group: 'format', value: 'Science' },
      { group: 'format', value: 'Biology' }
    ]
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

  if (!items.length) return null;

  return (
    <section
      className='padding-y__s padding-x__m'
      style={{
        borderBottom: 'solid 1px var(--ds-color-neutral-100)'
      }}
    >
      <h2 className='margin-top__none margin-bottom__xs marc__heading'>
        Active filters
      </h2>

      <ul className='list__unstyled'>
        {items.map((item, i) => {
          const { group, value } = item;
          return (
            <li
              key={i + group + value}
              css={{
                marginBottom: 'var(--search-spacing-xs)',
                ':last-of-type': {
                  marginBottom: 0
                }
              }}
            >
              <Anchor
                to={getURLWithFilterRemoved({ group, value })}
                className='padding-y__xs padding-x__s'
                css={{
                  color: 'var(--ds-color-green-500)',
                  background: 'var(--ds-color-green-100)',
                  border: 'solid 1px var(--ds-color-green-200)',
                  borderRadius: '4px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  ':hover': {
                    textDecoration: 'underline'
                  }
                }}
              >
                <span>
                  {groups[group] ? groups[group].metadata.name : group}: {value}
                </span>
                <span>
                  <Icon icon='close' />
                </span>
              </Anchor>
            </li>
          );
        })}
      </ul>

      {
        items.length > 1 &&
          <Anchor
            to={getURLWithoutFilters()}
            className='padding-top__xs'
            css={{
              display: 'inline-block',
              textDecoration: 'underline',
              color: 'var(--ds-color-neutral-300)'
            }}
          >
            Clear all active filters
          </Anchor>
      }
    </section>
  );
}

function FilterGroupContainer ({ uid }) {
  const { active: activeDatastore } = useSelector((state) => {
    return state.datastores;
  });
  const { filters } = useSelector((state) => {
    return state;
  });
  const group = filters.groups[uid];

  if (!group || !group.filters.length || group.type !== 'multiselect') return null;

  const activeFilters = filters.active[activeDatastore]
    ? filters.active[activeDatastore][uid]
    : null;

  const props = {
    uid,
    group,
    filters,
    activeFilters
  };

  return <FilterGroupMultiselect {...props} />;
}

FilterGroupContainer.propTypes = {
  uid: PropTypes.string
};

function FilterGroupMultiselect ({ filters, group, uid, activeFilters }) {
  const filtersWithoutActive = filterOutActiveFilters({
    active: activeFilters,
    filters: filters.groups[uid].filters
  });

  if (!filtersWithoutActive.length) return null;

  return (
    <details
      open={group.preExpanded}
      css={{
        borderBottom: '1px solid rgb(229, 233, 237)',
        '& > *': {
          padding: '0 0.75rem'
        },
        '&:not([open]) > summary svg:first-of-type, &[open] > summary svg:last-of-type': {
          display: 'none'
        }
      }}
    >
      <summary
        css={{
          cursor: 'pointer',
          display: 'flex',
          fontWeight: '600',
          justifyContent: 'space-between',
          listStyle: 'none',
          padding: '0.75rem!important',
          '&::-webkit-details-marker': {
            display: 'none'
          },
          ':hover': {
            textDecoration: 'underline'
          }
        }}
      >
        <span>{group.metadata.name}</span>
        <span
          css={{
            color: 'var(--ds-color-neutral-300)',
            'details:not([open]) > summary > & > svg:first-of-type, details[open] > summary > & > svg:last-of-type': {
              display: 'none!important'
            }
          }}
        >
          <Icon size={24} icon='expand_less' />
          <Icon size={24} icon='expand_more' />
        </span>
      </summary>
      <div>
        <Expandable>
          <ul className='list__unstyled'>
            <ExpandableChildren show={5}>
              {filtersWithoutActive.map((filter, i) => {
                const search = newSearch({ filter: { [group.uid]: filter.value }, page: undefined });
                return (
                  <li key={group.metadata.name + filter.value + i}>
                    <Anchor
                      to={`${document.location.pathname}?${search}`}
                      css={{
                        display: 'flex',
                        gap: '0.5rem',
                        justifyContent: 'space-between',
                        padding: 'var(--search-spacing-2xs) 0',
                        ':hover': {
                          'span:first-of-type': {
                            textDecoration: 'underline'
                          }
                        }
                      }}
                    >
                      <span>{filter.value}</span>
                      <span css={{ color: 'var(--ds-color-neutral-400)' }}>
                        {filter.count?.toLocaleString()}
                      </span>
                    </Anchor>
                  </li>
                );
              })}
            </ExpandableChildren>
          </ul>

          <div className='padding-y__2xs padding-x__none'>
            <ExpandableButton
              name={group.metadata.name + ' filters'}
              count={filtersWithoutActive.length}
              className='margin-bottom__xs'
            />
          </div>
        </Expandable>
      </div>
    </details>
  );
}

FilterGroupMultiselect.propTypes = {
  filters: PropTypes.object,
  group: PropTypes.object,
  uid: PropTypes.string,
  activeFilters: PropTypes.array
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

  if (!order || (searching && loading[active])) return null;

  return (
    <section aria-label='filters' css={{ background: '#FAFAFA' }}>
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
