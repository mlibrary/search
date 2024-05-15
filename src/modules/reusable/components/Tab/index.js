import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const Tab = forwardRef(({ ariaControls, children, id, isActive, onClick, ...rest }, ref) => {
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
  ariaControls: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  id: PropTypes.string,
  isActive: PropTypes.bool,
  onClick: PropTypes.func
};

export default Tab;
