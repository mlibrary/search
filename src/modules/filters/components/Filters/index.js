/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useSelector } from "react-redux";
import {
  Accordion,
  AccordionItem,
  AccordionItemState,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';

import {
  SPACING
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
        {({ expanded }) => <FilterGroupFilters expanded={expanded} filters={group.filters} />}
      </AccordionItemState>
    </AccordionItem>
  );
}

function FilterGroupFilters({ expanded, filters }) {
  if (!expanded) {
    return null
  }

  return (
    <AccordionItemPanel>
      <ul>
        {filters.map(f => <li>
          {f.name} {f.count}
        </li>)}
      </ul>
    </AccordionItemPanel>
  )
}
