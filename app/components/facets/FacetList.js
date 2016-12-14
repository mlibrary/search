import React from 'react'
import { connect } from 'react-redux'
import { _ } from 'underscore'

import FacetItem from './FacetItem'

class FacetList extends React.Component {
  render() {
    const facets = this.props.facets.facets
    const active_facets = this.props.facets.active_facets

    if (facets.length > 0) {
      return (
        <div>
          <h2 className="filters-title">Filter your search</h2>
          {_.map(facets, (facet, facet_index) => {
            return (
              <div key={facet_index}>
                <h3 className="filter-title">{facet.metadata.metadata.name}</h3>
                <ul className="filters-list">
                {_.map(facet.items, (item, index) => {
                  const isSelected = item.value == active_facets[facet.uid]
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

    return <p>Either loading or nothing to display.</p>
  }
}

FacetList.propTypes = {
  facets: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    facets: state.facets
  }
}

export default connect(mapStateToProps)(FacetList);
