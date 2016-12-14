import React from 'react'
import { connect } from 'react-redux'

import { toggleFacetItem } from '../../actions/actions.js'
import { store } from '../../store.js'

class FacetItem extends React.Component {
  render() {
    const item = this.props.item
    const facet = this.props.facet

    return (
      <li key={item.value} className="filter">
        <label className="filter-label">
          <div>
            <input type="checkbox" className="filter-checkbox" checked={ item.selected }
              onClick={() => {
                store.dispatch(toggleFacetItem({ item: item, facet: facet }))
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
