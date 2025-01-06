import './styles.css';
import { FullRecordPlaceholder, RecordFullFormats } from '../../../records';
import getHoldingByBarcode from '../../getHoldingByBarcode';
import React from 'react';
import { ResourceAccess } from '../../../resource-acccess';
import { TrimString } from '../../../core';
import { useSelector } from 'react-redux';

const GetThisRecord = ({ barcode }) => {
  const record = useSelector((state) => {
    return state.records.record;
  });

  if (!record) {
    return <FullRecordPlaceholder />;
  }

  const holding = getHoldingByBarcode(record.resourceAccess, barcode);

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

      {holding && (
        <div className='get-this-resource-access-container record-holders-container'>
          <h3 className='visually-hidden'>Available at</h3>
          <ResourceAccess record={{
            resourceAccess: [].concat({
              ...holding[0],
              preExpanded: true
            })
          }}
          />
        </div>
      )}
      {barcode && (
        <section className='record-container'>
          <p className='margin-y__none'>
            <span className='strong'>
              Barcode:{' '}
            </span>
            <span className='text-grey__light'>
              {barcode}
            </span>
          </p>
        </section>
      )}
    </div>
  );
};

export default GetThisRecord;
