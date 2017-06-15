import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import {
  stringifySearchQueryForURL
} from '../../../pride'

class RecordFieldValue extends React.Component {
  render() {
    const { field, value, match, datastoreUid } = this.props

    if (datastoreUid === 'mirlyn' && field.uid === 'author') {
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
}

function mapStateToProps(state) {
  return {
    datastoreUid: state.datastores.active
  };
}

export default connect(mapStateToProps)(RecordFieldValue)
