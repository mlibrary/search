import React, { useState } from 'react';
import ActionStatusMessage from '../ActionStatusMessage';

const EmailAction = ({ action, datastoreUid, email, prejudice }) => {
  const [emailAddress, setEmailAddress] = useState(email || '');
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
            prejudice.act('email', datastoreUid, emailAddress, handleSubmitCallback);
          }}
        >
          <div className='lists-action-field-container'>
            <label htmlFor='emailAddress'>Email address</label>
            <input
              id='emailAddress'
              type='email'
              required
              value={emailAddress}
              onChange={(event) => {
                setEmailAddress(event.target.value);
              }}
              autoComplete='on'
            />
          </div>
          <button
            className='btn btn--primary'
            type='submit'
          >
            Send&nbsp;email
          </button>
        </form>
      )}
    </section>
  );
};

export default EmailAction;
