import React from 'react'
import {
  Tabs,
  TabList,
  Tab,
  TabPanel
} from '@umich-lib-ui/tabs'
import {
  CARD,
  colors,
  MEDIA_QUERIES
} from '@umich-lib-ui/styles'
import Button from '@umich-lib-ui/button'
import Icon from '@umich-lib-ui/icon'
import Heading from '@umich-lib-ui/heading'
import styled from 'react-emotion'

const StyledContainer = styled('div')({
  ...CARD
})

/*
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
  render() {
    return (
      <StyledContainer data-inner-container>
        <Heading size="xlarge" level={1}>Advanced Search</Heading>
        <p>Advanced Search placeholder</p>
      </StyledContainer>
    )
  }
}

export default AdvancedSearchContainer