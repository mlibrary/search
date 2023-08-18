import React from 'react';
import config from '../../../../config';
import PropTypes from 'prop-types';

export default function Authentication (props) {
  return (
    <a
      href={props.logout ? config.logoutUrl : config.loginUrl}
      className={props.button && 'button'}
    >
      {props.children || 'Log ' + (props.logout ? 'out' : 'in')}
    </a>
  );
}

Authentication.propTypes = {
  logout: PropTypes.bool,
  button: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
