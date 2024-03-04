import React from 'react';
import { Anchor } from '../../../reusable';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

function GoToList ({ list, datastore }) {
  const location = useLocation();

  if (!list) return null;

  return (
    <section className='lists-link-container lists-link' aria-live='polite'>
      <div className='list-info'>
        <p className='lists-content'>Go to <Anchor to={`/${datastore.slug}/list${location.search}`}>My Temporary {datastore.name} List</Anchor> to email, text, and export citations.</p>
      </div>
      <p className='lists-count-tag'><span className='strong'>{list.length || 0}</span> in list</p>
    </section>
  );
}

GoToList.propTypes = {
  list: PropTypes.array,
  datastore: PropTypes.object
};

export default GoToList;
