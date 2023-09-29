import React from 'react';
import { Anchor } from '../../../reusable';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

function GoToList (props) {
  if (!props.list) return null;

  return (
    <section className='lists-link-container lists-link' aria-live='polite'>
      <div className='list-info'>
        <p className='lists-content'>Go to <Anchor to={`/${props.datastore.slug}/list${props.location.search}`}>My Temporary {props.datastore.name} List</Anchor> to email, text, and export citations.</p>
      </div>
      <p className='lists-count-tag'><span className='strong'>{props.list?.length || 0}</span> in list</p>
    </section>
  );
}

GoToList.propTypes = {
  location: PropTypes.object,
  list: PropTypes.array,
  datastore: PropTypes.object
};

export default withRouter(GoToList);
