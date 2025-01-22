import { Alert, Anchor } from '../../../reusable';
import React, { useEffect, useState } from 'react';
import { AuthenticationRequired } from '../../../profile';
import { useSelector } from 'react-redux';

const ShareAction = ({ action, datastoreUid, prejudice }) => {
  const [inputValue, setInputValue] = useState('');
  const [status, setStatus] = useState();
  const [alertType, setAlertType] = useState();
  const [alertMessage, setAlertMessage] = useState(<>We&apos;re sorry. Something went wrong. Please use <Anchor href='https://www.lib.umich.edu/ask-librarian'>Ask a Librarian</Anchor> for help.</>);
  const { email, status: profileStatus, text } = useSelector((state) => {
    return state.profile || {};
  });

  const { name, uid: type } = action;
  const isEmail = type === 'email';

  useEffect(() => {
    setInputValue(isEmail ? email || '' : text || '');
  }, [isEmail, email, text]);

  useEffect(() => {
    if (status) {
      const statusCode = status.status_code;
      if (statusCode?.startsWith('action.response.')) {
        if (statusCode.endsWith('success')) {
          setAlertType('success');
          setAlertMessage(<>{name} successfully sent.</>);
        } else if (statusCode.includes('invalid.')) {
          setAlertType('error');
          if (statusCode.endsWith('email')) {
            setAlertMessage(<>Please enter a valid email address (e.g. uniqname@umich.edu)</>);
          } else if (statusCode.endsWith('number')) {
            setAlertMessage(<>Please enter a valid 10-digit phone number (e.g. 000-123-5555)</>);
          }
        }
      } else {
        setAlertType('warning');
        setAlertMessage(<>We&apos;re sorry. Something went wrong. Please use <Anchor href='https://www.lib.umich.edu/ask-librarian'>Ask a Librarian</Anchor> for help.</>);
      }
    }
  }, [status, name]);

  const handleSubmitCallback = (data) => {
    setStatus(data);
  };

  return (
    <AuthenticationRequired {...{ status: profileStatus }}>
      <section className='lists-action'>
        {status && <Alert type={alertType}>{alertMessage}</Alert>}
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
