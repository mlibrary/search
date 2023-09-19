import React from 'react';
import { Button } from '../../../reusable';
import PropTypes from 'prop-types';

function FileAction (props) {
  return (
    <section className='lists-action'>
      <form
        className='lists-action-form' onSubmit={(event) => {
          event.preventDefault();
          props.prejudice.act(
            'file',
            props.datastore.uid,
            'export-ris',
            () => {
              // Must have a function for callback
            }
          );
        }}
      >
        <Button type='submit'>Download</Button>
      </form>
    </section>
  );
}

FileAction.propTypes = {
  prejudice: PropTypes.object,
  datastore: PropTypes.object
};

export default FileAction;
