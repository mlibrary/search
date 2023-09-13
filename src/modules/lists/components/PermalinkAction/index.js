import React from 'react';
import { Button } from '../../../reusable';
import PropTypes from 'prop-types';

function PermalinkAction (props) {
  return (
    <form
      className='lists-action-form'
      onSubmit={(event) => {
        event.preventDefault();
        navigator.clipboard.writeText(event.target.permalink.value);
        props.setAlert({
          intent: 'success',
          text: 'Link copied!'
        });
        props.setActive('');
      }}
    >
      <div className='lists-action-field-container'>
        <label htmlFor='permalink'>
          Copy link
        </label>
        <input
          id='permalink'
          name='permalink'
          type='url'
          readOnly
          value={document.location.origin + document.location.pathname}
          autoComplete='off'
        />
      </div>
      <Button type='submit'>
        Copy link
      </Button>
    </form>
  );
}

PermalinkAction.propTypes = {
  setActive: PropTypes.func,
  setAlert: PropTypes.func
};

export default PermalinkAction;
