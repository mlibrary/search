import React from 'react';
import { useSelector } from 'react-redux';
import { BrowseAtoZ, BrowseByFilters } from '../../../browse';
import { Breadcrumb, H1 } from '../../../reusable';

function BrowsePage () {
  const activeDatastoreUid = useSelector((state) => {
    return state.datastores.active;
  });
  const datastore = useSelector((state) => {
    return state.datastores.datastores.find((datastore) => {
      return datastore.uid === activeDatastoreUid;
    });
  }
  );
  const browse = useSelector((state) => {
    return state.browse[activeDatastoreUid];
  });

  return (
    <div className='container container-narrow u-margin-top-1'>
      <Breadcrumb
        items={[
          { text: `${datastore.name}`, to: `/${datastore.slug}${document.location.search}` },
          { text: 'Browse' }
        ]}
      />
      <H1 className='heading-xlarge'>Browse all {datastore.name}</H1>
      <p className='font-lede'>When you&apos;re stuck looking for specific {datastore.name.toLowerCase()} or just want to see what&apos;s out there, the browse page makes finding the right {datastore.name.toLowerCase()} easy. Browse all {datastore.name.toLowerCase()} titles alphabetically or by academic discipline.</p>
      <BrowseAtoZ />
      <BrowseByFilters filters={browse} />
    </div>
  );
}

export default BrowsePage;
