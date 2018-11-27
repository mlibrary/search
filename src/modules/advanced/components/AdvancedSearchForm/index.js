import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Button from '@umich-lib-ui/button'
import Icon from '@umich-lib-ui/icon'
import Alert from '@umich-lib-ui/alert'
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
  state = {
    errors: []
  }

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

  handleRemoveFieldedSearch({ removeIndex }) {
    this.props.removeFieldedSearch({
      datastoreUid: this.props.datastore.uid,
      removeIndex
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

    if (query.length === 0) {
      this.setState({
        errors: ['A search term is required to submit an advanced search.']
      })
    }

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

  renderErrors = () => {
    const {
      errors
    } = this.state
    
    if (errors) {
      return (
        <React.Fragment>
          {errors.map((error, i) => (
            <Alert intent="error" key={i}>
              <div
                className="x-spacing"
                style={{
                  fontSize: '1rem'
                }}
              >
                <Icon icon="error" size={20} />
                <span>{error}</span>
              </div>
            </Alert>
          ))}
        </React.Fragment>
      )
    }

    return null
  }

  render() {
    const {
      fields,
      fieldedSearches
    } = this.props
    
    return (
      <form className="y-spacing" onSubmit={this.handleSubmit}>
        {this.renderErrors()}

        {fieldedSearches.map((fs, i) => (
          <FieldInput
            key={i}
            fieldedSearchIndex={i}
            fieldedSearch={fs}
            fields={fields}
            handleFieldedSearchChange={this.handleFieldedSearchChange}
            handleRemoveFieldedSearch={() => this.handleRemoveFieldedSearch({ removeIndex: i})}
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