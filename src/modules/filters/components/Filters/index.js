/** @jsxImportSource @emotion/react */
import { useSelector } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import numeral from 'numeral';
import {
  Accordion,
  AccordionItem,
  AccordionItemState,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel
} from 'react-accessible-accordion';
import {
  Expandable,
  ExpandableChildren,
  ExpandableButton,
  Icon
} from '../../../reusable';
import { SPACING, COLORS } from '../../../reusable/umich-lib-core-temp';
import CheckboxFilters from '../CheckboxFilters';

import {
  filterOutActiveFilters,
  newSearch
} from '../../utilities';

import ActiveFilters from '../ActiveFilters';

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
  children: PropTypes.object
};

export default function Filters () {
  const { datastores, filters } = useSelector((state) => {
    return state;
  });
  const { order, groups } = filters;

  if (!order) {
    return null;
  }

  const preExpandedFilterGroups = order.reduce((memo, uid) => {
    if (groups[uid] && groups[uid].preExpanded) {
      memo = memo.concat(datastores.active + '-' + uid);
    }

    return memo;
  }, []);

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
        <Accordion
          preExpanded={preExpandedFilterGroups}
          key={preExpandedFilterGroups.join('-')}
          allowMultipleExpanded
          allowZeroExpanded
          css={{
            margin: 0,
            padding: 0,
            '& > *': {
              padding: `0 ${SPACING.M}`,
              borderBottom: `solid 1px ${COLORS.neutral['100']}`
            }
          }}
        >
          {order.map((uid) => {
            return (
              <FilterGroupContainer uid={uid} key={datastores.active + uid} />
            );
          })}
        </Accordion>
      </FiltersLoadingContainer>
    </section>
  );
}

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
    <AccordionItem uuid={uuid} key={uuid}>
      <AccordionItemState>
        {({ expanded }) => {
          return (
            <>
              <AccordionItemHeading>
                <AccordionItemButton
                  css={{
                    padding: SPACING.S,
                    margin: `0 -${SPACING.S}`,
                    fontWeight: '600',
                    cursor: 'pointer',
                    ':hover': {
                      textDecoration: 'underline'
                    },
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <span>{group.metadata.name}</span>
                  <span
                    css={{
                      color: COLORS.neutral['300']
                    }}
                  >
                    {expanded
                      ? (
                        <Icon
                          size={24}
                          d='M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z'
                        />
                        )
                      : (
                        <Icon
                          size={24}
                          d='M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z'
                        />
                        )}
                  </span>
                </AccordionItemButton>
              </AccordionItemHeading>
              <FilterGroupFilters
                group={group}
                expanded={expanded}
                filters={filtersWithoutActive}
              />
            </>
          );
        }}
      </AccordionItemState>
    </AccordionItem>
  );
}

FilterGroupMultiselect.propTypes = {
  filters: PropTypes.object,
  group: PropTypes.object,
  uid: PropTypes.string,
  uuid: PropTypes.string,
  activeFilters: PropTypes.array
};

function FilterGroupFilters ({ group, expanded, hidden = false, filters }) {
  if (hidden || !expanded || filters.length === 0) {
    return null;
  }

  return (
    <AccordionItemPanel>
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
            kind='secondary'
            small
            css={{
              marginBottom: SPACING.XS
            }}
          />
        </div>
      </Expandable>
    </AccordionItemPanel>
  );
}

FilterGroupFilters.propTypes = {
  group: PropTypes.object,
  expanded: PropTypes.bool,
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
    <Link
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
        {numeral(count).format(0, 0)}
      </span>
    </Link>
  );
}

Filter.propTypes = {
  value: PropTypes.string,
  count: PropTypes.number,
  url: PropTypes.string
};
