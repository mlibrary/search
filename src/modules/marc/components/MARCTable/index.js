import React from 'react';

const Leader = ({ marc }) => {
  if (marc['leader']) {
    return (
      <tr>
        <td className="marc__field-name" colSpan="3">LEADER</td>
        <td>{marc['leader']}</td>
      </tr>
    )
  }

  return null
}

const FieldName = ({ field }) => {
  const name = Object.keys(field)[0]

  return (
    <td className="marc__field-name">
      {name}
    </td>
  )
}

const FieldIndicator = ({ field, ind }) => {
  const name = Object.keys(field)[0]
  let value = field[name]
  const indicator = value[ind]

  return (
    <td>{indicator}</td>
  )
}

const FieldValue = ({ field }) => {
  const name = Object.keys(field)[0]
  let value = field[name]

  if (typeof value === 'string') {
    return (
      <td>
        {field[name]}
      </td>
    )
  }

  if (typeof value === 'object') {
    if (value['subfields']) {
      return (
        <td>
          {value['subfields'].map((subfield, index) => {
            const subfieldName = Object.keys(subfield)[0]

            return (
              <span className="marc__subfield" key={index}><b>|{subfieldName}</b> {subfield[subfieldName]}</span>
            )
          })}
        </td>
      )
    }
  }

  return (
    <td>
      temp
    </td>
  )
}

class MARCTable extends React.Component {
  render() {
    const { marc } = this.props;

    return (
      <div>
        <h3 className="marc__heading">MARC Data</h3>
        <table className="marc__table">
          <tbody>
            <Leader marc={marc} />
            {marc['fields'].map((field, index) => (
              <tr key={index}>
                <FieldName field={field} />
                <FieldIndicator field={field} ind={'ind1'} />
                <FieldIndicator field={field} ind={'ind2'} />
                <FieldValue field={field} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default MARCTable
