import React from 'react';
import config from '../../../../config';
import PropTypes from 'prop-types';

export default function Login ({ text = 'Login', link }) {
  return (
    <form
      action={config.loginUrl}
      method='post'
    >
      <button
        type='submit'
        className={link ? 'button-link-light' : 'button'}
      >
        {text}
      </button>
    </form>
  );
}

Login.propTypes = {
  text: PropTypes.string,
  link: PropTypes.string
};
