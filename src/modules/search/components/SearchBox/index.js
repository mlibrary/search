import React from 'react';
import { connect } from 'react-redux';

import { store } from '../../../../store';
import { setSearchQuery } from '../../actions';
import { runSearchPride } from '../../../../pride-interface';

class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {query: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({query: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    store.dispatch(setSearchQuery(this.state.query));
    runSearchPride()
  }

  render() {
    return (
      <div className="search-box-container-full">
        <div className="container search-box-container">
          <form className="search-box" onSubmit={this.handleSubmit}>
            <input type="text" value={this.state.query} onChange={this.handleChange} />
          <input className="button search-box-button" type="submit" value="Search" />
          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    search: state.search
  };
}

export default connect(mapStateToProps)(SearchBox);
