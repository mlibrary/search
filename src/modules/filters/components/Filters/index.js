/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom'
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
  ExpandableProvider,
  ExpandableChildren,
  ExpandableButton
} from '@umich-lib/core'

import {
  SPACING,
  COLORS
} from '../../../reusable/umich-lib-core-temp'

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
          <FilterGroup uid={uid} />
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

  const filterGroupName = group.metadata.name
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
        >{filterGroupName}</AccordionItemButton>
      </AccordionItemHeading>
      
      <AccordionItemState>
        {({ expanded }) => <FilterGroupFilters filterGroupName={filterGroupName} expanded={expanded} filters={group.filters} />}
      </AccordionItemState>
    </AccordionItem>
  );
}

function FilterGroupFilters({ filterGroupName, expanded, filters }) {
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
            {filters.map(f => <li><Filter {...f} /></li>)}
          </ExpandableChildren>
        </ul>

        <div css={{
          padding: `${SPACING['2XS']} ${SPACING['M']}`
        }}>
          <ExpandableButton
            name={filterGroupName + " filters"}
            count={filters.length}
            kind="secondary"
            small
          />
        </div>
      </Expandable>
    </AccordionItemPanel>
  )
}

function Filter({ value, name, count }) {
  return (
    <Link
      to=""
      css={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: `${SPACING['2XS']} ${SPACING['M']}`,
        ':hover': {
          'span:first-child': {
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
