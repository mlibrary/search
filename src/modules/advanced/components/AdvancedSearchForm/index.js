import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Button from '@umich-lib-ui/button'
import Icon from '@umich-lib-ui/icon'
import {
  stringifySearchQueryForURL,
} from '../../../pride'
import {
  withRouter
} from 'react-router-dom';
import FieldInput from '../FieldInput'
import {
  addFieldedSearch,
  removeFieldedSearch,
  setFieldedSearch
} from '../../../advanced'

class AdvancedSearchForm extends React.Component {
  handleFieldedSearchChange = ({
    fieldedSearchIndex,
    selectedFieldUid,
    query,
    booleanType
  }) => {
    this.props.setFieldedSearch({
      datastoreUid: this.props.datastore.uid,
      fieldedSearchIndex,
      selectedFieldUid,
      query,
      booleanType,
    })
  }

  handleAddAnotherFieldedSearch = () => {
    this.props.addFieldedSearch({
      datastoreUid: this.props.datastore.uid,
      field: this.props.fields[0].uid
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const {
      fieldedSearches,
      booleanTypes,
      institution,
      datastore
    } = this.props

    // Build the query
    // example: 'title:parrots AND author:charles'
    const query = fieldedSearches.reduce((memo, fieldedSearch, index) => {
      if (fieldedSearch.query.length) {
        if (memo.length > 0) {
          memo.push(booleanTypes[fieldedSearch.booleanType])
        }

        memo.push(`${fieldedSearch.field}:${fieldedSearch.query}`)
      }

      return memo
    }, []).join(' ')

    // TODO: Build the filters

    // Submit search if query or filters are active
    if ((query.length > 0)){
      const { history } = this.props
      const library = datastore.uid === 'mirlyn' ? institution.active : undefined
      const queryString = stringifySearchQueryForURL({
        query,
        library
      })

      const url = `/${datastore.slug}?${queryString}`
      history.push(url)
    }
  }

  render() {
    const {
      datastore,
      booleanTypes,
      fields,
      fieldedSearches
    } = this.props
    
    return (
      <form className="y-spacing" onSubmit={this.handleSubmit}>
        {fieldedSearches.map((fs, i) => (
          <FieldInput
            fieldedSearchIndex={i}
            fieldedSearch={fs}
            fields={fields}
            handleFieldedSearchChange={this.handleFieldedSearchChange}
          />
        ))}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around'
          }}
        >
          <Button
            kind="secondary"
            small
            onClick={this.handleAddAnotherFieldedSearch}
          >
            Add another field
          </Button>
        </div>
        
        <Button
          style={{ marginTop: '2rem' }}
          type="submit"
        ><Icon icon="search" size={24} /> Advanced Search</Button>
      </form>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addFieldedSearch,
    removeFieldedSearch,
    setFieldedSearch
  }, dispatch)
}

function mapStateToProps(state, props) {
  const {
    datastore
  } = props

  return {
    booleanTypes: state.advanced.booleanTypes,
    fieldedSearches: state.advanced[datastore.uid].fieldedSearches,
    fields: state.advanced[datastore.uid].fields,
    institution: state.institution
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AdvancedSearchForm)
)