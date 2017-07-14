import React from 'react'
import { Link } from 'react-router-dom'

import {
  stringifySearchQueryForURL,
  getDatastoreSlugByUid,
  isFieldASearchLink
} from '../../../pride'

class RecordFieldValue extends React.Component {
  render() {
    const { field, value, datastoreUid } = this.props
    const searchField = isFieldASearchLink({ fieldUid: field.uid, datastoreUid })

    if (searchField) {
      const datastoreSlug = getDatastoreSlugByUid(datastoreUid)
      let queryString = ''
      let valueString = Array.isArray(value) ? `${value.map(val => val.replace(/\.$/, '')).join(' ')}` : `${value}`
      let displayString = undefined

      switch (field.uid) {
        case 'other_subjects':
        case 'lcsh_subjects':
          displayString = Array.isArray(value) ? `${value.map(val => val.replace(/\.$/, '')).join(' – ')}` : `${value}`
          break;
        default:
          break;
      }

      switch (searchField.type) {
        case 'fielded':
          queryString = stringifySearchQueryForURL({
            query: `${searchField.search}:${valueString}`
          })
          break;
        case 'filter':
          queryString = stringifySearchQueryForURL({
            filter: { [searchField.search]: `${valueString}` }
          })
          break;
        default:
          break;
      }

      if (queryString.length > 0) {
        return (
          <Link to={`/${datastoreSlug}?${queryString}`} className="record-field-value-link">
            {displayString ? displayString : value}
          </Link>
        )
      }
    }

    return (
      <span>
        {value}
      </span>
    )
  }
}

export default RecordFieldValue
