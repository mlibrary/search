import React, { useEffect, useState } from 'react';
import ActionStatusMessage from '../ActionStatusMessage';
import { AuthenticationRequired } from '../../../profile';
import { useSelector } from 'react-redux';

const ShareAction = ({ action, datastoreUid, prejudice }) => {
  const [inputValue, setInputValue] = useState('');
  const [status, setStatus] = useState();
  const { email, status: profileStatus, text } = useSelector((state) => {
    return state.profile || {};
  });

  const type = action.uid;
  const isEmail = type === 'email';

  useEffect(() => {
    setInputValue(isEmail ? email || '' : text || '');
  }, [isEmail, email, text]);

  const handleSubmitCallback = (data) => {
    setStatus(data);
  };

  return (
    <AuthenticationRequired {...{ status: profileStatus }}>
      <section className='lists-action'>
        <ActionStatusMessage {...{ action, status }} />
        {(!status || status.status_code !== 'action.response.success') && (
          <form
            className='lists-action-form'
            onSubmit={(event) => {
              event.preventDefault();
              prejudice.act(type, datastoreUid, inputValue, handleSubmitCallback);
            }}
          >
            <div className='lists-action-field-container'>
              <label htmlFor='share-action'>{ isEmail ? 'Email address' : 'Phone number' }</label>
              <input
                id='share-action'
                type={isEmail ? 'email' : 'tel'}
                pattern={isEmail ? null : '[0-9]{3}-[0-9]{3}-[0-9]{4}'}
                required
                value={inputValue}
                onChange={(event) => {
                  setInputValue(event.target.value);
                }}
                aria-describedby={!isEmail && 'format-description'}
                autoComplete='on'
              />
              { !isEmail && <small id='format-description'>Please enter using this format: 000-111-5555</small> }
            </div>
            <button
              className='btn btn--primary'
              type='submit'
            >
              Send&nbsp;{ type }
            </button>
          </form>
        )}
      </section>
    </AuthenticationRequired>
  );
};

export default ShareAction;
