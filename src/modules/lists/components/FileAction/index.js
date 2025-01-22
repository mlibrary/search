import React from 'react';

const FileAction = ({ datastoreUid, prejudice }) => {
  return (
    <form
      className='lists-action-form'
      onSubmit={(event) => {
        event.preventDefault();
        prejudice.act('file', datastoreUid, 'export-ris', () => {
          /** Callback must be a function */
        });
      }}
    >
      <button className='btn btn--primary' type='submit'>
        Download
      </button>
    </form>
  );
};

export default FileAction;
