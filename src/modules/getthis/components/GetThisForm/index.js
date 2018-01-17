import React from 'react'

const Options = ({ field }) => {
  const { type, name, value, options } = field;
  const optionKeys = Object.keys(options)

  return (
    <select className="dropdown" name={name}>
      {optionKeys.map(key => (
        <option value={key}>{options[key]} key={key}</option>
      ))}
    </select>
  )
}

const Field = ({ field }) => {
  const { type, name, value, options } = field;

  if (type === 'hidden') {
    return (
      <input type="text" hidden="true" name={name} value={value} readOnly />
    )
  } else if (type === 'option') {
    return (
      <Options field={field} />
    )
  } else if (type === 'date') {
    return (
      <input type="date" name={name} value={value} />
    )
  } else if (type === 'button') {
    return (
      <input type="submit" value={field.content} className="button" />
    )
  }

  return null
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
      <form method={form.method} post={form.post}>
        {form.fields.map((field, key) => (
          <Field field={field} key={key} />
        ))}
      </form>
    )
  }
}

export default GetThisForm
