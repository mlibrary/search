import React from 'react'
import { connect } from 'react-redux'

import { toggleFacetItem } from '../../actions/actions.js'
import { store } from '../../store.js'
import { prideRunSearch } from '../../pride_interface.js'

class FacetItem extends React.Component {
  render() {
    const item = this.props.item
    const facet = this.props.facet
    const isSelected = this.props.isSelected

    return (
      <li className="filter">
        <label className="filter-label">
          <div>
            <input type="checkbox" className="filter-checkbox" checked={ isSelected ? 'checked' : ''}
              onChange={() => {
                store.dispatch(toggleFacetItem({ item: item, facet: facet }))
                prideRunSearch()
              }}
            />
            <span className="filter-name">{item.value}</span>
          </div>
          <span className="filter-count">({item.count})</span>
        </label>
      </li>
    )
  }
}

export default FacetItem;
