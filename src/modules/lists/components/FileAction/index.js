import React from 'react';
import PropTypes from 'prop-types';

function FileAction ({ prejudice, datastore }) {
  return (
    <section className='lists-action'>
      <form
        className='lists-action-form' onSubmit={(event) => {
          event.preventDefault();
          prejudice.act('file', datastore.uid, 'export-ris', () => { /** Callback must be a function */ });
        }}
      >
        <button className='btn btn--primary' type='submit'>
          Download
        </button>
      </form>
    </section>
  );
}

FileAction.propTypes = {
  prejudice: PropTypes.object,
  datastore: PropTypes.object
};

export default FileAction;
