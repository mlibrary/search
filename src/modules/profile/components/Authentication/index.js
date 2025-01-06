import { Anchor } from '../../../reusable';
import React from 'react';

const Authentication = ({ button, children, logout }) => {
  const { pathname, search } = document.location;
  return (
    <Anchor
      href={`${process.env.REACT_APP_LOGIN_BASE_URL || window.location.origin}/log${logout ? 'out' : 'in'}?dest=${encodeURIComponent(pathname + search)}`}
      className={button && 'button'}
    >
      {children || `Log ${logout ? 'out' : 'in'}`}
    </Anchor>
  );
};

export default Authentication;
