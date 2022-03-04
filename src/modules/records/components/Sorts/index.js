import React from 'react'
import { connect } from 'react-redux'
import _ from 'underscore'
import {
  withRouter
} from 'react-router-dom'

import config from '../../../../config'
import {
  stringifySearchQueryForURL
} from '../../../pride'

const getSorts = ({ sorts, configuredSorts }) => {
  if (!configuredSorts) {
    return []
  }

  const displaySorts = configuredSorts.sorts.reduce((acc, uid) => {
    const foundSort = _.findWhere(sorts, { uid: uid })

    if (foundSort) {
      return acc.concat({
        uid: uid,
        name: foundSort.metadata.name
      })
    }

    return acc
  }, [])

  return displaySorts
}

class Sorts extends React.Component {
  constructor(props) {
    super(props)

    this.onChange = this.onChange.bind(this)
  }
  onChange(event) {
    const { match, history, query, activeFilters, datastoreUid, institution } = this.props
    const library = datastoreUid === 'mirlyn' ? institution.active : undefined

    window.dataLayer.push({
      event: 'sortBySelection',
      sortByElement: event.target.options[event.target.selectedIndex]
    });

    const queryString = stringifySearchQueryForURL({
      query,
      filter: activeFilters,
      library,
      sort: event.target.value
    })
    const url = `/${match.params.datastoreSlug}?${queryString}`

    history.push(url)
  }
  render() {
    const { sorts, sort } = this.props;

    if (sorts && sorts.length > 0) {
      return (
        <label className="sorts-label">
          <span className="sorts-label-text">Sort by</span>
          <select
            className="dropdown sorts-select"
            value={sort}
            onChange={this.onChange}>
            {sorts.map((item, index) => (
              <option key={item.uid} value={item.uid}>{item.name}</option>
            ))}
          </select>
        </label>
      )
    }

    return null
  }
}

function mapStateToProps(state) {
  const datastoreUid = state.datastores.active
  const data = state.search.data
  const sorts = data[datastoreUid] ? data[datastoreUid].sorts : []

  const query = state.search.query
  const activeFilters = state.filters.active[datastoreUid]
  const sort = state.search.sort[datastoreUid]

  return {
    datastoreUid,
    query,
    activeFilters,
    sort,
    sorts: getSorts({
      sorts,
      configuredSorts: config.sorts[state.datastores.active]
    }),
    institution: state.institution
  }
}

export default withRouter(
  connect(mapStateToProps)(Sorts)
)
