import PropTypes from 'prop-types';
import React from 'react';

const PermalinkAction = ({ setActive, setAlert }) => {
  return (
    <form
      className='lists-action-form'
      onSubmit={(event) => {
        event.preventDefault();
        navigator.clipboard.writeText(event.target.permalink.value);
        setAlert({
          intent: 'success',
          text: 'Link copied!'
        });
        setActive('');
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
      <button className='btn btn--primary' type='submit'>
        Copy link
      </button>
    </form>
  );
};

PermalinkAction.propTypes = {
  setActive: PropTypes.func,
  setAlert: PropTypes.func
};

export default PermalinkAction;
