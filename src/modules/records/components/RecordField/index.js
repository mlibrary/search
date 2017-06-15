import React from 'react'
import {
  Link,
  withRouter
} from 'react-router-dom'

import {
  Icon,
  TrimString,
  ShowAllList
} from '../../../core';
import {
  stringifySearchQueryForURL
} from '../../../pride'

const FieldValue = ({
  field,
  value,
  match
}) => {
  if (field.uid === 'author') {
    const queryString = stringifySearchQueryForURL({
      filter: { 'author': value }
    })

    let url = ''

    if (queryString.length > 0) {
      url = `${match.url}?${queryString}`
    } else {
      url = `${match.url}`
    }

    return (
      <Link to={url} className="record-field-value-link">
        {value}
      </Link>
    )
  }

  return (
    <span>
      {value}
    </span>
  )
}

class RecordField extends React.Component {
  render() {
    const { field, match } = this.props
    const uniqueFieldClassName = 'record-field record-field-uid-' + field.uid

    if (field.uid === 'format') {
      if (Array.isArray(field.value)) {
        return (
          <div className={uniqueFieldClassName}>
            <dt className="record-field-name">{field.name}</dt>
            <dd className="record-field-value">
              {field.value.map((fieldString, index) => (
                <span className="record-field-value-item" key={index}><Icon name={fieldString.toLowerCase()} />{fieldString}</span>
              ))}
            </dd>
          </div>
        )
      } else {
        return (
          <div className={uniqueFieldClassName}>
            <dt className="record-field-name">{field.name}</dt>
            <dd className="record-field-value">
              <span className="record-field-value-item"><Icon name={field.value.toLowerCase()} />{field.value}</span>
            </dd>
          </div>
        )
      }
    }

    if (Array.isArray(field.value)) {
      return (
        <div className={uniqueFieldClassName}>
          <dt className="record-field-name">{field.name}</dt>
          <dd className="record-field-value">
            <ShowAllList
              length={field.value.length}
              show={3}
              listClass={'record-field-value-list'}>
              {field.value.map((value, index) => (
                <li className="record-field-value-item record-field-value-list-item" key={index}>
                  <FieldValue field={field} value={value} match={match} />
                </li>
              ))}
            </ShowAllList>
          </dd>
        </div>
      )
    }

    return (
      <div className={uniqueFieldClassName}>
        <dt className="record-field-name">{field.name}</dt>
        <dd className="record-field-value">
          <TrimString string={field.value} />
        </dd>
      </div>
    )
  }
}

export default withRouter(RecordField);
