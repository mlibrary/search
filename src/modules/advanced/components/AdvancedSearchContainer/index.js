import React from 'react'
import { connect } from 'react-redux'
import { _ } from 'underscore'
import {
  Link
} from 'react-router-dom';
import styled from 'react-emotion'
import {
  Tabs,
  TabList,
  Tab,
  TabPanel
} from '@umich-lib-ui/tabs'
import {
  CARD,
  colors
} from '@umich-lib-ui/styles'
import Text from '@umich-lib-ui/text'
import Heading from '@umich-lib-ui/heading'
import {
  Breadcrumb
} from '../../../reusable'
import AdvancedSearchForm from '../AdvancedSearchForm'

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

const StyledContainer = styled('div')({
  marginTop: '1rem'
})

const StyledTabPanelContainer = styled('div')({
  ...CARD,
  padding: '2rem 1.5rem',
  background: colors.grey[100],
  borderRadius: '0 0 4px 4px'
})

class AdvancedSearchContainer extends React.Component {
  render() {
    const {
      datastores,
      activeDatastore,
      activeDatastoreIndex
    } = this.props

    return (
      <StyledContainer className="container container-narrow">
        <Breadcrumb
          items={[
            {text: `${activeDatastore.name}`, to: `/${activeDatastore.slug}${document.location.search}` },
            {text: 'Advanced Search' }
          ]}
          renderAnchor={(item) => <Link to={item.to}>{item.text}</Link>}
        />

        <Heading size="xlarge" level={1}>Advanced Search</Heading>
        <Text lede>Select a search category below for associated advanced search options.</Text>
        
        <Tabs defaultIndex={activeDatastoreIndex}>
          <TabList>
            {datastores.map(ds =>
              <Tab key={`tab-${ds.uid}`}>{ds.name}</Tab>
            )}
          </TabList>
          <StyledTabPanelContainer>
            {datastores.map(ds => 
              <TabPanel key={`tabpanel-${ds.uid}`}>
                <AdvancedSearchForm datastore={ds} />
              </TabPanel>
            )}
          </StyledTabPanelContainer>
        </Tabs>
      </StyledContainer>
    )
  }
}

function mapStateToProps(state) {
  const datastores = state.datastores.datastores
  const activeDatastoreIndex = _.findIndex(datastores, {
    uid: state.datastores.active
  })

  return {
    datastores,
    activeDatastore: datastores[activeDatastoreIndex],
    activeDatastoreIndex
  };
}

export default connect(mapStateToProps)(AdvancedSearchContainer)