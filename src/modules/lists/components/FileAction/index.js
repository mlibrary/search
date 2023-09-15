import React from 'react';
import { Button } from '../../../reusable';
import PropTypes from 'prop-types';

function FileAction (props) {
  // Do now show if My Temporary Catalog List is empty
  if (props.listLength === 0) {
    return null;
  }

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
  datastore: PropTypes.object,
  listLength: PropTypes.number
};

export default FileAction;
