import React from 'react'
import { Link } from 'react-router-dom'

import {
  Icon,
  TrimString
} from '../../../core'

import {
  getField,
  getFieldValue,
  getRecordFormats,
  filterAccessFields
} from '../../utilities';

import {
  getDatastoreSlugByUid,
  getFormatIconName
} from '../../../pride';

const Header = ({
  record,
  datastoreUid,
  searchQuery
}) => {
  const title = record.names
  const publishedDate = getFieldValue(getField(record.fields, 'published_date'))[0]
  const recordUid = getFieldValue(getField(record.fields, 'id'))[0]
  const datastoreSlug = getDatastoreSlugByUid(datastoreUid);
  let recordUrl = `/${datastoreSlug}/record/${recordUid}${searchQuery}`

  if (datastoreUid === 'website') {
    const accessField = getAccessField({ record, datastoreUid })

    if (accessField && accessField.value) {
      recordUrl = accessField.value
    }
  }

  return (
    <header>
      <h3 className="record-preview-heading">
        <Link
          to={recordUrl}
          className="record-preview-title-link"
        >
          {[].concat(record.names).map((title, index) => (
            <span key={index}>
              <TrimString string={title} />
            </span>
          ))}
        </Link>
        {publishedDate && (
          <span className="record-preview-published-date">2012</span>
        )}
      </h3>
    </header>
  )
}

const Description = ({ record, datastoreUid }) => {
  if (datastoreUid === 'website' || datastoreUid === 'databases') {
    const brief_description = getFieldValue(getField(record.fields, 'brief_description'))

    if (brief_description) {
      return (
        <p className="record-preview-description">
          <TrimString string={brief_description[0]} trimLength={140} showMore={false}/>
        </p>
      )
    }
  } else if (datastoreUid === 'articlesplus') {
    const publication_title = getFieldValue(getField(record.fields, 'publication_title'))

    if (publication_title) {
      return (
        <p className="record-preview-description">
          <TrimString string={publication_title[0]} trimLength={140} showMore={false}/>
        </p>
      )
    }
  }

  return null
}

const Formats = ({ record, datastoreUid }) => {
  const formats = getRecordFormats({
    fields: record.fields,
    datastoreUid
  })

  if (formats.length > 0) {
    return (
      <ul className="record-preview-format-list">
        {formats.map((value, index) => {
          const iconName = getFormatIconName({ format: value })

          return (
            <li className="record-preview-format" key={index}><Icon name={iconName} />{value}</li>
          )
        })}
      </ul>
    )
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

const Main = ({ record, datastoreUid }) => {
  // TODO: add <p className="record-preview-about"></p>

  return (
    <section>
      <div className="record-preview-format-and-author">
        <Formats record={record} datastoreUid={datastoreUid} />
        <Authors record={record} />
        <Description record={record} datastoreUid={datastoreUid} />
      </div>
    </section>
  )
}

const getAccessField = ({ record, datastoreUid }) => {
  const access = filterAccessFields({
    fields: record.fields,
    type: 'access',
    datastore: datastoreUid,
  });

  if (access[0] && access[0][0] && access[0][0].isLink) {
    return access[0][0]
  }

  return undefined
}

const Footer = ({ record, datastoreUid }) => {

  // No access/holding options for Mirlyn for preview records.
  if (datastoreUid === 'mirlyn' || datastoreUid === 'website') {
    return null
  }

  const accessField = getAccessField({ record, datastoreUid })

  if (accessField) {
    return (
      <footer>
        <a className="record-preview-link" href={accessField.value}>{accessField.label}</a>
      </footer>
    )
  }

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
