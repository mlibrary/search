import React from 'react'
import { _ } from 'underscore'

const Field = ({
  field
}) => {
  return (
    <p><b>{field.name}</b>: {field.value}</p>
  )
}

const Record = ({
  name,
  fields
}) => {
  return (
    <li className="record">
      <div className="row">
        <div className="col-lg-7 col-md-12">
          <a href="" className="record-title underline">{name}</a>
          {_.map(fields, (field, index) =>
            <Field
              key={index}
              field={field}
            />
          )}
        </div>
      </div>
    </li>
  )
}

export const Records = ({
  records
}) => {
  return (
    <ul className="results-list">
      {_.map(records, (record, index) =>
        <Record
          key={index}
          name={record.partial.names[0]}
          fields={record.partial.fields}
        />
      )}
    </ul>
  )
}
