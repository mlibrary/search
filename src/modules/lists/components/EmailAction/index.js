import React, { useState } from 'react';
import ActionStatusMessage from '../ActionStatusMessage';
import PropTypes from 'prop-types';

const EmailAction = ({ action, datastore, emailAddress, prejudice, setActive }) => {
  const [email, setEmail] = useState(emailAddress);
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
            prejudice.act('email', datastore.uid, email, handleSubmitCallback);
          }}
        >
          <div className='lists-action-field-container'>
            <label htmlFor='emailAddress'>Email address</label>
            <input
              id='emailAddress'
              type='email'
              required
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              autoComplete='on'
            />
          </div>
          <button
            className='btn btn--primary'
            type='submit'
            style={{ whiteSpace: 'nowrap' }}
          >
            Send email
          </button>
        </form>
      )}
    </section>
  );
};

EmailAction.propTypes = {
  action: PropTypes.object,
  datastore: PropTypes.object,
  emailAddress: PropTypes.string,
  prejudice: PropTypes.object,
  setActive: PropTypes.func
};

export default EmailAction;
