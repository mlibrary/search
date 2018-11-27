import React from 'react'
import Button from '@umich-lib-ui/button'
import Icon from '@umich-lib-ui/icon'

class AdvancedSearchForm extends React.Component {
  render() {
    const {
      datastore
    } = this.props
    
    return (
      <form>
        <Button><Icon icon="search" size={24} /> Submit Advanced Search</Button>
      </form>
    )
  }
}

export default AdvancedSearchForm