import React from 'react';
import { useSelector, connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Icon, Button } from '../../../reusable';
import getFilters from './getFilters';
import AdvancedFilter from '../AdvancedFilter';
import { setAdvancedFilter } from '../../../advanced';
import { SPACING, COLORS } from '../../../reusable/umich-lib-core-temp';

class FiltersContainer extends React.Component {
  changeAdvancedFilter = ({
    filterType,
    filterGroupUid,
    filterValue
  }) => {
    const {
      setAdvancedFilter,
      datastore
    } = this.props;

    switch (filterType) {
      case 'scope_down':
        // Clear active filters
        if (['institution', 'location'].includes(filterGroupUid) && filterValue) {
          setAdvancedFilter({
            datastoreUid: datastore.uid,
            filterType,
            filterGroupUid: 'collection',
            filterValue: undefined,
            onlyOneFilterValue: true
          });

          if (filterGroupUid === 'institution') {
            setAdvancedFilter({
              datastoreUid: datastore.uid,
              filterType,
              filterGroupUid: 'location',
              filterValue: undefined,
              onlyOneFilterValue: true
            });
          }
        }

        setAdvancedFilter({
          datastoreUid: datastore.uid,
          filterType,
          filterGroupUid,
          filterValue,
          onlyOneFilterValue: true
        });
        break;
      case 'checkbox':
      case 'date_range_input':
        setAdvancedFilter({
          datastoreUid: datastore.uid,
          filterGroupUid,
          filterValue,
          onlyOneFilterValue: true
        });
        break;
      case 'multiple_select':
        setAdvancedFilter({
          datastoreUid: datastore.uid,
          filterGroupUid,
          filterValue
        });
        break;
      default:
        break;
    }
  };

  render () {
    const {
      filters,
      datastore
    } = this.props;

    if (!filters || filters.length === 0) {
      return null;
    }

    const filterGroups = Object.keys(filters);

    return (
      <>
        <ActiveAdvancedFilters datastore={datastore} />
        <h2 className='heading-large'>Additional search options</h2>
        <div className='advanced-filters-inner-container'>
          {filterGroups.map((filterGroup, groupIndex) => {
            return (
              <React.Fragment key={groupIndex}>
                {filterGroup !== 'undefined'
                  ? (
                    <div className='advanced-filter-container'>
                      <h2 className='advanced-filter-label-text'>{filterGroup}</h2>
                      {filters[filterGroup].map((advancedFilter, index) => {
                        return (
                          <AdvancedFilter
                            key={index}
                            advancedFilter={advancedFilter}
                            changeAdvancedFilter={this.changeAdvancedFilter}
                          />
                        );
                      })}
                    </div>
                    )
                  : (
                    <>
                      {filters[filterGroup].map((advancedFilter, index) => {
                        return (
                          <div key={index} className='advanced-filter-container'>
                            <h2 className='advanced-filter-label-text'>{advancedFilter.name}</h2>
                            <div className='advanced-filter-inner-container'>
                              <AdvancedFilter
                                advancedFilter={advancedFilter}
                                changeAdvancedFilter={this.changeAdvancedFilter}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </>
                    )}
              </React.Fragment>
            );
          })}
        </div>

        <Button
          style={{ marginTop: '1rem' }}
          type='submit'
        >
          <Icon icon='search' size={24} /> Advanced Search
        </Button>
      </>
    );
  }
}

FiltersContainer.propTypes = {
  setAdvancedFilter: PropTypes.func,
  datastore: PropTypes.object,
  filters: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ])
};

function ActiveAdvancedFilters (datastore) {
  const currentDatastore = datastore.datastore.uid;
  const { advanced } = useSelector((state) => {
    return state;
  });
  const activeAdditionalSearchOptions = advanced[currentDatastore].activeFilters;
  // Check if object exists
  if (!activeAdditionalSearchOptions) {
    return null;
  }
  // Remove properties that have undefined values
  Object.keys(activeAdditionalSearchOptions).forEach((option) => {
    if (!activeAdditionalSearchOptions[option]) {
      delete activeAdditionalSearchOptions[option];
    }
  });

  const filterGroups = {};
  advanced[currentDatastore].filters.forEach((filterGroup) => {
    filterGroups[filterGroup.uid] = { ...filterGroup };
  });

  const items = Object.keys(activeAdditionalSearchOptions).reduce((acc, group) => {
    // Just don't show the checkbox filters as active filter items.
    if (!filterGroups[group] || filterGroups[group].type !== 'checkbox') {
      const activeFiltersToAdd = activeAdditionalSearchOptions[group].map((value) => {
        return { group, value };
      });
      acc = acc.concat(activeFiltersToAdd);
    }
    return acc;
  }, []);

  if (items.length === 0) {
    return null;
  }

  const titleCase = (string) => {
    return string.toLowerCase().split('_').map((word) => {
      return word.replace(word[0], word[0].toUpperCase());
    }).join(' ');
  };

  return (
    <section aria-label='active-filters'>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.25em'
        }}
      >
        <h2
          id='active-filters'
          className='u-margin-top-none'
          style={{
            fontSize: '1rem',
            marginBottom: SPACING.XS
          }}
        >
          Active filters
        </h2>
        <span
          style={{
            color: COLORS.neutral['300'],
            paddingRight: '0.5em'
          }}
        >
          ({items.length})
        </span>
      </div>

      <p className='font-small u-margin-top-none'>
        Unselect active filters through the options below.
      </p>

      <ul
        style={{
          fontSize: '0.9rem',
          marginLeft: '2.5rem',
          marginTop: '0'
        }}
      >
        {items.map((item, i) => {
          return (
            <li key={i + item.group + item.value}>
              <span className='strong'>{typeof filterGroups[item.group] !== 'object' ? titleCase(item.group) : filterGroups[item.group].name}:</span> {item.value}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function mapStateToProps (state, props) {
  return {
    filters: getFilters({
      filterGroups: state.advanced[props.datastore.uid].filters,
      activeFilters: state.advanced[props.datastore.uid].activeFilters
    })
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    setAdvancedFilter
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FiltersContainer);
