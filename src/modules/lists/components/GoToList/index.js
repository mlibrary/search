import { Anchor } from '../../../reusable';
import React from 'react';
import { useLocation } from 'react-router-dom';

const GoToList = ({ datastore, list }) => {
  if (!list || !list.length) {
    return null;
  }

  const { search } = useLocation();

  return (
    <section className='lists-link-container lists-link' aria-live='polite'>
      <div className='list-info'>
        <p className='lists-content'>Go to <Anchor to={`/${datastore.slug}/list${search}`}>My Temporary {datastore.name} List</Anchor> to email, text, and export citations.</p>
      </div>
      <p className='lists-count-tag'><span className='strong'>{list.length || 0}</span> in list</p>
    </section>
  );
};

export default GoToList;
