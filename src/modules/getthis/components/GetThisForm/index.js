import React from 'react'
import { connect } from 'react-redux';
import ReactGA from 'react-ga'
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
        <input
          className="button margin-right-1"
          id={name}
          type={type}
          name={name}
          value={value}
          disabled={loading}
        />
        {loading && (<span role="alert">Placing hold ...</span>)}
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
    const { datastoreUid, recordId, form, label } = this.props;
    const { loading, fields } = this.state

    ReactGA.event({
      action: 'Catalog Get This',
      category: 'Item Request',
      label: `Submit Get This ${label}`
    })

    // Submitted form is type ajax and not already loading.
    if (form.type === 'ajax' && !loading) {
      event.preventDefault()

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
      const item = getFieldValueByName('item')
      const location = getFieldValueByName('pickup_location')
      const date = getFieldValueByName('not_needed_after').replace(/-/g, '')

      this.setState({ loading: true })

      placeHold({
        datastoreUid,
        recordId,
        item,
        location,
        date,
        callback
      })
    }
  }

  renderResponse = () => {
    const { response } = this.state

    if (response) {
      if (response.status === 'Action Succeeded') {
        return (
          <article className="alert alert-success">
            <h4>You have successfully requested this item</h4>

            <ul className="u-margin-bottom-1 margin-left-2">
              <li>We will email you when it is available for pickup.</li>
              <li>When it is available, we'll hold it for you for 7 days.</li>
            </ul>

            <a href="https://account.lib.umich.edu/pending-requests/u-m-library" className="underline">View all your holds</a>
          </article>
        )
      } else {
        return (
          <article className="alert alert-warning">
            <h4>The hold/request could not be placed</h4>

            <p><b>Status:</b> {response.status}</p>

            <p class="u-margin-bottom-none">Please contact the Graduate Library Circulation Desk at <a href="mailto:glcirc@umich.edu" className="underline">glcirc@umich.edu</a> or <a href="tel:7347640401" className="underline">(734) 764-0401</a> for assistance.</p>
          </article>
        )
      }
    }

    return null
  }

  render() {
    const { form } = this.props
    const { fields, loading, response } = this.state
    const showForm = !response || response.status !== 'Action Succeeded'

    if (!form) {
      return (
        <div className="alert alert-warning" role="alert">
          <p><b>Error:</b> Unable to fetch details.</p>
        </div>
      )
    }

    return (
      <React.Fragment>
        <div role="alert">
        {this.renderResponse()}
        </div>

        {showForm && (
          <form action={form.action} method={form.method} onSubmit={this.handleSubmit}>
            {fields.map((field, key) => (
              <Field field={field} key={key} handeFieldChange={this.handeFieldChange} loading={loading} />
            ))}
          </form>
        )}
      </React.Fragment>
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
