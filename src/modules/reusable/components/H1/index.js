import React from 'react';
import PropTypes from 'prop-types';

function H1 ({ children, className }) {
  if (!children) {
    return null;
  }

  return (
    <h1 className={className} id='maincontent' tabIndex='-1'>
      {children}
    </h1>
  );
}

H1.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  className: PropTypes.string
};

export default H1;
