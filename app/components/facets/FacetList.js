import React from 'react'
import { connect } from 'react-redux'
import { _ } from 'underscore'

import FacetItem from './FacetItem'
import ClearFacets from './ClearFacets'

class FacetList extends React.Component {
  render() {
    const facets = this.props.facets.facets
    const active_facets = this.props.facets.active_facets

    const records = this.props.records

    if (facets.length > 0 && records.length > 0) {
      return (
        <div>
          <h2 className="filters-title">Filter your search</h2>

          <ClearFacets active_facets={active_facets}/>

          {_.map(facets, (facet, facet_index) => {
            return (
              <div key={facet_index}>
                <h3 className="filter-title">{facet.metadata.metadata.name}</h3>
                <ul className="filters-list">
                {_.map(facet.items, (item, index) => {
                  var isSelected = false

                  if (active_facets) {
                    isSelected = item.value == active_facets[facet.uid]

                    if (!isSelected && facet.uid in active_facets) {
                      return null
                    }
                  }

                  return (
                    <FacetItem
                      key={index}
                      item={item}
                      facet={facet}
                      isSelected={isSelected}
                      />
                  )}
                )}
                </ul>
              </div>
            )
          })}
        </div>
      )
    }

    return null
  }
}

FacetList.propTypes = {
  facets: React.PropTypes.object.isRequired,
  records: React.PropTypes.array.isRequired
}

function mapStateToProps(state) {
  return {
    facets: state.facets,
    records: state.records
  }
}

export default connect(mapStateToProps)(FacetList);
