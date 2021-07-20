import React from 'react'
import { connect } from 'react-redux'
import _ from 'underscore'
import {
  Link
} from 'react-router-dom';
import styled from '@emotion/styled'
import {
  Tabs,
  TabList,
  Tab,
  TabPanel,
  Text,
  Heading,
  COLORS,
  MEDIA_QUERIES
} from '@umich-lib/core'
import {
  Breadcrumb
} from '../../../reusable'
import AdvancedSearchForm from '../AdvancedSearchForm'

const CARD = {
  boxShadow: 'rgba(0, 0, 0, 0.12) 0px 2px 2px 0px, rgba(0, 0, 0, 0.24) 0px 2px 4px 0px',
  background: 'rgb(250, 250, 250)'
}

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

const StyledTab = styled(Tab)(props => ({
  [MEDIA_QUERIES.LARGESCREEN]: {
    background: props.selected ? COLORS.grey[100] : 'inherit',
    borderBottomColor: props.selected ? COLORS.grey[100] : 'none'
  }
}))

StyledTab.tabsRole = 'Tab';

const StyledContainer = styled('div')({
  marginTop: '1rem'
})

const StyledTabPanelContainer = styled('div')({
  ...CARD,
  padding: '1rem',
  background: COLORS.grey[100],
  borderRadius: '0 0 4px 4px',
  [MEDIA_QUERIES.LARGESCREEN]: {
    padding: '2rem'
  }
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
              <StyledTab key={`tab-${ds.uid}`}>{ds.name}</StyledTab>
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