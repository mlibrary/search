/** @jsxImportSource @emotion/react */
import React from 'react';
import { useSelector, connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Icon, Button } from '../../../reusable';
import getFilters from './getFilters';
import AdvancedFilter from '../AdvancedFilter';
import { setAdvancedFilter } from '../../../advanced';
import { SPACING, COLORS, MEDIA_QUERIES } from '../../../reusable/umich-lib-core-temp';

class FiltersContainer extends React.Component {
  handleAdvancedFilterChange = ({
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
                            handleAdvancedFilterChange={this.handleAdvancedFilterChange}
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
                                handleAdvancedFilterChange={this.handleAdvancedFilterChange}
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
        ><Icon icon='search' size={24} /> Advanced Search
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

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    setAdvancedFilter
  }, dispatch);
}

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
        css={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.25em'
        }}
      >
        <h2
          id='active-filters'
          css={{
            fontSize: '1rem',
            marginTop: '0',
            marginBottom: SPACING.XS
          }}
        >
          Active filters
        </h2>
        <span
          css={{
            color: COLORS.neutral['300'],
            paddingRight: '0.5em'
          }}
        >
          ({items.length})
        </span>
        {/* {items.length > 1 &&
          <Link
            to={location.href.replace(location.origin, '')}
            css={{
              display: 'inline-block',
              textDecoration: 'underline',
              color: COLORS.neutral['300']
            }}
          >
            Clear all active filters
          </Link>} */}
      </div>

      <ul
        css={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: SPACING.XS,
          margin: 0,
          marginTop: SPACING.XS,
          listStyle: 'none'
        }}
      >
        {items.map((item, i) => {
          return (
            <li
              key={i + item.group + item.value}
              css={{
                flex: '1 1 100%',
                maxWidth: `calc(100% - ${SPACING.XS})%`,
                [MEDIA_QUERIES.LARGESCREEN]: {
                  maxWidth: `calc(50% - ${SPACING.XS})`
                },
                [MEDIA_QUERIES.XLSCREEN]: {
                  maxWidth: `calc(33% - ${SPACING.XS})`
                }
              }}
            >
              <div
                css={{
                  alignItems: 'center',
                  color: COLORS.green['500'],
                  background: COLORS.green['100'],
                  border: `solid 1px ${COLORS.green['200']}`,
                  borderRadius: '4px',
                  display: 'flex',
                  gap: '0.25em',
                  height: '100%',
                  justifyContent: 'space-between',
                  padding: `${SPACING.XS} ${SPACING.S}`,
                  textAlign: 'left',
                  width: '100%'
                  // ':hover': {
                  //   border: `solid 1px ${COLORS.green['400']}`,
                  //   textDecoration: 'underline'
                  // }
                }}
                kind='secondary'
              >
                <span>{typeof filterGroups[item.group] !== 'object' ? titleCase(item.group) : filterGroups[item.group].name}: {item.value}</span>
                {/* <Icon icon='close' /> */}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function mapStateToProps (state, props) {
  const {
    datastore
  } = props;

  return {
    filters: getFilters({
      filterGroups: state.advanced[datastore.uid].filters,
      activeFilters: state.advanced[datastore.uid].activeFilters
    })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FiltersContainer);
