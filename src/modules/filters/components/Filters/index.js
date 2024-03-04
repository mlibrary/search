/** @jsxImportSource @emotion/react */
import React from 'react';
import { useSelector } from 'react-redux';
import {
  Anchor,
  Expandable,
  ExpandableChildren,
  ExpandableButton,
  Icon
} from '../../../reusable';
import { SPACING, COLORS } from '../../../reusable/umich-lib-core-temp';
import CheckboxFilters from '../CheckboxFilters';
import {
  getURLWithoutFilters,
  getURLWithFilterRemoved,
  filterOutActiveFilters,
  newSearch
} from '../../utilities';
import PropTypes from 'prop-types';

const filterGroupStyles = {
  padding: `0 ${SPACING.M}`,
  borderBottom: `solid 1px ${COLORS.neutral['100']}`
};

function FiltersLoadingContainer ({ children }) {
  const { datastores, search, records } = useSelector((state) => {
    return state;
  });
  const isLoading = search.searching && records.loading[datastores.active];

  if (isLoading) {
    return null;
  }

  return children;
}

FiltersLoadingContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default function Filters () {
  const { datastores, filters } = useSelector((state) => {
    return state;
  });
  const { order } = filters;

  if (!order) {
    return null;
  }

  return (
    <section
      aria-label='filters'
      css={{
        background: '#FAFAFA'
      }}
    >
      <ActiveFilters />
      <CheckboxFilters />
      <FiltersLoadingContainer>
        {order.map((uid) => {
          return (
            <FilterGroupContainer uid={uid} key={datastores.active + uid} />
          );
        })}
      </FiltersLoadingContainer>
    </section>
  );
}

function ActiveFilters () {
  const { datastores, filters } = useSelector((state) => {
    return state;
  });
  const active = filters.active[datastores.active];

  if (!active) {
    return null;
  }

  /*
    input:
    {
      subject: ['Birds', 'Birds North America'],
      format: ['Science', 'Biology']
    }

    expected output:
    [
      { group: 'subject', value: 'Birds' },
      { group: 'subject', value: 'Birds North America' },
      { group: 'format', value: 'Science' },
      { group: 'format', value: 'Biology' }
    ]
  */
  const items = Object.keys(active).reduce((acc, group) => {
    // Just don't show the checkbox filters as active filter items.
    if (!filters.groups[group] || filters.groups[group].type !== 'checkbox') {
      const activeFiltersToAdd = active[group].map((value) => {
        return { group, value };
      });

      acc = acc.concat(activeFiltersToAdd);
    }

    return acc;
  }, []);

  if (items.length === 0) {
    return null;
  }

  return (
    <section
      aria-label='active-filters'
      css={{
        ...filterGroupStyles,
        padding: `${SPACING.S} ${SPACING.M}`
      }}
    >
      <h2
        id='active-filters'
        css={{
          fontSize: '1rem',
          marginTop: '0',
          marginBottom: SPACING.XS
        }}
      >
        Active filters
      </h2>

      <ul
        css={{
          margin: 0,
          listStyle: 'none'
        }}
      >
        {items.map((item, i) => {
          return (
            <li
              key={i + item.group + item.value}
              css={{
                marginBottom: SPACING.XS,
                ':last-of-type': {
                  marginBottom: 0
                }
              }}
            >
              <ActiveFilterItem {...item} />
            </li>
          );
        })}
      </ul>

      {
        items.length > 1 &&
          <Anchor
            to={getURLWithoutFilters()}
            css={{
              display: 'inline-block',
              paddingTop: SPACING.XS,
              textDecoration: 'underline',
              color: COLORS.neutral['300']
            }}
          >
            Clear all active filters
          </Anchor>
      }
    </section>
  );
}

function ActiveFilterItem ({ group, value }) {
  const { groups } = useSelector((state) => {
    return state.filters;
  });
  const url = getURLWithFilterRemoved({ group, value });

  return (
    <Anchor
      to={url}
      css={{
        padding: `${SPACING.XS} ${SPACING.S}`,
        color: COLORS.green['500'],
        background: COLORS.green['100'],
        border: `solid 1px ${COLORS.green['200']}`,
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
  );
}

ActiveFilterItem.propTypes = {
  group: PropTypes.string,
  value: PropTypes.string
};

function FilterGroupContainer ({ uid }) {
  const { datastores, filters } = useSelector((state) => {
    return state;
  });
  const group = filters.groups[uid];

  if (!group || group.filters.length === 0) {
    return null;
  }

  const activeFilters = filters.active[datastores.active]
    ? filters.active[datastores.active][uid]
    : null;

  const uuid = datastores.active + '-' + uid;

  const props = {
    uid,
    uuid,
    group,
    datastores,
    filters,
    activeFilters
  };

  if (group.type === 'multiselect') {
    return <FilterGroupMultiselect {...props} />;
  }

  return null;
}

FilterGroupContainer.propTypes = {
  uid: PropTypes.string
};

function FilterGroupMultiselect ({ filters, group, uid, uuid, activeFilters }) {
  const filtersWithoutActive = filterOutActiveFilters({
    active: activeFilters,
    filters: filters.groups[uid].filters
  });

  if (filtersWithoutActive.length === 0) {
    return null;
  }

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
            color: COLORS.neutral['300']
          }}
        >
          <Icon
            size={24}
            d='M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z'
          />
          <Icon
            size={24}
            d='M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z'
          />
        </span>
      </summary>
      <FilterGroupFilters
        group={group}
        filters={filtersWithoutActive}
      />
    </details>
  );
}

FilterGroupMultiselect.propTypes = {
  filters: PropTypes.object,
  group: PropTypes.object,
  uid: PropTypes.string,
  uuid: PropTypes.string,
  activeFilters: PropTypes.array
};

function FilterGroupFilters ({ group, hidden = false, filters }) {
  if (hidden || filters.length === 0) {
    return null;
  }

  return (
    <div>
      <Expandable>
        <ul
          css={{
            listStyle: 'none',
            margin: '0'
          }}
        >
          <ExpandableChildren show={5}>
            {filters.map((f, i) => {
              return (
                <li key={group.metadata.name + f.value + i}>
                  <FilterContainer group={group} {...f} />
                </li>
              );
            })}
          </ExpandableChildren>
        </ul>

        <div
          css={{
            padding: `${SPACING['2XS']} 0`
          }}
        >
          <ExpandableButton
            name={group.metadata.name + ' filters'}
            count={filters.length}
            css={{
              marginBottom: SPACING.XS
            }}
          />
        </div>
      </Expandable>
    </div>
  );
}

FilterGroupFilters.propTypes = {
  group: PropTypes.object,
  hidden: PropTypes.bool,
  filters: PropTypes.array
};

function FilterContainer ({ group, value, count }) {
  const search = newSearch({ filter: { [group.uid]: value }, page: undefined });
  const url = document.location.pathname + '?' + search;

  return <Filter url={url} value={value} count={count} />;
}

FilterContainer.propTypes = {
  group: PropTypes.object,
  value: PropTypes.string,
  count: PropTypes.number
};

function Filter ({ value, count, url }) {
  return (
    <Anchor
      to={url}
      css={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: `${SPACING['2XS']} 0`,
        ':hover': {
          'span:first-of-type': {
            textDecoration: 'underline'
          }
        }
      }}
    >
      <span css={{ marginRight: SPACING.XS }}>{value}</span>
      <span css={{ color: COLORS.neutral['400'] }}>
        {count?.toLocaleString()}
      </span>
    </Anchor>
  );
}

Filter.propTypes = {
  value: PropTypes.string,
  count: PropTypes.number,
  url: PropTypes.string
};
