import { Anchor } from '../../../reusable';
import PropTypes from 'prop-types';
import React from 'react';

const Authentication = ({ button, children, logout }) => {
  return (
    <Anchor
      href={
        `${process.env.REACT_APP_LOGIN_BASE_URL || window.location.origin
         }/${
         logout ? 'logout' : 'login'
         }?dest=${
         encodeURIComponent(document.location.pathname + document.location.search)}`
      }
      className={button && 'button'}
    >
      {children || `Log ${logout ? 'out' : 'in'}`}
    </Anchor>
  );
};

Authentication.propTypes = {
  button: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  logout: PropTypes.bool
};

export default Authentication;
