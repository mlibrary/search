/** @jsxImportSource @emotion/react */
import React from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import getHoldingByBarcode from '../../getHoldingByBarcode';
import { TrimString } from '../../../core';
import { RecordFullFormats, FullRecordPlaceholder } from '../../../records';
import ResourceAccess from '../../../resource-acccess';
import { COLORS } from '../../../reusable/umich-lib-core-temp';
import PropTypes from 'prop-types';

/*
  Hide the first column on the Get This page. No need for users to
  use "Get this" link when they're already at the Get This page.
*/

const StyledGetThisResourceAccessContainer = styled('div')({
  'td:first-of-type, th:first-of-type': {
    display: 'none'
  },
  'td:first-of-type + *, th:first-of-type + *': {
    paddingLeft: '0'
  },
  a: {
    textDecoration: 'underline'
  },
  table: {
    minWidth: 'auto',
    tableLayout: 'auto'
  }
});

function GetThisHolding ({ record, barcode }) {
  const holding = getHoldingByBarcode(record.resourceAccess, barcode);

  if (holding) {
    const recordData = {
      resourceAccess: [].concat({
        ...holding[0],
        preExpanded: true
      })
    };

    return (
      <StyledGetThisResourceAccessContainer>
        <div
          css={{
            borderBottom: `solid 1px ${COLORS.neutral[100]}`
          }}
        >
          <h3 className='visually-hidden'>Available at</h3>
          <ResourceAccess record={recordData} />
        </div>
      </StyledGetThisResourceAccessContainer>
    );
  }

  return null;
}

GetThisHolding.propTypes = {
  record: PropTypes.object,
  barcode: PropTypes.string
};

function GetBarcode ({ barcode }) {
  if (barcode) {
    return (
      <section className='record-container'>
        <p
          css={{
            fontSize: '1rem',
            marginTop: '0',
            marginBottom: '0',
            fontWeight: 600
          }}
        >
          Barcode:{' '}
          <span
            css={{
              color: '#637381',
              fontWeight: 400
            }}
          >
            {barcode}
          </span>
        </p>
      </section>
    );
  }
  return null;
}

GetBarcode.propTypes = {
  barcode: PropTypes.string
};

class GetThisRecord extends React.Component {
  render () {
    const { record, barcode } = this.props;

    if (!record) {
      return <FullRecordPlaceholder />;
    }

    return (
      <div className='full-record-container u-margin-bottom-1'>
        <RecordFullFormats formats={record.formats} />
        <div className='record-container'>
          <h2 className='full-record-title u-margin-bottom-none'>
            {[].concat(record.names).map((title, index) => {
              if (index > 0) {
                return (
                  <span className='vernacular vernacular-record-title' key={index}>
                    <TrimString string={title} />
                  </span>
                );
              }
              return (
                <TrimString string={title} key={index} />
              );
            })}
          </h2>
        </div>

        <GetThisHolding record={record} barcode={barcode} />
        <GetBarcode barcode={barcode} />
      </div>
    );
  }
}

GetThisRecord.propTypes = {
  record: PropTypes.object,
  barcode: PropTypes.string
};

function mapStateToProps (state) {
  return {
    record: state.records.record,
    datastoreUid: state.datastores.active,
    searchQuery: state.router.location.search,
    institution: state.institution
  };
}

export default connect(mapStateToProps)(GetThisRecord);

export { StyledGetThisResourceAccessContainer };
