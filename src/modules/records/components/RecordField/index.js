import React from 'react'
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
  ShowAllChildren
} from '../../../core';
import {
  RecordFieldValue,
  Bookplate
} from '../../../records'


function createMarkup(markup_string) {
  return {__html: markup_string};
}

class RecordField extends React.Component {
  render() {
    const { field, datastoreUid, institution } = this.props
    const uniqueFieldClassName = 'record-field record-field-uid-' + field.uid

    // Special picture field. This will be used next to the title.
    if (field.uid === 'picture') {
      return null
    }

    // Need to inject HTML with this one.
    if (field.uid === 'times_cited') {
      return (
        <div className={uniqueFieldClassName}>
          <dt className="record-field-name">{field.name}</dt>
          <dd className="record-field-value" dangerouslySetInnerHTML={createMarkup(field.value)} />
        </div>
      )
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

    if (field.uid === 'description') {

      return (
        <div className={uniqueFieldClassName}>
          <dt className="record-field-name">{field.name}</dt>
          <dd className="record-field-value record-field-description-has-inner-html" dangerouslySetInnerHTML={createMarkup(field.value)} />
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
                  <FormatIcon format={fieldString} /><b>{fieldString}</b>
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
                <FormatIcon format={field.value} /><b>{field.value}</b>
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
                <div className="record-field-value-item record-field-value-list-item" key={groupKey}>
                  {group.split(' | ').map((string, stringKey) => (
                    <span key={stringKey}>
                      <RecordFieldValue
                        key={stringKey}
                        field={field}
                        value={string}
                        datastoreUid={datastoreUid}
                        institution={institution} />
                    </span>
                  )).map((item, index) => [index > 0 && (<Icon name='chevron-right'/>), item])}
                </div>
              ))}
            </span>
          </dd>
        </div>
      )
    }

    // Special case where database record description field values are HTML.
    if (field.uid === 'description' && datastoreUid === 'databases') {
      return (
        <div className={uniqueFieldClassName}>
          <dt className="record-field-name">{field.name}</dt>
          <dd className="record-field-value">
            <div className="record-field-value-has-html" dangerouslySetInnerHTML={{ __html: field.value }}></div>
          </dd>
        </div>
      )
    }

    if (Array.isArray(field.value)) {
      return (
        <div className={uniqueFieldClassName}>
          <dt className="record-field-name">{field.name}</dt>
          <dd className="record-field-value">
            <ShowAllChildren
              length={field.value.length}
              show={3}
              listClass={'record-field-value-list'}>
              {field.value.map((value, index) => (
                <span className="record-field-value-item record-field-value-list-item" key={index}>
                  <RecordFieldValue
                    field={field}
                    value={value}
                    datastoreUid={datastoreUid}
                    institution={institution} />
                </span>
              ))}
            </ShowAllChildren>
          </dd>
        </div>
      )
    }

    if (field.uid === 'more_information') {
      return (
        <div className={uniqueFieldClassName}>
          <dt className="record-field-name">{field.value.term}</dt>
          <dd className="record-field-value">
            {field.value.description.map((d, i) => (
              <div className="record-field-value-item">
                <a className="record-field-value-link" href={d.href} key={i + d}>{d.text}</a>
              </div>
            ))}
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
