import React from 'react';

const H1 = ({ children, className }) => {
  if (!children) {
    return null;
  }

  return (
    <h1 className={className} id='maincontent' tabIndex='-1'>
      {children}
    </h1>
  );
};

export default H1;
