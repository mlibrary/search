/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemPanel,
  AccordionItemButton,
  AccordionItemState
} from 'react-accessible-accordion';
import {
  Icon
} from '@umich-lib/core'

import HolderContainer from './holder-container'
import {
  COLORS,
  SPACING
} from '../umich-lib-core-temp/index'

/*
  Holders
    Holder
      Holdings
        Holding
*/
export default function Holders ({
  record,
  preExpandedIds,
  handleChange,
  createId,
  context
}) {
  return (
    <Accordion
      allowMultipleExpanded
      allowZeroExpanded
      preExpanded={preExpandedIds}
      css={{
        '[aria-expanded="true"][data-accordion-component]': {
          background: COLORS.blue['100']
        }
      }}
      onChange={(ids) => handleChange(ids)}
      key={record.type + record.uid}
    >
      {record.resourceAccess.map((data, i) => (
        <AccordionItem uuid={createId(record, i)}>
          <AccordionItemState>
            {({ expanded }) => (
              <React.Fragment>
                <AccordionItemHeading>
                  <AccordionItemHeadingContent data={data} expanded={expanded} />
                </AccordionItemHeading>
                <AccordionItemPanel>
                {expanded ? (
                  <HolderContainer context={context} {...data} />
                ) : null}
                </AccordionItemPanel>
              </React.Fragment>
            )}
          </AccordionItemState>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

const contentPadding = {
  padding: `${SPACING['S']} ${SPACING['M']}`
}

const headingStyles = {
  ...contentPadding,
  borderTop: `solid 1px ${COLORS.neutral['100']}`,
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  ':hover [data-holdings-holder-name]': {
    borderBottom: `solid 1px`
  },
  color: COLORS.neutral['300']
}

/*
  - Render the button to click on.
  - And create the Google Analytics click event handler.
*/
function AccordionItemHeadingContent({ data, expanded }) {
  const {
    rows,
    caption
  } = data
  
  return (
    <AccordionItemButton css={headingStyles}>
      <span css={{ paddingRight: SPACING['M'] }}>
        <span
          data-holdings-holder-name
          css={{ fontWeight: '600', color: COLORS.neutral['400'] }}
        >{caption || "Availability"}</span>
        <span css={{ padding: `0 ${SPACING['XS']}` }}>·</span>
        <span>{rows.length} item{rows.length > 1 ? 's' : null}</span>
      </span>
      <span>
        {expanded ? (
          <Icon
            size="24"
            d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"
          />
        ) : (
          <Icon
            size="24"
            d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"
          />
        )}
      </span>
    </AccordionItemButton>
  )
}