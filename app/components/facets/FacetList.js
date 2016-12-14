import React from 'react'
import { connect } from 'react-redux'
import { _ } from 'underscore'

import FacetItem from './FacetItem'

class FacetList extends React.Component {
  render() {
    const facets = this.props.facets

    if (facets.length > 0) {
      return (
        <div>
          <h2 className="filters-title">Filter your search</h2>
          {_.map(facets, (facet) => {
            return (
              <div key={facet.uid}>
                <h3 className="filter-title">{facet.metadata.metadata.name}</h3>
                <ul className="filters-list">
                {_.map(facet.items, (item, index) =>
                  <FacetItem item={item} facet={facet} />
                )}
                </ul>
              </div>
            )
          })}
        </div>
      )
    }

    return <p>No filters.</p>
  }
}

FacetList.propTypes = {
  facets: React.PropTypes.array.isRequired
}

function mapStateToProps(state) {
  return {
    facets: state.facets
  }
}

export default connect(mapStateToProps)(FacetList);
