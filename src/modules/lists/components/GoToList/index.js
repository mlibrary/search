import { Anchor } from '../../../reusable';
import PropTypes from 'prop-types';
import React from 'react';
import { useLocation } from 'react-router-dom';

const GoToList = ({ datastore, list }) => {
  const location = useLocation();

  if (!list) {
    return null;
  }

  return (
    <section className='lists-link-container lists-link' aria-live='polite'>
      <div className='list-info'>
        <p className='lists-content'>Go to <Anchor to={`/${datastore.slug}/list${location.search}`}>My Temporary {datastore.name} List</Anchor> to email, text, and export citations.</p>
      </div>
      <p className='lists-count-tag'><span className='strong'>{list.length || 0}</span> in list</p>
    </section>
  );
};

GoToList.propTypes = {
  datastore: PropTypes.object,
  list: PropTypes.array
};

export default GoToList;
