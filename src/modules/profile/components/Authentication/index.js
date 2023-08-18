import React from 'react';
import config from '../../../../config';
import PropTypes from 'prop-types';

export default function Authentication (props) {
  return (
    <a
      href={props.logout ? config.logoutUrl : config.loginUrl}
      className={props.link ? 'link' : 'button'}
    >
      {props.children || 'Log ' + (props.logout ? 'out' : 'in')}
    </a>
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
