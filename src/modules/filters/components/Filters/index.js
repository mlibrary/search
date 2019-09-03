/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useSelector } from "react-redux";
import React from 'react';
import { Link } from 'react-router-dom'
import { _ } from 'underscore'
import qs from 'qs'
import {
  Accordion,
  AccordionItem,
  AccordionItemState,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';

import {
  Expandable,
  ExpandableChildren,
  ExpandableButton
} from '@umich-lib/core'

import {
  SPACING,
  COLORS
} from '../../../reusable/umich-lib-core-temp'
import Icon from '../../../reusable/components/Icon'

const filterGroupStyles = {
  padding: `0 ${SPACING['M']}`,
  borderBottom: `solid 1px ${COLORS.neutral['100']}`
}

export default function Filters() {
  const { datastores, filters } = useSelector(state => state);
  const { order, groups } = filters

  const preExpandedFilterGroups = order.reduce((memo, uid) => {
    if (groups[uid] && groups[uid].preExpanded) {
      memo = memo.concat(datastores.active + "-" + uid)
    }

    return memo
  }, [])

  return (
    <section
      aria-label="filters"
      css={{
        background: '#FAFAFA'
      }}
    >
      <ActiveFilters />
      <Accordion
        preExpanded={preExpandedFilterGroups}
        allowMultipleExpanded
        allowZeroExpanded
        css={{
          margin: 0,
          padding: 0,
          '& > *': {
            ...filterGroupStyles
          }
        }}
      >
        {order.map(uid => (
          <FilterGroup uid={uid} key={datastores.active + uid} />
        ))}
      </Accordion>
    </section>
  );
}

function ActiveFilters() {
  const { datastores, filters } = useSelector(state => state);
  const active = filters.active[datastores.active]

  if (!active) {
    return null
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
    acc = acc.concat(active[group].map(item => {
      return {
        group,
        value: item
      }
    }))

    return acc
  }, [])

  return (
    <section
      aria-label="active-filters"
      css={{
        ...filterGroupStyles,
        padding: `${SPACING['S']} ${SPACING['M']}`
      }}
    >
      <h2 id="active-filters" css={{
        fontSize: '1rem',
        marginTop: '0'
      }}>Active filters</h2>

      <ul css={{
        margin: 0,
        listStyle: 'none'
      }}>
        {items.map((item, i) => (
          <li
            key={i + item.group + item.value}
            css={{
              marginBottom: SPACING['XS'],
              ':last-of-type': {
                marginBottom: 0
              }
            }}
          >
            <ActiveFilterItem {...item} />
          </li>
        ))}
      </ul>

      {items.length > 1 && (
        <ClearActiveFiltersLink />
      )}
    </section>
  )
}

function ClearActiveFiltersLink() {
  const url = getURLWithoutFilters()

  return (
    <Link
      to={url}
      css={{
        display: 'inline-block',
        paddingTop: SPACING['XS'],
        textDecoration: 'underline',
        color: COLORS.neutral['300']
      }}
    >Clear all active filters</Link>
  )
}

function ActiveFilterItem({ group, value }) {
  const { groups } = useSelector(state => state.filters);
  const url = getURLWithFilterRemoved({ group, value })

  if (!groups[group]) {
    return null
  }

  return (
    <Link
      to={url}
      css={{
        padding: `${SPACING['XS']} ${SPACING['S']}`,
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
      <span>{groups[group].metadata.name}: {value}</span>
      <Icon icon="close" />
    </Link>
  )
}

function FilterGroup({ uid }) {
  const { datastores, filters } = useSelector(state => state);
  const group = filters.groups[uid];
  
  if (!group) {
    return null;
  }

  const activeFilters = filters.active[datastores.active]
    ? filters.active[datastores.active][uid]
    : null

  const uuid = datastores.active + "-" + uid

  return (
    <AccordionItem uuid={uuid} key={uuid}>
      <AccordionItemState>
      {({ expanded }) => (
        <React.Fragment>
          <AccordionItemHeading>
            <AccordionItemButton
              css={{
                padding: SPACING['S'],
                margin: `0 -${SPACING['S']}`,
                fontWeight: '600',
                cursor: 'pointer',
                ':hover': {
                  textDecoration: 'underline'
                },
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span>{group.metadata.name}</span>
              <span css={{
                color: COLORS.neutral['300']
              }}>
              {expanded ? (
                <Icon
                  size={24}
                  d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"
                />
              ) : (
                <Icon
                  size={24}
                  d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"
                />
              )}
              </span>
            </AccordionItemButton>
          </AccordionItemHeading>
          <FilterGroupFilters
            group={group}
            expanded={expanded}
            filters={filterOutActiveFilters({
              active: activeFilters,
              filters: filters.groups[uid].filters
            })}
          />
        </React.Fragment>
      )}
      </AccordionItemState>
    </AccordionItem>
  );
}

function FilterGroupFilters({ group, expanded, filters }) {
  if (!expanded) {
    return null
  }

  return (
    <AccordionItemPanel>
      <Expandable>
        <ul css={{
          listStyle: 'none',
          margin: '0'
        }}>
          <ExpandableChildren show={5}>
            {filters.map((f, i) => <li key={group.metadata.name + f.value + i}><FilterContainer group={group} {...f} /></li>)}
          </ExpandableChildren>
        </ul>

        <div css={{
          padding: `${SPACING['2XS']} 0`
        }}>
          <ExpandableButton
            name={group.metadata.name + " filters"}
            count={filters.length}
            kind="secondary"
            small
            css={{
              marginBottom: SPACING['XS']
            }}
          />
        </div>
      </Expandable>
    </AccordionItemPanel>
  )
}

function FilterContainer({ group, value, count }) {
  const search = newSearch({ filter: { [group.uid]: value }})
  const url = document.location.pathname + '?' + search

  return (
    <Filter
      url={url}
      value={value}
      count={count}
    />
  )
}

function Filter({ value, count, url }) {
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
      <span css={{ marginRight: SPACING['XS'] }}>{value}</span>
      <span css={{ color: COLORS.neutral['400'] }}>{count}</span>
    </Link>
  )
}

/*
  newQuery

  Args:
    - filter
    - query
    - sort
    - library
    - page
*/
function newSearch(data) {
  const urlSearchState = getSearchStateFromURL()
  const filter = newSearchFilter({
    proposed: data.filter,
    existing: urlSearchState.filter
  })
  const newSearchState = {
    ...urlSearchState,
    ...data,
    filter
  }

  return stringifySearch(newSearchState)
}

function getSearchStateFromURL() {
  return qs.parse(
    document.location.search.substring(1),
    { allowDots: true }
  )
}

function stringifySearch(searchStateObj) {
  return qs.stringify(searchStateObj, {
    arrayFormat: 'repeat',
    encodeValuesOnly: true,
    allowDots: true,
    format : 'RFC1738'
  })
}

function newSearchFilter({ proposed = {}, existing = {} }) {
  const groups = Object.keys(proposed).concat(Object.keys(existing))
  const filter = groups.reduce((acc, group) => {
    return {
      ...acc,
      [group]: _.unique(
        [].concat(proposed[group])
          .concat(existing[group])
      )
    }
  }, {})

  return filter
}

/*
  Remove a filter from the URL.

  Removes the value from a filter group
  and will remove the group if the value
  is the group's only value.

  returns a new URL with the filter removed.
*/
function getURLWithFilterRemoved({ group, value }) {
  const urlSearchState = getSearchStateFromURL()
  const groups = Object.keys(urlSearchState.filter)
  const filter = groups.reduce((acc, g) => {
    if (g === group) {
      if (Array.isArray(urlSearchState.filter[g])) {
        acc = {
          ...acc,
          [g]: urlSearchState.filter[g].filter(val => val !== value)
        }
      }
    } else {
      acc = {
        ...acc,
        [g]: urlSearchState.filter[g]
      }
    }

    return acc
  }, {})
  const newSearchState = {
    ...urlSearchState,
    filter
  }

  return document.location.pathname + '?' + stringifySearch(newSearchState)
}

function getURLWithoutFilters() {
  return document.location.pathname + '?' + stringifySearch({
    ...getSearchStateFromURL(),
    filters: undefined
  })
}

/*
  Remove active filter values from the
  list of filter objects that contain
  that value.

  active: ["Book"]
  filters: [
    {
      value: "Book",
      ...
    },
    {
      value: "Serial"
    },
    {
      ...
    }
  ]

  output:
  [
    {
      value: "Serial"
    },
    {
      ...
    }
  ]

*/

function filterOutActiveFilters({ active, filters}) {
  if (!active) {
    return filters
  }

  return filters.filter(({ value }) => !_.contains(active, value) )
}