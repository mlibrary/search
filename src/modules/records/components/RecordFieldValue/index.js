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

      switch (searchField.type) {
        case 'fielded':
          queryString = stringifySearchQueryForURL({
            query: `${searchField.search}:${value}`
          })
          break;
        case 'filter':
          queryString = stringifySearchQueryForURL({
            filter: { [searchField.search]: [`${value}`] }
          })
          break;
        default:
          break;
      }

      if (queryString.length > 0) {
        return (
          <Link to={`/${datastoreSlug}?${queryString}`} className="record-field-value-link">
            {value}
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
