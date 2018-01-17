import React from 'react'

const Select = ({ field }) => {
  const { type, name, value, options } = field;
  const optionKeys = Object.keys(options)

  return (
    <select className="dropdown" name={name}>
      {optionKeys.map(key => (
        <option value={key}>{options[key]}</option>
      ))}
    </select>
  )
}

const Field = ({ field }) => {
  const { type, name, value, options } = field;

  if (type === 'hidden') {
    return (
      <input id={name} type={type} name={name} value={value} />
    )
  } else if (type === 'select') {
    return (
      <div class="form-group">
        {field.label && (
          <label class="form-label" for={field.name}>{field.label}</label>
        )}
        <Select field={field} />
      </div>
    )
  } else if (type === 'submit') {
    return (
      <input class="button" id={name} type={type} name={name} value={value} />
    )
  }

  return (
    <div class="form-group">
      {field.label && (
        <label class="form-label" for={field.name}>{field.label}</label>
      )}
      <input class="form-control" id={name} type={type} name={name} value={value} />
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
