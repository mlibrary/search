import React from 'react';
import './styles.css';
import { useSelector } from 'react-redux';
import { Breadcrumb, H1, Tabs, TabList, TabPanel, Tab } from '../../../reusable';
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
    <div className='container container-narrow margin-top__m'>
      <Breadcrumb
        items={[
          { text: `${activeDatastore.name}`, to: `/${activeDatastore.slug}${document.location.search}` },
          { text: 'Advanced Search' }
        ]}
      />

      <H1 className='heading-xlarge'>Advanced Search</H1>
      <p className='font-lede'>Select a search category below for associated advanced search options.</p>

      <Tabs defaultIndex={activeDatastoreIndex}>
        <TabList className='advanced-tabs'>
          {datastores.map((ds) => {
            return (
              <Tab key={`tab-${ds.uid}`}>
                {ds.name}
              </Tab>
            );
          })}
        </TabList>

        <div className='tab-panel-container'>
          {datastores.map((ds) => {
            return (
              <TabPanel key={`tabpanel-${ds.uid}`}>
                <AdvancedSearchForm datastore={ds} />
              </TabPanel>
            );
          })}
        </div>
      </Tabs>
    </div>
  );
}

export default AdvancedSearchContainer;
