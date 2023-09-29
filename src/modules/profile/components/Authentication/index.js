import React from 'react';
import { Anchor } from '../../../reusable';
import PropTypes from 'prop-types';

export default function Authentication (props) {
  return (
    <Anchor
      href={
        (process.env.REACT_APP_LOGIN_BASE_URL || window.location.origin) +
        '/' +
        (props.logout ? 'logout' : 'login') +
        '?dest=' +
        encodeURIComponent(document.location.pathname + document.location.search)
      }
      className={props.button && 'button'}
    >
      {props.children || 'Log ' + (props.logout ? 'out' : 'in')}
    </Anchor>
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
