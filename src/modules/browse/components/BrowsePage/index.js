import { Breadcrumb, H1 } from '../../../reusable';
import { BrowseAtoZ, BrowseByFilters } from '../../../browse';
import React from 'react';
import { useSelector } from 'react-redux';

const BrowsePage = () => {
  const activeDatastoreUid = useSelector((state) => {
    return state.datastores.active;
  });
  const datastore = useSelector((state) => {
    return state.datastores.datastores.find((ds) => {
      return ds.uid === activeDatastoreUid;
    });
  }
  );
  const browse = useSelector((state) => {
    return state.browse[activeDatastoreUid];
  });

  return (
    <div className='container container-narrow margin-top__m'>
      <Breadcrumb
        items={[
          { text: `${datastore.name}`, to: `/${datastore.slug}${document.location.search}` },
          { text: 'Browse' }
        ]}
      />
      <H1>Browse all {datastore.name}</H1>
      <p className='font-lede'>When you&apos;re stuck looking for specific {datastore.name.toLowerCase()} or just want to see what&apos;s out there, the browse page makes finding the right {datastore.name.toLowerCase()} easy. Browse all {datastore.name.toLowerCase()} titles alphabetically or by academic discipline.</p>
      <BrowseAtoZ />
      <BrowseByFilters filters={browse} />
    </div>
  );
};

export default BrowsePage;
