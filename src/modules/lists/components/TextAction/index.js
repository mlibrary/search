import React, { useState } from 'react';
import ActionStatusMessage from '../ActionStatusMessage';
import PropTypes from 'prop-types';

function TextAction (props) {
  const [text, setText] = useState(props.profile.text || '');
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
            props.prejudice.act('text', props.datastore.uid, text, handleSubmitCallback);
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
            style={{ whiteSpace: 'nowrap' }}
          >
            Send text
          </button>
        </form>}
    </section>
  );
}

TextAction.propTypes = {
  profile: PropTypes.object,
  prejudice: PropTypes.object,
  datastore: PropTypes.object,
  setActive: PropTypes.func,
  action: PropTypes.object
};

export default TextAction;
