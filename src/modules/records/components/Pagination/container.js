import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Pagination } from '../../../reusable';
import {
  stringifySearchQueryForURL
} from '../../../pride';

class PaginationContainer extends React.Component {
  /*
    page,
    total,
    onPageChange,
    onNextPage,
    onPreviousPage
  */

  onPageChange = (page) => {
    const { history } = this.props;
    history.push(this.createSearchQuery({ page }));
  };

  createSearchQuery = ({ page }) => {
    const {
      search,
      filters,
      activeDatastoreUid,
      history,
      institution,
      sort
    } = this.props;
    const query = search.query;
    const library = activeDatastoreUid === 'mirlyn' ? institution.active : undefined;
    const queryString = stringifySearchQueryForURL({
      query,
      filter: filters,
      page,
      library,
      sort
    });

    return `${history.location.pathname}?${queryString}`;
  };

  toPreviousPage = () => {
    const {
      page
    } = this.props;

    // If there is only one page or you're on the first page.
    if (page === 1) {
      return undefined;
    }

    return this.createSearchQuery({
      page: page - 1
    });
  };

  toNextPage = () => {
    const {
      page,
      total
    } = this.props;

    // If you're on the last page, do not render a next page link.
    if (total === 0 || page === total) {
      return undefined;
    }

    return this.createSearchQuery({
      page: page + 1
    });
  };

  render () {
    const {
      records,
      page,
      total
    } = this.props;

    if (!records || (records && records.length === 0)) {
      return null;
    }

    return (
      <Pagination
        ariaLabel='Pagination'
        page={page}
        total={total}
        onPageChange={this.onPageChange}
        toNextPage={this.toNextPage()}
        toPreviousPage={this.toPreviousPage()}
      />
    );
  }
}

function mapStateToProps (state) {
  return {
    page: state.search.data[state.datastores.active].page,
    total: state.search.data[state.datastores.active].totalPages,
    records: state.records.records[state.datastores.active],
    search: state.search,
    activeDatastoreUid: state.datastores.active,
    filters: state.filters.active[state.datastores.active],
    institution: state.institution,
    sort: state.search.sort[state.datastores.active]
  };
}

export default withRouter(
  connect(mapStateToProps)(PaginationContainer)
);
