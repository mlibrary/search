import React from 'react'
import {
  withRouter
} from 'react-router-dom'

import {
  getFormatIconName
} from '../../../pride'
import {
  Icon,
  TrimString,
  ShowAllList
} from '../../../core';
import {
  RecordFieldValue
} from '../../../records'


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
                <span className="record-field-value-item" key={index}>
                  <FormatIcon format={fieldString} />{fieldString}
                </span>
              ))}
            </dd>
          </div>
        )
      } else {
        return (
          <div className={uniqueFieldClassName}>
            <dt className="record-field-name">{field.name}</dt>
            <dd className="record-field-value">
              <span className="record-field-value-item">
                <FormatIcon format={field.value} />{field.value}
              </span>
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
                  <RecordFieldValue field={field} value={value} match={match} />
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

const FormatIcon = ({ format }) => {
  const iconName = getFormatIconName({ format })

  if (iconName === undefined) {
    return null
  }

  return (
    <Icon name={iconName} />
  )
}

export default withRouter(RecordField);
