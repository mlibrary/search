import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class GoToList extends Component {
  render () {
    const { location, list, datastore } = this.props;
    if (!list) return null;
    return (
      <section className='lists-link-container lists-link' aria-live='polite'>
        <div className='list-info'>
          <p className='lists-content'>Go to <Link to={`/${datastore.slug}/list${location.search}`}>My Temporary {datastore.name} List</Link> to email, text, and export citations.</p>
        </div>
        <p className='lists-count-tag'><span className='strong'>{list?.length || 0}</span> in list</p>
      </section>
    );
  }
}

GoToList.propTypes = {
  location: PropTypes.object,
  list: PropTypes.array,
  datastore: PropTypes.object
};

export default withRouter(GoToList);
