import React from 'react';

import SearchBoxPresenter from './presenter';

import { store } from '../../../../store';
import { submitSearch } from '../../actions';

class SearchBoxContainer extends React.Component {
  handleSubmitSearch(search_query) {
    store.dispatch(submitSearch({ search_query: search_query }));
  }
  render() {
    return <SearchBoxPresenter onSubmitSearch={this.handleSubmitSearch} />
  }
};

export default (SearchBoxContainer);
