/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useSelector } from "react-redux";
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

import {
  stringifySearchQueryForURL
} from '../../../pride'

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
    <section aria-label="filters">
      <Accordion
        preExpanded={preExpandedFilterGroups}
        allowMultipleExpanded
        allowZeroExpanded
        css={{
          margin: 0,
          padding: 0
        }}
      >
        {order.map(uid => (
          <FilterGroup uid={uid} key={datastores.active + uid} />
        ))}
      </Accordion>
    </section>
  );
}

function FilterGroup({ uid }) {
  const { datastores, filters } = useSelector(state => state);
  const group = filters.groups[uid];
  
  if (!group) {
    return null;
  }

  const uuid = datastores.active + "-" + uid

  return (
    <AccordionItem uuid={uuid} key={uuid}>
      <AccordionItemHeading>
        <AccordionItemButton
          css={{
            padding: `${SPACING['S']} ${SPACING['M']}`,
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >{group.metadata.name}</AccordionItemButton>
      </AccordionItemHeading>
      
      <AccordionItemState>
        {({ expanded }) => <FilterGroupFilters group={group} expanded={expanded} filters={group.filters} />}
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
          padding: `${SPACING['2XS']} ${SPACING['M']}`
        }}>
          <ExpandableButton
            name={group.metadata.name + " filters"}
            count={filters.length}
            kind="secondary"
            small
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
        padding: `${SPACING['2XS']} ${SPACING['M']}`,
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
  const urlSearchState = qs.parse(
    document.location.search.substring(1),
    { allowDots: true }
  )
  const filter = newSearchFilter({
    proposed: data.filter,
    existing: urlSearchState.filter
  })
  const newSearchState = {
    ...urlSearchState,
    ...data,
    filter
  }
  
  return qs.stringify(newSearchState, {
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