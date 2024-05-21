import PropTypes from 'prop-types';
import React from 'react';

const FileAction = ({ datastore, prejudice }) => {
  return (
    <section className='lists-action'>
      <form
        className='lists-action-form'
        onSubmit={(event) => {
          event.preventDefault();
          prejudice.act('file', datastore.uid, 'export-ris', () => {
            /** Callback must be a function */
          });
        }}
      >
        <button className='btn btn--primary' type='submit'>
          Download
        </button>
      </form>
    </section>
  );
};

FileAction.propTypes = {
  datastore: PropTypes.object,
  prejudice: PropTypes.object
};

export default FileAction;
