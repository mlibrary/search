import React from 'react'
import { Link } from 'react-router-dom'
import {
  withRouter
} from 'react-router-dom'
import { _ } from 'underscore'

import {
  getFormatIconName
} from '../../../pride'
import {
  Icon,
  TrimString,
  ShowAllList
} from '../../../core';
import {
  RecordFieldValue,
  Bookplate
} from '../../../records'


class RecordField extends React.Component {
  render() {
    const { field, datastoreUid, institution } = this.props
    const uniqueFieldClassName = 'record-field record-field-uid-' + field.uid

    // Special picture field. This will be used next to the title.
    if (field.uid === 'picture') {
      return null
    }

    if (field.uid === 'email') {
      const mailto = `mailto:${field.value}`

      return (
        <div className={uniqueFieldClassName}>
          <dt className="record-field-name">{field.name}</dt>
          <dd className="record-field-value">
            <span className="record-field-value-item">
              <a href={mailto} className="record-field-value-link">{field.value}</a>
            </span>
          </dd>
        </div>
      )
    }

    // Super special field because libraries
    if (field.uid === 'bookplate') {
      const imageUrl = _.findWhere(field.value, { uid: 'image' })
      const description = _.findWhere(field.value, { uid: 'desc' })

      if (!imageUrl || !description) {
        return null
      }

      return (
        <div className={uniqueFieldClassName}>
          <dt className="record-field-name">{field.name}</dt>
          <dd className="record-field-value">
            <Bookplate imageUrl={imageUrl.value} description={description.value} />
          </dd>
        </div>
      )
    }

    if (field.uid === 'format' || field.uid === 'page_type') {
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

    if (field.uid === 'academic_discipline') {

      // Academic discipline is a special field,
      // treated differently from the rest.

      // An array of strings with terms seperated by | pipes, must be
      // split and joined by a > right arrow.

      return (
        <div className={uniqueFieldClassName}>
          <dt className="record-field-name">{field.name}</dt>
          <dd className="record-field-value">
            <span className="record-field-value-item">
              {field.value.map((group, groupKey) => (
                <li className="record-field-value-item record-field-value-list-item" key={groupKey}>
                  {group.split(' | ').map((string, stringKey) => (
                    <span>
                      <RecordFieldValue
                        key={stringKey}
                        field={field}
                        value={string}
                        datastoreUid={datastoreUid}
                        institution={institution} />
                    </span>
                  )).map((item, index) => [index > 0 && (<Icon name='chevron-right'/>), item])}
                </li>
              ))}
            </span>
          </dd>
        </div>
      )
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
                  <RecordFieldValue
                    field={field}
                    value={value}
                    datastoreUid={datastoreUid}
                    institution={institution} />
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
          <TrimString string={field.value.toString()} />
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
