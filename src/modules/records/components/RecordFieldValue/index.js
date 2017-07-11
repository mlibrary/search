import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import {
  stringifySearchQueryForURL,
  getDatastoreSlugByUid
} from '../../../pride'

class RecordFieldValue extends React.Component {
  render() {
    const { field, value, datastoreUid } = this.props

    if (datastoreUid === 'mirlyn' && field.uid === 'main_author') {
      const datastoreSlug = getDatastoreSlugByUid(datastoreUid)
      const queryString = stringifySearchQueryForURL({
        query: `author:${value}`
      })

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
