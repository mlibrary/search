import React from 'react'
import { connect } from 'react-redux';

import {
  getField,
  getFieldValue,
} from '../../../records/utilities';

import {
  placeHold
} from '../../../pride'

const Select = ({ field, handeFieldChange }) => {
  const { name, value, options } = field;

  return (
    <select id={name} name={name} className="dropdown" value={value} onChange={handeFieldChange}>
      {options.map((option, key) => (
        <option
          key={key}
          value={option.value}
          disabled={option.disabled && 'disabled'}
        >{option.name}</option>
      ))}
    </select>
  )
}

const Field = ({ field, handeFieldChange, loading }) => {
  const { type, name, value } = field;

  if (type === 'hidden') {
    return (
      <input id={name} type={type} name={name} value={value} onChange={handeFieldChange} />
    )
  } else if (type === 'select') {
    return (
      <div className="form-group">
        {field.label && (
          <label className="form-label" htmlFor={field.name}>{field.label}</label>
        )}
        <Select field={field} handeFieldChange={handeFieldChange} />
      </div>
    )
  } else if (type === 'submit') {
    return (
      <React.Fragment>
        <input className="button margin-right-1" id={name} type={type} name={name} value={value} disabled={loading}/>
        {loading && (<span>Placing hold ...</span>)}
      </React.Fragment>
    )
  }

  return (
    <div className="form-group">
      {field.label && (
        <label className="form-label" htmlFor={field.name}>{field.label}</label>
      )}
      <input className="form-control" id={name} type={type} name={name} value={value} onChange={handeFieldChange} />
    </div>
  )
}

class GetThisForm extends React.Component {
  state = {
    fields: this.props.form.fields
  }

  handeFieldChange = (event) => {
    // Update field with user changed value.
    const fields = this.state.fields.reduce((acc, field) => {
      if (field.name === event.target.name) {
        return acc.concat({
          ...field,
          value: event.target.value
        })
      } else {
        return acc.concat(field)
      }
    }, [])

    this.setState({ fields })
  }

  handleSubmit = (event) => {
    const { datastoreUid, recordId, form } = this.props;
    const { loading } = this.state

    // Submitted form is type ajax and not already loading.
    if (form.type === 'ajax' && !loading) {
      event.preventDefault()

      const { fields } = this.state
      const getFieldValueByName = (name) => {
        const field = fields.filter(field => field.name === name)[0]

        if (field) {
          return field.value
        }
      }
      const callback = (response) => {
        this.setState({ loading: false })
        this.setState({ response: response })
      }

      this.setState({ loading: true })

      placeHold({
        datastoreUid,
        recordId,
        item:     getFieldValueByName('item'),
        location: getFieldValueByName('pickup_location'),
        date:     getFieldValueByName('not_needed_after').replace(/-/g, ''),
        callback
      })
    }
  }

  render() {
    const { form } = this.props
    const { fields, loading, response } = this.state

    if (response) {
      if (response.statis === 'Action Succeeded') {
        return (
          <div className="alert alert-success">
            <p><b>Success!</b> You have requested this item.</p>
          </div>
        )
      } else {
        return (
          <div className="alert alert-warning">
            <p><b>Error:</b> Something went wrong when requesting this item.</p>
          </div>
        )
      }
    }

    if (!form) {
      return (
        <div className="alert alert-warning">
          <p><b>Error:</b> Unable to fetch details.</p>
        </div>
      )
    }

    return (
      <form action={form.action} method={form.method} onSubmit={this.handleSubmit}>
        {fields.map((field, key) => (
          <Field field={field} key={key} handeFieldChange={this.handeFieldChange} loading={loading} />
        ))}
      </form>
    )
  }
}

function mapStateToProps(state) {
  return {
    recordId: getFieldValue(getField(state.records.record.fields, 'id'))[0],
    datastoreUid: state.datastores.active
  };
}

export default connect(mapStateToProps)(GetThisForm);
