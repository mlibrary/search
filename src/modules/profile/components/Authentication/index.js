import React from 'react';
import config from '../../../../config';
import PropTypes from 'prop-types';

export default function Authentication (props) {
  return (
    <form
      action={props.logout ? config.logoutUrl : config.loginUrl}
      method={props.logout ? 'get' : 'post'}
    >
      <button
        type='submit'
        className={props.link ? 'link' : 'button'}
      >
        {props.children || 'Log ' + (props.logout ? 'out' : 'in')}
      </button>
    </form>
  );
}

Authentication.propTypes = {
  logout: PropTypes.bool,
  link: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
