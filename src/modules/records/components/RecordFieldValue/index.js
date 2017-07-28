import React from 'react'
import { Link } from 'react-router-dom'
import _ from 'underscore'

import {
  stringifySearchQueryForURL,
  getDatastoreSlugByUid,
  isFieldASearchLink
} from '../../../pride'

const getDisplayValue = (value) => {
  if (typeof value === 'string') {
    return value
  } else if (Array.isArray(value)) {
    const displayField = _.findWhere(value, { uid: 'display' })

    if (displayField) {
      return displayField.value
    } else {
      return value.join(' ')
    }
  }
}

const getSearchValue = (value) => {
  if (typeof value === 'string') {
    return value
  } else if (Array.isArray(value)) {
    const searchField = _.findWhere(value, { uid: 'search' })

    if (searchField) {
      return searchField.value.replace(/\.$/, '')
    } else {
      return value.join(' ')
    }
  }
}

class RecordFieldValue extends React.Component {
  render() {
    const { field, value, datastoreUid } = this.props
    const displayValue = getDisplayValue(value)
    const searchValue = getSearchValue(value)

    const searchField = isFieldASearchLink({
      fieldUid: field.uid,
      datastoreUid
    })

    if (searchField) {
      const datastoreSlug = getDatastoreSlugByUid(datastoreUid)
      let queryString = ''

      switch (searchField.type) {
        case 'fielded':
          queryString = stringifySearchQueryForURL({
            query: `${searchField.search}:${searchValue}`
          })
          break;
        case 'filter':
          queryString = stringifySearchQueryForURL({
            filter: { [searchField.search]: `${searchValue}` }
          })
          break;
        default:
          break;
      }

      if (queryString.length > 0) {
        return (
          <Link to={`/${datastoreSlug}?${queryString}`} className="record-field-value-link">
            {displayValue}
          </Link>
        )
      }
    }

    if (typeof displayValue === 'string') {
      return (
        <span>
          {displayValue}
        </span>
      )
    }

    return null
  }
}

export default RecordFieldValue
