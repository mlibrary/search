import { Alert, Breadcrumb, H1 } from '../../../reusable';
import { GetThisOptions, GetThisRecord } from '../../../getthis';
import React, { useEffect } from 'react';
import { requestGetThis, requestRecord } from '../../../pride';
import { useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const GetThisPage = () => {
  const { barcode, recordUid } = useParams();
  const location = useLocation();
  const { record } = useSelector((state) => {
    return state.records;
  });
  const { active: datastoreUid } = useSelector((state) => {
    return state.datastores;
  });

  useEffect(() => {
    requestRecord({ datastoreUid, recordUid });
    requestGetThis({ barcode, datastoreUid, recordUid });
  }, [recordUid, datastoreUid, barcode]);

  return (
    <article className='container container-narrow'>
      <div className='u-margin-top-1'>
        <Breadcrumb
          items={[
            { text: 'Catalog', to: `/catalog${location.search}` },
            { text: 'Record', to: `/catalog/record/${recordUid}${location.search}` },
            { text: 'Get This' }
          ]}
        />
      </div>
      <H1 className='heading-xlarge'>Get This</H1>
      {record?.fields?.length === 0 && record?.names?.length === 0
        ? (
            <section className='container__rounded page'>
              <Alert type='error'>
                <span className='strong'>Error:</span> Unable to find this record.
              </Alert>
            </section>
          )
        : (
            <>
              <GetThisRecord barcode={barcode} />
              <section className='card get-this-section y-spacing'>
                <h2 className='fieldset-label margin-top__none'>
                  How would you like to get this item?
                </h2>
                <GetThisOptions record={record} />
              </section>
            </>
          )}
    </article>
  );
};

export default GetThisPage;
