/** @jsxImportSource @emotion/react */
import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemPanel,
  AccordionItemButton,
  AccordionItemState
} from 'react-accessible-accordion';
import Icon from '../../reusable/components/Icon';
import HolderContainer from './holder-container';
import { COLORS, SPACING } from '../../reusable/umich-lib-core-temp/index';
import PropTypes from 'prop-types';

/*
  Holders
    Holder
      Holdings
        Holding
*/
export default function Holders ({
  record,
  preExpandedIds,
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
      key={record.type + record.uid}
    >
      {record.resourceAccess.map((data, i) => {
        return (
          <AccordionItem uuid={createId(record, i)} key={createId(record, i)}>
            <AccordionItemState>
              {({ expanded }) => {
                return (
                  <>
                    <AccordionItemHeading>
                      <AccordionItemHeadingContent
                        data={data}
                        expanded={expanded}
                      />
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      {expanded
                        ? (
                          <HolderContainer context={context} {...data} />
                          )
                        : null}
                    </AccordionItemPanel>
                  </>
                );
              }}
            </AccordionItemState>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}

Holders.propTypes = {
  record: PropTypes.object,
  preExpandedIds: PropTypes.array,
  createId: PropTypes.func,
  context: PropTypes.object
};

const contentPadding = {
  padding: `${SPACING.S} ${SPACING.M}`
};

const headingStyles = {
  ...contentPadding,
  borderTop: `solid 1px ${COLORS.neutral['100']}`,
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  ':hover [data-holdings-holder-name]': {
    borderBottom: 'solid 1px'
  },
  color: COLORS.neutral['300']
};

const icons = {
  description:
    'M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z',
  link:
    'M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z'
};

function getIconPath (type) {
  switch (type) {
    case 'electronic':
      return icons.link;
    default:
      return icons.description;
  }
}

/*
  - Render the button to click on.
  - And create the Google Analytics click event handler.
*/
function AccordionItemHeadingContent ({ data, expanded }) {
  const { rows, caption, type } = data;

  return (
    <AccordionItemButton css={headingStyles}>
      <span
        css={{
          paddingRight: SPACING.M
        }}
      >
        <span css={{ paddingRight: SPACING.S }}>
          <Icon d={getIconPath(type)} css={{ marginTop: '-4px' }} size={19} />
        </span>
        <span
          data-holdings-holder-name
          css={{ fontWeight: '600', color: COLORS.neutral['400'] }}
        >
          {caption || 'Availability'}
        </span>
        <span css={{ padding: `0 ${SPACING.XS}` }}>·</span>
        <span>
          {rows.length} item{rows.length > 1 ? 's' : null}
        </span>
      </span>
      <span>
        {expanded
          ? (
            <Icon size={24} d='M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z' />
            )
          : (
            <Icon size={24} d='M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z' />
            )}
      </span>
    </AccordionItemButton>
  );
}

AccordionItemHeadingContent.propTypes = {
  data: PropTypes.object,
  expanded: PropTypes.bool
};
