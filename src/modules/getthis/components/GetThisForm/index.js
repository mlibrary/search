import React from 'react'

const Select = ({ field }) => {
  const { name, options } = field;

  return (
    <select id={name} name={name} className="dropdown">
      {options.map((option, key) => (
        <option
          key={key}
          value={option.value}
          disabled={option.disabled && 'disabled'}
          selected={option.selected && 'selected'}
        >{option.name}</option>
      ))}
    </select>
  )
}

const Field = ({ field }) => {
  const { type, name, value } = field;

  if (type === 'hidden') {
    return (
      <input id={name} type={type} name={name} defaultValue={value} />
    )
  } else if (type === 'select') {
    return (
      <div className="form-group">
        {field.label && (
          <label className="form-label" htmlFor={field.name}>{field.label}</label>
        )}
        <Select field={field} />
      </div>
    )
  } else if (type === 'submit') {
    return (
      <input className="button" id={name} type={type} name={name} defaultValue={value} />
    )
  }

  return (
    <div className="form-group">
      {field.label && (
        <label className="form-label" htmlFor={field.name}>{field.label}</label>
      )}
      <input className="form-control" id={name} type={type} name={name} defaultValue={value} />
    </div>
  )
}

class GetThisForm extends React.Component {
  render() {
    const { form } = this.props

    if (!form) {
      return (
        <div className="alert alert-warning">
          <p><b>Error:</b> Unable to fetch details.</p>
        </div>
      )
    }

    return (
      <form action={form.action} method={form.method}>
        {form.fields.map((field, key) => (
          <Field field={field} key={key} />
        ))}
      </form>
    )
  }
}

export default GetThisForm
