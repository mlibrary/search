import React from 'react';
import { useLocation } from 'react-router-dom';

const PermalinkAction = ({ setActive, setAlert }) => {
  const { pathname } = useLocation();

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
          value={window.location.origin + pathname}
          autoComplete='off'
        />
      </div>
      <button className='btn btn--primary' type='submit'>
        Copy link
      </button>
    </form>
  );
};

export default PermalinkAction;
