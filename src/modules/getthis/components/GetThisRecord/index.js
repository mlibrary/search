/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import { connect } from 'react-redux';
import styled from '@emotion/styled'
import getHoldingByBarcode from '../../getHoldingByBarcode'
import {
  TrimString
} from '../../../core'
import {
  RecordFullFormats,
  FullRecordPlaceholder
} from '../../../records'
import ResourceAccess from '../../../resource-acccess'
import {
  COLORS,
  MEDIA_QUERIES,
  SPACING
} from '../../../resource-acccess/umich-lib-core-temp'

/*
  Hide the first column on the Get This page. No need for users to
  use "Get this" link when they're already at the Get This page.
*/
const StyledGetThisResourceAccessContainer = styled('div')({
  'td:first-of-type': {
    display: 'none'
  },
  'th:first-of-type': {
    display: 'none'
  },
  'a': {
    textDecoration: 'underline'
  },
  'table': {
    tableLayout: 'auto',
    minWidth: 'auto'
  }
})

function GetThisHolding({ record, barcode }) {
  let holding = getHoldingByBarcode(record.resourceAccess, barcode)

  if (holding) {
    const recordData = {
      resourceAccess: [].concat({
        ...holding[0],
        preExpanded: true
      })
    }

    return (
      <StyledGetThisResourceAccessContainer>
        <div
          css={{
            '[data-accordion-component="AccordionItemPanel"]': {
              padding: `0 ${SPACING['M']}`
            },
            [MEDIA_QUERIES.LARGESCREEN]: {
              '[data-accordion-component="AccordionItemButton"]': {
                paddingLeft: '3rem'
              },
              '[data-accordion-component="AccordionItemPanel"]': {
                padding: `0 ${SPACING['M']}`,
                paddingLeft: '3rem'
              },
              borderBottom: `solid 1px ${COLORS.neutral[100]}`
            }
          }}
          aria-label="Available at"
        >
        <ResourceAccess record={recordData} />
        </div>
      </StyledGetThisResourceAccessContainer>
    )
  }

  return null
}

class GetThisRecord extends React.Component {
  render() {
    const {
      record,
      datastoreUid,
      barcode
    } = this.props;

    if (!record) {
      return <FullRecordPlaceholder />
    }

    return (
      <div className="full-record-container u-margin-bottom-1">
        <RecordFullFormats
          fields={record.fields}
          datastoreUid={datastoreUid}
        />
        <div className="record-container">
          <h1 className="full-record-title u-margin-bottom-none">
            {[].concat(record.names).map((title, index) => (
              <div key={index}>
                <TrimString string={title} />
              </div>
            ))}
          </h1>
        </div>

        <GetThisHolding
          record={record}
          barcode={barcode}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    record: state.records.record,
    datastoreUid: state.datastores.active,
    searchQuery: state.router.location.search,
    institution: state.institution,
  };
}

export default connect(mapStateToProps)(GetThisRecord);

export {
  StyledGetThisResourceAccessContainer
}
