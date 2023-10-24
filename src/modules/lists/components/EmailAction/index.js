import React, { useState } from 'react';
import ActionStatusMessage from '../ActionStatusMessage';
import { Button } from '../../../reusable';
import PropTypes from 'prop-types';

function EmailAction (props) {
  const [email, setEmail] = useState(props.profile.email || '');
  const [status, setStatus] = useState(undefined);

  const setCloseStatus = () => {
    props.setActive('');
    setStatus(undefined);
  };

  const handleSubmitCallback = (data) => {
    setStatus(data);
  };

  return (
    <section className='lists-action'>
      <ActionStatusMessage status={status} action={props.action} setCloseStatus={setCloseStatus} />
      {(!status || status.status_code !== 'action.response.success') &&
        <form
          className='lists-action-form'
          onSubmit={(event) => {
            event.preventDefault();
            props.prejudice.act('email', props.datastore.uid, email, handleSubmitCallback);
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
          <Button type='submit' style={{ whiteSpace: 'nowrap' }}>Send email</Button>
        </form>}
    </section>
  );
}

EmailAction.propTypes = {
  profile: PropTypes.object,
  prejudice: PropTypes.object,
  datastore: PropTypes.object,
  setActive: PropTypes.func,
  action: PropTypes.object
};

export default EmailAction;
