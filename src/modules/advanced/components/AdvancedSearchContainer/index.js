import React from 'react';
import './styles.css';
import { useSelector } from 'react-redux';
import { Breadcrumb, H1, Tab, TabPanel, Tabs } from '../../../reusable';
import AdvancedSearchForm from '../AdvancedSearchForm';

function AdvancedSearchContainer () {
  const datastores = useSelector((state) => {
    return state.datastores.datastores;
  });
  const activeDatastoreUid = useSelector((state) => {
    return state.datastores.active;
  });
  const activeDatastoreIndex = datastores.findIndex((datastore) => {
    return datastore.uid === activeDatastoreUid;
  });
  const activeDatastore = datastores[activeDatastoreIndex];

  return (
    <div className='container container-narrow' style={{ marginTop: 'var(--search-spacing-m)' }}>
      <Breadcrumb
        items={[
          { text: `${activeDatastore.name}`, to: `/${activeDatastore.slug}${document.location.search}` },
          { text: 'Advanced Search' }
        ]}
      />

      <H1 className='heading-xlarge'>Advanced Search</H1>
      <p className='font-lede'>Select a search category below for associated advanced search options.</p>

      <Tabs defaultActiveIndex={activeDatastoreIndex}>
        {datastores.map((ds) => {
          return (
            <Tab key={`tab-${ds.uid}`}>
              {ds.name}
            </Tab>
          );
        })}
        {datastores.map((ds) => {
          return (
            <TabPanel key={`panel-${ds.uid}`} className='tab-panel-container'>
              <AdvancedSearchForm datastore={ds} />
            </TabPanel>
          );
        })}
      </Tabs>
    </div>
  );
}

export default AdvancedSearchContainer;
