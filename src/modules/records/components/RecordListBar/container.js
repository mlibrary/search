import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import RecordListBar from './presenter';

class ReactListBarContainer extends React.Component {
  handleClearSearch() {
    console.log('handleClearSearch')
  }
  render() {
    return <RecordListBar onClearSearch={this.handleClearSearch} />
  }
}

function mapStateToProps(state) {
  return {
    records: state.records,
    loading: state.loading,
    search: state.search,
  };
}

export default connect(mapStateToProps)(ReactListBarContainer);
