import React from 'react';
import { connect } from 'react-redux';

import {
  addQuery,
  removeQuery
} from '../../../../router';

class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {query: props.search.query};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({query: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.query === '') {
      removeQuery('q');
    } else {
      addQuery({q: this.state.query})
    }
  }

  render() {
    return (
      <div className="search-box-container-full">
        <div className="container search-box-container">
          <form className="search-box" onSubmit={this.handleSubmit}>
            <input className="no-margin search-box-input" type="text" value={this.state.query} onChange={this.handleChange} />
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
