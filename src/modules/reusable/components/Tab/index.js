import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const Tab = forwardRef(({ onClick, isActive, id, ariaControls, children, ...rest }, ref) => {
  return (
    <button
      role='tab'
      aria-selected={isActive}
      aria-controls={ariaControls}
      id={id}
      tabIndex={isActive ? 0 : -1}
      ref={ref}
      onClick={onClick}
      type='button'
      {...rest}
    >
      {children}
    </button>
  );
});

Tab.displayName = 'Tab';

Tab.propTypes = {
  onClick: PropTypes.func,
  isActive: PropTypes.bool,
  id: PropTypes.string,
  ariaControls: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default Tab;
