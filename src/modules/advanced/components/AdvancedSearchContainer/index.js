/** @jsxImportSource @emotion/react */
import React from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';
import { MEDIA_QUERIES } from '../../../reusable/umich-lib-core-temp';
import {
  Breadcrumb,
  H1,
  Tabs,
  TabList,
  TabPanel,
  Tab
} from '../../../reusable';
import AdvancedSearchForm from '../AdvancedSearchForm';
import PropTypes from 'prop-types';

/*
Structure of the AdvancedSearch components:
  - AdvancedSearchContainer
    - Tabs
      - Form
        - FieldedInputs
          - FieldInput (many)
          - ...
          - AddAnotherFieldInput
        - Filter
          - Checkbox, NarrowSelect, DateInput, or MultipleSelect (many)
          - ...
        - SubmitSearch
*/

class AdvancedSearchContainer extends React.Component {
  render () {
    const {
      datastores,
      activeDatastore,
      activeDatastoreIndex
    } = this.props;

    return (
      <div
        css={{
          marginTop: '1rem'
        }}
        className='container container-narrow'
      >
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

          <div
            css={{
              boxShadow: 'rgba(0, 0, 0, 0.12) 0px 2px 2px 0px, rgba(0, 0, 0, 0.24) 0px 2px 4px 0px',
              padding: '1rem',
              background: 'var(--search-color-grey-100)',
              borderRadius: '0 0 4px 4px',
              [MEDIA_QUERIES.LARGESCREEN]: {
                padding: '2rem'
              }
            }}
          >
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
}

AdvancedSearchContainer.propTypes = {
  datastores: PropTypes.array,
  activeDatastore: PropTypes.object,
  activeDatastoreIndex: PropTypes.number
};

function mapStateToProps (state) {
  const datastores = state.datastores.datastores;
  const activeDatastoreIndex = _.findIndex(datastores, {
    uid: state.datastores.active
  });

  return {
    datastores,
    activeDatastore: datastores[activeDatastoreIndex],
    activeDatastoreIndex
  };
}

export default connect(mapStateToProps)(AdvancedSearchContainer);
