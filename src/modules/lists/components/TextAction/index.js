import React, { useState } from 'react';
import ActionStatusMessage from '../ActionStatusMessage';

const TextAction = ({ action, datastore, phoneNumber, prejudice, setActive }) => {
  const [text, setText] = useState(phoneNumber);
  const [status, setStatus] = useState();

  const setCloseStatus = () => {
    setActive('');
    setStatus(null);
  };

  const handleSubmitCallback = (data) => {
    setStatus(data);
  };

  return (
    <section className='lists-action'>
      <ActionStatusMessage status={status} action={action} setCloseStatus={setCloseStatus} />
      {(!status || status.status_code !== 'action.response.success') && (
        <form
          className='lists-action-form'
          onSubmit={(event) => {
            event.preventDefault();
            prejudice.act('text', datastore.uid, text, handleSubmitCallback);
          }}
        >
          <div className='lists-action-field-container'>
            <label htmlFor='phoneNumber'>Phone number</label>
            <input
              id='phoneNumber'
              type='tel'
              pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
              required
              value={text}
              onChange={(event) => {
                setText(event.target.value);
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
