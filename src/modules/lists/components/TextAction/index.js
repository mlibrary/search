import React, { useState } from 'react';
import ActionStatusMessage from '../ActionStatusMessage';

const TextAction = ({ action, datastoreUid, prejudice, text }) => {
  const [phoneNumber, setPhoneNumber] = useState(text || '');
  const [status, setStatus] = useState();

  const handleSubmitCallback = (data) => {
    setStatus(data);
  };

  return (
    <section className='lists-action'>
      <ActionStatusMessage {...{ action, status }} />
      {(!status || status.status_code !== 'action.response.success') && (
        <form
          className='lists-action-form'
          onSubmit={(event) => {
            event.preventDefault();
            prejudice.act('text', datastoreUid, phoneNumber, handleSubmitCallback);
          }}
        >
          <div className='lists-action-field-container'>
            <label htmlFor='phoneNumber'>Phone number</label>
            <input
              id='phoneNumber'
              type='tel'
              pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
              required
              value={phoneNumber}
              onChange={(event) => {
                setPhoneNumber(event.target.value);
              }}
              aria-describedby='phone-number-description'
              autoComplete='on'
            />
            <small id='phone-number-description'>Please enter using this format: 000-111-5555</small>
          </div>
          <button
            className='btn btn--primary'
            type='submit'
          >
            Send&nbsp;text
          </button>
        </form>
      )}
    </section>
  );
};

export default TextAction;
