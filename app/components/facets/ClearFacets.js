import React from 'react'

import { clearActiveFacets } from '../../actions/actions.js'
import { store } from '../../store.js'
import { prideRunSearch } from '../../pride_interface.js'

class ClearFacets extends React.Component {
  render() {

    if (this.props.active_facets) {
      return (
        <a
          className="filter underline"
          onClick={() => {
            store.dispatch(clearActiveFacets())
            prideRunSearch()
          }}>
          Clear Filters
        </a>
      )
    }

    return null
  }
}

export default ClearFacets;
