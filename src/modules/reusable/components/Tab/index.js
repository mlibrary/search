import React, { forwardRef } from 'react';

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

export default Tab;
