/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import React from 'react'
import { Link } from 'react-router-dom'
import ReactGA from 'react-ga'

import {
  Icon as SearchIcon,
  TrimString
} from '../../../core'

import {
  LINK_STYLES,
  SPACING
} from '@umich-lib/core'

import {
  getField,
  getFieldValue,
  getRecordFormats,
  filterDisplayFields
} from '../../utilities';

import {
  getDatastoreSlugByUid,
  getFormatIconName
} from '../../../pride';

import {
  RecommendedResource,
  Zotero
}  from '../../../records'

import {
  Icon,
  INTENT_COLORS
} from '@umich-lib/core'

const Header = ({
  record,
  datastoreUid,
  searchQuery
}) => {
  const publishedDate = getFieldValue(getField(record.fields, 'published_year'))[0]
  const recordUid = getFieldValue(getField(record.fields, 'id'))[0]
  const datastoreSlug = getDatastoreSlugByUid(datastoreUid);
  const hasFullView = datastoreUid !== 'website'
  let recordTitleLink = `/${datastoreSlug}/record/${recordUid}${searchQuery}`

  // Special Library Website case
  if (datastoreUid === 'website') {
    const accessUrlField = getField(record.fields, 'access_url')
    if (accessUrlField) {
      recordTitleLink = accessUrlField.value
    }
  }

  return (
    <header>
      <h3 className="record-preview-heading">
        {hasFullView ? (
          <Link
            to={recordTitleLink}
            css={{
              ...LINK_STYLES['default'],
              marginRight: SPACING['XS']
            }}
            onClick={() => {
              ReactGA.event({
                action: 'Click',
                category: 'Brief View',
                label: `Full view from brief ${datastoreUid}`
              })
            }}
          >
            {[].concat(record.names).map((title, index) => (
              <span key={index}>
                <TrimString string={title} />
              </span>
            ))}
          </Link>
        ) : (
          <span>
            <a
              href={recordTitleLink}
              css={{
                ...LINK_STYLES['default'],
                marginRight: SPACING['XS']
              }}
              onClick={() => {
                ReactGA.event({
                  action: 'Click',
                  category: 'Brief View',
                  label: `Full view from brief ${datastoreUid}`
                })
              }}
            >
              {[].concat(record.names).map((title, index) => (
                <span key={index}>
                  <TrimString string={title} />
                </span>
              ))}
            </a>
            <SearchIcon name="launch" />
          </span>
        )}
        {(publishedDate && (datastoreUid !== 'website')) && (
          <span className="record-preview-published-date">{publishedDate}</span>
        )}
        <RecommendedResource record={record} />
      </h3>
    </header>
  )
}

class Description extends React.Component {
  getDescriptionElement({ fieldUid }) {
    const { record } = this.props
    const field = [].concat(getFieldValue(getField(record.fields, fieldUid)))

    if (typeof field[0] !== 'string') {
      return null
    }

    return (
      <p className="record-preview-description">
        <TrimString string={field[0]} trimLength={140} showMore={false}/>
      </p>
    )
  }

  render() {
    const { datastoreUid } = this.props

    if (datastoreUid === 'website' || datastoreUid === 'databases') {
      return this.getDescriptionElement({ fieldUid: 'brief_description' })
    } else if (datastoreUid === 'articlesplus') {
      return this.getDescriptionElement({ fieldUid: 'publication_title' })
    }

    return null
  }
}

const Formats = ({ record, datastoreUid }) => {
  let formats = getRecordFormats({
    fields: record.fields,
    datastoreUid
  })

  if (datastoreUid === 'website') {
    const pageTypeValue = getFieldValue(getField(record.fields, 'page_type'))

    if (pageTypeValue) {
      formats = [].concat(formats).concat(pageTypeValue)
    }
  }

  if (formats.length > 0) {
    return (
      <ul className="record-preview-format-list">
        {formats.map((value, index) => {
          const iconName = getFormatIconName({ format: value })

          return (
            <li className="record-preview-format" key={index}><SearchIcon name={iconName} />{value}</li>
          )
        })}
      </ul>
    )
  }

  // Special non-format formats like website record types
  if (datastoreUid === 'website') {

  }

  return null
}

const Authors = ({ record }) => {
  const authors = getFieldValue(getField(record.fields, 'author'))

  if (authors.length === 1) {
    return (
      <span className="record-preview-author">{authors[0]}</span>
    )
  }

  if (authors.length > 1) {
    const moreText = `+${authors.length -1 } More`

    return (
      <span className="record-preview-author">{authors[0]} ({moreText})</span>
    )
  }

  return null
}

const FieldValue = ({ field }) => {
  if (field.uid === 'email') {
    const mailto = `mailto:${field.value}`

    return (
      <a href={mailto} className="record-field-value-link">{field.value}</a>
    )
  }

  return (
    <span>{field.value}</span>
  )
}

const Fields = ({ record, datastoreUid }) => {
  const displayFields = filterDisplayFields({
    fields: record.fields,
    type: 'preview',
    datastore: datastoreUid
  });

  if (displayFields && displayFields.length > 0) {
    return (
      <dl className="record-preview__fields">
        {displayFields.map((field, index) => (
          <div className="record-preview__field" key={index}>
            <dt className="record-preview__field-name">{field.name}</dt>
            <dd className="record-preview__field-value"><FieldValue field={field} /></dd>
          </div>
        ))}
      </dl>
    )
  }

  return null
}

const Main = ({ record, datastoreUid }) => {
  return (
    <section>
      <div className="record-preview-format-and-author">
        <Formats record={record} datastoreUid={datastoreUid} />
        <Authors record={record} />
        <Zotero record={record} />
        <Fields record={record} datastoreUid={datastoreUid} />
        <Description record={record} datastoreUid={datastoreUid} />
      </div>
    </section>
  )
}

const Footer = ({ record, datastoreUid }) => {
  // No access/holding options for Mirlyn for preview records.
  if (datastoreUid === 'mirlyn' || datastoreUid === 'website') {
    return null
  }

  const outage = getFieldValue(getField(record.fields, 'outage'))[0]

  if (record.resourceAccess) {
    const accessCell = record.resourceAccess[0].rows[0][0]
    return (
      <footer>
        {outage && (
          <p style={{
            color: INTENT_COLORS['error'],
            marginBottom: '0',
            marginTop: '0.5rem'
          }}><Icon icon="warning" /> {outage}</p>
        )}
        <a
          css={{
            ...LINK_STYLES['subtle']
          }}
          className="record-preview-link"
          href={accessCell.href}
          data-ga-action="Click"
          data-ga-category="Brief View"
          data-ga-label={`${datastoreUid} Item Access`}
        >{accessCell.text}</a>
      </footer>
    )
  }

  // TODO
  // Add "Go to <thing>" here with resource access component.

  return null
}

class RecordPreview extends React.Component {
  render() {
    const {
      record,
      datastoreUid,
      searchQuery
    } = this.props;

    return (
      <article className="record-preview">
        <Header
          record={record}
          datastoreUid={datastoreUid}
          searchQuery={searchQuery}
        />
        <Main
          record={record}
          datastoreUid={datastoreUid}
        />
        <Footer
          record={record}
          datastoreUid={datastoreUid}
        />
      </article>
    )
  }
}

export default RecordPreview
