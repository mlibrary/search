import React from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';
import { withRouter } from 'react-router-dom';
import config from '../../../../config';
import { stringifySearchQueryForURL } from '../../../pride';
import PropTypes from 'prop-types';

const getSorts = ({ sorts, configuredSorts }) => {
  if (!configuredSorts) {
    return [];
  }

  const displaySorts = configuredSorts.sorts.reduce((acc, uid) => {
    const foundSort = _.findWhere(sorts, { uid });

    if (foundSort) {
      return acc.concat({
        uid,
        name: foundSort.metadata.name
      });
    }

    return acc;
  }, []);

  return displaySorts;
};

class Sorts extends React.Component {
  constructor (props) {
    super(props);

    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange (event) {
    const { match, history, query, activeFilters, datastoreUid, institution } = this.props;
    const library = datastoreUid === 'mirlyn' ? institution.active : undefined;

    window.dataLayer.push({
      event: 'sortBySelection',
      sortByElement: event.target.options[event.target.selectedIndex]
    });

    const queryString = stringifySearchQueryForURL({
      query,
      filter: activeFilters,
      library,
      sort: event.target.value
    });
    const url = `/${match.params.datastoreSlug}?${queryString}`;

    history.push(url);
  }

  render () {
    const { sorts, sort } = this.props;

    if (sorts && sorts.length > 0) {
      return (
        <div>
          <label
            className='sorts-label sorts-label-text'
            htmlFor='sort-by'
            style={{ display: 'inline-block' }}
          >
            Sort by
          </label>
          <select
            className='dropdown sorts-select'
            value={sort}
            onChange={this.handleOnChange}
            autoComplete='off'
            id='sort-by'
          >
            {sorts.map((item, index) => {
              return (
                <option key={item.uid} value={item.uid}>{item.name}</option>
              );
            })}
          </select>
        </div>
      );
    }

    return null;
  }
}

Sorts.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
  query: PropTypes.string,
  activeFilters: PropTypes.object,
  datastoreUid: PropTypes.string,
  institution: PropTypes.object,
  sorts: PropTypes.array,
  sort: PropTypes.string
};

function mapStateToProps (state) {
  const datastoreUid = state.datastores.active;
  const data = state.search.data;
  const sorts = data[datastoreUid] ? data[datastoreUid].sorts : [];

  const query = state.search.query;
  const activeFilters = state.filters.active[datastoreUid];
  const sort = state.search.sort[datastoreUid];

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
  };
}

export default withRouter(
  connect(mapStateToProps)(Sorts)
);
