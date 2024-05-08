import React from 'react';
import './styles.css';
import { useSelector } from 'react-redux';
import getHoldingByBarcode from '../../getHoldingByBarcode';
import { TrimString } from '../../../core';
import { RecordFullFormats, FullRecordPlaceholder } from '../../../records';
import { ResourceAccess } from '../../../resource-acccess';
import PropTypes from 'prop-types';

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
      <div
        className='get-this-resource-access-container'
        style={{
          borderBottom: 'solid 1px var(--ds-color-neutral-100)'
        }}
      >
        <h3 className='visually-hidden'>Available at</h3>
        <ResourceAccess record={recordData} />
      </div>
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
        <p className='margin-y__none'>
          <span style={{ fontWeight: 600 }}>
            Barcode:{' '}
          </span>
          <span style={{ color: 'var(--ds-color-neutral-300)' }}>
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

function GetThisRecord ({ barcode }) {
  const record = useSelector((state) => {
    return state.records.record;
  });

  if (!record) {
    return <FullRecordPlaceholder />;
  }

  return (
    <div className='container__rounded full-record-container u-margin-bottom-1'>
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

GetThisRecord.propTypes = {
  barcode: PropTypes.string
};

export default GetThisRecord;
