import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Heading from '@umich-lib-ui/heading'
import getFilters from './getFilters'
import AdvancedFilter from '../AdvancedFilter'
import {
  setAdvancedFilter
} from '../../../advanced'
import Button from '@umich-lib-ui/button'
import Icon from '@umich-lib-ui/icon'

class FiltersContainer extends React.Component {
  handleAdvancedFilterChange = ({
    filterType,
    filterGroupUid,
    filterValue
  }) => {
    const {
      setAdvancedFilter,
      datastore
    } = this.props

    switch (filterType) {
      case 'scope_down':
        // Clear active filters
        if (filterGroupUid === 'institution' && filterValue) {
          setAdvancedFilter({
            datastoreUid: datastore.uid,
            filterType,
            filterGroupUid: 'collection',
            filterValue: undefined,
            onlyOneFilterValue: true
          })
        }

        // Clear active filters
        if (filterGroupUid === 'location' && filterValue) {
          setAdvancedFilter({
            datastoreUid: datastore.uid,
            filterType,
            filterGroupUid: 'collection',
            filterValue: undefined,
            onlyOneFilterValue: true
          })
        }

        setAdvancedFilter({
          datastoreUid: datastore.uid,
          filterType,
          filterGroupUid,
          filterValue,
          onlyOneFilterValue: true
        })
        break
      case 'checkbox':
        setAdvancedFilter({
          datastoreUid: datastore.uid,
          filterGroupUid,
          filterValue,
          onlyOneFilterValue: true
        })
        break
      case 'multiple_select':
        setAdvancedFilter({
          datastoreUid: datastore.uid,
          filterGroupUid,
          filterValue
        })
        break
      case 'date_range_input':
        setAdvancedFilter({
          datastoreUid: datastore.uid,
          filterGroupUid,
          filterValue,
          onlyOneFilterValue: true
        })
        break
      default:
        break
    }
  }

  render() {
    const {
      filters
    } = this.props

    if (!filters || filters.length === 0) {
      return null
    }

    const filterGroups = Object.keys(filters)

    return (
      <React.Fragment>
        <Heading size="large" level={2}>Additional search options</Heading>
        <div className="advanced-filters-inner-container">
          {filterGroups.map((filterGroup, groupIndex) => (
            <React.Fragment key={groupIndex}>
              {filterGroup !== 'undefined' ? (
                <div className="advanced-filter-container">
                  <h2 className="advanced-filter-label-text">{filterGroup}</h2>
                  {filters[filterGroup].map((advancedFilter, index) => (
                    <AdvancedFilter
                      key={index}
                      advancedFilter={advancedFilter}
                      handleAdvancedFilterChange={this.handleAdvancedFilterChange} />
                  ))}
                </div>
              ) : (
                <React.Fragment>
                  {filters[filterGroup].map((advancedFilter, index) => (
                    <div key={index} className="advanced-filter-container">
                      <h2 className="advanced-filter-label-text">{advancedFilter.name}</h2>
                      <div className="advanced-filter-inner-container">
                        <AdvancedFilter
                          advancedFilter={advancedFilter}
                          handleAdvancedFilterChange={this.handleAdvancedFilterChange}
                        />
                      </div>
                    </div>
                  ))}
                </React.Fragment>
              )}
            </React.Fragment>
          ))}
        </div>

        <Button
          style={{ marginTop: '1rem' }}
          type="submit"
        ><Icon icon="search" size={24} /> Advanced Search</Button>
      </React.Fragment>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setAdvancedFilter
  }, dispatch)
}

function mapStateToProps(state, props) {
  const {
    datastore
  } = props

  return {
    filters: getFilters({
      filterGroups: state.advanced[datastore.uid].filters,
      activeFilters: state.advanced[datastore.uid].activeFilters,
    })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FiltersContainer)